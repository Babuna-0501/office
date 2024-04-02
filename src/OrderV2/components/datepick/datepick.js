import React from 'react';

const DatePick = ({ value, handleChange }) => {
  return (
    <div>
      <input
        type="date"
        value={value}
        onChange={handleChange}
        placeholder="date"
        style={{ fontSize: '12px' }}
      />
    </div>
  );
};

export default DatePick;
