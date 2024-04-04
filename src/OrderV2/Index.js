import React, { useState } from "react";
import Tab from "./components/tab/Tab";
import List1 from "./List/List1";
import List2 from "./List/List2";
import List3 from "./List/List3";
import Date from "./components/date/date";
import Sidebar from "./components/sidebar/sidebar";
// import Header from './components/header/header';
import "./style.css";
import { getDates } from "./data/info";
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
  });
  const handleFilterChange = (selectedFilter) => {
    console.log(selectedFilter);
    const { startDate, endDate } = getDates(selectedFilter);
    console.log(startDate, endDate);
    setFilterState((prev) => ({
      ...prev,
      startDate: startDate,
      endDate: endDate,
    }));

    console.log(filterState);
  };

  const tabs = [
    {
      label: "Захиалгын жагсаалт",
      content: () => (
        <List1 filterState={filterState} setFilterState={setFilterState} />
      ),
    },
    { label: "Захиалгын тохиргоо", content: () => <List2 /> },
    { label: "Захиалгын загвар илгээх", content: () => <List3 /> },
  ];
  return (
    <div className="Container">
      <div className="sidebarWrapper">
        <Date
          handleFilterChange={(e) => handleFilterChange(e)}
          selectedFilter={filterState.selectedDate}
        />
        <Sidebar
          onClick={(e) => {
            setFilterState((prev) => ({ ...prev, arigSupplier: e }));
          }}
        />
      </div>
      <Tab tabs={tabs} />
    </div>
  );
};

export default App;
