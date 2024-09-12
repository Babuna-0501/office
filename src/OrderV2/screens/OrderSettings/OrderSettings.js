import React, { useState } from 'react';
import './orderSettings.css';
import arrowSvg from './arrow.svg';
import OrderHeaderSettings from './OrderHeaderSettings';

const OrderSettings = ({ tableFields, userData }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = index => {
    setActiveTab(index);
  };

  const renderButtons = () => {
    return (
      <div className='tab_buttons'>
        <button
          className={activeTab === 0 ? 'active' : ''}
          onClick={() => handleTabClick(0)}
        >
          <img src={arrowSvg} alt='arrow' />
          Захиалгын багана, эрэмбийн тохиргоо
        </button>
        <button
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => handleTabClick(1)}
        >
          <img src={arrowSvg} alt='arrow' />
          Захиалгын ерөнхий тохиргоо
        </button>
        <button
          className={activeTab === 2 ? 'active' : ''}
          onClick={() => handleTabClick(2)}
        >
          <img src={arrowSvg} alt='arrow' />
          Захиалгын дүнгийн тохиргоо
        </button>
      </div>
    );
  };

  return (
    <div className='order_settings'>
      {renderButtons()}

      <div className='tab_content'>
        {activeTab === 0 && (
          <OrderHeaderSettings tableFields={tableFields} userData={userData} />
        )}

        {activeTab === 1 && <h3>Захиалгын ерөнхий тохиргоо</h3>}

        {activeTab === 2 && <h3>Захиалгын дүнгийн тохиргоо</h3>}
      </div>
    </div>
  );
};

export default OrderSettings;
