import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    "https://attendance-eslamrazeen-eslam-razeens-projects.vercel.app/api/attendanceQRCode",
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")?.replace(/"/g, "") || "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
  credentials: "include",
});

export const coursesApiSlice = createApi({
  reducerPath: "coursesApi",
  baseQuery,
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
    }),
    deleteDoctorCourse: builder.mutation({
      query: ({ courseId, userId }) => ({
        url: `/users/deleteCourses/${courseId}`,
        method: "DELETE",
        body: userId,
      }),
    }),
    addDoctorCourse: builder.mutation({
      query: ({ courseId, userId }) => ({
        url: `/users/addCourses`,
        method: "POST",
        body: { courseId, userId },
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useDeleteDoctorCourseMutation,
  useAddDoctorCourseMutation,
} = coursesApiSlice;
