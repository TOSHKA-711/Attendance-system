import ProgressCircle from "@/app/items/Pregresscircle";
import Image from "next/image";
import React from "react";
import { CiSquareMinus } from "react-icons/ci";

const Details = () => {
  return (
    <div className="details w-full flex flex-col gap-6 items-start">
      <div className="doctorDetails w-full flex flex-row items-center justify-evenly p-5">
        <div className="w-40 h-40 rounded-full overflow-hidden">
          <Image
            src="/me.jpg"
            alt="Sara Sheehab"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
        <span className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold">Ali Mostafa</h1>
          <p className="text-3xl text-gray-600">Software Engineering</p>
        </span>
        <div className="flex flex-col items-center gap-3">
          <span className="text-2xl text-gray-700">Staff ID: 2024189</span>
          <span className="flex flex-row items-center gap-9">
            <p className="text-2xl text-gray-700">Ali@gmail.com</p>
            <p className="text-2xl text-gray-700">+20 1003394475</p>
          </span>
        </div>
      </div>

      <div className="materials w-full flex flex-row flex-wrap justify-evenly px-5">
        <div
          className="subjects min-w-80 max-w-2xl min-h-fit bg-[#FDD05B57] rounded-lg flex flex-row flex-wrap justify-evenly gap-5 items-start p-4 "
          style={{
            boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
            border: "1px solid",
          }}
        >
          <span className="bg-[#FFCD4A] rounded-lg pt-7 pb-4 px-8 w-[8rem] text-center relative ">
            <CiSquareMinus className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 text-2xl font-bold cursor-pointer   " />
            Compiler Desgin
          </span>
          <span className="bg-[#FFCD4A] rounded-lg pt-7 pb-4 px-8 w-[8rem] text-center relative ">
            <CiSquareMinus className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 text-2xl font-bold cursor-pointer   " />
            Compiler Desgin
          </span>
          <span className="bg-[#FFCD4A] rounded-lg pt-7 pb-4 px-8 w-[8rem] text-center relative ">
            <CiSquareMinus className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 text-2xl font-bold cursor-pointer   " />
            Compiler Desgin
          </span>
          <span className="bg-[#FFCD4A] rounded-lg pt-7 pb-4 px-8 w-[8rem] text-center relative ">
            <CiSquareMinus className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 text-2xl font-bold cursor-pointer   " />
            Compiler Desgin
          </span>
   
        </div>
        <div className="chart min-w-80 max-w-2xl min-h-fit bg-[#27CDA55C] rounded-lg flex flex-col items-center px-4 py-7 ">
            <div className="flex flex-row gap-6 items-center">
                <h1>Performance</h1>
                <p>Show: This month</p>
            </div>
        <ProgressCircle value={75} size={150} strokeWidth={15} />


        </div>
      </div>
    </div>
  );
};

export default Details;
