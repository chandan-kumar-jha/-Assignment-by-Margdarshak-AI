const express = require("express");
const cors = require("cors");

const roadmapRouter = require("./routes/roadmap.routes.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/roadmaps", roadmapRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal server error",
  });
});

module.exports = app;