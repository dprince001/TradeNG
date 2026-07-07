"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import FormInput from "../FormInput";
import Button from "../Button";
import Image from "next/image";
import Google from "@/assets/icons/Google.svg";
import Apple from "@/assets/icons/Apple.svg";
import GoogleIcon from "@/app/assets/svgs/GoogleIcon";
import AppleIcon from "@/app/assets/svgs/AppleIcon";
import { toast } from "sonner";
import { useSignInMutation } from "@/app/redux/api/authApiSlice";
import usePost from "@/app/hooks/usePost";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/app/redux/api/appSlice";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

interface SignInProps {
  setStep?: (step: "explore" | "signin" | "signup" | "otp") => void;
}

const SignIn = ({ setStep }: SignInProps = {}) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { handlePost: signIn, isLoading: signInLoading } =
    usePost(useSignInMutation);

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    const res = await signIn(data);

    if (res?.success) {
      dispatch(setUserInfo(res.data));
      router.push("/home");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full animate-fadeIn p-5">
      <div className="pt-20">
        <h2 className="text-[#1D1E20] text-4xl font-black tracking-tight mb-8">
          Hi, Welcome! 👋
        </h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 pb-6"
          >
            <FormInput
              name="email"
              label="Email address"
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

            <div className="flex items-center justify-between text-xs font-semibold mt-1">
              <FormInput
                name="rememberMe"
                type="checkbox"
                label="Remember me"
              />
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="primary"
              className="py-3.5 font-bold mt-4 shadow-md"
              loading={signInLoading}
            >
              Log in
            </Button>
          </form>
        </FormProvider>

        {/* Social Logins */}
        {/* <div className="flex flex-col items-center gap-5 pt-8">
          <span className="text-text-secondary text-xs font-bold">Or with</span>
          <div className="flex gap-4 w-full">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold">
              <AppleIcon /> Apple
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold">
              <GoogleIcon /> Google
            </button>
          </div>
        </div> */}

        <span className="pt-8 pb-4 text-text-secondary flex items-center justify-center gap-1 text-xs font-medium">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="text-primary font-bold hover:underline"
          >
            Sign up
          </button>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
