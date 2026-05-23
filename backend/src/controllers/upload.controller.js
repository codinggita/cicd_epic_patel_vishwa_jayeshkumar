const {
  uploadFile,
  getFileById,
} = require("../services/upload.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { UPLOAD_MESSAGES } = require("../constants/upload.constants");

/**
 * POST /api/v1/upload
 * Handles single file upload.
 *
 * Expects multipart/form-data with a file field named 'file'.
 * The upload middleware should be applied in the route definition.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const uploadSingleFile = asyncHandler(async (req, res) => {
  // Check if file exists in request (attached by upload middleware)
  if (!req.file) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      UPLOAD_MESSAGES.INVALID_FILE
    );
  }

  const uploadedFile = await uploadFile(req.file);
  sendResponse(res, HTTP_STATUS.CREATED, UPLOAD_MESSAGES.UPLOADED, uploadedFile);
});

/**
 * GET /api/v1/upload/:id
 * Retrieves uploaded file information by ID.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getFile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const file = await getFileById(id);

  if (!file) {
    return sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      UPLOAD_MESSAGES.NOT_FOUND
    );
  }

  sendResponse(res, HTTP_STATUS.OK, UPLOAD_MESSAGES.FETCHED, file);
});

module.exports = {
  uploadSingleFile,
  getFile,
};
