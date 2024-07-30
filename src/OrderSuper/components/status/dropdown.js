import React from 'react';
import './dropdown.css';

const Dropdown = ({ options, onChange, defaultValue }) => {
  const handleDropdownChange = (e) => {
    onChange(e);
  };

  return (
    <select className='dropdownWrapper' value={defaultValue} onChange={handleDropdownChange}>
      {defaultValue && (
        <option key={defaultValue} value={defaultValue}>{defaultValue}</option>
      )}

      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Dropdown;
