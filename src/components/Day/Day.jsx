import dayjs from 'dayjs';
import './style.css';
import { useContext, useEffect } from 'react';
import { CalendarContext } from '../../context/CalendarContext';
import CalendarEvent from '../Event/CalendarEvent';

const Day = ({ day, rowIdx }) => {

  const getCurrentDayStyle = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'day-today' : '';
  }

  const { setShowEventPopup, setFocusedDay, events, setEvents } = useContext(CalendarContext);

  return (
    <div onClick={() => {
      setShowEventPopup(true);
      setFocusedDay(day);
    }} className='day'>
      <div className='day-container'>
        {rowIdx === 0 && (
          <div className="day__value">{day.format("ddd").toUpperCase()}</div>
        )}
        <p className={`${getCurrentDayStyle()}`}>{day.format("DD")}</p>
        <div className='day__events'>
          {events.map(item => {
            if (item.date == day.format("DD-MM-YYYY")) {
              return <CalendarEvent key={item.id} title={item.title} description={item.description} type={item.type} date={item.date} eventId={item.id} />
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Day;