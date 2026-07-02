import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import Image from "next/image";
import React from "react";
import IphoneImage from "@/app/assets/images/IphoneImage.png";

type ProductInEscrowProps = {
  itemName: string;
  totalAmount: number;
  formatNaira: (amount: number) => string;
};

const ProductInEscrow = ({
  itemName,
  totalAmount,
  formatNaira,
}: ProductInEscrowProps) => {
  return (
    <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-[64px] h-[64px] rounded-xl bg-[#F0F1F5] overflow-hidden flex-shrink-0 relative">
          <Image
            src={IphoneImage}
            alt={itemName}
            fill
            className="object-contain"
          />
        </div>

        <div>
          <p className="text-text-primary text-sm font-semibold mb-1">
            {itemName}
          </p>
          <p className="text-text-tertiary text-xs">Order #DEC-2024-001</p>
        </div>
      </div>

      {/* Escrow badge */}
      <div className="flex items-center gap-2 bg-[#FFE8E0] border border-[#FFB899] rounded-xl px-3 py-3 mt-4">
        <SecureIcon size={16} color="#FF4304" />
        <span className="text-[#C03000] text-sm">
          {formatNaira(totalAmount)} held in escrow
        </span>
      </div>
    </div>
  );
};

export default ProductInEscrow;
