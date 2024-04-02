import React, { useState, useEffect } from "react";
import css from "./reasonsidebar.module.css";
import closeBtn from "../assets/close.svg";
import editIcon from "../assets/Edit_icon.svg";
import homeShop from "../assets/homeDelguur.svg";
import plusIcon from "../assets/plus.svg";
import minusIcon from "../assets/minus.svg";
import prinfIcon from "../assets/Upload.svg";
import OneOrder from "./OneOrder";
import ReasanComponent from "./ReasanComponent";

const ReasanSidebar = (props) => {
  const [order, setOrder] = useState([]);
  const [reason, setReason] = useState([]);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [khoroo, setKhoroo] = useState(null);
  const [total, setTotal] = useState(null);

  const [lines, setLines] = useState([]);

  console.log("reason props", props);
  console.log("reason props maindata", props.maindata);

  const closeHandler = () => {
    props.setSidebaropen(false);
  };
  useEffect(() => {
    setReason(JSON.parse(props.data.order_data));
    setOrder(props.data);
    setAddress(props.data.address);
    setLines(props.data.line);
    props.maindata?.locations.map((item) => {
      if (item.location_id === Number(props.data.tradeshop_city)) {
        setCity(item.location_name);
      }
      if (item.location_id === Number(props.data.tradeshop_district)) {
        setDistrict(item.location_name);
      }
      if (item.location_id === Number(props.data.tradeshop_horoo)) {
        setKhoroo(item.location_name);
      }
    });
    setTotal(props.data.grand_total);
  }, [props]);
  console.log("order   //// order", order);
  return (
    <div className={css.container}>
      <div className={css.firstcontainer}></div>
      <div className={css.sidebarmain}>
        <div id="foo">
          <div className={css.containerMain}>
            <h1
              style={{
                color: "#37474F",
                fontSize: "20px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
              }}
            >
              Захиалгын дугаар: {order ? order.order_id : null}{" "}
              {/* Тайлан хэвлэх */}
            </h1>
            <span className="closebtn" onClick={closeHandler}>
              <img src={closeBtn} alt="close button" />
            </span>
          </div>
          <div className={css.shopDetails}>
            <div className={css.first}>
              <div className={css.firstshopdetails}>
                <div className={css.homeiconContainer}>
                  <img src={homeShop} alt="home icon" />
                </div>
                <div>
                  <p className={css.delguurname}>{order.tradeshop_name}</p>
                  <p className={css.hayag}>
                    Хаяг: {address ? address : null}, {city ? city : null},{" "}
                    {district ? district : null}, {khoroo ? khoroo : null}
                  </p>
                </div>
              </div>
              <div>
                <p className={css.hayag}>Захиалгын дүн</p>
                <h1 className={css.delguurname}>
                  {total ? total?.toLocaleString() : ""}₮
                </h1>
              </div>
            </div>
            <div className={css.divider}></div>
            <div className={css.deliveryInfo}>
              <div className={css.deliveryInfoContainer}>
                <div className={css.deliveryInfoFirst}>
                  <p className={css.deliveryInfoHeader}>Утас:</p>
                  <p className={css.deliveryInfo_info}>
                    {order ? order.phone : null}
                  </p>
                </div>
                <div className={css.deliveryInfoSecond}>
                  <p className={css.deliveryInfoHeader}>Регистер:</p>
                  <p className={css.deliveryInfo_info}>
                    {order ? order.register : null}
                  </p>
                </div>
              </div>
              <div className={css.deliveryInfoContainer}>
                <div className={css.deliveryInfoFirst}>
                  <p className={css.deliveryInfoHeader}>Захиалсан:</p>
                  <p className={css.deliveryInfoinfoBold}>
                    {order ? order?.order_date?.substring(0, 10) : null}
                  </p>
                </div>
                <div className={css.deliveryInfoSecond}>
                  <p className={css.deliveryInfoHeader}>Хүргүүлэх өдөр:</p>
                  <p className={css.deliveryInfoinfoBold}>
                    {order ? order?.delivery_date?.substring(0, 10) : null}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={css.linesContainer}>
            {lines.map((item, i) => {
              return <OneOrder item={item} key={i} />;
            })}
          </div>

          <div className={css.butsaagdsan}>
            <ReasanComponent data={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasanSidebar;
