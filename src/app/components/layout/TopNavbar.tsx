import React from "react";
import BackIcon from "@/app/assets/svgs/home/BackIcon";
import Button from "../Button";

interface TopNavbarProps {
  title: React.ReactNode;
  onBack: () => void;
  rightElement?: React.ReactNode;
}

const TopNavbar: React.FC<TopNavbarProps> = ({
  title,
  onBack,
  rightElement,
}) => {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-4 bg-white border-b border-gray-50/50 sticky top-0 z-30">
      <Button
        onClick={onBack}
        variant="none"
        className="w-[42px] h-[42px] rounded-full bg-[#F5F6FA] text-text-primary hover:bg-brand-orange hover:text-white transition-all duration-200 active:scale-95 flex items-center justify-center"
        aria-label="Go back"
      >
        <BackIcon />
      </Button>

      <span className="text-text-primary font-semibold text-base tracking-wide">
        {title}
      </span>

      <div className="min-w-[42px] flex items-center justify-end">
        {rightElement || <div className="w-[42px]" />}
      </div>
    </div>
  );
};

export default TopNavbar;
