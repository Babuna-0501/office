import React, { useState, useRef } from "react";
import { styles } from "./style";
import css from "./oneproduct.module.css";

const OneProduct = (props) => {
  const [manufacturedDate, setManufacturedDate] = useState(null);
  const [expiredDate, setExpiredDate] = useState(null);
  const [seriNumber, setSeriNumber] = useState(null);
  const seriRef = useRef(0);
  const date1Ref = useRef();
  const date2Ref = useRef();
  return (
    <div className={css.productcontainer}>
      <div
        style={{
          ...styles.checkboxcontainer,
          display: "flex",
          alignItems: "center",
        }}
        className={css.productname}
      >
        <input
          type="checkbox"
          style={{
            width: "20px",
            height: "20px",
          }}
        />
        <span>{props.item._id}</span>
      </div>
      <div
        style={{
          ...styles.supplierContainer,
        }}
        className={css.productname}
      >
        <span>{props.item.name}</span>
      </div>
      <div
        style={{
          ...styles.supplierContainer,
        }}
        className={css.productname}
      >
        <span>{props.item.sku}</span>
      </div>
      <div
        className={css.imagewrapper}
        style={{
          ...styles.supplierContainer,
        }}
      >
        <img
          src={
            props.item.image
              ? props.item.image[0]
              : "https://ebazaar.mn/media/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg"
          }
          alt="product image"
        />
      </div>
      <div
        style={{
          ...styles.supplierContainer,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={css.productname}
      >
        <span>{props.item.stock}</span>
      </div>

      <div
        style={{
          ...styles.supplierContainer,
        }}
        className={css.productname}
      >
        <input
          onChange={(e) => {
            let aaa = props.products;
            aaa.find((x) => x._id === props.item._id).tatahToo = e.target.value;
            props.setProducts(aaa);
          }}
        />
      </div>
      <div
        style={{
          ...styles.inputContainer,
        }}
        className={css.productname}
      >
        <input
          placeholder="Үйлдвэрлэсэн огноо"
          style={{
            ...styles.inputContainer,
          }}
          type="date"
          value={manufacturedDate}
          ref={date1Ref}
          onChange={(e) => {
            let aa = [...props.products];
            aa.find((x) => x._id === props.item._id)["manifactureDate"] =
              date1Ref.current.value;
            console.log("  date1Ref.current.value;", date1Ref.current.value);

            props.setProducts(aa);
            setManufacturedDate(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          ...styles.inputContainer,
        }}
        className={css.productname}
      >
        <input
          placeholder="Дуусах огноо"
          style={{
            ...styles.inputContainer,
          }}
          type="date"
          ref={date2Ref}
          value={expiredDate}
          onChange={(e) => {
            let aa = [...props.products];
            aa.find((x) => x._id === props.item._id)["expireDate"] =
              date2Ref.current.value;

            console.log("date", e.target.value);

            props.setProducts(aa);
            setExpiredDate(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          ...styles.inputContainer,
        }}
        className={css.productname}
      >
        <input
          style={{
            ...styles.inputContainer,
          }}
          placeholder="Сери дугаар"
          value={seriNumber}
          ref={seriRef}
          onChange={(e) => {
            let aa = [...props.products];
            aa.find((x) => x._id === props.item._id)["seriNumber"] = Number(
              seriRef.current.value ? seriRef.current.value : 0
            );

            props.setProducts(aa);
            setSeriNumber(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default OneProduct;
