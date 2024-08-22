// Import the 'express' module along with 'Request' and 'Response' types from express
import express from "express";
import { connectDB } from "../db/connectDB";
import dotenv from "dotenv";
// import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../route/userRoute";
import blogRoutes from "../route/blogRoutes";
import bodyParser from "body-parser";
import path from "path";

dotenv.config({path: "../.env"});

// Create an Express application
const app = express();
// app.use(cors({ origin: "*", credentials: true }));

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','http://localhost:5173' );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,token');
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json({ limit: "50mb" })); // Increase to 50mb or any value as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse cookies

// Specify the port number for the server
const port = 5000;

console.log(__dirname + '/uploads');
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

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