import { generalApiSlice } from "./apiSlice";

const reviewsApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewsForAUser: builder.query({
            query: (userId) => ({
                url: `/users/${userId}/reviews`,
                method: "GET",
            }),
            providesTags: ["Review"],
        }),

        leaveATransactionReview: builder.mutation({
            query: ({ transactionId, review }) => ({
                url: `/transactions/${transactionId}/reviews`,
                method: "POST",
                body: review,
            }),
            invalidatesTags: ["Review"],
        }),
    }),
    overrideExisting: false
});

export const { useGetReviewsForAUserQuery, useLeaveATransactionReviewMutation } = reviewsApiSlice;
