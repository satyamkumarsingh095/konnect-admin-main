// import { catalogueSlice } from "../services/catalogueSlice";

// export const PagesEndPoints = catalogueSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getAllPages: builder.query({
//             query: () => `/all-policy`,
//         }),
//         updatePageStatus: builder.mutation({
//             query: (pageId) => ({
//                 url: `/update-status/${pageId}`,
//                 method: 'PUT'
//             })
//         }),
//         addNewPage: builder.mutation({
//             query: (pageData) => ({
//                 url: `/add-policy`,
//                 method: 'POST',
//                 body: pageData
//             })
//         }),
//         updatePage: builder.mutation({
//             query: ({ pageData, pageId }) => ({
//                 url: `/update-policy/${pageId}`,
//                 method: 'PUT',
//                 body: pageData
//             })
//         }),
//         deletePage: builder.mutation({
//             query: (pageId) => ({
//                 url: `/delete-policy/${pageId}`,
//                 method: 'DELETE',
//             })
//         }),
//     })
// })

// export const { useGetAllPagesQuery, useUpdatePageStatusMutation, useAddNewPageMutation, useUpdatePageMutation, useDeletePageMutation } = PagesEndPoints;