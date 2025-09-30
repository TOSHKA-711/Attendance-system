"use client";
import ProgressCircle from "@/app/items/Pregresscircle";
import Image from "next/image";
import React, { useMemo } from "react";
import { CiSquareMinus } from "react-icons/ci";
import { useSelector } from "react-redux";
import {
  useAddDoctorCourseMutation,
  useDeleteDoctorCourseMutation,
} from "@/app/Redux/features/coursesApiSlice";
import SelectCourseDialog from "@/app/items/SelecetedCourseDialog";
import { useGetStaffDoctorReportQuery } from "@/app/Redux/features/usersApiSlice";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

const Details = () => {
  // const [addedCourse, setAddedCourse] = useState();
  const userData = useSelector((state) => state.selectedUser?.user);
  const [deleteDoctorCourse] = useDeleteDoctorCourseMutation();
  const [addDoctorCourse] = useAddDoctorCourseMutation();
  const userId = userData?._id;
  const { data: doctorReport } = useGetStaffDoctorReportQuery(userId, {
    skip: !userId,
  });

  if (!userData) {
    return (
      <div className="p-6 text-center text-gray-600">
        No staff member selected.
      </div>
    );
  }

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteDoctorCourse({ courseId, userId: userData._id });
      window.alert("course deleted successfully");
    } catch (error) {
      window.alert("course deleted failed");
      console.log(error);
    }
  };
  const handleAddCourse = async (courseId) => {
    console.log("Will send to backend:", {
      courseId,
      userId: userData._id,
    });
    try {
      await addDoctorCourse({ courseId, userId: userData._id });
      window.alert("Course added successfully");
    } catch (error) {
      window.alert("Course add failed");
      console.log("❌ Error details:", error?.data || error);
    }
  };

  return (
    <div className="details w-full flex flex-col gap-6 items-start mb-5">
      <div className="doctorDetails w-full flex flex-row items-center justify-evenly p-5">
        <div className="w-40 h-40 rounded-full overflow-hidden">
          <Image
            src="https://avatars.dicebear.com/api/big-smile/sara.svg"
            alt="Sara Sheehab"
            width={160}
            height={160}
            className="rounded-full object-cover w-40 h-40"
          />
        </div>
        <span className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold">{userData?.name ?? "Unknown"}</h1>
          <p className="text-3xl text-gray-600">
            {userData?.lecturerRole ?? ""}
          </p>
        </span>
        <div className="flex flex-col items-center gap-3">
          <span className="text-2xl text-gray-700">Staff ID: 2024189</span>
          <span className="flex flex-row items-center gap-9">
            <p className="text-2xl text-gray-700">{userData?.email ?? ""}</p>
            {/* <p className="text-2xl text-gray-700">+20 1003394475</p> */}
          </span>
        </div>
      </div>

      <div className="materials w-full flex flex-row flex-wrap justify-evenly px-5 ">
        <div
          className="subjects min-w-80 max-w-2xl min-h-fit bg-[#FDD05B57] rounded-lg flex flex-row flex-wrap justify-evenly gap-5 items-stretch p-4 relative"
          style={{
            boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
            border: "1px solid",
          }}
        >
          <button className="add absolute right-2 -top-12 flex items-center gap-2">
            <SelectCourseDialog addCourse={handleAddCourse} />
          </button>

          {userData?.lecturerCourses?.map((course) => (
            <span
              className="bg-[#FFCD4A] rounded-lg pt-7 pb-4 px-8 w-[12rem] text-center relative"
              key={course._id}
            >
              <CiSquareMinus
                className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 text-2xl font-bold cursor-pointer"
                onClick={() => handleDeleteCourse(course._id)}
              />
              {course.courseName}
            </span>
          ))}
        </div>
        <div className="chart min-w-80 max-w-2xl min-h-fit bg-[#27CDA55C] rounded-lg flex flex-col items-center px-4 py-7 ">
          <div className="flex flex-row gap-6 items-center">
            <h1>Performance</h1>
            <p>Show: This month</p>
          </div>
          <ProgressCircle data={doctorReport ?? []} />
        </div>
      </div>
    </div>
  );
};

export default Details;
