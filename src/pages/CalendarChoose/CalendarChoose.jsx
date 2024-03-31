import CalendarChooseItem from '../../components/CalendarChooseItem/CalendarChooseItem';
import './style.css';
import { IoIosAdd } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';
import { doc, getFirestore, updateDoc, getDoc, setDoc, collection, getDocs, } from "firebase/firestore";
import { app } from '../../firebase/app';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CalendarContext } from '../../context/CalendarContext';
import CalendarPopup from '../../components/CalendarPopup/CalendarPopup';

const CalendarChoose = () => {

  const navigate = useNavigate();

  const { user } = useContext(AuthContext)



  const { setShowEventPopup, showEventPopup } = useContext(CalendarContext);
  const [calendars, setCalendars] = useState([]);


  const db = getFirestore(app);

  const getMyCalendars = async () => {
    const uid = localStorage.getItem('authToken');

    const docRef = collection(db, "profiles", uid, "maps");
    getDocs(docRef)
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setCalendars(data);
      })


  }

  const navigateToCalendar = (id) => {
    navigate(`/calendar/${id}`);
  }

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }

    getMyCalendars();
  }, []);

  return (
    <>
      {showEventPopup && <CalendarPopup />}
      <div className='calendar-choose'>
        <div className='calendar-choose__title'>Create or choose your calendar!</div>
        <div className='calendar-choose__container'>
          <CalendarChooseItem onClick={() => setShowEventPopup(true)} name={"Create"} />
          {calendars.map(item => {
            return <CalendarChooseItem onClick={() => navigateToCalendar(item.id)} key={item.id} name={item.title} />
          })}
        </div>
      </div>
    </>
  )
}

export default CalendarChoose