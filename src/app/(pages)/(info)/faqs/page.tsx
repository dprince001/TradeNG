"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import InfoPageHero from "@/app/components/layout/InfoPageHero";
import { FadeInItem, FadeInStagger } from "@/app/components/Motion";

const faqs = [
  {
    question: "How does escrow protection work?",
    answer:
      "When a buyer pays for a listing, the money is held by TradeNG rather than sent straight to the seller. It's only released to the seller once the buyer confirms receipt, or automatically after the confirmation window passes.",
  },
  {
    question: "What happens if an item doesn't arrive as described?",
    answer:
      "You can raise a dispute directly from your order before confirming receipt. Our support team reviews the case and mediates a resolution — refund, replacement, or partial release — before any funds are released to the seller.",
  },
  {
    question: "Can I negotiate a price with a seller?",
    answer:
      "Yes. Listings marked \"Negotiable\" accept offers. You can make an offer, the seller can accept, counter, or decline, and you'll see the full thread in your chat with that seller.",
  },
  {
    question: "How do I withdraw money from my wallet?",
    answer:
      "Add a payout bank under Wallet > Payout Banks, then request a withdrawal. Withdrawals are paid out to your linked bank account and tracked under Wallet > Withdrawals.",
  },
  {
    question: "How do I become a verified seller?",
    answer:
      "Request verification from your Profile > Settings. Verified sellers get a badge on their listings and appear in Top Sellers and Recent from Verified Sellers sections.",
  },
];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <FadeInItem className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-text-primary font-medium text-sm md:text-base">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-primary text-xl leading-none flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-text-secondary text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </FadeInItem>
  );
};

const FaqsPage = () => {
  return (
    <AppShell>
      <InfoPageHero
        eyebrow="Support"
        title="Frequently asked questions"
        subtitle="Answers to the questions we hear most about escrow, orders, offers, and payments."
      />

      <Container className="py-12 md:py-16 max-w-3xl">
        <FadeInStagger className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </FadeInStagger>
      </Container>
    </AppShell>
  );
};

export default FaqsPage;
