"use client"
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";

// Dynamically import Avatar to prevent SSR hydration mismatch
const Avatar = dynamic(() => import("@mui/material/Avatar"), { ssr: false });

export default function Navbar() {
  const userRole = useSelector((state)=>state.userRole.isAdmin)

  return (
    <div className="navbar bg-[#17272F] w-full flex flex-row items-center justify-between px-4 py-2 fixed top-0 left-0 font-gugi z-[2]">
      <Image src={"/logo.png"} alt="logo" width={70} height={30} />
      <h1 className="text-[#2F897D] text-4xl gugi.className">
        FCAI Attendance System
      </h1>

      <div className="admin flex flex-row items-center gap-2">
        <IoIosNotifications className="text-white text-3xl mr-2" />
        <p className="text-white">{userRole ? "ADMIN" : "STAFF"}</p>
        <Avatar />
      </div>
  
    </div>
  );
}
