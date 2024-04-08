import React, { useState } from 'react';

import './tab.css';
import Tugeegch from '../tugeegch/tugeegch';

const Tab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tab-container">
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className='tugeegch'>
      <Tugeegch
        setSelectedDeliveryman={setSelectedDeliveryman}
      />

      </div>
      <div className="tab-content">
        {tabs[activeTab].content()}
      </div>
    </div>
  );
};

export default Tab;
