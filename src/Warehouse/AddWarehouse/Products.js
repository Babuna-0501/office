import React, { useState } from "react";
import css from "./products.module.css";
import { styles } from "./style";

const Products = () => {
  //alert('baraa tatah')
  const [products, setProducts] = useState([]);
  const [searchvalue, setSearchvalue] = useState(null);
  const [searchsku, setSearchsku] = useState(null);
  const [searchid, setSearchid] = useState(null);
  const [notes, setNotes] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouse, setWarehouse] = useState(null);
  const [supplersearch, setSupplersearch] = useState(null);
  const [toAguulah, setToAguulah] = useState(null);
  const [mainAguulah, setMainAguulah] = useState("");
  const [productids, setProductids] = useState(null);
  const [page, setPage] = useState(1);
  const [mainAguulahProducts, setMainAguulahProducts] = useState([]);
  const [oneAguulah, setOneAguulah] = useState([]);
  const [categories, setCategories] = useState([]);
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.oneheader} style={{ ...styles.checkboxcontainer }}>
          <span>ID</span>
          <input
            placeholder="Хайх"
            value={searchid}
            onChange={(e) => setSearchid(e.target.value)}
          />
        </div>
        <div
          className={css.oneheader}
          style={{
            ...styles.supplierContainer,
          }}
        >
          <span>Бүтээгдэхүүний нэр</span>
          <input
            placeholder="Хайх"
            value={searchvalue}
            onChange={(e) => setSearchvalue(e.target.value)}
          />
        </div>
        <div
          className={css.oneheader}
          style={{
            ...styles.supplierContainer,
          }}
        >
          <span>Бүтээгдэхүүний sku</span>
          <input
            placeholder="Хайх"
            value={searchsku}
            onChange={(e) => setSearchsku(e.target.value)}
          />
        </div>
        <div
          className={css.oneheader}
          style={{
            ...styles.imageContainer,
          }}
        >
          <span>Зураг</span>
          <input placeholder="Хайх" disabled />
        </div>
        <div
          className={css.oneheader}
          style={{
            ...styles.supplierContainer,
          }}
        >
          <span>Агуулахын үлдэгдэл</span>
          <input placeholder="Хайх" disabled />
        </div>
        <div className={css.oneheader}>
          <span>Татах то11</span>
          <input placeholder="Хайх" disabled />
        </div>
        <div
          className={css.oneheader}
          style={{
            ...styles.inputContainer,
          }}
        >
          <span>Үйлдвэрлэсэн огноо</span>
          <input placeholder="Хайх" disabled />
        </div>
        <div
          className={css.oneheader}
          style={{
            ...styles.inputContainer,
          }}
        >
          <span>Хугацаа дуусах огноо</span>
          <input placeholder="Хайх" disabled />
        </div>
        <div
          className={css.oneheader}
          style={{
            ...styles.inputContainer,
          }}
        >
          <span>Сери дугаар</span>
          <input placeholder="Хайх" disabled />
        </div>
      </div>
      <div className={css.body}>{}</div>
    </div>
  );
};

export default Products;
