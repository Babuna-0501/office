import React, { useState, useEffect } from "react";
import myHeaders from "../MyHeader/myHeader";
import "./sidebar.css";

const Sidebar = ({ onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  // useEffect(() => {
  //   const fetchSuppliers = async () => {
  //     try {
  //       const url = `https://api2.ebazaar.mn/api/backoffice/suppliers`;

  //       const requestOptions = {
  //         method: "GET",
  //         headers: myHeaders,
  //         redirect: "follow",
  //       };
  //       const response = await fetch(url, requestOptions);
  //       const data = await response.json();
  //       const supplierList = data.data.map((item) => ({
  //         label: item.supplier_name,
  //         value: item.supplier_id,
  //         logo: item.supplier_logo,
  //       }));
  //       setSuppliers(supplierList);
  //       console.log("Supplier list:", supplierList);
  //     } catch (error) {
  //       console.error("Failed to fetch suppliers:", error);
  //     }
  //   };

  //   fetchSuppliers();
  // }, []);

  const getArigSuppliers = async () => {
    try {
      const url2 = `https://api2.ebazaar.mn/api/backoffice/suppliers`;
      const requestOptions2 = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const res = await fetch(url2, requestOptions2);
      const resJson = await res.json();

      const enabledSuppliers = resJson.data.flatMap((item) => {
        const supplierOptions = JSON.parse(item.supplier_options);
        if (
          supplierOptions &&
          supplierOptions.order &&
          supplierOptions.order.showSuppliers &&
          supplierOptions.order.showSuppliers.isEnabled &&
          supplierOptions.order.showSuppliers.supplier
        ) {
          return supplierOptions.order.showSuppliers.supplier.map(
            (supplier) => ({
              value: supplier.id,
              label: supplier.name,
            })
          );
        }
        return [];
      });

      setSuppliers(enabledSuppliers);
      console.log("Supplier list:", enabledSuppliers);
    } catch (err) {
      console.log("Ариг листэнд алдаа гарлаа", err);
    }
  };
  useEffect(() => {
    getArigSuppliers();
  }, []);

  const handleSearchChange = (event) => {
    setFilteredSuppliers(
      suppliers.filter((s) =>
        s.label.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    // setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = suppliers.filter((item) => {
    // item.label.toLowerCase().includes(searchTerm);
  });

  return (
    <div className="sidebar">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          // value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="scroll-container">
        {(filteredSuppliers.length > 0 ? filteredSuppliers : suppliers).map(
          (item) => (
            <div
              key={item.value}
              className="item"
              onClick={() => {
                onClick(item.value);
              }}
            >
              {/* <img src={item.logo} alt={item.label} /> */}
              {item.label}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
