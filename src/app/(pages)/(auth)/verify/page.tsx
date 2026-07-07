"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BackButton from "@/app/components/layout/BackButton";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import Button from "@/app/components/Button";

type Step = 1 | 2 | 3 | 4;
type DocType = "national_id" | "drivers_license" | "passport";

const VerifyPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [docType, setDocType] = useState<DocType>("national_id");
  const [uploadFrontProgress, setUploadFrontProgress] = useState<number>(0);
  const [uploadBackProgress, setUploadBackProgress] = useState<number>(0);
  const [isFrontUploaded, setIsFrontUploaded] = useState<boolean>(false);
  const [isBackUploaded, setIsBackUploaded] = useState<boolean>(false);
  const [isSelfieCaptured, setIsSelfieCaptured] = useState<boolean>(false);
  const [selfieCountdown, setSelfieCountdown] = useState<boolean>(false);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!isFrontUploaded || !isBackUploaded) {
        toast.error("Please upload both front and back document photos!");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!isSelfieCaptured) {
        toast.error("Please capture your face verification selfie first!");
        return;
      }
      localStorage.setItem("verificationStatus", "pending");
      setStep(4);
    }
  };

  const simulateUpload = (side: "front" | "back") => {
    if (side === "front") {
      setUploadFrontProgress(1);
      const interval = setInterval(() => {
        setUploadFrontProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsFrontUploaded(true);
            return 100;
          }
          return prev + 20;
        });
      }, 150);
    } else {
      setUploadBackProgress(1);
      const interval = setInterval(() => {
        setUploadBackProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsBackUploaded(true);
            return 100;
          }
          return prev + 20;
        });
      }, 150);
    }
  };

  const startSelfieCapture = () => {
    setSelfieCountdown(true);
    setTimeout(() => {
      setIsSelfieCaptured(true);
      setSelfieCountdown(false);
      toast.success("Selfie captured successfully!");
    }, 1500);
  };

  const handleDone = () => {
    router.push("/profile");
  };

  return (
    <AppShell showFooter={false} showBottomNav={false}>
    <div className="w-full flex flex-col relative select-none">
      <Container className="max-w-3xl flex items-center gap-3 pt-6 pb-4">
        <BackButton
          onClick={() => {
            if (step > 1 && step < 4) {
              setStep((s) => (s - 1) as Step);
            } else {
              router.push("/profile");
            }
          }}
        />
        <h1 className="text-text-primary font-semibold text-base tracking-wide">Verify Identity</h1>
      </Container>

      {step < 4 && (
        <Container className="max-w-3xl pt-4">
          <div className="flex justify-between items-center text-[10px] text-[#8F959E] font-bold uppercase tracking-wider mb-2">
            <span>Step {step} of 3</span>
            <span>
              {step === 1 && "Document Type"}
              {step === 2 && "Upload Document"}
              {step === 3 && "Face Verification"}
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-orange transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </Container>
      )}

      <Container className="max-w-3xl flex-1 pt-6 pb-24 overflow-y-auto">
        {step === 1 && (
          <div className="flex flex-col gap-4 animate-slideUp">
            <div>
              <h2 className="text-[#1D1E20] text-lg font-bold">Select ID Type</h2>
              <p className="text-xs text-[#8F959E] mt-1">
                Choose the official government-issued ID you want to verify.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 mt-2">
              {[
                {
                  id: "national_id",
                  title: "National Identity Card",
                  desc: "NIN Slip, e-ID, or NIMC card",
                  icon: "💳",
                },
                {
                  id: "drivers_license",
                  title: "Driver's License",
                  desc: "Valid Federal Road Safety permit",
                  icon: "🚗",
                },
                {
                  id: "passport",
                  title: "International Passport",
                  desc: "Official bio-data page scan",
                  icon: "✈️",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDocType(item.id as DocType)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.99] ${
                    docType === item.id
                      ? "border-brand-orange bg-[#FFF5F3]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <span className="text-xs font-extrabold text-[#1D1E20] block">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-[#8F959E] mt-0.5 block">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      docType === item.id
                        ? "border-brand-orange bg-brand-orange text-white"
                        : "border-[#D1D5DB]"
                    }`}
                  >
                    {docType === item.id && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4 animate-slideUp">
            <div>
              <h2 className="text-[#1D1E20] text-lg font-bold">Upload Photos</h2>
              <p className="text-xs text-[#8F959E] mt-1">
                Upload clear photos of both sides of your ID.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="border border-dashed border-gray-300 rounded-2xl p-5 bg-white flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[160px]">
                {isFrontUploaded ? (
                  <div className="flex flex-col items-center gap-2 text-green-600 animate-fadeIn">
                    <span className="text-3xl">✅</span>
                    <span className="text-xs font-bold text-[#1D1E20]">
                      Front Photo Uploaded
                    </span>
                    <button
                      onClick={() => {
                        setIsFrontUploaded(false);
                        setUploadFrontProgress(0);
                      }}
                      className="text-[10px] text-[#FF4304] font-bold mt-1"
                    >
                      Change Photo
                    </button>
                  </div>
                ) : uploadFrontProgress > 0 ? (
                  <div className="w-full px-4 flex flex-col items-center">
                    <span className="text-xs text-[#1D1E20] mb-2 font-bold">
                      Uploading front... {uploadFrontProgress}%
                    </span>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-orange transition-all"
                        style={{ width: `${uploadFrontProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => simulateUpload("front")}
                    className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="text-3xl">📸</span>
                    <span className="text-xs font-extrabold text-[#1D1E20]">
                      Front Side Photo
                    </span>
                    <span className="text-[10px] text-[#8F959E]">
                      PNG or JPG up to 10MB
                    </span>
                  </button>
                )}
              </div>

              <div className="border border-dashed border-gray-300 rounded-2xl p-5 bg-white flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[160px]">
                {isBackUploaded ? (
                  <div className="flex flex-col items-center gap-2 text-green-600 animate-fadeIn">
                    <span className="text-3xl">✅</span>
                    <span className="text-xs font-bold text-[#1D1E20]">
                      Back Photo Uploaded
                    </span>
                    <button
                      onClick={() => {
                        setIsBackUploaded(false);
                        setUploadBackProgress(0);
                      }}
                      className="text-[10px] text-[#FF4304] font-bold mt-1"
                    >
                      Change Photo
                    </button>
                  </div>
                ) : uploadBackProgress > 0 ? (
                  <div className="w-full px-4 flex flex-col items-center">
                    <span className="text-xs text-[#1D1E20] mb-2 font-bold">
                      Uploading back... {uploadBackProgress}%
                    </span>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-orange transition-all"
                        style={{ width: `${uploadBackProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => simulateUpload("back")}
                    className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="text-3xl">📸</span>
                    <span className="text-xs font-extrabold text-[#1D1E20]">
                      Back Side Photo
                    </span>
                    <span className="text-[10px] text-[#8F959E]">
                      PNG or JPG up to 10MB
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4 animate-slideUp">
            <div>
              <h2 className="text-[#1D1E20] text-lg font-bold">Face Verification</h2>
              <p className="text-xs text-[#8F959E] mt-1">
                Please hold your phone at eye level and capture a clear selfie.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
              <div className="relative w-48 h-48 rounded-full border-4 border-dashed border-brand-orange/60 bg-white flex items-center justify-center overflow-hidden shadow-inner">
                {isSelfieCaptured ? (
                  <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-center animate-fadeIn">
                    <span className="text-4xl">🧑‍💼</span>
                    <span className="text-xs font-extrabold text-green-600 mt-2 block">
                      Selfie Captured
                    </span>
                    <button
                      onClick={() => setIsSelfieCaptured(false)}
                      className="text-[9px] text-[#FF4304] font-bold mt-1"
                    >
                      Retake Selfie
                    </button>
                  </div>
                ) : selfieCountdown ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-8 h-8 rounded-full border-4 border-brand-orange border-t-transparent animate-spin mb-3" />
                    <span className="text-xs text-[#1D1E20] font-bold">
                      Scanning...
                    </span>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <span className="text-4xl block mb-2">📷</span>
                    <span className="text-[11px] text-[#8F959E] leading-relaxed block">
                      Align your face in the oval frame
                    </span>
                  </div>
                )}

                <div className="absolute inset-2.5 rounded-full border-2 border-brand-orange/15 pointer-events-none border-double" />
              </div>

              {!isSelfieCaptured && !selfieCountdown && (
                <button
                  onClick={startSelfieCapture}
                  className="mt-6 px-6 py-2.5 bg-brand-orange hover:bg-brand-orange/90 active:scale-95 transition-all text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Start Scanning
                </button>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center text-center py-10 animate-scaleUp">
            <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-500 shadow-md mb-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <h2 className="text-[#1D1E20] text-xl font-black">Submitted Successfully!</h2>
            <p className="text-xs text-[#8F959E] leading-relaxed mt-2.5 max-w-[280px] mx-auto">
              Your identity documents have been submitted to TradeNG for review.
              This typically takes less than 24 hours. We will notify you once done!
            </p>
          </div>
        )}
      </Container>

      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <Container className="max-w-3xl py-5 flex gap-3">
          {step < 4 ? (
            <Button fullWidth onClick={handleNext}>
              {step === 3 ? "Submit Verification" : "Continue"}
            </Button>
          ) : (
            <Button fullWidth onClick={handleDone}>
              Return to Profile
            </Button>
          )}
        </Container>
      </div>
    </div>
    </AppShell>
  );
};

export default VerifyPage;
