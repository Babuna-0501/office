import React, { useState, useEffect } from "react";
import ProductAvatar from "../components/productImg/productImg";
import Channel from "../data/info";
import "./style.css";
import getColorForStatus, { getChangeStatusThemes } from "../components/color";
import LocationData from "../data/location.json";
import OrderDetail from "../components/orderDetail/orderDetail";
import myHeaders from "../../components/MyHeader/myHeader";
import { ProductModal } from "../components/product/modal";

const Order = (props) => {
  const [filteredData, setFilteredData] = useState([]);
  const data = filteredData.length ? filteredData : props.data;

  //Түгээгчийн попап
  const { color, name, fontColor } = getColorForStatus(
    data?.shipmentStatus == 14 || data?.shipmentStatus == 15
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
    } catch (error) { }
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
      let raw = JSON.stringify({
        orderId: data.order_id,
        data: {
          prePayment: payment.paid,
        },
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://api2.ebazaar.mn/api/orderdata/update ", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("payment update", result);

          document.location.reload();
        });
    }
    setPayment((prev) => ({ ...prev, edit: !payment.edit }));
  };
  const cancel = async () => {
    try {
      let body = {
        order_id: data.order_id,
        order_status: 5,
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

  const submitShipmentStatus = async (order_id, code) => {
    try {
      console.log(order_id, code);
    } catch (error) {}
  };

  const submit = async () => {
    try {
      const { code } = getChangeStatusThemes(
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
    } catch (error) {
      alert("Амжилтгүй");
      console.log(error);
    }
  };
  return (
    <div className="WrapperOut">
      <div className="order col_wrapper" onClick={(e) => handleOpen(e)}>
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
            <span>{Math.floor(data.grand_total)}₮</span>
            <span>{Math.floor(data.payment_amount)}₮</span>
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
          <div className="fullcontainer" style={{ height: "auto" }}>
            <span dangerouslySetInnerHTML={{ __html: data.phone.replace(/,/g, "<br />") }}></span>
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
            <span>{data.sales_man_employee_id}</span>&nbsp;
            <span>{props?.salesmanFirstname || ""}</span>
          </div>
        </div>
        <div className="deliveryman">
          <div className="fullcontainer">
            <span>{data.deliver_man}</span>&nbsp;
            <span>{props?.firstname || ""}</span>
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
                  { }
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
                  <button className="add_product" onClick={openAddPopup}>
                    Бүтээгдэхүүн нэмэх
                  </button>
                  <button className="add_product" onClick={() => save()}>
                    Хадгалах
                  </button>

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

                            <button
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
                            </button>
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
                      <button onClick={cancel}>Захиалга цуцлах</button>
                      <button onClick={submit}>
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
              {activeTab === 3 && <div>Content for Tab 3</div>}
              {activeTab === 4 && <div>Content for Tab 4</div>}
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
            </div>
          </div>
        </OrderDetail>
      )}
    </div>
  );
};

export default Order;

export const Modal = ({ open, payload, cancel, save, onChange }) => {
  if (!open) return null;
  return (
    <section className="modal">
      <article className="modal-content p-lg-4">
        <div className="exit-icon text-end">
          {/* <IoMdClose onClick={onClose} /> */}
          <button onClick={cancel}>Хаах</button>
        </div>
        <main className="modal-mainContents">
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
