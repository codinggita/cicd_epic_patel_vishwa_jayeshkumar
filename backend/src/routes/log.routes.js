const express = require("express");
const { getAll, getLatest, getErrors } = require("../controllers/log.controller");

const router = express.Router();

// GET /api/v1/logs — Fetch all application logs (public)
router.get("/", getAll);

// GET /api/v1/logs/latest — Fetch latest application logs (public)
router.get("/latest", getLatest);

// GET /api/v1/logs/errors — Fetch error-level logs (public)
router.get("/errors", getErrors);

module.exports = router;
