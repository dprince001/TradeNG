"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

type AuthStep = "explore" | "signin" | "signup" | "otp";

const LoginPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("explore");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP State
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

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to home
    router.push("/");
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Go to OTP step
    setStep("otp");
  };

  const handleOtpVerify = () => {
    // Complete verification
    router.push("/");
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] flex flex-col justify-between max-w-md mx-auto relative px-6 py-12 select-none overflow-y-auto">
      {/* ── STEP 1: Explore the App ── */}
      {step === "explore" && (
        <div className="flex-1 flex flex-col justify-between w-full h-full animate-fadeIn pt-10">
          <div className="flex-1 flex items-center justify-center min-h-[300px]">
            <span className="text-[140px] animate-pulse">📱</span>
          </div>

          <div className="w-full mt-auto">
            <div className="flex flex-col items-center text-center gap-3.5 mb-8">
              <h2 className="text-[#1D1E20] text-3xl font-black leading-tight tracking-tight">
                Explore the app
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed font-semibold max-w-xs">
                Now your finances are in one place and always under control
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button fullWidth onClick={() => setStep("signin")} variant="primary" className="py-3.5 font-bold shadow-md">
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
      )}

      {/* ── STEP 2: Sign In ── */}
      {step === "signin" && (
        <div className="flex-1 flex flex-col justify-between w-full animate-fadeIn pt-6">
          <div>
            <h2 className="text-[#1D1E20] text-2xl font-black tracking-tight mb-8">
              Hi, Welcome! 👋
            </h2>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
              <Input
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                type="email"
                required
              />

              <div className="flex flex-col gap-1.5 w-full relative">
                <label className="text-sm font-medium text-text-primary">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
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

              <div className="flex items-center justify-between text-xs font-semibold mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-text-primary">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" fullWidth variant="primary" className="py-3.5 font-bold mt-4 shadow-md">
                Log in
              </Button>
            </form>

            {/* Social Logins */}
            <div className="flex flex-col items-center gap-5 mt-10">
              <span className="text-text-secondary text-xs font-bold">Or with</span>
              <div className="flex gap-4 w-full">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold">
                  <span>🍎</span> Apple
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold">
                  <span>🌐</span> Google
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <span className="text-text-secondary text-xs font-medium">
              Don't have an account?{" "}
              <button onClick={() => setStep("signup")} className="text-primary font-bold hover:underline">
                Sign up
              </button>
            </span>
          </div>
        </div>
      )}

      {/* ── STEP 3: Sign Up ── */}
      {step === "signup" && (
        <div className="flex-1 flex flex-col justify-between w-full animate-fadeIn pt-6">
          <div>
            <h2 className="text-[#1D1E20] text-2xl font-black tracking-tight mb-8">
              Sign Up
            </h2>

            <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-5">
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                type="email"
                required
              />

              <div className="flex flex-col gap-1.5 w-full relative">
                <label className="text-sm font-medium text-text-primary">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
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
                <label className="text-sm font-medium text-text-primary">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
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

              <div className="flex items-start gap-2.5 text-xs font-medium mt-1">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                />
                <span className="text-text-secondary leading-relaxed">
                  I accept the{" "}
                  <a href="#" className="text-primary font-bold hover:underline">
                    terms and privacy policy
                  </a>
                </span>
              </div>

              <Button type="submit" fullWidth variant="primary" className="py-3.5 font-bold mt-4 shadow-md">
                Register
              </Button>
            </form>
          </div>

          <div className="text-center mt-12">
            <span className="text-text-secondary text-xs font-medium">
              Already have an account?{" "}
              <button onClick={() => setStep("signin")} className="text-primary font-bold hover:underline">
                Log in
              </button>
            </span>
          </div>
        </div>
      )}

      {/* ── STEP 4: OTP Verification ── */}
      {step === "otp" && (
        <div className="flex-1 flex flex-col justify-between w-full animate-fadeIn pt-6">
          <div>
            {/* Back button */}
            <button
              onClick={() => setStep("signup")}
              className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-text-primary mb-6 transition-colors"
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

            <h2 className="text-[#1D1E20] text-2xl font-black tracking-tight mb-2">
              Enter code
            </h2>
            <p className="text-text-secondary text-xs font-medium leading-relaxed mb-8">
              We've sent a verification code to your email{" "}
              <span className="text-text-primary font-bold">{email || "lakesol****@gmail.com"}</span>
            </p>

            <div className="flex justify-between gap-2.5 mb-8">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-12 h-14 border border-gray-200 rounded-xl bg-white text-center text-lg font-black text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-sm"
                />
              ))}
            </div>

            <div className="text-center mb-10">
              <span className="text-text-secondary text-xs font-bold">
                Send code again <span className="text-primary">00:20</span>
              </span>
            </div>

            <Button onClick={handleOtpVerify} fullWidth variant="primary" className="py-3.5 font-bold shadow-md">
              Verify
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
