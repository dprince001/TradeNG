"use client";

import { useRouter } from "next/navigation";
import TopNavbar from "@/app/components/layout/TopNavbar";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import SuccessIcon from "@/app/assets/svgs/home/SuccessIcon";
import Button from "@/app/components/Button";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import Image from "next/image";
import Input from "@/app/components/Input";
import MessageIcon from "@/app/assets/svgs/home/MessageIcon";

const ChatPage = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* ── Header ── */}
      <TopNavbar
        onBack={() => router.back()}
        title={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E5FFF4] text-[#00E58F] flex items-center justify-center overflow-hidden">
              👤
            </div>

            <span className="text-text-primary font-semibold text-xs">TechHub Store</span>
            <VerifiedIcon color="#10B981" size="14" />
          </div>
        }
      />

      <div className="px-5 py-3 flex items-center gap-3 border-b border-gray-100 z-10">
        <div className="w-10 h-10 rounded flex-shrink-0 relative overflow-hidden">
          <Image src={IphoneImage} alt="" fill className="object-contain" />
        </div>

        <span className="text-xs font-medium text-text-primary">iPhone 13 Pro Max</span>
      </div>

      <div className="px-5 py-2.5 bg-[#F9E2DB] flex items-center gap-2 z-10 border-b border-[#F9E2DB]">
        <SecureIcon size={10} />

        <span className="text-[10px] text-primary">
          Payments are held safely until delivery is confirmed
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
        <div className="bg-primary text-white rounded-[16px] px-4 py-3 text-xs max-w-[80%] shadow-sm ml-auto mb-4">
          <p className="mb-2">
            Hi! Is this still available?
          </p>

          <span className="text-[10px] text-[#D1FAE5]">10:30 AM</span>
        </div>

        <div className="bg-white text-text-primary rounded-[16px] px-4 py-3 text-xs max-w-[80%] shadow-sm mr-auto mb-4">
          <p className="mb-2">
            Yes, it is! Would you like to make an offer?
          </p>

          <span className="text-[10px] text-[#6B7280]">10:32 AM</span>
        </div>

        {/* Buyer Offer Card */}
        <div className="flex flex-col items-end mb-4">
          <div className="bg-white border-2 border-[#FF4304] rounded-[16px] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[12px]">
                💰
              </div>

              <span className="text-xs font-semibold text-text-primary">Buyer offered</span>
            </div>

            <div className="text-[20px] font-bold text-primary mb-1">₦25,000</div>
            <p className="text-[10px] text-[#6B7280] mt-1 text-center">10:35 AM</p>
          </div>
        </div>

        {/* Seller Counter Offer Card */}
        <div className="flex flex-col items-start mb-4">
          <div className="bg-white border-2 border-[#FF4304] rounded-[16px] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[12px]">
                💰
              </div>

              <span className="text-xs font-semibold text-text-primary">Seller Countered with</span>
            </div>

            <div className="text-[20px] font-bold text-primary mb-1">₦27,000</div>

            <div className="flex items-center gap-2 mb-4 mt-2">
              <Button
                variant="primary"
                fullWidth
                // onClick={() => router.push("/payment")}
                size="sm"
              >
                Accept
              </Button>

              <Button
                variant="outline"
                fullWidth
                // onClick={() => router.push("/payment")}
                className="border-[#BBBBC8] text-[#BBBBC8]"
                size="sm"
              >
                Counter
              </Button>

              <Button
                variant="outline"
                fullWidth
                // onClick={() => router.push("/payment")}
                size="sm"
                className="border-[#BBBBC8] text-[#BBBBC8]"
              >
                Decline
              </Button>
            </div>

            <p className="text-[10px] text-[#6B7280] mt-1 text-center">10:35 AM</p>
          </div>
        </div>

        {/* Seller Message */}
        <div className="bg-white text-text-primary rounded-[16px] px-4 py-3 text-xs max-w-[80%] shadow-sm mr-auto mb-4">
          <p className="mb-2">
            Thanks for the offer! Can we meet at 27k?
          </p>

          <span className="text-[10px] text-[#6B7280]">10:42 AM</span>
        </div>

        {/* Action Card - Offer Accepted */}
        <div className="bg-[#FDF3F0] border-2 border-primary rounded-2xl text-primary p-5 text-center shadow-sm max-w-[80%] mx-auto mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SuccessIcon color="#FF4304" size={20}/>

            <span className="text-xs font-bold">Offer accepted at</span>
          </div>

          <p className="text-[20px] font-bold mb-3 tracking-tight">₦ 27,000</p>

          <Button
            variant="primary"
            fullWidth
            onClick={() => router.push("/payment")}
          >
            Proceed to Secure Payment
          </Button>

          <p className="text-[10px] px-4 leading-relaxed mt-2">
            Your payment will be held securely until you confirm delivery
          </p>
        </div>
      </div>

      {/* ── Input Area ── */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
        <Input placeholder="Type a message..." className="bg-[#F3F4F6] rounded-full"/>

        <button className="w-12 h-12 bg-[#FF4304] rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-orange-600 transition-colors shadow-sm active:scale-95">
          <MessageIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
