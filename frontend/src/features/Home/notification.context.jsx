import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getNotifications } from "./services/notification.api";

// ─── Context ────────────────────────────────────────────────────────────────
export const NotificationContext = createContext(null);

// ─── Provider ───────────────────────────────────────────────────────────────
export function NotificationContextProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading]             = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Derived state — always computed from notifications array
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getNotifications();
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (err) {
      // 401 is handled at the hook/page level; silently ignore here
      if (err.response?.status !== 401) {
        console.error("Failed to load notifications", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch once on mount (user is already authenticated at this point via AuthRoute)
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        loading,
        setLoading,
        actionLoading,
        setActionLoading,
        unreadCount,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// ─── Raw context hook (for internal use in useNotification) ─────────────────
export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotificationContext must be used within NotificationContextProvider"
    );
  }
  return ctx;
}

export default NotificationContextProvider;
