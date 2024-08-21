import fs from "fs";
import jwt, { JwtPayload } from "jsonwebtoken";
import {Request, Response } from "express";
import BlogModel from "../models/blogModel";

// Type for the JWT payload
interface CustomJwtPayload extends JwtPayload {
  id: string;
}

// Upload Picture and Create Blog Post
export const createBlog = async (req, res: Response) => {
  try {
    const { originalname, path } = req.file;

    // Check if the file exists before renaming
    if (!fs.existsSync(path)) {
      return res
        .status(400)
        .json({ success: false, message: "File does not exist" });
    }

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = `${path}.${ext}`;

    // Rename the file with the new extension
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const secret = process.env.JWT_SECRET as string;

    // Verify JWT token
    jwt.verify(token, secret, {}, async (err, decodedToken) => {
      if (err || typeof decodedToken !== "object" || !decodedToken) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized or invalid token" });
      }

      const info = decodedToken as CustomJwtPayload;

      if (!info.id) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token payload" });
      }

      const { title, summary, content } = req.body;

      // Create a new blog document
      const blogDoc = await BlogModel.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });

      // Respond with the created blog document
      res.json(blogDoc);
    });
  } catch (error) {
    console.error("Error in uploadPic:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// update blog post
export const updateBlog = async (req, res: Response) => {
  try {
    let newPath: string | null = null;

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = `${path}.${ext}`;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    const secret = process.env.JWT_SECRET as string;

    jwt.verify(token, secret, {}, async (err, decodedToken) => {
      if (err || !decodedToken) {
        return res.status(401).json('Unauthorized or invalid token');
      }

      const info = decodedToken as CustomJwtPayload;

      const { id, title, summary, content } = req.body;
      const blog = await BlogModel.findById(id);

      if (!blog) {
        return res.status(404).json('Blog post not found');
      }

      const isAuthor = JSON.stringify(blog.author) === JSON.stringify(info.id);

      if (!isAuthor) {
        return res.status(403).json('You are not the author');
      }

      // Update the blog post
      blog.title = title;
      blog.summary = summary;
      blog.content = content;
      blog.cover = newPath ? newPath : blog.cover;

      await blog.save();

      res.json(blog);
    });
  } catch (error) {
    console.error("Error in updateBlog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};