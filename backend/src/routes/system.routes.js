/**
 * system.routes.js
 *
 * Defines REST API endpoints for basic system monitoring.
 *
 * Routes:
 *   GET /api/v1/system/status      - API and health overview
 *   GET /api/v1/system/uptime      - Process uptime details
 *   GET /api/v1/system/memory      - Memory usage statistics
 *   GET /api/v1/system/environment - Node and environment information
 */

const express = require("express");
const { getStatus, getUptime, getMemory, getEnvironment } = require("../controllers/system.controller");

const router = express.Router();

// GET /api/v1/system/status — Health status overview
router.get("/status", getStatus);

// GET /api/v1/system/uptime — Detailed uptime info
router.get("/uptime", getUptime);

// GET /api/v1/system/memory — Detailed memory statistics
router.get("/memory", getMemory);

// GET /api/v1/system/environment — Environment and platform details
router.get("/environment", getEnvironment);

module.exports = router;
