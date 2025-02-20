import Link from "next/link";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaMessage } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="sidebar bg-[#2F897DC4] text-white max-h-screen h-screen flex flex-col items-start justify-between p-4 px-6 pt-36 font-inder sticky top-0 ">

      <span className="flex flex-col items-start justify-between gap-7">
        <Link
          className="cursor-pointer hover:text-[#17272F] duration-300 gugi.className flex flex-row items-center justify-start gap-5  "
          href={"/dashboard/pages/home"}
        >
          <MdOutlineDashboard /> Dashboard
        </Link>
        <Link
          className="cursor-pointer hover:text-[#17272F] duration-300 gugi.className flex flex-row items-center justify-start gap-5  "
          href={"/dashboard/pages/staff"}
        >
          <MdPeopleAlt /> Staff
        </Link>
        <Link
          className="cursor-pointer hover:text-[#17272F] duration-300 gugi.className flex flex-row items-center justify-start gap-5  "
          href={"/dashboard/pages/document"}
        >
          <FaFolder />
          Documents
        </Link>
        <Link
          className="cursor-pointer hover:text-[#17272F] duration-300 gugi.className flex flex-row items-center justify-start gap-5  "
          href={"#"}
        >
          <SlCalender />
          Calender
        </Link>
        <Link
          className="cursor-pointer hover:text-[#17272F] duration-300 gugi.className flex flex-row items-center justify-start gap-5  "
          href={"#"}
        >
          <FaMessage />
          Messages
        </Link>
      </span>
      <span className="flex flex-col items-start justify-between">
        <Link
          className="cursor-pointer hover:text-[#17272F] duration-300 gugi.className flex flex-row items-center justify-start gap-5  "
          href={"#"}
        >
          <IoLogOut />
          Logout
        </Link>
      </span>
    </div>
  );
};

export default Sidebar;
