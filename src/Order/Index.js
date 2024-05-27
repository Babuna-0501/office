import React, { useState, useEffect, useContext, useRef } from "react";
import List from "./List";
import ReactDOM from "react-dom";
import Report from "./Report";
import ReportSecond from "./ReportSecond";
import OrderReportHook from "../Hooks/OrderReportHook";
import notifIcon from "../assets/Notification.svg";
import upointIcon from "../assets/upoint symbol 2.svg";
import { Select } from "antd";
import OrdersHook from "../Hooks/OrdersHook";
import Suppliers from "../components/Suppliers/Suppliers";
import Modal from "../components/Modal/Modal";
import myHeaders from "../components/MyHeader/myHeader";
import { styles } from "./style";
import css from "./index.module.css";
import Footer from "./Footer/Footer";
import Districtdata from "../District.json";
import ArigJSON from "./ArigSup.json";
import XTcompany, { TugeegchCompany } from "./XTcompany";
import ReportOrec from "./ReportOrec";
import { YunaReport } from "./YunaReport";
import { ReportArig } from "./ReportArig";
import { Modal as MyModal } from "../Achiltiinzahialga/components/common";
import TugeegchAssign from "./TugeegchAssign/TugeegchAssign";
import ShipmentCreate from "./ShipmentCreate/ShipmentCreate";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";
import { ColaOrders } from "./ColaOrders";
import { OrderNegtgel } from "./OrderNegtgel/OrderNegtgel";
import { OrderReceipts } from "./OrderReceipts/OrderReceipts";
import ErrorPopup from "../Achiltiinzahialga/components/common/ErrorPopup";
import ReportDiamond from "./ReportDiamond";
import ReportBuramhan from "./ReportBuramhan";
import ReportBmTovchoo from "./ReportBmTovchoo";

export const originData = [
  { id: 1, name: "Android" },
  { id: 2, name: "iOS" },
  { id: 3, name: "Web" },
  { id: 4, name: "SFA" },
  { id: 5, name: "Base" },
  { id: 6, name: "Eclinic" },
  { id: 7, name: "OnTimePos" },
];

export const colaOrderUsers = [256, 273, 398, 320, 994];

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo(props => {
	if (props.userData.id === 378) {
		console.log("WORKING", props.userData.id);
	}

	const { setHeaderContent, setShowRefreshBtn } = useContext(HeaderContext);
	const orderCtx = useContext(OrderReportHook);
	const ordersCtx = useContext(OrdersHook);
	const {
    updateUser,
    fieldsData,
    setFieldsData,
    setCheckedOrders,
    checkedOrders,
  } = ordersCtx;
  const [suppValue, setSuppValue] = useState("");
  const [popModal, setPopModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const [selectedOrders, setSelectedOrders] = useState([]);

  /////Filter state
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
  const [orderPaymentMethod, setOrderPaymentMethod] = useState(null);
  const [locations, setLocations] = useState("");
  const [categories, setCategories] = useState("");
  const [businesType, setBusinesType] = useState([]);
  const [arigSupplier, setArigSupplier] = useState(null);
  const [buramhanajilchid, setBuramhanajilchid] = useState([]);
  const [tugeegch, setTugeegch] = useState([]);
  const [orderOrigin, setOrderOrigin] = useState(null);
  const [isTugeegch, setIsTugeegch] = useState(null);
  const [createdUser, setCreatedUser] = useState(null);
  const [hariutsagch, setHariutsagch] = useState([]);
  const [hariutsagchNer, setHariutsagchNer] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const [changedTugeegch, setChangedTugeegch] = useState(false);

  const paymentMethods = [
    { Id: 0, Name: "Дансаар" },
    { Id: 1, Name: "Бэлнээр" },
    { Id: 2, Name: "Зээлээр" },
    { Id: 3, Name: "Бэлэн+Данс" },
    { Id: 4, Name: "Бэлэн+Зээл" },
    { Id: 5, Name: "Данс+Зээл" },
  ];

  const [fields, setFields] = useState([]);

  useEffect(() => {
    console.log("selectedOrders", selectedOrders);
    setCheckedOrders(selectedOrders);
  }, [selectedOrders]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const companyId = Number(props.userData.company_id.replaceAll("|", ""));

				const url = `https://api2.ebazaar.mn/api/backoffice/users?company=${companyId}`;
				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow",
				};

				const res = await fetch(url, requestOptions);
				const resData = await res.json();

				setHariutsagch(resData.data);
				console.log("USER", resData.data);
			} catch (error) {
				console.log("error while fetching users: ", error);
			}
		};

		getUsers();
	}, []);

	useEffect(() => {
		setHeaderContent(<HeaderContent userData={props.userData} />);
		setShowRefreshBtn(true);

		return () => {
			setShowRefreshBtn(false);
			setHeaderContent(<></>);
		};
	}, []);

	useEffect(() => {
		// if (changedTugeegch) {
		getProducts();
		// }
	}, [changedTugeegch, hariutsagchNer]);

	useEffect(() => {
		ordersCtx.setUserData(props.userData);
	}, []);

	let start = ordersCtx.dateStart;
	let end = ordersCtx.dateEnd;
	if (start === null || start === undefined) {
		start = "";
	}
	if (end === null || end === undefined) {
		end = "";
	}
	// console.log("start", start);
	// console.log("end", end);

	let supplier = "";
	let phone = "";

	let searchOrderCompanyName = "";
	let searchStatus = "";

	let orderDateFrom = "";
	let orderDateTo = "";

	const [permission, setPermission] = useState(props.userData);
	const [footerdata, setFooterdata] = useState([]);

	const permissionData = Object.values(JSON.parse(permission.permission))[0];

	let orderId = "";

	// console.log("++++++++++++++++++++++++++suppValue", suppValue);
	const getProducts = () => {
    ReactDOM.render(
      <React.StrictMode>
        <List
          start={start}
          end={end}
          businessType={props.businessType}
          // supplier={supplier}
          supplier={suppValue}
          date={orderStart}
          // price={price}
          key={Math.random()}
          delivery_date={deliveryDate}
          order_end={ordersCtx.orderEnd}
          order_start={ordersCtx.orderStart}
          phone={orderPhone}
          userData={props.userData}
          orderId={orderID}
          isTugeegch={isTugeegch}
          locations={props.locations}
          orderCTX={orderCtx}
          city={orderCity}
          district={orderDistrict}
          khoroo={orderKhoroo}
          searchOrderCompanyName={searchOrderCompanyName}
          orderStatus={ordersCtx.orderStatus}
          price={orderAmount}
          bustype={orderChannel}
          tradeshopname={orderOrder}
          address={orderAddress}
          paymentMethod={orderPaymentMethod}
          setOrderReportUrl={orderCtx.setOrderReportUrl}
          setPopModal={setPopModal}
          setFooterdata={setFooterdata}
          appctx={props.appctx}
          orderDateFrom={orderDateFrom}
          orderDateTo={orderDateTo}
          arigSupplier={arigSupplier}
          buramhanajilchid={buramhanajilchid}
          setBuramhanajilchid={setBuramhanajilchid}
          origin={orderOrigin}
          setTugeegchBtnDisabled={orderCtx.setTugeegchBtnDisabled}
          setShipmentBtnDisabled={orderCtx.setShipmentBtnDisabled}
          setSelectedOrders={setSelectedOrders}
          fieldsData={fieldsData}
          hariutsagchNer={hariutsagchNer}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          selectAll={selectAll}
          tugeegch={tugeegch}
        />
      </React.StrictMode>,
      document.getElementById("foobar")
    );
  };

  // console.log("appctx.userData.company_id", props);
  useEffect(() => {
    getProducts();
  }, [start, end, fieldsData]);
  useEffect(() => {
    getProducts();
  }, [
    orderStart,
    deliveryDate,
    orderID,
    orderAmount,
    orderPaid,
    orderPhone,
    orderOrder,
    orderChannel,
    orderCity,
    orderDistrict,
    orderKhoroo,
    orderAddress,
    orderPaymentMethod,
    ordersCtx.orderStart,
    ordersCtx.orderEnd,
    ordersCtx.orderStatus,
    arigSupplier,
    orderOrigin,
    selectAll,
    tugeegch,
  ]);

  useEffect(() => {
    getProducts();
    // let aa = suppliers?.filter((it) => it.name === suppValue);

    // setSuppliers(aa);
  }, [suppValue]);

  useEffect(() => {
    let controller = new AbortController();
    fetch("https://api.ebazaar.mn/api/site_data", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((response) => {
        setLocations(response.location);
        setCategories(response.categories);
        let option = [];
        response.business_types.map((item) => {
          option.push({
            id: item.business_type_id,
            value: item.business_type_name,
          });
        });

        setBusinesType(option);
        controller = null;
      })
      .catch((error) => console.log("error", error));
    return () => controller?.abort();
  }, []);

  const searchById = (e) => {
    if (e.key === "Enter") {
      orderId = e.target.value;
      getProducts();
    } else if (e.target.value.length === 0) {
      orderId = null;
      getProducts();
    }
  };
  const handleChangeArig = (e) => {
    setArigSupplier(e.target.value);
  };

  useEffect(() => {
    if (orderCity === null) {
      setOrderDistrict(null);
    }
  }, [orderCity]);

  useEffect(() => {
    if (orderDistrict === null) {
      setOrderKhoroo(null);
    }
  }, [orderDistrict]);

  useEffect(() => {
    if (selectedOrders.length > 0) {
      let allhasTugeegch = true;
      const users = [...buramhanajilchid];

      for (const order of selectedOrders) {
        const backUserIds = order.back_office_user
          ? order.back_office_user.split(",").map((id) => Number(id))
          : [];

        let hasTugeegch = false;
        for (const userId of backUserIds) {
          const user = users.find((usr) => usr.user_id === userId);

          if (user && user.role === 2) {
            hasTugeegch = true;
            break;
          }
        }

        if (!hasTugeegch) {
          allhasTugeegch = false;
          break;
        }
      }

      orderCtx.setShipmentBtnDisabled(!allhasTugeegch);
    } else if (selectedOrders.length === 0) {
      orderCtx.setShipmentBtnDisabled(true);
    }
  }, [selectedOrders, orderCtx, buramhanajilchid]);
  // console.log("props", props);

  const dragOverItem = useRef();
  const dragItem = useRef();

  const onDragEnd = () => {
    if (!dragItem || !dragOverItem) {
      console.error("Dragged item or drag-over item not available.");
      return;
    }

    const dragItemPosition = dragItem.current;
    const dragOverItemPosition = dragOverItem.current;

    const dragItemObj = fieldsData.find(
      (field) => field.position === dragItemPosition
    );
    const dragOverItemObj = fieldsData.find(
      (field) => field.position === dragOverItemPosition
    );

    if (!dragItemObj || !dragOverItemObj) {
      console.error("Dragged item or drag-over item not found.");
      return;
    }

    const updatedFieldsData = fieldsData.map((field) => {
      if (field.position === dragItemPosition) {
        return { ...field, position: dragOverItemPosition };
      } else if (field.position === dragOverItemPosition) {
        return { ...field, position: dragItemPosition };
      }
      return field;
    });

    setFieldsData(updatedFieldsData);
    updateUser({ fieldsData: updatedFieldsData });
  };

  useEffect(() => {
    const fieldsCopy = [...fieldsData];

    for (const field of fieldsCopy) {
      switch (field.id) {
        case 1:
          field.content = (
            <div
              key={field.id}
              style={{
                ...styles.checkboxcontainer,
                display: "flex",
                flexDirection: "row",
                // justifyContent: "center",
                gap: "5px",
                alignItems: "end",
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => setSelectAll(e.target.checked)}
                />
              </div>

              <div>
                <span className={css.headerTitle}>Дугаар</span>
                <input
                  type="text"
                  value={orderID}
                  onChange={(e) => setOrderID(e.target.value)}
                />
              </div>
            </div>
          );
          break;
        case 2:
          field.content = (
            <div
              key={field.id}
              style={{
                ...styles.logoContainer,
                display:
                  window.location.pathname === "/return" ? "none" : "flex",
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Logo</span>
                <input type="text" onKeyPress={(e) => searchById(e)} disabled />
              </div>
            </div>
          );
          break;
        case 3:
          field.content = (
            <div
              key={field.id}
              style={{
                ...styles.supplierContainer,
                display:
                  window.location.pathname === "/return" ? "none" : "flex",
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div style={{ position: "relative" }}>
                {props.userData.company_id !== "|13954|" && (
                  <Suppliers setSuppValue={setSuppValue} />
                )}
                {/* {props.userData.company_id === '|14045|' && (
                  <Suppliers setSuppValue={setSuppValue} />
                )} */}
                {props.userData.company_id === "|13954|" && (
                  <div className={css.selectwrapper}>
                    <span>Нийлүүлэгч</span>
                    <select value={arigSupplier} onChange={handleChangeArig}>
                      <option>Нийлүүлэгч</option>
                      {ArigJSON.map((item) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                    </select>
                  </div>
                )}
              </div>
            </div>
          );
          break;
        case 4:
          field.content = (
            <div
              key={field.id}
              style={styles.notifContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
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
          );
          break;
        case 5:
          field.content = (
            <div
              key={field.id}
              style={styles.orderImageContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Захиалга</span>
                <input type="text" disabled />
              </div>
            </div>
          );
          break;
        case 6:
          field.content = (
            <div
              key={field.id}
              style={{
                width: "200px",
                marginRight: "10px",
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>DeliveryManOne</span>
                <select
                  style={{
                    width: "190px",
                  }}
                  value={tugeegch}
                  onChange={(e) => {
                    setTugeegch(e.target.value);
                  }}
                >
                  {/* <option key="" value="">
                    Бүгд
                  </option>
                  {ordersCtx.tugeegch &&
                    ordersCtx.tugeegch.map((item, index) => {
                      return (
                        <option key={index} value={item.user_id}>
                          {item.first_name}
                        </option>
                      );
                    })} */}
                </select>
              </div>
            </div>
          );
          break;
        case 7:
          field.content = (
            <div
              key={field.id}
              style={{
                ...styles.orderDateContainer,
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Захиалсан</span>
                {/* <input type="date" onChange={(e) => bar(e.target.value)} /> */}
                <input
                  type="date"
                  value={orderStart}
                  onChange={(e) => setOrderStart(e.target.value)}
                />
              </div>
            </div>
          );
          break;
        case 8:
          field.content = (
            <div
              key={field.id}
              style={styles.deliverDateContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Хүргүүлэх</span>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>
            </div>
          );
          break;
        case 9:
          field.content = (
            <div
              key={field.id}
              style={styles.totalPriceContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Дүн</span>
                {/* <input type="text" onChange={(e) => Price(e.target.value)} /> */}
                <input
                  type="text"
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                />
              </div>
            </div>
          );
          break;
        case 10:
          field.content = (
            <div
              key={field.id}
              style={{
                ...styles.counponContainer,
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Анхны дүн</span>
                <input
                  type="text"
                  value={orderCoupon}
                  onChange={(e) => setOrderCoupon(e.target.value)}
                  disabled
                />
              </div>
            </div>
          );
          break;
        case 11:
          field.content = (
            <div
              key={field.id}
              style={{
                ...styles.counponContainer,
                display:
                  props.userData.company_id === "|13987|" ||
                  props.userData.company_id === "|14006|" ||
                  props.userData.company_id === "|13992|" ||
                  props.userData.company_id === "|13991|" ||
                  props.userData.company_id === "|13994|" ||
                  props.userData.company_id === "|13965|" ||
                  props.userData.company_id === "|13995|" ||
                  props.userData.company_id === "|4805|" ||
                  props.userData.company_id === "|10683|" ||
                  props.userData.company_id === "|1232|" ||
                  props.userData.company_id === "|13990|" ||
                  props.userData.company_id === "|13996|" ||
                  props.userData.company_id === "|13993|" ||
                  props.userData.company_id === "|13997|" ||
                  props.userData.company_id === "|13998|" ||
                  props.userData.company_id === "|14000|" ||
                  props.userData.company_id === "|13999|"
                    ? "none"
                    : "block",
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Coupon</span>
                <input
                  type="text"
                  value={orderCoupon}
                  onChange={(e) => setOrderCoupon(e.target.value)}
                  disabled
                />
              </div>
            </div>
          );
          break;
        case 12:
          field.content = (
            <div
              key={field.id}
              style={styles.noteContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
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
          );
          break;
        case 13:
          field.content = (
            <div
              key={field.id}
              style={styles.phoneContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Утас</span>

                <input
                  type="number"
                  value={orderPhone}
                  onChange={(e) => setOrderPhone(e.target.value)}
                />
              </div>
            </div>
          );
          break;
        case 14:
          field.content = (
            <div
              key={field.id}
              style={styles.channelNameContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Захиалсан</span>

                <input
                  type="text"
                  value={orderOrder}
                  onChange={(e) => setOrderOrder(e.target.value)}
                />
              </div>
            </div>
          );
          break;
        case 15:
          field.content = (
            <div
              key={field.id}
              style={styles.channelContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Суваг</span>

                <select
                  value={orderChannel}
                  onChange={(e) => setOrderChannel(Number(e.target.value))}
                >
                  <option value="all">---Суваг---</option>
                  {businesType
                    ? businesType.map((s, index) => {
                        return (
                          <option value={s.id} key={index}>
                            {s.value}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </div>
          );
          break;
        case 16:
          field.content = (
            <div
              key={field.id}
              style={styles.provinceContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Хот/аймаг</span>
                <select
                  value={orderCity}
                  onChange={(e) => setOrderCity(Number(e.target.value))}
                >
                  <option value={null}>---Хот/аймаг---</option>
                  {props.locations
                    ?.filter((loc) => loc.parent_id === 0)
                    .map((location) => {
                      return (
                        <option
                          value={location.location_id}
                          key={`city-${location.location_id}`}
                        >
                          {location.location_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          );
          break;
        case 17:
          field.content = (
            <div
              key={field.id}
              style={styles.districtContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Дүүрэг/сум</span>
                {/* <input type="text" onChange={e => searchDistrict(e.target.value)} /> */}
                <select
                  value={orderDistrict}
                  onChange={(e) => setOrderDistrict(Number(e.target.value))}
                >
                  <option value={null}>---Дүүрэг/сум---</option>
                  {props.locations
                    ?.filter((loc) => loc.parent_id === orderCity)
                    .map((location) => {
                      return (
                        <option
                          value={location.location_id}
                          key={`city-${location.location_id}`}
                        >
                          {location.location_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          );
          break;
        case 18:
          field.content = (
            <div
              key={field.id}
              style={styles.khorooContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Хороо</span>
                <select
                  value={orderKhoroo}
                  onChange={(e) => setOrderKhoroo(Number(e.target.value))}
                >
                  <option value={null}>---Хороо---</option>
                  {props.locations
                    ?.filter((loc) => loc.parent_id === orderDistrict)
                    .map((location) => {
                      return (
                        <option
                          value={location.location_id}
                          key={`city-${location.location_id}`}
                        >
                          {location.location_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          );
          break;
        case 19:
          field.content = (
            <div
              key={field.id}
              style={styles.khorooContainer}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Хаяг</span>
                <input
                  type="text"
                  value={orderAddress}
                  onChange={(e) => setOrderAddress(e.target.value)}
                />
              </div>
            </div>
          );
          break;
        case 20:
          field.content = (
            <div
              key={field.id}
              style={{
                ...styles.lendWrapper,
                display:
                  window.location.pathname === "/return" ? "none" : "flex",
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Төлбөрийн хэлбэр</span>
                <select
                  value={orderPaymentMethod}
                  onChange={(e) => {
                    setOrderPaymentMethod(
                      e.target.value === "---" ? null : Number(e.target.value)
                    );
                  }}
                >
                  <option value={null}>---</option>
                  {paymentMethods.map((method) => {
                    return (
                      <option
                        key={`payment-method-${method.Id}`}
                        value={method.Id}
                      >
                        {method.Name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          );
          break;
        case 21:
          field.content = (
            <div
              key={field.id}
              style={{
                display: props.userData.company_id === "|1|" ? "flex" : "none",
                justifyContent: "center",
                ...styles.pickpackContainer,
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>PickPack</span>
                <input type="text" disabled />
              </div>
            </div>
          );
          break;
        case 22:
          field.content = (
            <div
              key={field.id}
              style={{
                display: props.userData.company_id === "|1|" ? "block" : "none",

                ...styles.pickpackContainer,
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Origin</span>
                <select
                  value={orderOrigin}
                  onChange={(e) =>
                    setOrderOrigin(
                      e.target.value === "---Бүгд---"
                        ? null
                        : Number(e.target.value)
                    )
                  }
                  style={{ width: "100%" }}
                >
                  <option value={null}>---Бүгд---</option>
                  {originData.map((origin) => {
                    return (
                      <option key={`origin-${origin.id}`} value={origin.id}>
                        {origin.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          );
          break;
        case 23:
          field.content = (
            <div
              key={field.id}
              style={{
                display: "flex",
                justifyContent: "center",
                ...styles.vatContainer,
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>VAT</span>
                <input type="text" disabled />
              </div>
            </div>
          );
          break;
        case 24:
          field.content = (
            <div
              style={{ width: 120 }}
              key={field.id}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div style={{ width: "100%" }}>
                <span className={css.headerTitle}>user_date</span>
                <input type="text" disabled />
              </div>
            </div>
          );
          break;
        case 25:
          field.content = (
            <div
              style={{ width: 80 }}
              key={field.id}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div style={{ width: "100%" }}>
                <span className={css.headerTitle}>Хариуцагч</span>
                <select>
                  <option>Бүх захиалга</option>
                  <option>Хариуцагч хуваарилсан</option>
                  <option>Хариуцагч хуваарьлагдаагүй</option>
                </select>
              </div>
            </div>
          );
          break;
        case 26:
          field.content = (
            <div
              key={field.id}
              style={{ width: "150px" }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div style={{ width: "100%" }}>
                <span className={css.headerTitle}>Хариуцагч нэр</span>
                <select
                  onChange={(e) => {
                    // console.log(e.target.value);
                    setHariutsagchNer(Number(e.target.value));
                  }}
                >
                  <option value="" selected>
                    Бүгд
                  </option>
                  {hariutsagch
                    .filter((user) => user.first_name)
                    .map((user) => (
                      <option value={user.user_id}>{user.first_name}</option>
                    ))}
                </select>
              </div>
            </div>
          );
          break;
        case 27:
          field.content = (
            <>
              <div
                key={field.id}
                style={{ width: 120 }}
                draggable={true}
                onDragStart={(e) => (dragItem.current = field.position)}
                onDragOver={(e) => (dragOverItem.current = field.position)}
                onDragEnd={onDragEnd}
              >
                <div style={{ width: "100%" }}>
                  <span className={css.headerTitle}>Утасны дугаар</span>
                  <input type="text" placeholder="Хайх" />
                </div>
              </div>
            </>
          );
          break;
        case 28:
          field.content = (
            <div
              style={{ width: 120 }}
              key={field.id}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div style={{ width: "100%" }}>
                <span className={css.headerTitle}>Түгээгч</span>
                <select
                  style={{
                    width: "100%",
                  }}
                  value={tugeegch}
                  onChange={(e) => {
                    setTugeegch(e.target.value);
                  }}
                >
                  <option key="" value="">
                    Бүгд
                  </option>
                  <option key="Хувиарлаагүй" value="null">
                    Хувиарлаагүй
                  </option>
                  <option key="Хувиарласан" value="notNull">
                    Хувиарласан
                  </option>
                  {ordersCtx.tugeegch &&
                    ordersCtx.tugeegch.map((item, index) => {
                      return (
                        <option key={index} value={item.user_id}>
                          {item.first_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          );
          break;
        case 29:
          field.content = (
            <>
              <div
                key={field.id}
                style={{ width: 120 }}
                draggable={true}
                onDragStart={(e) => (dragItem.current = field.position)}
                onDragOver={(e) => (dragOverItem.current = field.position)}
                onDragEnd={onDragEnd}
              >
                <div style={{ width: "100%" }}>
                  <span className={css.headerTitle}>Ачилт</span>
                  <input type="text" disabled />
                </div>
              </div>
            </>
          );
          break;
        case 30:
          field.content = (
            <div
              key={field.id}
              style={{
                display: "flex",
                justifyContent: "center",
                ...styles.vatContainer,
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>
                  {props.userData.id === 378
                    ? "Захиалга устгах"
                    : "Тест устгах"}
                </span>
                <input type="text" disabled />
              </div>
            </div>
          );
          break;
        case 31:
          field.content = (
            <div
              key={field.id}
              style={{
                display: "flex",
                justifyContent: "center",
                ...styles.vatContainer,
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Утасны захиалга</span>
                <input type="text" disabled />
              </div>
            </div>
          );
          break;
        case 32:
          field.content = (
            <div
              key={field.id}
              onClick={() => {
                alert("ajillahgui");
              }}
              style={{
                display:
                  window.location.pathname === "/return" ? "flex" : "none",
                justifyContent: "center",
                ...styles.vatContainer,
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>Баталгаажуулах</span>
                {/* <input type="text" disabled /> */}
              </div>
            </div>
          );
          break;
        case 33:
          field.content = (
            <div
              key={field.id}
              style={{
                display: "flex",
                justifyContent: "center",
                ...styles.vatContainer,
              }}
              draggable={true}
              onDragStart={(e) => (dragItem.current = field.position)}
              onDragOver={(e) => (dragOverItem.current = field.position)}
              onDragEnd={onDragEnd}
            >
              <div>
                <span className={css.headerTitle}>ХТ код</span>
                <input type="text" disabled />
              </div>
            </div>
          );
          break;
        default:
          break;
      }
    }

    setFields(fieldsCopy);
  }, [
    fieldsData,
    orderID,
    arigSupplier,
    props.userData.company_id,
    tugeegch,
    ordersCtx,
  ]);
  return (
    <>
      <div>
        {props.userData.company_id === "|14057|" && orderCtx?.reportThird ? (
          <ReportOrec
            locations={locations}
            categories={categories}
            suppliers={props.suppliers}
            userData={props.userData}
            page={props.appctx}
            buramhanajilchid={buramhanajilchid}
            permissionData={permissionData}
          />
        ) : null}

        {props.userData.company_id === "|14045|" &&
          orderCtx?.showYunaReport && (
            <YunaReport
              userData={props.userData}
              permissionData={permissionData}
            />
          )}

        {(props.userData.company_id === "|13954|" ||
          props.userData.company_id === "|14045|") &&
          orderCtx?.showArigReport && (
            <ReportArig
              userData={props.userData}
              permissionData={permissionData}
            />
          )}

        {orderCtx?.report ? (
          <Report
            locations={locations}
            categories={categories}
            suppliers={props.suppliers}
            userData={props.userData}
            page={props.appctx}
            buramhanajilchid={buramhanajilchid}
            permissionData={permissionData}
          />
        ) : null}
        {orderCtx?.reportSecond ? (
          <ReportSecond
            locations={locations}
            userData={props.userData}
            categories={categories}
            supplier={supplier}
            status={searchStatus}
            page={props.appctx}
            buramhanajilchid={buramhanajilchid}
            permissionData={permissionData}
          />
        ) : null}
        {supplier && (
          <ReportSecond
            locations={locations}
            userData={props.userData}
            categories={categories}
            supplier={supplier}
            status={searchStatus}
            page={props.appctx}
            buramhanajilchid={buramhanajilchid}
            permissionData={permissionData}
          />
        )}
        {orderCtx?.reportDiamond ? (
          <ReportDiamond
            userData={props.userData}
            permissionData={permissionData}
            locations={locations}
            categories={categories}
            supplier={supplier}
            page={props.appctx}
          />
        ) : null}
        {orderCtx?.buramhanReport ? <ReportBuramhan /> : null}
        {orderCtx?.bmTovchoo ? <ReportBmTovchoo /> : null}
        {popModal && <Modal title="Илэрцгүй байна." onClick={setPopModal} />}
        <div
          className={css.container}
          // style={{
          //   background: props.userData.company_id === "|13987|" ? "red" : "white",
          // }}
        >
          <div
            style={{
              // width: props.userData.company_id === "|1|" ? "2700px" : "2700px",
              width: "max-content",
              borderBottom: "0.8px solid #CFD8DC",
            }}
          >
            <div className="row header">
              {/* Checkbox and Дугаар */}
              {fields
                .sort((a, b) => a.position - b.position)
                .map((field) => {
                  return field.permission && field.show ? field.content : null;
                })}

              {/* Захиалсан */}

              {/* Хүргүүлэх */}

              {/* Дүн */}

              {/* Төлбөр */}
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
              {/* Анхны дүн */}

              {/* Coupon */}

              {/* Тэмдэглэл */}

              {/* Утас */}

              {/* Захиалсан */}

              {/* Суваг */}

              {/* Хот */}

              {/* Дүүрэг */}

              {/* Хороо */}

              {/* Хаяг */}

              {/* Төлбөрийн хэлбэр */}
              <div style={{ ...styles.lendContainer, display: "none" }}>
                <div>
                  <span className={css.headerTitle}>Төлбөрийн хэлбэр</span>
                  <input type="text" disabled />
                </div>
              </div>

              {/* Төлбөрийн хэлбэр /бэлэн/ */}
              <div style={{ ...styles.lendContainer, display: "none" }}>
                <div>
                  <span className={css.headerTitle}>
                    Төлбөрийн хэлбэр /бэлэн/
                  </span>
                  <input type="text" disabled />
                </div>
              </div>

              {/* Төлбөрийн хэлбэр /Банк/ */}
              <div style={{ ...styles.lendContainer, display: "none" }}>
                <div>
                  <span className={css.headerTitle}>
                    Төлбөрийн хэлбэр /Банк/
                  </span>
                  <input type="text" disabled />
                </div>
              </div>

              {/* Төлбөрийн хэлбэр */}

              {/* XT and Tugeegch start */}
              {XTcompany.includes(props.userData.company_id) && (
                <>
                  {/* user_date */}

                  {/* Хариуцагч */}

                  {/* Хариуцагч нэр */}

                  {/* Утасны дугаар */}

                  {/* Түгээгч */}

                  {/* Ачилт */}
                </>
              )}

              {/* XT and Tugeegch enda */}

              {/* Pickpack */}

              {/* Origin */}

              {/* VAT */}

              {/* Захиалга устгах */}
              {/* {props.userData.id === 351 ||
              props.userData.id === 370 ||
              props.userData.id === 256 ||
              props.userData.id === 320 ||
              props.userData.id === 366 ||
              props.userData.id === 378 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    ...styles.vatContainer,
                  }}
                >
                  <div>
                    <span className={css.headerTitle}>
                      {props.userData.id === 378
                        ? "Захиалга устгах"
                        : "Тест устгах"}
                    </span>
                    <input type="text" disabled />
                  </div>
                </div>
              ) : null} */}

              {/* Утасны захиалга */}

              {/* Pickpack Засварлах */}
              {props.userData.id === 256 || props.userData.id === 320 ? (
                <div>
                  <span className={css.headerTitle}>PickPack засварлах</span>
                  <input type="text" disabled />
                </div>
              ) : null}
            </div>
          </div>
          <div id="foobar" className={css.foobarcontainer}></div>
          <div
            style={{
              height: "52px",
              background: "#FBFBFC",
              borderTop: "0.8px solid #CFD8DC",
              boxSizing: "border-box",
              zIndex: "0",
              width: "2700px",
              // overflowX: "scroll",
              // overflowY: "hidden",
              paddingRight: "16px",
            }}
          >
            <Footer data={footerdata} />
          </div>
        </div>
      </div>

      {orderCtx.showTugeegchAssign && selectedOrders.length > 0 && (
        <MyModal
          width={750}
          height={670}
          closeHandler={() => orderCtx.setShowTugeegchAssign(false)}
        >
          <TugeegchAssign
            orders={selectedOrders}
            users={buramhanajilchid}
            closeHandler={() => orderCtx.setShowTugeegchAssign(false)}
            setChangedTugeegch={setChangedTugeegch}
          />
        </MyModal>
      )}

      {orderCtx.showShipmentAssign && selectedOrders.length > 0 && (
        <MyModal
          width={770}
          height={770}
          closeHandler={() => orderCtx.setShowShipmentAssign(false)}
        >
          <ShipmentCreate
            orders={selectedOrders}
            closeHandler={() => orderCtx.setShowShipmentAssign(false)}
            users={buramhanajilchid}
            userData={props.userData}
            setChangedTugeegch={setChangedTugeegch}
          />
        </MyModal>
      )}

      {orderCtx.showColaOrders &&
        colaOrderUsers.includes(props.userData.id) && (
          <MyModal
            width={1400}
            height={800}
            closeHandler={() => orderCtx.setShowColaOrders(false)}
          >
            <ColaOrders
              closeHandler={() => orderCtx.setShowColaOrders(false)}
              userData={props.userData}
            />
          </MyModal>
        )}
      {orderCtx.showOrderNegtgel &&
        (props.userData.company_id === "|14005|" || props.userData.company_id === "|14005||14238|" || 
          props.userData.company_id === "|14191|" || props.userData.company_id === "|14246|") && (
          <OrderNegtgel
            closeHandler={() => {
              orderCtx.setShowOrderNegtgel(false);
            }}
            order_ids={selectedData}
          />
        )}

      {orderCtx.showOrderReceipts &&
        (props.userData.company_id === "|14005|" ||
          props.userData.company_id === "|14191|") &&
        selectedOrders.length > 0 && (
          <MyModal
            width={785}
            height="max-content"
            closeHandler={() => orderCtx.setShowOrderReceipts(false)}
          >
            <OrderReceipts
              closeHandler={() => orderCtx.setShowOrderReceipts(false)}
              orders={selectedOrders}
            />
          </MyModal>
        )}

      {orderCtx.showOrderReceipts &&
        props.userData.company_id === "|14005|" &&
        selectedOrders.length === 0 && (
          <ErrorPopup
            message="Захиалга сонгоно уу!"
            closeHandler={() => orderCtx.setShowOrderReceipts(false)}
          />
        )}
    </>
  );
}, areEqual);

export default Index;
