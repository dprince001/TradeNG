import { useState } from "react";
import UserIcon from "@/app/assets/svgs/home/UserIcon";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import Image from "next/image";
import LoveIcon from "@/app/assets/svgs/home/LoveIcon";
import useAuthGuard from "@/app/hooks/useAuthGuard";
import LoginRequiredModal from "@/app/components/auth/LoginRequiredModal";

interface ProductCardProps {
  title: string;
  start_price?: string;
  item_name?: string;
  price?: string;
  seller?: {
    first_name: string;
    last_name: string;
    is_verified_seller: boolean;
  };
  images?: string[];
  negotiable?: boolean;
  onClick?: () => void;
}

const ProductCard = ({
  title,
  item_name,
  start_price,
  price,
  images,
  seller,
  negotiable = false,
  onClick,
}: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const { guard, promptOpen, closePrompt } = useAuthGuard(
    "Sign in to save items to your favourites."
  );

  return (
    <div
      onClick={onClick}
      className={`flex-1 min-w-0 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm ${onClick ? "cursor-pointer active:scale-[0.97] transition-transform" : ""}`}
    >
      {promptOpen && <LoginRequiredModal onClose={closePrompt} message="Sign in to save items to your favourites." />}

      <div className="relative w-full bg-[#EEF1F5] h-[170px] sml:h-[190px] lg:h-[210px]">
        <Image src={images?.[0] || ""} alt={title || "Product"} fill className="object-cover" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            guard(() => setLiked((l) => !l));
          }}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <LoveIcon liked={liked} />
        </button>
      </div>

      {/* Info  */}
      <div className="px-3 pt-2.5 pb-3">
        <p className="text-text-primary text-xs font-medium leading-tight mb-1.5">
          {title || item_name}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-text-primary text-sm font-bold tracking-tight">
            {start_price || price}
          </span>
          {negotiable && (
            <span className="text-[8px] text-primary bg-[#F9E2DB] p-1.5 px-2 rounded-md leading-tight">
              Negotiable
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex justify-center items-center w-4 h-4 rounded-full bg-[#D1FAE5]">
            <UserIcon />
          </div>

          <span className="text-[#4B5563] text-[10px]">{seller?.first_name + " " + seller?.last_name}</span>
          {seller?.is_verified_seller && <VerifiedIcon />}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
