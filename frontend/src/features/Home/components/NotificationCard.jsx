/* ─── Lightweight relative-time helper ───────────────────────────────────── */
function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/* ─── Type config ─────────────────────────────────────────────────────────── */
const TYPE_CONFIG = {
  ORDER_PLACED: {
    emoji: "🎉",
    label: "Order Placed",
    statusText: "Confirmed",
    accent: "from-purple-500/20 to-blue-500/10",
    dot: "bg-purple-400",
    border: "border-purple-400/30",
    badgeBg: "bg-purple-500/30 text-purple-200",
    stepColor: "text-purple-300",
  },
  ORDER_SHIPPED: {
    emoji: "🚚",
    label: "Order Shipped",
    statusText: "On the way",
    accent: "from-blue-400/20 to-cyan-500/10",
    dot: "bg-blue-300",
    border: "border-blue-300/30",
    badgeBg: "bg-blue-500/30 text-blue-200",
    stepColor: "text-blue-300",
  },
  ORDER_DELIVERED: {
    emoji: "✅",
    label: "Order Delivered",
    statusText: "Delivered",
    accent: "from-green-500/20 to-emerald-400/10",
    dot: "bg-emerald-400",
    border: "border-emerald-400/30",
    badgeBg: "bg-emerald-500/30 text-emerald-200",
    stepColor: "text-emerald-300",
  },
  ORDER_CANCELLED: {
    emoji: "❌",
    label: "Order Cancelled",
    statusText: "Cancelled",
    accent: "from-red-500/20 to-orange-400/10",
    dot: "bg-red-400",
    border: "border-red-400/30",
    badgeBg: "bg-red-500/30 text-red-200",
    stepColor: "text-red-300",
  },
};

/* ─── Bill Row helper ─────────────────────────────────────────────────────── */
function BillRow({ label, value, valueClass = "text-white font-semibold" }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className="text-purple-200/60 text-xs uppercase tracking-wider font-medium shrink-0">
        {label}
      </span>
      <span className={`text-xs text-right ${valueClass}`}>{value}</span>
    </div>
  );
}

/* ─── Dashed divider ─────────────────────────────────────────────────────── */
function Dash() {
  return (
    <div className="border-t border-dashed border-white/15 my-2" />
  );
}

/* ─── Main Card ──────────────────────────────────────────────────────────── */
function NotificationCard({ notification, onMarkRead, actionLoading }) {
  const cfg = TYPE_CONFIG[notification.type] || TYPE_CONFIG.ORDER_PLACED;
  const shortId = notification.orderId
    ? String(notification.orderId).slice(-8).toUpperCase()
    : "—";

  return (
    <div
      className={`relative rounded-2xl border ${cfg.border} bg-gradient-to-br ${cfg.accent}
        backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
        hover:shadow-blue-900/20 overflow-hidden ${!notification.isRead ? "ring-1 ring-white/20" : "opacity-80"}`}
    >
      {/* Unread pulse dot */}
      {!notification.isRead && (
        <span
          className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${cfg.dot} animate-pulse z-10`}
        />
      )}

      {/* ── Receipt Header ─────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg shrink-0">
          {cfg.emoji}
        </div>
        <div>
          <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${cfg.stepColor}`}>
            {cfg.label}
          </p>
          <h3 className="text-sm font-bold text-white leading-tight mt-0.5">
            {notification.title}
          </h3>
        </div>
      </div>

      <Dash />

      {/* ── Bill Body ──────────────────────────────────────────────── */}
      <div className="px-5">
        <BillRow label="Status" value={
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.badgeBg}`}>
            {cfg.statusText}
          </span>
        } />
        <BillRow label="Order ID" value={`#${shortId}`} />
        <BillRow label="Date" value={formatDate(notification.createdAt)} />
        <BillRow label="Time" value={formatTime(notification.createdAt)} />
      </div>

      <Dash />

      {/* ── Message ────────────────────────────────────────────────── */}
      <div className="px-5 pb-1">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-200/50 mb-1.5">
          Message
        </p>
        <p className="text-xs text-purple-100/80 leading-relaxed whitespace-pre-line">
          {notification.message}
        </p>
      </div>

      <Dash />

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <div className="px-5 pb-4 flex items-center justify-between">
        <span className="text-[10px] text-purple-300/50 font-medium">
          {timeAgo(notification.createdAt)}
        </span>

        {!notification.isRead ? (
          <button
            id={`mark-read-${notification._id}`}
            onClick={() => onMarkRead(notification._id)}
            disabled={actionLoading}
            className="text-[10px] uppercase tracking-widest font-bold text-purple-200
              hover:text-white transition-colors disabled:opacity-40 border border-white/15
              rounded-full px-3 py-1 hover:bg-white/10"
          >
            Mark Read
          </button>
        ) : (
          <span className="text-[10px] text-purple-300/40 font-medium uppercase tracking-widest">
            Read ✓
          </span>
        )}
      </div>
    </div>
  );
}

export default NotificationCard;
