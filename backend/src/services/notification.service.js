const Notification = require("../models/notification.model");

/**
 * Fetches all notifications for a specific user.
 *
 * @param {String} userId - ID of the user to fetch notifications for
 * @returns {Array} - Array of notification documents
 */
const getUserNotifications = async (userId) => {
  const notifications = await Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .exec();

  return notifications;
};

/**
 * Marks a specific notification as read.
 *
 * @param {String} notificationId - ID of the notification to mark as read
 * @param {String} userId - ID of the user making the request
 * @returns {Object} - Updated notification document
 * @throws {Error} - If notification not found or user is not the recipient
 */
const markNotificationAsRead = async (notificationId, userId) => {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }

  // Ensure the user is the recipient of the notification
  if (notification.recipient.toString() !== userId.toString()) {
    const error = new Error("You are not authorized to access this notification");
    error.statusCode = 403;
    throw error;
  }

  notification.isRead = true;
  await notification.save();

  return notification;
};

module.exports = {
  getUserNotifications,
  markNotificationAsRead,
};
