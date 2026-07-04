import { generalApiSlice } from "./apiSlice";

const chatApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        startConversation: builder.mutation({
            query: (body) => ({
                url: "/conversations",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Chat"],
        }),

        getAllConversations: builder.query({
            query: () => ({
                url: `/conversations`,
                method: "GET",
            }),
            providesTags: ["Chat"],
        }),

        getMessageInAConversation: builder.query({
            query: (id) => ({
                url: `/conversations/${id}/messages`,
                method: "GET",
            }),
            providesTags: ["Chat"],
        }),

        sendMessage: builder.mutation({
            query: ({id, data}) => ({
                url: `/conversations/${id}/messages`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Chat"],
        }),

        markMessageAsRead: builder.mutation({
            query: (id) => ({
                url: `/conversations/${id}/read`,
                method: "PATCH",
            }),
            invalidatesTags: ["Chat"],
        }),
    }),
    overrideExisting: false
});

export const { useStartConversationMutation, useGetAllConversationsQuery, useGetMessageInAConversationQuery, useSendMessageMutation, useMarkMessageAsReadMutation } = chatApiSlice;
