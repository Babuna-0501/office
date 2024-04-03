import { useState, useEffect } from "react";
import Dropdown from "../components/status/dropdown";
import DatePick from "../components/datepick/datepick";
import Channel from "../data/info";
import CityData from "../data/city.json";

import "./style.css";

const options = [
  { value: "1", label: "Бүгд" },
  { value: "2", label: "Хүлээгдэж буй" },
  { value: "3", label: "Баталгаажсан" },
  { value: "4", label: "Хүргэгдсэн" },
  { value: "5", label: "Цуцлагдсан" },
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
  // const [filters, setFilters] = useState({
  //   selectAll: null,
  //   orderId: null,
  //   status: null,
  //   orderList: null,
  //   orderDate: null,
  //   deliveryDate: null,
  //   paidAmount: null,
  //   paymentType: null,
  //   note: null,
  //   customerPhone: null,
  //   merchantName: null,
  //   customerChannel: null,
  //   tradeshopCity: null,
  //   tradeshopDistrict: null,
  //   tradeshopHoroo: null,
  //   fullAddress: null,
  //   srcode: null,
  //   origin: null,
  //   VAT: null,
  //   salesmanId: null,
  //   deliverymanId: null,
  //   manager: null,
  //   butsaalt: null
  // });

  const [orderIdFilter, setOrderIdFilter] = useState("");
  // const [customerIdFilter, setCustomerIdFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [merchant, setMerchantFilter] = useState("");
  const [city, SetCity] = useState("");

  const onFilterChange = (filterValue) => {
    console.log("Filter changed:", filterValue);
  };

  const handleChange = (event, key) => {
    props.setFilterState((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStatus(selectedValue);
    props.onFilterChange("status", selectedValue);
  };

  const handleOrderIdFilterChange = (event) => {
    setOrderIdFilter(event.target.value);
    props.onFilterChange("order_id", event.target.value);
  };

  const handlePhoneFilter = (event) => {
    setPhoneFilter(event.target.value);
    props.onFilterChange("phone", event.target.value);
  };

  const handleMerchantFilter = (event) => {
    setMerchantFilter(event.target.value);
    props.onFilterChange("tradeshop_name", event.target.value);
  };

  const handleCityFilter = (e) => {
    const selectedCity = e.target.value;
    SetCity(selectedCity);
    props.onFilterChange("tradeshop_city", e.target.value);
  };

  // const handleCustomerIdFilterChange = (event) => {
  //   setCustomerIdFilter(event.target.value);
  //   props.onFilterChange('customer_id', event.target.value);
  // };

  const sequence = props.sequence;
  const sequenceSizes = props.sequenceSizes;
  let width = 0;
  for (const size in sequenceSizes) {
    width += sequenceSizes[size];
  }

  // const handleDropdownChange = (event) => {
  //   console.log('Selected option:', event.target.value);
  // };

  // const handleDropdownChange2 = (selectedValue) => {
  //   console.log('Selected option:', selectedValue);
  // };

  // const handleManager = (event) => {
  //     console.log('Менежэр сонголоо', event.target.value)
  // }

  const CityArray = CityData.City || [];

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
          value={props.filterState.order_id}
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
          options={options}
          onChange={(e) => {
            handleChange(e, "status");
          }}
        />
        {/* <Dropdown options={options} onChange={handleStatusChange} /> */}
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
    paymenttype: (
      <div
        className="order_commonfield"
        style={{ width: sequenceSizes["paidamount"] + "px" }}
      >
        <h5>Төлбөрийн хэлбэр</h5>
        <input type="text" placeholder="Хайх" />
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
          value={phoneFilter}
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
          value={merchant}
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
          // onChange={handleDropdownChange2}
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
          value={city}
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
          options={CityArray.map((item) => ({
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
        {/* <Dropdown/> */}
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
          placeholder="Хайх"
          onChange={(e) => handleChange(e, "vat")}
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
        <input
          type="text"
          placeholder="Хайх"
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

  sequence.map((sequence) => {
    renderHTML.push(list[sequence]);
  });

  return (
    <div className="list_header order" style={{ minWidth: width + "px" }}>
      {renderHTML}
    </div>
  );
};

export default ListHeader;
