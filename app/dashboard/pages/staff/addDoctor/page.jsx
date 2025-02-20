"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper"; // إصلاح الاستيراد
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// importing imgs
import Image from "next/image";
import Link from "next/link";

const AddDoctor = () => {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(
    typeof SwiperCore | null
  );

  const handleSlideChange = (swiper) => {
    // Check if the current slide is the last one
    setIsLastSlide(swiper.activeIndex === swiper.slides.length - 1);
    console.log(swiper.activeIndex);
  };

  useEffect(() => {
    if (swiperInstance && prevButtonRef.current && nextButtonRef.current) {
      swiperInstance.navigation.update(); // Ensure navigation works after references are set
    }
  }, [swiperInstance]);

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
                />
              </span>
              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">Email</p>
                <input
                  type="text "
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                />
              </span>
              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">Password</p>
                <input
                  type="password"
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                />
              </span>

              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">
                  Department
                </p>
                <input
                  type="text "
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                />
              </span>
              <span className="w-full relative">
                <p className="font-inder absolute -top-3/4 left-0 ">role</p>
                <input
                  type="text "
                  className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"
                />
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full justify-center flex flex-col gap-3 items-center">
          <div
            className="levels w-[40rem] py-2 px-3 bg-[#FEEFC7] p-2 rounded-lg flex flex-row gap-3 flex-wrap justify-between items-center "
            style={{
              boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
              border: "1px solid",
            }}
          >
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
              Level 1
            </p>
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
              Level 2
            </p>
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
              Level 3
            </p>
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
              Level 4
            </p>
          </div>
          <div
            className="levels w-[40rem] py-2 px-3 bg-[#FEEFC7] p-2 rounded-lg flex flex-row flex-wrap justify-evenly items-center "
            style={{
              boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
              border: "1px solid",
            }}
          >
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">CS</p>
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">IS</p>
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">AI</p>
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">BIO</p>
          </div>
          <div
            className="levels w-[40rem] py-2 px-3 bg-[#FEEFC7] p-2 rounded-lg flex flex-row flex-wrap justify-evenly items-center "
            style={{
              boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
              border: "1px solid",
            }}
          >
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
              Semester 1
            </p>
            <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
              Semester 2
            </p>
          </div>
          <div className="view  w-[40rem] flex flex-col items-start gap-2 mt-3">
            <p>View Materials</p>
            <div
              className="materials w-full min-h-fit bg-[#F6F6F6] rounded-lg flex flex-row flex-wrap justify-start gap-5 items-start p-4 "
              style={{
                boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
                border: "1px solid",
              }}
            >
              <p className="bg-white rounded-lg py-2 px-4 cursor-pointer border-2 border-[#2F897D]">
                Compiler Desgin
              </p>
              <p className="bg-white rounded-lg py-2 px-4 cursor-pointer border-2 border-[#2F897D]">
                Computer Security
              </p>
            </div>
          </div>
          <div className="setQR  w-[40rem] flex flex-col items-start gap-2 mt-2">
            <p>Adjust QR code settings</p>
            <div
              className="materials w-full min-h-fit bg-[#FEEFC7] rounded-lg flex flex-row flex-wrap justify-between gap-5 items-start p-4 "
              style={{
                boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
                border: "1px solid",
              }}
            >
              <span className=" p-2 flex flex-col items-start gap-2">
                <p>Course ID</p>
                <input
                  type="text"
                  className="bg-white max-w-28 rounded-lg py-2 px-2 cursor-pointer border-2 border-[#2F897D]"
                />
              </span>
              <span className=" p-2 flex flex-col items-start gap-2">
                <p>Course Name</p>
                <input
                  type="text"
                  className="bg-white max-w-28 rounded-lg py-2 px-2 cursor-pointer border-2 border-[#2F897D]"
                />
              </span>
              <span className=" p-2 flex flex-col items-start gap-2">
                <p>Course Speed</p>
                <input
                  type="text"
                  className="bg-white max-w-28 rounded-lg py-2 px-2 cursor-pointer border-2 border-[#2F897D]"
                />
              </span>
              <span className=" p-2 flex flex-col items-start gap-2">
                <p>Time Working</p>
                <input
                  type="text"
                  className="bg-white max-w-28 rounded-lg py-2 px-2 cursor-pointer border-2 border-[#2F897D]"
                />
              </span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation Buttons */}
      {isLastSlide && (
        <button
        className="absolute -bottom-[0%] left-[30px] translate-y-[-50%] z-10 bg-[#FDD05B] text-black border-none px-[25px] py-[10px] cursor-pointer outline-none font-julee"
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
          className="absolute -bottom-[0%] right-[30px] translate-y-[-50%] z-10 bg-[#FDD05B] text-black  border-none px-[25px] py-[10px] cursor-pointer outline-none font-julee"
        >
          Next
        </button>
      ) : (
        <Link
          href="/dashboard/pages/staff"
          className="absolute -bottom-[0%] right-[30px] translate-y-[-50%] z-10 bg-[#FDD05B] text-black font-gugi border-none px-[25px] py-[10px] cursor-pointer outline-none"
        >
          Finish
        </Link>
      )}
    </div>
  );
};

export default AddDoctor;
