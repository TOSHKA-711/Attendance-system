"use client";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardPath = () => {
  const path = usePathname()?.replace(/^\/+/, "").split("/").pop(); 


  return (
    <div className="flex flex-col items-start gap-1 font-inder">
      <h1 className="text-[#17272F] text-3xl font-gugi">{path}</h1>
      <span className="flex flex-row gap-3">
        <p className="text-[#2F897D] text-lg">Dashboard /</p>
        <p className="text-[#17272F] text-lg"> {path}</p>
      </span>
    </div>
  );
};

export default DashboardPath;
