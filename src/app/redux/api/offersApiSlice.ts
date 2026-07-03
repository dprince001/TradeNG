import { generalApiSlice } from "./apiSlice";

const offersApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOffersForAProduct: builder.query({
            query: () => ({
                url: `/offers/received`,
                method: "GET",
            }),
            providesTags: ["Offer"],
        }),

        makeAnOffer: builder.mutation({
            query: ({ listingId, offer }) => ({
                url: `/offers/listings/${listingId}`,
                method: "POST",
                body: offer,
            }),
            invalidatesTags: ["Offer"],
        }),

        counterAnOffer: builder.mutation({
            query: (listingId) => ({
                url: `/offers/${listingId}/counter`,
                method: "PATCH",
            }),
            invalidatesTags: ["Offer"],
        }),

        declineAnOffer: builder.mutation({
            query: (listingId) => ({
                url: `/offers/${listingId}/decline`,
                method: "PATCH",
            }),
            invalidatesTags: ["Offer"],
        }),

        acceptAnOffer: builder.mutation({
            query: (listingId) => ({
                url: `/offers/${listingId}/accept`,
                method: "PATCH",
            }),
            invalidatesTags: ["Offer"],
        }),
    }),
    overrideExisting: false
});

export const { useAcceptAnOfferMutation, useDeclineAnOfferMutation, useCounterAnOfferMutation, useMakeAnOfferMutation, useGetOffersForAProductQuery } = offersApiSlice;
