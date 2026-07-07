import React from "react";

interface CartIconProps {
  count?: number;
  className?: string;
  color?: string;
}

const CartIcon = ({ count = 0, className = "", color = "currentColor" }: CartIconProps) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.8623 19.7083H14.5145C17.3253 19.7083 19.4816 18.693 18.8692 14.6069L18.1559 9.0691C17.7784 7.0302 16.4779 6.24988 15.3367 6.24988H6.00646C4.84856 6.24988 3.62355 7.08894 3.18723 9.0691L2.47404 14.6069C1.95383 18.2316 4.05147 19.7083 6.8623 19.7083Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.73657 6.04851C6.73657 3.86128 8.50967 2.08817 10.6969 2.08817C11.7501 2.08371 12.7618 2.49898 13.5081 3.24218C14.2545 3.98537 14.674 4.99525 14.674 6.04851"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="11.5" r="1" fill={color} />
        <circle cx="14" cy="11.5" r="1" fill={color} />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1.5 bg-[#FF4304] text-white text-[8px] font-extrabold rounded-full h-3.5 min-w-[14px] px-1 flex items-center justify-center shadow-sm">
          {count}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
