"use client";

import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import InfoPageHero from "@/app/components/layout/InfoPageHero";
import { FadeInItem, FadeInStagger } from "@/app/components/Motion";

const sections = [
  {
    title: "Information we collect",
    body: "Your name, email, phone number, listings, transaction history, and messages exchanged with other users through TradeNG.",
  },
  {
    title: "How we use your information",
    body: "To process payments and escrow releases, verify sellers, prevent fraud, resolve disputes, and improve the marketplace experience.",
  },
  {
    title: "Sharing with third parties",
    body: "We share transaction data with payment processors and payout banks only as needed to complete a checkout or withdrawal — never sold to advertisers.",
  },
  {
    title: "Data retention",
    body: "Transaction and dispute records are retained as required for compliance and fraud prevention, even after an account is closed.",
  },
  {
    title: "Your choices",
    body: "You can update your profile information at any time, manage notification preferences in Settings, or request account deletion from your Profile.",
  },
];

const PrivacyPage = () => {
  return (
    <AppShell>
      <InfoPageHero eyebrow="Legal" title="Privacy Policy" />

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

export default PrivacyPage;
