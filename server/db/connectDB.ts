import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    let MONGO_URI = 'mongodb+srv://swarnab007:swarnab%402003@cluster0.nhbds.mongodb.net/blog-app?retryWrites=true&w=majority';
    
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    
    const conn = await mongoose.connect(MONGO_URI, {
      dbName: "blog-app",
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log("Error connecting to MongoDB: ", error.message);
    process.exit(1); // 1 is failure, 0 status code is success
  }
};
