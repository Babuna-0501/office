import React, { useState } from "react";
import css from "./list.module.css";
import { Popconfirm, message, Drawer } from "antd";
import myHeaders from "../components/MyHeader/myHeader";
import { styles } from "./style";
import Background from "../components/Background/Background";
import closebtn from "../assets/close.svg";
import Sidebar from "./Components/Sidebar";

const List = (props) => {
  const [sidebarstate, setSidebarstate] = useState(false);
  const [sidebardata, setSidebardata] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [ids, setIds] = useState("");

  const sideHandler = (data) => {
    // console.log("data", data.order_ids);
    // setIds(data.order_ids);
    setSidebarstate(true);
    let controller = new AbortController();
    let aa = data.order_ids.split(",");
    let data1 = [];
    // console.log("aa", aa);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    };

    aa.map((item) => {
      fetch(
        `https://api2.ebazaar.mn/api/coupon/orderdata?order_id=${Number(item)}`,
        requestOptions
      )
        .then((r) => r.json())
        .then((response) => {
          // console.log("response ", response);
          data1.push(response);
          controller = null;
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
    // console.log("data", data);

    setOrderData(data1);
    setSidebardata(data);
    return () => controller?.abort();
  };
  const closeSidebarHandler = () => {
    setSidebarstate(false);
    setSidebardata([]);
  };

  const createCoupon = (item) => {
    var raw = JSON.stringify({
      coupon_amount: Number(item.reward),
      tradeshop_id: item.tradeshop_id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // console.log("delete requestOptions", requestOptions);
    fetch(`https://api2.ebazaar.mn/api/coupon/insert`, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        // console.log("copupon create res", res);
        if (res.code === 400) {
          message.error("Coupon үүссэн байна.");
        } else if (res.status === 200) {
          message.success("Амжилттай олголоо");
          // props.appctx.setPage(["holi"]);
        } else {
          message.error("Алдаа гарлаа");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  let content = (
    <div className={css.wrapper}>
      {props?.data?.map((e, i) => (
        <div className={`${css.container}`} key={i}>
          <div
            style={{
              width: "2030px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                ...styles.checkboxcontainer,
              }}
              onClick={() => sideHandler(e)}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                  width: "100%",
                  paddingLeft: "20px",
                }}
              >
                {e.tradeshop_id}
              </span>
            </div>
            <div
              style={{
                ...styles.supplierContainer,
                paddingLeft: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                }}
              >
                {e.tradeshop_name}
              </span>
            </div>
            <div
              style={{
                ...styles.sugalaaContainer,
                paddingLeft: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                  width: "50%",
                }}
              >
                {e.user_number}
              </span>
            </div>
            <div
              style={{
                ...styles.orderNumberContainer,
                paddingLeft: "10px",
              }}
              title={e.order_ids}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                  width: "100%",
                  overflow: "hidden",
                  wordBreak: "break-all",
                }}
                className={css.twoLine}
              >
                {e.order_ids}
              </span>
            </div>
            <div
              style={{
                ...styles.dunContainer,
                paddingLeft: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                  width: "30%",
                }}
              >
                {e.amount?.toLocaleString()}₮
              </span>
            </div>
            <div
              style={{
                ...styles.targetContainer,
                paddingLeft: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                  width: "30%",
                }}
              >
                {e.target?.toLocaleString()}₮
              </span>
            </div>
            <div
              style={{
                ...styles.percentContainer,
                paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                  width: "30%",
                }}
              >
                {Math.floor((e.amount / e.target) * 100)}%
              </span>
            </div>
            <div
              style={{
                ...styles.rewardContainer,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={
                  e.amount / e.target > 1
                    ? {
                        fontSize: "12px",
                        fontWeight: "400",
                        width: "80%",
                        borderRadius: "5px",
                        color: "#389e0d",
                        background: "#f6ffed",
                        border: "1px solid #b7eb8f",
                        height: "21px",
                        textAlign: "center",
                      }
                    : e.amount / e.target > 0.5
                    ? {
                        fontSize: "12px",
                        fontWeight: "400",
                        width: "80%",
                        borderRadius: "5px",
                        color: "#d48806",
                        background: " #fffbe6",
                        border: "1px solid #ffe58f",
                        height: "21px",
                        textAlign: "center",
                      }
                    : {
                        fontSize: "12px",
                        fontWeight: "400",
                        width: "80%",
                        borderRadius: "5px",
                        color: "#0958d9",
                        background: "#e6f4ff",
                        border: "1px solid #91caff",
                        height: "21px",
                        textAlign: "center",
                      }
                }
                className={css.mainreward}
              >
                {e.reward?.toLocaleString()}₮
              </span>
            </div>
            <div
              style={{
                ...styles.isUsedContainer,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                  width: "80%",
                }}
              >
                {/* {props?.couponData?.find(a => a.TradeshopID === e.tradeshop_id)
								?.isUsed === 1 ? ( */}
                {e.isUsed === 1 ? (
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      borderRadius: "5px",
                      color: "#08979c",
                      background: "#e6fffb",
                      border: "1px solid #87e8de",
                      height: "21px",
                      textAlign: "center",
                    }}
                  >
                    Ашигласан
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      borderRadius: "5px",
                      color: "#531dab",
                      background: "#f9f0ff",
                      border: "1px solid #d3adf7",
                      height: "21px",
                      textAlign: "center",
                    }}
                  >
                    Ашиглаагүй
                  </div>
                )}
              </span>
            </div>
            <div
              style={{
                ...styles.createCouponContainer,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Math.floor((e.amount / e.target) * 100) < 100 ? (
                <span
                  style={{
                    width: "80%",
                  }}
                >
                  <button
                    style={{
                      fontSize: "12px",
                      color: "#78909C",
                      fontWeight: "400",
                      borderRadius: "5px",
                      background: "#ECEFF1",
                      border: "0px solid #FFA400",
                      height: "21px",
                      textAlign: "center",
                      width: "100%",
                    }}
                    disabled={true}
                  >
                    Боломжгүй
                  </button>
                </span>
              ) : (
                <span
                  style={{
                    width: "80%",
                    marginTop: "10px",
                  }}
                >
                  <Popconfirm
                    placement="left"
                    title="Та coupon үүсгэх үү ?"
                    onConfirm={() => createCoupon(e)}
                    okText="Тийм"
                    cancelText="Үгүй"
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#fff",
                        fontWeight: "400",
                        borderRadius: "5px",
                        background: "#FFA400",
                        border: "1px solid #FFA400",
                        height: "21px",
                        textAlign: "center",
                      }}
                    >
                      Олгох
                    </p>
                  </Popconfirm>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className={css.listcontainer}>
      {content}

      {sidebarstate && (
        <Background className={css.modalContainer}>
          <div className={css.empthycontainer}></div>
          <div className={css.sidebarcontainer}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={closebtn}
                style={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                }}
                onClick={closeSidebarHandler}
              />
            </div>
            <div>
              <Sidebar data={sidebardata} orderdata={orderData} />
            </div>
          </div>
        </Background>
      )}
    </div>
  );
};

export default List;
