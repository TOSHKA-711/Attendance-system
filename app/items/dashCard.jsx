import React from "react";
import DashPieChart from "./dashPieChart";

const DashCard = () => {
  return (
    <div className="card flex flex-col items-start justify-center gap-4 bg-[#FDD05B57] w-fit py-3 px-10 rounded-lg">
      <span className="flex flex-row gap-2 font-poppins">
        <p className="text-[#27CDA5] ">Present</p>
        <p className="text-zinc-400">|</p>
        <p className="text-zinc-400">Today</p>
      </span>
      <div className="flex flex-row gap-8 items-start">
        <DashPieChart />
        <div className="flex flex-col items-start gap-2 ">
          <p className="text-[#27CDA5] text-3xl ">140</p>
          <span>
            <p className="text-[#012970] text-lg">12%</p>
            <p className="text-zinc-400">increase</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashCard;
