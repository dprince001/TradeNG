import React from "react";
import Button from "../Button";
import { toast } from "sonner";

const LogoutButton = () => {
  return (
    <div>
      <div className="mt-auto pt-6 flex flex-col gap-4 text-center">
        <Button
          onClick={() => {
            toast.success("Logged out successfully.");
          }}
          className="w-full border border-red-500 rounded-xl py-3.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Log Out
        </Button>

        <Button
          onClick={() => toast.success("Account deletion request sent.")}
          className="text-[10px] font-bold text-text-secondary hover:text-red-500 cursor-pointer hover:underline"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default LogoutButton;
