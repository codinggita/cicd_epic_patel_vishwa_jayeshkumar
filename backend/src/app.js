const express = require("express");
const cors = require("cors");

const routes = require("./routes/index.routes");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "StackOrbit API is running" });
});

// API routes
app.use("/api/v1", routes);

// 404 handler
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

module.exports = app;
