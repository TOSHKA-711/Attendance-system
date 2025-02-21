"use client";
import React, { useMemo, useState } from "react";
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
import { MdDelete} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../Redux/Slices/dataUploadReducer";

export default function AttendanceTable() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newUser, setNewUser] = useState({
    ID: "",
    Name: "",
    Department: "",
    RecordedMaterials: "",
  });
  const users = useSelector((state) => state.dataUpload) || []; // Ensure it's always an array

  const isSmallScreen = useMediaQuery("(max-width:930px)");

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];

    return users.filter((user) => {
      const name = user?.Name?.toLowerCase() || "";
      const department = user?.Department?.toLowerCase() || "";
      const id = user?.ID ? String(user.ID) : "";

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

  // delete from table

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(remove(id));
    }
  };

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

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // add user
  const handleAddUser = () => {
    if (window.confirm("Are you sure you want to Add this user?")) {
      dispatch(add(newUser));
    }
  };

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
                    Recorded Materials
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000" }}>
                    Department
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row, index) => (
                  <TableRow key={row.ID} hover sx={{ cursor: "pointer" }}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "#000" }}
                    >
                      {row.ID}
                    </TableCell>
                    <TableCell align="left" sx={{ color: "#000" }}>
                      {row.Name}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#000" }}>
                      {row.RecordedMaterials}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#000" }}>
                      {row.Department}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleDelete(row.ID)}
                        sx={{ color: "#D32F2F" }}
                      >
                        <MdDelete size={20} />
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
        <div className="add bg-[#27CDA55C] flex flex-row items-center justify-between border-black border-2 mb-4">
          <input
            name="ID"
            value={newUser.ID || ""}
            onChange={handleInputChange}
            type="text"
            placeholder="Id"
            className="bg-[#27CDA55C] py-3 px-2 w-1/5 outline-none border-black border-l-2"
          />
          <input
            name="Name"
            value={newUser.Name || ""}
            onChange={handleInputChange}
            type="text"
            placeholder="Name"
            className="bg-[#27CDA55C] py-3 px-2 w-1/5 outline-none border-black border-l-2"
          />
          <input
            name="RecordedMaterials"
            value={newUser.RecordedMaterials || ""}
            onChange={handleInputChange}
            type="text"
            placeholder="Recorded Materials"
            className="bg-[#27CDA55C] py-3 px-2 w-1/5 outline-none border-black border-l-2"
          />
          <input
            name="Department"
            value={newUser.Department || ""}
            onChange={handleInputChange}
            type="text"
            placeholder="Department"
            className="bg-[#27CDA55C] py-3 px-2 w-1/5 outline-none border-black border-l-2"
          />

          <Button
            onClick={() => dispatch(add(newUser))}
            sx={{
              color: "#000",
              borderLeft: "2px solid black",
              borderRadius: "0px !important",
            }}
            className="w-1/5 border-black border-l-2"
          >
            <IoMdPersonAdd size={20} />
            Add
          </Button>
        </div>
      </Box>
      <button
        onClick={handleAddUser}
        className="export flex flex-row items-center gap-2 bg-[#FDD05B] text-black py-2 px-3 rounded-lg mb-3"
      >
        Save Excel File
      </button>
    </>
  );
}
