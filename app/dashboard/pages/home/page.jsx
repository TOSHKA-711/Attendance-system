import Calendar from "@/app/items/Calendar";
import DashCard from "@/app/items/dashCard";
import DashLineChart from "@/app/items/LineChart";
import Image from "next/image";

import React from "react";

const DashHome = () => {
  return (
    <div className="home pt-5 flex flex-row items-center gap-5">
      <div className="homeCards flex flex-col gap-5 w-3/4">
        <div className=" flex flex-row items-start  gap-5">
          <DashCard />
          <DashCard />
          <DashCard />
          
        </div>
        <DashLineChart />
      </div>
      <div className="flex flex-col justify-between gap-3">
        <Calendar />
        <Image src={"/dash.svg"} alt="dash" height={100} width={100} className="w-4/5"/>
      </div>
    
    </div>
  );
};

export default DashHome;
