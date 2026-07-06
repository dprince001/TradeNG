import Container from "@/app/components/layout/Container";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";

const EscrowBanner = () => {
  return (
    <section className="py-2">
      <Container>
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(100deg, #0D0500 0%, #7A1E00 45%, #C03300 100%)",
          }}
        >
          <div className="flex items-center justify-between px-5 py-6 md:px-10 md:py-10">
            <div>
              <p className="text-white text-[15px] md:text-xl font-bold leading-snug">
                Buy Safely with Escrow
              </p>
              <p className="text-white/65 text-xs md:text-sm mt-1 max-w-sm">
                Your money is protected until you confirm delivery — for every buyer and seller.
              </p>
            </div>
            <SecureIcon color="white" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EscrowBanner;
