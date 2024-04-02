import React, { useContext } from "react";
import css from "./bheader.module.css";
import ArriwRight from "../../assets/Arrow - Right.svg";
import SMSHook from "../../Hooks/SMSHook";
const BHeader = () => {
  const smsctx = useContext(SMSHook);
  return (
    <div className={css.container}>
      <span
        onClick={() => {
          smsctx.setBname(null);
           smsctx.setChosedProdIDS([]);
          smsctx.setStartdate(null);
          smsctx.setEnddate(null);
          smsctx.setShagnalname(null);
          smsctx.setXt([]);
          smsctx.setProductData([]);
          smsctx.setChosedChannel([]);
          smsctx.setZoneids([]);
          smsctx.setCollectTitle(null);
          smsctx.setAngilaldata([]);
          smsctx.setChosedBrands([]);
          smsctx.setUpdateID(null);
          smsctx.setUpdateTrue(false);
          smsctx.setCategoriesdata([]);
          smsctx.setBrandsdata([]);
          smsctx.setData([]);
          smsctx.setUramshuulalOpen(false);
        }}
      >
        Борлуулалтын урамшуулал
      </span>

      {smsctx.uramshuulalOpen && (
        <div className={css.wrapper}>
          {" "}
          <img
            src={ArriwRight}
            style={{
              width: "18px",
              height: "18px",
            }}
            alt="right arrow"
          />
          <span>
            {" "}
            {smsctx.updateTrue
              ? "Урамшуулал засварлах"
              : "Шинэ урамшуулал үүсгэх"}
          </span>
        </div>
      )}
    </div>
  );
};

export default BHeader;
