/**
 * admin.service.js
 *
 * Service layer for the admin management module.
 * Direct interactions with User database queries.
 */

const User = require("../models/user.model");
const { ADMIN_MESSAGES } = require("../constants/admin.constants");

/**
 * Fetches all registered users, excluding password hashes.
 *
 * @returns {Promise<{users: Array, total: number}>}
 */
const getAllUsers = async () => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  const total = users.length;

  return {
    users,
    total,
  };
};

/**
 * Fetches a single user by their unique ID, excluding password hashes.
 *
 * @param {string} userId - Unique identifier of the user
 * @returns {Promise<Object>} - User document
 * @throws {Error} 404 - If user is not found
 */
const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  
  if (!user) {
    const error = new Error(ADMIN_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
};
