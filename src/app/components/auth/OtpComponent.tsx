"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Button from "../Button";

interface OtpComponentProps {
  setStep: (step: "explore" | "signin" | "signup" | "otp") => void;
  email: string;
}

const OtpComponent = ({ setStep, email }: OtpComponentProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpVerify = () => {
    console.log("Verifying OTP:", otp.join(""));
    // Complete verification and send to home
    router.push("/");
  };

  const maskEmail = (emailStr: string) => {
    if (!emailStr) return "lakesol****@gmail.com";
    const [localPart, domain] = emailStr.split("@");
    if (!localPart || !domain) return emailStr;
    if (localPart.length <= 4) {
      return `${localPart[0]}****@${domain}`;
    }
    return `${localPart.substring(0, 4)}****@${domain}`;
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full animate-fadeIn pt-6">
      <div>
        {/* Back button */}
        <button
          onClick={() => setStep("signup")}
          className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-text-primary mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <h2 className="text-[#1D1E20] text-2xl font-black tracking-tight mb-2">
          Enter code
        </h2>
        <p className="text-text-secondary text-xs font-medium leading-relaxed mb-8">
          We've sent a verification code to your email{" "}
          <span className="text-text-primary font-bold">
            {maskEmail(email)}
          </span>
        </p>

        <div className="flex justify-center gap-2 mb-8 w-full">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              className="w-11 h-13 border border-gray-200 rounded-xl bg-white text-center text-lg font-black text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-sm"
            />
          ))}
        </div>

        <div className="text-center mb-10">
          <span className="text-text-secondary text-xs font-bold">
            Send code again <span className="text-primary">00:20</span>
          </span>
        </div>

        <Button
          onClick={handleOtpVerify}
          fullWidth
          variant="primary"
          className="py-3.5 font-bold shadow-md"
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default OtpComponent;
