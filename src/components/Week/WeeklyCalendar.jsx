import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import './style.css';
import { CalendarContext } from '../../context/CalendarContext';
import CalendarEvent from '../Event/CalendarEvent';

const WeeklyCalendar = () => {

  function getWeek(date = dayjs()) {
    let weekStart = date.startOf('week');

    const days = new Array(7).fill(null).map((_, index) => {
      return weekStart.add(index, 'day');
    });

    return days;
  }

  const { setShowEventPopup, setFocusedDay, events, setEvents, weekIndex, setWeekIndex } = useContext(CalendarContext);

  const weekDays = getWeek(weekIndex);


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
        {weekDays.map((day, index) => (
          <div
            key={index}
            onClick={() => {
              setShowEventPopup(true);
              setFocusedDay(day);
            }}
            className='week-day'>
            <div>{day.format('ddd')}</div>
            <div>{day.format('D')}</div>
            {events.map(item => {
              if (item.date == day.format("DD-MM-YYYY")) {
                return <CalendarEvent key={item.id} title={item.title} description={item.description} type={item.type} date={item.date} eventId={item.id} />
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
