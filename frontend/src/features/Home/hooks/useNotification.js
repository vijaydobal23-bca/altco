import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { markAsRead, markAllAsRead } from "../services/notification.api";
import { useNotificationContext } from "../notification.context";

/**
 * useNotification
 *
 * Reads state from NotificationContext and exposes action handlers.
 * All state lives in the context — this hook is a thin action layer.
 */
export function useNotification() {
  const {
    notifications,
    setNotifications,
    loading,
    actionLoading,
    setActionLoading,
    unreadCount,
    fetchNotifications,
  } = useNotificationContext();

  const navigate = useNavigate();

  // ── Mark one notification as read ────────────────────────────────────────
  const handleMarkAsRead = async (id) => {
    setActionLoading(true);
    try {
      const res = await markAsRead(id);
      if (res.data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Failed to mark notification as read.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  // ── Mark all notifications as read ───────────────────────────────────────
  const handleMarkAllAsRead = async () => {
    setActionLoading(true);
    try {
      const res = await markAllAsRead();
      if (res.data.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        toast.success("All notifications marked as read.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Failed to mark all as read.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  return {
    notifications,
    loading,
    actionLoading,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    refetch: fetchNotifications,
  };
}
