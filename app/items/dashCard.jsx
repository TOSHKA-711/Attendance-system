import React from "react";
import DashPieChart from "./dashPieChart";

const DashCard = ({ title = "Present", value = 0, rate = "0%", color = "#27CDA5", bgColor = "#FDD05B57", description = "increase" }) => {
  return (
    <div
      className="card flex flex-col items-start justify-center gap-4 w-fit py-3 px-10 rounded-lg"
      style={{ backgroundColor: bgColor }}
    >
      <span className="flex flex-row gap-2 font-poppins">
        <p className="text-[#27CDA5]">{title}</p>
        <p className="text-zinc-400">|</p>
        <p className="text-zinc-400">Today</p>
      </span>
      <div className="flex flex-row gap-8 items-start">
        <DashPieChart />
        <div className="flex flex-col items-start gap-2 ">
          <p className="text-[#27CDA5] text-3xl">{value}</p>
          <span>
            <p className="text-[#012970] text-lg">{rate}</p>
            <p className="text-zinc-400">{description}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashCard;
