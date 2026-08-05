/**
 * NotificationBadge
 * Displays a small badge with the unread notification count.
 * Pass unreadCount=0 to hide the badge.
 */
function NotificationBadge({ unreadCount = 0 }) {
  if (unreadCount === 0) return null;
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded-full
        bg-purple-400 text-white text-[9px] font-black shadow-md
        ring-2 ring-blue-500"
    >
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  );
}

export default NotificationBadge;
