import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { getWeek } from '../../utils/util';
import MonthView from './MonthView';
import dayjs from 'dayjs';
import { CalendarContext } from '../../context/CalendarContext';


const YearCalendars = () => {

  const { yearIndex } = useContext(CalendarContext);

  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {months.map(month => (
          <MonthView key={month} month={month} year={yearIndex} />
        ))}
      </div>
    </div>
  );
};

export default YearCalendars;
