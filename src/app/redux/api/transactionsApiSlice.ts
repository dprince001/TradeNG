import { generalApiSlice } from "./apiSlice";

const transactionsApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: () => ({
                url: `/transactions`,
                method: "GET",
            }),
            providesTags: ["Transaction"],
        }),

        getTransactionDetail: builder.query({
            query: (id) => ({
                url: `/transactions/${id}`,
                method: "GET",
            }),
            providesTags: ["Transaction"],
        }),

        startCheckout: builder.mutation({
            query: (args) => {
                const id = typeof args === "string" ? args : args.id;
                const callbackUrl = typeof window !== "undefined" ? window.location.origin + "/profile/orders" : "";
                return {
                    url: `/transactions/${id}/checkout`,
                    method: "POST",
                    body: {
                        redirect_url: callbackUrl,
                        callback_url: callbackUrl,
                        ...(typeof args === "object" ? args : {})
                    },
                    params: {
                        redirect_url: callbackUrl,
                        callback_url: callbackUrl,
                    }
                };
            },
            invalidatesTags: ["Transaction", "Order"],
        }),

        verifyCheckoutPayment: builder.query({
            query: (id) => ({
                url: `/transactions/${id}/verify`,
                method: "GET",
            }),
            providesTags: ["Transaction"],
        }),

        confirmReceipt: builder.mutation({
            query: (id) => ({
                url: `/transactions/${id}/confirm-receipt`,
                method: "POST",
            }),
            invalidatesTags: ["Transaction", "Order"],
        }),

        releasePayment: builder.mutation({
            query: (id) => ({
                url: `/transactions/${id}/release`,
                method: "POST",
            }),
            invalidatesTags: ["Transaction", "Order", "Wallet"],
        }),

        raiseDispute: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/transactions/${id}/dispute`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Transaction"],
        }),

        getDispute: builder.query({
            query: (id) => ({
                url: `/transactions/${id}/dispute`,
                method: "GET",
            }),
            providesTags: ["Transaction"],
        }),
    }),
    overrideExisting: false
});

export const {
    useGetTransactionsQuery,
    useGetTransactionDetailQuery,
    useStartCheckoutMutation,
    useVerifyCheckoutPaymentQuery,
    useLazyVerifyCheckoutPaymentQuery,
    useConfirmReceiptMutation,
    useReleasePaymentMutation,
    useRaiseDisputeMutation,
    useGetDisputeQuery,
} = transactionsApiSlice;
