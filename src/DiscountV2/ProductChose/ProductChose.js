import React, { useState, useContext } from "react";
import css from "./productchose.module.css";
import PromoHook from "../../Hooks/PromoHook";

const ProductChose = (props) => {
  const [chose, setChose] = useState(null);
  const [productType, setProductType] = useState(null);
  const promoctx = useContext(PromoHook);

  const data = [
    { id: 1, name: "Нэг бараа" },
    { id: 2, name: "Олон бараа" },
  ];
  const handleSubmit = () => {};
  const handleChange = (e) => {
    setChose(e.target.value);
    props.setInsertTypeProduct(e.target.value);
  };
  const typeSubmitHandler = () => {};
  const handleChangeProduct = (e) => {
    setProductType(e.target.value);
    promoctx.setProductTypeSelect(e.target.value);
  };

  return (
    <div className={css.productchoseContainer}>
      <div className={css.secondcontainer}>
        <div className={css.header}>
          <h3>Барааны сонголт хийх</h3>
        </div>
        <div className={css.optioncontainer}>
          <form onSubmit={typeSubmitHandler}>
            <select productType={productType} onChange={handleChangeProduct}>
              <option value="0">----------</option>
              <option value="1600">Бараанаас сонгох</option>
              <option value="1500">Collection сонгох</option>
            </select>
          </form>
        </div>
      </div>
      {promoctx.discountTypeSelect.type !== "percent" && (
        <div className={css.firstcontainer}>
          <div className={css.header}>
            <h3>Хямдарлын бараа оруулах сонголт</h3>
          </div>
          <div className={css.optioncontainer}>
            <form onSubmit={handleSubmit}>
              <select chose={chose} onChange={handleChange}>
                <option value="500">X + X барааны хямдрал</option>
                {/* <option value="1000">Босготой барааны хямдрал</option> */}
                <option value="2000">Нэг хямдралыг олон бараанд оруулах</option>
              </select>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductChose;
