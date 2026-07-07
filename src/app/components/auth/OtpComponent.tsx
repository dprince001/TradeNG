"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Button from "../Button";
import { useOtpVerificationMutation, useResendOTPMutation } from "@/app/redux/api/authApiSlice";
import usePost from "@/app/hooks/usePost";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/app/redux/api/appSlice";

interface OtpComponentProps {
  setStep: (step: any) => void;
  email: string;
}

const OtpComponent = ({ setStep, email }: OtpComponentProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const dispatch = useDispatch();

  const { handlePost: verifyOtp, isLoading } = usePost(useOtpVerificationMutation);
  const { handlePost: resendOtp, isLoading: resendOtpLoading } = usePost(useResendOTPMutation);

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

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
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (!pasteData) return;

    const digits = pasteData.replace(/\D/g, "").substring(0, 6);
    if (!digits) return;

    const newOtp = [...otp];
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);

    const targetIndex = Math.min(digits.length - 1, 5);
    const targetInput = document.getElementById(`otp-${targetIndex}`);
    targetInput?.focus();

    e.preventDefault();
  };

  const handleOtpVerify = async () => {
    const body = {
      email,
      otp: otp.join(""),
    };

    const res = await verifyOtp(body);
    if (res?.success) {
      dispatch(setUserInfo(res.data));
      router.push("/home");
    }
  };

  const handleResendOtp = async () => {
    const res = await resendOtp({ email });

    if (res?.success) {
      setOtp(new Array(6).fill(""));
    }
  };

  const maskEmail = (emailStr: string) => {
    if (!emailStr) return "user****@email.com";
    const [localPart, domain] = emailStr.split("@");
    if (!localPart || !domain) return emailStr;
    if (localPart.length <= 4) {
      return `${localPart[0]}****@${domain}`;
    }
    return `${localPart.substring(0, 4)}****@${domain}`;
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full animate-fadeIn p-5">
      <div>
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
              onPaste={handlePaste}
              className="w-[44px] h-[48px] border border-gray-200 rounded-xl bg-white text-center text-lg font-black text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-sm"
            />
          ))}
        </div>

        <div className="text-center mb-10">
          <span className="text-text-secondary text-xs font-bold" onClick={handleResendOtp}>
           {resendOtpLoading ? "Resending OTP..." : "Send code again"}
          </span>
        </div>

        <Button
          onClick={handleOtpVerify}
          fullWidth
          variant="primary"
          className="py-3.5 font-bold shadow-md"
          loading={isLoading}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default OtpComponent;
