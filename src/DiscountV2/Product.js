import React, { useEffect, useState, useContext } from "react";
import myHeaders from "./HeaderContent/HeaderContent";
import PromoHook from "../Hooks/PromoHook";
import ProductReportHook from "../Hooks/ProductsReportHook";
const Product = (props) => {
  const [products, setProducts] = useState([]);
  const promoctx = useContext(PromoHook);
  const ctxProduct = useContext(ProductReportHook);
  let ids = props.valueFormatted;

  useEffect(() => {
    let arr = [];
    ctxProduct.sitedata?.business_types.map((item) => {
      props.data.channel_id?.map((x) => {
        if (item.business_type_id === x) {
          arr.push(item);
        }
      });
    });

    promoctx.setPromoChannel(arr);
    promoctx.setStartDateValue(props.data.start_date);
    promoctx.setEndDateValue(props.data.end_date);
    promoctx.setPriceAndQuantity(props.data.discount_data.value);
    // if (props.data.discount_data.type === "percent") {
    //   promoctx.setSettingActive(0);
    // } else {
    //   promoctx.setSettingActive(1);
    // }
    const products = () => {
      // console.log("promoctx.willUpdateProd", promoctx.willUpdateProd);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://api2.ebazaar.mn/api/products/get1?id=${ids}`,
        requestOptions
      )
        .then((r) => r.json())
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    };
    try {
      products();
    } catch (error) {
      console.log("error product download", error);
    }
  }, []);

  return (
    <div>
      {products?.map((item, index) => {
        return (
          <span
            key={index}
            style={{ fontSize: "12px", color: "#37474F", fontWeight: "400" }}
          >
            {item.name}
            {","}
          </span>
        );
      })}
    </div>
  );
};
export default Product;
