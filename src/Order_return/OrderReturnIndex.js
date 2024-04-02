import React, { useState, useEffect, useContext } from "react";
import css from "./orderreturn.module.css";
import Suppliers from "../components/Suppliers/Suppliers";
import { styles } from "./style";
import notifIcon from "../assets/Notification.svg";
import Districtdata from "../District.json";
import myHeaders from "../components/MyHeader/myHeader";
import OrderList from "./OrderList";
import InfiniteScroll from "react-infinite-scroll-component";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";

const OrderReturnIndex = (props) => {
  const [orderStart, setOrderStart] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [orderID, setOrderID] = useState(null);
  const [orderAmount, setOrderAmount] = useState(null);
  const [orderPaid, setOrderPaid] = useState(null);
  const [orderCoupon, setOrderCoupon] = useState(null);
  const [orderNote, setOrderNote] = useState(null);
  const [orderPhone, setOrderPhone] = useState(null);
  const [orderOrder, setOrderOrder] = useState(null);
  const [orderChannel, setOrderChannel] = useState(null);
  const [orderCity, setOrderCity] = useState(null);
  const [orderDistrict, setOrderDistrict] = useState(null);
  const [orderKhoroo, setOrderKhoroo] = useState(null);
  const [orderAddress, setOrderAddress] = useState(null);
  const [businesType, setBusinesType] = useState([]);
  const [suppValue, setSuppValue] = useState("");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [buramkhan, setBuramkhan] = useState([]);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  console.log("props orderChannel", props);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setLoading(true);
    let params = "";
    console.log("orderID", orderID);

    if (orderChannel) {
      params += `business_type=${parseInt(orderChannel)}&`;
    }
    if (orderPhone?.length === 8) {
      params += `tradeshop_phone=${parseInt(orderPhone)}&`;
    }
    if (orderChannel) {
      params += `business_type=${parseInt(orderChannel)}&`;
    }
    if (orderID) {
      params += `id=${parseInt(orderID)}&`;
    }
    if (orderDistrict) {
      params += `tradeshop_disctrict=${parseInt(orderDistrict)}&`;
    }
    if (orderStart) {
      params += `order_start=${parseInt(orderStart)}&`;
    }
    if (deliveryDate) {
      params += `delivery_end=${parseInt(deliveryDate)}&`;
    }
    if (suppValue) {
      params += `supplier_id=${parseInt(suppValue)}&`;
    }
    if (orderOrder) {
      params += `tradeshop_name=${orderOrder}&`;
    }
    let url = `https://api2.ebazaar.mn/api/orders?origin=4&order_type=2&${params}page=${page}`;
    console.log("url", url);

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (props.userData.company_id === "|14014|") {
          fetch(
            `https://api2.ebazaar.mn/api/backoffice/users?company=14014`,
            requestOptions
          )
            .then((res) => res.json())
            .then((res) => {
              setBuramkhan(res.data);
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
        setLoading(false);
        setOrders(res.data);
        setBusinesType(props.businessType);
      })
      .catch((error) => {
        console.log("order catch error", error);
      });
  }, [
    orderChannel,
    orderPhone,
    orderID,
    orderDistrict,
    orderStart,
    deliveryDate,
    suppValue,
    orderOrder,
  ]);
  return (
    <div>
      <div className={css.container}>
        <div
          style={{
            width: props.userData.company_id === "|1|" ? "2700px" : "2700px",
            borderBottom: "0.8px solid #CFD8DC",
          }}
        >
          <div className="row header">
            <div style={styles.checkboxcontainer}>
              <div>
                <span className={css.headerTitle}>Дугаар</span>
                {/* <input type="text" onKeyPress={(e) => searchById(e)} /> */}
                <input
                  type="text"
                  value={orderID}
                  onChange={(e) => setOrderID(e.target.value)}
                />
              </div>
            </div>
            <div
              style={{
                ...styles.logoContainer,
              }}
            >
              <div>
                <span className={css.headerTitle}>Logo</span>
                <input type="text" disabled />
              </div>
            </div>
            <div
              style={{
                ...styles.supplierContainer,
              }}
            >
              <div style={{ position: "relative" }}>
                {props.userData.company_id !== "|13954|" && (
                  <Suppliers setSuppValue={setSuppValue} />
                )}
              </div>
            </div>

            <div style={styles.notifContainer}>
              <div>
                <span
                  className={css.headerTitle}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <span className={css.headerTitle}></span>
                  <img
                    src={notifIcon}
                    alt="notif"
                    style={{
                      width: "24px",
                      heigth: "24px",
                      objectFit: "cover",
                    }}
                  />
                </span>
              </div>
            </div>

            <div style={styles.orderImageContainer}>
              <div>
                <span className={css.headerTitle}>Захиалга</span>

                <input type="text" disabled />
              </div>
            </div>
            <div
              style={{
                ...styles.orderDateContainer,
              }}
            >
              <div>
                <span className={css.headerTitle}>Захиалсан</span>

                <input
                  type="date"
                  value={orderStart}
                  onChange={(e) => setOrderStart(e.target.value)}
                />
              </div>
            </div>
            <div style={styles.deliverDateContainer}>
              <div>
                <span className={css.headerTitle}>Хүргүүлэх</span>

                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>
            </div>
            <div style={styles.totalPriceContainer}>
              <div>
                <span className={css.headerTitle}>Дүн</span>

                <input
                  type="text"
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  disabled
                />
              </div>
            </div>

            <div style={styles.paidPriceContainer}>
              <div>
                <span className={css.headerTitle}>Төлбөр</span>
                <input
                  type="text"
                  value={orderPaid}
                  onChange={(e) => setOrderPaid(e.target.value)}
                  disabled
                />
              </div>
            </div>

            <div style={styles.noteContainer}>
              <div>
                <span className={css.headerTitle}>Тэмдэглэл</span>
                <input
                  type="text"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div style={styles.phoneContainer}>
              <div>
                <span className={css.headerTitle}>Утас</span>

                <input
                  type="number"
                  value={orderPhone}
                  onChange={(e) => setOrderPhone(e.target.value)}
                />
              </div>
            </div>
            <div style={styles.channelNameContainer}>
              <div>
                <span className={css.headerTitle}>Байгууллага</span>

                <input
                  type="text"
                  value={orderOrder}
                  onChange={(e) => setOrderOrder(e.target.value)}
                />
              </div>
            </div>
            <div style={styles.channelContainer}>
              <div>
                <span className={css.headerTitle}>Суваг</span>

                <select
                  value={orderChannel}
                  onChange={(e) => setOrderChannel(e.target.value)}
                >
                  <option value="all">---</option>
                  {businesType
                    ? businesType.map((s, index) => {
                        return (
                          <option value={s.business_type_id} key={index}>
                            {s.business_type_name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </div>
            <div style={styles.provinceContainer}>
              <div>
                <span className={css.headerTitle}>Хот/аймаг</span>
                <input
                  type="text"
                  value={orderCity}
                  onChange={(e) => setOrderCity(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div style={styles.districtContainer}>
              <div>
                <span className={css.headerTitle}>Дүүрэг/сум</span>

                <select
                  value={orderDistrict}
                  onChange={(e) => setOrderDistrict(e.target.value)}
                >
                  <option value=""></option>
                  {Districtdata.map((s, index) => {
                    return (
                      <option value={s.id} key={index}>
                        {s.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div style={styles.khorooContainer}>
              <div>
                <span className={css.headerTitle}>Хороо</span>
                <input
                  type="text"
                  value={orderKhoroo}
                  onChange={(e) => setOrderKhoroo(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div style={styles.khorooContainer}>
              <div>
                <span className={css.headerTitle}>Хаяг</span>
                <input
                  type="text"
                  value={orderAddress}
                  onChange={(e) => setOrderAddress(e.target.value)}
                  disabled
                />
              </div>
            </div>
            {props.userData.company_id === "|14014|" && (
              <>
                <div style={styles.khorooContainer}>
                  <div>
                    <span className={css.headerTitle}>XT ID</span>
                    <input type="text" disabled />
                  </div>
                </div>
                <div style={styles.khorooContainer}>
                  <div>
                    <span className={css.headerTitle}>XT Нэр</span>
                    <input type="text" disabled />
                  </div>
                </div>
                <div style={styles.khorooContainer}>
                  <div>
                    <span className={css.headerTitle}>XT Утас</span>
                    <input type="text" disabled />
                  </div>
                </div>
              </>
            )}
            <div style={styles.khorooContainer}>
              <div>
                <span className={css.headerTitle}>Буцаагдсан шалтгаан</span>
                <input type="text" disabled />
              </div>
            </div>
          </div>
        </div>
        <div className={css.foobarcontainer}>
          <div id="scrollableDiv" className={css.scrollcontainer}>
            <InfiniteScroll
              dataLength={orders?.length}
              next={() => setPage((prev) => prev + 1)}
              hasMore={true}
              loader={
                loading === true && (
                  <div className={css.loading}>... Loading</div>
                )
              }
              scrollableTarget="scrollableDiv"
            >
              {orders.map((order, index) => {
                return (
                  <OrderList
                    order={order}
                    setOrders={setOrders}
                    orders={orders}
                    key={index}
                    data={props}
                    buramkhan={buramkhan}
                    userData={props.userData}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReturnIndex;
