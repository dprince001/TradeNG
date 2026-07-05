"use client";

import { useState } from "react";
import SignIn from "@/app/components/auth/SignIn";
import SignUp from "@/app/components/auth/SignUp";
import OtpComponent from "@/app/components/auth/OtpComponent";
import ExploreComponent from "@/app/components/auth/ExploreComponent";
import AuthShell from "@/app/components/layout/AuthShell";

type AuthStep = "explore" | "signin" | "signup" | "otp";

const LoginPage = () => {
  const [step, setStep] = useState<AuthStep>("explore");
  const [email, setEmail] = useState("");

  return (
    <AuthShell>
      <div className="w-full flex flex-col justify-between relative select-none">
        {/* ── STEP 1: Explore the App ── */}
        {step === "explore" && <ExploreComponent setStep={setStep} />}

        {/* ── STEP 2: Sign In ── */}
        {step === "signin" && <SignIn setStep={setStep} />}

        {/* ── STEP 3: Sign Up ── */}
        {step === "signup" && <SignUp setStep={setStep} setEmail={setEmail} />}

        {/* ── STEP 4: OTP Verification ── */}
        {step === "otp" && <OtpComponent setStep={setStep} email={email} />}
      </div>
    </AuthShell>
  );
};

export default LoginPage;
