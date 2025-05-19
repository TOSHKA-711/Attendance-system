"use client";

import React, { useState, forwardRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Avatar,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCoursesQuery } from "../Redux/features/coursesApiSlice";

// Transition for dialog
const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
Transition.displayName = "Transition";

// تحويل البيانات عشان DataGrid

export default function SelectCourseDialog({ addCourse }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data } = useGetCoursesQuery();
  const rows = data?.data.map((course) => ({
    id: course._id, // لازم تكون id مش _id
    courseName: course.courseName,
    courseCode: course.courseCode,
    department: course.department,
    semester: course.semester,
    level: course.level,
  }));
  const columns = [
    { field: "courseCode", headerName: "Course Code", width: 120 },
    { field: "courseName", headerName: "Course Name", width: 200 },
    { field: "department", headerName: "Department", width: 120 },
    //   { field: "semester", headerName: "Semester", width: 100 },
    //   { field: "level", headerName: "Level", width: 100 },
  ];
  return (
    <>
      <Button onClick={handleOpen} sx={{ fontSize: "20px" }}>
        add Course
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        disableEnforceFocus
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth={false}
        sx={{
          "& .MuiPaper-root": {
            // margin: "15px",
            maxWidth: 600,
            width: 600,
            minWidth: 600,
          },
          "& .MuiDialogContent-root": { padding: "20px 0px" },
        }}
      >
        <DialogContent className="bg-[#363636] text-white">
          <Paper
            sx={{
              direction: "ltr", // ضبط الاتجاه للجدول
              height: "auto",
              width: "100%",
              maxWidth: "100%",
              marginBottom: "3rem",
              "& .MuiToolbar-root": { direction: "ltr" },
              "& .MuiDataGrid-row--borderBottom": { gap: "2rem" },
              "& .MuiDataGrid-row": { gap: "2rem" },
              "& .MuiDataGrid-columnHeaders": {
                background: "white",
                padding: "12px 0",
              },
            }}
          >
            <Box sx={{ overflowX: "auto" }}>
              <Box sx={{ minWidth: 300 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                  }}
                  pageSizeOptions={[10]}
                  onCellClick={(params) => {
                    addCourse(params.id);
                    handleClose();
                  }}
                  sx={{
                    border: 0,
                    "& .MuiDataGrid-cell": {
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontSize: "14px",
                      fontFamily: "Tajawal",
                      fontWeight: "bold",
                    },
                    "& .MuiDataGrid-cell.MuiDataGrid-cell": {
                      fontSize: "15px",
                      fontFamily: "Tajawal",
                      fontWeight: 500,
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </DialogContent>

        <DialogActions className="bg-[#363636] text-white">
          <Button onClick={handleClose} sx={{ color: "#D4D4D4" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
