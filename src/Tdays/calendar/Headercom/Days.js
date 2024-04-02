import Item from "antd/lib/list/Item";
import React from "react";
import css from "./days.module.css";

const Days = () => {
  const weekdays = [
    { id: 0, name: "Ням" },
    { id: 1, name: "Даваа" },
    { id: 2, name: "Мягмар" },
    { id: 3, name: "Лхагва" },
    { id: 4, name: "Пүрэв" },
    { id: 5, name: "Баасан" },
    { id: 6, name: "Бямба" },
    // { id: 7, name: "Бүх" },
  ];
  return (
    <div className={css.container}>
      {weekdays.map((it) => {
        return (
          <div className={css.wrapper} key={Math.random()}>
            <input type="checkbox" /> <span>{it.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Days;
