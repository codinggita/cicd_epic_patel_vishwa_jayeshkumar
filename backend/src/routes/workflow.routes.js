const express = require("express");
const {
  getAll,
  getById,
  create,
  remove,
  replace,
  updateContent,
  getRandom,
  getHistory,
  archive,
  restore,
  clone,
  getLogs,
  getMetrics,
  run,
  cancel,
} = require("../controllers/workflow.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /api/v1/workflows — Fetch all workflows (public)
router.get("/", getAll);

// GET /api/v1/workflows/random — Fetch a random workflow (public)
router.get("/random", getRandom);

// GET /api/v1/workflows/:id — Fetch a single workflow by ID (public)
router.get("/:id", getById);

// GET /api/v1/workflows/:id/history — Fetch workflow history (public)
router.get("/:id/history", getHistory);

// GET /api/v1/workflows/:id/logs — Fetch workflow logs (public)
router.get("/:id/logs", getLogs);

// GET /api/v1/workflows/:id/metrics — Fetch workflow metrics (public)
router.get("/:id/metrics", getMetrics);

// POST /api/v1/workflows — Create a new workflow (protected)
router.post("/", protect, create);

// PUT /api/v1/workflows/:id — Replace entire workflow (protected)
router.put("/:id", protect, replace);

// PATCH /api/v1/workflows/:id/content — Update workflow content (protected)
router.patch("/:id/content", protect, updateContent);

// PATCH /api/v1/workflows/:id/archive — Archive workflow (protected)
router.patch("/:id/archive", protect, archive);

// PATCH /api/v1/workflows/:id/restore — Restore archived workflow (protected)
router.patch("/:id/restore", protect, restore);

// POST /api/v1/workflows/:id/clone — Clone workflow (protected)
router.post("/:id/clone", protect, clone);

// POST /api/v1/workflows/:id/run — Trigger workflow run (protected)
router.post("/:id/run", protect, run);

// POST /api/v1/workflows/:id/cancel — Cancel running workflow (protected)
router.post("/:id/cancel", protect, cancel);

// DELETE /api/v1/workflows/:id — Delete a workflow permanently (protected)
router.delete("/:id", protect, remove);

module.exports = router;
