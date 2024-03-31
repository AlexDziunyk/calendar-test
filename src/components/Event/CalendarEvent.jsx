import './style.css';
import { useContext, useEffect } from 'react';
import { CalendarContext } from '../../context/CalendarContext';

const CalendarEvent = ({ eventId, title, description, type }) => {

  const { setShowEventPopup, setUpdateEvent, setShowYearPopup } = useContext(CalendarContext);

  const handleEventClick = () => {
    setShowEventPopup(true);
    setShowYearPopup(false);
    setUpdateEvent({
      eventId: eventId,
      title: title,
      description: description,
      type: type,
    });
  }

  return (
    <div onClick={handleEventClick} className={`event__${type} event`}>
      {title}
    </div>
  )
}

export default CalendarEvent;