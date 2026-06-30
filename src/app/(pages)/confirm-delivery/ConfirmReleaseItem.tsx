"use client";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import SuccessIcon from "@/app/assets/svgs/home/SuccessIcon";

interface ConfirmReleaseModalProps {
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
  onReportProblem?: () => void;
}

const ConfirmReleaseModal = ({
  amount,
  onConfirm,
  onCancel,
  onReportProblem,
}: ConfirmReleaseModalProps) => {
  return (
    <Modal onClose={onCancel} className="flex flex-col items-center text-center">
      <div className="w-[56px] h-[56px] rounded-full bg-[#FFE8E0] flex items-center justify-center mb-4">
        <SuccessIcon color="#FF4304" size={30} />
      </div>

      <h2 className="text-text-primary text-base font-bold mb-2">Confirm Release?</h2>
      <p className="text-text-secondary text-sm leading-[1.65] mb-6">
        Are you sure you want to release ₦{amount.toLocaleString('en-NG')} to the seller? This action cannot be reversed
      </p>

      <Button
        fullWidth
        onClick={onConfirm}
        className="mb-3"
      >
        Yes, Release Payment
      </Button>

      <Button
        variant="outline"
        fullWidth
        className="border-primary text-primary"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Modal>
  );
};

export default ConfirmReleaseModal;