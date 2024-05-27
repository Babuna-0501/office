import React, { useEffect, useState, useContext } from "react";
import css from "./tradeshops.module.css";
import myHeaders from "../../components/MyHeader/myHeader";
import ProductReportHook from "../../Hooks/ProductsReportHook";
const dataWidth = [150, 150, 150, 100, 200, 200, 200, 200, 50];

const TradeShops = (props) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [merchantid, setMerchantid] = useState(null);
  const [bustype, setBustype] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [khoroo, setKhoroo] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [allcheck, setAllcheck] = useState(false);
  const prodctx = useContext(ProductReportHook);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let params = "";
    if (name !== null && name.toString().toLowerCase().length > 1) {
      params += `tradeshop_name=${name}&`;
    }
    if (merchantid !== null) {
      params += `id=${merchantid}&`;
    }
    if (bustype !== null && bustype !== "Суваг") {
      params += `business_type_id=${bustype.toString()}&`;
    }
    if (city !== null && city !== "Хот") {
      params += `city=${city}&`;
    }
    if (district !== null && district !== "Дүүрэг") {
      params += `district=${district}&`;
    }
    if (khoroo !== null && khoroo !== "Хороо") {
      params += `khoroo=${khoroo}&`;
    }
    if (address !== null) {
      params += `address=${address}&`;
    }
    if (phone !== null && phone.toString().length > 7) {
      params += `phone=${phone}&`;
    }
    let url = `https://api2.ebazaar.mn/api/merchants?${params}page=0`;
    console.log("merchant url", url);
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name, merchantid, bustype, city, district, khoroo, address, phone]);
  const HandleOnChange = (x) => {
    // console.log("x", x.tradeshop_id);
    if (prodctx.tradeshopIDS.includes(x.tradeshop_id)) {
      let aa = prodctx.tradeshopIDS.filter((a) => a !== x.tradeshop_id);

      prodctx.setTradeshopIDS(aa);
    } else {
      prodctx.setTradeshopIDS((prev) => [...prev, x.tradeshop_id]);
    }
  };

  useEffect(() => {
    if (allcheck) {
      let ids = [];
      data.map((item) => {
        ids.push(item.tradeshop_id);
      });

      prodctx.setTradeshopIDS(ids);
    }
  }, [allcheck]);

  return (
    <div className={css.container}>
      <section>
        <header className={css.header}>
          <div
            style={{
              width: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              value={allcheck}
              onChange={() => {
                setAllcheck(!allcheck);
              }}
            />
          </div>
          <div
            style={{
              width: dataWidth[0],
            }}
          >
            <span> Нэр</span>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              width: dataWidth[1],
            }}
          >
            <span> Утас</span>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              width: dataWidth[2],
            }}
          >
            <span> Суваг</span>
            <select
              value={bustype}
              onChange={(e) => {
                if (e.target.value !== "Суваг") {
                  setBustype(e.target.value);
                }
              }}
            >
              <option value="Суваг">Суваг</option>
              {prodctx.sitedata.business_types.map((item, index) => {
                return (
                  <option
                    key={item.business_type_id}
                    value={item.business_type_id}
                  >
                    {item.business_type_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            style={{
              width: dataWidth[3],
            }}
          >
            <span>Хот</span>
            <select
              value={city}
              onChange={(e) => {
                if (e.target.value !== "Хот") {
                  setCity(e.target.value);
                }
              }}
            >
              <option value="Хот">Бүгд</option>
              {prodctx.sitedata.location
                .filter((x) => x.parent_id === 0)
                .map((item, index) => {
                  return (
                    <option key={item.location_id} value={item.location_id}>
                      {item.location_name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div
            style={{
              width: dataWidth[3],
            }}
          >
            <span>Дүүрэг</span>
            <select
              value={district}
              onChange={(e) => {
                if (e.target.value !== "Дүүрэг") {
                  setDistrict(e.target.value);
                }
              }}
            >
              <option value="Дүүрэг">Бүгд</option>
              {prodctx.sitedata.location
                .filter((x) => x.parent_id == city)
                .map((item, index) => {
                  return (
                    <option key={item.location_id} value={item.location_id}>
                      {item.location_name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div
            style={{
              width: dataWidth[3],
            }}
          >
            <span>Хороо</span>
            <select
              value={khoroo}
              onChange={(e) => {
                if (e.target.value !== "Хороо") {
                  setKhoroo(e.target.value);
                }
              }}
            >
              <option value="Хороо">Бүгд</option>
              {prodctx.sitedata.location
                .filter((x) => x.parent_id == district)
                .map((item, index) => {
                  return (
                    <option key={item.location_id} value={item.location_id}>
                      {item.location_name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div
            style={{
              width: dataWidth[1],
            }}
          >
            <span>Хаяг</span>
            <input />
          </div>
        </header>
      </section>
      <div>
        {data &&
          data.map((item, index) => {
            let busname = prodctx.sitedata.business_types.filter(
              (x) => x.business_type_id == item.business_type_id
            )[0].business_type_name;
            console.log("item", item);
            let cityname = prodctx.sitedata.location.filter(
              (x) => x.location_id == item.city
            )[0].location_name;
            let districtname = prodctx.sitedata.location.filter(
              (x) => x.location_id == item.district
            )[0].location_name;

            let khorooname = "";
            if (item.horoo !== null) {
              khorooname = prodctx.sitedata.location.filter(
                (x) => x.location_id == Number(item.horoo)
              )[0]?.location_name;
            }

            return (
              <div key={index} className={css.tradeshopwrapper}>
                <div
                  style={{
                    width: "50px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={
                      prodctx.tradeshopIDS.includes(item.tradeshop_id)
                        ? true
                        : false
                    }
                    onChange={() => HandleOnChange(item)}
                  />
                </div>
                <div
                  style={{
                    width: dataWidth[0],
                  }}
                >
                  <span>{item.tradeshop_name}</span>
                </div>
                <span
                  style={{
                    width: dataWidth[1],
                  }}
                >
                  {item.tradeshop_phone}
                </span>
                <span
                  style={{
                    width: dataWidth[2],
                  }}
                >
                  {item.business_type_id ? busname : "байхгүй"}
                </span>
                <span
                  style={{
                    width: dataWidth[3],
                  }}
                >
                  {item.city ? cityname : "Ulaanbaatar"}
                </span>
                <span
                  style={{
                    width: dataWidth[3],
                  }}
                >
                  {item.district ? districtname : ""}
                </span>
                <span
                  style={{
                    width: dataWidth[3],
                  }}
                >
                  {item.horoo ? khorooname : ""}
                </span>
                <span
                  style={{
                    width: dataWidth[3],
                  }}
                  className={css.address}
                  title={item.address}
                >
                  {item.address ? item.address : ""}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TradeShops;
