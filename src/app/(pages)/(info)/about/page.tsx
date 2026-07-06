"use client";

import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import InfoPageHero from "@/app/components/layout/InfoPageHero";
import { FadeInItem, FadeInStagger } from "@/app/components/Motion";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";

const values = [
  {
    title: "Trust by design",
    body: "Every listing, seller, and payment flows through an escrow layer so no one is ever exposed to a bad deal.",
  },
  {
    title: "Built for Nigerians",
    body: "Local banks, local pricing in Naira, and a support team that understands how Nigerians actually buy and sell.",
  },
  {
    title: "Fair to both sides",
    body: "Buyers only pay when they're happy, sellers only release when they're paid — TradeNG holds the balance in between.",
  },
];

const AboutPage = () => {
  return (
    <AppShell>
      <InfoPageHero
        eyebrow="Our story"
        title="A safer way to buy and sell, built for TradeNG's community"
        subtitle="TradeNG is a peer-to-peer marketplace where every transaction is protected by escrow — sellers list, buyers negotiate or buy instantly, and payment only moves when both sides are satisfied."
      />

      <Container className="py-12 md:py-16">
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {values.map((v) => (
            <FadeInItem
              key={v.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-text-primary font-semibold text-base mb-2">
                {v.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {v.body}
              </p>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <div className="mt-10 md:mt-14 rounded-2xl bg-[#FFF5F3] border border-primary/10 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <SecureIcon color="#FF4304" />
          <div>
            <h2 className="text-text-primary font-semibold text-lg mb-1.5">
              Escrow-protected, end to end
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
              Funds sit safely with TradeNG until a buyer confirms receipt, or an auto-release
              window passes. If something goes wrong, our dispute process steps in before any
              money moves.
            </p>
          </div>
        </div>
      </Container>
    </AppShell>
  );
};

export default AboutPage;
