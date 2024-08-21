// Import the 'express' module along with 'Request' and 'Response' types from express
import express from "express";
import { connectDB } from "../db/connectDB";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../route/userRoute";

dotenv.config();

// Create an Express application
const app = express();
app.use(cors({ origin: "*", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse cookies

// Specify the port number for the server
const port = 5000;

app.use("/api/auth", authRoutes);

// Define a route for the root path ('/')
app.get("/", (req, res) => {
  // Send a response to the client
  res.send("Hello, TypeScript + Node.js + Express!");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});

connectDB();