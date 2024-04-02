import React from 'react';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label>
      <input style={{height:"16px", width:"16px", border:"1px solid #CCCCCC", opacity:"0.7"}}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default Checkbox;
