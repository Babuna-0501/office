import React, { useState } from 'react';

import './tab.css';
import Tugeegch from '../tugeegch/tugeegch';
import Stick from '../stick/stick';

const Tab = ({ tabs, updateOrdersDeliver, view }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tab-container">
      <div className="tab-header">
        <div className='tab-header--first'> 
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-item ${index === activeTab ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className='tab-header--second'>
          <div className="tugeegch">
            <Tugeegch
              view={view}
              setSelectedDeliveryman={setSelectedDeliveryman}
              updateOrdersDeliver={updateOrdersDeliver}
            />
          </div>
          <div className='stick'>
            <Stick trigger={<button>Open Stick</button>}>
              <p>This is the content inside the Stick.</p>
            </Stick>
          </div>
        </div>
      </div>


      <div className="tab-content">{tabs[activeTab].content()}</div>
    </div>
  );
};

export default Tab;
