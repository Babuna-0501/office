import React from 'react'
import List from '../screen/List'



const List1 = ({ filterState, setFilterState }) => {
  return (
    <div>
      <List filterState={filterState} setFilterState={setFilterState} />
    </div>
  );
};

export default List1