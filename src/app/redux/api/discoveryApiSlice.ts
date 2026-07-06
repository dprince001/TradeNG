import { generalApiSlice } from "./apiSlice";

const discoveryApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlatformStats: builder.query({
            query: () => ({
                url: `/discovery/stats`,
                method: "GET",
            }),
            providesTags: ["Discovery"],
        }),

        getTopSellers: builder.query({
            query: () => ({
                url: `/discovery/top-sellers`,
                method: "GET",
            }),
            providesTags: ["Discovery"],
        }),

        getFeaturedListings: builder.query({
            query: () => ({
                url: `/discovery/featured-listings`,
                method: "GET",
            }),
            providesTags: ["Discovery"],
        }),

        getBestSellingListings: builder.query({
            query: () => ({
                url: `/discovery/best-selling`,
                method: "GET",
            }),
            providesTags: ["Discovery"],
        }),

        getRecentFromVerifiedSellers: builder.query({
            query: () => ({
                url: `/discovery/recent-from-verified-sellers`,
                method: "GET",
            }),
            providesTags: ["Discovery"],
        }),
    }),
    overrideExisting: false
});

export const {
    useGetPlatformStatsQuery,
    useGetTopSellersQuery,
    useGetFeaturedListingsQuery,
    useGetBestSellingListingsQuery,
    useGetRecentFromVerifiedSellersQuery,
} = discoveryApiSlice;
