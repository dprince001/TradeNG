"use client";

import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import InfoPageHero from "@/app/components/layout/InfoPageHero";
import { FadeInItem, FadeInStagger } from "@/app/components/Motion";

const sections = [
  {
    title: "1. Using TradeNG",
    body: "TradeNG is a peer-to-peer marketplace. By creating an account you agree to list, buy, and sell items honestly, and to only use the platform for lawful transactions.",
  },
  {
    title: "2. Escrow payments",
    body: "When a buyer pays for a listing, funds are held by TradeNG in escrow until the buyer confirms receipt or the auto-release window elapses. Sellers only receive funds after release.",
  },
  {
    title: "3. Offers and negotiation",
    body: "Negotiable listings accept offers. An accepted offer is a binding agreement to complete the transaction at the agreed price through TradeNG's checkout flow.",
  },
  {
    title: "4. Disputes",
    body: "If an item doesn't match its listing, buyers may raise a dispute before confirming receipt. TradeNG reviews evidence from both parties and decides how funds are released.",
  },
  {
    title: "5. Account responsibilities",
    body: "You're responsible for the accuracy of your listings, the security of your account, and for complying with all applicable laws relating to the items you sell.",
  },
  {
    title: "6. Termination",
    body: "TradeNG may suspend or close accounts that violate these terms, including fraudulent listings, repeated disputes found in bad faith, or abuse of other users.",
  },
];

const TermsPage = () => {
  return (
    <AppShell>
      <InfoPageHero eyebrow="Legal" title="Terms of Service" />

      <Container className="py-12 md:py-16 max-w-3xl">
        <FadeInStagger className="flex flex-col gap-6">
          {sections.map((s) => (
            <FadeInItem key={s.title}>
              <h2 className="text-text-primary font-semibold text-base md:text-lg mb-1.5">
                {s.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">{s.body}</p>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Container>
    </AppShell>
  );
};

export default TermsPage;
