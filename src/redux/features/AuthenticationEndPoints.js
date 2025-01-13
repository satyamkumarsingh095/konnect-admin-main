// import { Login } from "@mui/icons-material";
// import { catalogueSlice } from "../services/catalogueSlice";

// export const authenticationendPoints = catalogueSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getAllUsers: builder.query({
//             query: ({ first_name, last_name, user_name, fromDate, toDate }) => `/all-user?first_name=${first_name}&last_name=${last_name}&username=${user_name}&fromDate=${fromDate}&toDate=${toDate}`
//         }),
//         updateUserStatus: builder.mutation({
//             query: (userId) => ({
//                 url: `/block-user/${userId}`,
//                 method: 'PUT'
//             })
//         }),
//         getAdminProfile: builder.query({
//             query: () => `/get-profile`
//         })
//     })
// })

// export const { useGetAllUsersQuery, useUpdateUserStatusMutation, useGetAdminProfileQuery } = authenticationendPoints