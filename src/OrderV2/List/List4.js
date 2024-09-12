import React from "react";
import List from "../screen/List";
import "./style.css";

const List4 = ({
  filteredData,
  setFilteredData,
  userData,
  setSelectedOrders,
  selectedOrders,
  data,
  setData,
  setFilterState,
  filterState,
  suppliers,
  fieldsData,
  selectedItem,
}) => {
  return (
    <div className="list">
      <List
        selectedItem={selectedItem}
        suppliers={suppliers}
        userData={userData}
        data={data}
        fieldsData={fieldsData}
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

export default List4;
