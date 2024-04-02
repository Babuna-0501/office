import React, { useState } from "react";
import css from "./tatah.module.css";
import checkboxicon from "../../assets/check box.svg";
import chechboxchecked from "../../assets/Tick Square on 2.svg";
const data = [250, 100, 100, 250];

const Tatah = (props) => {
  const [tatah, setTatah] = useState("");
  const [seri, setSeri] = useState("");
  const [date1, setDate1] = useState(null);

  let stock = "";
  if (props.data) {
    stock = props.data[props.product._id]?.stock[0];
    //   console.log("stock", stock);
  }

  return (
    <div className={css.productwrapper} key={props.product._id}>
      <div
        style={{
          width: data[0],
        }}
        className={css.prod}
        // onClick={() => SelectHandler(props.product)}
      >
        <span>{props.product.name}</span>
      </div>
      <span
        style={{
          width: data[1],
        }}
      >
        {props.product.stock}
      </span>
      <div
        className={css.inputwrapper}
        style={{
          width: data[2],
        }}
      >
        <input
          type="number"
          placeholder="Татах тоо"
          min={0}
          value={tatah}
          onChange={(e) => {
            let aa = [...props.filteredProducts];
            aa.find(
              (x) => x.randID === props.product.randID
            ).requestedQuantity = Number(e.target.value);
            props.setFilteredProducts(aa);
            setTatah(e.target.value);
          }}
        />
      </div>

      <div
        className={css.inputwrapper}
        style={{
          width: data[2],
        }}
      >
        <input
          type="text"
          placeholder="Сери дугаар"
          value={seri}
          onChange={(e) => {
            let aa = [...props.filteredProducts];
            aa.find((x) => x.randID === props.product.randID).seriesNumber =
              e.target.value.toString();
            props.setFilteredProducts(aa);
            setSeri(e.target.value);
          }}
        />
      </div>
      <div
        className={css.inputwrapper}
        style={{
          width: data[2],
        }}
      >
        <input
          type="date"
          placeholder="Үйлдвэрлэсэн огноо"
          value={date1}
          onChange={(e) => {
            let aa = [...props.filteredProducts];
            aa.find((x) => x.randID === props.product.randID).manufacturedDate =
              e.target.value.toString();
            props.setFilteredProducts(aa);
            setDate1(e.target.value);
          }}
        />
      </div>

      <div
        className={css.inputwrapper}
        style={{
          width: data[2],
          textAlign: "center",
        }}
      >
        <img
          style={{
            width: "25px",
            height: "25px",
          }}
          src={props.product.willExpire ? chechboxchecked : checkboxicon}
          alt={props.product.name}
          onClick={() => {
            let aa = [...props.filteredProducts];
            aa.find((x) => x.randID === props.product.randID).willExpire =
              Boolean(!props.product.willExpire);

            props.setFilteredProducts(aa);
          }}
        />
      </div>
      <button
        className={css.addbtn}
        onClick={() => {
          props.setFilteredProducts((prev) => [
            ...prev,
            {
              ...props.product,
              chosed: true,
              requestedQuantity: "",
              seriesNumber: "",
              manufacturedDate: "",
              expireDate: "",
              willExpire: true,
              randID: Math.random(),
            },
          ]);
        }}
      >
        Нэмэх
      </button>
      <button
        className={css.minusbtn}
        onClick={() => {
          console.log(props.filteredProducts);
          let aa = [...props.filteredProducts];
          aa = aa.filter((x) => x.randID !== props.product.randID);
          props.setFilteredProducts(aa);
        }}
      >
        Хасах
      </button>
    </div>
  );
};

export default Tatah;
