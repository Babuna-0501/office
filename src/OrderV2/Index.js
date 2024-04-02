import React from 'react';
import Tab from './components/tab/Tab';
import List1 from './List/List1'; 
import List2 from './List/List2';
import List3 from './List/List3';
import Date from './components/date/date'
import Sidebar from './components/sidebar/sidebar';
// import Header from './components/header/header';
import './style.css'

const tabs = [
    { label: 'Захиалгын жагсаалт', content: () => <List1 /> },
    { label: 'Захиалгын тохиргоо', content: () => <List2 /> },
    { label: 'Захиалгын загвар илгээх', content: () => <List3 /> },
];

const handleFilterChange = (selectedFilter) => {
    console.log('Selected Filter:', selectedFilter);
};

const App = () => {

  return (
    <div className="Container">
      <div className='sidebarWrapper'> 
        <Date handleFilterChange={handleFilterChange} />
        <Sidebar/>
      </div>
        <Tab tabs={tabs} />
    </div>
  );
};

export default App;
