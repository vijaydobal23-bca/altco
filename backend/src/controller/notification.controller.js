import {
  getNotificationsForUser,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/notification.sevice.js";

/**
 * GET /api/notifications
 * Returns all notifications for the authenticated user.
 */
export const getNotifications = async (req, res) => {
  try {
    const notifications = await getNotificationsForUser(req.user.id);
    return res.status(200).json({
      success: true,
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    });
  } catch (error) {
    console.error("getNotifications error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PUT /api/notifications/:id/read
 * Marks a single notification as read (owned by the authenticated user).
 */
export const readNotification = async (req, res) => {
  try {
    const notification = await markNotificationRead(req.params.id, req.user.id);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
    return res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error("readNotification error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PUT /api/notifications/read-all
 * Marks all unread notifications as read for the authenticated user.
 */
export const readAllNotifications = async (req, res) => {
  try {
    const result = await markAllNotificationsRead(req.user.id);
    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} notification(s) marked as read`,
    });
  } catch (error) {
    console.error("readAllNotifications error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
