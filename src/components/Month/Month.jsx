import Day from "../Day/Day"
import './style.css';
import React, { useEffect } from 'react';

const Month = ({ month }) => {


  return (
    <div className="month">
      <div className="month-grid">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div >
    </div>
  )
}

export default Month