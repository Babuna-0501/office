import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

import Total from "./Total";
import myHeaders from "../../components/MyHeader/myHeader";
import Order from "./Order";
import ListHeader from "./ListHeader";
import "./style.css";
import { sequence } from "../List/List2";

const List = ({
  filterState,
  setFilterState,
  setSelectedOrders,
  selectedOrders,
  userData,
  data,
  setData,
  fieldsData,
  filteredData,
  setFilteredData,
  selectedItem,
  suppliers,
}) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [interval, setIntervalDate] = useState(["", ""]);

  const [totalData, SetTotalData] = useState([]);
  const [hariutsagch, setHariutsagch] = useState();
  const [delivermans, setDeliverMans] = useState([]);

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
    { label: "Vendor", key: "supplier_id" },
    { label: "Total", key: "grand_total" },
    { label: "Completed at", key: "delivery_date" },
    { label: "When to ship", key: "delivery_date" },
    { label: "Shipped at", key: "product_name" },
    { label: "Note", key: "description" },
    { label: "Receiver phone", key: "phone" },
    { label: "Receiver info", key: "business_name" },
    { label: "Receiver name", key: "tradeshop_name" },
    { label: "Branch", key: "phone" },
    { label: "Business type", key: "business_type_id" },
    { label: "City", key: "tradeshop_city" },
    { label: "District", key: "tradeshop_district" },
    { label: "Quarter", key: "product_name" },
    { label: "Address", key: "address" },
    { label: "Original total", key: "product_name" },
    { label: "Status", key: "order_supplier" },
    { label: "Register", key: "register" },
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
    setPage(1);
    if (filterState.checked != null) {
      return;
    }

    let starts = Object.values(filterState)
      ?.map((v) => {
        return v != null;
      })
      ?.filter((s) => s == true);

    if (starts.length == 0) {
      fetchData(true);
    } else {
      getOrders(true, true, 1);
    }
  }, [filterState, suppliers]); // Хуудас солигдох үед датаг fetch хийнэ.
  
  useEffect(() => {
    if (filterState.checked != null) {
      return;
    }

    let starts = Object.values(filterState)
      .map((v) => {
        return v != null;
      })
      .filter((s) => s == true);

    if (page != 1) {
      if (starts.length == 0) {
        fetchData(false, false);
      } else {
        getOrders(false, false, page);
      }
    }
  }, [page]); // Хуудас солигдох үед датаг fetch хийнэ.

  const getOrders = async (filter, loading = true, p) => {
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
            .join("&"))
        : (params += `${name}=${parseInt(value).toString()}&`);
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
    if (filterState.khoroo) {
      params += `khoroo=${filterState.khoroo}&`;
    }
    if (filterState.order_id) {
      params += `orderId=${parseInt(filterState.order_id)}&`;
    }
    // if (filterState.salesman) {
    //   params += `sales_man_employee_id=${parseInt(filterState.salesman)}&`;
    // }
    if (filterState.salesman && filterState.salesman != "") {
      if (filterState.salesman == "null") {
        params += `salesman_null=true&`;
      } else if (filterState.salesman === "notNull") {
        params += `salesman_notnull=true&`;
      } else {
        params += `salesMan=${filterState.salesman.toString()}` + "&";
      }
    }
    if (filterState?.phone) {
      params += `tradeshop_phone=${filterState?.phone}&`;
      // params += `tradeshop_phone=${parseInt(filterState.phone)}&`;
    }

    //  if (orderPrice) {
    //    params += `amount_equal=${orderPrice}&`;
    //  }

    if (filterState.deliveryman && filterState.deliveryman != "") {
      if (filterState.deliveryman == "null") {
        params += `deliveryman_null=true&`;
      } else if (filterState.deliveryman === "notNull") {
        params += `deliveryman_notnull=true&`;
      } else {
        // null utga awdag
        params += `delivery_man=${filterState.deliveryman.toString()}` + "&";
      }
    }

    if (filterState.status) {
      if (userData.company_id === "|14268|") {
        changeParams(filterState.status, "shipment_status");
      } else {
        changeParams(filterState.status, "order_status");
      }
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
    const admin = userData.user_id == 1;
    url = admin
      ? `https://api2.ebazaar.mn/api/orders/?${params}page=${p - 1}`
      : `https://api2.ebazaar.mn/api/order/${
          suppliers ? "sfa" : "b2b"
        }?${params}page=${p}`;

    localStorage.setItem("url", url);
    console.log("url engiin order", url);

    if (loading) setLoading(true);
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        console.log(res.orders);
        // console.log(res.orders.filter((r) => r.ShipmentStatus == 14));
        if (res?.message == "success") {
          if (filter) {
            setData(res.orders);
            setFilteredData(res.orders);
          } else {
            setData((prev) => [...prev, ...res.orders]);
            setFilteredData((prev) => [...prev, ...res.orders]);
          }
        } else {
          console.log(res);
          console.error("Empty or invalid response from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setLoading(false);
  };
  const fetchData = (filter, loading = true) => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
const admin = userData.user_id == 1;
    if (loading) setLoading(true);
    const url = admin
      ? `https://api2.ebazaar.mn/api/orders/?order_type=1&page=${page - 1}`
      : `https://api2.ebazaar.mn/api/order/${
          suppliers ? "sfa" : "b2b"
        }?order_type=1&page=${page}`;

    console.log("url engiin order", url);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.orders);
        if (filter) {
          setData(result.orders);
          setFilteredData(result.orders);
        } else {
          setData((prev) => [...prev, ...result.orders]);
          setFilteredData((prev) => [...prev, ...result.orders]);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  //Филтэр хийсэн датаг энд update хийж байна
  const handleFilterChange = (field, value) => {
    const filtered = data?.filter((item) =>
      item[field].toString().includes(value.toString())
    );
    setFilteredData(filtered);
  };
  const chooseOrder = (id, value) => {
    value
      ? setSelectedOrders((prev) => [...prev, id])
      : setSelectedOrders(selectedOrders?.filter((s) => s != id));
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
  let headers = JSON.parse(localStorage.getItem("ordersHeaderList"));
  let head = headers?.map((h) => h.show);

  const formattedData = filteredData.map((item) => ({
    ...item,
    delivery_date: item.delivery_date
      ? new Date(item.delivery_date).toLocaleDateString("en-US")
      : "",
  }));

  return (
    <>
      <div
        className="OrderPageWrapper"
        onScroll={(e) => {
          e.preventDefault();
          const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

          const tolerance = 5; 
          const bottom = scrollHeight - clientHeight - scrollTop <= tolerance;

          if (bottom & (filteredData.length > 0)) {
            setPage((prev) => prev + 1);
          }
        }}
      >
        <ListHeader
          fieldsData={fieldsData}
          userData={userData}
          sequence={sequence}
          users={[
            ...new Map(
              []
                .concat(
                  ...filteredData.map((f) =>
                    delivermans.filter(
                      (deliver) => f.deliver_man === deliver.user_id
                    )
                  )
                )
                .map((c) => [c.user_id, c])
            ).values(),
          ]}
          hts={[
            ...new Map(
              []
                .concat(
                  ...filteredData.map((f) =>
                    delivermans.filter(
                      (deliver) => f.sales_man_employee_id === deliver.user_id
                    )
                  )
                )
                .map((c) => [c.user_id, c])
            ).values(),
          ]}
          sequenceSizes={sequenceSizes}
          onFilterChange={handleFilterChange}
          filterState={filterState}
          setFilterState={setFilterState}
          handleSpinner={handleSpinner}
        />
        {!loading && filteredData && filteredData.length > 0 ? (
          <div className="order_wrapper">
            {filteredData?.map((order) => {
              let all =
                order.line
                  ?.map((e) => e.price * e.quantity)
                  ?.reduce((a, b) => a + b) + 6000;
              let paid =
                order.order_data != undefined
                  ? JSON.parse(order.order_data)?.prePayment ?? 0
                  : 0;

              paid = paid == "" ? 0 : paid;
              all = all == "" ? 0 : all;
              const matchUser = delivermans?.find(
                (user) => user.user_id === order.deliver_man
              );
              const matchHt = delivermans?.find(
                (user) => user.user_id === order.sales_man
              );

              return (
                <Order
                  fieldsData={fieldsData}
                  fetch={() => fetchData(true)}
                  userData={userData}
                  payment={{ balance: all - paid, all: all, paid: paid }}
                  data={order}
                  checked={selectedOrders.includes(order.order_id)}
                  head={head}
                  status={filterState.status}
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
    </>
  );
};

export default List;
