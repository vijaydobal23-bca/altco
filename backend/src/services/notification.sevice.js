import Notification from "../model/notification.model.js";

/**
 * Creates an in-app notification for a user.
 * Pure service function — does NOT use req/res.
 *
 * @param {string|ObjectId} recipientId - The user who receives the notification
 * @param {string} type - One of: ORDER_PLACED | ORDER_SHIPPED | ORDER_DELIVERED | ORDER_CANCELLED
 * @param {string} title - Short notification title
 * @param {string} message - Detailed notification message
 * @param {string|ObjectId|null} orderId - The related order ID (optional)
 * @returns {Promise<Notification>}
 */
export const createOrderNotification = async (recipientId, type, title, message, orderId = null) => {
  const notification = await Notification.create({
    recipient: recipientId,
    type,
    title,
    message,
    orderId,
  });
  return notification;
};

/**
 * Fetches all notifications for a given user, newest first.
 *
 * @param {string|ObjectId} userId
 * @returns {Promise<Notification[]>}
 */
export const getNotificationsForUser = async (userId) => {
  const notifications = await Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .limit(100);
  return notifications;
};

/**
 * Marks a single notification as read.
 *
 * @param {string|ObjectId} notificationId
 * @param {string|ObjectId} userId - Ensures ownership
 * @returns {Promise<Notification|null>}
 */
export const markNotificationRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, recipient: userId },
    { isRead: true },
    { new: true }
  );
  return notification;
};

/**
 * Marks ALL notifications for a user as read.
 *
 * @param {string|ObjectId} userId
 * @returns {Promise<mongoose.UpdateResult>}
 */
export const markAllNotificationsRead = async (userId) => {
  const result = await Notification.updateMany(
    { recipient: userId, isRead: false },
    { isRead: true }
  );
  return result;
};