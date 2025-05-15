"use client";
import React, { useMemo, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Button,
  useMediaQuery,
} from "@mui/material";
import { CiSearch, CiFilter } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { BiSort } from "react-icons/bi";
import { IoPersonAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddStudentAttendanceMutation,
  useGetAllAttendancesQuery,
} from "../Redux/features/attendanceApiSlice";

export default function AttendanceTable() {
  const [isRendered, setIsRendered] = useState(false);
  const sessionId = useSelector((state) => state.selectedCourse.sessionId);
  const lecturerRole = useSelector((state) => state.userRole.isInstructor);
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("token")?.replace(/"/g, "")
      : null;
  console.log("isInstructor=>>>>>", lecturerRole);
  console.log("token=>>>>>", token);
  const [storedCourse, setStoredCourse] = useState({});
  useEffect(() => {
    setIsRendered(true);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const course = JSON.parse(localStorage.getItem("selectedCourse") || "{}");
      setStoredCourse(course);
    }
  }, []);
  const courseId = storedCourse._id;
  const { data, error, isLoading, refetch } = useGetAllAttendancesQuery(
    courseId,
    {
      skip: !courseId,
    }
  );
  const [addStudentAttendance, { isLoading: isLoadingAdding }] =
    useAddStudentAttendanceMutation();

  console.log(data?.students);
  // console.log("Fetched Data:", data);

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newUser, setNewUser] = useState({
    student: "",
    sessionID: courseId,
    attendanceStatus: "",
  });
  const users = data?.students || [];

  const isSmallScreen = useMediaQuery("(max-width:930px)");

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];

    return users.filter((user) => {
      const name = user?.student.name?.toLowerCase() || "";
      const department = user?.courseId?.courseName.toLowerCase() || "";
      const id = user?.student._id ? String(user?.student._id) : "";

      return (
        name.includes(searchTerm.toLowerCase()) ||
        department.includes(searchTerm.toLowerCase()) ||
        id.includes(searchTerm)
      );
    });
  }, [searchTerm, users]);

  const visibleRows = useMemo(() => {
    return filteredUsers.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [page, rowsPerPage, filteredUsers]);

  // save file

  const handleExportToExcel = () => {
    if (users.length === 0) {
      alert("No data to export!");
      return;
    }

    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(users);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "UsersData");

    // Write the file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save the file
    saveAs(data, "UsersData.xlsx");
  };

  // handle input change

  // add user attendance
  const handleAddUserAttendance = async (row) => {
    if (window.confirm("Are you sure you want to add this user?")) {
      try {
        const newAttendance = {
          student: row.student?._id,
          sessionID: sessionId,
          attendanceStatus: "present",
          sessionType: lecturerRole === "instructor" ? "lecture" : "section",
        };

        console.log("New Attendance Payload:", newAttendance);
        console.log("Course ID being sent:", storedCourse);

        const response = await addStudentAttendance({
          courseId: storedCourse, // Ensure this is a valid string ID
          newUser: newAttendance,
        });

        console.log("Attendance Added Response:", response);
        window.alert(response?.data?.message);
        refetch();
      } catch (err) {
        console.error("Failed to add attendance:", err);
      }
    }
  };

  // handle fetch students
  
  if (!isRendered) return null;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching attendance data</p>;

  return (
    <>
      <Box sx={{ width: "100%", position: "relative" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            backgroundColor: "#FDD05B57",
            color: "#000",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <Toolbar>
            <Typography sx={{ flex: "1 1 100%", color: "#000" }} variant="h6">
              <div className="table-header flex flex-row justify-between w-full">
                <div className="search flex flex-row items-center bg-white px-2 py-1 gap-2 rounded-lg">
                  <CiSearch className="icon" />
                  <input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 outline-none "
                  />
                </div>
                <div className="btns flex flex-row items-center gap-3">
                  <button className="filter flex flex-row items-center gap-2 bg-[#67C587] text-white py-2 px-3 rounded-lg">
                    <CiFilter className="icon" />
                    <span>Filter</span>
                  </button>
                  <button className="sort flex flex-row items-center gap-2 bg-[#67C587] text-white py-2 px-3 rounded-lg">
                    <BiSort className="icon" />
                    <span>Sort</span>
                  </button>
                </div>
              </div>
            </Typography>
          </Toolbar>

          <TableContainer>
            <Table
              sx={{ minWidth: 750, color: "#000" }}
              aria-labelledby="tableTitle"
            >
              <TableHead className={`table-head ${isSmallScreen && "hidden"}`}>
                <TableRow>
                  <TableCell sx={{ color: "#000" }}>Student ID</TableCell>
                  <TableCell sx={{ color: "#000" }}>Name</TableCell>
                  <TableCell align="center" sx={{ color: "#000" }}>
                    Department
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000" }}>
                    Attendance
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows
                  .filter((row) => row.student)
                  .map((row) => (
                    <TableRow
                      key={row._id || row.student._id}
                      hover
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "#000" }}
                      >
                        {row.student.studentID}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#000" }}>
                        {row.student.name}
                      </TableCell>
                      {/* <TableCell align="center" sx={{ color: "#000" }}>
                        {row.student?.courses?.courseName}
                      </TableCell> */}
                      <TableCell align="center" sx={{ color: "#000" }}>
                        {row.student?.department}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#000" }}>
                        {row.studentAttendanc}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleAddUserAttendance(row)}
                          sx={{ color: "#D32F2F" }}
                          disabled={isLoadingAdding}
                        >
                          <IoPersonAddSharp
                            className="text-green-500"
                            size={20}
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) =>
              setRowsPerPage(parseInt(e.target.value, 10))
            }
            sx={{
              color: "#000",
              "& .MuiSelect-icon": { color: "#000" },
              "& .MuiTablePagination-actions button": { color: "#000" },
            }}
          />
        </Paper>
      </Box>
      <button
        onClick={handleExportToExcel}
        className="export flex flex-row items-center gap-2 bg-[#FDD05B] text-black py-2 px-3 rounded-lg mb-3"
      >
        Save Excel File
      </button>
    </>
  );
}
