/**
 * admin.controller.js
 *
 * Controller layer for admin endpoints.
 * Handles HTTP logic and interfaces with services.
 */

const asyncHandler = require("../utils/asyncHandler");
const { sendResponse } = require("../utils/apiResponse");
const adminService = require("../services/admin.service");
const { ADMIN_MESSAGES } = require("../constants/admin.constants");
const HTTP_STATUS = require("../constants/httpStatus");

/**
 * GET /api/v1/admin/users
 *
 * Returns list of all registered users (excluding password hashes).
 */
const getUsers = asyncHandler(async (req, res) => {
  const { users, total } = await adminService.getAllUsers();

  return sendResponse(res, HTTP_STATUS.OK, ADMIN_MESSAGES.USERS_FETCHED, { total, users });
});

/**
 * GET /api/v1/admin/users/:id
 *
 * Returns details of a specific user.
 */
const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await adminService.getUserById(userId);

  return sendResponse(res, HTTP_STATUS.OK, ADMIN_MESSAGES.USER_FETCHED, { user });
});

module.exports = {
  getUsers,
  getUserDetails,
};
