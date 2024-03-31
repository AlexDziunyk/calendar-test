import { useContext } from 'react';
import './style.css';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { CalendarContext } from '../../context/CalendarContext';
import { getMonth } from '../../utils/util';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';



const CalendarHeader = () => {

  const { monthIndex, setMonthIndex, calendarMode, setCalendarMode, setYearIndex, yearIndex, weekIndex, setWeekIndex } = useContext(CalendarContext);
  const { signOut } = useContext(AuthContext)
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext)

  const handlePrevMonth = () => {
    setMonthIndex(prev => prev - 1);
  }

  const handleNextMonth = () => {
    setMonthIndex(prev => prev + 1);
  }

  const handlePrevYear = () => {
    setYearIndex(prev => prev - 1);
  }

  const handleNextYear = () => {
    setYearIndex(prev => prev + 1);
  }

  const handleCurrentMonth = () => {
    setMonthIndex(dayjs().month());
    setWeekIndex(dayjs());
    setYearIndex(2024);
  }

  const handlePreviousWeek = () => {
    setWeekIndex(weekIndex.subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setWeekIndex(weekIndex.add(1, 'week'));
  };

  const handleSignOut = async () => {
    signOut();
    navigate('/login')
  }

  const handleGoToMainPAge = async () => {
    navigate('/')
  }

  const handleShareButton = async () => {
    await navigator.clipboard.writeText(`http://localhost:5173/invite/${user.uid}/${id}`);
    toast.success('Successfully copied link to clipboard!');
  }

  return (
    <header className='calendar-header'>
      <div className='calendar-header__panel'>
        <h1 className='calendar-header__title'>Calendar</h1>
        <button onClick={handleCurrentMonth} className='calendar-header__today'>
          Today
        </button>
        {calendarMode === "year" && <div className='calendar-header__buttons'>
          <button onClick={handlePrevYear} className="calendar-header__button">
            <FaChevronLeft />
          </button>
          <button onClick={handleNextYear} className="calendar-header__button">
            <FaChevronRight />
          </button>
        </div>}
        {calendarMode === "month" && <div className='calendar-header__buttons'>
          <button onClick={handlePrevMonth} className="calendar-header__button">
            <FaChevronLeft />
          </button>
          <button onClick={handleNextMonth} className="calendar-header__button">
            <FaChevronRight />
          </button>
        </div>}
        {calendarMode === "week" && <div className='calendar-header__buttons'>
          <button onClick={handlePreviousWeek} className="calendar-header__button">
            <FaChevronLeft />
          </button>
          <button onClick={handleNextWeek} className="calendar-header__button">
            <FaChevronRight />
          </button>
        </div>}

        {calendarMode === "year" && <h1 className='calendar-header__date'>
          {yearIndex}
        </h1>}
        {calendarMode === "month" && <h1 className='calendar-header__date'>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h1>}
        {calendarMode === "week" && <h1 className='calendar-header__date'>
          {dayjs(new Date(weekIndex.year(), weekIndex.month())).format("MMMM YYYY")}
        </h1>}


        <button onClick={() => setCalendarMode("year")} className='calendar-header__today'>
          Year
        </button>
        <button onClick={() => setCalendarMode("month")} className='calendar-header__today'>
          Month
        </button>
        <button onClick={() => setCalendarMode("week")} className='calendar-header__today'>
          Week
        </button>
      </div>
      <div className='calendar-header__panel2'>
        <button onClick={handleShareButton} className='calendar-header__today'>
          Share
        </button>
        <button className='calendar-header__main-page' onClick={handleGoToMainPAge}>
          Go to main page
        </button>
        <button className='calendar-header__signout' onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </header>
  )
}

export default CalendarHeader