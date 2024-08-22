import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import { log } from "console";
// import { generateTokenAndSetCookie } from "../utils/verifyToken";

// Signup functionality
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = 10;
    const hashedPass = await bcrypt.hash(password, salt);

    // saving the object in DB
    const user = await User.create({
      email,
      password: hashedPass,
      username,
    });
    // send success response
    res
      .status(201)
      .json({ success: true, message: "Registered successfully", user });
    console.log(user);
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Error while sign up" });
  }
};

// Login functionality
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // check existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    // compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    console.log(process.env.JWT_SECRET);

    let JWT_SECRET = process.env.JWT_SECRET || "secret";
    // create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    user.token = token;
    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    // send cookie in response

    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: `Welcome back ${user.username}`,
        user: {
          name: user.username,
          token: user.token,
        },
      });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error while login" });
  }
};

// Logout functionality
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// profile functionality
export const profile = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    const secret = process.env.JWT_SECRET || "secret";
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res
        .status(200)
        .json({ success: true, message: "Welcome to your profile", info });
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Error while profile" });
  }
};
