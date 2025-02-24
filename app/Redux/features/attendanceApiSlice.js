import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApiSlice = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://attendance-eslamrazeen-eslam-razeens-projects.vercel.app/api/attendanceQRCode",
    credentials: "include", // ✅ Ensures authentication (especially with cookies)
    prepareHeaders: (headers) => {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("token")?.replace(/"/g, "")
          : null;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Attendance"], // ✅ Enables cache invalidation
  endpoints: (builder) => ({
    getAllAttendances: builder.query({
      query: (courseId) => `/report/${courseId}`,
      providesTags: ["Attendance"], // ✅ Marks query data with "Attendance" tag
    }),

    addStudentAttendance: builder.mutation({
      query: (newUser) => ({
        url: `/attendances`,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Attendance"], // ✅ Triggers refetching when new data is added
    }),

    deleteStudentAttendance: builder.mutation({
      query: (documentId) => ({
        url: `/attendances/${documentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"], // ✅ Ensures the deleted item is removed from UI
    }),
  }),
});

export const {
  useGetAllAttendancesQuery,
  useDeleteStudentAttendanceMutation,
  useAddStudentAttendanceMutation,
} = attendanceApiSlice;
