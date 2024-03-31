import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
import { doc, getFirestore, updateDoc, getDoc, setDoc, collection, getDocs, } from "firebase/firestore";
import { app } from '../../firebase/app';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CalendarContext } from '../../context/CalendarContext';
import CalendarPopup from '../../components/CalendarPopup/CalendarPopup';

const Invite = () => {

  const navigate = useNavigate();
  const { id, userId } = useParams();
  const db = getFirestore(app);
  const { user } = useContext(AuthContext)


  const handleSaveEvent = async (events) => {

    for (const event of events) {
      await setDoc(doc(db, "profiles", user.uid, "maps", id, "events", event.id), {
        title: event.title,
        description: event.description,
        date: event.focusedDay.format("DD-MM-YYYY"),
        type: event.type
      });
    }
  }

  const getEvents = async () => {
    const data = [];
    const docRef = collection(db, "profiles", userId, "maps", id, "events");
    getDocs(docRef)
      .then(snapshot => {
        // const data = [];
        snapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
      })

    handleSaveEvent(data);
  }

  const handleAcceptClick = async () => {

    // const docRef = doc(db, "profiles", userId, "maps", id);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    //   //getEvents();

    // } else {
    //   console.log("No such document!");
    // }
    navigate(`/calendar/${id}`);
  }


  const handleDeclineClick = () => {
    navigate("/")
  }

  return (
    <div className='invite'>
      <div className='invite__column'>
        <h1>Accept invitation?</h1>
        <div className='invite__buttons'>
          <button onClick={handleAcceptClick} className='invite__button_yes'>Yes</button>
          <button onClick={handleDeclineClick} className='invite__button_no'>No</button>
        </div>
      </div>
    </div>
  )
}

export default Invite