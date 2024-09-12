import React, { useState } from 'react';
import './tab.css';

const Tab = ({ tabs, setPage, setParams, setTabLoading }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = index => {
    setParams('');
    setPage(1);
    setTabLoading(true);
    setActiveTab(index);
  };

  return (
    <div className='tab-container'>
      <div className='tab-header'>
        <div className='tab-header--first'>
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
      </div>

      <div className='tab-content'>{tabs[activeTab].content()}</div>
    </div>
  );
};

export default Tab;
