import React from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";

type AddItemSuccessProps = {
  itemName: string;
  onReset: () => void;
};

const AddItemSuccess = ({ itemName, onReset }: AddItemSuccessProps) => {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-12">
      <div className="w-20 h-20 rounded-full bg-[#FFF5F3] border border-primary/10 flex items-center justify-center animate-bounce">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF4304"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-[#1D1E20] text-2xl font-extrabold tracking-tight">
          Listing Published!
        </h2>
        <p className="text-text-secondary text-sm px-6 leading-relaxed">
          Your item &ldquo;{itemName}&rdquo; is now active and visible to
          shoppers on TradeNG.
        </p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3 mt-6">
        <Button variant="primary" onClick={() => router.push("/")} fullWidth>
          Go to Homepage
        </Button>

        <Button
          variant="outline"
          className="text-primary border-primary hover:bg-[#FFF5F3]/40"
          onClick={onReset}
          fullWidth
        >
          Create Another Listing
        </Button>
      </div>
    </div>
  );
};

export default AddItemSuccess;
