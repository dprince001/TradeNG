import { generalApiSlice } from "./apiSlice";

const reviewsApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewsForAUser: builder.query({
            query: (arg: string | ({ userId: string } & Record<string, any>)) => {
                const { userId, ...params } = typeof arg === "string" ? { userId: arg } : arg;
                const cleanParams: Record<string, string> = {};
                Object.entries(params).forEach(([key, value]) => {
                    if (value === undefined || value === null || value === "") return;
                    cleanParams[key] = String(value);
                });
                return {
                    url: `/users/${userId}/reviews`,
                    method: "GET",
                    params: cleanParams,
                };
            },
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
