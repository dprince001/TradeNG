"use client";

import { useState } from "react";
import CartIcon from "@/app/assets/svgs/home/CartIcon";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import TopNavbar from "@/app/components/layout/TopNavbar";
import { useMakeAnOfferMutation } from "@/app/redux/api/offersApiSlice";
import usePost from "@/app/hooks/usePost";


const MakeOfferPage = () => {
  const { itemId } = useParams();
  const router = useRouter();
  const [offerAmount, setOfferAmount] = useState("");
  const [note, setNote] = useState("");
  const [mounted, setMounted] = useState(false);
  const [itemDetails, setItemDetails] = useState<{ image?: string; name?: string; price?: number } | null>(null);

  const {handlePost: makeAnOffer, isLoading: makeAnOfferLoading} = usePost(useMakeAnOfferMutation)

  const image = mounted ? itemDetails?.image || "" : "";
  const itemName = mounted ? itemDetails?.name || "" : "";
  const itemPrice = mounted ? Number(itemDetails?.price) || 0 : 0;
  
  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
  
  const isFormValid = offerAmount.trim() !== "";

  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem(`make-offer-${itemId}`);

    if (saved) {
      try {
        setItemDetails(JSON.parse(saved));
      } catch (e) {
        console.log(e);
      }
    }
  }, [itemId]);

  const handleSubmit = async () => {
    const res = await makeAnOffer({
      listingId: itemId,
      offer: {
        amount: Number(offerAmount),
        note,
      },

    });

    if(res?.success) {
      router.push('/chat')
    }

  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* ── Header ── */}
      <TopNavbar
        title="Make an Offer"
        onBack={() => router.back()}
        rightElement={
          <button
            onClick={() => router.push("/confirm-order")}
            className="w-10 h-10 rounded-full bg-[#F5F6FA] text-[#1D1E20] hover:bg-brand-orange hover:text-white flex items-center justify-center relative transition-all duration-200"
          >
            <CartIcon />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-8">
        <div className="flex items-center gap-3 mb-4 bg-white rounded-2xl px-4 py-4 mb-8">
          <div className="w-[70px] h-[70px] rounded-xl bg-[#F0F1F5] overflow-hidden flex-shrink-0 relative">
            {image ? (
              <img
                src={image}
                alt={itemName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#F0F1F5]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-text-primary text-sm font-semibold mb-1">
              {itemName}
            </p>
            <p className="text-text-primary font-bold mb-1.5">
              {formatNaira(itemPrice)}
            </p>

            <p className="text-xs text-text-tertiary">Listed Price</p>
          </div>
        </div>

        <div className="mb-6">
          <Input
            label="Your Offer (₦)"
            placeholder="e.g., 250,000"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            type="number"
          />
        </div>

        {/* Note Textarea */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Add a note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="would you take 25k?"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-[#FF4304] focus:ring-1 focus:ring-[#FF4304]/20 min-h-[140px] resize-none"
          ></textarea>
        </div>
      </div>

      <div className="px-5 py-6">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid}
          fullWidth
          className={`py-4 rounded-xl font-semibold text-[15px] ${!isFormValid
            ? "bg-[#D1D5DB] text-white border-none opacity-100"
            : "bg-[#FF4304] text-white"
            }`}
            loading={makeAnOfferLoading}
        >
          Send Offer
        </Button>

        <p className="text-[11px] text-[#6B7280] mt-3 text-center">
          Sellers can accept, decline, or counter your offer.
        </p>
      </div>
    </div>
  );
};

export default MakeOfferPage;
