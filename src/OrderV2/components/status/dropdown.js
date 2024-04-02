import React from 'react';
import './dropdown.css'

const Dropdown = ({ options, onChange }) => {
  return (
    <select className='dropdownWrapper' onChange={onChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Dropdown;
