/**
 * notificationFormatter utility
 *
 * Provides reusable functions to format notification data
 * for consistent API responses across the application.
 */

/**
 * Formats a single notification for API response.
 *
 * @param {Object} notification - Notification document from database
 * @returns {Object} - Formatted notification object
 */
const formatNotification = (notification) => {
  return {
    id: notification._id,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    isRead: notification.isRead,
    relatedResource: notification.relatedResource || null,
    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,
  };
};

/**
 * Formats an array of notifications for API response.
 *
 * @param {Array} notifications - Array of notification documents
 * @returns {Array} - Array of formatted notification objects
 */
const formatNotifications = (notifications) => {
  return notifications.map(formatNotification);
};

module.exports = {
  formatNotification,
  formatNotifications,
};
