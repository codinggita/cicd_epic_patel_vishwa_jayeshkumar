/**
 * apiResponse utility
 *
 * Provides a single, reusable function to send consistent JSON responses
 * across all controllers. This ensures every API response always has the
 * same shape, making the frontend integration predictable and easy.
 *
 * Response envelope:
 * {
 *   "success": true | false,
 *   "message": "Human-readable message",
 *   "data": { ... }       // only present on success responses
 * }
 *
 * Usage:
 *   sendResponse(res, HTTP_STATUS.OK, "Workflows fetched", workflows);
 *   sendResponse(res, HTTP_STATUS.CREATED, "Workflow created", newWorkflow);
 *
 * @param {Object} res       - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message   - Human-readable response message
 * @param {*}      data      - Optional payload to include in response
 */
const sendResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: statusCode < 400,
    message,
  };

  // Only attach data field if it is provided (avoids null in error responses)
  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

module.exports = { sendResponse };
