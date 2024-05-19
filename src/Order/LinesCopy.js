import React, { useState, useEffect, useContext, useReducer } from "react";
import myHeaders from "../components/MyHeader/myHeader";
import TavanBogd from "./TavanBogd";

import editIcon from "../assets/Edit_icon.svg";
import homeShop from "../assets/homeDelguur.svg";
import closeBtn from "../assets/close.svg";
import plusIcon from "../assets/plus.svg";
import minusIcon from "../assets/minus.svg";
import prinfIcon from "../assets/Upload.svg";

import css from "./lines.module.css";
import OrderApprove from "./OrderApprove/OrderApprove";
import OrderCancel from "./OrderCancel/OrderCancel";
import ArigOrder from "./ArigOrder.json";
import Braketterm from "./BraketTerm/Braketterm";
import BankInfo from "./BankInfo/BankInfo";

import { Modal, message } from "antd";
import AppHook from "../Hooks/AppHook";
import { MillhouseLines } from "./Millhouse/MillhouseLines";
import warning from "../assets/warning.svg";
import ProductNemeh from "./ProductAdd/ProductNemeh";
import Products from "../components/Products/Products";

function reducer(state, action) {
  return state;
}

function LinesCopy(props) {
  const [editing, setEditing] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [reportShow, setReportShow] = useState(false);
  const [orderApprove, setOrderApprove] = useState(false);
  const [orderCancelState, setOrderCancelState] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderCancelConfirm, setOrderCancelConfirm] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [priceChangeActive, setPriceChangeActive] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  const [totalPriceBracket, setTotalPriceBracket] = useState(null);
  const [arigOrder, setArigOrder] = useState(false);
  const [orderChangeBtn, setOrderChangeBtn] = useState(false);
  const [previous, setPrevious] = useReducer(reducer, props.data);
  const [productAdd, setProductAdd] = useState(false);
  const [product, setProduct] = useState([]);

  const permission = Object.values(JSON.parse(props.userData.permission))[0];

  let [order, setOrder] = useReducer(reducer, props.data);
  console.log("props", props.userData.company_id === "|14005|" && permission?.order?.update);
  let [ready, setReady] = useState(true);
  // if (props.data.supplier_id === 149) {
  //   console.log("tb");
  // } else {
  //   console.log("yeah" );
  // }
  // let previousPrice = 0;
  // previous.raw_order.map((q) => {
  //   previousPrice = (q.Quantity, q.Price)
  // });

  useEffect(() => {
    setOrder(props.data);
  }, [props.data]);
  let aa = JSON.parse(order.raw_order.toLowerCase());

  console.log("ss", aa);
  let ids = [];

  let total = 0;
  order.line.map((l) => {
    total += parseFloat(l.price.toFixed(2)) * l.quantity;
    ids.push(l.product_id);
  });

  useEffect(() => {
    ArigOrder.map((item, index) => {
      if (item.tradeshop_name == order.tradeshop_name) {
        setArigOrder(true);
      }
    });
  }, [props]);

  const cancel = (id) => {
    if (window.confirm("Та захиалгыг цуцлахдаа итгэлтэй байна уу?")) {
      var raw = JSON.stringify({
        order_id: order.order_id,
        order_status: 5,
        cancel_reason: Number(id),
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log("order status", requestOptions);
      fetch("https://api2.ebazaar.mn/api/order/status", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(
            "order status--------------------////////////////////*******************-----------------------///////////////",
            result
          );
          if (result.code === 200) {
            fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
              method: "POST",
              headers: myHeaders,
              redirect: "follow",
              body: JSON.stringify({
                section_name: "Захиалгыг цуцаллаа.",
                entry_id: props.data.order_id,
                user_name: props.userData.email,
                action: `Шинэ захиалга:${raw}`,
              }),
            })
              .then((res) => res.json())
              .then((res) => console.log("res", res))
              .catch((error) => {
                console.log("error", error);
              });
            let aa = order;
            aa.status = 5;
            // console.log("aa.status", aa);
            props.setOrder(aa);
            setOrder(aa);
            props.appctx.setPage(["orders"]);
            alert("Захиалгыг цуцаллаа!");
            setOrderCancelState(false);
          }
        })
        .catch((error) => {
          console.log("aldaa garlaa", error);
        });
    }
  };

  ///// confirm tolobtei zahialgiig ustgah
  const orderConfirmCancel = (id) => {
    if (window.confirm("Та захиалгыг цуцлахдаа итгэлтэй байна уу?")) {
      var raw = JSON.stringify({
        order_id: order.order_id,
        cancel_reason: Number(id),
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log("order status+++++11111", requestOptions);
      fetch("https://api2.ebazaar.mn/api/order/undo", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("order status+++++++++++++++++**********************//////////", result);
          if (result.code === 200) {
            fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
              method: "POST",
              headers: myHeaders,
              redirect: "follow",
              body: JSON.stringify({
                section_name: "Захиалгыг цуцаллаа.",
                entry_id: props.data.order_id,
                user_name: props.userData.email,
                action: `Шинэ захиалга:${raw}`,
              }),
            })
              .then((res) => res.json())
              .then((res) => console.log("res", res))
              .catch((error) => {
                console.log("error", error);
              });
            alert("Захиалгыг цуцаллаа!");
            // let aa = order;
            // aa.status = 5;
            // props.setOrder(aa);
            props.appctx.setPage(["orders"]);
            // setOrder(aa);

            setOrderCancelState(false);
          }
        })
        .catch((error) => {
          console.log("aldaa garlaa", error);
        });
    }
  };

  const cancelReturn = () => {
    setWaiting(true);

    var raw = JSON.stringify({
      order_id: order.order_id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api2.ebazaar.mn/api/order/undo", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.code === 200) {
          message.success(res.message);
          setOpen(false);
        } else {
          message.error(res.message);
        }
      });
    setWaiting(false);
  };

  const confirm = () => {
    var raw = JSON.stringify({
      order_id: order.order_id,
      order_status: 2,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log("requestOptions------------------------requestOptions", requestOptions);
    setEditing(false);
    fetch("https://api2.ebazaar.mn/api/order/status", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log("response----response", response);
        if (response.code === 200) {
          fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({
              section_name: "Захиалгын статусыг өөрчилөв.",
              entry_id: props.data.order_id,
              user_name: props.userData.email,
              action: `Шинэ захиалга:${raw}`,
            }),
          })
            .then((res) => res.json())
            .then((res) => console.log("res", res))
            .catch((error) => {
              console.log("error", error);
            });
          alert("Захиалгын статусыг амжилттай өөрчиллөө!");
          order.status = 2;
          props.setOrder(order);
          setOrder(order);
        } else {
          alert(`Алдаа: ${response.message}`);
        }
      })
      .catch((error) => {
        console.log("error order status change", error);
      });
  };

  const address =
    (order.status !== 1 && order.status !== 5) ||
    props.data.supplier_id === 13901 ||
    props.company === "|1|"
      ? order.address
      : "******** ******** ********";
  const phone =
    (order.status !== 1 && order.status !== 5) ||
    props.data.supplier_id === 13901 ||
    props.company === "|1|"
      ? order.phone
      : "******** ******** ********";
  const register =
    (order.status !== 1 && order.status !== 5) ||
    props.data.supplier_id === 13901 ||
    props.company === "|1|"
      ? order.register
      : "******** ******** ********";

  const change = (e, idx, operator) => {
    e.stopPropagation();
    setOrderChangeBtn(true);
    // console.log("orderchange btn from change", orderChangeBtn);
    let qty =
      operator === "plus"
        ? parseInt(document.getElementById("qty" + idx).value, 10) + 1
        : parseInt(document.getElementById("qty" + idx).value, 10) > 2
        ? parseInt(document.getElementById("qty" + idx).value, 10) - 1
        : 1;
    document.getElementById("qty" + idx).value = qty;
    let temp = order;
    temp.line[idx].quantity = qty;

    setOrder((temp) => JSON.parse(JSON.stringify(temp)));
  };

  const delivery = () => {
    if (window.confirm("Та захиалгын статусыг хүргэсэн төлөвт шилжүүлэхдээ итгэлтэй байна уу?")) {
      var raw = JSON.stringify({
        order_id: order.order_id,
        order_status: 3,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      if (editing) {
        // console.log(order);
        console.log("order");
      } else {
        console.log("submitting original order");
      }
      setEditing(false);
      fetch("https://api2.ebazaar.mn/api/order/status", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("end ork irlee, batalgaajsanaas hurgegdesen", result);
          if (result.code === 200) {
            fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
              method: "POST",
              headers: myHeaders,
              redirect: "follow",
              body: JSON.stringify({
                section_name: "Захиалгын статусыг өөрчилөв.",
                entry_id: props.data.order_id,
                user_name: props.userData.email,
                action: `Шинэ захиалга:${raw}`,
              }),
            })
              .then((res) => res.json())
              .then((res) => console.log("res", res))
              .catch((error) => {
                console.log("error", error);
              });
            alert("Захиалгын статусыг амжилттай өөрчиллөө!");
            order.status = 3;
            props?.setOrder(order);
            setOrder(order);

            // fetch("https://api2.ebazaar.mn/api/order/update_note", {
            // 	method: "POST",
            // 	headers: myHeaders,
            // 	redirect: "follow",
            // 	body: JSON.stringify({
            // 		order_id: props.data.order_id,
            // 		order_note: "Хүргэсэн",
            // 	}),
            // })
            // 	.then(r => r.text())
            // 	.then(res => {
            // 		console.log("noteRes", res);
            // 	})
            // 	.catch(err => console.log("NOTE ERR: ", err));
          } else {
            alert("Алдаа гарлаа--------");
          }
        });
    }
  };
  const restore = () => {
    if (window.confirm("Та захиалгын статусыг сэргээх төлөвт шилжүүлэхдээ итгэлтэй байна уу?")) {
      var raw = JSON.stringify({
        orderId: order.order_id,
        order_status: 2,
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      if (editing) {
        // console.log(order);
        console.log("order");
      } else {
        console.log("submitting original order");
      }
      setEditing(false);
      fetch("https://api2.ebazaar.mn/api/order/recreate", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.code === 200) {
            fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
              method: "POST",
              headers: myHeaders,
              redirect: "follow",
              body: JSON.stringify({
                section_name: "Захиалгын статусыг өөрчилөв.",
                entry_id: props.data.order_id,
                user_name: props.userData.email,
                action: `Шинэ захиалга:${raw}`,
              }),
            })
              .then((res) => res.json())
              .then((res) => console.log("res", res))
              .catch((error) => {
                console.log("error", error);
              });
            alert("Захиалгын статусыг амжилттай өөрчиллөө!");
            order.status = 2;
            props?.setOrder(order);
            setOrder(order);
          } else {
            alert("Алдаа гарлаа--------");
          }
        });
    }
  };

  let locations = props.locations;
  let city = order.tradeshop_city;
  let district = order.tradeshop_district;
  let khoroo = order.tradeshop_horoo;
  if (locations) {
    locations.map((location) => {
      if (location.location_id === parseInt(district, 10)) {
        district = location.location_name;
      }
    });
    locations.map((location) => {
      if (location.location_id === parseInt(khoroo, 10)) {
        khoroo = location.location_name;
      }
    });
    locations.map((location) => {
      if (location.location_id === parseInt(city, 10)) {
        city = location.location_name;
      }
    });
  }

  const updateHandler = () => {
    setButtonDisabled(true);
    let dataQuantity = order.line.map((item) => {
      return {
        order_detail_id: item.order_detail_id,
        quantity: Number(item.quantity),
      };
    });

    var raw = JSON.stringify({
      order_id: order.order_id,
      line: dataQuantity,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("order line request", requestOptions);
    fetch("https://api2.ebazaar.mn/api/order/update", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 200) {
          fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({
              section_name: "Захиалгыг шинэчлэлээ.",
              entry_id: props.data.order_id,
              user_name: props.userData.email,
              action: `Шинэ захиалга:${raw}`,
            }),
          })
            .then((res) => res.json())
            .then((res) => console.log("res", res))
            .catch((error) => {
              console.log("error", error);
            });
          alert("Захиалгыг шинэчлэлээ.!");
          setButtonDisabled(false);
          props.setLines(false);
        } else {
          alert("Алдаа гарлаа" + result.message);
        }
      });
  };

  const deleteProduct = (id, index) => {
    // console.log(id);

    if (window.confirm("Та захиалгыг устгахдаа итгэлтэй байна уу?")) {
      let dataQuantity = order.line.map((item) => {
        // console.log("item", item);
        if (item.order_id === id) {
          item.quantity = 0;
          return item;
        }
      });
      // console.log("dataQuantity", dataQuantity);
      var raw = JSON.stringify({
        order_id: order.order_id,
        line: [{ order_detail_id: id, quantity: dataQuantity.quantity }],
      });
      // console.log("raw", raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      // console.log(requestOptions);
      fetch("https://api2.ebazaar.mn/api/order/update", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          if (result.code === 200) {
            fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
              method: "POST",
              headers: myHeaders,
              redirect: "follow",
              body: JSON.stringify({
                section_name: "Захиалгын сагсалсан бүтээгдэхүүн цуцаллаа.",
                entry_id: props.data.order_id,
                user_name: props.userData.email,
                action: `Шинэ захиалга:${raw}`,
              }),
            })
              .then((res) => res.json())
              .then((res) => console.log("res", res))
              .catch((error) => {
                console.log("error", error);
              });
            alert("Сагсалсан бүтээгдэхүүнийг цуцаллаа!");

            props.setOrder(order);
            setOrder(order);
          } else {
            alert("Алдаа гарлаа" + result.message);
          }
        });
    }
  };

  const PriceHandler = (l, index) => {
    setPriceChangeActive(index);
  };

  const PriceHandlerSave = (l, index) => {
    if (newPrice === null) {
      alert("Та шинэ үнэ оруулна уу");
      return;
    }
    if (!permission.order.update) {
      alert("Таны эрх хүрэхгүй байна");
      return;
    }
    // console.log("l", l);

    let raw = JSON.stringify({
      order_id: order.order_id,
      line: [
        {
          order_detail_id: l.order_detail_id,
          product_id: l.product_id,
          price: newPrice === null ? l.price : Number(newPrice),
        },
      ],
    });
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // console.log("new price change ", requestOptions);

    fetch(`https://api2.ebazaar.mn/api/order/update/price`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log("price response", res);
        if (res.code === 200) {
          fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({
              section_name: "Захиалгын үнэ өөрчилөв.",
              entry_id: props.data.order_id,
              user_name: props.userData.email,
              action: `Захиалгын үнэ өөрчилөв. Шинэ үнэ : ${newPrice}. Хуучин үнэ : ${l.price}`,
            }),
          })
            .then((res) => res.json())
            .then((res) => console.log("res", res))
            .catch((error) => {
              console.log("error", error);
            });
          let aaa = order;
          let bbb = aaa.line.map((x) => {
            if (x.order_detail_id === l.order_detail_id) {
              x.price = Number(newPrice);
            }
          });

          setOrder(bbb);
          setPriceChangeActive(null);
          setNewPrice(null);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const ChosedHandler = (e, item) => {
    e.stopPropagation();
    item["quantity"] = 0;
    console.log("ffff", item);
    if (window.confirm(`Та энэ ${item.product_name} захиалгаас хасах гэж байна`)) {
      console.log("zovshoorlooo");

      var raw = JSON.stringify({
        order_id: order.order_id,
        line: [
          {
            order_detail_id: item.order_detail_id,
            quantity: 0,
          },
        ],
      });
      // console.log("raw", raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      // console.log(requestOptions);
      fetch("https://api2.ebazaar.mn/api/order/update", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.code === 200) {
            setProductAdd(true);
          } else {
            alert("Алдаа гарлаа" + result.message);
          }
        });
    } else {
      console.log("tatgalzlaaa");
    }
    // setProductAdd(true);
  };
  //////// supplier_id sortlood oor report template gargaj bn
  let lines;
  let newQTY;
  if (props.data.supplier_id === 975) {
    lines = <TavanBogd order={order} data={props} supID={975} />;
  } else if (props.data.supplier_id === 149) {
    lines = <TavanBogd order={order} data={props} supID={149} />;
  } else if (props.data.supplier_id === 948) {
    lines = <MillhouseLines order={order} />;
  } else {
    console.log("order.line-----", order.line);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
    let qty = 0;
    lines = order.line.map((l, index) => {
      qty = l.quantity;
      if (l.quantity === 0) {
        // return;
        // console.log("line quantity === 0 baina");
      } else {
        newQTY = aa[index]?.quantity ? aa[index]?.quantity : aa[index]?.quantity;

        if (!l.quantity_and_weight && l.average_weight !== null) {
          newQTY = Number(newQTY) * Number(l.average_weight);
          qty = Number(qty) * Number(l.average_weight);
        }

        const lineTotal = l.price * Number(qty);
        newQTY = newQTY ? newQTY : 1;
        const rawOrderTotal = l.price * newQTY;
        let image = l.product_image
          ? l.product_image.split(",")[0].replace("original", "small")
          : null;
        console.log("bbb", aa[index]);
        return (
          <div
            className={css.container}
            key={index}
            // onClick={(e) => ChosedHandler(e, l)}
          >
            <div className={css.firstwrapper}>
              <div className={css.imageContainer}>
                <img src={image} alt="product image" />
              </div>
              <div className={css.detailWrapper}>
                <h3 className={css.hd3} style={{ fontWeight: 300, margin: "0" }}>
                  {l.product_name}
                </h3>

                <div className={css.barcodeContainer}>
                  {l.product_sku ? <span>Бүтээгдэхүүн sku : {l.product_sku}</span> : null}

                  {l.product_bar_code ? <span> Barcode : {l.product_bar_code}</span> : null}
                </div>
                <div className={css.updatedPrice}>
                  {l.quantity !== newQTY ? (
                    <div>
                      <div className={css.UpdatedOrder}>
                        <span
                          style={{
                            color: "#2AB674",
                            fontWeight: "700",
                            fontSize: "10px",
                            lineHeight: "12px",
                          }}
                        >
                          Өөрчлөгдсөн захиалга
                        </span>
                      </div>
                      <div className={css.UpdatedOrderPrice}>
                        <div className={css.warningContainer}>
                          <img
                            style={{
                              width: 16,
                              height: 18,
                              marginBottom: 4,
                              marginRight: 5,
                            }}
                            className={css.updatedImage}
                            src={warning}
                          />
                        </div>

                        <span
                          style={{
                            color: "#2AB674",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {l.price.toLocaleString()}₮
                        </span>
                        <span
                          style={{
                            color: "#2AB674",
                            fontSize: "12px",
                            fontSize: l.average_weight !== null ? "12px" : "14px",
                            fontWeight: "700",
                            marginLeft: "5px",
                            width: l.average_weight !== null ? "60px" : "40px",
                          }}
                        >
                          {" "}
                          x {qty} {l.average_weight !== null ? "кг" : ""} =
                        </span>
                        <span
                          style={{
                            color: "#2AB674",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {" "}
                          {lineTotal.toLocaleString()}₮
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <div>
                    <div className={css.rawOrderContainer}>
                      <div>
                        <span
                          style={{
                            color: "#808080",
                            fontWeight: "400",
                            fontSize: "10px",
                            lineHeight: "12px",
                            display: l.quantity === newQTY ? "none" : "block",
                            fontWeight: "700",
                          }}
                        >
                          Анхны захиалга
                        </span>
                      </div>
                      <div className={css.rawOrderPrice}>
                        <span
                          style={{
                            color: "#808080",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {l.price.toLocaleString()}₮{" "}
                        </span>
                        <span
                          style={{
                            color: "#2AB674",
                            fontSize: "14px",
                            fontWeight: "700",
                            marginLeft: "5px",
                          }}
                        >
                          {" "}
                          x {newQTY ? newQTY : 1}
                          {l.average_weight !== null ? "кг" : ""} ={" "}
                        </span>
                        <span
                          style={{
                            color: "#808080",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {" "}
                          {rawOrderTotal.toLocaleString()}₮
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {order.status === 1 || order.status === 2 || order.status === 3 ? (
              <div
                className={css.pricewrapperNew}
                style={{
                  display:
                    props.userData.id === 351 ||
                    props.userData.id === 435 ||
                    props.userData.id === 256 ||
                    props.userData.id === 320 ||
                    props.userData.id === 366 ||
                    props.userData.id === 1189 ||
                    props.userData.id === 1305 ||
                    props.userData.id === 1272 ||
                    props.userData.id === 980
                      ? "flex"
                      : "none",
                }}
              >
                {index === priceChangeActive ? (
                  <input
                    className={css.priceinputnew}
                    value={newPrice}
                    type="number"
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                ) : null}
                <button
                  className={css.pricecontainer}
                  style={{
                    background: index === priceChangeActive ? "#2AB674" : "#ffa600",
                    display: arigOrder ? "block" : "none",
                    border: "none",
                  }}
                  onClick={() => {
                    index === priceChangeActive
                      ? PriceHandlerSave(l, index)
                      : PriceHandler(l, index);
                  }}
                >
                  {index === priceChangeActive ? "Хадгалах" : "Үнэ засах"}
                </button>
              </div>
            ) : null}

            {order.status === 1 || order.status === 2 || order.status === 3 ? (
              <div
                className={css.pricewrapperNew}
                style={{
                  display:
                    props.userData.id === 1015 ||
                    props.userData.id === 990 ||
                    props.userData.id === 1105 ||
                    props.userData.id === 320 ||
                    props.userData.id === 256 ||
                    props.userData.id === 1272 ||
                    props.userData.id === 1305 ||
                    props.userData.id === 1189 ||
                    props.userData.id === 1138
                      ? "flex"
                      : "none",
                }}
              >
                {index === priceChangeActive ? (
                  <input
                    className={css.priceinputnew}
                    value={newPrice}
                    type="number"
                    onChange={(e) => setNewPrice(e.target.value)} ///// Primeone deer une update hiih heseg
                  />
                ) : null}
                <button
                  className={css.pricecontainer}
                  style={{
                    background: index === priceChangeActive ? "#2AB674" : "#ffa600",
                    border: "none",
                  }}
                  onClick={() => {
                    index === priceChangeActive
                      ? PriceHandlerSave(l, index)
                      : PriceHandler(l, index);
                  }}
                >
                  {index === priceChangeActive ? "Хадгалах" : "Үнэ засах"}
                </button>
              </div>
            ) : null}
            {order.status !== 5 && permission?.order?.update && (
              <div onClick={() => orderModified(l.id, index)}>
                {index !== activeIndex ? <img src={editIcon} alt="edit icon" /> : null}
              </div>
            )}
            {index === activeIndex ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "120px",
                }}
              >
                <div
                  // style={{ display: activeIndex ? "block" : "none" }}
                  className={css.lineEditing}
                >
                  <span className={css.spanMinus} onClick={(e) => change(e, index, "minus")}>
                    <img src={minusIcon} alt="minus icon" />
                  </span>
                  <input
                    className={css.spanInput}
                    type="number"
                    defaultValue={l.quantity}
                    id={"qty" + index}
                    style={{ width: "50px" }}
                    onChange={(e) => {
                      e.stopPropagation();
                      l.quantity = e.target.value;
                      setOrderChangeBtn(true);
                    }}
                  />
                  <span className={css.spanPlus} onClick={(e) => change(e, index, "plus")}>
                    <img src={plusIcon} alt="plus icon" />
                  </span>
                </div>
                {/* <div
                  className={css.deleteContainer}
                  onClick={() => deleteProduct(l.order_id, index)}
                >
                  <img src={deleteIcon} alt="delete icon" />
                </div> */}
              </div>
            ) : null}
          </div>
        );
      }
    });
  }
  console.log("product", product);

  const orderModified = (id, index) => {
    setEditing(true);
    setActiveIndex(index);
  };
  let businessType = "";
  // console.log(props.data.business_type_id);
  props.businessType.map((btype) => {
    // console.log(btype);
    if (btype.business_type_id === parseInt(props.data.business_type_id, 10)) {
      businessType = btype.business_type_name;
    }
  });

  //// ene order deer product nemj baigaa

  const ProductAddHandler = (item) => {
    item.map((x) => {
      let raw = JSON.stringify({
        orderId: order.order_id,
        products: [
          {
            productId: x._id,
            quantity: 1,
            price: x.locations["62f4aabe45a4e22552a3969f"].price.channel["1"],
            // QuantityAndWeight: 1,
            // AverageWeight: x.weight,
          },
        ],
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      // console.log(requestOptions);
      // console.log("item", props);
      fetch("https://api2.ebazaar.mn/api/orderDetail/create", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("product add", result);
          if (result.code === 200) {
            let aa = {
              ...props.data,
              line: [
                ...props.data.line,
                {
                  order_detail_id: 211224,
                  order_id: order.order_id,
                  product_id: x._id,
                  quantity: 1,
                  price: x.locations["62f4aabe45a4e22552a3969f"].price.channel["1"],
                  price_amount: x.locations["62f4aabe45a4e22552a3969f"].price.channel["1"],
                  base_price: x.locations["62f4aabe45a4e22552a3969f"].price.channel["1"],
                  amount: 1,
                  average_weight: x.weight,
                  quantity_and_weight: true,
                  product_name: x.name,
                  product_image: x.image[0],
                  product_type_id: 0,
                  product_bar_code: x.bar_code,
                  product_brand_id: 0,
                  product_sku: x.sku,
                  sector_id: null,
                  city_tax: false,
                  alcohol: false,
                },
              ],
            };
            console.log("aa", aa);
            props.setOrder(aa);
            props.setLines(false);
          } else {
            alert("Алдаа гарлаа" + result.message);
          }
        });
    });
    let timer = setTimeout(() => {
      alert("Амжилттай нэмэгдлээ");
      window.location.reload();
    }, [1000]);
    return () => clearTimeout(timer);
  };
  return ready ? (
    <>
      <>
        <div className={css.linesContainer}>
          {(order.status === 1 || order.status === 2) && permission?.order?.update && (
            <div
              style={{
                display: "flex",
                justifyContent:
                  props.userData.id === 351 ||
                  props.userData.id === 435 ||
                  props.userData.id === 256 ||
                  props.userData.id === 320 ||
                  props.userData.id === 990 ||
                  props.userData.id === 1305 ||
                  props.userData.id === 1189 ||
                  props.userData.id === 366
                    ? "space-between"
                    : "flex-end",
                paddingBottom: "10px",
              }}
              onClick={
                orderChangeBtn
                  ? updateHandler
                  : () => {
                      console.log("daragdlaa");
                      console.log("orderchangebtn", orderChangeBtn);
                    }
              }
            >
              {console.log(" props.userData.id", props.userData.id)}
              <button
                style={{
                  background: "#2AB674",
                  fontSize: "10px",
                  padding: "5px",
                  color: "#fff",
                  borderRadius: "4px",
                  display:
                    props.userData.id === 351 ||
                    props.userData.id === 1272 ||
                    props.userData.id === 1138 ||
                    props.userData.id === 1230 ||
                    props.userData.id === 256 ||
                    props.userData.id === 320 ||
                    props.userData.id === 990 ||
                    props.userData.id === 1189 ||
                    props.userData.id === 1305 ||
                    (props.userData.company_id === "|14005|" && permission.order.admin === true) ||
                    props.userData.id === 366
                      ? "block"
                      : "none",
                }}
                onClick={() => {
                  setProductAdd(true);
                }}
              >
                Бараа нэмэх
              </button>
              <button
                disabled={buttonDisabled ? true : false}
                className={css.saveModified}
                style={{
                  background: buttonDisabled ? "#ECEFF1" : "#ffa600",
                  border: "none",
                  fontSize: "12px",
                }}
              >
                Өөрчлөлтийг хадгалах
              </button>
            </div>
          )}

          {(props.userData.id === 351 ||
            props.userData.id === 256 ||
            props.userData.id === 320 ||
            props.userData.id === 990 ||
            props.userData.id === 1272 ||
            props.userData.id === 1189 ||
            props.userData.id === 1305 ||
            props.userData.id === 1230 ||
            props.userData.id === 366) &&
            order.status === 3 &&
            permission?.order?.update && (
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    props.userData.id === 351 ||
                    props.userData.id === 1189 ||
                    props.userData.id === 256 ||
                    props.userData.id === 320 ||
                    props.userData.id === 990 ||
                    props.userData.id === 1305 ||
                    props.userData.id === 1272 ||
                    props.userData.id === 366
                      ? "space-between"
                      : "flex-end",
                  paddingBottom: "10px",
                }}
                onClick={
                  orderChangeBtn
                    ? updateHandler
                    : () => {
                        console.log("daragdlaa+111");
                      }
                }
              >
                <button
                  style={{
                    background: "#2AB674",
                    fontSize: "10px",
                    padding: "5px",
                    color: "#fff",
                    borderRadius: "4px",
                    display:
                      props.userData.id === 351 ||
                      props.userData.id === 1189 ||
                      props.userData.id === 256 ||
                      props.userData.id === 320 ||
                      props.userData.id === 1230 ||
                      props.userData.id === 1305 ||
                      props.userData.id === 1272 ||
                      (props.userData.company_id === "|14005|" &&
                        permission.order.admin === true) ||
                      props.userData.id === 366
                        ? "block"
                        : "none",
                  }}
                  onClick={() => {
                    setProductAdd(true);
                  }}
                >
                  Бараа нэмэх
                </button>
                <button
                  disabled={buttonDisabled ? true : false}
                  className={`${css.saveModified}`}
                  style={{
                    background: buttonDisabled ? "#ECEFF1" : "#ffa600",
                    border: "none",
                    fontSize: "12px",
                  }}
                >
                  Өөрчлөлтийг хадгалах
                </button>
              </div>
            )}

          {lines}
        </div>
        {orderApprove && <OrderApprove confirm={confirm} onCancel={setOrderApprove} />}
        {orderCancelState && (
          <OrderCancel
            cancelOn={cancel}
            setLines={props.setLines}
            setOrderCancelState={setOrderCancelState}
          />
        )}
        {orderCancelConfirm && (
          <OrderCancel
            cancelOn={orderConfirmCancel}
            setLines={props.setLines}
            setOrderCancelState={setOrderCancelConfirm}
          />
        )}
        {permission?.order?.update && (
          <div id="order-confirm">
            {order.status === 1 || order.status === 2 || order.status === 3 ? (
              <span
                className="btn cancel"
                // onClick={() => cancel()}
                onClick={() => {
                  if (order.status === 1 || order.status === 2 || order.status === 3) {
                    setOrderCancelState(true);
                  } else {
                    setOpen(true);
                  }
                }}
                style={{
                  display:
                    order.status === 1 ||
                    order.status === 2 ||
                    order.status === 3 ||
                    permission?.orderCancel?.update
                      ? "block"
                      : "none",
                }}
              >
                Цуцлах
              </span>
            ) : null}

            <span
              className="btn"
              onClick={() => setOrderApprove(true)}
              // onClick={() => confirm()}
              style={{ display: order.status === 1 ? "block" : "none" }}
            >
              Баталгаажуулах
            </span>

            <span
              className="btn"
              onClick={() => delivery()}
              style={{
                display: order.status === 2 ? "block" : "none",
              }}
            >
              Хүргэж өгсөн
            </span>
            <span
              className="btn"
              style={{
                display: order.status === 3 ? "block" : "none",
                backgroundColor: "#2ab674",
              }}
            >
              Хүргэгдсэн
            </span>
            <span
              onClick={() => restore()}
              className="btn"
              style={{
                display: order.status === 5 ? "block" : "none",
                flexDirection:
                  props.userData.id === 256 || props.userData.id === 320 ? "row" : "column",
              }}
            >
              Дахин сэргээх
            </span>
          </div>
        )}

        {productAdd && (
          <Products
            onClose={setProductAdd}
            supID={order.supplier_id}
            prodIDS={ids}
            setProduct={setProduct}
            orderID={order.order_id}
            confirm={ProductAddHandler}
          />
        )}
      </>
      <Modal
        title={
          <div
            style={{
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            Захиалга цуцлах
          </div>
        }
        centered
        open={open}
        onOk={() => {
          if (!waiting) {
            cancelReturn();
          }
        }}
        onCancel={() => setOpen(false)}
        width="600px"
        okText={"Цуцлах"}
        cancelText={"Буцах"}
        bodyStyle={{ padding: "5px 30px" }}
      >
        <div style={{ fontSize: "16px" }}>Та захиалга цуцлахдаа итгэлтэй байна уу?</div>
      </Modal>
    </>
  ) : (
    <span>Түр хүлээнэ үү ...</span>
  );
}

export default LinesCopy;
