/**
 * Upload Constants
 *
 * Centralizes all static values used across the upload module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for upload operations
const UPLOAD_MESSAGES = {
  UPLOADED: "File uploaded successfully",
  FETCHED: "File details fetched successfully",
  NOT_FOUND: "File not found",
  INVALID_FILE: "Invalid file uploaded",
};

// Upload configuration limits
const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
  ALLOWED_MIME_TYPES: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "text/plain",
  ],
};

// Default field values
const UPLOAD_DEFAULTS = {
  STORAGE_PATH: "uploads/",
};

module.exports = {
  UPLOAD_MESSAGES,
  UPLOAD_LIMITS,
  UPLOAD_DEFAULTS,
};
