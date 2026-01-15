import mongoose from "mongoose";
let isConnected = false;
export async function connect() {
  if (isConnected) {
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
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
