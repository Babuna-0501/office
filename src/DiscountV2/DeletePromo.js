import React, { useContext } from "react";
import css from "./deletepromo.module.css";
import closeBtn from "../assets/close_white.svg";
import myHeaders from "./HeaderContent/HeaderContent";
import DeleteBg from "../assets/delete_big.svg";
import PromoHook from "../Hooks/PromoHook";
import AppHook from "../Hooks/AppHook";

const DeletePromo = (props) => {
  let promoCtx = useContext(PromoHook);
  let appctx = useContext(AppHook);

  let id = promoCtx.willUpdateProd;

  id = id?._id;

  const DeleteApproveHandler = () => {
    var raw = JSON.stringify({
      discount_id: id,
      is_active: 0,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };
    // console.log("raw", requestOptions);
    let url = `https://api2.ebazaar.mn/api/discount/delete`;

    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        // console.log("res", res);
        if (res.code === 200) {
          alert("Амжилттай устгалаа");
          promoCtx.setNewProd(true);
          promoCtx.setProUpdate(false);
          promoCtx.setDeleteModal(false);
          promoCtx.setUpdateDisProd(false);
          promoCtx.setSelectedRowData([]);
          appctx.setPage(["discount"]);
        }
      })
      .catch((error) => {
        alert("Алдаа гарлаа.", error);
      });
  };
  const DeleteCancelHandler = () => {
    promoCtx.setNewProd(true);
    promoCtx.setProUpdate(false);
    promoCtx.setDeleteModal(false);
    promoCtx.setUpdateDisProd(false);
    promoCtx.setSelectedRowData([]);
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.closeWrapper}>
          <img src={closeBtn} alt="close icon" onClick={DeleteCancelHandler} />
        </div>
        <div className={css.infoWrapper}>
          <div className={css.iconWrapper}>
            <img src={DeleteBg} alt="discount icon" />
          </div>
          <div className={css.headerWrapper}>
            <p className={css.headerH1}>Та устгахдаа итгэлтэй байна уу</p>
          </div>
          <div></div>
          <div className={css.discountBtnWrapper}>
            <button onClick={DeleteApproveHandler}>Тийм</button>
          </div>
          <div className={css.discountBtnWrapperSecond}>
            <button onClick={DeleteCancelHandler}>Үгүй</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePromo;
