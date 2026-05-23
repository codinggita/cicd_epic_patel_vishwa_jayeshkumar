/**
 * fileFormatter utility
 *
 * Provides reusable functions to format file data for consistent
 * API responses across the upload module.
 */

/**
 * Formats file metadata for API response.
 *
 * @param {Object} file - File object from upload middleware
 * @returns {Object} - Formatted file data
 */
const formatFileResponse = (file) => {
  if (!file) {
    return null;
  }

  return {
    id: file.id || file.filename,
    originalName: file.originalname,
    filename: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    path: file.path,
    uploadedAt: new Date(),
  };
};

/**
 * Formats multiple files for API response.
 *
 * @param {Array} files - Array of file objects
 * @returns {Array} - Array of formatted file data
 */
const formatMultipleFiles = (files) => {
  if (!files || !Array.isArray(files)) {
    return [];
  }

  return files.map(formatFileResponse);
};

module.exports = {
  formatFileResponse,
  formatMultipleFiles,
};
