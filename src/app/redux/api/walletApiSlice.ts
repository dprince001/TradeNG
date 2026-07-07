import { generalApiSlice } from "./apiSlice";

const walletApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWallet: builder.query({
            query: () => ({
                url: `/wallet`,
                method: "GET",
            }),
            providesTags: ["Wallet"],
        }),

        getWalletLedger: builder.query({
            query: () => ({
                url: `/wallet/ledger`,
                method: "GET",
            }),
            providesTags: ["Wallet"],
        }),

        getPayoutBanks: builder.query({
            query: () => ({
                url: `/wallet/payout-banks`,
                method: "GET",
            }),
            providesTags: ["Wallet"],
        }),

        addPayoutBank: builder.mutation({
            query: (body) => ({
                url: `/wallet/payout-banks`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Wallet"],
        }),

        updatePayoutBank: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/wallet/payout-banks/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Wallet"],
        }),

        removePayoutBank: builder.mutation({
            query: (id) => ({
                url: `/wallet/payout-banks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Wallet"],
        }),

        getWithdrawals: builder.query({
            query: () => ({
                url: `/wallet/withdrawals`,
                method: "GET",
            }),
            providesTags: ["Wallet"],
        }),

        requestWithdrawal: builder.mutation({
            query: (body) => ({
                url: `/wallet/withdrawals`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Wallet"],
        }),

        cancelWithdrawal: builder.mutation({
            query: (id) => ({
                url: `/wallet/withdrawals/${id}/cancel`,
                method: "PATCH",
            }),
            invalidatesTags: ["Wallet"],
        }),
    }),
    overrideExisting: false
});

export const {
    useGetWalletQuery,
    useGetWalletLedgerQuery,
    useGetPayoutBanksQuery,
    useAddPayoutBankMutation,
    useUpdatePayoutBankMutation,
    useRemovePayoutBankMutation,
    useGetWithdrawalsQuery,
    useRequestWithdrawalMutation,
    useCancelWithdrawalMutation,
} = walletApiSlice;
