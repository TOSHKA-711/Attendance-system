"use client";
import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Avatar, Button, useMediaQuery } from "@mui/material";
import { CiSearch, CiFilter } from "react-icons/ci";
import { BiSort } from "react-icons/bi";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function StaffTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123456789",
      wallet: 50,
      image: "",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987654321",
      wallet: 75,
      image: "",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "555666777",
      wallet: 100,
      image: "",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      phone: "444333222",
      wallet: 25,
      image: "",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      phone: "111222333",
      wallet: 150,
      image: "",
    },
  ]);

  const isSmallScreen = useMediaQuery("(max-width:930px)");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(user.id).includes(searchTerm)
    );
  }, [searchTerm, users]);

  const visibleRows = useMemo(() => {
    return filteredUsers.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [page, rowsPerPage, filteredUsers]);

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleRowClick = ()=>{
    router.push("/dashboard/pages/staff/details");
  }

  return (
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
            <TableHead
              className={`table-head ${isSmallScreen && "hidden"}`}
              sx={{ marginBottom: "3rem" }}
            >
              <TableRow>
                <TableCell sx={{ color: "#000" }}>ID</TableCell>
                <TableCell sx={{ color: "#000" }}>Name</TableCell>
                <TableCell align="center" sx={{ color: "#000" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ color: "#000" }}>
                  Phone
                </TableCell>
                <TableCell align="center" sx={{ color: "#000" }}>
                  Wallet
                </TableCell>
                <TableCell align="center" sx={{ color: "#000" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={row.id} hover sx={{ cursor: "pointer" }} onClick={handleRowClick}>
                  <TableCell align="left" sx={{ color: "#000" }}>
                    {row.id}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: "#000",
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={row.image} />
                    {row.name}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000" }}>
                    {row.email}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000" }}>
                    {row.phone}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000" }}>
                    {row.wallet}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleEdit(row.id)}
                      sx={{ color: "#1976D2" }}
                    >
                      <MdEdit size={20} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(row.id)}
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
    </Box>
  );
}
