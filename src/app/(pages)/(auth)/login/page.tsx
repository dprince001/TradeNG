"use client";

import { useState } from "react";
import SignIn from "@/app/components/auth/SignIn";
import SignUp from "@/app/components/auth/SignUp";
import OtpComponent from "@/app/components/auth/OtpComponent";
import ExploreComponent from "@/app/components/auth/ExploreComponent";

type AuthStep = "explore" | "signin" | "signup" | "otp";

const LoginPage = () => {
  const [step, setStep] = useState<AuthStep>("explore");
  const [email, setEmail] = useState("");

  return (
    <div className="w-full min-h-screen flex flex-col justify-between max-w-md mx-auto relative px-6 py-12 select-none overflow-y-auto bg-[#F7F8FA]">
      {/* ── STEP 1: Explore the App ── */}
      {step === "explore" && <ExploreComponent setStep={setStep} />}

      {/* ── STEP 2: Sign In ── */}
      {step === "signin" && <SignIn setStep={setStep} />}

      {/* ── STEP 3: Sign Up ── */}
      {step === "signup" && <SignUp setStep={setStep} setEmail={setEmail} />}

      {/* ── STEP 4: OTP Verification ── */}
      {step === "otp" && <OtpComponent setStep={setStep} email={email} />}
    </div>
  );
};

export default LoginPage;
