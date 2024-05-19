import React from "react";
import List from "../screen/List";
import "./style.css";

const List1 = ({
  filteredData,
  setFilteredData,
  userData,
  setSelectedOrders,
  selectedOrders,
  data,
  setData,
  setFilterState,
  fieldsData,
  filterState,
}) => {
  return (
    <div className="list">
      <List
        fieldsData={fieldsData}
        userData={userData}
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
