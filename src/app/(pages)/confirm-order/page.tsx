'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import IphoneImage from '@/app/assets/images/IphoneImage.png';
import BackIcon from '@/app/assets/svgs/home/BackIcon';
import CartIcon from '@/app/assets/svgs/home/CartIcon';
import LocationIcon from '@/app/assets/svgs/home/LocationIcon';
import SecureIcon from '@/app/assets/svgs/home/SecureIcon';
import InfoIcon from '@/app/assets/svgs/home/InfoIcon';
import UserIcon from '@/app/assets/svgs/home/UserIcon';
import VerifiedIcon from '@/app/assets/svgs/home/VerifiedIcon';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';

type DeliveryMethod = 'meetup' | 'delivery';

interface ConfirmOrderPageProps {
  onBack?: () => void;
  onProceed?: () => void;
}

const ConfirmOrderPage = ({ onBack, onProceed }: ConfirmOrderPageProps) => {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const router = useRouter();

  const itemPrice = 450000;
  const serviceFee = 2250;
  const grandTotal = itemPrice + serviceFee;

  const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString('en-NG')}`;

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen relative flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 bg-white">
        <button
          id="confirm-order-back-btn"
          onClick={onBack}
          className="w-[38px] h-[38px] rounded-full bg-[#F5F6FA] flex items-center justify-center"
        >
          <BackIcon />
        </button>
        <span className="text-[#1D1E20] text-[15px] font-semibold">Confirm Order</span>
        <button
          id="confirm-order-cart-btn"
          className="w-[38px] h-[38px] rounded-full bg-[#F5F6FA] flex items-center justify-center"
        >
          <CartIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pt-3">
        {/* ── Product Summary Card ── */}
        <div className="bg-white mx-4 rounded-2xl px-4 py-4 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[70px] h-[70px] rounded-xl bg-[#F0F1F5] overflow-hidden flex-shrink-0 relative">
              <Image src={IphoneImage} alt="iPhone 13 Pro Max" fill className="object-contain" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-sm font-semibold mb-1">iPhone 13 Pro Max</p>
              <p className="text-text-primary font-bold mb-1.5">{formatNaira(itemPrice)}</p>
              <div className="flex items-center gap-1">
                <div className="flex justify-center items-center w-4 h-4 rounded-full bg-[#D1FAE5]">
                  <UserIcon />
                </div>
                <span className="text-[#4B5563] text-[10px]">TechHub Store</span>
                <VerifiedIcon />
              </div>

            </div>
          </div>

          {/* Make an Offer strip */}
          <Button variant="outline" fullWidth className='border-primary border-2 flex gap-2 text-primary'>
            <span>💰</span>
            Make an Offer
          </Button>
        </div>

        {/* ── Delivery Method ── */}
        <div className="bg-white mx-4 rounded-2xl px-4 py-4 mb-5">
          <h2 className="text-text-primary text-sm font-bold mb-3">Delivery Method</h2>

          <button
            id="delivery-meetup-btn"
            onClick={() => setDeliveryMethod('meetup')}
            className={`w-full flex items-start gap-3 p-3.5 rounded-[14px] border-2 mb-2.5 text-left transition-all ${deliveryMethod === 'meetup'
              ? 'border-[#FF4304] bg-[#FFF5F3]'
              : 'border-[#E5E7EB] bg-white'
              }`}
          >
            <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${deliveryMethod === 'meetup' ? 'border-[#FF4304]' : 'border-[#D1D5DB]'
              }`}>
              {deliveryMethod === 'meetup' && (
                <div className="w-[8px] h-[8px] rounded-full bg-[#FF4304]" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <LocationIcon />
                <span className="text-text-primary text-sm font-semibold">Meet in person</span>
              </div>

              <p className="text-text-secondary text-xs">Arrange a safe meetup location with the seller</p>
            </div>
          </button>

          <button
            id="delivery-request-btn"
            onClick={() => setDeliveryMethod('delivery')}
            className={`w-full flex items-start gap-3 p-3.5 rounded-[14px] border-2 text-left transition-all ${deliveryMethod === 'delivery'
              ? 'border-[#FF4304] bg-[#FFF5F3]'
              : 'border-[#E5E7EB] bg-white'
              }`}
          >
            <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${deliveryMethod === 'delivery' ? 'border-[#FF4304]' : 'border-[#D1D5DB]'
              }`}>
              {deliveryMethod === 'delivery' && (
                <div className="w-[8px] h-[8px] rounded-full bg-[#FF4304]" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                🚚
                <span className="text-text-primary text-sm font-semibold">Request delivery</span>
              </div>

              <p className="text-text-secondary text-xs">Delivery via verified partners</p>
            </div>
          </button>
        </div>

        {/* ── Escrow Protection ── */}
        <div className="mx-4 mb-7">
          <div className="bg-[#FFF0EC] border border-[#FFCAB7] rounded-2xl px-4 py-4 flex items-start gap-3">
            <div className="w-[40px] h-[40px] rounded-full bg-[#FF4304] flex items-center justify-center flex-shrink-0">
              <SecureIcon size={25} color='white' />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-text-primary text-sm font-bold">Escrow Protection</span>
                <InfoIcon />
              </div>

              <p className="text-[#374151] text-xs leading-[1.6]">
                Your payment will be held securely until you confirm delivery. This protects both buyers and sellers in every transaction.
              </p>
            </div>
          </div>
        </div>

        {/* ── Total Cost ── */}
        <div className="bg-white mx-4 rounded-2xl p-4 shadow-md mb-5">
          <h2 className="text-text-primary text-sm font-bold mb-4">Total Cost</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Item Price</span>
              <span className="text-text-primary text-sm font-semibold">{formatNaira(itemPrice)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Service Fee</span>
              <span className="text-text-primary text-sm font-semibold">{formatNaira(serviceFee)}</span>
            </div>

            <div className="h-px bg-[#F0F1F5]" />
            <div className="flex items-center justify-between">
              <span className="text-text-primary font-bold">Grand Total</span>
              <span className="text-text-primary font-bold">{formatNaira(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <Button fullWidth onClick={() => router.push('/payment')}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default ConfirmOrderPage;
