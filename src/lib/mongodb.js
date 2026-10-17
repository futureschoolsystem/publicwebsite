import dns from "node:dns";
import mongoose from "mongoose";

// Configure public DNS for reliable MongoDB Atlas SRV lookup on Windows
if (dns && typeof dns.setServers === "function") {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch (e) {
    // fallback to system resolver
  }
}

let isConnected = false;

export async function connect() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      tls: true,
      serverSelectionTimeoutMS: 8000,
    });

    isConnected = true;
    return mongoose;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
