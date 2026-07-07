"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

interface ReviewModalProps {
  revieweeName: string;
  revieweeLabel: string;
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ReviewModal = ({
  revieweeName,
  revieweeLabel,
  onSubmit,
  onCancel,
  isLoading,
}: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const displayRating = hoverRating || rating;

  return (
    <Modal onClose={onCancel} className="flex flex-col items-center text-center">
      <h2 className="text-text-primary text-base font-bold mb-2">Rate this {revieweeLabel}</h2>
      <p className="text-text-secondary text-sm leading-[1.65] mb-5">
        How was your experience with <span className="font-semibold">{revieweeName}</span>?
      </p>

      <div className="flex gap-1.5 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            className="p-0.5"
          >
            <Star
              size={32}
              fill={star <= displayRating ? "#F59E0B" : "none"}
              stroke="#F59E0B"
              strokeWidth={2}
            />
          </button>
        ))}
      </div>

      <div className="w-full mb-6">
        <Input
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share more about your experience (optional)"
        />
      </div>

      <Button
        fullWidth
        onClick={() => onSubmit(rating, comment)}
        loading={isLoading}
        disabled={rating === 0}
        className="mb-3"
      >
        Submit Review
      </Button>

      <Button variant="outline" fullWidth className="border-primary text-primary" onClick={onCancel}>
        Maybe Later
      </Button>
    </Modal>
  );
};

export default ReviewModal;
