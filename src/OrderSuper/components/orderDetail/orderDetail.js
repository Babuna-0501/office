import React from 'react';
import './orderDetail.css';

const OrderDetail = ({ isOpen, onClose, children }) => {
  return (
    <div className={`order-detail-container ${isOpen ? 'open' : ''}`}>
      <div className="order-detail-overlay" onClick={onClose}></div>
      <div className="order-detail-content">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default OrderDetail;
