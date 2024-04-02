import React, { useState, useEffect, useContext, useReducer } from "react";
import homeShop from "../assets/homeDelguur.svg";
import closeBtn from "../assets/close.svg";
import OrderReportHook from "../Hooks/OrderReportHook";
import css from "./upoint.module.css";
import UserDataHook from "../Hooks/userHook";
import AppHook from "../Hooks/AppHook";
import myHeaders from "../components/MyHeader/myHeader";

function Upoint(props) {
  // console.log("props upoint", props);
  const [active, setActive] = useState(null);

  let aaaa = props.data.upoint_bonus_amount;

  useEffect(() => {
    if (props?.data?.upoint_consume_amount !== null) {
      setActive(2);
    } else if (props?.data?.upoint_bonus_amount !== null) {
      setActive(3);
    } else if (props?.data?.upoint_added_bonus_amount !== null) {
      setActive(4);
    } else {
      setActive(0);
    }
  }, [props]);
  // console.log("active", active);

  ////// Onoo zartsuulaltiig butsaaah
  const UPointSpendReturn = (e, data) => {
    e.preventDefault();
    // console.log("clicked");
    if (data.upoint_card === null && data.upoint_phone === null) {
      alert(
        `${(
          <span
            style={{
              color: "#DA1414",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            Таны утасны <span style={{ fontWeight: 700 }}>{data.phone}</span>{" "}
            дугаар Upoint-той холбогдоогүй байна
          </span>
        )}`
      );
      return;
    }

    var raw = JSON.stringify({
      order_id: data.order_id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    // console.log("fdsfds");
    fetch("https://api2.ebazaar.mn/api/upoint/spent_return", requestOptions)
      .then((r) => r.json())
      .then((response) => {
        // console.log("response", response);
        fetch("https://api2.ebazaar.mn/api/create/backofficelog", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            section_name: "order",
            entry_id: props.data.order_id,
            user_name: props.userData.email,
            action: "Зарцуулсан оноо буцаасан",
          }),
        })
          .then((r) => r.json())
          .then((res) => {
            // console.log("res", res);
            if (res.code === 200) {
              alert("Амжилттай буцаалаа.");
              props.setOrder({
                ...props.data,
                upoint_consume_amount: 0,
              });
              props?.setUpointBasket(false);
            }
          })
          .catch((error) => {
            alert("Амжилтгүй боллоо. Та түр хүлээгээд дахин оролдоно уу.");
            console.log("error", error);
          });
      })
      .catch((error) => {
        alert("Амжилтгүй боллоо. Та түр хүлээгээд дахин оролдоно уу.");
        console.log("error", error);
      });
  };

  ////// Onoo olgoj baigaa function

  const UPointBonusAdd = (e, data) => {
    // console.log("order", order_id);
    e.preventDefault();
    if (data.upoint_card === null && data.upoint_phone === null) {
      alert(
        `${(
          <span
            style={{
              color: "#DA1414",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            Таны утасны <span style={{ fontWeight: 700 }}>{data.phone}</span>{" "}
            дугаар Upoint-той холбогдоогүй байна
          </span>
        )}`
      );
      return;
    }

    var raw = JSON.stringify({
      order_id: data.order_id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("https://api2.ebazaar.mn/api/upoint/add", requestOptions)
      .then((r) => r.json())
      .then((response) => {
        // console.log("response upoint add", response);
        if (response.code === 402) {
          alert(
            `${(
              <span
                style={{
                  color: "#DA1414",
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              >
                Таны утасны дугаарт Upoint холболт хийгээгүй байна.
              </span>
            )}`
          );
          props?.setUpointBasket(false);
          return;
        }

        fetch("https://api2.ebazaar.mn/api/create/backofficelog", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            section_name: "order",
            entry_id: props.data.order_id,
            user_name: props.userData.email,
            action: "Upoint оноо олгосон",
          }),
        })
          .then((r) => r.json())
          .then((res) => {
            // console.log("res upoint add", res);
            if (res.code === 200) {
              var raw = JSON.stringify({
                icon: "https://ebazaar.mn/logo/logon.png",
                title: `Таны ${data.order_id} дугаартай захиалгын upoint оноо олголоо`,
                body: data.order_id,
                status_id: 1,
              });
              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };
              fetch(
                "https://api2.ebazaar.mn/api/notification/pushsingle?UserID=" +
                  props.data.user_id,
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                  if (result.code === 200) {
                    alert(`Upoint амжилттай олголоо.`);
                    props.setOrder({
                      ...props.data,
                      upoint_added_bonus_amount: aaaa,
                      upoint_bonus_amount: 0,
                    });

                    props?.setUpointBasket(false);
                  } else if (result.code === 402) {
                    alert(
                      `${(
                        <span
                          style={{
                            color: "#DA1414",
                            fontSize: "14px",
                            fontWeight: 400,
                          }}
                        >
                          Таны утасны дугаарт Upoint холболт хийгээгүй байна.
                        </span>
                      )}`
                    );
                    props?.setUpointBasket(false);
                    return;
                  }
                })
                .catch((error) => {
                  alert(
                    "Амжилтгүй боллоо. Та түр хүлээгээд дахин оролдоно уу."
                  );
                  console.log("error", error);
                });
            } else {
            }
          })
          .catch((error) => {
            console.error("Error-second", error);
          });
      })
      .catch((error) => {
        alert("Амжилтгүй боллоо. Та түр хүлээгээд дахин оролдоно уу.");
        console.log("error", error);
      });
  };

  ////// Onoo butsaan olgoh function
  const UPointBonusReturn = (e, data) => {
    // console.log("clicked");
    // console.log("order_id", order_id);
    e.preventDefault();

    var raw = JSON.stringify({
      order_id: data.order_id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    fetch("https://api2.ebazaar.mn/api/upoint/bonus_return", requestOptions)
      .then((r) => r.json())
      .then((response) => {
        // console.log("response return ", response);

        fetch("https://api2.ebazaar.mn/api/create/backofficelog", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            section_name: "order",
            entry_id: props.data.order_id,
            user_name: props.userData.email,
            action: "Upoint оноо буцаах",
          }),
        })
          .then((r) => r.json())
          .then((res) => {
            // console.log("res upoint return", res);
            if (res.code === 200) {
              alert(`Амжилттай Upoint оноо буцаалаа.`);
              props.setOrder({
                ...props.data,
                upoint_added_bonus_amount: 0,
              });
              props?.setUpointBasket(false);
            }
          })
          .catch((error) => {
            alert("Амжилтгүй боллоо. Та түр хүлээгээд дахин оролдоно уу.");
            console.log("error", error);
          });
      })
      .catch((error) => {
        alert("Амжилтгүй боллоо. Та түр хүлээгээд дахин оролдоно уу.");
        console.log("error", error);
      });
  };

  return (
    <div id="bg">
      <div id="foo">
        <div className={css.containerMain}>
          <h1 style={{ color: "#37474F", fontSize: "20px", fontWeight: 700 }}>
            Захиалгын дугаар: {props.data.order_id}
          </h1>
          <span
            className="closebtn"
            onClick={() => props?.setUpointBasket(false)}
          >
            <img src={closeBtn} alt="close button" />
          </span>
        </div>
        <div>
          {props.data.upoint_phone === null && (
            <h1 style={{ color: "#37474F", fontSize: "16px", fontWeight: 700 }}>
              Таны утасны дугаар{" "}
              <span style={{ color: "#60A744", fontWeight: "bold" }}>
                Upoint
              </span>
              -д холбогдоогүй байна.
            </h1>
          )}
        </div>
        <div className={css.shopDetails}>
          <div className={css.deliveryInfo}>
            <table>
              <tr>
                <td>Зарцуулсан оноо буцаах</td>
                <td>
                  {" "}
                  {props?.data?.upoint_consume_amount !== 0 ? (
                    <a className={css.href}>
                      <>{props?.data?.upoint_consume_amount}</>
                    </a>
                  ) : (
                    <a className={css.isDisabled}>Зарцуулсан оноо буцаасан</a>
                  )}
                </td>
                <td>
                  {props?.data?.upoint_consume_amount ? (
                    <button
                      // disabled={props?.data?.upoint_consume_amount ? true : false}

                      onClick={(e) => UPointSpendReturn(e, props.data)}
                      style={{
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backgroundColor: "#FFA600",
                      }}
                    >
                      Буцаах
                    </button>
                  ) : (
                    <button
                      style={{
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#b0bec5",
                        cursor: "not-allowed",
                      }}
                    >
                      Буцаах
                    </button>
                  )}
                </td>
              </tr>
              <tr>
                <td>Урамшуулалын оноо олгох</td>
                {/* <td>101</td> */}
                <td>
                  {props?.data?.upoint_bonus_amount !== 0 ? (
                    <a className={css.href}>
                      {props?.data?.upoint_bonus_amount}
                    </a>
                  ) : (
                    <a className={css.isDisabled}>Оноо олгосон</a>
                  )}
                </td>
                <td>
                  {props?.data?.upoint_bonus_amount &&
                  props.data.upoint_phone !== null ? (
                    <button
                      onClick={(e) => UPointBonusAdd(e, props.data)}
                      style={{
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backgroundColor: "#FFA600",
                        // cursor: "not-allowed",
                      }}
                    >
                      Оноо олгох
                    </button>
                  ) : (
                    <button
                      style={{
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#b0bec5",
                        cursor: "not-allowed",
                      }}
                    >
                      Оноо олгох
                    </button>
                  )}
                </td>
              </tr>
              <tr>
                <td>Урамшуулалын оноо буцаах</td>
                {/* <td>102</td> */}
                <td>
                  {props?.data?.upoint_added_bonus_amount !== 0 ? (
                    <a className={css.href}>
                      {props?.data?.upoint_added_bonus_amount}
                    </a>
                  ) : (
                    <a className={css.isDisabled}>Oноо буцаасан</a>
                  )}
                </td>
                <td>
                  {props?.data?.upoint_added_bonus_amount ? (
                    <button
                      onClick={(e) => UPointBonusReturn(e, props.data)}
                      style={{
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backgroundColor: "#FFA600",
                      }}
                    >
                      Оноо буцаах
                    </button>
                  ) : (
                    <button
                      style={{
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#b0bec5",
                        cursor: "not-allowed",
                      }}
                    >
                      Оноо буцаах
                    </button>
                  )}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div id="order-confirm"></div>
      </div>
    </div>
  );
}

export default Upoint;
