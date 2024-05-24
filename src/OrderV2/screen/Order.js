import React, { useState, useEffect } from "react";
import ProductAvatar from "../components/productImg/productImg";
import Channel from "../data/info";
import "./style.css";
import getColorForStatus, { getChangeStatusThemes } from "../components/color";
import LocationData from "../data/location.json";
import OrderDetail from "../components/orderDetail/orderDetail";
import myHeaders from "../../components/MyHeader/myHeader";
import { ProductModal } from "../components/product/modal";
import { NoteOrderDetail } from "../components/note";

const Order = ({ fieldsData, ...props }) => {
  const [filteredData, setFilteredData] = useState([]);
  const data = filteredData.length ? filteredData : props.data;

  //Түгээгчийн попап
  const { color, name, fontColor } = getColorForStatus(
    data?.shipmentStatus === 14 || data?.shipmentStatus === 15
      ? data.shipmentStatus
      : data.status
  );

  const [userId, setUserId] = useState([]);
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
  let ids = [];
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(undefined);
  const [editedOrder, setEditedOrders] = useState([]);
  const [payment, setPayment] = useState();
  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsOpen(true);
  };

  const [foo, setFoo] = useState("");

  useEffect(() => {
    setPayment(props.payment);
  }, [props.payment]);

  const handleClose = () => {
    setPayment((prev) => ({
      ...prev,
      edit: false,
    }));
    setEdit(undefined);
    setIsOpen(false);
  };
  const [fields, setFields] = useState(fieldsData?.order?.field ?? []);
  const editData = async () => {
    try {
      setEditedOrders((prev) => [...prev, edit]);
      setEdit(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const save = async () => {
    try {
      let priceBody = JSON.stringify({
        order_id: data.order_id,
        line: editedOrder.map((e) => {
          return {
            order_detail_id: e.order_detail_id,
            product_id: e.product_id,
            price: e.price,
          };
        }),
      });
      let quantityBody = JSON.stringify({
        order_id: data.order_id,
        line: editedOrder.map((e) => {
          return {
            order_detail_id: e.order_detail_id,
            quantity: e.quantity,
          };
        }),
      });
      let requestOptionsPrice = {
        method: "POST",
        headers: myHeaders,
        body: priceBody,
        redirect: "follow",
      };
      let requestOptionsQuantity = {
        method: "POST",
        headers: myHeaders,
        body: quantityBody,
        redirect: "follow",
      };
      await fetch(
        "https://api2.ebazaar.mn/api/order/update",
        requestOptionsQuantity
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("quantity", result);
        });
      await fetch(
        `https://api2.ebazaar.mn/api/order/update/price`,
        requestOptionsPrice
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("price", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
      setIsOpen(false);
      window.location.reload();
    } catch (error) {}
  };

  const changePrice = (e) => {
    let value = isNaN(parseFloat(e.target.value))
      ? 0
      : parseFloat(e.target.value);
    return value;
  };

  const [activeTab, setActiveTab] = useState(1);
  const handleTabbClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [statusAlert, setStatusAlert] = useState(0);
  const [cancelReasonData, setCancelReasonData] = useState([]);
  const [cancelReason, setCancelReason] = useState();

  const openAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const ProductAddHandler = (item) => {
    let raw = JSON.stringify({
      orderId: data.order_id,
      products: item.map((x) => {
        return {
          productId: x.productId,
          quantity: x.quantity == 0 ? 1 : x.quantity,
          price: x.price,
        };
      }),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api2.ebazaar.mn/api/orderDetail/create", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("product add", result);
        if (result.code == 200) {
          document.location.reload();
        }
      });
  };

  const updatePayment = async () => {
    if (payment.edit) {
      let existingData = JSON.parse(data.order_data);
      let term = existingData.term;
      let discounts = existingData.discounts;
      let paymentDetails = existingData.payment;
      let brTotal = existingData.brTotal;
      let wherehouse = existingData.wherehouse;
      let promotion = existingData.promotion;
      let percent = existingData.percent;
      let delivery_fee = existingData.delivery_fee;
      let type = existingData.type;

      existingData.prePayment = payment.paid;

      let raw = JSON.stringify({
        orderId: data.order_id,
        data: {
          term: term,
          discounts: discounts,
          brTotal: brTotal,
          wherehouse: wherehouse,
          prePayment: payment.paid,
          promotion: promotion,
          percent: percent,
          delivery_fee: delivery_fee,
          type: type,
        },
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://api2.ebazaar.mn/api/orderdata/update", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("payment update", result);
          document.location.reload();
        })
        .catch((error) => console.log("error", error));
    }

    setPayment((prev) => ({ ...prev, edit: !payment.edit }));
  };

  const cancel = async () => {
    try {
      let body = {
        order_id: data.order_id,
        order_status: 5,
        cancel_reason: Number(cancelReason),
      };

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(body),
      };
      let url = `https://api2.ebazaar.mn/api/order/status`;

      await fetch(url, requestOptions)
        .then((r) => r.json())
        .then((result) => {
          console.log(result);
          if (result.code === 200) {
            fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
              method: "POST",
              headers: myHeaders,
              redirect: "follow",
              body: JSON.stringify({
                section_name: "Захиалгын статусыг өөрчилөв.",
                entry_id: data.order_id,
                user_name: props.userData.email,
                action: `Шинэ захиалга:{"orderId":${data.order_id},"order_status":5}`,
              }),
            })
              .then((res) => res.json())
              .then((res) => console.log("res", res))
              .catch((error) => {
                console.log("error", error);
              });

            alert("Амжилттай хадгалагдлаа");
          } else {
            alert("Алдаа гарлаа, Дахин оролдоно уу");
          }
        })
        .catch((error) => console.log("error++++", error));
    } catch (error) {
      alert("Амжилтгүй");
      console.log(error);
    }
  };

  const getCancelReason = () => {
    fetch(`https://api2.ebazaar.mn/api/order/cancelreason`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("cancel reason data", res.data);
        setCancelReasonData(res.data);
      })
      .catch((error) => {
        console.log("order reason tathad aldaa ", error);
      });
  };

  const submitShipmentStatus = async (order_id, code) => {
    try {
      console.log(order_id, code);
    } catch (error) {}
  };
  // 14,

  const submit = async () => {
    try {
      const { code, name } = getChangeStatusThemes(
        data?.shipmentStatus == 14 || data?.shipmentStatus == 15
          ? data.shipmentStatus
          : data.status
      );
      let prev = getColorForStatus(
        data?.shipmentStatus == 14 || data?.shipmentStatus == 15
          ? data.shipmentStatus
          : data.status
      );
      let body = {
        order_id: data.order_id,
        order_status: code,
      };

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(body),
      };
      let url =
        code != 3
          ? `https://api2.ebazaar.mn/api/order/status`
          : "https://api2.ebazaar.mn/api/order/recreate";
      await fetch(url, requestOptions)
        .then((r) => r.json())
        .then((result) => {
          if (result.code === 200) {
            if (code == 14 || code == 15) {
              submitShipmentStatus(data.order_id, code);
            }
            fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
              method: "POST",
              headers: myHeaders,
              redirect: "follow",
              body: JSON.stringify({
                section_name: "Захиалгын статусыг өөрчилөв.",
                entry_id: data.order_id,
                user_name: props.userData.email,
                action: `Шинэ захиалга:{"orderId":${data.order_id},"order_status":${code}}`,
              }),
            })
              .then((res) => res.json())
              .then((res) => console.log("res", res))
              .catch((error) => {
                console.log("error", error);
              });

            alert("Амжилттай хадгалагдлаа");
          } else {
            alert("Алдаа гарлаа, Дахин оролдоно уу");
          }
        })
        .catch((error) => console.log("error++++", error));
      let d = new Date();
      let date =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes();
      let desc = "";

      var raw = JSON.stringify({
        order_id: data.order_id,
        order_note: prev.name,
      });

      var requestOptionsNote = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://api2.ebazaar.mn/api/order/update_note", requestOptionsNote)
        .then((response) => response.text())
        .then((result) => {
          props.fetch();
        });
    } catch (error) {
      alert("Амжилтгүй");
      console.log(error);
    }
  };

  // Захиалга устгах

  const orderDeleteHandler = async (order_id) => {
    try {
      const confirmed = window.confirm(
        "Та энэ захиалгыг устгахдаа итгэлтэй байна уу?"
      );
      if (!confirmed) {
        return;
      }
      let raw = JSON.stringify({
        order_id: parseInt(order_id),
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://api2.ebazaar.mn/api/order/datechange",
        requestOptions
      );
      const result = await response.json();

      if (result.code === 200) {
        alert("Амжилттай устгалаа.");
      } else {
        alert("Алдаа гарлаа.");
      }
    } catch (error) {
      console.log("Error deleting order:", error);
      alert("Алдаа гарлаа.");
    }
  };
  // console.log(props, "props ireh");

  return (
    <div className="WrapperOut">
      <div className="order col_wrapper">
        <div className="order_index">
          <div>
            <input
              type="checkbox"
              checked={props.checked}
              onChange={props.onCheckboxChange}
            />
          </div>
        </div>

        {fields
          .sort((a, b) => a.position - b.position)
          .map((field) => {
            switch (field.id) {
              case 1:
                return (
                  <div className="order_id" key={field.id}>
                    <div className="fullcontainer idWrapper">
                      <span>{data.order_id}</span>
                    </div>
                  </div>
                );

              case 5:
                return (
                  <div className="order_product" key={field.id}>
                    <div className="fullcontainer">
                      <ProductAvatar data={data} />
                    </div>
                  </div>
                );

              case 35:
                return (
                  <div className="order_date" key={field.id}>
                    <div className="fullcontainer order_date">
                      <span>{formatDate(data.order_date)}</span>
                    </div>
                  </div>
                );

              case 36:
                return (
                  <div className="delivery_date" key={field.id}>
                    <div className="fullcontainer order_date">
                      <span>{formatDate(data.delivery_date)}</span>
                    </div>
                  </div>
                );

              case 9:
                return props.data.supplier_id === 14268 ? (
                  <div className="payment_mode" onClick={(e) => handleOpen(e)}>
                    <div className="fullcontainer price_wrapper idWrapper">
                      {data && <span>{data.grand_total + 6000}₮</span>}
                      {data && <span>{data.payment_amount}₮</span>}
                    </div>
                  </div>
                ) : (
                  <div className="payment_mode" onClick={(e) => handleOpen(e)}>
                    <div className="fullcontainer price_wrapper idWrapper">
                      {data && <span>{data.grand_total}₮</span>}
                      {data && <span>{data.payment_amount}₮</span>}
                    </div>
                  </div>
                );

              case 12:
                return (
                  <div className="cancel_reason" key={field.id}>
                    <div className="fullcontainer">
                      <span className="order_desc-l">
                        {data.description && data.description.length > 0
                          ? `${JSON.parse(data.description)?.[0]?.body} (${
                              JSON.parse(data.description)?.[0]?.date?.length >
                              0
                                ? JSON.parse(data.description)?.[0]
                                    ?.date.toString()
                                    .substring(0, 10)
                                : null
                            })`
                          : null}
                      </span>
                    </div>
                  </div>
                );

              case 13:
                return (
                  <div className="phone" key={field.id}>
                    <div className="fullcontainer">
                      <span className="elips">{data.phone}</span>
                    </div>
                  </div>
                );

              case 7:
                return (
                  <div className="merchant" key={field.id}>
                    <div className="fullcontainer">
                      <span className="elips">{data.tradeshop_name}</span>
                    </div>
                  </div>
                );

              case 15:
                return (
                  <div className="business_type" key={field.id}>
                    <div className="fullcontainer">
                      <span className="elips">{businessTypeName}</span>
                    </div>
                  </div>
                );

              case 16:
                return (
                  <div className="tradeshop_city" key={field.id}>
                    <div className="fullcontainer">
                      {location ? (
                        <span>{location.location_name}</span>
                      ) : (
                        <span>Байршил олдсонгүй</span>
                      )}
                    </div>
                  </div>
                );

              case 17:
                return (
                  <div className="tradeshop_district" key={field.id}>
                    <div className="fullcontainer">
                      {location2 ? (
                        <span>{location2.location_name}</span>
                      ) : (
                        <span>Байршил олдсонгүй</span>
                      )}
                    </div>
                  </div>
                );

              case 18:
                return (
                  <div className="tradeshop_horoo" key={field.id}>
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
                );

              case 19:
                return (
                  <div className="full_address" key={field.id}>
                    <div className="fullcontainer">
                      <span className="elips">{data.address}</span>
                    </div>
                  </div>
                );

              case 20:
                return (
                  <div className="payment_type" key={field.id}>
                    <div className="fullcontainer">
                      <span>Дансаар</span>
                    </div>
                  </div>
                );

              case 21:
                return (
                  <div className="pick_pack" key={field.id}>
                    <div className="fullcontainer">
                      <span>Pickpack</span>
                    </div>
                  </div>
                );

              case 22:
                return (
                  <div className="origin" key={field.id}>
                    <div className="fullcontainer">
                      <span>{data.origin}</span>
                    </div>
                  </div>
                );

              case 23:
                return (
                  <div className="vat" key={field.id}>
                    <div className="fullcontainer">
                      <span>VAT</span>
                    </div>
                  </div>
                );

              case 33:
                return (
                  <div className="salesman" key={field.id}>
                    <div className="fullcontainer">
                      <span>{data.sales_man}</span>&nbsp;
                      <span>{props?.salesmanFirstname || ""}</span>
                    </div>
                  </div>
                );

              case 28:
                return (
                  <div className="deliveryman" key={field.id}>
                    <div className="fullcontainer">
                      <span>{data.deliver_man}</span>&nbsp;
                      <span>{props?.firstname || ""}</span>
                    </div>
                  </div>
                );

              case 25:
                return (
                  <div className="manager" key={field.id}>
                    <div className="fullcontainer">
                      <span>manager</span>
                    </div>
                  </div>
                );

              case 32:
                return (
                  <div className="butsaalt" key={field.id}>
                    <div className="fullcontainer">
                      <span>butsaalt</span>
                    </div>
                  </div>
                );

              case 34:
                return (
                  <div className="order_supplier" key={field.id}>
                    <div className="fullcontainer">
                      <span
                        className="statusbar"
                        style={{ backgroundColor: color, color: fontColor }}
                      >
                        {name}
                      </span>
                    </div>
                  </div>
                );

              default:
                return;
            }
          })}

        <div className="delete">
          <div className="fullcontainer">
            <button
              className="delete_order"
              onClick={() => orderDeleteHandler(data.order_id)}
            >
              Устгах
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <OrderDetail isOpen={isOpen} onClose={handleClose}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
            Захиалгын дугаар {data.order_id}
          </h2>
          <div className="delguur">
            <div className="delguur_top">
              <span>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="28" height="28" rx="4" fill="#F2F2F2" />
                  <path
                    d="M20.5863 13.584V19.7211C20.5863 20.6673 19.8121 21.4415 18.8659 21.4415H9.47043C8.52419 21.4415 7.75 20.6673 7.75 19.7211V15.6673"
                    stroke="#4D4D4D"
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.88731 7.33398C8.32817 7.33398 7.81204 7.67807 7.64 8.1942L6.60774 11.1619C6.22064 12.2372 6.90882 13.2265 8.15613 13.2265C9.05935 13.2265 9.96258 12.7103 10.3927 11.9791C10.6077 12.7103 11.2959 13.2265 12.1991 13.2265C13.1024 13.2265 13.8766 12.7103 14.2206 11.9791C14.5647 12.7103 15.3389 13.2265 16.2421 13.2265C17.1454 13.2265 17.8335 12.7103 18.0486 11.9791C18.5217 12.7103 19.3819 13.2265 20.2852 13.2265C21.5325 13.2265 22.1776 12.2802 21.7905 11.1619L20.8873 8.1942C20.7153 7.67807 20.1991 7.33398 19.683 7.33398H8.88731Z"
                    stroke="#4D4D4D"
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.0817 21.0827L16.0817 17.4295C16.0817 16.4402 15.2645 15.666 14.3183 15.666H14.1463C13.157 15.666 12.3828 16.4832 12.3828 17.4295L12.3828 21.0827"
                    stroke="#4D4D4D"
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="delguur_name">{data.tradeshop_name}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                fontSize: "12px",
              }}
            >
              {" "}
              <span style={{ fontWeight: "bold" }}>Хаяг:</span>
              {data.address}
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                fontSize: "12px",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                Регистр:
              </span>
              {data.supplier_register}
              <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                Утас:{" "}
              </span>{" "}
              {data.phone}
            </div>
            <div className="delguur_btm">
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                <span>
                  <span style={{ fontSize: "10px" }}>Захиалсан:</span> <br />
                  <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                    {data.order_date.split("T")[0]}
                  </span>{" "}
                </span>
                <span>
                  <span style={{ fontSize: "10px" }}>Хүргүүлэх өдөр:</span>{" "}
                  <br />{" "}
                  <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                    {data.delivery_date.split("T")[0]}
                  </span>{" "}
                </span>
                <span className="tulsun">
                  <span style={{ fontSize: "10px" }}>Төлсөн:</span>
                  {payment.edit ? (
                    <input
                      value={payment.paid}
                      style={{ fontSize: "12px", width: "70px" }}
                      onChange={(e) => {
                        let price = changePrice(e);
                        setPayment((prev) => ({
                          ...prev,
                          paid: price,
                          balance: payment.all - price,
                        }));
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "12px", color: "#2AB674" }}>
                      {payment.paid}₮
                    </span>
                  )}
                </span>
                <span className="uldsen">
                  <span style={{ fontSize: "10px" }}>
                    Үлдэгдэл:
                    {payment.edit ? (
                      <input
                        value={payment.balance}
                        style={{
                          fontSize: "13px",
                          width: "70px",
                          height: "33px",
                        }}
                        onChange={(e) => {
                          let price = changePrice(e);
                          setPayment((prev) => ({
                            ...prev,
                            balance: changePrice(e),
                            paid: payment.paid - price,
                          }));
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#DA1414",
                          marginTop: "-3px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#DA1414",
                            marginTop: "-3px",
                          }}
                        >
                          {" "}
                          {payment.balance}₮
                        </div>
                      </span>
                    )}
                  </span>
                </span>
                <span>
                  <span style={{ fontSize: "12px" }}>Захиалгын нийт дүн </span>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {payment.all}₮
                  </span>
                </span>
                <div
                  className="btn_edit"
                  onClick={() => {
                    updatePayment();
                  }}
                >
                  {payment.edit ? "" : ""}
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.57797 2.54688H6.46214C3.89964 2.54688 2.29297 4.36104 2.29297 6.92938V13.8577C2.29297 16.426 3.89214 18.2402 6.46214 18.2402H13.8155C16.3863 18.2402 17.9855 16.426 17.9855 13.8577V10.501"
                      stroke="#808080"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.3575 9.32242L13.585 3.09492C14.3608 2.31992 15.6183 2.31992 16.3942 3.09492L17.4083 4.10909C18.1842 4.88492 18.1842 6.14326 17.4083 6.91826L11.1508 13.1758C10.8117 13.5149 10.3517 13.7058 9.87167 13.7058H6.75L6.82833 10.5558C6.84 10.0924 7.02917 9.65076 7.3575 9.32242Z"
                      stroke="#808080"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.6367 4.05664L16.4417 7.86164"
                      stroke="#808080"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: "10px", display: "flex", gap: "145px" }}>
                <span>
                  <span style={{ fontSize: "10px" }}>ХТ:</span>
                  {}
                </span>
                <span>
                  <span style={{ fontSize: "10px" }}>Түгээгч:</span>
                  <span style={{ fontWeight: "bold", fontSize: "10px" }}>
                    {data.deliver_man}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="tabs-container">
            <div className="tabs-header">
              <div
                className={`tab-item ${activeTab === 1 ? "active" : ""}`}
                onClick={() => handleTabbClick(1)}
              >
                Захиалга
              </div>
              <div
                className={`tab-item ${activeTab === 2 ? "active" : ""}`}
                onClick={() => handleTabbClick(2)}
              >
                Мэдэгдэл
              </div>
              <div
                className={`tab-item ${activeTab === 3 ? "active" : ""}`}
                onClick={() => handleTabbClick(3)}
              >
                Лог
              </div>
              <div
                className={`tab-item ${activeTab === 4 ? "active" : ""}`}
                onClick={() => handleTabbClick(4)}
              >
                Тэмдэглэл
              </div>
            </div>
            <div className="tab-content">
              {activeTab === 1 && (
                <div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="add_product" onClick={openAddPopup}>
                      Бүтээгдэхүүн нэмэх
                    </button>
                    <button className="add_product" onClick={() => save()}>
                      Хадгалах
                    </button>
                  </div>
                  <ProductModal
                    orderId={data.order_id}
                    close={closeAddPopup}
                    submit={(e) => {
                      ProductAddHandler(e);
                    }}
                    supId={data.supplier_id}
                    ids={ids}
                    open={isAddPopupOpen}
                  />

                  <div className="line-section">
                    {data.line.map((product) => {
                      let edited = editedOrder.filter(
                        (e) => e.order_detail_id == product.order_detail_id
                      );
                      return (
                        <div
                          key={product.order_detail_id}
                          className="product-line"
                        >
                          <img
                            src={product.product_image}
                            alt={product.product_name}
                          />
                          <div className="product-info">
                            <div style={{ fontSize: "12px" }}>
                              {product.product_name}
                            </div>

                            <div className="line-btm" style={{ gap: "10px" }}>
                              {edited.length > 0 && (
                                <>
                                  <span style={{ fontWeight: "bold" }}>
                                    {" "}
                                    {Math.floor(edited[0].price)}₮
                                  </span>
                                  <span>*{edited[0].quantity}</span>
                                  <span style={{ fontWeight: "bold" }}>
                                    =
                                    {Math.floor(
                                      edited[0].price * edited[0].quantity
                                    )}
                                    ₮
                                  </span>
                                </>
                              )}
                              <>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: edited.length > 0 ? "red" : "black",
                                  }}
                                >
                                  {" "}
                                  {Math.floor(product.price)}₮
                                </span>
                                <span
                                  style={{
                                    color: edited.length > 0 ? "red" : "black",
                                  }}
                                >
                                  *{product.quantity}
                                </span>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: edited.length > 0 ? "red" : "black",
                                  }}
                                >
                                  =
                                  {Math.floor(product.price * product.quantity)}
                                  ₮
                                </span>
                              </>

                              <div
                                style={{
                                  fontSize: "12px",
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <span>SKU:</span>
                                {product.product_sku}
                                <span style={{ fontSize: "12px" }}>
                                  Barcode:{product.product_bar_code}
                                </span>
                              </div>
                            </div>

                            <div
                              onClick={() => {
                                setEdit((prev) => ({
                                  ...prev,
                                  product_id: product.product_id,
                                  order_detail_id: product.order_detail_id,
                                  price: product.price,
                                  quantity: product.quantity,
                                }));
                              }}
                              className="edit_b"
                            >
                              <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.57797 2.54688H6.46214C3.89964 2.54688 2.29297 4.36104 2.29297 6.92938V13.8577C2.29297 16.426 3.89214 18.2402 6.46214 18.2402H13.8155C16.3863 18.2402 17.9855 16.426 17.9855 13.8577V10.501"
                                  stroke="#808080"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7.3575 9.32242L13.585 3.09492C14.3608 2.31992 15.6183 2.31992 16.3942 3.09492L17.4083 4.10909C18.1842 4.88492 18.1842 6.14326 17.4083 6.91826L11.1508 13.1758C10.8117 13.5149 10.3517 13.7058 9.87167 13.7058H6.75L6.82833 10.5558C6.84 10.0924 7.02917 9.65076 7.3575 9.32242Z"
                                  stroke="#808080"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M12.6367 4.05664L16.4417 7.86164"
                                  stroke="#808080"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          {/* <button
                onClick={() =>
                  edit == undefined &&
                  edit?.order_detail_id == product.order_detail_id
                    ? setEdit({
                        order_detail_id: product.order_detail_id,
                        price: product.price,
                        quantity: product.quantity,
                      })
                    : editData()
                }
              >
                {edit == undefined &&
                edit?.order_detail_id == product.order_detail_id
                  ? "edit"
                  : "done"}
              </button> */}
                        </div>
                      );
                    })}
                    <div className="btn_btm">
                      <button
                        onClick={() => {
                          if (cancelReasonData?.length == 0) getCancelReason();
                          if (cancelReason == undefined) {
                            setCancelReason(0);
                          }
                          setStatusAlert(1);
                        }}
                      >
                        Захиалга цуцлах
                      </button>
                      <button onClick={() => setStatusAlert(2)}>
                        {
                          getChangeStatusThemes(
                            data?.shipmentStatus == 14 ||
                              data?.shipmentStatus == 15
                              ? data.shipmentStatus
                              : data.status
                          )?.name
                        }
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div className="notif">
                  <div className="notif_head">Push notification</div>
                  <div className="notif_ctr">
                    <p>
                      Таны Шуурхай түгээлт-д хийсэн захиалга баталгаажиж ХХ-ХХ
                      өдөр хүргэгдэхээр боллоо. eBazaar.mn - 77071907
                    </p>
                  </div>
                  <div className="notif_head">Notification log</div>
                </div>
              )}
              {activeTab === 3 && <div>content for Tab 3</div>}
              {activeTab === 4 && (
                <NoteOrderDetail
                  note={foo}
                  setFoo={setFoo}
                  id={data.order_id}
                  userData={props.userData}
                />
              )}

              {console.log(props.userData)}
              <Modal
                cancel={() => setEdit(undefined)}
                payload={edit}
                save={() => editData()}
                open={edit != undefined}
                onChange={(e, key) => {
                  setEdit((prev) => ({
                    ...prev,
                    [key]: changePrice(e),
                  }));
                }}
              />
              <Dialog
                cancel={() => setStatusAlert(0)}
                payload={
                  getChangeStatusThemes(
                    data?.shipmentStatus == 14 || data?.shipmentStatus == 15
                      ? data.shipmentStatus
                      : data.status
                  ).name
                }
                save={() => {
                  if (statusAlert == 1) {
                    cancel();
                  } else {
                    submit();
                  }
                }}
                open={statusAlert != 0}
                type={statusAlert}
                onChange={(e) => {}}
              >
                {statusAlert == 1 && (
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  >
                    {cancelReasonData?.map((it, index) => {
                      return (
                        <option key={index} value={index}>
                          {it.name} : {it.reason}
                        </option>
                      );
                    })}
                  </select>
                )}
              </Dialog>
            </div>
          </div>
        </OrderDetail>
      )}
    </div>
  );
};

export default Order;

export const Dialog = ({
  open,
  children,
  payload,
  cancel,
  save,
  type,
  onChange,
}) => {
  if (!open) return null;

  return (
    <section className="modal">
      <article className="modal-content p-lg-4">
        <div className="exit-icon text-end">
          {/* <IoMdClose onClick={onClose} /> */}
          <button onClick={cancel}>Хаах</button>
        </div>
        <main className="modal-maincontentss">
          <span>
            Та статусыг {type == 1 ? "устгагдсан" : payload.toLowerCase()}{" "}
            болгохдоо итгэлтэй байна уу
          </span>
          {children}
          <div className="modal-button">
            <button onClick={cancel}>Цуцлах</button>
            <button onClick={save}>Хадгалах</button>
          </div>
        </main>
      </article>
    </section>
  );
};

export const Modal = ({ open, payload, cancel, save, onChange }) => {
  if (!open) return null;
  return (
    <section className="modal">
      <article className="modal-content p-lg-4">
        <div className="exit-icon text-end">
          {/* <IoMdClose onClick={onClose} /> */}
          <button onClick={cancel}>Хаах</button>
        </div>
        <main className="modal-maincontents">
          <label>Price:</label>
          <input
            value={Math.floor(payload.price)}
            onChange={(e) => onChange(e, "price")}
          />
          <label>Quantity:</label>
          <input
            value={payload.quantity}
            onChange={(e) => onChange(e, "quantity")}
          />

          <span>
            {payload.price}₮ * {payload.quantity} =
            {Math.floor(payload.price * payload.quantity)}₮
          </span>
          <div className="modal-button">
            <button onClick={cancel}>Цуцлах</button>
            <button onClick={save}>Хадгалах</button>
          </div>
        </main>
      </article>
    </section>
  );
};
