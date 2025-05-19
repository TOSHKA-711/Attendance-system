"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function Calendar({ value, onChange }) {
  if (!value) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={dayjs(value)}
        onChange={(newValue) => {
          if (newValue) {
            // نحول التاريخ لـ YYYY-MM-DD ونمرره للأب
            onChange(newValue.format("YYYY-MM-DD"));
          }
        }}
        sx={{
          background: "#F5F5F5",
          boxShadow: "0px 0px 11px 1px #67C587",
          "& .MuiTypography-root": { color: "#000" },
          "& .MuiButtonBase-root": { color: "#fff", backgroundColor: "#fff" },
          "& .MuiPickersDay-root": { color: "#000" },
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#27CDA5 !important",
            color: "#000 !important",
          },
          "& .MuiOutlinedInput-root": { color: "#000" },
          "& .MuiSvgIcon-root": { color: "#000" },
          "& .MuiPickersCalendarHeader-root .MuiTypography-root": {
            color: "#000",
          },
          "& .MuiPickersCalendarHeader-root": {
            borderBottom: "2px solid #fff",
            marginBottom: "1rem",
          },
        }}
      />
    </LocalizationProvider>
  );
}
