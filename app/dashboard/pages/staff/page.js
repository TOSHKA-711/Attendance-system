"use client"
import StaffTable from "@/app/items/StaffTable";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdPersonAdd } from "react-icons/io";

const Staff = () => {
  const router = useRouter();
  const handleAddClick = ()=>{
    router.push("/dashboard/pages/staff/addDoctor");
  }
  return (
    <div className="relative">
      <div className="actions absolute -top-[7%] right-[20px] bg-blue-500 px-4 py-1 rounded-md cursor-pointer" onClick={handleAddClick}>
        <IoMdPersonAdd className=" text-2xl text-white" />{" "}
      </div>
      <StaffTable />
    </div>
  );
};

export default Staff;
