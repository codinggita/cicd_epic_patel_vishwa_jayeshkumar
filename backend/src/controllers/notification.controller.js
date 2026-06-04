const {
  getUserNotifications,
  markNotificationAsRead,
} = require("../services/notification.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../config/constants");
const { NOTIFICATION_MESSAGES } = require("../config/constants");
const { formatNotifications, formatNotification } = require("../utils/notificationFormatter");

/**
 * GET /api/v1/notifications
 * Returns all notifications for the authenticated user.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getAll = asyncHandler(async (req, res) => {
  const notifications = await getUserNotifications(req.user._id);
  const formattedNotifications = formatNotifications(notifications);
  sendResponse(res, HTTP_STATUS.OK, NOTIFICATION_MESSAGES.FETCHED_ALL, formattedNotifications);
});

/**
 * PATCH /api/v1/notifications/:id/read
 * Marks a specific notification as read.
 *
 * The user can only mark their own notifications as read.
 */
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await markNotificationAsRead(req.params.id, req.user._id);
  const formattedNotification = formatNotification(notification);
  sendResponse(res, HTTP_STATUS.OK, NOTIFICATION_MESSAGES.MARKED_READ, formattedNotification);
});

module.exports = { getAll, markAsRead };
