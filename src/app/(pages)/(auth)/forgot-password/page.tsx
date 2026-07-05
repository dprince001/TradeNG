"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import TopNavbar from "@/app/components/layout/TopNavbar";
import BackIcon from "@/app/assets/svgs/BackIcon";
import { Eye, EyeOff } from "lucide-react";

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

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
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

  const handleBack = () => {
    if (step === "otp") {
      setStep("email");
    } else if (step === "reset") {
      setStep("otp");
    } else if (step === "success") {
      setStep("reset");
    }
  };
  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] flex flex-col justify-between max-w-md mx-auto relative px-6 py-12 select-none overflow-y-auto">
      {/* Back button */}
      {step !== "success" && (
        <Button
          onClick={handleBack}
          type="button"
          variant="none"
          className="w-[42px] h-[42px] mb-10 rounded-full text-text-primary border transition-all duration-200 active:scale-95 flex items-center justify-center"
          aria-label="Go back"
        >
          <BackIcon />
        </Button>
      )}

      {/* ── STEP 1: Enter Email ── */}
      {step === "email" && (
        <div className="flex-1 flex flex-col justify-between animate-fadeIn">
          <div>
            <h2 className="text-[#1D1E20] text-4xl font-black tracking-tight mb-2">
              Forgot password?
            </h2>
            <p className="text-gray-600 mt-6 text-md mb-8">
              Don't worry! It happens. Please enter the email associated with
              your account.
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

              <Button
                type="submit"
                fullWidth
                variant="primary"
                className="py-3.5 text-xl font-bold shadow-md mt-2"
              >
                Send code
              </Button>
            </form>
          </div>

          <div className="text-center mt-12">
            <span className="text-text-secondary text-sm font-medium">
              Remember password?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-primary font-bold hover:underline"
              >
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
            <h2 className="text-[#1D1E20] text-3xl font-black tracking-tight mb-2">
              Please check your email
            </h2>
            <p className="text-gray-600 text-md mb-8">
              We've sent a code to{" "}
              <span className="text-text-primary font-bold">
                {email || "[EMAIL_ADDRESS]"}
              </span>
            </p>

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
              <div className="flex justify-center gap-4 mb-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-24 h-24 border border-gray-200 rounded-xl bg-white text-center text-xl font-black text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-sm"
                  />
                ))}
              </div>

              <Button
                type="submit"
                fullWidth
                variant="primary"
                className="py-3.5 text-lg font-bold shadow-md"
              >
                Verify
              </Button>
              <div className="text-center mb-4">
                <p className="text-gray-600 text-sm font-semibold">
                  Send code again <span className="text-primary">00:20</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── STEP 3: Reset Password ── */}
      {step === "reset" && (
        <div className="flex-1 flex flex-col justify-between animate-fadeIn">
          <div>
            <h2 className="text-[#1D1E20] text-4xl font-black tracking-tight mb-2">
              Reset password
            </h2>
            <p className="text-gray-600 text-md mb-8">
              Please type something you'll remember
            </p>

            <form
              onSubmit={handleResetPassword}
              className="flex flex-col gap-5"
            >
              <Input
                label="New Password"
                placeholder="new password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-400 hover:text-text-primary flex items-center justify-center"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />

              <Input
                label="Confirm password"
                placeholder="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-gray-400 hover:text-text-primary flex items-center justify-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="primary"
                className="py-3.5 text-xl font-bold shadow-md mt-4"
              >
                Reset password
              </Button>
            </form>
          </div>

          <div className="text-center mt-12">
            <span className="text-text-secondary text-sm font-medium">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-primary font-bold hover:underline"
              >
                Log in
              </button>
            </span>
          </div>
        </div>
      )}

      {/* ── STEP 4: Success Confirmation ── */}
      {step === "success" && (
        <div className="flex mt-[100%] flex-col items-center justify-center">
          <h2 className="text-[#1D1E20] text-3xl font-black tracking-tight mb-2">
            Password changed
          </h2>
          <p className="text-text-secondary mb-4 text-md ">
            Your password has been changed succesfully{" "}
          </p>

          <Button
            onClick={() => router.push("/login")}
            fullWidth
            variant="primary"
            className="py-3.5 text-xl font-bold shadow-md w-full mt-auto"
          >
            Back to login
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
