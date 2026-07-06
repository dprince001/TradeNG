import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import React from "react";

type ProductInEscrowProps = {
  itemName: string;
  totalAmount: number;
  formatNaira: (amount: number) => string;
  image?: string;
  orderRef?: string;
};

const ProductInEscrow = ({
  itemName,
  totalAmount,
  formatNaira,
  image,
  orderRef,
}: ProductInEscrowProps) => {
  return (
    <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-[64px] h-[64px] rounded-xl bg-[#F0F1F5] overflow-hidden flex-shrink-0 relative">
          {image && <img src={image} alt={itemName} className="w-full h-full object-cover" />}
        </div>

        <div>
          <p className="text-text-primary text-sm font-semibold mb-1">
            {itemName}
          </p>
          {orderRef && <p className="text-text-tertiary text-xs">Order #{orderRef}</p>}
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
