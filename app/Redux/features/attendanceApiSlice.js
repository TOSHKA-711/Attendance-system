import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApiSlice = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://attendance-eslamrazeen-eslam-razeens-projects.vercel.app/api/attendanceQRCode",
    credentials: "include",
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
  tagTypes: ["Attendance"],
  endpoints: (builder) => ({
    getAllAttendances: builder.query({
      query: (courseId) => `/showStudent/${courseId}`,
      providesTags: ["Attendance"],
    }),

    addStudentAttendance: builder.mutation({
      query: ({ courseId, newUser }) => ({
        url: `/attendances`,
        method: "POST",
        body: newUser,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Attendance"],
    }),
    addStudentsSheet: builder.mutation({
      query: (users) => ({
        url: `/studentInfo`,
        method: "POST",
        body: users,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAllAttendancesQuery,
  useAddStudentAttendanceMutation,
  useAddStudentsSheetMutation,
} = attendanceApiSlice;
