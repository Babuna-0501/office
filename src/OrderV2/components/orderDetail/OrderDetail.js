import React, { useState } from 'react';
import './orderDetail.css';
import downSvg from './down.svg';
import TabsList from './TabsList';
import MarketInfo from './MarketInfo';
import Barimt from '../barimt/Barimt';

const OrderDetail = ({ isOpen, onClose, order, userData }) => {
  const [reportShow, setReportShow] = useState(false);

  if (!order || order.length === 0) {
    return null;
  }

  let total = 0;

  order.line?.map(l => {
    total += parseFloat(l.price?.toFixed(2)) * l.quantity;
  });

  return (
    <div className={`order-detail-container ${isOpen ? 'open' : ''}`}>
      <div className='order-detail-overlay' onClick={onClose}></div>

      <div className='order-detail-content'>
        <button className='close-btn' onClick={onClose}>
          Close
        </button>

        <div className='order-detail-title'>
          <span>Захиалгын дугаар {order.order_id}</span>

          <img src={downSvg} alt='down' onClick={() => setReportShow(true)} />
        </div>

        <MarketInfo order={order} />

        <TabsList order={order} userData={userData} />

        {reportShow && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 160,
              background: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Barimt
              orderXT={order.orderXT}
              order={order}
              total={total}
              setReportShow={setReportShow}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
