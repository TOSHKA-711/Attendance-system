import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Welcome() {
  return (
    <div className="welcome h-screen max-h-screen  bg-[url(/emp_Nero AI_Standard_x4 1.svg)]">
      <div className="wel-nav bg-[#17272F] w-full flex flex-row items-center justify-center gap-9 px-4 py-4 absolute top-0 left-0  ">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={70}
          height={30}
          className="absolute left-0 p-1 "
        />
        <h1 className="text-[#2F897D] text-4xl font-gugi ">
          FCAI Attendance System{" "}
        </h1>
      </div>
      <h1 className="text-[#17272F] text-7xl absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Welcome
      </h1>
      <Link href={"/auth/login"}>
        <Image
          src={"/welcome-arrow.svg"}
          alt="arrow"
          width={100}
          height={30}
          className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        />
      </Link>
    </div>
  );
}
