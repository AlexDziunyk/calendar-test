import dayjs from "dayjs";
import { useContext } from 'react';
import { CalendarContext } from '../../context/CalendarContext';

const MonthView = ({ month, year }) => {

  function getMonth(month = dayjs().month(), year = dayjs().year()) {
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const daysMatrix = new Array(5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return dayjs(new Date(year, month, currentMonthCount));
      });
    });
    return daysMatrix;
  }

  const daysMatrix = getMonth(month, year);
  const currentMonth = dayjs(new Date(year, month)).month();

  const { events, setEvents, setShowYearPopup, setFocusedDay } = useContext(CalendarContext);

  const getEventForDay = async (day) => {
    console.log(events)
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h3>{dayjs(new Date(year, month)).format('MMMM')}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {daysMatrix.flat().map((day, i) => {
          const dayMonth = day.month();
          return (
            <div
              key={i}
              onClick={
                () => {
                  setShowYearPopup(true);
                  setFocusedDay(day);
                }
              }
              style={{
                cursor: 'pointer',
                padding: '5px',
                textAlign: 'center',
                border: '1px solid #eee',
                backgroundColor: events.some(item => item.date === day.format("DD-MM-YYYY")) ? 'red' : 'white',
                visibility: dayMonth === currentMonth ? 'visible' : 'hidden',
              }}
            >
              {day.format('D')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
