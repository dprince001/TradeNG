import React from "react";

const ProgressBar = ({
  title,
  progress,
  comment,
  color,
}: {
  title: string;
  progress: number;
  comment?: string;
  color: string;
}) => {
  return (
    <div>
      <div className="w-full rounded-full h-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1D1E20]">{title}</h3>
          <span className="text-xs font-extrabold text-green-600">
            {progress} %
          </span>
        </div>
        <div
          className={`h-2 mt-2 rounded-full ${color}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs mt-4 text-gray-500">{comment}</p>
    </div>
  );
};

export default ProgressBar;
