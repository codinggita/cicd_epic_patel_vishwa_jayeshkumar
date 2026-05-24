const {
  getActiveSessions,
  terminateSession,
} = require("../services/session.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { SESSION_MESSAGES } = require("../constants/session.constants");

/**
 * GET /api/v1/sessions
 * Fetches all active sessions for the authenticated user.
 *
 * req.user is attached by the protect middleware before this runs.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getSessions = asyncHandler(async (req, res) => {
  const sessions = await getActiveSessions(req.user._id);

  if (!sessions || sessions.length === 0) {
    return sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      SESSION_MESSAGES.NOT_FOUND
    );
  }

  sendResponse(res, HTTP_STATUS.OK, SESSION_MESSAGES.FETCHED, sessions);
});

/**
 * DELETE /api/v1/sessions/:id
 * Terminates a specific session by ID.
 *
 * req.user is attached by the protect middleware before this runs.
 * Users can only terminate their own sessions.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const deleteSession = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const session = await terminateSession(id, req.user._id);

  if (!session) {
    return sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      SESSION_MESSAGES.NOT_FOUND
    );
  }

  sendResponse(res, HTTP_STATUS.OK, SESSION_MESSAGES.TERMINATED, session);
});

module.exports = {
  getSessions,
  deleteSession,
};
