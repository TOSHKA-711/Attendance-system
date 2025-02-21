import React from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="takeAttendance mt-7 flex flex-col items-center gap-10 w-full">
      <div className="actions w-full flex flex-row items-center justify-evenly">
        <Link
          className="bg-[#FDD05B] w-fit py-3 px-5 font-inder text-lg self-center mt-3 flex flex-row gap-3 items-center "
          href={"#"}
        >
          <FaRegAddressCard /> Show Students
        </Link>
        <Link
          className="bg-[#FDD05B] w-fit py-3 px-5 font-inder text-lg self-center mt-3 flex flex-row gap-3 items-center  "
          href={"/dashboard/doctor/manualAttendance"}
        >
          <FaUserEdit /> Manual Attendance
        </Link>
        <Link
          className="bg-[#FDD05B] w-fit py-3 px-5 font-inder text-lg self-center mt-3 flex flex-row gap-3 items-center  "
          href={"#"}
        >
          <FaQrcode /> Generate QR Code
        </Link>
      </div>
      <div
        className="materials w-4/5 min-h-80 bg-[#F6F6F6] rounded-lg flex flex-row flex-wrap justify-start gap-5 items-start p-4 "
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
      <Image
        src={"/dash.svg"}
        alt="dash"
        height={100}
        width={100}
        className="w-4/5 absolute bottom-0 right-0 w-[20rem] -z-10"
      />
    </div>
  );
};

export default Page;
