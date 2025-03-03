import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://attendance-eslamrazeen-eslam-razeens-projects.vercel.app/api/attendanceQRCode/sessions",
  prepareHeaders: (headers) => {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token")?.replace(/"/g, "") || "";
      console.log("Token in Headers:", token); 
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

export const sessionApiSlice = createApi({
  reducerPath: "sessionApi",
  baseQuery,
  tagTypes: ["Session"], // Cache tag for re-fetching

  endpoints: (builder) => ({
    createSession: builder.mutation({
      query: (course) => ({
        url: "/",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Session"],
    }),

    getQrCode: builder.mutation({
      query: (sessionId) => ({
        url: `/${sessionId}/qrcode`,  
        method: "GET",
      }),
      providesTags: ["Session"],
    }),
  }),
});

export const { useCreateSessionMutation, useGetQrCodeMutation } = sessionApiSlice;
