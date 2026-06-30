'use client';

import { useState } from 'react';
import BackIcon from '@/app/assets/svgs/home/BackIcon';
import CardIcon from '@/app/assets/svgs/home/CardIcon';
import WalletIcon from '@/app/assets/svgs/home/WalletIcon';
import BankIcon from '@/app/assets/svgs/home/BankIcon';
import SecureIcon from '@/app/assets/svgs/home/SecureIcon';
import LockIcon from '@/app/assets/svgs/home/LockIcon';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';

type PaymentMethod = 'card' | 'wallet' | 'bank';

interface PaymentPageProps {
  onBack?: () => void;
  onPaySuccess?: () => void;
}

const PaymentPage = ({ onBack, onPaySuccess }: PaymentPageProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const itemTotal = 450000;
  const deliveryFee = 5000;
  const platformFee = 2250;
  const totalAmount = itemTotal + deliveryFee + platformFee;

  const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString('en-NG')}`;

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      label: 'Debit/Credit Card',
      icon: <CardIcon size={20} color={paymentMethod === 'card' ? '#FF4304' : '#1D1E20'} />,
      subtitle: null,
    },
    {
      id: 'wallet' as PaymentMethod,
      label: 'Wallet Balance',
      icon: <WalletIcon size={20} color={paymentMethod === 'wallet' ? '#FF4304' : '#1D1E20'} />,
      subtitle: 'Available: ₦500,000',
    },
    {
      id: 'bank' as PaymentMethod,
      label: 'Bank Transfer',
      icon: <BankIcon size={20} color={paymentMethod === 'bank' ? '#FF4304' : '#1D1E20'} />,
      subtitle: null,
    },
  ];

  const canPay = agreed;

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen relative flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 bg-white">
        <button
          id="payment-back-btn"
          onClick={onBack}
          className="w-[38px] h-[38px] rounded-full bg-[#F5F6FA] flex items-center justify-center"
        >
          <BackIcon />
        </button>
        <span className="text-[#1D1E20] text-[15px] font-semibold">Payment</span>
        <div className="w-[38px]" />
      </div>

      <div className="flex-1 overflow-y-auto pt-3">
        {/* ── Payment Method ── */}
        <div className="bg-white mx-4 rounded-2xl px-4 py-4 mb-5">
          <h2 className="text-[#1D1E20] text-sm font-bold mb-3">Payment Method</h2>

          <div className="space-y-2.5">
            {paymentMethods.map(method => (
              <button
                key={method.id}
                id={`payment-method-${method.id}-btn`}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[14px] border-2 text-left transition-all ${paymentMethod === method.id
                  ? 'border-[#FF4304] bg-[#FFF5F3]'
                  : 'border-[#E5E7EB] bg-white'
                  }`}
              >
                <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${paymentMethod === method.id ? 'border-[#FF4304]' : 'border-[#D1D5DB]'
                  }`}>
                  {paymentMethod === method.id && (
                    <div className="w-[8px] h-[8px] rounded-full bg-[#FF4304]" />
                  )}
                </div>

                <div className="flex items-center gap-2.5 flex-1">
                  {method.icon}
                  <div>
                    <span className={`text-sm font-semibold text-text-primary`}>{method.label}</span>
                    {method.subtitle && (
                      <p className="text-[#4B5563] text-xs mt-0.5 font-light">{method.subtitle}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Payment Summary ── */}
        <div className="bg-white mx-4 rounded-2xl p-4 shadow-md mb-5">
          <h2 className="text-text-primary text-sm font-bold mb-4">Payment Summary</h2>

          <div className="space-y-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Item Total</span>
              <span className="text-text-primary text-sm font-semibold">{formatNaira(itemTotal)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Delivery Fee</span>
              <span className="text-text-primary text-sm font-semibold">{formatNaira(deliveryFee)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Platform Fee</span>
              <span className="text-text-primary text-sm font-semibold">{formatNaira(platformFee)}</span>
            </div>

            <div className="h-px bg-[#F0F1F5]" />
            <div className="flex items-center justify-between">
              <span className="text-text-primary font-bold">Total Amount</span>
              <span className="text-text-primary font-bold">{formatNaira(totalAmount)}</span>
            </div>
          </div>

          {/* notice */}
          <div className="bg-[#FFE8E0] border border-[#FFB899] rounded-[12px] px-3.5 py-3 flex gap-2">
            <SecureIcon size={22} color="#FF4304" />
            <p className="text-[#C03000] text-[10px] leading-[1.5]">
              Your payment will be held securely in escrow until you confirm delivery
            </p>
          </div>
        </div>

        {/* ── Agreement ── */}
        <div className="bg-white flex rounded-2xl p-4 gap-2 mx-4 mb-6">
          <div className="mt-0.5 flex-shrink-0">
            <Input
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="hidden"
              type='checkbox'
            />

            <div
              onClick={() => setAgreed(a => !a)}
              className={`w-5 h-5 rounded-[5px] border-2 flex items-center justify-center transition-all ${agreed ? 'bg-[#FF4304] border-[#FF4304]' : 'border-[#D1D5DB] bg-white'
                }`}
            >
              {agreed && (
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M1 4l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>

          <p className="text-[#374151] text-xs leading-[1.6]">
            I understand my payment will be held in escrow until I confirm delivery of the item in good condition.
          </p>
        </div>

        {/* ── Trust Badges ── */}
        <div className="mx-4 pb-2">
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-full bg-[#FFE8E0] flex items-center justify-center">
                <LockIcon size={20} color="#FF4304" />
              </div>
              <span className="text-[#4B5563] text-[10px]">Secure</span>
            </div>

            {/* Protected */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-full bg-[#FFE8E0] flex items-center justify-center">
                <SecureIcon size={20} color="#FF4304" />
              </div>
              <span className="text-[#4B5563] text-[10px]">Protected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <Button
          onClick={canPay ? () => router.push('/payment-success') : undefined}
          disabled={!canPay}
          fullWidth
          className='font-bold'
        >
          Pay ₦{totalAmount.toLocaleString('en-NG')} Securely
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
