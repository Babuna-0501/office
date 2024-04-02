import React, { useContext, useEffect, useState } from "react";
import css from "./product.module.css";
import checkboxicon from "../../assets/check box.svg";
import checkedIcon from "../../assets/check box_black.svg";
import { styles } from "./style";
import PromoHook from "../../Hooks/PromoHook";
const Product = ({ item }) => {
  const promoctx = useContext(PromoHook);
  const [checked, setChecked] = useState(false);

  let imagesrc =
    "https://ebazaar.mn/media/product/9989646044764598603108547708202205130611436585188195547456197872435120.png";
  if (item.image !== null && item.image && item.image[0]) {
    imagesrc = item.image[0].replace("original", "small");
  }
  const ChosedHandler = () => {
    if (promoctx.productIDS && promoctx.productIDS.includes(item._id)) {
      let bb = promoctx.productIDS.filter((item) => item !== item._id);
      promoctx.setProductIDS(bb);
      setChecked((prev) => !prev);
      console.log("daragdlaa haslaa");
      console.log("productIDS", promoctx.productIDS);
    } else {
      promoctx.setProductIDS((prev) => [...prev, item._id]);
      console.log("daragdlaa nemlee");
      setChecked((prev) => !prev);
      console.log("productIDS", promoctx.productIDS);
    }
  };
  useEffect(() => {
    if (promoctx.productIDS && promoctx.productIDS.includes(item._id)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [item]);
  return (
    <div className={css.container}>
      <div
        className={css.checkcontainer}
        style={{
          ...styles.checkboxcontainer,
        }}
      >
        <img
          src={checked ? checkedIcon : checkboxicon}
          alt="checked box"
          onClick={ChosedHandler}
        />
      </div>
      <div
        style={{
          ...styles.idcontainer,
          textDecoration: "underline",
          color: "#706AC5",
        }}
      >
        {item && item._id}
      </div>
      {/* <div
        style={{
          ...styles.supplierId,
        }}
      >
        {item && item.supplier_id}
      </div> */}
      <div
        className={css.imagecontainer}
        style={{
          width: "80px",
        }}
      >
        <img src={imagesrc} alt={item.name} />
      </div>
      <div
        style={{
          ...styles.productName,
        }}
      >
        {item && item.name}
      </div>
      <div
        style={{
          ...styles.barCode,
        }}
      >
        {item && item.category_id}
      </div>
      <div
        style={{
          ...styles.barCode,
        }}
      >
        {item && item.brand}
      </div>
      <div
        style={{
          ...styles.barCode,
        }}
      >
        {item &&
          item.locations["62f4aabe45a4e22552a3969f"].price.channel[
            "1"
          ]?.toLocaleString() + "₮"}
      </div>
      <div
        style={{
          ...styles.barCode,
        }}
      >
        {" "}
        {item && item.created_date.split("T")[0]}
      </div>
      <div
        style={{
          ...styles.SKU,
        }}
      >
        {item && item.sku}
      </div>
      <div
        style={{
          ...styles.barCode,
        }}
      >
        {item && item.bar_code}
      </div>
    </div>
  );
};

export default Product;
