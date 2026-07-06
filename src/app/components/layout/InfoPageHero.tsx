import React from "react";
import Container from "@/app/components/layout/Container";
import { PageTransition } from "@/app/components/Motion";

interface InfoPageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

const InfoPageHero = ({ eyebrow, title, subtitle }: InfoPageHeroProps) => {
  return (
    <section className="bg-brand-gradient">
      <Container className="py-14 md:py-20 text-center">
        <PageTransition>
          {eyebrow && (
            <span className="inline-block text-white/80 text-xs font-semibold tracking-wide uppercase mb-3">
              {eyebrow}
            </span>
          )}
          <h1 className="text-white text-2xl md:text-4xl font-bold tracking-tight max-w-2xl mx-auto">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/80 text-sm md:text-base mt-3 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </PageTransition>
      </Container>
    </section>
  );
};

export default InfoPageHero;
