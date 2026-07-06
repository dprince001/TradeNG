interface ConversationListItemProps {
  avatarUrl?: string;
  name: string;
  itemName: string;
  preview: string;
  time: string;
  unread: boolean;
  active: boolean;
  onClick: () => void;
}

const ConversationListItem = ({
  avatarUrl,
  name,
  itemName,
  preview,
  time,
  unread,
  active,
  onClick,
}: ConversationListItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-4 py-3.5 text-left border-b border-gray-50 transition-colors ${
        active ? "bg-[#FFF5F3]" : "hover:bg-gray-50"
      }`}
    >
      <div className="w-11 h-11 rounded-full bg-[#E5FFF4] text-[#00E58F] flex items-center justify-center overflow-hidden flex-shrink-0">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          "👤"
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-sm truncate ${unread ? "font-bold text-text-primary" : "font-semibold text-text-primary"}`}>
            {name}
          </span>
          <span className="text-[10px] text-text-secondary flex-shrink-0">{time}</span>
        </div>
        <span className="text-text-secondary text-xs truncate block mt-0.5">{itemName}</span>
        <p className={`text-xs truncate mt-1 ${unread ? "font-semibold text-text-primary" : "text-text-secondary"}`}>
          {preview}
        </p>
      </div>

      {unread && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
    </button>
  );
};

export default ConversationListItem;
