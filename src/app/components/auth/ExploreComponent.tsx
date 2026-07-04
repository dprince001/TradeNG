import React from "react";
import Button from "../Button";

const ExploreComponent = ({
  setStep,
}: {
  setStep: (step: "explore" | "signin" | "signup" | "otp") => void;
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between w-full h-full animate-fadeIn p-5">
      <div className="w-full mt-auto pb-20">
        <div className="flex flex-col items-center text-center gap-3.5 mb-8">
          <h2 className="text-[#1D1E20] text-3xl font-black leading-tight tracking-tight">
            Explore the app
          </h2>
          <p className="text-md max-w-xs">
            Discover great deals on pre-owned items or turn your unused things into cash, all in one place.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button
            fullWidth
            onClick={() => setStep("signin")}
            variant="primary"
            className="py-3.5 font-bold shadow-md"
          >
            Sign In
          </Button>

          <Button
            fullWidth
            onClick={() => setStep("signup")}
            variant="outline"
            className="py-3.5 border-primary text-primary font-bold hover:bg-[#FFF5F3]/50 transition-colors"
          >
            Create account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreComponent;
