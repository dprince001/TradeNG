"use client";

import { useRouter } from "next/navigation";
import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import InfoPageHero from "@/app/components/layout/InfoPageHero";
import { FadeInItem, FadeInStagger } from "@/app/components/Motion";
import Button from "@/app/components/Button";

const steps = [
  {
    title: "Raise it before you confirm receipt",
    body: "Open the order in question and choose \"Report a Problem\" — this pauses the auto-release countdown while it's reviewed.",
  },
  {
    title: "Tell us what happened",
    body: "Describe the issue (item not as described, not delivered, damaged) so our team has the full picture.",
  },
  {
    title: "We review both sides",
    body: "Our support team looks at the listing, chat history, and any evidence from both buyer and seller.",
  },
  {
    title: "Funds are resolved fairly",
    body: "Depending on the outcome, funds are released to the seller, refunded to the buyer, or split.",
  },
];

const DisputeCenterPage = () => {
  const router = useRouter();

  return (
    <AppShell>
      <InfoPageHero
        eyebrow="Support"
        title="Dispute Center"
        subtitle="Something not go as expected? Here's how TradeNG resolves order disputes fairly for both buyers and sellers."
      />

      <Container className="py-12 md:py-16 max-w-3xl">
        <FadeInStagger className="flex flex-col gap-4">
          {steps.map((s, i) => (
            <FadeInItem
              key={s.title}
              className="flex gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="text-text-primary font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{s.body}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <div className="mt-8 flex flex-col sml:flex-row gap-3">
          <Button fullWidth onClick={() => router.push("/profile/orders")}>
            View my orders
          </Button>
          <Button fullWidth variant="outline" onClick={() => router.push("/contact")}>
            Contact support instead
          </Button>
        </div>
      </Container>
    </AppShell>
  );
};

export default DisputeCenterPage;
