import { useContext, useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { CalendarContext } from '../../context/CalendarContext';
import dayjs from 'dayjs';
import { app } from '../../firebase/app';

import { doc, getFirestore, updateDoc, setDoc } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';

import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const CalendarPopup = () => {

  const { setShowEventPopup } = useContext(CalendarContext);
  const { user } = useContext(AuthContext)

  const [title, setTitle] = useState("")

  const navigate = useNavigate();

  const db = getFirestore(app);

  const createCalendar = async () => {
    if (title.trim().length == 0) {
      return;
    }
    const id = uuidv4();

    await setDoc(doc(db, "profiles", user.uid, "maps", id), {
      title: title,
    })


    setShowEventPopup(false);
    navigate(`/calendar/${id}`);
  }


  return (
    <div className='event-popup'>
      <div className='event-popup__form'>
        <header className='event-popup__header'>
          <p>Create new map</p>
          <IoMdClose cursor={"pointer"} onClick={() => setShowEventPopup(false)} />
        </header>
        <div className='event-popup__body'>
          <input onChange={(e) => setTitle(e.target.value)} value={title} className='event-popup__input' placeholder='Title'></input>
          <div className='event-popup__buttons'>
            <button onClick={createCalendar} className='event-popup__button__save'>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPopup;