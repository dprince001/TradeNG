import { generalApiSlice } from "./apiSlice";

const buildDiscoveryParams = (params: Record<string, any> = {}) => {
    const query: Record<string, string> = {};
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        query[key] = String(value);
    });
    return query;
};

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
            query: (params) => ({
                url: `/discovery/top-sellers`,
                method: "GET",
                params: buildDiscoveryParams(params),
            }),
            providesTags: ["Discovery"],
        }),

        getFeaturedListings: builder.query({
            query: (params) => ({
                url: `/discovery/featured-listings`,
                method: "GET",
                params: buildDiscoveryParams(params),
            }),
            providesTags: ["Discovery"],
        }),

        getBestSellingListings: builder.query({
            query: (params) => ({
                url: `/discovery/best-selling`,
                method: "GET",
                params: buildDiscoveryParams(params),
            }),
            providesTags: ["Discovery"],
        }),

        getRecentFromVerifiedSellers: builder.query({
            query: (params) => ({
                url: `/discovery/recent-from-verified-sellers`,
                method: "GET",
                params: buildDiscoveryParams(params),
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
