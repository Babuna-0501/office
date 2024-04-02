import React, { useContext } from "react";
import css from "./modal.module.css";
import closeIcon from "../../assets/close_white.svg";
import AppHook from "../../Hooks/AppHook";
import OrderIcon from "../../assets/order 1.svg";

const Modal = (props) => {
  const pagectx = useContext(AppHook);
  const closeHandler = () => {
    props.onClick(false);
    pagectx.setPage(["orders"]);
  };
  return (
    <div className={css.container} onClick={closeHandler}>
      <div className={css.wrapper}>
        <div className={css.iconContainer}>
          <img
            src={closeIcon}
            style={{
              width: "35px",
              height: "35px",
            }}
            onClick={closeHandler}
          />
        </div>
        <div className={css.imageContainer}>
          <img src={OrderIcon} />
        </div>
        <div className={css.contentContainer}>
          <h4>{props.title}</h4>
        </div>
        {/* <div className={css.buttoncontainer}>
          <button>Хаах</button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
