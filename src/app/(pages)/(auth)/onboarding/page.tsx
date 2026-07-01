"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

const slides = [
  {
    title: "Find great deals on verified items near you.",
    subtitle: "Booking and saving made easy",
    illustration: "🛍️",
  },
  {
    title: "Turn your unused things into extra cash easily.",
    subtitle: "Booking and saving made easy",
    illustration: "💰",
  },
  {
    title: "Your Money Is Protected",
    subtitle: "We hold your payment until both sides are satisfied.",
    illustration: "🛡️",
  },
  {
    title: "Join the Decluttrr Community",
    subtitle: "We hold your payment until both sides are satisfied.",
    illustration: "🤝",
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
    <div className="w-full min-h-screen bg-[#F7F8FA] flex flex-col justify-between max-w-md mx-auto relative px-6 py-12 select-none overflow-hidden">
      {/* Skip Button */}
      {activeSlide < slides.length - 1 && (
        <div className="flex justify-end w-full">
          <button
            onClick={() => router.push("/login")}
            className="text-text-secondary text-sm font-semibold hover:text-[#1D1E20] transition-colors"
          >
            Skip
          </button>
        </div>
      )}

      {/* Illustration Area */}
      <div className="flex-1 flex items-center justify-center min-h-[280px]">
        <div className="text-[120px] filter drop-shadow-ll animate-bounce">
          {/* {current.illustration} */}
        </div>
      </div>

      {/* Text Info */}
      <div className="flex flex-col items-center text-center gap-3.5 mb-10 max-w-xs mx-auto">
        <h2 className="text-[#1D1E20] text-3xl font-bold leading-tight tracking-tight">
          {current.title}
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed font-medium">
          {current.subtitle}
        </p>
      </div>

      {/* Footer controls */}
      <div className="flex flex-col gap-6 w-full">
        {/* Pagination Dots */}
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1D1E20"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
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
  );
};

export default OnboardingPage;
