"use client";

import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import InfoPageHero from "@/app/components/layout/InfoPageHero";
import { FadeInItem, FadeInStagger } from "@/app/components/Motion";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";

const steps = [
  {
    step: "1",
    title: "Buyer pays into escrow",
    body: "When you check out, your payment is held securely by TradeNG — not sent directly to the seller.",
  },
  {
    step: "2",
    title: "Seller ships the item",
    body: "The seller sees the payment is secured and ships or hands over the item, tracked through your order.",
  },
  {
    step: "3",
    title: "Buyer confirms receipt",
    body: "Once you've received and checked the item, you confirm receipt — or it auto-releases after the confirmation window.",
  },
  {
    step: "4",
    title: "Seller gets paid",
    body: "Funds are released from escrow into the seller's TradeNG wallet, ready to withdraw to their bank.",
  },
];

const EscrowProtectionPage = () => {
  return (
    <AppShell>
      <InfoPageHero
        eyebrow="Escrow protection"
        title="Your money is safe until you say it's good"
        subtitle="Every TradeNG transaction — direct buy or negotiated offer — is protected by escrow from checkout to delivery."
      />

      <Container className="py-12 md:py-16">
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6">
          {steps.map((s) => (
            <FadeInItem
              key={s.step}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative"
            >
              <span className="text-primary/20 text-4xl font-bold absolute top-4 right-5">
                {s.step}
              </span>
              <h3 className="text-text-primary font-semibold text-sm mb-2 pr-8">
                {s.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">{s.body}</p>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <div className="mt-10 md:mt-14 rounded-2xl bg-[#FFF5F3] border border-primary/10 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <SecureIcon color="#FF4304" />
          <div>
            <h2 className="text-text-primary font-semibold text-lg mb-1.5">
              If something goes wrong
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
              You can raise a dispute any time before confirming receipt. Visit the{" "}
              <a href="/dispute-center" className="text-primary hover:underline">
                Dispute Center
              </a>{" "}
              to see how the process works.
            </p>
          </div>
        </div>
      </Container>
    </AppShell>
  );
};

export default EscrowProtectionPage;
