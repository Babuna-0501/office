import React from 'react';
import './dropdown.css';

const Dropdown = ({ options, defaultValue, onChange }) => {
  const handleDropdownChange = (e) => {
    onChange(e);
  };

  return (
    <select className='dropdownWrapper' value={defaultValue} onChange={handleDropdownChange}>
      {/* Include a default option if a defaultValue is provided */}
      {defaultValue && (
        <option key={defaultValue} value={defaultValue}>{defaultValue}</option>
      )}

      {/* Map over other options and render them */}
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Dropdown;
