import { useContext, useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { CalendarContext } from '../../context/CalendarContext';
import './style.css';
import CalendarEvent from '../Event/CalendarEvent';

const YearEventsPopup = () => {

  const { setShowYearPopup, events, focusedDay, setShowEventPopup } = useContext(CalendarContext);


  const [eventsForDay, setEventsForDay] = useState([]);

  useEffect(() => {
    const tempArr = events.filter(item => {
      if (item.date == focusedDay.format("DD-MM-YYYY")) {
        return true;
      }
    })
    setEventsForDay(tempArr);
  }, []);

  return (
    <div className='event-popup'>
      <div className='event-popup__form'>
        <header className='event-popup__header'>
          <p>Events</p>
          <IoMdClose cursor={"pointer"} onClick={() => setShowYearPopup(false)} />
        </header>
        <div className='event-popup__body'>
          <div className='events-column'>
            {eventsForDay.map(item => {
              return <CalendarEvent
                key={item.id}
                title={item.title}
                description={item.description}
                type={item.type}
                date={item.date}
                eventId={item.id}
              />
            })}
            {eventsForDay.length === 0 && <p>No events yet</p>}
          </div>
          <button onClick={() => {
            setShowYearPopup(false);
            setShowEventPopup(true);
          }} className='event-popup__button__save'>Create new events</button>
        </div>
      </div>
    </div>
  )
}

export default YearEventsPopup