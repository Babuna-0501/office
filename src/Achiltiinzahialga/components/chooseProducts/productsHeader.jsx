import React from "react";
import css from "./productsHeader.module.css";
import { useState } from "react";

const ProductsHeader = () => {
  const [searchvalue, setSearchvalue] = useState("");
  const [searchsku, setSearchsku] = useState("");
  const [searchid, setSearchid] = useState("");

  return (
    <div className={css.container}>
      <div className={css.oneField} style={{ width: "80px" }}>
        <span>ID</span>
        <input placeholder="хайх" />
      </div>
      <div className={css.oneField}>
        <span>Бүтээгдэхүүний нэр</span>
        <input placeholder="хайх" />
      </div>
      <div className={css.oneField}>
        <span>Бүтээгдэхүүний sku</span>
        <input placeholder="хайх" />
      </div>
      <div className={css.oneField} style={{ width: "70px" }}>
        <span>Зураг</span>
        <input placeholder="хайх" />
      </div>
      <div className={css.oneField}>
        <span>Агуулахын үлдэгдэл</span>
        <input disabled />
      </div>
      <div className={css.oneField} style={{ width: "70px" }}>
        <span>Татах тоо</span>
        <input disabled />
      </div>
      <div className={css.oneField}>
        <span>Ширхэгийн үнэ</span>
        <input disabled />
      </div>
      <div className={css.oneField}>
        <span>Зарах үнэ</span>
        <input disabled />
      </div>
      <div className={css.oneField}>
        <span>Дүн</span>
        <input disabled />
      </div>
      <div className={css.oneField}>
        <span>Хямдрал %</span>
        <input disabled />
      </div>
      <div className={css.oneField}>
        <span>Хямдарсан дүн</span>
        <input disabled />
      </div>
      <div className={css.oneField}>
        <span>Төлөх дүн</span>
        <input disabled />
      </div>
      <div className={css.oneField}>
        <span>Үйлдвэрлэсэн огноо</span>
        <input disabled />
      </div>
      <div className={css.oneField}>
        <span>Хугацаа дуусах огноо</span>
        <input disabled />
      </div>
      <div className={css.oneField}>
        <span>Сери дугаар</span>
        <input disabled />
      </div>
    </div>
  );
};

export default ProductsHeader;
