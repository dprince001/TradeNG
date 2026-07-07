"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackIcon from "@/app/assets/svgs/home/BackIcon";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  fallbackHref?: string;
  onClick?: () => void;
  className?: string;
}

const BackButton = ({ fallbackHref, onClick, className }: BackButtonProps) => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  if (!onClick && !canGoBack && !fallbackHref) return null;

  const handleClick = () => {
    if (onClick) onClick();
    else if (canGoBack) router.back();
    else if (fallbackHref) router.push(fallbackHref);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Go back"
      className={cn(
        "w-[42px] h-[42px] rounded-full bg-[#F5F6FA] text-text-primary hover:bg-brand-orange hover:text-white transition-all duration-200 active:scale-95 flex items-center justify-center flex-shrink-0",
        className
      )}
    >
      <BackIcon />
    </button>
  );
};

export default BackButton;
