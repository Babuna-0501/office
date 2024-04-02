import React, { useState } from 'react';
import './date.css';

const Date = ({ handleFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
    handleFilterChange(value); 
  };

  return (
    <div className="date-filter">
      <select value={selectedFilter} onChange={handleSelectChange}>
        <option value="">Огноогоор шүүх</option>
        <option value="today">Өнөөдөр</option>
        <option value="yesterday">Өчигдөр</option>
        <option value="yesterday+today">Өчигдөр + Өнөөдөр</option>
        <option value="last3days">Сүүлийн 3 хоног</option>
        <option value="lastweek">Сүүлийн 7 хоног</option>
        <option value="lastmonth">Сүүлийн 1 сар</option>
      </select>
    </div>
  );
};

export default Date;
