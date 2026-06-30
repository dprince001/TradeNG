import { useState } from "react";
import UserIcon from "@/app/assets/svgs/home/UserIcon";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import Image from "next/image";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import LoveIcon from "@/app/assets/svgs/home/LoveIcon";

interface ProductCardProps {
  title: string;
  price: string;
  store?: string;
  negotiable?: boolean;
  onClick?: () => void;
}

const ProductCard = ({
  title,
  price,
  store,
  negotiable = false,
  onClick,
}: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div
      id={`product-card-${title.replace(/\s+/g, "-").toLowerCase()}`}
      onClick={onClick}
      className={`flex-1 min-w-0 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm ${onClick ? "cursor-pointer active:scale-[0.97] transition-transform" : ""}`}
    >
      <div className="relative w-full bg-[#EEF1F5] h-[170px]">
        <Image src={IphoneImage} alt="Iphone" fill />

        <button
          onClick={() => setLiked((l) => !l)}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <LoveIcon liked={liked} />
        </button>
      </div>

      {/* Info  */}
      <div className="px-3 pt-2.5 pb-3">
        <p className="text-text-primary text-xs font-medium leading-tight mb-1.5">
          {title}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-text-primary text-sm font-bold tracking-tight">
            {price}
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

          <span className="text-[#4B5563] text-[10px]">{store}</span>
          <VerifiedIcon />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
