import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

import Total from "./Total";
import myHeaders from "../../components/MyHeader/myHeader";
import Order from "./Order";
import ListHeader from "./ListHeader";
import "./style.css";

const List = ({
  filterState,
  setFilterState,
  setSelectedOrders,
  selectedOrders,
  userData,
  data,
  setData,
  filteredData,
  setFilteredData,
}) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [interval, setIntervalDate] = useState(["", ""]);

  const [totalData, SetTotalData] = useState([]);
  const [hariutsagch, setHariutsagch] = useState();
  const [delivermans, setDeliverMans] = useState([]);
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

  const myCustomHeaders = [
    { label: "Order number", key: "order_id" },
    { label: "Vendor", key: "order_supplier" },
    { label: "Total", key: "grand_total" },
    { label: "Completed at", key: "product_name" },
    { label: "When to ship", key: "delivery_date" },
    { label: "Shipped at", key: "product_name" },
    { label: "Note", key: "product_name" },
    { label: "Receiver phone", key: "phone" },
    { label: "Receiver info", key: "product_name" },
    { label: "Receiver name", key: "product_name" },
    { label: "Branch", key: "product_name" },
    { label: "Business type", key: "product_name" },
    { label: "State name", key: "tradeshop_city" },
    { label: "District", key: "tradeshop_district" },
    { label: "Quarter", key: "product_name" },
    { label: "Address", key: "product_name" },
    { label: "Original total", key: "product_name" },
    { label: "Status", key: "order_supplier" },
    { label: "Register", key: "product_name" },
  ];
  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const companyId = Number(props.userData.company_id.replaceAll("|", ""));

  //       const url = `https://api2.ebazaar.mn/api/backoffice/users?company=${companyId}`;
  //       const requestOptions = {
  //         method: "GET",
  //         headers: myHeaders,
  //         redirect: "follow",
  //       };

  //       const res = await fetch(url, requestOptions);
  //       const resData = await res.json();

  //       setHariutsagch(resData.data);
  //       console.log("USER", resData.data);
  //     } catch (error) {
  //       console.log("error while fetching users: ", error);
  //     }
  //   };

  //   getUsers();
  // }, []);
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

    if (page != 0) {
      if (starts.length == 0) {
        fetchData(false);
      } else {
        getOrders(false);
      }
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
    const changeParams = (value, name, all = "0") => {
      value == all
        ? (params = params
            .split("&")
            .filter((u) => !u.includes(name))
            .join(""))
        : (params += `${name}=${parseInt(value)}&`);
    };
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
      changeParams(filterState.status, "order_status");
    }
    if (filterState.tradeshop_name) {
      params += `tradeshop_name=${filterState.tradeshop_name}&`;
    }

    if (filterState.business_type) {
      changeParams(filterState.business_type, "business_type");
    }
    if (filterState.city) {
      changeParams(filterState.city, "city");
    }
    if (filterState.district) {
      changeParams(filterState.district, "tradeshop_disctrict");
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
        // setLoading(false);
        console.log(filter);
        // if (!filter) {
        //   // console.log('one 1Ө')
        //   setData((prev) => [...prev, result.data]);
        //   setFilteredData((prev) => [...prev, ...result.data]);
        // } else {
        //   setData(result.data);
        //   setFilteredData(result.data);
        // }
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

  const handleSpinner = (showSpinner) => {
    setLoading(showSpinner);
  };
  const fetchUserData = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const response = await fetch(
        "https://api2.ebazaar.mn/api/backoffice/users",
        requestOptions
      );
      const data2 = await response.json();
      setDeliverMans(data2.data);
      // console.log("batdorj k", data2.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="OrderPageWrapper">
        <ListHeader
          userData={userData}
          sequence={sequence}
          sequenceSizes={sequenceSizes}
          onFilterChange={handleFilterChange}
          filterState={filterState}
          setFilterState={setFilterState}
          handleSpinner={handleSpinner}
        />
        {!loading && filteredData && filteredData.length > 0 ? (
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
            {filteredData.map((order) => {
              let all = order.line
                .map((e) => e.price * e.quantity)
                .reduce((a, b) => a + b);

              let paid = JSON.parse(order.order_data)?.prePayment ?? 0;

              paid = paid == "" ? 0 : paid;
              all = all == "" ? 0 : all;
              const matchUser = delivermans?.find(
                (user) => user.user_id === order.deliver_man
              );
              const matchHt = delivermans?.find(
                (user) => user.user_id === order.sales_man_employee_id
              );

              return (
                <Order
                  payment={{ balance: all - paid, all: all, paid: paid }}
                  data={order}
                  checked={selectedOrders.includes(order.order_id)}
                  sequence={sequence}
                  firstname={matchUser?.first_name ?? ""}
                  salesmanFirstname={matchHt?.first_name ?? ""}
                  onCheckboxChange={(e) =>
                    chooseOrder(order.order_id, e.target.checked)
                  }
                  sequenceSizes={sequenceSizes}
                />
              );
            })}
          </div>
        ) : (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      <Total data={filteredData} userData={userData} />
      <CSVLink
        data={filteredData}
        headers={myCustomHeaders}
        filename={"orders.csv"}
        className="export-button"
      >
        Export to Excel
      </CSVLink>
    </>
  );
};

export default List;
