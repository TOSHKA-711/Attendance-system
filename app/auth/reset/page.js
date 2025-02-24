import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function page() {

 


  return (
    <div className="login flex flex-row items-end justify-center  w-full h-screen p-5 shadow-[-5px 5px 4px 0px #00000040] ">
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
      <div className="text flex flex-col items-center justify-between gap-10">
        <Image
          src={"/login.svg"}
          alt="login"
          height={30}
          width={100}
          className={"w-full  "}
        />
      </div>
      <div className="form w-1/3 border-2 border-slate-500 rounded-lg p-4 flex flex-col items-center gap-7">
      <h1 className="font-julee text-[#2F897D] text-5xl">Forgot password</h1>
        <div className="inputs flex flex-col justify-start gap-8 w-full my-4">
            <span className="w-full relative">
             <p className="font-inder absolute -top-3/4 left-0 ">username</p>
             <input type="text " className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"/>
            </span>
            <span className="w-full relative">
             <p className="font-inder absolute -top-3/4 left-0 ">New password</p>
             <input type="text " className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"/>
            </span>
            <span className="w-full relative">
             <p className="font-inder absolute -top-3/4 left-0 ">Confirm password</p>
             <input type="text " className="w-full border-2 border-[#2F897D] rounded-md px-1 font-inder text-2xl"/>
            </span>
        </div>
        <Link href={"/auth/login"}>
        <button className="bg-[#FDD05B] w-fit p-2 text-2xl -mt-3">Submit</button>
        </Link>
      </div>
    </div>
  );
}
