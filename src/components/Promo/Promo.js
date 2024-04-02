import React, { useState, useEffect, useContext } from "react";
import css from "./promo.module.css";
import deleteIcon from "../../assets/Delete_red.svg";
import PromoHook from "../../Hooks/PromoHook";
import { Button } from "../common";
const Promo = () => {
  const ctx = useContext(PromoHook);
  //   console.log(ctx);
  const selectHandler = () => {
    if (ctx.nextPage) {
      return;
    } else {
      ctx.setNewPromoAdd(true);
      ctx.setProducts([]);
    }
  };

  const DiscountProductUpdate = () => {
    ctx.UpdateHandler();
    ctx.setNewProd(true);
    ctx.setProUpdate(false);
    ctx.setUpdateDisProd(false);
    ctx.setProductUpdate(true);
  };
  const discountProductCancelHandler = () => {
    ctx.setNewProd(true);
    ctx.setProUpdate(false);
    ctx.setUpdateDisProd(false);
    ctx.setProducts([]);
    // ctx.setNewProd(true);
  };
  const DeleteHandler = () => {
    ctx.setDeleteBTN(true);
  };

  return (
    <div className={css.container}>
      {/* {ctx?.products?.length > 0 && (
        <div className={css.deleteBtn} onClick={() => ctx.setDeleteModal(true)}>
          <img src={deleteIcon} /> <span>Устгах</span>
        </div>
      )} */}

      {ctx?.proUpdate && (
        <div className={css.buttonsContainer}>
          <Button
            variant="secondary"
            size="medium"
            onClick={discountProductCancelHandler}
          >
            Цуцлах
          </Button>

          <Button
            variant="primary"
            size="medium"
            onClick={DiscountProductUpdate}
          >
            Хадгалах
          </Button>
        </div>
      )}

      {ctx?.nextPage ||
        (ctx?.newProd && (
          <div className={css.btnscontainer}>
            {/* <div className={css.secondBtn} onClick={DeleteHandler}>
              <span>Устгах</span>
            </div> */}

            <Button variant="primary" size="medium" onClick={selectHandler}>
              Шинээр нэмэх
            </Button>
          </div>
        ))}
    </div>
  );
};

export default Promo;
