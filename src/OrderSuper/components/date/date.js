import React, { useState } from 'react';
import './date.css';

const Date = ({ handleFilterChange, selectedFilter }) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateRange = (e) => {
    const value = e.target.value;
    if (value === 'date') {
      setShowDatepicker(true);
    } else {
      setShowDatepicker(false);
      handleFilterChange(value);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleApplyDateRange = () => {
    if (startDate && endDate) {
      handleFilterChange(`${startDate} - ${endDate}`, startDate, endDate);
      setShowDatepicker(false);
    } else {
      alert("Эхлэх болон дуусах өдрийг хамтад нь сонгоно уу!.");
    }
  };
  
  
  

  const handleCloseDatepicker = () => {
    setShowDatepicker(false);
  };

  return (
    <div className="date-filter">
      <select
        value={selectedFilter}
        onChange={(e) => handleFilterChange(e.target.value)}
        onClick={handleDateRange}
      >
        <option value="all">Бүгд</option>
        <option value="date">Огноогоор шүүх</option>
        <option value="today">Өнөөдөр</option>
        <option value="yesterday">Өчигдөр</option>
        <option value="yesterday+today">Өчигдөр + Өнөөдөр</option>
        <option value="last3days">Сүүлийн 3 хоног</option>
        <option value="lastweek">Сүүлийн 7 хоног</option>
        <option value="lastmonth">Сүүлийн 1 сар</option>
      </select>
      {showDatepicker && (
        <div className="date-range-container">
          
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="date-range-input"
            placeholder="Эхлэх огноо"
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="date-range-input"
            placeholder="Дуусах огноо"
          />
          <div className='btn_wrapper'>      
            <button onClick={handleApplyDateRange}>Шүүх</button>
            <button onClick={handleCloseDatepicker}>Хаах</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Date;