import React, { useState } from 'react';
import Dropdown from '../components/status/dropdown'; 

const OrderFilter = ({ options, onChange }) => {
  return (
    <div className='order-filter'>
      <label htmlFor='status-filter'>Filter by Status:</label>
      <Dropdown id='status-filter' options={options} onChange={onChange} />
    </div>
  );
};

export default OrderFilter;
