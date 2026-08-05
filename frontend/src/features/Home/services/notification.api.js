import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
});

/** Fetch all notifications for the current user */
export const getNotifications = () => api.get("/api/notifications");

/** Mark a single notification as read */
export const markAsRead = (id) => api.put(`/api/notifications/${id}/read`);

/** Mark all notifications as read */
export const markAllAsRead = () => api.put("/api/notifications/read-all");
