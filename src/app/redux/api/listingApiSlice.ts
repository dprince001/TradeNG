import { generalApiSlice } from "./apiSlice";

const buildListingsParams = (filters: Record<string, any> = {}) => {
    const params: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        params[key] = String(value);
    });
    return params;
};

const listingApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createListing: builder.mutation({
            query: (body) => ({
                url: "/listings",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Listing"],
        }),

        getListings: builder.query({
            query: (filters) => ({
                url: `/listings`,
                method: "GET",
                params: buildListingsParams(filters && typeof filters === "object" ? filters : {}),
            }),
            providesTags: ["Listing"],
        }),

        getMyListings: builder.query({
            query: (id) => ({
                url: `/listings/mine`,
                method: "GET",
            }),
            providesTags: ["Listing"],
        }),

        getListingDetail: builder.query({
            query: (id) => ({
                url: `/listings/${id}`,
                method: "GET",
            }),
            providesTags: ["Listing"],
        }),

        deleteListing: builder.mutation({
            query: (id) => ({
                url: `/listings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Listing"],
        }),

        updateListing: builder.mutation({
            query: (body) => ({
                url: `/listings/${body.id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Listing"],
        }),

        buyAListingDirectly: builder.mutation({
            query: (id) => ({
                url: `/listings/${id}/buy`,
                method: "POST",
            }),
            invalidatesTags: ["Listing"],
        }),

        publishListing: builder.mutation({
            query: (id) => ({
                url: `/listings/${id}/publish`,
                method: "PATCH",
            }),
            invalidatesTags: ["Listing"],
        }),
    }),
    overrideExisting: false
});

export const { useCreateListingMutation, useGetListingsQuery, useGetMyListingsQuery, useGetListingDetailQuery, useDeleteListingMutation, useUpdateListingMutation, useBuyAListingDirectlyMutation, usePublishListingMutation } = listingApiSlice;
