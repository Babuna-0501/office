import React, { useContext } from "react";
import css from "./rightheader.module.css";
import SMSHook from "../../Hooks/SMSHook";
import { Button } from "../../components/common";

const RightHeader = () => {
  const smsctx = useContext(SMSHook);
  const OpenHandler = () => {
    smsctx.setBname(null);
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
    smsctx.setChosedProdIDS([]);
    smsctx.setData([]);
    smsctx.setModalOpen(true);
    
  };
  return (
    <div className={css.container}>
      {!smsctx.uramshuulalOpen && (
        <Button variant="primary" size="medium" onClick={OpenHandler}>
          Шинэ урамшуулал
        </Button>
      )}
    </div>
  );
};

export default RightHeader;
