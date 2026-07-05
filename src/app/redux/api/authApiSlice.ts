import { generalApiSlice } from "./apiSlice";

const authApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (body) => ({
                url: "/auth/signup",
                method: "POST",
                body,
            }),
        }),

        signIn: builder.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            })
        }),

        otpVerification: builder.mutation({
            query: (body) => ({
                url: "/auth/verify-email",
                method: "POST",
                body,
            })
        }),

        resendOTP: builder.mutation({
            query: (body) => ({
                url: "/auth/resend-otp",
                method: "POST",
                body,
            })
        }),
    }),
    overrideExisting: false
});

export const { useSignUpMutation, useSignInMutation, useOtpVerificationMutation, useResendOTPMutation } = authApiSlice;
