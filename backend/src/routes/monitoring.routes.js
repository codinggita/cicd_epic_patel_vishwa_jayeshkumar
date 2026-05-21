const express = require("express");
const {
  getUptimeHandler,
  getCpuUsageHandler,
  getMemoryUsageHandler,
} = require("../controllers/monitoring.controller");

const router = express.Router();

// GET /api/v1/monitoring/uptime — Fetch server uptime (public)
router.get("/uptime", getUptimeHandler);

// GET /api/v1/monitoring/cpu — Fetch CPU usage information (public)
router.get("/cpu", getCpuUsageHandler);

// GET /api/v1/monitoring/memory — Fetch memory usage information (public)
router.get("/memory", getMemoryUsageHandler);

module.exports = router;
