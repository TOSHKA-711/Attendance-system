import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://attendance-system-nodejs-git-main-toshka-711s-projects.vercel.app/api/attendanceQRCode",
    credentials: "include", //
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token")?.replace(/"/g, "");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `/users`,
      providesTags: ["Users"],
    }),

    deleteStaffUser: builder.mutation({
      query: (staffId) => ({
        url: `/users/${staffId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    addStaffUser: builder.mutation({
      query: (user) => ({
        url: `/users`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    getHomeReport: builder.mutation({
      query: (data) => ({
        url: `/staffReport`,
        method: "POST",
        body: data,
      }),
    }),
    getDoctorReport: builder.mutation({
      query: (data) => ({
        url: `/doctorReport`,
        method: "POST",
        body: data,
      }),
    }),
    getStaffDoctorReport: builder.query({
      query: (userId) => `/staffDoctorReport/${userId}`,
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteStaffUserMutation,
  useAddStaffUserMutation,
  useGetHomeReportMutation,
  useGetDoctorReportMutation,
  useGetStaffDoctorReportQuery,
} = usersApiSlice;
