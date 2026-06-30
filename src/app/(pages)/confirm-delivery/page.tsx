'use client';

import { useState } from 'react';
import Image from 'next/image';
import IphoneImage from '@/app/assets/images/IphoneImage.png';
import BackIcon from '@/app/assets/svgs/home/BackIcon';
import SecureIcon from '@/app/assets/svgs/home/SecureIcon';
import InfoIcon from '@/app/assets/svgs/home/InfoIcon';
import Button from '@/app/components/Button';
import ConfirmReleaseModal from './ConfirmReleaseItem';

interface ConfirmDeliveryPageProps {
  onBack?: () => void;
  onReleasePayment?: () => void;
  onReportProblem?: () => void;
}

const ConfirmDeliveryPage = ({
  onBack,
  onReleasePayment,
  onReportProblem,
}: ConfirmDeliveryPageProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const totalAmount = 457250;

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] flex flex-col relative">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 bg-white">
        <button
          onClick={onBack}
          className="w-[38px] h-[38px] rounded-full bg-[#F5F6FA] flex items-center justify-center"
        >
          <BackIcon />
        </button>
        <span className="text-text-primary text-[15px] font-semibold">Confirm delivery</span>
        <div className="w-[38px]" />
      </div>

      <div className="flex-1 overflow-y-auto pt-4 pb-6">
        {/* ── Order Card ── */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[56px] h-[56px] rounded-xl bg-[#F0F1F5] overflow-hidden flex-shrink-0 relative">
              <Image src={IphoneImage} alt="iPhone 13 Pro Max" fill className="object-contain" />
            </div>

            <div>
              <p className="text-text-primary text-sm font-semibold mb-1">iPhone 13 Pro Max</p>
              <p className="text-text-tertiary text-xs">Order #DEC-2024-001</p>
            </div>
          </div>

          {/* Escrow badge */}
          <div className="flex items-center gap-2 bg-[#FFE8E0] border border-[#FFB899] rounded-xl px-3 py-2.5">
            <SecureIcon size={16} color="#FF4304" />
            <span className="text-[#C03000] text-[10px] font-medium">
              ₦{totalAmount.toLocaleString('en-NG')} held in escrow
            </span>
          </div>
        </div>

        {/* ── Have you received section ── */}
        <div className="mx-4 bg-white rounded-2xl p-5 mb-4 flex flex-col items-center text-center">
          <div className="w-[64px] h-[64px] rounded-full bg-[#FFF0EC] flex items-center justify-center mb-4">
            <span className="text-[30px]">📦</span>
          </div>

          <h2 className="text-text-primary text-base font-bold mb-2">Have you received your item?</h2>
          <p className="text-text-tertiary text-sm leading-[1.65] mb-5">
            Please confirm that you have received your iPhone 13 Pro Max in good condition.
          </p>

          <Button
            fullWidth
            onClick={() => setShowConfirmModal(true)}
            className="mb-3"
          >
            Yes, Release Payment
          </Button>

          <Button
            variant="outline"
            fullWidth
            className="border-primary text-primary"
            onClick={onReportProblem}
          >
            Report a Problem
          </Button>
        </div>

        {/* ── Escrow Protection Active ── */}
        <div className="mx-4 bg-[#FFE8E0] border border-[#FFB899] rounded-2xl p-4 mb-4 flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0">
            <SecureIcon size={18} color="#FF4304" />
          </div>

          <div className='text-[#C03000]'>
            <p className="text-sm font-semibold mb-1">Escrow Protection Active</p>
            <p className="text-xs leading-[1.6]">
              Once you confirm delivery, the funds will be released to the seller. If there is an issue, report it and we will help resolve the matter.
            </p>
          </div>
        </div>

        {/* ── Important Notice ── */}
        <div className="mx-4 bg-[#F3F4F6] rounded-2xl p-4 flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0">
            <InfoIcon color="#4B5563" />
          </div>

          <div className='text-[#374151]'>
            <p className="text-text-primary text-sm font-semibold mb-1">Important Notice</p>
            <p className="text-xs leading-[1.6]">
              Only confirm delivery if you have physically received and inspected the item. This action cannot be undone.
            </p>
          </div>
        </div>

      </div>

      {/* ── Confirm Release Modal ── */}
      {showConfirmModal && (
        <ConfirmReleaseModal
          amount={totalAmount}
          onConfirm={() => {
            setShowConfirmModal(false);
            onReleasePayment?.();
          }}
          onCancel={() => setShowConfirmModal(false)}
          onReportProblem={() => {
            setShowConfirmModal(false);
            onReportProblem?.();
          }}
        />
      )}
    </div>
  );
};

export default ConfirmDeliveryPage;
