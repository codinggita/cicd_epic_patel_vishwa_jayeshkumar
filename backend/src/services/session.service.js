/**
 * session.service.js
 *
 * Contains business logic for session management operations.
 * This service handles session retrieval and termination.
 */

const Session = require("../models/session.model");
const { SESSION_STATUS } = require("../constants/session.constants");

/**
 * Fetches all active sessions for a specific user.
 *
 * @param {string} userId - User MongoDB _id
 * @returns {Array} - Array of active session documents
 */
const getActiveSessions = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const sessions = await Session.find({
    userId,
    status: SESSION_STATUS.ACTIVE,
  })
    .sort({ lastActiveAt: -1 }) // Most recently active first
    .lean();

  return sessions;
};

/**
 * Terminates a session by ID.
 *
 * @param {string} sessionId - Session MongoDB _id
 * @param {string} userId - User MongoDB _id (for ownership verification)
 * @returns {Object|null} - Terminated session document or null if not found
 */
const terminateSession = async (sessionId, userId) => {
  if (!sessionId) {
    throw new Error("Session ID is required");
  }

  if (!userId) {
    throw new Error("User ID is required");
  }

  const session = await Session.findOneAndUpdate(
    {
      _id: sessionId,
      userId, // Ensure user can only terminate their own sessions
    },
    {
      status: SESSION_STATUS.TERMINATED,
    },
    {
      new: true,
    }
  );

  return session;
};

module.exports = {
  getActiveSessions,
  terminateSession,
};
