import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import { cn } from "@/lib/utils";

const EscrowNoticeBar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("bg-[#F9E2DB] flex items-center gap-2 px-4 py-2.5", className)}>
      <SecureIcon size={10} />
      <span className="text-[10px] text-primary">
        Payments are held safely until delivery is confirmed
      </span>
    </div>
  );
};

export default EscrowNoticeBar;
