import React from "react";
import css from "./headermain.module.css";
import { styles } from "./style";

const Headermain = () => {
  return (
    <div className={css.container}>
      <div
        style={{
          ...styles.one,
        }}
        className={css.wrapper}
      >
        <span>Нийлүүлэгч</span>
        <input disabled />
      </div>

      <div
        style={{
          ...styles.one,
        }}
        className={css.wrapper}
      >
        <span>Урамшуулалын нэр</span>
        <input disabled />
      </div>
      <div
        style={{
          ...styles.one,
        }}
        className={css.wrapper}
      >
        <span>Барааны нэр</span>
        <input disabled />
      </div>
      <div
        style={{
          ...styles.one,
        }}
        className={css.wrapper}
      >
        <span>Бүтээгдэхүүн ID</span>
        <input disabled />
      </div>
      <div
        style={{
          ...styles.one,
        }}
        className={css.wrapper}
      >
        <span>Баркод</span>
        <input disabled />
      </div>
      <div
        style={{
          ...styles.one,
        }}
        className={css.wrapper}
      >
        <span>Суваг</span>
        <input disabled />
      </div>
      <div
        style={{
          ...styles.one,
        }}
        className={css.wrapper}
      >
        <span>Бүсчлэл</span>
        <input disabled />
      </div>
      <div
        style={{
          ...styles.one,
        }}
        className={css.wrapper}
      >
        <span>Эхлэх</span>
        <input disabled />
      </div>
      <div
        style={{
          ...styles.one,
        }}
        className={css.wrapper}
      >
        <span>Дуусах</span>
        <input disabled />
      </div>
      <div
        style={{
          ...styles.ten,
        }}
        className={css.wrapper}
      >
        <span>Устгах</span>
        <input disabled />
      </div>
    </div>
  );
};

export default Headermain;
