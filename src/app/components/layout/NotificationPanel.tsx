import React from "react";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "info" | "success" | "offer";
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-[360px] bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-100">
          <h2 className="text-[#1D1E20] font-extrabold text-base">Notifications</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F6FA] hover:bg-brand-orange hover:text-white text-[#1D1E20] flex items-center justify-center transition-all duration-200"
            aria-label="Close notifications"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onMarkAsRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative group ${
                notif.unread
                  ? "bg-[#FFF5F3] border-[#FF4304]/10 shadow-[0_2px_8px_rgba(255,67,4,0.02)]"
                  : "bg-white border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-1 pr-6">
                <span className="text-xs font-bold text-[#1D1E20] truncate max-w-[160px]">
                  {notif.title}
                </span>
                <span className="text-[9px] text-[#8F959E] font-medium whitespace-nowrap">
                  {notif.time}
                </span>
              </div>
              <p className="text-[11px] text-[#4B5563] leading-relaxed pr-6">
                {notif.message}
              </p>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notif.id);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#FF4304] hover:bg-[#FFF5F3] rounded-lg transition-colors"
                aria-label="Delete notification"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>

              {notif.unread && (
                <div className="mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4304]" />
                  <span className="text-[8px] font-bold text-[#FF4304] uppercase tracking-wider">
                    New
                  </span>
                </div>
              )}
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center text-text-secondary gap-3">
              <span className="text-2xl">🔔</span>
              <span className="text-xs font-bold text-text-primary block">
                No notifications
              </span>
              <span className="text-[10px] text-text-secondary">
                You are all caught up!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
