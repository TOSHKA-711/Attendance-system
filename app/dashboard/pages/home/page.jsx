"use client";
import Calendar from "@/app/items/Calendar";
import DashCard from "@/app/items/dashCard";
import DashLineChart from "@/app/items/LineChart";
import { useGetHomeReportMutation } from "@/app/Redux/features/usersApiSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DashHome = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [reportData, setReportData] = useState(null);

  // ✅ تاريخ اليوم
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // YYYY-MM-DD
  );

  const [getHomeReport] = useGetHomeReportMutation();

  useEffect(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getHomeReport({ date: selectedDate }).unwrap();
        setReportData(response);
        console.log("Fetched Report:", response);
      } catch (error) {
        console.error("Error fetching report", error);
      }
    };

    if (isRendered) {
      fetchReport();
    }
  }, [getHomeReport, selectedDate, isRendered]);

  if (!isRendered) return null;

  return (
    <div className="home pt-5 flex flex-row items-center gap-5">
      <div className="homeCards flex flex-col gap-5 w-4/5">
        <div className="flex flex-row items-start gap-5">
        <DashCard title="Present" value={reportData?.present ?? 0} />
          <DashCard title="Absent" value={reportData?.absent ?? 0} />
          <DashCard title="Attendance Rate" value={reportData?.showQttendanceRate ?? "0%"} />
        </div>
        <DashLineChart hourlyData={reportData?.data || {}} />
      </div>

      <div className="flex flex-col justify-between gap-3">
        {/* ✅ مرر التاريخ والدالة */}
        <Calendar value={selectedDate} onChange={setSelectedDate} />
        <Image
          src={"/dash.svg"}
          alt="dash"
          height={100}
          width={100}
          className="w-4/5"
        />
      </div>
    </div>
  );
};

export default DashHome;
