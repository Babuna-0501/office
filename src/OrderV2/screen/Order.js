import React, { useState, useEffect } from 'react';
import ProductAvatar from '../components/productImg/productImg';
import Channel from '../data/info';
import './style.css';
import getColorForStatus from '../components/color';
import LocationData from '../data/location.json'

const Order = (props) => {
  const [filteredData, setFilteredData] = useState([]);
  const data = filteredData.length ? filteredData : props.data;
  
  const { color, name, fontColor } = getColorForStatus(data.status);

  const getBusinessTypeName = (businessTypeId) => {
    const id = parseInt(businessTypeId);
    const channel = Channel.find((item) => item.business_type_id === id);
    return channel ? channel.business_type_name : 'Unknown';
  };

  const businessTypeId = parseInt(data.business_type_id);
  const businessTypeName = getBusinessTypeName(businessTypeId);
  const tradeshopCityId = parseInt(data.tradeshop_city);
  const location = LocationData.Location.find(item => item.location_id === tradeshopCityId);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  };

  return (
    <div className="order col_wrapper">
      <div className="order_index">
        <div>
          <input type="checkbox" checked={props.checked} />
        </div>
      </div>

      <div className="order_id">
        <div className="fullcontainer">
          <span>{data.order_id}</span>
        </div>
      </div>

      <div className="order_supplier">
        <div className="fullcontainer">
          <span
            className="statusbar"
            style={{ backgroundColor: color, color: fontColor }}
          >
            {name}
          </span>
        </div>
      </div>

      <div className="order_product">
        <div className="fullcontainer">
          <ProductAvatar data={data} />
        </div>
      </div>

      <div className="order_date">
        <div className="fullcontainer order_date">
          <span>{formatDate(data.order_date)}</span>
        </div>
      </div>

      <div className="delivery_date">
        <div className="fullcontainer order_date">
          <span>{formatDate(data.delivery_date)}</span>
        </div>
      </div>

      <div className="payment_mode">
        <div className="fullcontainer price_wrapper">
          <span>{data.grand_total}₮</span>
          <span>{data.payment_amount}₮</span>
        </div>
      </div>
      <div className="cancel_reason">
        <div className="fullcontainer">
          {/* <span>{data.order_cancel_reason}</span> */}
          <span>
            {" "}
            Нийлүүлэгч цуцалсан <br />
            /Үнийн мэдээлэл зөрүүт...
          </span>
        </div>
      </div>
      <div className="phone">
        <div className="fullcontainer">
          <span>{data.phone}</span>
        </div>
      </div>
      <div className="merchant">
        <div className="fullcontainer">
          <span>{data.tradeshop_name}</span>
        </div>
      </div>
      <div className="business_type">
        <div className="fullcontainer">
          <span>{businessTypeName}</span>
        </div>
      </div>
      <div className="tradeshop_city">
        <div className="fullcontainer">
          {location ? (
            <span>{location.location_name}</span>
          ) : (
            <span>Байршил олдсонгүй</span>
          )}
        </div>
      </div>

      <div className="tradeshop_district">
        <div className="fullcontainer">
          <span>{data.tradeshop_district}</span>
        </div>
      </div>
      <div className="tradeshop_horoo">
        <div className="fullcontainer">
          <span>{data.tradeshop_horoo}</span>
        </div>
      </div>
      <div className="full_address">
        <div className="fullcontainer">
          <span>{data.address}</span>
        </div>
      </div>
      <div className="full_address">
        <div className="fullcontainer">
          <span>Pickpack</span>
        </div>
      </div>
      <div className="full_address">
        <div className="fullcontainer">
          <span>{data.origin}</span>
        </div>
      </div>
      <div className="full_address">
        <div className="fullcontainer">
          <span>VAT</span>
        </div>
      </div>
      <div className="salesman">
        <div className="fullcontainer">
          <span>{data.sales_man_employee_id}</span>
        </div>
      </div>
      <div className="deliveryman">
        <div className="fullcontainer">
          <span>{data.deliver_man_employee_id}</span>
        </div>
      </div>
    </div>
  );
};

export default Order;
