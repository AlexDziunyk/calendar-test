import dayjs from "dayjs";
import { createContext, useState } from "react";

const CalendarContext = createContext({
  monthIndex: 0,
  setMonthIndex: (index) => { },
  showEventPopup: false,
  focusedDay: null,
  setFocusedDay: () => { },
  setShowEventPopup: () => { },
  events: [],
  setEvents: () => { },
  updateEvent: {},
  setUpdateEvent: () => { },
  calendarMode: "month",
  setCalendarMode: () => { },
  yearIndex: 2024,
  setYearIndex: () => { },
  showYearPopup: false,
  setShowYearPopup: () => { },
  weekIndex: 0,
  setWeekIndex: () => { }
})

const CalendarProvider = ({ children }) => {

  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [focusedDay, setFocusedDay] = useState(null);
  const [events, setEvents] = useState([]);
  const [updateEvent, setUpdateEvent] = useState({});
  const [calendarMode, setCalendarMode] = useState("month");
  const [yearIndex, setYearIndex] = useState(2024);
  const [showYearPopup, setShowYearPopup] = useState(false);
  const [weekIndex, setWeekIndex] = useState(dayjs());

  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        showEventPopup,
        setShowEventPopup,
        focusedDay,
        setFocusedDay,
        events,
        setEvents,
        updateEvent,
        setUpdateEvent,
        calendarMode,
        setCalendarMode,
        yearIndex,
        setYearIndex,
        showYearPopup,
        setShowYearPopup,
        weekIndex,
        setWeekIndex
      }}>
      {children}
    </CalendarContext.Provider>
  )
}

export { CalendarContext, CalendarProvider };