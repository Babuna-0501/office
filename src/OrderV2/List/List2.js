import React, { useEffect, useState } from "react";
import "./style.css";
import ListHeader from "../screen/ListHeader";
const defaultHeaderList = [
  {
    name: "Дугаар",
    show: true,
    index: 0,
  },
  {
    name: "Статус",
    show: true,
    index: 1,
  },
  {
    name: "Захиалга",
    show: true,
    index: 2,
  },
  {
    name: "Захиалсан өдөр",
    show: true,
    index: 3,
  },
  {
    name: "Хүргүүлэх өдөр",
    show: true,
    index: 4,
  },
  {
    name: "Төлбөр",
    show: true,
    index: 5,
  },
  {
    name: "Тэмдэглэл",
    show: true,
    index: 6,
  },
  {
    name: "Утас",
    show: true,
    index: 7,
  },
  {
    name: "Захиалсан",
    show: true,
    index: 8,
  },
  {
    name: "Суваг",
    show: true,
    index: 9,
  },
  {
    name: "Хот/аймаг",
    show: true,
    index: 10,
  },
  {
    name: "Дүүрэг/сум",
    show: true,
    index: 11,
  },
  {
    name: "Хороо",
    show: true,
    index: 12,
  },
  {
    name: "Дэлгэрэнгүй хаяг",
    show: true,
    index: 13,
  },
  {
    name: "Төлбөрийн хэлбэр",
    show: true,
    index: 14,
  },
  {
    name: "Pick Pack",
    show: true,
    index: 15,
  },
  {
    name: "Origin",
    show: true,
    index: 16,
  },
  {
    name: "VAT",
    show: true,
    index: 17,
  },
  {
    name: "ХТ код/нэр",
    show: true,
    index: 18,
  },
  {
    name: "Түгээгч код/нэр",
    show: true,
    index: 19,
  },
  {
    name: "Менежер",
    show: true,
    index: 20,
  },
  {
    name: "Буцаалт",
    show: true,
    index: 21,
  },
];
const List2 = (
  filteredData,
  setFilteredData,
  userData,
  setSelectedOrders,
  selectedOrders,
  data,
  setData,
  setFilterState,
  fieldsData,
  setFieldsData,
  filterState
) => {
  const [headerLists, setHeaderLists] = useState([]);

  const sequence = [
    "index",
    "id",
    "status",
    "orderlist",
    "orderdate",
    "deliverydate",
    "paidamount",
    "note",
    "customerphone",
    "customer",
    "merchants",
    "customerchannel",
    "city",
    "district",
    "khoroo",
    "address",
    "paymenttype",
    "srcode",
    "origin",
    "vat",
    "salesman",
    "deliveryman",
    "manager",
    "butsaalt",
  ];

  const sequenceSizes = {
    index: 52,
    id: 65,
    status: 90,
    orderlist: 150,
    orderdate: 120,
    deliverydate: 120,
    paidamount: 120,
    note: 150,
    paymenttype: 100,
    customer: 120,
    customerphone: 85,
    merchants: 160,
    customerchannel: 140,
    city: 140,
    district: 120,
    khoroo: 120,
    address: 270,
    srcode: 120,
    origin: 120,
    vat: 120,
    salesman: 120,
    deliveryman: 120,
    manager: 140,
    butsaalt: 120,
  };
  console.log(fieldsData);
  useEffect(() => {
    console.log(fieldsData);
    setHeaderLists(fieldsData);
  }, [fieldsData]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const save = () => {
    alert("Хадгаллаа");
    window.location.reload();
  };

  return (
    <div className="order_settings">
      <div className="tab_buttons">
        <button
          className={activeTab === 0 ? "active" : ""}
          onClick={() => handleTabClick(0)}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="18" fill="#F2F2F2" />
            <path
              d="M22.2675 25.2032V13.1875"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25.868 21.5898L22.2699 25.2045L18.6719 21.5898"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.5097 10.793V22.8087"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.91016 14.4077L13.5082 10.793L17.1062 14.4077"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Захиалгын багана, эрэмбийн тохиргоо
        </button>
        <button
          className={activeTab === 1 ? "active" : ""}
          onClick={() => handleTabClick(1)}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="18" fill="#F2F2F2" />
            <path
              d="M22.2675 25.2032V13.1875"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25.868 21.5898L22.2699 25.2045L18.6719 21.5898"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.5097 10.793V22.8087"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.91016 14.4077L13.5082 10.793L17.1062 14.4077"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Захиалгын ерөнхий тохиргоо
        </button>
        <button
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleTabClick(2)}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="18" fill="#F2F2F2" />
            <path
              d="M22.2675 25.2032V13.1875"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25.868 21.5898L22.2699 25.2045L18.6719 21.5898"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.5097 10.793V22.8087"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.91016 14.4077L13.5082 10.793L17.1062 14.4077"
              stroke="#4D4D4D"
              stroke-width="1.37868"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Захиалгын дүнгийн тохиргоо
        </button>
      </div>
      {activeTab === 0 && (
        <div className="tab_content">
          <ListHeader
            userData={userData}
            sequence={sequence}
            users={[]}
            sequenceSizes={sequenceSizes}
            onFilterChange={() => {}}
            filterState={filterState}
            setFilterState={setFilterState}
            handleSpinner={() => {}}
          />
          <div style={{ marginTop: "3rem" }}>
            <h3 style={{ fontSize: "14px" }}>
              Багана зайг ихэсгэх багасгах тохируулах боломжтой
            </h3>

            <div
              className="stick_wrapper"
              style={{ fontSize: "12px", marginTop: "20px" }}
            >
              {headerLists?.map((head, i) => {
                return (
                  <div key={i}>
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked={head.show}
                        onChange={(e) => {
                          head.show = e.target.checked;
                          setHeaderLists((prev) => [...prev]);
                        }}
                      />
                      <span class="slider round"></span>
                    </label>
                    {head.name}
                  </div>
                );
              })}
            </div>
            <button onClick={() => save()}>Хадгалах</button>
          </div>
        </div>
      )}
      {activeTab === 1 && (
        <div className="tab_content">
          <h3>Захиалгын ерөнхий тохиргоо content goes here</h3>
        </div>
      )}
      {activeTab === 2 && (
        <div className="tab_content">
          <h3>Захиалгын дүнгийн тохиргоо content goes here</h3>
        </div>
      )}
    </div>
  );
};

export default List2;
