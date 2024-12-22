import mongoose from "mongoose";
import configs from "../config/intex";

export const connectToMongoDb = async (): Promise<void> => {
  try {
    await mongoose.connect(configs.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};
