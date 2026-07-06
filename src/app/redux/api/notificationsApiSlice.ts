import { generalApiSlice } from "./apiSlice";

const notificationsApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => ({
                url: `/notifications`,
                method: "GET",
            }),
            providesTags: ["Notification"],
        }),

        getUnreadNotificationCount: builder.query({
            query: () => ({
                url: `/notifications/unread-count`,
                method: "GET",
            }),
            providesTags: ["Notification"],
        }),

        markAllNotificationsRead: builder.mutation({
            query: () => ({
                url: `/notifications/read-all`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),

        markNotificationRead: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),
    }),
    overrideExisting: false
});

export const {
    useGetNotificationsQuery,
    useGetUnreadNotificationCountQuery,
    useMarkAllNotificationsReadMutation,
    useMarkNotificationReadMutation,
} = notificationsApiSlice;
