import React, { useEffect, useState } from "react";
import Tab from "./components/tab/Tab";
import List1 from "./List/List1";
import List2 from "./List/List2";
import List3 from "./List/List3";
import DateFilter from "./components/date/date"; // Renamed Date component
import Sidebar from "./components/sidebar/sidebar";
import "./style.css";
import { getDates } from "./data/info";
import myHeaders from "./components/MyHeader/myHeader";
const App = () => {
  const [filterState, setFilterState] = useState({
    order_id: null,
    status: null,
    phone: null,
    tradeshop_name: null,
    order_date: null,
    delivery_date: null,
    business_type: null,
    city: null,
    district: null,
    address: null,
    srcode: null,
    origin: null,
    vat: null,
    salesman: null,
    deliveryman: null,
    butsaalt: null,
    manager: null,
    arigSupplier: null,
    checked: null,
    startDate: null,
    selectedDate: null,
    endDate: null,
    update: null,
  });

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Филтэр хийж байгаа датаг энэ стэйтэд хадгаллаа.

  const [selectedOrders, setSelectedOrders] = useState([]);

  const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter(item => {
      const itemDate = new Date(item.date); 
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
  };

  const handleFilterChange = (selectedFilter, startDate, endDate) => {
    const dataToFilter = [...selectedFilter]; 

    const filteredData = filterDataByDateRange(dataToFilter, startDate, endDate);

    setFilterState((prev) => ({
      ...prev,
      startDate: startDate,
      endDate: endDate,
      filteredData: filteredData,
    }));
  };

  const updateOrdersDeliver = async (id) => {
    // tugeegchiin id

    try {
      selectedOrders.map(async (order) => {
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
          body: JSON.stringify({
            order_id: order,
            deliveryManId: id,
          }),
        };

        let url = `https://api2.ebazaar.mn/api/order/update`;
        await fetch(url, requestOptions)
          .then((r) => r.json())
          .then((result) => {
            setFilterState((prev) => ({
              ...prev,
              update: filterState.update == null ? true : !filterState.update,
            }));
          })
          .catch((error) => console.log("error++++", error));
      });
      alert("Амжилттай");
    } catch (error) {
      alert("Амжилтгүй");
      setFilterState((prev) => ({ ...prev, update: null }));
    }
  };
  useEffect(() => {
    if (filterState.checked != null && filterState.checked) {
      setSelectedOrders(filteredData.map((e) => e.order_id));
    } else {
      setSelectedOrders([]);
    }
  }, [filterState.checked]);

  const tabs = [
    {
      label: "Захиалгын жагсаалт",
      content: () => (
        <div>
          <List1
            data={data}
            setData={setData}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </div>
      ),
    },
    { label: "Захиалгын тохиргоо", content: () => <List2 /> },
    { label: "Захиалгын загвар", content: () => <List3 /> },
  ];

  return (
    <div className="Container">
      <div className="sidebarWrapper">
        <DateFilter
          handleFilterChange={handleFilterChange}
          selectedFilter={filterState.selectedDate}
        />
        <Sidebar
          onClick={(e) => {
            setFilterState((prev) => ({ ...prev, arigSupplier: e }));
          }}
        />
      </div>
      <Tab
        tabs={tabs}
        view={selectedOrders.length > 0 || filterState.checked}
        updateOrdersDeliver={updateOrdersDeliver}
      />
    </div>
  );
};

export default App;
