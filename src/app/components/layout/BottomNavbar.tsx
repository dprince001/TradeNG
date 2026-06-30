"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";

const BottomNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "/home";
  const isProfile = pathname === "/profile" || pathname?.startsWith("/profile");

  return (
    <div className="border-t border-gray-100 bg-white py-3 px-6 flex justify-between items-center w-full absolute bottom-0 left-0 z-20">
      <button
        onClick={() => router.push("/")}
        className="flex flex-col items-center gap-1 flex-1"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={isHome ? "#FF4304" : "none"}
          stroke={isHome ? "#FF4304" : "#8F959E"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className={`text-[10px] font-medium ${isHome ? "text-primary" : "text-text-secondary"}`}>Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 flex-1 cursor-not-allowed opacity-60">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8F959E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="text-[10px] text-text-secondary font-medium">
          Favourites
        </span>
      </button>
      <button className="flex flex-col items-center gap-1 flex-1 cursor-not-allowed opacity-60">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8F959E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="text-[10px] text-text-secondary font-medium">
          Chat
        </span>
      </button>
      <button
        onClick={() => router.push("/profile")}
        className="flex flex-col items-center gap-1 flex-1"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={isProfile ? "#FF4304" : "none"}
          stroke={isProfile ? "#FF4304" : "#8F959E"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className={`text-[10px] font-medium ${isProfile ? "text-primary" : "text-text-secondary"}`}>
          Profile
        </span>
      </button>
    </div>
  );
};

export default BottomNavbar;
