import './style.css';

const CalendarChooseItem = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className='calendar-choose__item'>
      {name}
    </div>
  )
}

export default CalendarChooseItem