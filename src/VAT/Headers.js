import React, { useState, useEffect, useContext } from "react";
import { styles } from "./style";
import css from "./Header.module.css";

const HeaderMain = () => {
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    supplier: "",
    image: "",
    name: "",
    barcode: "",
    sku: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="row header">
      <div style={{ ...styles.checkboxcontainer }}>
        <div>
          <span className="header">ID</span>
          <input
            type="text"
            name="id"
            value={searchTerms.id}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div style={{ ...styles.supplierId }}>
        Нийлүүлэгч
        <input
          type="text"
          name="supplier"
          value={searchTerms.supplier}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ width: "80px" }}>
        <div>
          <span className="header">Image</span>
          <input
            type="text"
            name="image"
            value={searchTerms.image}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div style={{ ...styles.productName }}>
        <div>
          <span className="header">Name</span>
          <input
            type="text"
            name="name"
            value={searchTerms.name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div style={{ ...styles.barCode }}>
        <div>
          <span className="header">Barcode</span>
          <input
            type="text"
            name="barcode"
            value={searchTerms.barcode}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div style={{ ...styles.SKU }}>
        <div>
          <span className="header">SKU</span>
          <input
            type="text"
            name="sku"
            value={searchTerms.sku}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
