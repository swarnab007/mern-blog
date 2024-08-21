import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import { generateTokenAndSetCookie } from "../utils/verifyToken";

export const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the user already exists
    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists", userAlreadyExists);

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate a verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Alternatively, use crypto for a more secure token
    // const verificationToken = crypto.randomBytes(16).toString("hex");

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      username,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Save the user to the database
    await user.save();

    // Generate JWT and set cookie
    generateTokenAndSetCookie(res, user._id as number);

    // Send verification email (uncomment when ready)
    // await sendVerificationEmail(user.email, verificationToken);

    // Respond with the user object, excluding the password
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user.toObject(),
        password: undefined,
        verificationToken: undefined, // Exclude the token from the response
      },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
