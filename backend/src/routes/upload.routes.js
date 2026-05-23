const express = require("express");
const { uploadSingleFile, getFile } = require("../controllers/upload.controller");
const { protect } = require("../middlewares/auth.middleware");

// Simple upload middleware placeholder
// In production, replace with multer or similar upload middleware
const uploadMiddleware = (req, res, next) => {
  // This is a placeholder for actual file upload middleware
  // For production, use multer: const multer = require('multer');
  // const upload = multer({ dest: 'uploads/' });
  // Then apply: upload.single('file')
  
  // For now, we'll pass through and expect the file to be attached
  // by the actual upload middleware in a real implementation
  next();
};

const router = express.Router();

// POST /api/v1/upload — Upload a single file (protected)
router.post("/", protect, uploadMiddleware, uploadSingleFile);

// GET /api/v1/upload/:id — Fetch file information by ID (protected)
router.get("/:id", protect, getFile);

module.exports = router;
