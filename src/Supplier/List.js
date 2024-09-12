import React, { useEffect, useState } from "react";
import css from "./list.module.css";

const List = (props) => {
  const [suppliers, setSuppliers] = useState(props.suppliers);

 useEffect(() => {
   // zuvhun oresh (daraa zasah heregtei!!!)

  // Check if company_id matches |13884|
  // if (props.userData.company_id === "|13884|") {
  //   console.log("Company ID 13884 selected");
  // }
   if (
     props.userData.company_id === "|14057|" ||
     props.userData.company_id === "|14142|"
   ) {
     const filteredSuppliers = props.suppliers.filter(
       (supplier) =>
         supplier.id === Number(props.userData.company_id.replace(/\D/g, ""))
     );
     setSuppliers(filteredSuppliers);
   } else {
     setSuppliers(props.suppliers);
   }
 }, [props.suppliers, props.userData.company_id]);
  let content = props.suppliers ? (
    <div className={css.wrapper}>
      {suppliers?.map((e, index) => {
        let name = e.name;
        return (
          <div
            className={`${
              e.id === props.index ? css.selectedContainer : css.container
            }`}
            key={index}
            onClick={() => {
              props.setIndex(e.id);
            }}
          >
            <div
              style={{
                maxWidth: "302px",
                width: "100%",
                display: "flex",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                  width: "100%",
                }}
              >
                {e.is_active ? <b>{name}</b> : name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <span>Түр хүлээнэ үү ...</span>
  );
  return <div className={css.listcontainer}>{content}</div>;
};

export default List;
