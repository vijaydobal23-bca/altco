import NotificationCard from "./NotificationCard";

/* ─── Skeleton loader ─────────────────────────────────────────────────────── */
function NotificationSkeleton() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-full bg-white/10 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-2.5 w-16 bg-white/10 rounded-full" />
          <div className="h-3.5 w-3/4 bg-white/10 rounded-full" />
          <div className="h-3 w-full bg-white/10 rounded-full" />
          <div className="h-3 w-2/3 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ─── Empty state ─────────────────────────────────────────────────────────── */
function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20
        flex items-center justify-center mb-5 text-3xl">
        🔔
      </div>
      <h3 className="text-lg font-bold text-white mb-1">No notifications yet</h3>
      <p className="text-purple-200 text-sm">
        When you place or update an order, notifications will appear here.
      </p>
    </div>
  );
}

/* ─── Main list ───────────────────────────────────────────────────────────── */
function NotificationList({ notifications, loading, onMarkRead, actionLoading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <NotificationSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return <EmptyNotifications />;
  }

  return (
    <div className="space-y-4">
      {notifications.map((n) => (
        <NotificationCard
          key={n._id}
          notification={n}
          onMarkRead={onMarkRead}
          actionLoading={actionLoading}
        />
      ))}
    </div>
  );
}

export default NotificationList;
