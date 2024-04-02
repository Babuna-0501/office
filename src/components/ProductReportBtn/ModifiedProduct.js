import React from "react";
import Iconf from "../../assets/Price Setting 2.svg";
import DeleteIcon from "../../assets/Delete.svg";
import css from "./modifiedProducts.module.css";

const ModifiedProduct = () => {
  const deleteProductHandler = () => {
    console.log("deleted");
  };
  const priceModifiedHandler = () => {
    console.log("price modified");
  };
  return (
    <div className={css.container}>
      <div className={css.child} onClick={deleteProductHandler}>
        <img src={DeleteIcon} alt="delete icon" />
        <span>Устгах</span>
      </div>
      <div className={css.second} onClick={priceModifiedHandler}>
        <img src={Iconf} alt="modified icon" />
        <span>Үнийн тохиргоо</span>
      </div>
    </div>
  );
};

export default ModifiedProduct;
