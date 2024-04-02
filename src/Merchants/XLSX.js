import React, { useState, useEffect, useContext } from "react";
import CSV from "./CSV";
import MerchantReportHook from "../Hooks/MerchantReportHook";
import myHeaders from "../components/MyHeader/myHeader";
import css from "./xlsx.module.css";

function XLSX(props) {
  let csv = [
    [
      "Дугаар",
      "Created date",
      "Компанийн нэр",
      "Регистр",
      "Үйл ажиллагааны чиглэл",
      "Суваг",
      "Нэр",
      "Утас",
      "Хот",
      "Дүүрэг",
      "Хороо",
      "Хаяг",
    ],
  ];
  let [blah, setBlah] = useState(csv);
  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [data, setData] = useState([]);
  const [reportOk, setReportOk] = useState(true);
  const [supplierID, setSupplierID] = useState(null);
  const [alltatah, setAlltatah] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (alltatah) {
      console.log("all tatah");
      setLoading(true);
      let url = `https://api2.ebazaar.mn/api/merchants?page=all`;
      console.log("url merchant report", url);
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
          setReportOk(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      console.log("end orj irlee");
      if ((startdate === null || enddate === null) && supplierID === null) {
        setData([]);
        return;
      }

      let params = "";
      if (startdate && enddate) {
        params += `start=${startdate}&end=${enddate}&`;
      }
      if (supplierID) {
        params += `id=${supplierID}&`;
      }

      let url = `https://api2.ebazaar.mn/api/merchants?page=all`;
      console.log("url merchant report", url);
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
          setReportOk(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [startdate, enddate, supplierID, alltatah]);

  data.map((data) => {
    // console.log("merchant data", data);
    let city = data.city;
    let district = data.district;
    let khoroo = data.horoo;
    let locations = props.locations;
    let businessType = null;
    let channel = null;
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
    if (props.businessType) {
      props.businessType.map((type) => {
        if (type.business_type_id === parseInt(data.business_type_id)) {
          businessType = type.business_type_name;
          channel = type.channel_name;
        }
      });
    }

    let temp = [
      data.tradeshop_id,
      data.created_date ? data.created_date.substr(0, 10) : null,
      data.customer_name,
      data.business_register,
      businessType,
      channel,
      data.tradeshop_name,
      data.tradeshop_phone ? data.tradeshop_phone.toString() : null,
      city,
      district,
      khoroo,
      data.address,
    ];
    csv.push(temp);
  });
  // console.log("csv", csv);
  const closeHandler = () => {
    props.merchantctx.setExportReport(false);
    setData([]);
    props.close(false);
  };
  const tatahHandler = () => {
    console.log("daragdsan all");
    setLoading(true);
    setAlltatah(true);
  };
  return (
    <div id="formwithtransparentbackground">
      <div id="form">
        <span id="close" onClick={closeHandler}>
          Close
        </span>

        {reportOk && (
          <div className={css.container}>
            <div className={css.supwrapper}>
              <label>Нийлүүлэгчийн дугаар </label>
              <input
                placeholder="Нийлүүлэгчийн дугаарыг оруулна уу"
                value={supplierID}
                onChange={(e) => {
                  setSupplierID(e.target.value);
                }}
              />
            </div>
            <span>Эхлэх он сар өдөр</span>
            <div className={css.inputwrapper}>
              <input
                placeholder="Эхлэх он сар өдөр"
                value={startdate}
                onChange={(e) => setStartdate(e.target.value)}
                type="date"
              />
            </div>
            <span>Дуусах он сар өдөр</span>
            <div className={css.inputwrapper}>
              <input
                placeholder="Дуусах он сар өдөр"
                value={enddate}
                onChange={(e) => setEnddate(e.target.value)}
                type="date"
              />
            </div>
            <div className={css.btnwrapper}>
              {loading ? (
                <div>Уншиж байна ... </div>
              ) : (
                <span onClick={tatahHandler}>Бүх харилцагч татах</span>
              )}
            </div>
          </div>
        )}

        {!reportOk && <CSV data={csv} />}
      </div>
      <div id="transparentbackground"></div>
    </div>
  );
}

export default XLSX;
