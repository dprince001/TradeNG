"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import ArrowBackButton from "@/app/assets/svgs/ArrowBackButton";
import AuthShell from "@/app/components/layout/AuthShell";

const slides = [
  {
    title: "Find great deals on verified items near you.",
    subtitle: "Booking and saving made easy",
  },
  {
    title: "Turn your unused things into extra cash easily.",
    subtitle: "Booking and saving made easy",
  },
  {
    title: "Your Money Is Protected",
    subtitle: "We hold your payment until both sides are satisfied.",
    illustration: "🛡️",
  },
  {
    title: "Join the Decluttrr Community",
    subtitle: "We hold your payment until both sides are satisfied.",
  },
];

const OnboardingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide((prev) => prev + 1);
    } else {
      router.push("/login");
    }
  };

  const handleBack = () => {
    if (activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
    }
  };

  const current = slides[activeSlide];

  return (
    <AuthShell heading="Get started in minutes." subheading="Create your account and start buying or selling safely today.">
    <div className="w-full flex flex-col justify-between relative select-none">
      {/* Skip Button Spacer */}
      <div className="flex justify-end w-full min-h-[24px]">
        {activeSlide < slides.length - 1 && (
          <button
            onClick={() => router.push("/login")}
            className="text-text-secondary text-sm font-semibold hover:text-[#1D1E20] transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      {/*  */}

      {/* Text Info Footer controls */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col items-center text-center gap-3.5 mb-2 max-w-xs mx-auto">
          <h2 className="text-[#1D1E20] text-3xl font-bold">{current.title}</h2>
          <p className="mt-5 text-sm leading-relaxed font-medium">
            {current.subtitle}
          </p>
        </div>
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeSlide ? "w-6 bg-primary" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full">
          {activeSlide > 0 && activeSlide < slides.length - 1 ? (
            <>
              <button
                onClick={handleBack}
                className="w-12 h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <ArrowBackButton />
              </button>
              <Button
                fullWidth
                onClick={handleNext}
                className="font-bold py-3.5 shadow-md"
              >
                Next
              </Button>
            </>
          ) : activeSlide === 0 ? (
            <Button
              fullWidth
              onClick={handleNext}
              className="font-bold py-3.5 shadow-md"
            >
              Next
            </Button>
          ) : (
            <Button
              fullWidth
              onClick={handleNext}
              className="font-bold py-3.5 shadow-[0_4px_16px_rgba(255,67,4,0.25)] bg-primary"
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </div>
    </AuthShell>
  );
};

export default OnboardingPage;
