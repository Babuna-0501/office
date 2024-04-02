import React from "react";
import css from "./orderapprove.module.css";
import carOrange from "../../assets/car_orange.svg";
import closeWhite from "../../assets/close_white.svg";
const OrderApprove = (props) => {
  const confirmHandler = () => {
    props.confirm();
    props.onCancel(false);
  };
  return (
    <div className={css.container}>
      <div className={css.cardContainer}>
        <div className={css.closeContainer}>
          <img
            src={closeWhite}
            alt="close btn"
            onClick={() => props.onCancel(false)}
          />
        </div>
        <div className={css.imageContainer}>
          <img src={carOrange} alt="car delivery" />
        </div>
        <div className={css.header}>
          <span>Захиалга батлах</span>
        </div>
        <div className={css.content}>
          <p>
            Та энэ захиалгыг баталгаажуулснаар хэрэглэгч мөн е-базаарт энэ
            захиалгын хүргэж өгнө гэсэн баталгаа өгч байгаа
          </p>
          {/* <p>Та хүргэж өгнө гэдэгт итгэлтэй байна уу?</p> */}
        </div>
        <div className={css.buttonscontainer}>
          <button className={css.okbnt} onClick={confirmHandler}>
            Тийм
          </button>
          <button
            className={css.cancelBtn}
            onClick={() => props.onCancel(false)}
          >
            Үгүй
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderApprove;
