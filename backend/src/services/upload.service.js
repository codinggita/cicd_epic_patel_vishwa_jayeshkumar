/**
 * upload.service.js
 *
 * Contains business logic for file upload operations.
 * This service handles file processing and data management.
 */

const { formatFileResponse } = require("../utils/fileFormatter");

// In-memory storage for demo purposes
// In production, this would be replaced with database or cloud storage
const uploadedFiles = new Map();

/**
 * Processes and stores uploaded file information.
 *
 * @param {Object} file - File object from upload middleware
 * @returns {Object} - Processed file data
 */
const uploadFile = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Generate a unique ID for the file
  const fileId = Date.now().toString() + "-" + Math.random().toString(36).substr(2, 9);

  // Store file information
  const fileData = {
    id: fileId,
    ...file,
    uploadedAt: new Date(),
  };

  uploadedFiles.set(fileId, fileData);

  return formatFileResponse(fileData);
};

/**
 * Retrieves file information by ID.
 *
 * @param {string} fileId - Unique file identifier
 * @returns {Object|null} - File data or null if not found
 */
const getFileById = async (fileId) => {
  if (!fileId) {
    throw new Error("File ID is required");
  }

  const fileData = uploadedFiles.get(fileId);

  if (!fileData) {
    return null;
  }

  return formatFileResponse(fileData);
};

module.exports = {
  uploadFile,
  getFileById,
};
