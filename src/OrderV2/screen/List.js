import React, { useState, useEffect } from "react";
import Total from "./Total";
import myHeaders from "../../components/MyHeader/myHeader";
import Order from "./Order";
import ListHeader from "./ListHeader";
import "./style.css";
import { MouseButtonMessage } from "igniteui-react-charts";

const List = ({
  filterState,
  setFilterState,
  setSelectedOrders,
  selectedOrders,
  data,
  setData,
  filteredData,
  setFilteredData,
}) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [interval, setIntervalDate] = useState(["", ""]);

  const [totalData, SetTotalData] = useState([]);

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

  useEffect(() => {
    // console.log("EFFECT", props.hariutsagchNer);
    setPage(0);
    if (filterState.checked != null) {
      return;
    }
    let starts = Object.values(filterState)
      .map((v) => {
        return v != null;
      })
      .filter((s) => s == true);

    if (starts.length == 0) {
      fetchData(true);
    } else {
      getOrders(true);
    }
  }, [filterState]); // Хуудас солигдох үед датаг fetch хийнэ.
  useEffect(() => {
    if (filterState.checked != null) {
      return;
    }

    let starts = Object.values(filterState)
      .map((v) => {
        return v != null;
      })
      .filter((s) => s == true);

    if (starts.length == 0) {
      fetchData(false);
    } else {
      getOrders(false);
    }
  }, [page]); // Хуудас солигдох үед датаг fetch хийнэ.
  const getOrders = (filter) => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url;

    let params = "";
    if (filterState.startDate && filterState.endDate) {
      params += `order_start=${filterState.startDate}&`;
      params += `order_end=${filterState.endDate}&`;
    }
    if (filterState.supplier) {
      params += `supplier_id=${parseInt(filterState.supplier)}&`;
    }
    if (filterState.order_date) {
      params += `order_date=${filterState.order_date}&`;
    }
    if (filterState.delivery_date) {
      params += `delivery_date=${filterState.delivery_date}&`;
    }
    if (filterState.order_id) {
      params += `id=${parseInt(filterState.order_id)}&`;
    }
    if (filterState.phone) {
      params += `tradeshop_phone=${parseInt(filterState.phone)}&`;
    }
    if (filterState.deliveryman) {
      if (filterState.deliveryman == "null") {
        params += `deliveryManNull=true&`;
      } else if (filterState.deliveryman === "notNull") {
        params += `deliveryManNotNull=true&`;
      } else {
        params += `delivery_man=${filterState.deliveryman}&`;
      }
    }
    if (filterState.status) {
      params += `order_status=${parseInt(filterState.status)}&`;
    }
    if (filterState.tradeshop_name) {
      params += `tradeshop_name=${filterState.tradeshop_name}&`;
    }

    if (filterState.business_type) {
      params += `business_type=${parseInt(filterState.business_type)}&`;
    }
    if (filterState.city) {
      params += `city=${parseInt(filterState.city)}&`;
    }

    if (filterState.district) {
      params += `tradeshop_disctrict=${parseInt(filterState.district)}&`;
    }
    if (filterState.address) {
      params += `address=${filterState.address}&`;
    }

    if (filterState.srcode) {
      params += `back_user_id=${filterState.srcode}&`;
    }
    if (filterState.origin) {
      params += `origin=${filterState.origin}&`;
    }
    if (filterState.arigSupplier) {
      params += `supplier_id=${
        filterState.arigSupplier == "Нийлүүлэгч"
          ? 13954
          : filterState.arigSupplier
      }&`;
    }

    url = `https://api2.ebazaar.mn/api/orders?order_type=1&${params}page=${page}`;

    localStorage.setItem("url", url);
    console.log("url engiin order", url);
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        setLoading(false);
        if (!filter) {
          setData((prev) => [...prev, result.data]);
          setFilteredData((prev) => [...prev, ...result.data]);
        } else {
          setData(result.data);
          setFilteredData(result.data);
        }
      })
      .catch((error) => console.log("error++++", error))
      .finally(() => setLoading(false));
  };
  const fetchData = (filter) => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    setLoading(true);
    const url = `https://api2.ebazaar.mn/api/orders/?order_type=1&page=${page}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!filter) {
          setData((prev) => [...prev, result.data]);
          setFilteredData((prev) => [...prev, ...result.data]);
        } else {
          setData(result.data);
          setFilteredData(result.data);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  //Филтэр хийсэн датаг энд update хийж байна
  const handleFilterChange = (field, value) => {
    const filtered = data.filter((item) =>
      item[field].toString().includes(value.toString())
    );
    setFilteredData(filtered);
  };
  const chooseOrder = (id, value) => {
    value
      ? setSelectedOrders((prev) => [...prev, id])
      : setSelectedOrders(selectedOrders.filter((s) => s != id));
  };

  return (
    <div className="OrderPageWrapper">
      <ListHeader
        sequence={sequence}
        sequenceSizes={sequenceSizes}
        onFilterChange={handleFilterChange}
        filterState={filterState}
        setFilterState={setFilterState}
      />
      {!loading && filteredData.length > 0 ? (
        <div
          className="order_wrapper"
          onScroll={(e) => {
            const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
            const bottom =
              Math.abs(scrollHeight - clientHeight - scrollTop) == 0;

            if (bottom && filteredData.length % 50 == 0) {
              setPage((prev) => prev + 1);
            }
          }}
        >
          {filteredData.map((order) => (
            <Order
              data={order}
              checked={selectedOrders.includes(order.order_id)}
              sequence={sequence}
              onCheckboxChange={(e) =>
                chooseOrder(order.order_id, e.target.checked)
              }
              sequenceSizes={sequenceSizes}
            />
          ))}
        </div>
      ) : (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <Total data={filteredData} />
    </div>
  );
};

export default List;
