import React, { useState, useEffect, useContext, useReducer } from "react";
import Lines from "./TavanBogd/Lines";

const areEqual = (prevProps, nextProps) => true;

const TavanBogd = React.memo((props) => {
  let [categories, setCategories] = useState(false);
  console.log("props tabanbogd", props);

  useEffect(() => {
    fetch(
      "https://api.ebazaar.mn/api/supplierproductgroups/get?supplier_id=" +
        props.supID
    )
      .then((r) => r.json())
      .then((response) => {
        let foo = [];
        response.supplier.map((category) => {
          foo[category.GroupID] = {
            name: category.Name,
            lines: [],
          };
        });
        foo["0"] = {
          name: "Ангилаагүй",
          lines: [],
        };
        props.order.line.map((line) => {
          if (foo[line.supplier_product_group_id]) {
            foo[line.supplier_product_group_id].lines.push(line);
          } else {
            foo["0"].lines.push(line);
          }
        });
        setCategories(foo);
      });
  }, []);
  return categories ? (
    <div key={Math.random()}>
      <Lines lines={categories} data={props.data} />
    </div>
  ) : (
    <div>Түр хүлээнэ үү ...</div>
  );
}, areEqual);

export default TavanBogd;
