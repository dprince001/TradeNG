import { generalApiSlice } from "./apiSlice";

const offersApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOffersReceived: builder.query({
            query: () => ({
                url: `/offers/received`,
                method: "GET",
            }),
            providesTags: ["Offer"],
        }),

        getOffersForAListing: builder.query({
            query: (listingId) => ({
                url: `/offers/listings/${listingId}/mine`,
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
            invalidatesTags: ["Offer", "Chat"],
        }),

        counterAnOffer: builder.mutation({
            query: ({ offerId, amount, note }) => ({
                url: `/offers/${offerId}/counter`,
                method: "PATCH",
                body: { amount, note },
            }),
            invalidatesTags: ["Offer", "Chat"],
        }),

        declineAnOffer: builder.mutation({
            query: (listingId) => ({
                url: `/offers/${listingId}/decline`,
                method: "PATCH",
            }),
            invalidatesTags: ["Offer", "Chat"],
        }),

        acceptAnOffer: builder.mutation({
            query: (listingId) => ({
                url: `/offers/${listingId}/accept`,
                method: "PATCH",
            }),
            invalidatesTags: ["Offer", "Chat"],
        }),
    }),
    overrideExisting: false
});

export const { useAcceptAnOfferMutation, useDeclineAnOfferMutation, useCounterAnOfferMutation, useMakeAnOfferMutation, useGetAllOffersReceivedQuery, useGetOffersForAListingQuery } = offersApiSlice;
