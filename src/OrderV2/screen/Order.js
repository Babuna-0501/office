import React, { useState, useEffect } from "react";
import ProductAvatar from "../components/productImg/productImg";
import Channel from "../data/info";
import "./style.css";
import getColorForStatus from "../components/color";
import LocationData from "../data/location.json";
import OrderDetail from "../components/orderDetail/orderDetail";

const Order = (props) => {
  const [filteredData, setFilteredData] = useState([]);
  const data = filteredData.length ? filteredData : props.data;
  //Түгээгчийн попап
  const { color, name, fontColor } = getColorForStatus(data.status);

  const getBusinessTypeName = (businessTypeId) => {
    const id = parseInt(businessTypeId);
    const channel = Channel.find((item) => item.business_type_id === id);
    return channel ? channel.business_type_name : "Unknown";
  };

  const businessTypeId = parseInt(data.business_type_id);
  const businessTypeName = getBusinessTypeName(businessTypeId);
  const tradeshopCityId = parseInt(data.tradeshop_city);
  const tradeshopDistrict = parseInt(data.tradeshop_district);
  const tradeshopHoroo = parseInt(data.tradeshop_horoo);
  const location = LocationData.Location.find(
    (item) => item.location_id === tradeshopCityId
  );
  const location2 = LocationData.Location.find(
    (item) => item.location_id === tradeshopDistrict
  );
  const location3 = LocationData.Location.find(
    (item) => item.location_id === tradeshopHoroo
  );

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const paymentMethods = [
    { Id: 0, Name: "Дансаар" },
    { Id: 1, Name: "Бэлнээр" },
    { Id: 2, Name: "Зээлээр" },
    { Id: 3, Name: "Бэлэн+Данс" },
    { Id: 4, Name: "Бэлэн+Зээл" },
    { Id: 5, Name: "Данс+Зээл" },
  ];
  const originData = [
    { id: 1, name: "Android" },
    { id: 2, name: "iOS" },
    { id: 3, name: "Web" },
    { id: 4, name: "SFA" },
    { id: 5, name: "Base" },
    { id: 6, name: "Eclinic" },
    { id: 7, name: "OnTimePos" },
    { id: 8, name: "Pos Test" },
    { id: 9, name: "Qmenu" },
    { id: 10, name: "Amar" },
  ];

  const dataBaraa = [
    { paid: "200000" },
    { rest: "12000" }
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="WrapperOut">
      <div className="order col_wrapper" onClick={handleOpen}>
        <div className="order_index">
          <div>
            <input
              type="checkbox"
              checked={props.checked}
              onChange={props.onCheckboxChange}
            />
          </div>
        </div>

        <div className="order_id">
          <div className="fullcontainer idWrapper">
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
          <div className="fullcontainer price_wrapper idWrapper">
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
            {location2 ? (
              <span>{location2.location_name}</span>
            ) : (
              <span>Байршил олдсонгүй</span>
            )}
          </div>
        </div>
        <div className="tradeshop_horoo">
          <div className="fullcontainer">
            {location3 ? (
              <span>{location3.location_name}</span>
            ) : (
              <span>
                Байршил <br /> олдсонгүй
              </span>
            )}
          </div>
        </div>
        <div className="full_address">
          <div className="fullcontainer">
            <span>{data.address}</span>
          </div>
        </div>
        <div className="payment_type">
          <div className="fullcontainer">
            <span>Дансаар</span>
          </div>
        </div>
        <div className="pick_pack">
          <div className="fullcontainer">
            <span>Pickpack</span>
          </div>
        </div>
        <div className="origin">
          <div className="fullcontainer">
            <span>{data.origin}</span>
          </div>
        </div>
        <div className="vat">
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
            <span>{data.deliver_man}</span>
            {/* <span>
            {selectedDeliveryman
              ? selectedDeliveryman.first_name +
                " " +
                selectedDeliveryman.last_name
              : "Түгээгч"}
            </span> */}
          </div>
        </div>
        <div className="manager">
          <div className="fullcontainer">
            <span>manager</span>
          </div>
        </div>
        <div className="butsaalt">
          <div className="fullcontainer">
            <span>butsaalt</span>
          </div>
        </div>
      </div>
      {isOpen && (
        <OrderDetail isOpen={isOpen} onClose={handleClose}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Захиалгын дугаар {data.order_id}</h2>
          <div className="delguur">
            <div className="delguur_top">
              <span><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" rx="4" fill="#F2F2F2" />
                <path d="M20.5863 13.584V19.7211C20.5863 20.6673 19.8121 21.4415 18.8659 21.4415H9.47043C8.52419 21.4415 7.75 20.6673 7.75 19.7211V15.6673" stroke="#4D4D4D" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.88731 7.33398C8.32817 7.33398 7.81204 7.67807 7.64 8.1942L6.60774 11.1619C6.22064 12.2372 6.90882 13.2265 8.15613 13.2265C9.05935 13.2265 9.96258 12.7103 10.3927 11.9791C10.6077 12.7103 11.2959 13.2265 12.1991 13.2265C13.1024 13.2265 13.8766 12.7103 14.2206 11.9791C14.5647 12.7103 15.3389 13.2265 16.2421 13.2265C17.1454 13.2265 17.8335 12.7103 18.0486 11.9791C18.5217 12.7103 19.3819 13.2265 20.2852 13.2265C21.5325 13.2265 22.1776 12.2802 21.7905 11.1619L20.8873 8.1942C20.7153 7.67807 20.1991 7.33398 19.683 7.33398H8.88731Z" stroke="#4D4D4D" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.0817 21.0827L16.0817 17.4295C16.0817 16.4402 15.2645 15.666 14.3183 15.666H14.1463C13.157 15.666 12.3828 16.4832 12.3828 17.4295L12.3828 21.0827" stroke="#4D4D4D" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg></span>
              <span className="delguur_name">{data.tradeshop_name}</span>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "12px" }}> <span style={{ fontWeight: "bold" }}>Хаяг:</span>{data.address}</div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "12px" }}><span style={{ fontWeight: "bold", fontSize: "12px" }}>Регистр:</span>{data.supplier_register}<span style={{ fontWeight: "bold", fontSize: "12px" }}>Утас: </span>  {data.phone}</div>
            <div className="delguur_btm">
              <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <span><span style={{ fontSize: "10px" }}>Захиалсан:</span>  <br /><span style={{ fontWeight: "bold", fontSize: "12px" }}>{data.order_date.split('T')[0]}</span>  </span>
                <span><span style={{ fontSize: "10px" }}>Хүргүүлэх өдөр:</span> <br /> <span style={{ fontWeight: "bold", fontSize: "12px" }}>{data.delivery_date.split('T')[0]}</span> </span>
                <span className="tulsun"><span style={{ fontSize: "10px" }}>Төлсөн:</span><span style={{ fontSize: "12px", color: "#2AB674" }}>200000</span> </span>
                <span className="uldsen"><span style={{ fontSize: "10px" }}>Үлдэгдэл:<span style={{ fontSize: "12px", color: "#DA1414" }}><br />12000</span></span> </span>
                <span><span style={{ fontSize: "12px" }}>Захиалгын нийт дүн </span><br /><span style={{ fontSize: "18px", fontWeight: "bold" }}>212000</span></span>
              </div>
              <div style={{ fontSize: "10px", display: "flex", gap: "145px" }}>
                <span><span style={{ fontSize: "10px" }}>ХТ:</span>{ }</span>
                <span><span style={{ fontSize: "10px" }}>Түгээгч:</span><span style={{ fontWeight: "bold", fontSize: "10px" }}>{data.deliver_man}</span></span>
              </div>
            </div>
          </div>
          <div className="line-section">
            {data.line.map((product) => (
              <div key={product.order_detail_id} className="product-line">
                <img src={product.product_image} alt={product.product_name} />
                <div className="product-info">
                  <h3>{product.product_name}</h3>
                  <div className="line-btm" style={{ gap: "10px" }}>
                    <span> {Math.floor(product.price)}</span>
                    <span>*{product.quantity}</span>
                    <span>={Math.floor(product.price * product.quantity)}</span>
                  </div>

                </div>
                <div>edit</div>
              </div>
            ))}
          </div>


        </OrderDetail>
      )}
    </div>
  );
};

export default Order;
