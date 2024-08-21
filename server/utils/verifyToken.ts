import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokenAndSetCookie = (res: Response, userId: number): string => {
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign({ userId }, jwtSecret, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Ensures cookies are sent over HTTPS in production
        sameSite: "strict",  // Helps prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
    });

    return token;
};
