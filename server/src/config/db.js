/**
 * MongoDB Connection Utility
 *
 * Responsibilities:
 * - Establish MongoDB connection
 * - Prevent duplicate connections
 * - Handle connection errors
 * - Monitor connection events
 * - Improve Windows DNS compatibility
 */

const mongoose = require("mongoose");
const dns = require("node:dns");
const { setServers } = require("node:dns/promises");

// DNS Configuration
// Helps solve MongoDB Atlas IPv6/DNS issues
// --------------------------------------------------
dns.setDefaultResultOrder("ipv4first");

try {
  setServers(["8.8.8.8", "8.8.4.4"]);
} catch (err) {
  console.warn("DNS configuration failed:", err.message);
}

// --------------------------------------------------
// Database Connection
// --------------------------------------------------

const connectDB = async () => {
  try {
    // Reuse existing connection
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }

    const { MONGODB_URI } = process.env;

    if (!MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is missing from environment variables"
      );
    }

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

// --------------------------------------------------
// Connection Events
// --------------------------------------------------

// Fired once MongoDB successfully establishes a connection.
mongoose.connection.on("connected", () => {
  console.log("🟢 MongoDB connected");
});

// Fired when the connection to MongoDB is lost.  eg :-   network issues, database shutdown
mongoose.connection.on("disconnected", () => {
  console.log("🔴 MongoDB disconnected");
});

// Fired when Mongoose automatically reconnects after a previous disconnection.
mongoose.connection.on("reconnected", () => {
  console.log("🟡 MongoDB reconnected");
});

// Fired whenever MongoDB emits an error. eg :-  debugging authentication, DNS, timeout, and connection-related issues.
mongoose.connection.on("error", (err) => {
  console.error("MongoDB Error:", err.message);
});

module.exports = connectDB;