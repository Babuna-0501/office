import React, { useContext } from "react";
import css from "./savemodal.module.css";
import closeIcon from "../../assets/close.svg";
import OKGREEN from "../../assets/ok_green.svg";
import SMSHook from "../../Hooks/SMSHook";

const SaveModal = (props) => {
  const smsctx = useContext(SMSHook);
  const SaveHandler = () => {
    smsctx.setUramshuulalOpen(false);
    props.setModalOpen(false);
  };
setTimeout(() => {
  smsctx.setUramshuulalOpen(false);
  props.setModalOpen(false);
  props.onClick();
}, 1000);


  return (
    <div
      className={css.background}
      style={{
        zIndex: "150",
      }}
    >
      <div className={css.modal}>
        <div className={css.closewrapper}>
          <img src={closeIcon} alt="cancel icon" onClick={SaveHandler} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80%",
            boxSizing: "border-box",
          }}
        >
          <div className={css.okwrapper}>
            <img src={OKGREEN} alt="confirm icon" />
          </div>
          <p className={css.par}>Төлөвлөгөө амжилттай</p>
          <p className={css.par}>үүслээ</p>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
