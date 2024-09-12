import React from 'react';
import './datepick.css'

const DatePick = ({style, value, handleChange }) => {
  return (
    <div className='datepick_order'>
      <input
        type="date"
        value={value}
        onChange={handleChange}
        placeholder="date"
        style={style}
      />
    </div>
  );
};

export default DatePick;
