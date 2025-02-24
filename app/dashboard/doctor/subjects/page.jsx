"use client";
import { useGetCoursesQuery } from "@/app/Redux/features/coursesApiSlice";
import { setSelectedCourse } from "@/app/Redux/Slices/selectedCourseSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DoctorSubjects = () => {
  const router = useRouter();
  // Always call hooks in the same order
  const { data, error, isLoading } = useGetCoursesQuery();
  const FetchedCourses = data?.data || [];
  const selectedCourse = useSelector((state) => state.selectedCourse.course);
  const dispatch = useDispatch();

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const levels = ["1", "2", "3", "4"];
  const departments = ["CS", "IS", "AI", "BIO"];
  const semesters = ["1", "2"];

  // Memoized filtered courses
  const filteredCourses = useMemo(() => {
    return FetchedCourses.filter(
      (course) =>
        (!selectedDepartment || course.department === selectedDepartment) &&
        (!selectedLevel || course.level === selectedLevel) &&
        (!selectedSemester || course.semester === selectedSemester)
    );
  }, [FetchedCourses, selectedDepartment, selectedLevel, selectedSemester]);

  // Log filtered courses when dependencies change
  useEffect(() => {
    console.log(filteredCourses);
    console.log(selectedCourse);
  }, [filteredCourses, selectedCourse]);

  // handle select course
  const handleCourseSelect = (e) => {
    dispatch(setSelectedCourse(e));
    router.push("/dashboard/doctor/takeAttendance")
  };

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="w-full justify-center flex flex-col gap-10 items-center relative ">
        <div className="flex flex-col items-center gap-4">
          {/* Levels Section */}
          <div
            className="levels w-[40rem] py-2 px-3 bg-[#FEEFC7] rounded-lg flex flex-wrap justify-between items-center gap-3"
            style={{
              boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
              border: "1px solid",
            }}
          >
            {levels.map((level) => (
              <p
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`rounded-lg py-2 px-4 cursor-pointer ${
                  selectedLevel === level ? "bg-[#FDD05B]" : "bg-white"
                }`}
              >
                Level {level}
              </p>
            ))}
          </div>

          {/* Departments Section */}
          <div
            className="levels w-[35rem] py-2 px-3 bg-[#FEEFC7] rounded-lg flex flex-wrap justify-evenly items-center"
            style={{
              boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
              border: "1px solid",
            }}
          >
            {departments.map((dept) => (
              <p
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`rounded-lg py-2 px-4 cursor-pointer ${
                  selectedDepartment === dept ? "bg-[#FDD05B]" : "bg-white"
                }`}
              >
                {dept}
              </p>
            ))}
          </div>

          {/* Semesters Section */}
          <div
            className="levels w-[25rem] py-2 px-3 bg-[#FEEFC7] rounded-lg flex flex-wrap justify-evenly items-center"
            style={{
              boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
              border: "1px solid",
            }}
          >
            {semesters.map((sem) => (
              <p
                key={sem}
                // onClick={() => setSelectedSemester(sem)}
                className={`rounded-lg py-2 px-4 cursor-pointer ${
                  selectedSemester === sem ? "bg-[#FDD05B]" : "bg-white"
                }`}
              >
                Semester {sem}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="view w-[60rem] flex flex-col items-start gap-2 mt-7 self-center">
        <p>View Materials</p>
        <div
          className="materials w-full min-h-fit bg-[#F6F6F6] rounded-lg flex flex-row flex-wrap justify-start gap-5 items-start p-4"
          style={{
            boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
            border: "1px solid",
          }}
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <p
                key={course._id}
                className="bg-white rounded-lg py-2 px-4 cursor-pointer border-2 border-[#2F897D]"
                onClick={() => handleCourseSelect(course)}
              >
                {course.courseName}
              </p>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      </div>

      <Link
        className="bg-[#FDD05B] w-fit p-2 text-2xl self-center mt-3 mb-5"
        href={"#"}
      >
        Continue
      </Link>

      <Image
        src={"/dash.svg"}
        alt="dash"
        height={100}
        width={100}
        className="w-4/5 absolute bottom-0 right-0 w-[20rem] -z-10"
      />
    </>
  );
};

export default DoctorSubjects;
