import React, { useState } from 'react';
import './tabProduct.css';

const TabsProduct = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabsProduct">
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content_prod2">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabsProduct;
