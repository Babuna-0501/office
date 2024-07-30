import { useState, useEffect, useRef } from "react";
import Dropdown from "../components/status/dropdown";
import DatePick from "../components/datepick/datepick";
import Channel from "../data/info";
import CityData from "../data/city.json";
import DistrictData from "../data/district.json";

import "./style.css";
import { visibles } from "../List/List2";
import { tsastaltaindol } from "../Index";
import { nerst } from "../Index";

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
  { value: '', label: "Бүгд" },
  { value: 1, label: "Дансаар" },
  { value: 2, label: "Бэлнээр" },
  { value: 3, label: "Зээлээр" },
  { value: 4, label: "Бэлэн+Данс" },
  { value: 5, label: "Бэлэн+Зээл" },
  { value: 6, label: "Данс+Зээл" },
];

let originData = [
  { value: '', label: "Бүгд" },
  { value: 1, label: "Androvalue" },
  { value: 2, label: "iOS" },
  { value: 3, label: "Web" },
  { value: 4, label: "SFA" },
  { value: 5, label: "Base" },
  { value: 6, label: "Eclinic" },
  { value: 7, label: "OnTimePos" },
  { value: 8, label: "Pos Test" },
  { value: 9, label: "Qmenu" },
  { value: 10, label: "Amar" },
];

const ListHeader = ({
  fieldsData,
  handleSort,
  headerLists,
  drag,
  hts,
  users,
  ...props
}) => {
  const dragList = useRef(0);
  const draggedOverList = useRef(0);
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

  const [ht, setHt] = useState([
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
  if (props.userData.company_id == tsastaltaindol || nerst ) {
    originData = [
      { value: '', label: "Бүгд" },
      { value: 1, label: "mobile" },
      { value: 2, label: "SFA" },
    ];
  }
  // const handleChange = (event, key) => {
  //   props.setFilterState((prev) => ({ ...prev, [key]: event.target.value }));
  // };

  useEffect(() => {
    if (delivermans.length - 3 < users?.length) {
      setDeliverMans([
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
        ...users.map((h) => {
          return {
            user_id: h.user_id,
            first_name: h.first_name,
          };
        }),
      ]);
    }
  }, [users]);

  useEffect(() => {
    if (ht.length - 3 < hts?.length) {
      setHt([
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
        ...hts.map((h) => {
          return {
            user_id: h.user_id,
            first_name: h.first_name,
          };
        }),
      ]);
    }
  }, [hts]);

  const handleChange = (event, key) => {
    const { target } = event;
    const { value } = target;
    console.log(value);

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

    const { userData, data } = props;

    if (!userData.company_id) {
      return [];
    }

    const filteredOptions =
      props.userData?.company_id === "|14268|"
        ? options.concat(options2)
        : options;

    return filteredOptions.filter((option) => {
      const statusValue = parseInt(option.value);
      return !(statusValue === 2 && [14, 15].includes(userData.ShipmentStatus));
    });
  };

  const CityArray = CityData.City || [];
  const DistrictArray = DistrictData.District || [];
  const [renderHTML, setHTML] = useState([]);

  const list = {
    index: (
      <div
        className="order_index"
        key={0}
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
      <div
        className="order_id"
        style={{ width: sequenceSizes["id"] + "px" }}
        key={1}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 1)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 1
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
      >
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
        className="order_status"
        key={2}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 34)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 34
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        style={{ width: sequenceSizes["status"] + "px" }}
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
        key={3}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 5)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 5
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        className="order_date"
        style={{ width: sequenceSizes["orderlist"] + "px" }}
      >
        <h5>Захиалга</h5>
        <input type="text" disabled />
      </div>
    ),
    orderdate: (
      <div
        key={4}
        className="order_commonfield"
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 35)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 35
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        style={{ width: sequenceSizes["orderdate"] + "px" }}
      >
        <h5>Захиалсан өдөр</h5>
        <DatePick handleChange={(e) => handleChange(e, "order_date")} />
      </div>
    ),
    deliverydate: (
      <div
        key={5}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 36)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 36
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        className="order_commonfield"
        style={{ width: sequenceSizes["deliverydate"] + "px" }}
      >
        <h5>Хүргүүлэх өдөр</h5>
        <DatePick handleChange={(e) => handleChange(e, "delivery_date")} />
      </div>
    ),
    paidamount: (
      <div
        key={6}
        className="order_commonfield"
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 9)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 9
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        style={{ width: sequenceSizes["paymenttype"] + "px" }}
      >
        <h5>Төлбөр:</h5>
        <h5>Төлөөгүй</h5>
        <h5>Төлсөн</h5>
      </div>
    ),
    note: (
      <div
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 12)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 12
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        key={7}
        className="order_commonfield"
        style={{ width: sequenceSizes["note"] + "px" }}
      >
        <h5>Тэмдэглэл</h5>
        <input type="text" disabled />
      </div>
    ),

    customerphone: (
      <div
        key={8}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 13)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 13
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
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
        key={9}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 7)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 7
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
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
        key={10}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 15)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 15
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
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
        key={11}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 16)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 16
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
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
        key={12}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 17)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 17
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
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
        key={13}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 18)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 18
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
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
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 19)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 19
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        key={14}
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
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 20)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 20
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        key={15}
        className="order_commonfield"
        style={{ width: sequenceSizes["paidamount"] + "px" }}
      >
        <h5>Төлбөрийн хэлбэр</h5>
        <Dropdown
          options={paymentMethods}
          onChange={(e) => handleChange(e, "payment_status")}
        />
      </div>
    ),
    srcode: (
      <div
        key={16}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 21)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 21
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
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
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 22)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 22
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        className="order_commonfield"
        key={17}
        style={{ width: sequenceSizes["origin"] + "px" }}
      >
        <h5>Origin</h5>
        <Dropdown
          options={originData}
          onChange={(e) => handleChange(e, "origin")}
        />
        {/* <input
          type="text"
          placeholder="Хайх"
          onChange={(e) => handleChange(e, "origin")}
        /> */}
      </div>
    ),
    vat: (
      <div
        key={18}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 23)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 23
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
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
        key={19}
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 33)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 33
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        style={{ width: sequenceSizes["salesman"] + "px" }}
      >
        <h5>ХТ код/нэр</h5>
        <Dropdown
          options={
            ht.length > 0
              ? ht.map((item) => ({
                  value: item.user_id,
                  label: item.first_name,
                }))
              : []
          }
          onChange={(e) => handleChange(e, "salesman")}
        />
      </div>
    ),
    deliveryman: (
      <div
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 28)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 28
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
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
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 25)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 25
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        key={21}
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
        draggable={drag}
        onDragStart={() => {
          dragList.current = headerLists.filter((h) => h.id == 32)[0].position;
        }}
        onDragEnter={() => {
          draggedOverList.current = headerLists.filter(
            (h) => h.id == 32
          )[0].position;
        }}
        onDragEnd={() => handleSort(dragList.current, draggedOverList.current)}
        onDragOver={(e) => e.preventDefault()}
        key={22}
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

  useEffect(() => {
    if (drag) {
      setHTML([
        list[sequence[0]],
        ...headerLists
          .sort((a, b) => a.position - b.position)
          .map((head) => {
            if (head.position >= 0 && head.show && head.permission) {
              return list[sequence[head.id]];
            }
          })
          .filter((f) => f != undefined),
      ]);
      return;
    }
    if (!fieldsData) {
      setHTML(
        sequence.map((sequence) => {
          return list[sequence] != null ? list[sequence] : [];
        })
      );
    } else {
      let heads = fieldsData?.order?.field ?? [];

      setHTML([
        list[sequence[0]],
        ...heads
          .sort((a, b) => a.position - b.position)
          .map((head) => {
            if (
              head.position >= 0 &&
              head.show &&
              !visibles.includes(head.id) &&
              head.permission
            ) {
              return list[sequence[head.id]];
            }
          })
          .filter((f) => f != undefined),
      ]);
    }
  }, [fieldsData, ht, users, headerLists]);

  // let headers = localStorage.getItem("ordersHeaderList");

  return (
    <div className="list_header order" style={{ minWidth: width + "px" }}>
      {renderHTML}
    </div>
  );
};

export default ListHeader;
