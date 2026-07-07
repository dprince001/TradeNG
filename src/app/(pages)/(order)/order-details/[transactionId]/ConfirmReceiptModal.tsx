"use client";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import { PackageCheck } from "lucide-react";

interface ConfirmReceiptModalProps {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmReceiptModal = ({ itemName, onConfirm, onCancel, isLoading }: ConfirmReceiptModalProps) => {
  return (
    <Modal onClose={onCancel} className="flex flex-col items-center text-center">
      <div className="w-[56px] h-[56px] rounded-full bg-[#FFE8E0] flex items-center justify-center mb-4">
        <PackageCheck size={28} className="text-primary" />
      </div>

      <h2 className="text-text-primary text-base font-bold mb-2">Confirm Receipt?</h2>
      <p className="text-text-secondary text-sm leading-[1.65] mb-6">
        Confirm that you have received <span className="font-semibold">{itemName}</span> in good
        condition. This starts a 48-hour countdown before funds auto-release to the seller.
      </p>

      <Button fullWidth onClick={onConfirm} loading={isLoading} className="mb-3">
        Yes, I&apos;ve Received It
      </Button>

      <Button variant="outline" fullWidth className="border-primary text-primary" onClick={onCancel}>
        Cancel
      </Button>
    </Modal>
  );
};

export default ConfirmReceiptModal;
