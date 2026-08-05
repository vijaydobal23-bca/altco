import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useNotification } from "../hooks/useNotification";
import NotificationList from "../components/NotificationList";

function NotificationsPage() {
  const {
    notifications,
    loading,
    actionLoading,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    refetch,
  } = useNotification();

  // ── Always refetch when the page mounts so new notifications (e.g. ORDER_DELIVERED)
  // created after the context first loaded are always visible ──────────────────
  useEffect(() => {
    refetch();
  }, []);

  /* ── Segment notifications by type group ─────────────────────────────── */
  const orderNotifications = notifications.filter((n) =>
    ["ORDER_PLACED", "ORDER_SHIPPED", "ORDER_DELIVERED", "ORDER_CANCELLED"].includes(
      n.type
    )
  );

  return (
    <div className="min-h-screen bg-blue-500 text-white pb-16">
      <Navbar />

      <div className="max-w-[820px] mx-auto px-5 py-10">

        {/* ── Page Header ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            {/* Back link */}
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-purple-200 hover:text-white
                font-bold text-xs uppercase tracking-widest transition-colors mb-3 group"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Cart
            </Link>

            <h1 className="text-3xl font-serif text-white">Notifications</h1>
            <p className="text-purple-200 text-sm mt-1">
              {loading
                ? "Loading…"
                : unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                : "All caught up!"}
            </p>
          </div>

          {/* Mark all read */}
          {!loading && unreadCount > 0 && (
            <button
              id="mark-all-read-btn"
              onClick={handleMarkAllAsRead}
              disabled={actionLoading}
              className="self-start sm:self-auto text-[10px] sm:text-xs uppercase tracking-widest
                font-bold text-white bg-white/10 hover:bg-white hover:text-purple-900
                border border-white/20 px-4 py-2 rounded-full transition-colors
                shadow-sm disabled:opacity-40"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* ── Stats strip (only when not loading + has data) ────────────── */}
        {!loading && orderNotifications.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              {
                label: "Placed",
                type: "ORDER_PLACED",
                emoji: "🎉",
                colour: "bg-purple-500/20 border-purple-400/30",
              },
              {
                label: "Shipped",
                type: "ORDER_SHIPPED",
                emoji: "🚚",
                colour: "bg-blue-400/20 border-blue-300/30",
              },
              {
                label: "Delivered",
                type: "ORDER_DELIVERED",
                emoji: "✅",
                colour: "bg-emerald-500/20 border-emerald-400/30",
              },
              {
                label: "Cancelled",
                type: "ORDER_CANCELLED",
                emoji: "❌",
                colour: "bg-red-500/20 border-red-400/30",
              },
            ].map(({ label, type, emoji, colour }) => {
              const count = orderNotifications.filter((n) => n.type === type).length;
              return (
                <div
                  key={type}
                  className={`rounded-2xl border ${colour} p-4 flex items-center gap-3 backdrop-blur-sm`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <p className="text-white font-bold text-lg leading-none">{count}</p>
                    <p className="text-purple-200/70 text-[10px] uppercase tracking-widest font-bold mt-0.5">
                      {label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Section: Order Notifications ──────────────────────────────── */}
        <div>
          {!loading && orderNotifications.length > 0 && (
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 bg-purple-400 rounded-full" />
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-purple-200">
                Order Updates
              </h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          )}

          <NotificationList
            notifications={orderNotifications}
            loading={loading}
            onMarkRead={handleMarkAsRead}
            actionLoading={actionLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
