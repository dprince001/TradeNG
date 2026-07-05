import React from "react";

export const Spinner = ({ className = "w-6 h-6 text-primary" }: { className?: string }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        className={`animate-spin ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col flex-shrink-0 w-[74px] h-[78px] rounded-[12px] border border-gray-150 items-center justify-center gap-1.5 animate-pulse bg-white/70 shadow-sm"
        >
          <div className="w-[28px] h-[28px] rounded-full bg-gray-200" />
          <div className="w-10 h-2 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
};

export const ListingSkeleton = () => {
  return (
    <div className="flex gap-3 w-full">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 min-w-0 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse flex flex-col"
        >
          <div className="w-full bg-gray-150 h-[170px]" />
          <div className="p-3.5 flex-1 flex flex-col gap-2 bg-white">
            <div className="w-3/4 h-3.5 bg-gray-200 rounded" />
            <div className="w-1/2 h-3.5 bg-gray-200 rounded mt-1" />
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <div className="w-[18px] h-[18px] rounded-full bg-gray-200" />
              <div className="w-1/2 h-2.5 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
