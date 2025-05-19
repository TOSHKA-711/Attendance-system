"use client";
import { useAddStudentsSheetMutation } from "@/app/Redux/features/attendanceApiSlice";
import { setData } from "@/app/Redux/Slices/dataUploadReducer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";

const DocumentUpload = () => {
  const [isRendered, setIsRendered] = useState(false);
  const fileInputRef = useRef(null);
  const uploadedData = useSelector((state) => state.dataUpload);
  const [addStudentsSheet] = useAddStudentsSheetMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const handleUploadClick = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Convert first sheet to JSON
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      dispatch(setData(jsonData)); // Store in Redux
    };

    reader.readAsBinaryString(file);
  };


  const handleFileSave=async()=>{
    try {
      const response = await addStudentsSheet(uploadedData).unwrap();
      window.alert("Done!");
      console.log("Response:", response);
    } catch (error) {
      window.alert("Failed to upload");
      console.error("Error:", error);
    }
    console.log(uploadedData);
  }

  useEffect(() => {
    console.log("Uploaded Data:", uploadedData);
  }, [uploadedData]);

  if (!isRendered) {
    return null;
  }

  return (
    <>
      <div className="w-full justify-center flex flex-col gap-10 items-center relative">
        <div
          className="levels w-[40rem] py-2 px-3 bg-[#FEEFC7] p-2 rounded-lg flex flex-row gap-3 flex-wrap justify-between items-center "
          style={{
            boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
            border: "1px solid",
          }}
        >
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
            Level 1
          </p>
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
            Level 2
          </p>
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
            Level 3
          </p>
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
            Level 4
          </p>
        </div>
        <div
          className="levels w-[35rem] py-2 px-3 bg-[#FEEFC7] p-2 rounded-lg flex flex-row flex-wrap justify-evenly items-center "
          style={{
            boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
            border: "1px solid",
          }}
        >
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">CS</p>
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">IS</p>
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">AI</p>
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">BIO</p>
        </div>
        <div
          className="levels w-[25rem] py-2 px-3 bg-[#FEEFC7] p-2 rounded-lg flex flex-row flex-wrap justify-evenly items-center "
          style={{
            boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
            border: "1px solid",
          }}
        >
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
            Semester 1
          </p>
          <p className="bg-white rounded-lg py-2 px-4 cursor-pointer">
            Semester 2
          </p>
        </div>
        <div className="btns w-fit bottom-0 flex flex-row items-center justify-between gap-60 mt-9 ">
          {uploadedData.length >= 1 && (
            <>
              <Link
                href="/dashboard/pages/document/edit"
                className="  z-10 bg-[#FDD05B] text-black font-gugi border-none px-[25px] py-[10px] cursor-pointer outline-none"
              >
                Edit Excel Sheet
              </Link>
              <button onClick={handleFileSave} className="  z-10 bg-[#FDD05B] text-black font-gugi border-none px-[25px] py-[10px] cursor-pointer outline-none">
                Send Excel Sheet
              </button>
            </>
          )}
          <Link
            href="#"
            onClick={handleUploadClick}
            className="z-10 bg-[#FDD05B] text-black font-gugi border-none px-[25px] py-[10px] cursor-pointer outline-none"
          >
            Upload Excel Sheet
          </Link>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
            className="hidden"
          />
        </div>
      </div>
      <Image
        src={"/dash.svg"}
        alt="dash"
        height={100}
        width={100}
        className="w-4/5 absolute bottom-0 right-0 w-[20rem]"
      />
    </>
  );
};

export default DocumentUpload;
