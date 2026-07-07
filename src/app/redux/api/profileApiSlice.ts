import { generalApiSlice } from "./apiSlice";

const profileApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: `/profile/me`,
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),

        updateMyProfile: builder.mutation({
            query: (body) => ({
                url: `/profile/me`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Profile"],
        }),

        deleteMyAccount: builder.mutation({
            query: () => ({
                url: `/profile/me`,
                method: "DELETE",
            }),
            invalidatesTags: ["Profile"],
        }),

        getPublicUserProfile: builder.query({
            query: (userId) => ({
                url: `/profile/users/${userId}`,
                method: "GET",
            }),
            providesTags: (result, error, userId) => [{ type: "Profile", id: userId }],
        }),

        getMySellerStats: builder.query({
            query: () => ({
                url: `/profile/stats`,
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),

        getMyTrustScore: builder.query({
            query: () => ({
                url: `/profile/trust-score`,
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),

        requestSellerVerification: builder.mutation({
            query: (body) => ({
                url: `/profile/verify`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Profile"],
        }),

        updateMyPassword: builder.mutation({
            query: (body) => ({
                url: `/profile/password`,
                method: "PATCH",
                body,
            }),
        }),

        updateNotificationSettings: builder.mutation({
            query: (body) => ({
                url: `/profile/notification-settings`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Profile"],
        }),

        getMyWishlist: builder.query({
            query: () => ({
                url: `/profile/wishlist`,
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),

        addToWishlist: builder.mutation({
            query: (listingId) => ({
                url: `/profile/wishlist/${listingId}`,
                method: "POST",
            }),
            invalidatesTags: ["Profile"],
        }),

        removeFromWishlist: builder.mutation({
            query: (listingId) => ({
                url: `/profile/wishlist/${listingId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
    overrideExisting: false
});

export const {
    useGetMyProfileQuery,
    useGetPublicUserProfileQuery,
    useUpdateMyProfileMutation,
    useDeleteMyAccountMutation,
    useGetMySellerStatsQuery,
    useGetMyTrustScoreQuery,
    useRequestSellerVerificationMutation,
    useUpdateMyPasswordMutation,
    useUpdateNotificationSettingsMutation,
    useGetMyWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
} = profileApiSlice;
