import React, { useContext } from "react";
import BackOfficeHook from "../../Hooks/BackOfficeHook";
const SupplierID = (props) => {
  //   console.log("props supplierID CHECKED", props);

  const backofficeCtx = useContext(BackOfficeHook);
  let content = backofficeCtx.suppliers.filter((item) => {
    if (item.id === props.value) {
      return item;
    }
  });

  content = content.map((it, index) => {
    return (
      <span
        key={index}
        style={{ fontSize: "12px", color: "#37474F", fontWeight: "400" }}
      >
        {it.english_name}
      </span>
    );
  });

  return <div>{content}</div>;
};

export default SupplierID;
