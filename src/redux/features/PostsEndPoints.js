// import { catalogueSlice } from "../services/catalogueSlice";

// export const postsEndPoints = catalogueSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getAllPosts: builder.query({
//             query: ({ user_name, status, fromDate, toDate }) => `/all-post?username=${user_name}&status=${status}&fromDate=${fromDate}&toDate=${toDate}`
//         }),
//         updateStatus: builder.mutation({
//             query: (postID) => ({
//                 url: `/block-post/${postID}`,
//                 method: 'put'
//             })
//         }),
//         deletePost: builder.mutation({
//             query: (postID) => ({
//                 url: `/add-post-trash/${postID}`,
//                 method: 'put',
//             })
//         }),
//     })
// })


// export const { useGetAllPostsQuery, useUpdateStatusMutation , useDeletePostMutation } = postsEndPoints