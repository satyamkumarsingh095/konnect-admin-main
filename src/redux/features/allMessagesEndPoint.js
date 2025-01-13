// import { catalogueSlice } from "../services/catalogueSlice";

// export const allMessagesEndPoint = catalogueSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         allMesssages: builder.query({
//             query: () => `/all-messages`
//         }),
//         addMessages: builder.mutation({
//             query: (msgBody) => ({
//                 url: `/add-msg`,
//                 body: msgBody,
//                 method: 'POST'
//             })
//         }),
//         updateMessages: builder.mutation({
//             query: ({ msgBody, msgId }) => ({
//                 url: `/update-msg/${msgId}`,
//                 body: msgBody,
//                 method: 'PUT'
//             })
//         }),
//         deleteMessages: builder.mutation({
//             query: (msgId) => ({
//                 url: `/delete-msg/${msgId}`,
//                 // bosy: {},
//                 method: 'DELETE'
//             })
//         }),
//         changeStatusMessage: builder.mutation({
//             query: ({ quoteBody, quotesId }) => ({
//                 url: `/change-msg-status/${quotesId}`,
//                 method: 'PUT',
//                 body: quoteBody
//             })
//         }),
//     })
// })

// export const { useAllMesssagesQuery, useAddMessagesMutation, useUpdateMessagesMutation, useDeleteMessagesMutation, useChangeStatusMessageMutation } = allMessagesEndPoint