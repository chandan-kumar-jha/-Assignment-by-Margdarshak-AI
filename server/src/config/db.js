const mongoose = require("mongoose");
const { setServers } = require("node:dns/promises");
const dns = require("node:dns");

// ── DNS fix for Windows / IPv6 issues ─────────────────────────────
setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");



let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  await mongoose.connect(MONGODB_URI);

  isConnected = true;
  console.log("MongoDB connected");
};

module.exports = connectDB;