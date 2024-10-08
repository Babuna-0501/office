import React, { useState, useEffect } from "react";
import myHeaders from "../MyHeader/myHeader";
import "./sidebar.css";

const Sidebar = ({ onClick, suppliers, selectedItem, setSelectedItem }) => {
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  const handleSearchChange = (event) => {
    setFilteredSuppliers(
      suppliers.filter((s) =>
        s.label.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="sidebar">
      <div className="search-bar">
        <input type="text" placeholder="Хайх" onChange={handleSearchChange} />
        <span className="search_icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8.82495"
              cy="8.82491"
              r="6.74142"
              stroke="#808080"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.5137 13.8638L16.1568 16.5"
              stroke="#808080"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <div className="scroll-container">
        {(filteredSuppliers.length > 0 ? filteredSuppliers : suppliers).map(
          (item) => (
            <div
              key={item.value}
              className={`item ${
                selectedItem === item.value ? "selected" : ""
              }`}
              onClick={() => {
                onClick(item.value);
                setSelectedItem(item.value);
              }}
            >
              <img src={item.media} alt={item.label} />
              {item.label}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
