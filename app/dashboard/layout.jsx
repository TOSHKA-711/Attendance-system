import React from "react";
import Navbar from "../components/navBar";
import Sidebar from "../components/sideBar";
import DashboardPath from "../items/dashboardPath";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row ">
        <Sidebar />
        <div className="flex flex-col gap-3 w-full pt-[7rem] px-5">
          <DashboardPath/>
          {children}</div>
      </div>
    </div>
  );
};

export default Layout;
