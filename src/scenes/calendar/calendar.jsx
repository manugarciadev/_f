import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Header from "../../components/Header";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";

const Calendar = () => {
  const theme = useTheme();
  const colors = theme.palette.mode;

  const events = [
    {
      id: "1",
      title: "2 Day Package",
      start: "2023-10-01",
      end: "2023-10-03",
      allDay: true,
    }, {
      id: "2",
      title: "4 Day Package",
      start: "2023-10-03",
      end: "2023-10-07",
      allDay: true,
    },
    {
      id: "3",
      title: "6 Day Package",
      start: "2023-10-05",
      end: "2023-10-11",
      allDay: true,
    },
    {
      id: "4",
      title: "Event 3",
      start: "2023-11-05T09:00:00",
      end: "2023-11-05T12:00:00",
      allDay: false,
    },
    // Adicione outros eventos aqui
  ];

  return (
    <Box m="20px">
      <Header title="CALENDAR 🗓️" subtitle="Daily Departures; Track all the daily tours."/>

      <Box flex="1 1 100%" ml="15px">
        <FullCalendar
          height="75vh"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView="dayGridMonth"
          events={events}
        />
      </Box>
    </Box>
  );
};

export default Calendar;
