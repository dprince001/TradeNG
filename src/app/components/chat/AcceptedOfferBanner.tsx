import Button from "@/app/components/Button";
import SuccessIcon from "@/app/assets/svgs/home/SuccessIcon";
import { formatNaira } from "@/lib/utils";

interface AcceptedOfferBannerProps {
  amount: number;
  onProceed: () => void;
}

const AcceptedOfferBanner = ({ amount, onProceed }: AcceptedOfferBannerProps) => {
  return (
    <div className="bg-[#FDF3F0] border-2 border-primary rounded-2xl text-primary p-5 text-center shadow-sm">
      <div className="flex items-center justify-center gap-2 mb-2">
        <SuccessIcon color="#FF4304" size={20} />
        <span className="text-xs font-bold">Offer accepted at</span>
      </div>

      <p className="text-[20px] font-bold mb-3 tracking-tight">{formatNaira(amount)}</p>

      <Button variant="primary" fullWidth onClick={onProceed}>
        Proceed to Secure Payment
      </Button>

      <p className="text-[10px] px-4 leading-relaxed mt-2 text-[#6B7280]">
        Your payment will be held securely until you confirm delivery
      </p>
    </div>
  );
};

export default AcceptedOfferBanner;
