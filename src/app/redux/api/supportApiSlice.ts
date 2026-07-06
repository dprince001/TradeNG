import { generalApiSlice } from "./apiSlice";

const supportApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        contactSupport: builder.mutation({
            query: (body) => ({
                url: `/support/contact`,
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false
});

export const { useContactSupportMutation } = supportApiSlice;
