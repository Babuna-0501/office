import React, { useContext, useEffect } from "react";

import PromoHook from "../../Hooks/PromoHook";

const Brand = (props) => {
  const brandctx = useContext(PromoHook);
  // console.log("props", props);
  // console.log("brandctx", brandctx);
  let brand = [];
  useEffect(() => {
    if (props.brand) {
      brandctx.filter((item) => {
        if (item.id === props.brand) {
          brand.push(item);
        }
      });
    }
  }, [props]);
  return <div>{brand?.name}</div>;
};

export default Brand;
