/**
 * admin.middleware.js
 *
 * Middleware to restrict route access to authenticated administrators only.
 * Must be mounted AFTER the `protect` middleware.
 */

const { ADMIN_MESSAGES } = require("../config/constants");
const HTTP_STATUS = require("../config/constants");

/**
 * Middleware to ensure the authenticated user has an 'admin' role.
 */
const isAdmin = (req, res, next) => {
  // Check if req.user exists and has the admin role
  if (!req.user || req.user.role !== "admin") {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ADMIN_MESSAGES.FORBIDDEN,
    });
  }

  next();
};

module.exports = {
  isAdmin,
};
