const express = require("express");
const cors = require("cors");
const helmet = require("./middlewares/helmet.middleware");
const rateLimiter = require("./middlewares/rateLimiter.middleware");
const logger = require("./middlewares/logger.middleware");
const dataService = require("./utils/dataService");
const router = express.Router();
const routes = require("./routes/index.routes");

// Generic collection endpoint – e.g. /api/v1/workflows returns the workflows collection
router.get('/collection/:collection', (req, res) => {
  const collection = req.params.collection;
  const data = dataService.getCollection(collection);
  if (!data || data.length === 0) {
    return res.status(404).json({ success: false, message: `Collection '${collection}' not found.` });
  }
  return res.status(200).json({ success: true, collection, data });
});
// Mount the router for collection endpoints


const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(logger);
app.use('/api/v1', router);
app.get("/", (req, res) => res.status(200).json({ message: "Welcome to the StackOrbit!" }));
app.use(cors());
app.use(helmet());
app.use(rateLimiter);
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
