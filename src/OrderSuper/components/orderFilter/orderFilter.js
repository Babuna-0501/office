import React from 'react';

const OrderFilter = ({ orders, filterValue }) => {
  const filteredOrders = orders.filter(order => order.order_id === filterValue);

  return (
    <div className="filtered_orders">
      {filteredOrders.map(order => (
        <div key={order.order_id} className="order">
          <div className="order_id">
            <div className="fullcontainer">
              <span>{order.order_id}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderFilter;
