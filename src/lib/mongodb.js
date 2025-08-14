import mongoose from "mongoose";
let isConnected = false;
export async function connect() {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables");
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      tls: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
