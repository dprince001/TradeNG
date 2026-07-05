"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import AuthShell from "@/app/components/layout/AuthShell";

type ForgotStep = "email" | "otp" | "reset" | "success";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<ForgotStep>("email");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP State (4 digits as shown in mockup)
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <AuthShell
      heading="Reset your password securely."
      subheading="We'll send a verification code to your email so you can safely get back into your account."
    >
    <div className="w-full flex flex-col justify-between relative select-none">
      {/* Back button */}
      {step !== "success" && (
        <div className="flex justify-start w-full mb-6">
          <button
            onClick={() => {
              if (step === "email") router.push("/login");
              else if (step === "otp") setStep("email");
              else if (step === "reset") setStep("otp");
            }}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-text-primary transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>
      )}

      {/* ── STEP 1: Enter Email ── */}
      {step === "email" && (
        <div className="flex-1 flex flex-col justify-between animate-fadeIn">
          <div>
            <h2 className="text-[#1D1E20] text-2xl font-black tracking-tight mb-2">
              Forgot password?
            </h2>
            <p className="text-text-secondary text-xs font-semibold leading-relaxed mb-8">
              Don't worry! It happens. Please enter the email associated with your account.
            </p>

            <form onSubmit={handleSendCode} className="flex flex-col gap-6">
              <Input
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                type="email"
                required
              />

              <Button type="submit" fullWidth variant="primary" className="py-3.5 font-bold shadow-md mt-2">
                Send code
              </Button>
            </form>
          </div>

          <div className="text-center mt-12">
            <span className="text-text-secondary text-xs font-medium">
              Remember password?{" "}
              <button onClick={() => router.push("/login")} className="text-primary font-bold hover:underline">
                Log in
              </button>
            </span>
          </div>
        </div>
      )}

      {/* ── STEP 2: Verify Code (4 digits) ── */}
      {step === "otp" && (
        <div className="flex-1 flex flex-col justify-between animate-fadeIn">
          <div>
            <h2 className="text-[#1D1E20] text-2xl font-black tracking-tight mb-2">
              Please check your email
            </h2>
            <p className="text-text-secondary text-xs font-semibold leading-relaxed mb-8">
              We've sent a code to <span className="text-text-primary font-bold">{email || "helloworld@gmail.com"}</span>
            </p>

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
              <div className="flex justify-center gap-2 xsm:gap-3 sml:gap-4 mb-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-10 h-12 xsm:w-12 xsm:h-14 sml:w-14 sml:h-16 border border-gray-200 rounded-xl bg-white text-center text-lg sml:text-xl font-black text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-sm"
                  />
                ))}
              </div>

              <div className="text-center mb-4">
                <span className="text-text-secondary text-xs font-bold">
                  Send code again <span className="text-primary">00:20</span>
                </span>
              </div>

              <Button type="submit" fullWidth variant="primary" className="py-3.5 font-bold shadow-md">
                Verify
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ── STEP 3: Reset Password ── */}
      {step === "reset" && (
        <div className="flex-1 flex flex-col justify-between animate-fadeIn">
          <div>
            <h2 className="text-[#1D1E20] text-2xl font-black tracking-tight mb-2">
              Reset password
            </h2>
            <p className="text-text-secondary text-xs font-semibold leading-relaxed mb-8">
              Please type something you'll remember
            </p>

            <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5 w-full relative">
                <label className="text-sm font-medium text-text-primary">New password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="must be 8 characters"
                    required
                    minLength={8}
                    className="w-full border border-gray-200 rounded-lg pl-4 pr-10 py-3 text-sm text-text-primary placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-primary"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 w-full relative">
                <label className="text-sm font-medium text-text-primary">Confirm new password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="repeat password"
                    required
                    className="w-full border border-gray-200 rounded-lg pl-4 pr-10 py-3 text-sm text-text-primary placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-primary"
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <Button type="submit" fullWidth variant="primary" className="py-3.5 font-bold shadow-md mt-4">
                Reset password
              </Button>
            </form>
          </div>

          <div className="text-center mt-12">
            <span className="text-text-secondary text-xs font-medium">
              Already have an account?{" "}
              <button onClick={() => router.push("/login")} className="text-primary font-bold hover:underline">
                Log in
              </button>
            </span>
          </div>
        </div>
      )}

      {/* ── STEP 4: Success Confirmation ── */}
      {step === "success" && (
        <div className="flex-1 flex flex-col justify-between items-center text-center animate-fadeIn pt-10">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#FFF0EC] flex items-center justify-center mb-6 text-primary text-4xl animate-bounce">
              ✓
            </div>

            <h2 className="text-[#1D1E20] text-2xl font-black tracking-tight mb-2">
              Password changed
            </h2>
            <p className="text-text-secondary text-xs font-semibold leading-relaxed max-w-xs">
              Your password has been changed successfully
            </p>
          </div>

          <Button
            onClick={() => router.push("/login")}
            fullWidth
            variant="primary"
            className="py-3.5 font-bold shadow-md w-full mt-auto"
          >
            Back to login
          </Button>
        </div>
      )}
    </div>
    </AuthShell>
  );
};

export default ForgotPasswordPage;
