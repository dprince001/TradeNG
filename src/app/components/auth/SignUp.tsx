"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import FormInput from "../FormInput";
import Button from "../Button";
import usePost from "@/app/hooks/usePost";
import { useSignUpMutation } from "@/app/redux/api/authApiSlice";

const signUpSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and privacy policy",
    }),
  })

type SignUpSchemaType = z.infer<typeof signUpSchema>;

interface SignUpProps {
  setStep: (step: "explore" | "signin" | "signup" | "otp") => void;
  setEmail: (email: string) => void;
}

const SignUp = ({ setStep, setEmail }: SignUpProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { handlePost: signUp, isLoading: signUpLoading } = usePost(useSignUpMutation)

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    console.log("Sign up data:", data);
    setEmail(data.email);

    const { acceptTerms, ...rest } = data;
    const res = await signUp(rest);

    if (res?.success) {
      setStep("otp");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full animate-fadeIn p-5">
      <div>
        <h2 className="text-[#1D1E20] text-2xl font-black tracking-tight mb-8">
          Sign Up
        </h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormInput
              name="first_name"
              label="First Name"
              placeholder="Your first name"
              type="text"
            />

            <FormInput
              name="last_name"
              label="Last Name"
              placeholder="Your last name"
              type="text"
            />

            <FormInput
              name="email"
              label="Email"
              placeholder="Your email"
              type="email"
            />

            <FormInput
              name="password"
              label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
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

            {/* <FormInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
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
            /> */}

            <div className="flex flex-col gap-1 mt-1">
              <FormInput
                name="acceptTerms"
                type="checkbox"
                label="I accept the terms and privacy policy"
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="primary"
              className="py-3.5 font-bold mt-4 shadow-md"
              disabled={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </FormProvider>

        <span className="pt-2 text-text-secondary flex text-center items-center justify-center text-xs">
          Already have an account?{" "}
          <button
            onClick={() => setStep("signin")}
            className="text-primary ml-1 font-bold hover:underline"
          >
            Log in
          </button>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
