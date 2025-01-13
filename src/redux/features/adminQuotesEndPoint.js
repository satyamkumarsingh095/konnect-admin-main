// import { catalogueSlice } from "../services/catalogueSlice";

// export const adminQuotesEndPoint = catalogueSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         allQuotes: builder.query({
//             query: () => `/all-quotes`
//         }),
//         addQuotes: builder.mutation({
//             query: (quoteBody) => ({
//                 url: `/add-quote`,
//                 body: quoteBody,
//                 method: 'POST'
//             })
//         }),
//         updateQuotes: builder.mutation({
//             query: ({ quoteBody, quotesId }) => ({
//                 url: `/update-quote/${quotesId}`,
//                 body: quoteBody,
//                 method: 'PUT'
//             })
//         }),
//         deleteQuotes: builder.mutation({
//             query: (quotesId) => ({
//                 url: `/delete-quote/${quotesId}`,
//                 method: 'DELETE'
//             })
//         }),
//         changeStatusQuotes: builder.mutation({
//             query: ({ quoteBody, quotesId }) => ({
//                 url: `/change-quote-status/${quotesId}`,
//                 body: quoteBody,
//                 method: 'PUT'
//             })
//         }),
//         dasboardData: builder.query({
//             query: () => `/dashboard-data`
//         })

//     })
// })

// export const { useAllQuotesQuery, useAddQuotesMutation, useUpdateQuotesMutation, useDeleteQuotesMutation, useChangeStatusQuotesMutation, useDasboardDataQuery } = adminQuotesEndPoint