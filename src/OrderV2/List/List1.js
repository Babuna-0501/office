import React from 'react'
import List from '../screen/List'
import './style.css'


const List1 = ({ filterState, setFilterState }) => {
  return (
    <div className='list'>
      <List filterState={filterState} setFilterState={setFilterState} />
    </div>
  );
};

export default List1