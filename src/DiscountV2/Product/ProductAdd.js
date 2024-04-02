import React, { useState, useEffect, useContext } from "react";
import css from "./productadd.module.css";
import Product from "./Product";
import myHeaders from "../../components/MyHeader/myHeader";
import checkboxicon from "../../assets/check box.svg";
import { styles } from "./style";
import PromoHook from "../../Hooks/PromoHook";

const ProductAdd = (props) => {
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState(null);
  const [sku, setSku] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [id, setId] = useState(null);
  const [brand, setBrand] = useState(null);
  console.log("props product", props);

  const [data, setData] = useState([]);
  const promoctx = useContext(PromoHook);

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let params = "";
    if (search !== null && search.length >= 3) {
      params += `search=${search}&`;
    }
    if (category !== null) {
      params += `category=${category}&`;
    }
    if (sku !== null) {
      params += `sku=${sku}&`;
    }
    if (barcode !== null) {
      params += `bar_code=${barcode}&`;
    }
    if (id !== null) {
      params += `ids=[${parseInt(id)}]&`;
    }
    if (promoctx.supplierID !== null) {
      params += `supplier=${parseInt(promoctx.supplierID)}&`;
    }
    if (brand !== null) {
      params += `brand=${brand}&`;
    }

    let url = `https://api2.ebazaar.mn/api/products/get1?${params}page=0&limit=50`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [search, category, sku, barcode, id, promoctx.supplierID, brand]);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div
          className={css.wrapper}
          style={{
            ...styles.checkboxcontainer,
          }}
        >
          <div className={css.imagewrapper}>
            <img src={checkboxicon} alt="checkbox" />
          </div>
        </div>
        <div
          className={css.wrapper}
          style={{
            ...styles.idcontainer,
          }}
        >
          <span>ID</span>
          <input
            placeholder="Хайх"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        {/* <div
          className={css.wrapper}
          style={{
            ...styles.supplierId,
          }}
        >
          <span>Нийлүүлэгч</span>
          <input placeholder="Хайх" />
        </div> */}
        <div
          className={css.wrapper}
          style={{
            width: "80px",
          }}
        >
          <span>IMG</span>
        </div>
        <div
          className={css.wrapper}
          style={{
            ...styles.productName,
          }}
        >
          <span>Бүтээгдэхүүн нэр</span>
          <input
            placeholder="Хайх"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          className={css.wrapper}
          style={{
            ...styles.barCode,
          }}
        >
          <span>Ангилал</span>
          <input
            placeholder="Хайх"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div
          className={css.wrapper}
          style={{
            ...styles.barCode,
          }}
        >
          <span>Брэнд</span>
          <input
            placeholder="Хайх"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div
          className={css.wrapper}
          style={{
            ...styles.barCode,
          }}
        >
          <span>Үнэ</span>
          <input placeholder="Хайх" />
        </div>
        <div
          className={css.wrapper}
          style={{
            ...styles.barCode,
          }}
        >
          <span>Үүссэн огноо</span>
          <input placeholder="Хайх" />
        </div>
        <div
          className={css.wrapper}
          style={{
            ...styles.SKU,
          }}
        >
          <span>SKU</span>
          <input
            placeholder="Хайх"
            onChange={(e) => setSku(e.target.value)}
            value={sku}
          />
        </div>
        <div
          className={css.wrapper}
          style={{
            ...styles.barCode,
          }}
        >
          <span>Баркод</span>
          <input
            placeholder="Хайх"
            onChange={(e) => setBarcode(e.target.value)}
            value={barcode}
          />
        </div>
      </div>
      <div className={css.body}>
        {data.length >= 1 &&
          data.map((item, index) => {
            return <Product item={item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default ProductAdd;
