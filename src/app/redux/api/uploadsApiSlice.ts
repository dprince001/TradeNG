import { generalApiSlice } from "./apiSlice";

const uploadsApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImages: builder.mutation({
            query: (body) => ({
                url: "/uploads/images",
                method: "POST",
                body,
            }),
        }),

        uploadVideo: builder.mutation({
            query: (body) => ({
                url: "/uploads/video",
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false
});

export const { useUploadImagesMutation, useUploadVideoMutation } = uploadsApiSlice;
