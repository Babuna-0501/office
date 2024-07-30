import { useState } from 'react';
import './incrementer.css';

function Incrementer({ value = 0, setValue }) {
  return (
    <div className='input-number-group'>
      <div className='input-group-button' onClick={() => setValue(value - 1)}>
        -
      </div>

      <input
        className='input-number'
        type='number'
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <div className='input-group-button' onClick={() => setValue(value + 1)}>
        +
      </div>
    </div>
  );
}

export default Incrementer;
