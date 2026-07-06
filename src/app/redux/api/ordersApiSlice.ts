import { generalApiSlice } from "./apiSlice";

const ordersApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyBuyingOrders: builder.query({
            query: () => ({
                url: `/orders/buying`,
                method: "GET",
            }),
            providesTags: ["Order"],
        }),

        getMySellingOrders: builder.query({
            query: () => ({
                url: `/orders/selling`,
                method: "GET",
            }),
            providesTags: ["Order"],
        }),
    }),
    overrideExisting: false
});

export const { useGetMyBuyingOrdersQuery, useGetMySellingOrdersQuery } = ordersApiSlice;
