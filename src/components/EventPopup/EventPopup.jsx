import { useContext, useEffect, useState } from 'react';
import './style.css';
import { IoMdClose } from "react-icons/io";
import { CalendarContext } from '../../context/CalendarContext';
import dayjs from 'dayjs';
import { app } from '../../firebase/app';

import { doc, getFirestore, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';

import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

import { FaCheck } from "react-icons/fa6";

const EventPopup = () => {

  const { setShowEventPopup, focusedDay, updateEvent, setUpdateEvent, setEvents } = useContext(CalendarContext);
  const { user } = useContext(AuthContext)

  const [title, setTitle] = useState(updateEvent.title ?? "");
  const [description, setDescription] = useState(updateEvent.description ?? "");
  const [type, setType] = useState(updateEvent.type ?? null);

  const { id } = useParams();

  const db = getFirestore(app);

  const handleSaveEvent = async () => {
    if (title.trim().length == 0 || description.trim().length == 0 || type == null) {
      return;
    }

    const eventId = updateEvent.eventId ?? uuidv4();

    await setDoc(doc(db, "profiles", user.uid, "maps", id, "events", eventId), {
      title: title,
      description: description,
      date: focusedDay.format("DD-MM-YYYY"),
      type: type
    });
    setEvents(prev => prev.filter(item => item.id !== updateEvent.eventId))
    setEvents(prev => [
      {
        id: eventId,
        title: title,
        description: description,
        date: focusedDay.format("DD-MM-YYYY"),
        type: type
      },
      ...prev,
    ])
    setUpdateEvent({});
    setShowEventPopup(false);
  }


  const handleCloseEvent = () => {
    setUpdateEvent({});
    setShowEventPopup(false)
  }

  const handleDeleteEvent = async () => {
    await deleteDoc(doc(db, "profiles", user.uid, "maps", id, "events", updateEvent.eventId));
    setEvents(prev => prev.filter(item => item.id !== updateEvent.eventId))
    setUpdateEvent({});
    setShowEventPopup(false)
  }

  return (
    <div className='event-popup'>
      <div className='event-popup__form'>
        <header className='event-popup__header'>
          <p>{updateEvent.title ? "Update event" : "Create new event"}</p>
          <IoMdClose cursor={"pointer"} onClick={handleCloseEvent} />
        </header>
        <div className='event-popup__body'>
          <input onChange={(e) => setTitle(e.target.value)} value={title} className='event-popup__input' placeholder='Title'></input>
          <div className='event-popup__date'>{focusedDay.format("dddd, MMMM DD, YYYY")}</div>
          <input onChange={(e) => setDescription(e.target.value)} value={description} className='event-popup__input' placeholder='Description'></input>
          <div className="event-popup__types">
            <div onClick={() => setType("arrangement")} className='event-popup__arrangement'>
              Arrangement
              {type === "arrangement" && <FaCheck />}
            </div>
            <div onClick={() => setType("reminder")} className='event-popup__reminder'>
              Reminder
              {type === "reminder" && <FaCheck />}
            </div>
            <div onClick={() => setType("task")} className='event-popup__task'>
              Task
              {type === "task" && <FaCheck />}
            </div>
          </div>
          <div className='event-popup__buttons'>
            {updateEvent.title && <button onClick={handleDeleteEvent} className='event-popup__delete'>Delete</button>}
            <button onClick={handleSaveEvent} className='event-popup__button__save'>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPopup