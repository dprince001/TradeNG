import { generalApiSlice } from "./apiSlice";

const categoriesApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),

        getCatergoryDetail: builder.query({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),

        createCatergoryRequest: builder.mutation({
            query: (body) => ({
                url: "/categories/requests",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Categories"],
        }),

        getMyCatergoryRequests: builder.query({
            query: (id) => ({
                url: `/categories/requests/mine`,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),

    }),
    overrideExisting: false
});

export const { useGetCategoriesQuery, useCreateCatergoryRequestMutation, useGetMyCatergoryRequestsQuery } = categoriesApiSlice;
