"use client";
import React, { useEffect, useState, useCallback } from "react";
import { FaRegAddressCard, FaUserEdit, FaQrcode } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import {
  useCreateSessionMutation,
  useGetQrCodeMutation,
} from "@/app/Redux/features/sessionApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSessionId } from "@/app/Redux/Slices/selectedCourseSlice";

const Page = () => {
  const selectedCourse = useSelector((state) => state.selectedCourse.course);
  const sessionId = useSelector((state) => state.selectedCourse.sessionId);
  const [createSession] = useCreateSessionMutation();
  const [getQrCode] = useGetQrCodeMutation();
  const [qrCode, setQrCode] = useState("");
  const [changeTime, setChangeTime] = useState({
    changeSpeed: 7,
    timeWorking: 30,
  });
  const dispatch = useDispatch();

  // Create session
  const handleCreateSession = async () => {
    try {
      const response = await createSession({
        course: selectedCourse?._id || "67b8f87450147de33624ea4d",
        changeSpeed: changeTime.changeSpeed,
        timeWorking: changeTime.timeWorking,
      }).unwrap();
      dispatch(setSessionId(response.sessionId));
      setQrCode(response.qrCode);
      console.log(response);
    } catch (err) {
      console.error("Failed to create session:", err);
    }
  };
  
  console.log(sessionId);
  // Fetch QR code
  const fetchQrCode = useCallback(async () => {
    if (!sessionId) return;
    try {
      const response = await getQrCode(sessionId).unwrap();
      setQrCode(response.qrCode);
    } catch (err) {
      console.error("Failed to get QR code", err);
    }
  }, [getQrCode, sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    const interval = setInterval(fetchQrCode, changeTime.changeSpeed * 1000);

    return () => clearInterval(interval);
  }, [fetchQrCode]);

  // Handle input change
  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setChangeTime((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="takeAttendance mt-7 flex flex-col items-center gap-10 w-full pb-8">
      <div className="actions w-full flex flex-row items-center justify-evenly">
        <Link
          className="bg-[#FDD05B] py-3 px-5 font-inder text-lg flex gap-3 items-center"
          href="#"
        >
          <FaRegAddressCard /> Show Students
        </Link>
        <Link
          className="bg-[#FDD05B] py-3 px-5 font-inder text-lg flex gap-3 items-center"
          href="/dashboard/doctor/manualAttendance"
        >
          <FaUserEdit /> Manual Attendance
        </Link>
        <button
          className="bg-[#FDD05B] py-3 px-5 font-inder text-lg flex gap-3 items-center"
          onClick={handleCreateSession}
        >
          <FaQrcode /> Generate QR Code
        </button>
      </div>

      <div className="setQR w-[40rem] flex flex-col items-start gap-2">
        <p>Adjust QR code settings</p>
        <div
          className="materials w-full bg-[#FEEFC7] rounded-lg flex items-center justify-between gap-5 p-4"
          style={{
            boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
            border: "1px solid",
          }}
        >
          <span className="p-2 flex flex-col items-start gap-2">
            <p>Course Speed (seconds)</p>
            <input
              type="number"
              className="bg-white max-w-28 rounded-lg py-2 px-2 border-2 border-[#2F897D]"
              name="changeSpeed"
              value={changeTime.changeSpeed}
              onChange={handleInputsChange}
            />
          </span>
          <span className="p-2 flex flex-col items-start gap-2">
            <p>Time Working (minutes)</p>
            <input
              type="number"
              className="bg-white max-w-28 rounded-lg py-2 px-2 border-2 border-[#2F897D]"
              name="timeWorking"
              value={changeTime.timeWorking}
              onChange={handleInputsChange}
            />
          </span>
          <button
            className="bg-[#FDD05B] py-3 px-5 font-inder text-lg flex gap-3 items-center"
            onClick={handleCreateSession}
          >
            <FaQrcode /> Generate
          </button>
        </div>
      </div>

      <div
        className="materials w-4/5 min-h-80 bg-[#F6F6F6] rounded-lg flex justify-center items-center p-4"
        style={{
          boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
          border: "1px solid",
        }}
      >
        {qrCode && (
          <Image
            src={qrCode}
            alt="QR Code"
            className="w-82 h-82"
            width={300}
            height={300}
          />
        )}
      </div>

      <Image
        src="/dash.svg"
        alt="dash"
        width={100}
        height={100}
        className="absolute bottom-0 right-0 w-[20rem] -z-10"
      />
    </div>
  );
};

export default Page;
