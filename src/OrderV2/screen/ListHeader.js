import { useState, useEffect } from "react";
import Dropdown from "../components/status/dropdown";
import DatePick from "../components/datepick/datepick";
import Channel from "../data/info";
import CityData from "../data/city.json";
import DistrictData from "../data/district.json";

import "./style.css";

let options = [
  { value: "0", label: "Бүгд" },
  { value: "1", label: "Хүлээгдэж буй" },
  { value: "2", label: "Баталгаажсан" },
  { value: "3", label: "Хүргэгдсэн" },
  { value: "4", label: "Төлөгдсөн" },
  { value: "5", label: "Цуцлагдсан" },
];

let options2 = [
  { value: "14", label: "Ачигдсан" },
  { value: "15", label: "Хойшилсон" },
];

const managers = [
  { value: "manager1", label: "Жаак" },
  { value: "manager2", label: "Бат" },
  { value: "manager3", label: "Гапу" },
  { value: "manager4", label: "Ганзо" },
];

const paymentMethods = [
  { Id: 0, Name: "Дансаар" },
  { Id: 1, Name: "Бэлнээр" },
  { Id: 2, Name: "Зээлээр" },
  { Id: 3, Name: "Бэлэн+Данс" },
  { Id: 4, Name: "Бэлэн+Зээл" },
  { Id: 5, Name: "Данс+Зээл" },
];

const ListHeader = (props) => {
  
  const [delivermans, setDeliverMans] = useState([
    {
      user_id: "",
      first_name: "Бүгд",
    },
    {
      user_id: "null",
      first_name: "Хуваарьлаагүй",
    },
    {
      user_id: "notNull",
      first_name: "Хуваарьласан",
    },
  ]);
  // const handleChange = (event, key) => {
  //   props.setFilterState((prev) => ({ ...prev, [key]: event.target.value }));
  // };
  useEffect(() => {
    let users = props.users.map((f) => {
      let d = delivermans.filter(
        (deliver) =>
          f.user_id !== deliver.user_id &&
          deliver.user_id != "null" &&
          deliver.user_id != "notNull" &&
          deliver.user_id != ""
      );

      if (d.length == 0)
        setDeliverMans((prev) => [
          ...prev,
          {
            user_id: f.user_id,
            first_name: f.first_name,
          },
        ]);
    });
  }, [props.users]);

  const handleChange = (event, key) => {
    const { target } = event;
    const { value } = target;

    // if (key === "status" && value === "0") {
    //   props.handleSpinner(true);
    // } else {
    props.setFilterState((prev) => ({ ...prev, [key]: value }));
    // }
  };

  const sequence = props.sequence;
  const sequenceSizes = props.sequenceSizes;
  let width = 0;
  for (const size in sequenceSizes) {
    width += sequenceSizes[size];
  }
  const statusOptions = () => {
    if (!props || !props.userData) {
      return [];
    }

    const { userData } = props;

    if (!userData.company_id) {
      return [];
    }

    return props.userData?.company_id === "|14268|"
      ? options.concat(options2)
      : options;
  };
  const CityArray = CityData.City || [];
  const DistrictArray = DistrictData.District || [];
  const renderHTML = [];

  const list = {
    index: (
      <div
        className="order_index"
        style={{ width: sequenceSizes["index"] + "px" }}
      >
        <div>
          <input
            type="checkbox"
            onChange={(e) => {
              props.setFilterState((prev) => ({
                ...prev,
                checked: e.target.checked,
              }));
            }}
          />
        </div>
      </div>
    ),
    id: (
      <div className="order_id" style={{ width: sequenceSizes["id"] + "px" }}>
        <h5>Дугаар</h5>
        <input
          type="text"
          value={props.filterState?.order_id ?? ""}
          placeholder="хайх"
          onChange={(e) => {
            handleChange(e, "order_id");
          }}
        />
        {/* <input type="text" placeholder="хайх" value={orderIdFilter} onChange={handleOrderIdFilterChange} /> */}
      </div>
    ),
    status: (
      <div
        className="order_vendor"
        style={{ width: sequenceSizes["supplier"] + "px" }}
      >
        <h5>Статус</h5>
        <Dropdown
          options={statusOptions()}
          onChange={(e) => {
            handleChange(e, "status");
          }}
        />
      </div>
    ),

    orderlist: (
      <div
        className="order_date"
        style={{ width: sequenceSizes["orderlist"] + "px" }}
      >
        <h5>Захиалга</h5>
        <input type="text" disabled />
      </div>
    ),
    orderdate: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["orderdate"] + "px" }}
      >
        <h5>Захиалсан өдөр</h5>
        <DatePick handleChange={(e) => handleChange(e, "order_date")} />
      </div>
    ),
    deliverydate: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["deliverydate"] + "px" }}
      >
        <h5>Хүргүүлэх өдөр</h5>
        <DatePick handleChange={(e) => handleChange(e, "delivery_date")} />
      </div>
    ),
    paidamount: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["paymenttype"] + "px" }}
      >
        <h5>Төлбөр:</h5>
        <h5>Төлөөгүй</h5>
        <h5>Төлсөн</h5>
      </div>
    ),
    note: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["note"] + "px" }}
      >
        <h5>Тэмдэглэл</h5>
        <input type="text" disabled />
      </div>
    ),

    customerphone: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["customerphone"] + "px" }}
      >
        <h5>Утас</h5>
        <input
          type="text"
          placeholder="Хайх"
          onChange={(e) => handleChange(e, "phone")}
          value={props.filterState?.phone}
        />
      </div>
    ),

    merchants: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["merchants"] + "px" }}
      >
        <h5>Захиалсан</h5>
        <input
          type="text"
          placeholder="Хайх"
          onChange={(e) => handleChange(e, "tradeshop_name")}
          value={props.tradeshop_name}
        />
      </div>
    ),

    customerchannel: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["customerchannel"] + "px" }}
      >
        <h5>Суваг</h5>
        <Dropdown
          options={Channel.map((item) => ({
            value: item.business_type_id,
            label: item.business_type_name,
          }))}
          onChange={(e) => handleChange(e, "business_type")}
        />
      </div>
    ),

    city: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["city"] + "px" }}
      >
        <h5>--Хот/аймаг--</h5>
        <Dropdown
          value={props.tradeshop_city}
          onChange={(e) => handleChange(e, "city")}
          options={CityArray.map((item) => ({
            value: item.location_id,
            label: item.location_name,
          }))}
        />
      </div>
    ),
    district: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["district"] + "px" }}
      >
        <h5>--Дүүрэг/сум--</h5>
        <Dropdown
          options={DistrictArray.map((item) => ({
            value: item.location_id,
            label: item.location_name,
          }))}
          onChange={(e) => handleChange(e, "district")}
        />
      </div>
    ),
    khoroo: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["khoroo"] + "px" }}
      >
        <h5>Хороо</h5>
        <input
          type="text"
          value={props.filterState?.khoroo}
          placeholder="хайх"
          onChange={(e) => {
            handleChange(e, "khoroo");
          }}
        />
      </div>
    ),
    address: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["address"] + "px" }}
      >
        <h5>Дэлгэрэнгүй хаяг</h5>
        <input
          type="text"
          placeholder="Хайх"
          onChange={(e) => handleChange(e, "address")}
        />
      </div>
    ),
    paymenttype: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["paidamount"] + "px" }}
      >
        <h5>Төлбөрийн хэлбэр</h5>
        <Dropdown
          options={paymentMethods}
          onChange={(e) => handleChange(e, "district")}
        />
      </div>
    ),
    srcode: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["srcode"] + "px" }}
      >
        <h5>Pick Pack</h5>
        <input
          type="text"
          placeholder="Хайх"
          onChange={(e) => handleChange(e, "srcode")}
        />
      </div>
    ),
    origin: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["origin"] + "px" }}
      >
        <h5>Origin</h5>
        <input
          type="text"
          placeholder="Хайх"
          onChange={(e) => handleChange(e, "origin")}
        />
      </div>
    ),
    vat: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["vat"] + "px" }}
      >
        <h5>VAT</h5>
        <input
          type="text"
          placeholder=""
          onChange={(e) => handleChange(e, "vat")}
          disabled
        />
      </div>
    ),
    salesman: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["salesman"] + "px" }}
      >
        <h5>ХТ код/нэр</h5>
        <input
          type="text"
          placeholder="Хайх"
          onChange={(e) => handleChange(e, "salesman")}
        />
      </div>
    ),
    deliveryman: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["deliveryman"] + "px" }}
      >
        <h5>Түгээгч код/нэр</h5>
        <Dropdown
          options={
            delivermans.length > 0
              ? delivermans.map((item) => ({
                  value: item.user_id,
                  label: item.first_name,
                }))
              : []
          }
          onChange={(e) => handleChange(e, "deliveryman")}
        />
      </div>
    ),
    manager: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["manager"] + "px" }}
      >
        <h5>Менежер</h5>
        <Dropdown
          options={managers}
          onChange={(e) => handleChange(e, "manager")}
        />
      </div>
    ),
    butsaalt: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["butsaalt"] + "px" }}
      >
        <h5>Буцаалт</h5>
        <input
          type="text"
          placeholder="Хайх"
          onChange={(e) => handleChange(e, "butsaalt")}
        />
      </div>
    ),

    cancelReason: <div></div>,
  };

  let headers = localStorage.getItem("ordersHeaderList");
  if (headers == null) {
    sequence.map((sequence) => {
      renderHTML.push(list[sequence]);
    });
  } else {
    let heads = JSON.parse(headers);
    renderHTML.push(list[sequence[0]]);
    heads.map((head) => {
      if (head.show) {
        renderHTML.push(list[sequence[head.index + 1]]);
      }
    });
  }

  return (
    <div className="list_header order" style={{ minWidth: width + "px" }}>
      {renderHTML}
    </div>
  );
};

export default ListHeader;
