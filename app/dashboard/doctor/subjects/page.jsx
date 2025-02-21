import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DoctorSubjects = () => {
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
         
        </div>
        <div className="view  w-[40rem] flex flex-col items-start gap-2 mt-7 self-center ">
            <p>View Materials</p>
            <div
              className="materials w-full min-h-fit bg-[#F6F6F6] rounded-lg flex flex-row flex-wrap justify-start gap-5 items-start p-4 "
              style={{
                boxShadow: "-2px 2px 8px 0px rgba(116,116,116,0.75)",
                border: "1px solid",
              }}
            >
              <p className="bg-white rounded-lg py-2 px-4 cursor-pointer border-2 border-[#2F897D]">
                Compiler Desgin
              </p>
              <p className="bg-white rounded-lg py-2 px-4 cursor-pointer border-2 border-[#2F897D]">
                Computer Security
              </p>
            </div>
          </div>
          <Link className="bg-[#FDD05B] w-fit p-2 text-2xl self-center mt-3  " href={"#"}>continue</Link>
        <Image
          src={"/dash.svg"}
          alt="dash"
          height={100}
          width={100}
          className="w-4/5 absolute bottom-0 right-0 w-[20rem] -z-10"
        />
      </>
    );
}

export default DoctorSubjects;
