import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import css from "./supplier.module.css";
import BackOfficeHook from "../../Hooks/BackOfficeHook";
import PromoHook from "../../Hooks/PromoHook";
const Supplier = (props) => {
  const backofficectx = useContext(BackOfficeHook);
  const promoctx = useContext(PromoHook);

  const options = [];
  console.log(JSON.stringify(backofficectx.suppliers))
  options.push({ value: 13884, label: 'Шуурхай түгээлт'});
  if (backofficectx.suppliers) {
    backofficectx.suppliers.map((supplier) => {
      options.push({ value: supplier.id, label: supplier.english_name });
    });
  }
  const handleChange = (e) => {
    props.supID(e.value);
    promoctx.setSupplierID(e.value);
  };
  return (
    <div className={css.container}>
      <div className={css.titlecontainer}>
        <h3>{props.title}</h3>
      </div>
      <div className={css.suppContainer}>
        <Select
          options={options}
          id="supplier"
          onChange={handleChange}
          defaultValue={{
            label: "Нийлүүлэгч сонгох",
            value: "00000000",
          }}
        />
      </div>
    </div>
  );
};

export default Supplier;
