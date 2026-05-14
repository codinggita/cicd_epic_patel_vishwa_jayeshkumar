const express = require("express");
const {
  getAll,
  getById,
  create,
  updateContent,
  remove,
} = require("../controllers/workflow.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /api/v1/workflows — Fetch all non-archived workflows (public)
router.get("/", getAll);

// GET /api/v1/workflows/:id — Fetch a single workflow by ID (public)
router.get("/:id", getById);

// POST /api/v1/workflows — Create a new workflow (protected)
router.post("/", protect, create);

// PATCH /api/v1/workflows/:id/content — Update YAML content (protected)
router.patch("/:id/content", protect, updateContent);

// DELETE /api/v1/workflows/:id — Archive a workflow (protected)
router.delete("/:id", protect, remove);

module.exports = router;
