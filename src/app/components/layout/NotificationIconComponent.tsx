import React from "react";

interface NotificationIconProps {
  count?: number;
  className?: string;
  color?: string;
}

const NotificationIconComponent = ({
  count = 3,
  className = "",
  color = "currentColor",
}: NotificationIconProps) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.73 21a2 2 0 0 1-3.46 0"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-[#FF4304] text-white text-[8px] font-extrabold rounded-full h-3.5 min-w-[14px] px-1 flex items-center justify-center shadow-sm border border-white">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationIconComponent;
