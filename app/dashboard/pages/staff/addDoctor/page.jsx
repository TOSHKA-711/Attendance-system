"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper"; // إصلاح الاستيراد
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// importing imgs
import Image from "next/image";
import Link from "next/link";

import { useGetCoursesQuery } from "@/app/Redux/features/coursesApiSlice";
import { setSelectedCourse } from "@/app/Redux/Slices/selectedCourseSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useAddStaffUserMutation } from "@/app/Redux/features/usersApiSlice";

const AddDoctor = () => {
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    lecturerRole: "",
    lecturerDepartment: "",
    lecturerCourses: [],
  });
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(
    typeof SwiperCore | null
  );

  // Always call hooks in the same order
  const { data, error, isLoading } = useGetCoursesQuery();
  const [addStaffUser, { isLoading: isAdding, isError, isSuccess }] =
    useAddStaffUserMutation();

  const FetchedCourses = data?.data || [];
  const selectedCourse = useSelector((state) => state.selectedCourse.course);

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
    setNewUser((prev) => {
      const isAlreadySelected = prev.lecturerCourses.includes(e);

      return {
        ...prev,
        lecturerCourses: isAlreadySelected
          ? prev.lecturerCourses.filter((course) => course !== e)
          : [...prev.lecturerCourses, e],
      };
    });
    console.log(newUser.lecturerCourses);
  };

  const handleSlideChange = (swiper) => {
    // Check if the current slide is the last one
    setIsLastSlide(swiper.activeIndex === swiper.slides.length - 1);
  };

  useEffect(() => {
    if (swiperInstance && prevButtonRef.current && nextButtonRef.current) {
      swiperInstance.navigation.update(); // Ensure navigation works after references are set
    }
  }, [swiperInstance]);

  // handle inputs change

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle add user
  const handleAddUser = async () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.password ||
      !newUser.passwordConfirm
    ) {
      return window.alert("Please fill in all required fields.");
    }
    try {
      await addStaffUser(newUser).unwrap();
      window.alert("User added successfully!");
      setNewUser({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        lecturerRole: "",
        lecturerDepartment: "",
        lecturerCourses: [],
      });
      router.push("/dashboard/pages/staff/addDoctor");
      if (swiperInstance) {
        swiperInstance.slidePrev();
      }
    } catch (error) {
      console.error("Failed to add user:", error);

      // Extract error message if available
      const errorMessage =
        error?.data?.errors?.[0]?.msg ||
        "An unexpected error occurred. Please try again.";

      window.alert(`Failed to add user: ${errorMessage}`);
    }
  };

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={setSwiperInstance} // Store swiper instance in state
        onSlideChange={handleSlideChange}
        className="max-w-[85vw]"
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
      >
        <SwiperSlide className="w-full justify-center flex flex-row items-center">
          <div className="form w-1/3 border-2 border-slate-500 rounded-lg p-4 flex flex-col items-center gap-7">
            <div className="inputs flex flex-col justify-start gap-8 w-full my-4">
              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">Username</p>
                <input
                  type="text "
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                  value={newUser.name}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </span>
              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">Email</p>
                <input
                  type="text "
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                  value={newUser.email}
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                />
              </span>
              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">Password</p>
                <input
                  value={newUser.password}
                  name="password"
                  onChange={(e) => handleInputChange(e)}
                  type="password"
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                />
              </span>
              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">
                  Confirm Password
                </p>
                <input
                  value={newUser.passwordConfirm}
                  name="passwordConfirm"
                  onChange={(e) => handleInputChange(e)}
                  type="password"
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                />
              </span>
              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">
                  Department
                </p>
                <input
                  value={newUser.lecturerDepartment}
                  name="lecturerDepartment"
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                />
              </span>
              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">
                  lecturer Role
                </p>
                <input
                  value={newUser.lecturerRole}
                  name="lecturerRole"
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                />
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full justify-center flex flex-col gap-3 items-center">
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
                        selectedDepartment === dept
                          ? "bg-[#FDD05B]"
                          : "bg-white"
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

            <div className="view w-[60rem] flex flex-col items-start gap-2 my-7 self-center">
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
                      className={`${
                        newUser.lecturerCourses.includes(course._id)
                          ? "bg-[#FDD05B]"
                          : "bg-white"
                      }  rounded-lg py-2 px-4 cursor-pointer border-2 border-[#2F897D]`}
                      onClick={() => handleCourseSelect(course._id)}
                    >
                      {course.courseName}
                    </p>
                  ))
                ) : (
                  <p>No courses found.</p>
                )}
              </div>
            </div>
          </>
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation Buttons */}
      {isLastSlide && (
        <button
          onClick={handleAddUser}
          className="absolute bottom-[20%] left-[30px] translate-y-[-50%] z-10 bg-[#FDD05B] text-black border-none px-[25px] py-[10px] cursor-pointer outline-none font-julee"
        >
          Add
        </button>
      )}

      <button
        ref={prevButtonRef}
        aria-label="Previous Slide"
        className="absolute bottom-[150%] left-[30px] translate-y-[-50%] z-10 bg-[#fff] text-white border-none px-[25px] py-[10px] cursor-pointer outline-none font-julee"
      >
        Back
      </button>
      {!isLastSlide ? (
        <button
          ref={nextButtonRef}
          aria-label="Next Slide"
          className="absolute bottom-[20%] right-[30px] translate-y-[-50%] z-10 bg-[#FDD05B] text-black  border-none px-[25px] py-[10px] cursor-pointer outline-none font-julee"
        >
          Next
        </button>
      ) : (
        <Link
          href={"/dashboard/pages/staff"}
          className="absolute bottom-[20%] right-[30px] translate-y-[-50%] z-10 bg-[#FDD05B] text-black border-none px-[25px] py-[10px] cursor-pointer outline-none font-julee"
        >
          Finish
        </Link>
      )}
    </div>
  );
};

export default AddDoctor;
