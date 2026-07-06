"use client";

import { useState } from "react";
import SignUp from "@/app/components/auth/SignUp";
import OtpComponent from "@/app/components/auth/OtpComponent";
import AuthShell from "@/app/components/layout/AuthShell";

type RegisterStep = "signup" | "otp";

const RegisterPage = () => {
  const [step, setStep] = useState<RegisterStep>("signup");
  const [email, setEmail] = useState("");

  return (
    <AuthShell>
      <div className="w-full flex flex-col justify-between relative select-none">
        {step === "signup" && (
          <SignUp
            setStep={(s) => {
              if (s === "otp") setStep("otp");
            }}
            setEmail={setEmail}
          />
        )}

        {step === "otp" && (
          <OtpComponent
            setStep={(s) => {
              if (s === "signup") setStep("signup");
            }}
            email={email}
          />
        )}
      </div>
    </AuthShell>
  );
};

export default RegisterPage;
