import React from "react";
import List from "../screen/List";
import "./style.css";

const List1 = ({
  filteredData,
  setFilteredData,
  setSelectedOrders,
  selectedOrders,
  data,
  setData,
  setFilterState,
  filterState,
}) => {
  return (
    <div className="list">
      <List
        data={data}
        setData={setData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        setFilterState={setFilterState}
        setSelectedOrders={setSelectedOrders}
        selectedOrders={selectedOrders}
        filterState={filterState}
      />
    </div>
  );
};

export default List1;
