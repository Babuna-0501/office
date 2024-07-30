import React, { useState } from 'react';
import './date.css';
import { options } from './constants';
import { getDates } from '../../data/info';

const DateFilter = ({ filterByDate, selectedFilter, setParams }) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const filterClick = () => {
    filterByDate(date);
  };

  const closeClick = () => {
    setShowDatepicker(false);
  };

  const selectOnChange = ({ target: { value } }) => {
    if (value === 'date') {
      setShowDatepicker(true);
    } else {
      setShowDatepicker(false);
    }

    if (value === 'all') {
      setParams('');
    } else {
      const filteredDate = getDates(value);

      filterByDate(filteredDate);
    }
  };

  return (
    <div className='date-filter'>
      <select
        defaultValue='all'
        value={selectedFilter}
        onChange={selectOnChange}
      >
        {options.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          );
        })}
      </select>

      {showDatepicker && (
        <div className='date-range-container'>
          <input
            type='date'
            name='startDate'
            value={date.startDate}
            className='date-range-input'
            placeholder='Эхлэх огноо'
            onChange={e => setDate({ ...date, startDate: e.target.value })}
          />

          <input
            type='date'
            name='endDate'
            value={date.endDate}
            className='date-range-input'
            placeholder='Дуусах огноо'
            onChange={e => setDate({ ...date, endDate: e.target.value })}
          />

          <div className='btn_wrapper'>
            <button onClick={filterClick}>Шүүх</button>
            <button onClick={closeClick}>Хаах</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
