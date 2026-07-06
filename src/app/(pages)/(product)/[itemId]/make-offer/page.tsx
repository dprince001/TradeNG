"use client";

import { useState } from "react";
import CartIcon from "@/app/assets/svgs/home/CartIcon";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import useGet from "@/app/hooks/useGet";
import { useGetListingDetailQuery } from "@/app/redux/api/listingApiSlice";
import TopNavbar from "@/app/components/layout/TopNavbar";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import { useMakeAnOfferMutation, useCounterAnOfferMutation } from "@/app/redux/api/offersApiSlice";
import usePost from "@/app/hooks/usePost";
import { useStartConversationMutation } from "@/app/redux/api/chatApiSlice";


const MakeOfferPage = () => {
  const { itemId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // mode=counter to coubter existing offer
  const mode = searchParams.get("mode"); // "counter" | null
  const isCounter = mode === "counter";
  const conversationId = searchParams.get("c_id");

  const [offerAmount, setOfferAmount] = useState("");
  const [note, setNote] = useState("");

  const { handlePost: makeAnOffer, isLoading: makeAnOfferLoading } = usePost(useMakeAnOfferMutation);
  const { handlePost: counterAnOffer, isLoading: counterAnOfferLoading } = usePost(useCounterAnOfferMutation);
  const { handlePost: startConversation, isLoading: startConversationLoading } = usePost(useStartConversationMutation);
  const { data, isLoading: itemDetailsLoading } = useGet(useGetListingDetailQuery, itemId, !!itemId);

  const image = data?.listing?.images?.[0] || "";
  const itemName = data?.listing?.item_name || "";
  const itemPrice = Number(data?.listing?.price) || 0;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const isFormValid = offerAmount.trim() !== "";
  const isLoading = makeAnOfferLoading || counterAnOfferLoading || startConversationLoading;

  const handleSubmit = async () => {
    if (isCounter) {
      // get stored offerId from session
      const saved = sessionStorage.getItem(`counter-offer-${itemId}`);
      let offerId: string | null = null;
      let storedConvId: string | null = conversationId;

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          offerId = parsed.offerId;
          storedConvId = parsed.conversationId ?? conversationId;
        } catch (e) {
          console.log(e);
        }
      }

      if (!offerId) return;

      const res = await counterAnOffer({
        offerId,
        amount: Number(offerAmount),
        note,
      });

      if (res?.success) {
        sessionStorage.removeItem(`counter-offer-${itemId}`);
        // Go back to the chat page with the conversation id
        router.push(`/${itemId}/chat?c_id=${storedConvId}`);
      }
    } else {
      // Initial offer
      const res = await makeAnOffer({
        listingId: itemId,
        offer: {
          amount: Number(offerAmount),
          note,
        },
      });

      if (res?.success) {
        const response = await startConversation(
          { listing_id: itemId },
          { showSuccessToast: false }
        );

        if (response?.success) {
          router.push(`/${itemId}/chat?c_id=${response?.data?.conversation?.id}`);
        }
      }
    }
  };

  return (
    <AppShell showFooter={false} showBottomNav={false}>
    <div className="w-full flex flex-col bg-[#FAFAFA]">
      {/* ── Header ── */}
      <TopNavbar
        title={isCounter ? "Counter Offer" : "Make an Offer"}
        onBack={() => router.back()}
        rightElement={
          !isCounter ? (
            <button
              onClick={() => router.push("/confirm-order")}
              className="w-10 h-10 rounded-full bg-[#F5F6FA] text-[#1D1E20] hover:bg-brand-orange hover:text-white flex items-center justify-center relative transition-all duration-200"
            >
              <CartIcon />
            </button>
          ) : undefined
        }
      />

      <Container className="max-w-xl flex-1 overflow-y-auto pt-4 pb-8">
        {/* Item summary card */}
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

        {/* Counter context label */}
        {isCounter && (
          <div className="bg-[#FFF5F3] border border-primary/20 rounded-xl px-4 py-3 mb-6">
            <p className="text-xs font-semibold text-primary">
              💡 You're countering an offer
            </p>
            <p className="text-[11px] text-[#6B7280] mt-0.5">
              Enter your counter amount below. The buyer will be notified.
            </p>
          </div>
        )}

        <div className="mb-6">
          <Input
            label={isCounter ? "Your Counter Amount (₦)" : "Your Offer (₦)"}
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
            placeholder={isCounter ? "Explain your counter offer..." : "would you take 25k?"}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-[#FF4304] focus:ring-1 focus:ring-[#FF4304]/20 min-h-[140px] resize-none"
          />
        </div>
      </Container>

      <Container className="max-w-xl py-6">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid}
          fullWidth
          className={`py-4 rounded-xl font-semibold text-[15px] ${!isFormValid
            ? "bg-[#D1D5DB] text-white border-none opacity-100"
            : "bg-[#FF4304] text-white"
            }`}
          loading={isLoading}
        >
          {isCounter ? "Send Counter" : "Send Offer"}
        </Button>

        <p className="text-[11px] text-[#6B7280] mt-3 text-center">
          {isCounter
            ? "The buyer will see your counter and can accept, decline, or counter again."
            : "Sellers can accept, decline, or counter your offer."}
        </p>
      </Container>
    </div>
    </AppShell>
  );
};

export default MakeOfferPage;
