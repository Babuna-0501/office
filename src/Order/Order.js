import React, { useState, useEffect, useContext } from "react";
// import Detail from "./Detail";
import myHeaders from "../components/MyHeader/myHeader";
import Note from "./Note";
import DeliveryDate from "./DeliveryDate";
import PushNotification from "./PushNotification";
import FMCG from "./FMCG";
import Upoint from "./Upoint";
import StatusChange from "./StatusChange/StatusChange";
import { styles } from "./style";
import ProductAvatar from "./ProductAvatar/ProductAvatar";
import { Popconfirm, message } from "antd";
import XTcompany, { TugeegchCompany } from "./XTcompany";
import UpointHistory from "./UpointHistory";
// import delivery_cancel from "../assets/car delivery canceled.svg";
// import car_delivery from "../assets/car delivery 01.svg";
import car_delivery_waiting from "../assets/building warehouse.svg";
// import car_delivery_done from "../assets/car delivered.svg";
// import checkbox from "../assets/check box.svg";
// import checkboxon from "../assets/Tick Square on.svg";
import downred from "../assets/red-arrow-down-red.svg";
import upgreen from "../assets/red-arrow-up-green.svg";
import TabIndex from "./Tabs/TabIndex";
import css from "./order.module.css";

import Vatmodal from "./VatModal/Vatmodal";
import Orderlog from "./Log/Orderlog";
import Tugeegch from "./Tugeegch/Tugeegch";
import { originData } from "./Index";
import { Button } from "../components/common";

const Order = (data) => {
  const {
    userData,
    buramhanworks: accounts,
    data: myOrder,
    checked,
    checkHandler,
    shipments,
    inventories,
    fieldsData,
  } = data;

  let [order, setOrder] = useState({});
  const [orderdata, setOrderdata] = useState([]);
  const [total, setTotal] = useState("");

  const permission = Object.values(JSON.parse(data.userData.permission))[0];

  let [notes, setNotes] = useState(null);
  let [lines, setLines] = useState(null);
  let [deliveryDate, setDeliveryDate] = useState(null);
  const [upointBasket, setUpointBasket] = useState(false);
  const [upointHistory, setUpointHistory] = useState(false);
  const [upointDataInfo, setUpointDataInfo] = useState(null);
  const [pickpuckbtn, setPickpuckbtn] = useState(false);
  let [foo, setFoo] = useState("");
  //   console.log("FOO: ",foo)
  let [fmcg, setFmcg] = useState(null);
  let [push, setPush] = useState(false);
  const [vatModal, setVatModal] = useState(false);
  const [channel, setChannel] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [active, setActive] = useState(null);
  // const [agreement, setAgreement] = useState(false);
  const [statusColor, setStatusColor] = useState(null);
  const [statusData, setStatusData] = useState([]);
  // const [xtvalue, setXtvalue] = useState(null);
  const [log, setLog] = useState([]);
  const [logtrue, setLogtrue] = useState(false);
  const [onelog, setOnelog] = useState([]);
  // const [onext, setOnext] = useState(data?.buramhanworks);
  // const [xtburamhan, setXtburamhan] = useState([]);
  // const [chosedxt, setChosedxt] = useState([]);
  const [displayDelete, setDisplayDelete] = useState(false);
  const [chosedTugeegch, setChosedTugeegch] = useState(null);
  const [tugeegchdata, setTugeegchdata] = useState([]);
  const [orderTabOpen, setOrderTabOpen] = useState(false);

  // const [tugeegchperson, setTugeegchperson] = useState([]);
  // const [xtperson, setXtperson] = useState([]);

  const [orderTugeegch, setOrderTugeegch] = useState(null);
  const [orderXT, setOrderXT] = useState(null);
  const [selectedXT, setSelectedXT] = useState("");
  const [pricedown, setPricedown] = useState(0);

  const [orderShipment, setOrderShipment] = useState(null);
  const [rawTotal, setRawTotal] = useState(null);
  const [phoneOk, setPhoneOk] = useState(true);

  const [hasNotif, setHasNotif] = useState(null);

  const [description, setDescription] = useState(data.data.description);

  useEffect(() => {
    if (description === null && data.data.status === 3) {
      let d = new Date();
      fetch("https://api2.ebazaar.mn/api/order/update_note", {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          order_id: data.data.order_id,
          order_note: "Хүргэсэн",
        }),
      })
        .then((r) => r.text())
        .then((res) => {
          console.log("noteRes", res);
        })
        .catch((err) => console.log("NOTE ERR: ", err));
    }

    if (data.data.status === 2) {
      fetch(
        `https://api2.ebazaar.mn/api/notification/get?userId=${data.data.user_id}&body=${data.data.order_id}`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        }
      )
        .then((r) => r.json())
        .then((res) => {
          if (res.data.length > 0) {
            setHasNotif(true);
          } else {
            setHasNotif(false);
          }
        })
        .catch((err) => console.log("ERROR: ", err));
    }
  }, []);

  // console.log("USER: ", data.data.user_id);

  // console.log("HASNOTIF.CHECK", hasNotif);

  // console.log("XTcompany++++++++++++++++", data);

  const StatusDataHI = [
    { id: 1, backgroundColor: "#eceff1" },
    { id: 2, backgroundColor: "#00add0" },
    { id: 3, backgroundColor: "#58dd42" },
    { id: 4, backgroundColor: "#EB5E43" },
    { id: 5, backgroundColor: "red" },
    { id: 6, backgroundColor: "green" },
    { id: 7, backgroundColor: "#D6DF2A" },
    { id: 8, backgroundColor: "#D6DF2A" },
    { id: 9, backgroundColor: "#D6DF2A" },
    { id: 10, backgroundColor: "#D6DF2A" },
    { id: 11, backgroundColor: "#D6DF2A" },
    { id: 12, backgroundColor: "#D6DF2A" },
    { id: 13, backgroundColor: "#D6DF2A" },
  ];

  useEffect(() => {
    // console.log(tradeShopList);

    function distance(lat1, lon1, lat2, lon2) {
      var R = 6371000; // m (change this constant to get miles)
      var dLat = ((lat2 - lat1) * Math.PI) / 180;
      var dLon = ((lon2 - lon1) * Math.PI) / 180;
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      // if (d > 1) return Math.round(d) + "km";
      // else if (d <= 1) return Math.round(d * 1000) + "m";

      return d;
    }
    // console.log("Data", data);
    let supID =
      data.userData.company_id.replaceAll("|", "") == 1
        ? 13884
        : data.userData.company_id.replaceAll("|", "");

    data.tradeShopList.map((x) => {
      x[Number(supID)]?.tradeshops.map((t) => {
        if (Number(t.tradeshop_id) === Number(data.data.tradeshop_id)) {
          let lat1 = data.data.latitude;
          let lon1 = data.data.longitude;
          let lat2 = t.address.coordinate[1];
          let lon2 = t.address.coordinate[0];
          let zai = distance(
            Number(lat1),
            Number(lon1),
            Number(lat2),
            Number(lon2)
          );

          if (Number(zai) < 50) {
            setPhoneOk(true);
          } else {
            setPhoneOk(false);
          }
        }
      });
    });
  }, [data.data]);

  useEffect(() => {
    let totalaa = 0;
    let rawtotal = 0;
    let aa = JSON.parse(JSON.stringify(data.data));
    // console.log("DATA2", data.data);

    aa.line.map((l) => {
      totalaa += Number(l.quantity) * parseFloat(l.price.toFixed(2));
    });
    setOrder(aa);
    // console.log("asd", aa);
    if (aa.order_data !== null || aa.order_data !== "") {
      try {
        setOrderdata(JSON.parse(aa.order_data));
        // console.log("TFAA", aa);
      } catch (error) {
        console.log("error", error);
      }
    }

    if (aa.raw_order) {
      let rawdata = JSON.parse(aa.raw_order.toLowerCase());
      rawdata.map((item) => {
        rawtotal += Number(item.quantity) * Number(item.price);
      });
    }

    // console.log("RAWTOTAL", rawtotal);
    // console.log("totalaa", totalaa);
    if (totalaa == rawtotal) {
      setPricedown(0);
    } else if (totalaa > rawtotal) {
      setPricedown(1);
    } else if (totalaa < rawtotal) {
      setPricedown(2);
    }
    setRawTotal(rawtotal);

    setTugeegchdata(data.tugeegch);
    setFoo(aa.description);

    setTotal(Number(totalaa));
    setStatusData(data.statusData);
  }, [data]);

  useEffect(() => {
    /// nohtsol shalgah
    /// console.log("order data hebleh", data);
    // if (
    //   // data.userData.company_id === "|1|" ||
    //   // data.userData.company_id === "|13954|"
    //   data.userData.company_id === "|1|"
    // ) {
    //   fetch(
    //     `https://api2.ebazaar.mn/api/get/backofficelog?entry_id=${Number(
    //       data?.data?.order_id
    //     )}`,
    //     {
    //       method: "GET",
    //       headers: myHeaders,
    //       redirect: "follow",
    //     }
    //   )
    //     .then((res) => res.json())
    //     .then((res) => {
    //       // console.log("res.data", res.data);
    //       setLog(res.data);
    //     })
    //     .catch((error) => {
    //       console.log("error-backofficelog error", error);
    //     });
    // }
  }, [order]);

  const confirmOrder = ({ orderId, status }) => {
    if (status !== 2) {
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          order_id: orderId,
          order_status: 2,
        }),
      };

      let url = `https://api2.ebazaar.mn/api/order/status`;
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          console.log("====================", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      alert("Баталгаажсан захиалга байна");
    }
  };

  let statusCircle = null;

  let foobarblah = order.status;
  // const activeHandler = index => {
  // 	setActive(index);
  // };

  ///// cirlce
  switch (foobarblah) {
    case 1:
      statusCircle = (
        <span
          className={`${css.statusorder} ${css.pending}`}
          style={{
            width: "20px",
            height: "20px",
          }}
        ></span>
      );
      break;
    case 2:
      statusCircle = (
        <span
          className={`${css.statusorder} ${css.confirmed}`}
          style={{
            width: "20px",
            height: "20px",
          }}
        ></span>
      );
      break;
    case 3:
      statusCircle = (
        <span
          className={`${css.statusorder} ${css.shipped}`}
          style={{
            width: "20px",
            height: "20px",
          }}
        ></span>
      );
      break;

    case 4:
      statusCircle = (
        <span
          className={`${css.statusorder} ${css.paid}`}
          style={{
            width: "20px",
            height: "20px",
          }}
        ></span>
      );
      break;
    case 5:
      statusCircle = (
        <span
          className={`${css.statusorder} ${css.cancelled}`}
          style={{
            width: "20px",
            height: "20px",
          }}
        ></span>
      );
      break;
    case 6:
      statusCircle = (
        <span
          className={`${css.statusorder} ${css.edited}`}
          style={{
            width: "20px",
            height: "20px",
          }}
        ></span>
      );
      break;
    default:
      break;
  }

  let locations = data.locations;
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

  useEffect(() => {
    if (data.businessType) {
      data.businessType.map((type) => {
        if (type.business_type_id === parseInt(data.data.business_type_id)) {
          setChannel(type.business_type_name);
        }
      });
    }
  }, [data]);

  const upointHandler = () => {
    if (permission.upoint.admin) {
      setUpointBasket(true);
    } else {
      setUpointBasket(false);
    }
  };

  const upointHistoryHandler = () => {
    if (permission.upoint.admin) {
      setUpointHistory(true);
    } else {
      setUpointHistory(false);
    }
  };

  const vatHandler = () => {
    setVatModal(true);
  };

  useEffect(() => {
    if (order.upoint_bonus_amount && order.upoint_consume_amount) {
      let upointInfo = (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              background: "#CFD8DC",
              color: "#F6F7F8",
              fontSize: "12px",
              fontWeight: 700,
              paddingTop: "3px",
              paddingBottom: "3px",
              paddingRight: "6px",
              paddingLeft: "6px",
              width: "51px",
              height: "22px",
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "1px",
            }}
          >
            +{order.upoint_bonus_amount}
          </span>
          <span
            style={{
              background: "#F4F3FB",
              color: "#3F60AA",
              fontSize: "12px",
              fontWeight: 700,
              paddingTop: "3px",
              paddingBottom: "3px",
              paddingRight: "6px",
              paddingLeft: "6px",
              width: "51px",
              height: "22px",
              borderTopRightRadius: "6px",
              borderBottomRightRadius: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            +{order.upoint_consume_amount}
          </span>
        </div>
      );
      setUpointDataInfo(upointInfo);
      // return;
    } else if (order.upoint_added_bonus_amount && order.upoint_consume_amount) {
      let upointInfo = (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              background: "#FBDC42",
              color: "#3F60AA",
              fontSize: "12px",
              fontWeight: 700,
              paddingTop: "3px",
              paddingBottom: "3px",
              paddingRight: "6px",
              paddingLeft: "6px",
              width: "51px",
              height: "22px",
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "1px",
            }}
          >
            +{order.upoint_added_bonus_amount}
          </span>
          <span
            style={{
              background: "#F4F3FB",
              color: "#3F60AA",
              fontSize: "12px",
              fontWeight: 700,
              paddingTop: "3px",
              paddingBottom: "3px",
              paddingRight: "6px",
              paddingLeft: "6px",
              width: "51px",
              height: "22px",
              borderTopRightRadius: "6px",
              borderBottomRightRadius: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            +{order.upoint_consume_amount}
          </span>
        </div>
      );
      setUpointDataInfo(upointInfo);
      // return;
    } else if (order.upoint_bonus_amount) {
      let upointInfo = (
        <span
          style={{
            background: "#CFD8DC",
            color: "#F6F7F8",
            fontSize: "12px",
            fontWeight: 700,
            paddingTop: "3px",
            paddingBottom: "3px",
            paddingRight: "6px",
            paddingLeft: "6px",
            width: "51px",
            height: "22px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          +{order.upoint_bonus_amount}
        </span>
      );
      setUpointDataInfo(upointInfo);
      // return;
    } else if (order.upoint_consume_amount) {
      let upointInfo = (
        <span
          style={{
            background: "#F4F3FB",
            color: "#3F60AA",
            fontSize: "12px",
            fontWeight: 700,
            paddingTop: "3px",
            paddingBottom: "3px",
            paddingRight: "6px",
            paddingLeft: "6px",
            width: "51px",
            height: "22px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          +{order.upoint_consume_amount}
        </span>
      );
      setUpointDataInfo(upointInfo);
      // return;
    } else if (order.upoint_added_bonus_amount) {
      let upointInfo = (
        <span
          style={{
            background: "#FBDC42",
            color: "#3F60AA",
            fontSize: "12px",
            fontWeight: 700,
            paddingTop: "3px",
            paddingBottom: "3px",
            paddingRight: "6px",
            paddingLeft: "6px",
            width: "51px",
            height: "22px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            marginRight: "1px",
          }}
        >
          +{order.upoint_added_bonus_amount}
        </span>
      );
      setUpointDataInfo(upointInfo);
      // return;
    } else {
      // return;
    }
  }, [
    order.upoint_bonus_amount,
    order.upoint_consume_amount,
    order.upoint_added_bonus_amount,
    order,
  ]);
  // console.log("order", order);
  // console.log("tugeegchperson", tugeegchperson);

  let phoneOne;
  let phoneTwo;
  if (order?.phone?.includes(",")) {
    phoneOne = order.phone.split(",")[0];
    phoneTwo = order.phone.split(",")[1];
  } else {
    phoneOne = order.phone;
  }

  // const detailHandler = e => {
  // 	e.preventDefault();
  // 	setLines(true);
  // };
  const ppsent = () => {
    setPickpuckbtn(true);
    let aa = order;
    aa.pickpack = '{"PPOrderID": "D65419214172","PPOrderStatus": "created"}';
    setOrder(aa);
    var raw = JSON.stringify({
      order_id: order.order_id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`https://api2.ebazaar.mn/api/pickpack/ordercreate`, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        console.log("res", res);
        if (res.code === 200) {
          let aa = order;
          aa.pickpack = "Захиалга үүссэн";
          setOrder(aa);
          alert("Амжилттай илгээлээ");
        } else {
          alert(`Алдаа гарлаа. ${res.message}`);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const editPickPack = (order) => {
    let raw = JSON.stringify({
      orderId: parseInt(order.order_id),
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // console.log("edit pick pack :", requestOptions);
    fetch(`https://api2.ebazaar.mn/api/order/recreate`, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        console.log("res pickpack", res);
        if (res.code === 200) {
          if (order.supplier_id === 13884) {
            ppsent();
          }

          message.success("Амжилттай дахин илгээлээ.");
          setDisplayDelete(true);
        } else {
          message.success("Алдаа гарлаа.");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const testDeleteHandler = (order) => {
    if (!permission.order.delete) {
      alert("Таньд захиалга устгах эрх байхгүй байна");
      // return;
    }
    let raw = JSON.stringify({
      order_id: parseInt(order.order_id),
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("test delete", requestOptions);
    fetch(`https://api2.ebazaar.mn/api/order/datechange`, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        console.log("res test delete", res);
        if (res.code === 200) {
          message.success("Амжилттай устгалаа.");
          ///// Eniig refresh hiihguigeer shiideh bolomj
          // data.appctx.setPage(["orders"]);
          setDisplayDelete(true);
          // setOrder({});
        } else {
          message.success("Алдаа гарлаа.");
        }
      })
      .catch((error) => {
        console.log("Test order delete error", error);
      });
  };

  const ppstatus = order.pickpack && JSON.parse(order.pickpack)?.PPOrderStatus;
  const detail = {
    created: "Захиалга үүссэн",
    // approved: "Захиалга баталгаажсан",
    // rejected: "Захиалгыг татгалзсан",
    // picked: "Захиалгыг ажилтан авсан",
    // received: "Агуулахын ажилтан авсан",
    // partialcomplete: "Захиалга бүрдэж байна",
    completed: "Захиалга бэлтгэгдсэн",
    // partialDelivery: "Хэсэгчлэн хүргэлтэд гарсан",
    // partialDelivered: "Хэсэгчлэн хүргэгдсэн",
    delivered: "Бараа хүргэгдсэн",
    delivery: "Хүргэлтэд гарсан",
    // driverAssigned: "Хүргэлтийн жолоочид хуваарилсан",
    // deleted: "Устгагдсан",
    // hvdriver: "Татан авалт хийгдсэн",
    // whreceiver: "Агуулах дээр бэлтгэгдэж байна",
    // whpicker: "Агуулах дээр бэлтгэгдэж байна",
    // collector: "Агуулах дээр бэлтгэгдэж байна",
    // sorter: "Агуулах дээр бэлтгэгдэж байна",
    // bthdriver: "Агуулах дээр бэлтгэгдэж байна",
    // dispatcher: "Хүргэхэд бэлэн",
    // pdriver: "Хүргэлтэд гарсан",
    // picker: "Хүргэлтэд гарсан",
    // invcontrol: "Тооллого хийгдэж байна",
    canceled: "Цуцлагдсан",
  };
  // console.log("permission?.order", permission?.order);

  useEffect(() => {
    StatusDataHI.map((x) => {
      if (Number(x.id) === Number(order.status)) {
        // console.log("order status background", x);
        setStatusColor(x.backgroundColor);
      }
    });
  }, [order.status]);

  // const handleChange = (event, index) => {
  //   // console.log("index", index);
  //   if (event.target.checked) {
  //     setActive(index);
  //   } else {
  //     setActive(null);
  //   }

  //   setAgreement(event.target.checked);
  // };

  const LogHandler = (e, order) => {
    console.log("e", e);
    console.log("e", order);
    setLogtrue(true);
    setOnelog(order);
  };

  let zeel = [
    { Id: 0, Name: "Дансаар" },
    { Id: 1, Name: "Бэлнээр" },
    { Id: 2, Name: "Зээлээр" },
    { Id: 3, Name: "Бэлэн+Данс" },
    { Id: 4, Name: "Бэлэн+Зээл" },
    { Id: 5, Name: "Данс+Зээл" },
  ];

  let zeelOne = zeel.map((item) => {
    if (
      orderdata &&
      orderdata[`payment`] &&
      orderdata[`payment`].paymentId === item.Id
    ) {
      return item.Name;
    }
  });

  // Getting XT and Tugeegch from Order
  useEffect(() => {
    const backUserIds = myOrder.back_office_user
      ? myOrder.back_office_user?.split(",").map((id) => Number(id))
      : [];

    if (
      backUserIds === null ||
      backUserIds === undefined ||
      backUserIds.length === 0
    );
    // return;

    let tugeegch = null;
    let xt = null;

    for (const id of backUserIds) {
      for (const user of accounts) {
        if (id === user.user_id) {
          if (user.role === 1 || user.role === 4) {
            xt = { ...user };
            break;
          }

          if (user.role === 2) {
            tugeegch = { ...user };
          }
        }
      }
    }
    console.log("accounts", accounts);
    console.log("myOrder", myOrder);
    for (const user of accounts) {
      if (myOrder?.deliver_man === user.user_id) {
        tugeegch = { ...user };
      }
    }

    setOrderTugeegch(tugeegch);
    setOrderXT(xt);
  }, [myOrder, accounts]);

  // Getting Shipment Info for Order
  useEffect(() => {
    let myShipment = null;

    if (shipments) {
      for (const shipment of shipments.sort(
        (a, b) => new Date(b.createDate) - new Date(a.createDate)
      )) {
        const orderIds = shipment.orders
          ? shipment.orders.split(",").map((id) => Number(id))
          : [];
        if (orderIds.includes(myOrder.order_id)) {
          myShipment = { ...shipment };
          break;
        }
      }
    }

    setOrderShipment(myShipment);
  }, [myOrder, shipments]);

  const assignXTHandler = async (value) => {
    try {
      const backUserIds = [value];

      if (orderTugeegch) {
        backUserIds.push(orderTugeegch.user_id);
      }

      const url = `https://api2.ebazaar.mn/api/order/update/`;
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          order_id: myOrder.order_id,
          backOfficeUser: backUserIds.join(","),
        }),
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.code === 200) {
        setOrderXT(accounts.find((acc) => acc.user_id === Number(value)));
        alert("ХТ амжилттай хувиарлагдлаа");
        // setOrder((prev) => ({
        //   ...prev,
        //   back_office_user: backUserIds.join(","),
        // }));
      } else {
        alert(resData.message);
      }
    } catch (error) {
      alert("ХТ Хувиарлахад алдаа гарлаа");
    }
  };
  const rowDataCopy = [
    {
      id: 1,
      rowContent: (
        <div
          key={1}
          className={css.checkcontainer}
          style={styles.checkboxcontainer}
          // onClick={upointHistoryHandler}
        >
          <input
            type="checkbox"
            // id={order.order_id}
            id="order_ids"
            checked={checked}
            onChange={(e) =>
              checkHandler(data.index, e.target.checked, order.order_id)
            }
          />

          <span
            style={{
              background: statusColor,
              padding: "2px 6px",
              borderRadius: "4px",
              color: `${statusColor === "#eceff1" ? "#37474F" : "#fff"}`,
            }}
          >
            {order.order_id}
          </span>
        </div>
      ),
    },
    {
      id: 2,
      rowContent: (
        <div
          key={2}
          className={css.checkcontainer}
          style={{
            display:
              data.userData.company_id === "|1|" ||
              data.userData.company_id === "|13954|" ||
              permission.order.read
                ? window.location.pathname === "/return"
                  ? "none"
                  : "block"
                : "none",
            ...styles.logoContainer,
          }}
          // onClick={upointHistoryHandler}
        >
          <img
            src={
              order?.supplier_logo
                ? order?.supplier_logo.replace("product", "small")
                : "https://ebazaar.mn/media/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg"
            }
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
            }}
          />
        </div>
      ),
    },
    {
      id: 3,
      rowContent: (
        <div
          key={3}
          onClick={() =>
            order.supplier_id === 1217 ||
            order.supplier_id === 10 ||
            order.supplier_id === 4766
              ? setFmcg(true)
              : null
          }
          style={{
            display:
              data.userData.company_id === "|1|" ||
              data.userData.company_id === "|13954|" ||
              data.userData.company_id === "|14045|" ||
              permission.order.read
                ? window.location.pathname === "/return"
                  ? "none"
                  : "block"
                : "none",
            ...styles.supplierContainer,
          }}
          className={css.suppliername}
        >
          {order.supplier_name}
        </div>
      ),
    },
    {
      id: 4,
      rowContent: (
        <div
          key={4}
          onClick={() => {
            if (permission?.order?.update) {
              if (data.userData.company_id !== "|13954|") {
                setPush(true);
              }
            }
          }}
          style={styles.notifContainer}
          className={`${css.notifwrapper}`}
        >
          {hasNotif ? (
            <img
              src="https://ebazaar.mn/media/original/2479582547472339055940821288202310030158127753780103531630710938141724.png"
              alt="noti"
            />
          ) : (
            <img src="http://ebazaar.mn/icon/noti.svg" alt="noti" />
          )}
        </div>
      ),
    },
    {
      id: 5,
      rowContent: (
        <div
          key={5}
          style={{
            ...styles.orderImageContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",

            // marginLeft: data.userData.company_id === "|13954|" ? "20px" : "0px",
          }}
        >
          <div
            className={`${css.statuscontainer}`}
            onClick={() => {
              setLines(true);
            }}
          >
            {/* {statusCircle} */}
            {statusCircle === 2 ? (
              <img src={car_delivery_waiting} alt="delivery waiting" />
            ) : null}
            {statusCircle === 1 ? (
              <img src={car_delivery_waiting} alt="delivery waiting" />
            ) : null}
            {showStatus && data.index ? <StatusChange /> : null}
          </div>
          <div className={css.imagewrapper}>
            <ProductAvatar data={order} />
          </div>
        </div>
      ),
    },
    {
      id: 6,
      rowContent: (
        <div
          key={6}
          style={{
            display: "flex",
            width: "200px",
            marginRight: "10px",
          }}
        >
          <div className={css.selecterwrapper}>
            <select
              value={chosedTugeegch}
              onChange={(e) => {
                setChosedTugeegch(e.target.value);
              }}
            >
              {tugeegchdata.map((item, index) => {
                return (
                  <option key={index} value={item.first_name}>
                    {item.first_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      rowContent: (
        <div
          key={7}
          onClick={() => {
            setLines(true);
          }}
          style={{
            ...styles.orderDateContainer,
            // marginLeft: data.userData.company_id === "|13954|" ? "20px" : "0px",
          }}
          className={`${css.textcontainer} ${css.datecontainer}`}
        >
          {order.order_date
            ? order.order_date.substr(5, 5) +
              " " +
              order.order_date.substr(11, 5)
            : ""}
        </div>
      ),
    },
    {
      id: 8,
      rowContent: (
        <div
          key={8}
          onClick={() => {
            if (permission?.order?.update) {
              setDeliveryDate(true);
            }
          }}
          style={{
            ...styles.deliverDateContainer,
          }}
          className={`${css.textcontainer} ${css.deliverydatecontainer}`}
        >
          {order.delivery_date ? order.delivery_date.substr(5, 5) : ""}
        </div>
      ),
    },
    {
      id: 9,
      rowContent: (
        <div
          key={9}
          onClick={() => {
            setLines(true);
          }}
          style={{
            ...styles.totalPriceContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              marginBottom: "0px",
            }}
          >
            {" "}
            <p
              className={`${css.textcontainer} ${css.pricewrapper}`}
              style={{
                marginBottom: "0px",
              }}
            >
              {total && total?.toLocaleString()}₮{" "}
            </p>
            {data.userData.company_id === "|13987|" ||
            data.userData.company_id === "|14006|" ||
            data.userData.company_id === "|13992|" ||
            data.userData.company_id === "|13991|" ||
            data.userData.company_id === "|13994|" ||
            data.userData.company_id === "|13965|" ||
            data.userData.company_id === "|13995|" ||
            data.userData.company_id === "|4805|" ||
            data.userData.company_id === "|10683|" ||
            data.userData.company_id === "|1232|" ||
            data.userData.company_id === "|13990|" ||
            data.userData.company_id === "|13996|" ||
            data.userData.company_id === "|13993|" ||
            data.userData.company_id === "|13997|" ||
            data.userData.company_id === "|13998|" ||
            data.userData.company_id === "|14000|" ||
            data.userData.company_id === "|13999|" ? null : (
              <p
                className={`${css.textcontainer} ${css.pricewrapper}`}
                style={{
                  color: "#60A744",
                  marginBottom: "0px",
                  fontWeight: "700",
                }}
              >
                {order.payment_amount
                  ? order.payment_amount.toLocaleString() + "₮"
                  : null}
              </p>
            )}
          </p>
          {pricedown == 0 && <div></div>}
          {pricedown == 1 && (
            <img src={upgreen} alt="down icon" className={css.container} />
          )}
          {pricedown == 2 && (
            <img src={downred} alt="down icon" className={css.container} />
          )}
        </div>
      ),
    },
    {
      id: 10,
      rowContent: (
        <div
          key={10}
          style={{
            ...styles.counponContainer,
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            setLines(true);
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "400",
              marginBottom: "0",
            }}
          >
            {rawTotal && rawTotal.toLocaleString() + "₮"}
          </p>
        </div>
      ),
    },
    {
      id: 11,
      rowContent: (
        <div
          key={11}
          onClick={() => {
            // setLines(true);
          }}
          style={{
            ...styles.counponContainer,
          }}
          className={`${css.textcontainer} ${css.couponwrapper}`}
        >
          {order.coupon_amount
            ? order.coupon_amount.toLocaleString() + "₮"
            : null}
        </div>
      ),
    },
    {
      id: 12,
      rowContent: (
        <div
          key={12}
          onClick={() => {
            if (permission?.order?.update) {
              if (data.userData.company_id !== "|13954|") {
                setNotes(true);
              }
            }
          }}
          style={{
            ...styles.noteContainer,
          }}
          className={`${css.textcontainer} ${css.notewrapper}`}
        >
          <span id={"note" + order.order_id} className={css.noted}>
            {order.description !== null && order.description !== "" ? (
              <Note note={foo} setFoo={setFoo} />
            ) : (
              <div style={{ width: "100%", color: "#fff" }}>.</div>
            )}
          </span>
        </div>
      ),
    },
    {
      id: 13,
      rowContent: (
        <div
          key={13}
          style={{
            ...styles.phoneContainer,
          }}
          onClick={() => {
            setLines(true);
          }}
          className={`${css.textcontainer} ${css.phonewrapper}`}
        >
          {phoneOne} <br />
          {phoneTwo}
        </div>
      ),
    },
    {
      id: 14,
      rowContent: (
        <div
          key={14}
          onClick={() => {
            setLines(true);
          }}
          style={{
            ...styles.channelNameContainer,
          }}
          className={`${css.textcontainer} ${css.shoppingwrapper}`}
        >
          {order.tradeshop_name}
        </div>
      ),
    },
    {
      id: 15,
      rowContent: (
        <div
          key={15}
          style={{
            ...styles.channelContainer,
          }}
          onClick={() => {
            setLines(true);
          }}
          className={`${css.textcontainer} ${css.channelwrapper}`}
        >
          {channel ? channel : ""}
        </div>
      ),
    },
    {
      id: 16,
      rowContent: (
        <div
          key={16}
          style={styles.provinceContainer}
          onClick={() => {
            setLines(true);
          }}
          className={`${css.textcontainer} ${css.provincewrapper}`}
        >
          {city}
        </div>
      ),
    },
    {
      id: 17,
      rowContent: (
        <div
          key={17}
          style={styles.districtContainer}
          onClick={() => {
            setLines(true);
          }}
          className={`${css.textcontainer} ${css.disctrictwrapper}`}
        >
          {district}
        </div>
      ),
    },
    {
      id: 18,
      rowContent: (
        <div
          key={18}
          style={{
            ...styles.khorooContainer,
          }}
          onClick={() => {
            setLines(true);
          }}
          className={`${css.textcontainer} ${css.khoroowrapper}`}
        >
          {khoroo}
        </div>
      ),
    },
    {
      id: 19,
      rowContent: (
        <div
          key={19}
          style={{
            color: "#37474f",
            // lineHeight: "0.96",
            ...styles.khorooContainer,
          }}
          onClick={() => {
            setLines(true);
          }}
          className={`${css.textcontainer} ${css.addreswrapper}`}
          title={order.address}
        >
          {(order.status === 1 || order.status === 5) &&
          data.userData.company_id !== "|1|"
            ? data.userData.company_id === "|13901|"
              ? order.address
              : "******** ******** ********"
            : order.address}
        </div>
      ),
    },
    {
      id: 20,
      rowContent: (
        <div
          key={20}
          style={{
            color: "#37474f",
            paddingLeft: "10px",
            display: window.location.pathname === "/return" ? "none" : "flex",
            alignItems: "center",

            ...styles.lendWrapper,
          }}
          className={`${css.textcontainer} ${css.lendwrapper}`}
        >
          <span
            style={{
              width: "80px",
              fontSize: "12px",
              fontWeight: "400",
              color: "#37474F",
            }}
          >
            {" "}
            {zeelOne ? zeelOne : ""}
          </span>
        </div>
      ),
    },
    {
      id: 21,
      rowContent: (
        <div
          key={21}
          style={{
            display: data.userData.company_id === "|1|" ? "flex" : "none",

            ...styles.pickpackContainer,
          }}
          className={css.btncontainer}
        >
          {order.supplier_id === 13884 && order.pickpack === null ? (
            <button
              onClick={() => ppsent()}
              className={css.pickpacktbn}
              disabled={pickpuckbtn}
            >
              Илгээх
            </button>
          ) : (
            <div style={{ fontSize: "12px", marginLeft: "20px" }}>
              {detail[ppstatus]}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 22,
      rowContent: data.userData.company_id === "|1|" && (
        <div
          key={22}
          style={{
            textAlign: "center",
            width: 80,
          }}
          className={`${css.textcontainer} ${css.khoroowrapper}`}
        >
          {originData.map((origin) => {
            if (origin.id === order.origin) {
              return origin.name;
            }
          })}
        </div>
      ),
    },
    {
      id: 23,
      rowContent: (
        <>
          <div
            key={23}
            className={`${css.textcontainer} ${css.vatbtncontainer}`}
            style={{
              ...styles.vatContainer,
              display: "flex",
            }}
          >
            <div className={css.btnvatcontainer}>
              {order.supplier_id === 13884 &&
              order.vat === null &&
              order.status === 3 ? (
                <button
                  className={css.btn}
                  style={{
                    background: "#FFA600",
                  }}
                  onClick={vatHandler}
                  disabled={order.vat !== null ? true : false}
                >
                  НӨАТ илгээх
                </button>
              ) : null}
              {order.vat && (
                <button
                  className={css.btn}
                  style={{
                    background: "#7AC046",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "10px",
                  }}
                  disabled={true}
                >
                  {order.vat}
                </button>
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      id: 24,
      rowContent: (
        <div
          key={24}
          className={`${css.textcontainer} ${css.provincewrapper}`}
          style={{ width: 120 }}
        >
          {data.data.user_date}
        </div>
      ),
    },
    {
      id: 25,
      rowContent: (
        <div
          key={25}
          className={`${css.textcontainer} ${css.provincewrapper}`}
          style={{ width: 100, padding: "0 10px" }}
        >
          {orderXT ? (
            <div className={`${css.tugeegchStatus} ${css.assigned}`}>
              Хувиарласан
            </div>
          ) : (
            <div className={`${css.tugeegchStatus} ${css.unassigned}`}>
              Хувиарлаагүй
            </div>
          )}
        </div>
      ),
    },
    {
      id: 26,
      rowContent: (
        <div
          key={26}
          className={`${css.textcontainer} ${css.xtwrapper}`}
          style={{
            width: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {orderXT ? (
            <>
              <span className={css.roleName}>
                {orderXT.role === 1 && "Худалдааны төлөөлөгч"}
                {orderXT.role === 4 && "Шууд борлуулагч"}
              </span>
              <span className={css.XTName}>{orderXT.first_name}</span>
            </>
          ) : (
            <select
              value={selectedXT}
              onChange={(e) => assignXTHandler(e.target.value)}
              style={{ width: "80%" }}
            >
              <option value={""}>Хариуцагч байхгүй</option>
              {accounts
                .filter((user) => user.role === 1)
                .map((user) => {
                  return (
                    <option value={user.user_id}>{user.first_name}</option>
                  );
                })}
            </select>
          )}
        </div>
      ),
    },
    {
      id: 27,
      rowContent: (
        <div
          key={27}
          className={`${css.textcontainer} ${css.provincewrapper}`}
          style={{ width: 120 }}
        >
          {orderXT ? orderXT.phone_number : ""}
        </div>
      ),
    },
    {
      id: 28,
      rowContent: (
        <div
          key={28}
          className={`${css.textcontainer} ${css.provincewrapper}`}
          style={{
            padding: "0 10px",
            width: 120,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {orderTugeegch ? (
            <>
              <div className={`${css.tugeegchStatus} ${css.assigned}`}>
                Хувиарласан
              </div>
              <span className={css.tugeegchName}>
                {orderTugeegch.first_name}
              </span>
            </>
          ) : (
            <div className={`${css.tugeegchStatus} ${css.unassigned}`}>
              Хувиарлаагүй
            </div>
          )}
        </div>
      ),
    },
    {
      id: 29,
      rowContent: (
        <div
          key={29}
          className={`${css.textcontainer} ${css.provincewrapper}`}
          style={{
            padding: "0 10px",
            width: 120,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <>
            {orderShipment ? (
              <>
                {orderShipment.status === 1 && (
                  <div className={`${css.shipmentStatus} ${css.pending}`}>
                    Хүлээгдэж буй
                  </div>
                )}
                {orderShipment.status === 2 && (
                  <>
                    <div className={`${css.shipmentStatus} ${css.accepted}`}>
                      Зөвшөөрөгдсөн
                    </div>
                    <span className={css.tugeegchName}>
                      {
                        inventories.find(
                          (inven) => inven._id === orderShipment.to
                        ).name
                      }
                    </span>
                  </>
                )}
                {orderShipment.status === 3 && (
                  <div className={`${css.shipmentStatus} ${css.rejected}`}>
                    Татгалзсан
                  </div>
                )}
              </>
            ) : (
              <div className={`${css.shipmentStatus} ${css.unassigned}`}>
                Хувиарлаагүй
              </div>
            )}
          </>
        </div>
      ),
    },
    {
      id: 30,
      rowContent: (
        <div
          key={30}
          style={{
            ...styles.vatContainer,
          }}
          className={`${css.textcontainer} ${css.vatbtncontainer}`}
        >
          <div className={css.btnvatcontainer}>
            <Popconfirm
              placement="left"
              title="Та энэ захиалгыг устгахдаа итгэлтэй байна уу?"
              onConfirm={() => testDeleteHandler(order)}
              okText="Тийм"
              cancelText="Үгүй"
            >
              <button
                className={css.btn}
                style={{
                  fontSize: data.userData.id === 378 && "10px",
                }}
              >
                Устгах
              </button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
    {
      id: 31,
      rowContent: (
        <div
          key={31}
          style={{
            ...styles.vatContainer,
            textAlign: "center",
          }}
          className={`${css.textcontainer} ${css.vatbtncontainer}`}
        >
          <button
            className={css.btn}
            style={{
              fontSize: data.userData.id === 378 && "10px",
              background: phoneOk ? "#ffa400" : "#2AB674",
            }}
          >
            {phoneOk ? "Очиж" : "Утас"}
          </button>
        </div>
      ),
    },
    {
      id: 32,
      rowContent: (
        <div
          key={-1}
          style={{
            ...styles.vatContainer,
            textAlign: "center",
            display: window.location.pathname === "/return" ? "block" : "none",
          }}
          className={`${css.textcontainer} ${css.vatbtncontainer}`}
        >
          <Button
            onClick={() => {
              confirmOrder({ orderId: order.order_id, status: order.status });
            }}
            className={css.confirmButton}
            // disabled={order.status === 2 && true}
            style={order.status === 2 ? { backgroundColor: "#00add0" } : {}}
          >
            {order.status === 2 ? "Баталгаажсан" : "Баталгаажуулах"}
          </Button>
        </div>
      ),
    },
  ];
  const [rowData, setRowData] = useState(rowDataCopy);
  useEffect(() => {
    // Update positions in rowData based on matching fieldsData
    const updatedData = rowDataCopy.map((row) => {
      const matchingField = fieldsData.find((field) => field.id === row.id);
      if (matchingField) {
        return {
          ...row,
          position: matchingField.position,
          permission: matchingField.permission,
          show: matchingField.show,
        };
      }
      return row;
    });
    setRowData(updatedData);
  }, [order, data]);

  if (order)
    return (
      <div style={{ width: "max-content !important" }}>
        <div
          // className="row"
          className={
            order.order_data
              ? css.orderRowContainerWithPromo
              : css.orderRowContainer
          }
          style={{
            // display:
            //   [
            //     // 802945, 803071, 803070, 802825, 803630, 804120, 804573, 802855,
            //   ].indexOf(data.data.user_id) !== -1
            //     ? "none"
            //     : "display",
            display: displayDelete ? "none" : "flex",
            background: checked ? "#F1F1FA" : "#fff",
            width: "max-content",
          }}
        >
          {/* Order ID */}

          {rowData
            .sort((a, b) => a.position - b.position)
            .map((row) => {
              if (row.permission && row.show) return row.rowContent;
            })}
          {/* Order Logo */}

          {/* Order Supplier */}

          {/* <div
          className="products"
          onClick={() => setLines(true)}
          style={{
            maxWidth: "7%",
            width: "100%",
            display: "none",
          }}
        >
          <div>{images}</div>
        </div> */}

          {/* Push Notif */}

          {/* Lines */}
          {/*  */}

          {/* order date */}

          {/* dun */}
          {/* anhnii dun */}

          {/* {permission?.upoint?.update && (
          <div
            style={{
              visibility: order.status === 50 ? "hidden" : "block",
              ...styles.upointContainer,
            }}
            onClick={upointHandler}
          >
            {upointDataInfo}
          </div>
        )} */}
          <div
            onClick={() => {
              setLines(true);
            }}
            style={{
              ...styles.paidPriceContainer,
            }}
            className={`${css.textcontainer} ${css.paidcontainer}`}
          >
            <span className={css.paidPrice}>
              {order.payment_amount
                ? order.payment_amount.toLocaleString() + "₮"
                : null}
            </span>
          </div>
          {/* coupon */}
          {/* Notes */}

          {/* phone_number */}
          {/* zahilsan */}
          {/* channel */}
          {/* city */}
          {/* district */}
          {/* khoroo */}

          {/* address */}
          {/* lend */}
          <div
            style={{
              color: "#37474f",
              paddingLeft: "10px",
              // lineHeight: "0.96",
              ...styles.lendContainer,
              display: "none",
            }}
            className={`${css.textcontainer} ${css.lendwrapper}`}
          >
            {orderdata && orderdata[`payment`]
              ? orderdata[`payment`]?.m1?.toLocaleString() + "₮"
              : ""}
          </div>
          <div
            style={{
              color: "#37474f",
              paddingLeft: "10px",
              // lineHeight: "0.96",
              ...styles.lendContainer,
              display: "none",
            }}
            className={`${css.textcontainer} ${css.lendwrapper}`}
          >
            {orderdata && orderdata[`payment`]
              ? orderdata[`payment`]?.m2?.toLocaleString() + "₮"
              : ""}
            <span>
              {orderdata && orderdata[`payment`]?.m2 ? "Хаан банк" : ""}
            </span>
          </div>
          <div
            style={{
              color: "#37474f",
              paddingLeft: "10px",
              // lineHeight: "0.96",
              ...styles.lendContainer,
              display: "none",
            }}
            className={`${css.textcontainer} ${css.lendwrapper}`}
          >
            {orderdata && orderdata[`payment`]
              ? orderdata[`payment`]?.m3?.toLocaleString() + "₮"
              : ""}
          </div>

          {/* XT and Tugeegch Infos Start */}
          {XTcompany.includes(userData.company_id) && <></>}

          {/* XT nad Tugeegch Infos End */}

          {/* pickpack */}

          {/* Origin */}

          {/* VAT */}

          <div
            style={{
              ...styles.vatContainer,
              display:
                (data.userData.id === 256 || data.userData.id === 320) &&
                order.supplier_id === 13884
                  ? "block"
                  : "none",
            }}
            className={`${css.textcontainer} ${css.vatbtncontainer}`}
          >
            {data.userData.id === 256 || data.userData.id === 320 ? (
              <div className={css.btnvatcontainer}>
                <Popconfirm
                  placement="left"
                  title="Та итгэлтэй байна уу?"
                  onConfirm={() => editPickPack(order)}
                  okText="Тийм"
                  cancelText="Үгүй"
                >
                  <button className={css.pickpackbtn}>
                    PickPack дахин илгээх
                  </button>
                </Popconfirm>
              </div>
            ) : null}
          </div>
          {data.userData.id === 351 ||
          data.userData.id === 370 ||
          data.userData.id === 435 ? (
            <div
              style={{
                color: "#37474f",
                // lineHeight: "0.96",
                ...styles.khorooContainer,
                display: "flex",
                justifyContent: "center",
              }}
              className={`${css.textcontainer} ${css.xtwrapper}`}
            >
              {log?.length !== 0 && (
                <span
                  className={css.xtnamewrapper}
                  onClick={(e) => LogHandler(e, log)}
                >
                  Харах
                </span>
              )}
            </div>
          ) : null}
        </div>
        {logtrue && (
          <Orderlog
            onelog={onelog}
            setLogtrue={setLogtrue}
            setOnelog={setOnelog}
            statusData={data.statusData}
          />
        )}
        {lines && (
          <TabIndex
            orderXT={orderXT}
            setLines={setLines}
            setNotes={setNotes}
            userData={data.userData}
            data={order}
            setOrder={setOrder}
            company={data.userData.company_id}
            locations={locations}
            businessType={data.businessType}
            appctx={data.appctx}
            setOrderTabOpen={setOrderTabOpen}
            note={foo}
            setFoo={setFoo}
            id={order.order_id}
            hasNotif={hasNotif}
            setHasNotif={setHasNotif}
          />
        )}
        {vatModal ? (
          <Vatmodal close={setVatModal} data={order} setOrder={setOrder} />
        ) : null}

        {upointBasket ? (
          <Upoint
            setUpointBasket={setUpointBasket}
            userData={data.userData}
            data={order}
            setOrder={setOrder}
            company={data.userData.company_id}
            locations={locations}
          />
        ) : null}
        {upointHistory ? (
          <UpointHistory setUpointHistory={setUpointHistory} data={order} />
        ) : null}
        {notes ? (
          <TabIndex
            orderXT={orderXT}
            setHasNotif={setHasNotif}
            hasNotif={hasNotif}
            setLines={setLines}
            setNotes={setNotes}
            userData={data.userData}
            data={order}
            setOrder={setOrder}
            company={data.userData.company_id}
            locations={locations}
            businessType={data.businessType}
            appctx={data.appctx}
            setOrderTabOpen={setOrderTabOpen}
            note={foo}
            setFoo={setFoo}
            id={order.order_id}
            active={3}
          />
        ) : null}
        {/* {lines ? (
          <Lines
            setLines={setLines}
            userData={data.userData}
            data={order}
            setOrder={setOrder}
            company={data.userData.company_id}
            locations={locations}
            businessType={data.businessType}
            appctx={data.appctx}
          />
        ) : null} */}
        {deliveryDate ? (
          <DeliveryDate
            setDeliveryDate={setDeliveryDate}
            setOrder={setOrder}
            data={order}
          />
        ) : null}
        {fmcg ? (
          <FMCG setFmcg={setFmcg} data={order} userData={data.userData} />
        ) : null}
        {push ? <PushNotification setPush={setPush} data={order} /> : null}
      </div>
    );
};

export default Order;
