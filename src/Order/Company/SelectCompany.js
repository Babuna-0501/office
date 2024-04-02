import React, { useState, useEffect } from "react";
import css from "./selectcompany.module.css";

const SelectCompany = (props) => {
  const [company, setCompany] = useState(0);

  console.log("company", company);
  useEffect(() => {
    props.setSupSelect(company);
  }, [props]);

  return (
    <div className={css.container}>
      <div className={css.company}>Компани сонгох</div>
      <div className={css.selectcontainer}>
        <select
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            props.setSupSelect(e.target.value);
          }}
        >
          <option value="0">--Бүх компани --</option>
          <option value="948">Милл хаус ХХК</option>
          <option value="14033">Нүүдэл Жи ХХК</option>
        </select>
      </div>
    </div>
  );
};

export default SelectCompany;
