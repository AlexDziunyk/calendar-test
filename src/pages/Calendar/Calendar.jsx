import { getAuth, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { app } from "../../firebase/app";
import { useContext, useEffect, useState } from 'react';
import googleIcon from '../../assets/googleIcon.webp'
import { useNavigate, useParams } from "react-router-dom";
import Month from '../../components/Month/Month';
import dayjs from 'dayjs';
import CalendarHeader from '../../components/CalendarHeader/CalendarHeader';
import './style.css';
import { CalendarContext } from '../../context/CalendarContext';
import { getMonth, getWeek } from '../../utils/util';
import EventPopup from '../../components/EventPopup/EventPopup';
import { AuthContext } from '../../context/AuthContext';

import { doc, getFirestore, collection, getDocs } from "firebase/firestore";
import Day from '../../components/Day/Day';
import YearCalendars from '../../components/Year/YearCalendars';
import WeeklyCalendar from '../../components/Week/WeeklyCalendar';
import YearEventsPopup from '../../components/YearEventsPopup/YearEventsPopup';


const Calendar = () => {

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventPopup, setEvents, calendarMode, showYearPopup } = useContext(CalendarContext);
  const { user, signIn } = useContext(AuthContext);
  // const [events, setEvents] = useState();

  const { id } = useParams();
  const db = getFirestore(app);

  const getEvents = async () => {
    const uid = localStorage.getItem('authToken');

    const docRef = collection(db, "profiles", uid, "maps", id, "events");
    getDocs(docRef)
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        console.log(data)
        setEvents(data);
      })
  }

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    getEvents();
  }, []);


  return (
    <div className='calendar'>
      {showEventPopup && <EventPopup />}
      {showYearPopup && <YearEventsPopup />}
      <CalendarHeader />
      <div className='calendar-main'>
        {calendarMode == "month" && <Month month={getMonth(monthIndex)} />}
        {calendarMode == "year" && <YearCalendars />}
        {calendarMode == "week" && <WeeklyCalendar />}
      </div>
    </div>
  )
}

export default Calendar