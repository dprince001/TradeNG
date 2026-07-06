"use client";

import { useState } from "react";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

interface ReportProblemModalProps {
  onCancel: () => void;
  onSubmit: (description: string) => void;
  isLoading?: boolean;
}

const ReportProblemModal = ({ onCancel, onSubmit, isLoading }: ReportProblemModalProps) => {
  const [description, setDescription] = useState("");

  return (
    <Modal onClose={onCancel}>
      <h2 className="text-text-primary text-base font-bold mb-2">Report a Problem</h2>
      <p className="text-text-secondary text-sm leading-[1.6] mb-4">
        Tell us what went wrong. This pauses the auto-release countdown while our team reviews it.
      </p>

      <Input
        type="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="e.g. Item arrived damaged, or doesn't match the listing description..."
      />

      <div className="flex gap-3 mt-5">
        <Button variant="outline" fullWidth className="border-primary text-primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          fullWidth
          loading={isLoading}
          disabled={description.trim().length < 5}
          onClick={() => onSubmit(description)}
        >
          Submit Report
        </Button>
      </div>
    </Modal>
  );
};

export default ReportProblemModal;
