import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import css from "./supplier.module.css";
import BackOfficeHook from "../../Hooks/BackOfficeHook";
import PromoHook from "../../Hooks/PromoHook";
const Supplier = (props) => {
  const backofficectx = useContext(BackOfficeHook);
  const promoctx = useContext(PromoHook);
  const [name, setName] = useState(null);

  const options = [];
  let defaultName;

  if (backofficectx.suppliers) {
    backofficectx.suppliers.map((supplier) => {
      options.push({ value: supplier.id, label: supplier.english_name });
      if (supplier.id === props?.supID) {
        // console.log("supplier", supplier);
        defaultName = supplier.name;
      }
    });
  }
  const handleChange = (e) => {
    // console.log("e", e);
    // props.supID(e.value);
    let aaa = promoctx.willUpdateProd;
    aaa.supplierID = e.value;

    promoctx.setWillUpdateProd(aaa);
    setName(e.label);

    promoctx.setSupplierID(e.value);
  };
  options.push({value: '13884', label: 'Шуурхай түгээлт'})
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
            label: name === null ? defaultName : name,
            value: props.supID,
          }}
        />
      </div>
    </div>
  );
};

export default Supplier;
