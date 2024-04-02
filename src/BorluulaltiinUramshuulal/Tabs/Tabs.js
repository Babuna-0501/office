import React, { useState, useEffect, useContext } from "react";
import css from "./tabs.module.css";
import plusIcon from "../../assets/plus.svg";
import SMSHook from "../../Hooks/SMSHook";
import Productcomponent from "../ProductComponent/ProductComponent";
import BrandComponent from "../BrandComponent/BrandComponent";
import AngilalComponent from "../AngilalComponent/AngilalComponent";
import editIcon from "../../assets/Edit_icon.svg";
import TotalPrice from "../Uniindun/TotalPrice";
import Productmodal from "../ProductModal/Productmodal";
import MultiProductsModal from "../ProductModal/MultiProductsModal";

const data = [
  {
    id: 0,
    name: "Бүтээгдэхүүний төлөвлөгөө",
  },
  {
    id: 1,
    name: "Брэндийн төлөвлөгөө",
  },
  {
    id: 2,
    name: "Ангилалын төлөвлөгөө",
  },
  {
    id: 3,
    name: "Үнийн дүнгийн төлөвлөгөө",
  },
];
const btndata = [
  { id: 1, name: "Дан бүтээгдэхүүн төлөвлөгөө үүсгэх" },
  { id: 2, name: "Багц бүтээгдэхүүн төлөвлөгөө үүсгэх" },
];

const Tabs = (props) => {
  const [page, setPage] = useState(0);
  const [btnmodified, setBtnmodified] = useState(false);
  const [multiProduct, setMultiProduct] = useState(false);
  const smsctx = useContext(SMSHook);

  const ProductOpen = () => {
    if (page === 0) {
      smsctx.setProductModal(true);
    }
    if (page === 1) {
      smsctx.setBrandModal(true);
    }
    if (page === 2) {
      smsctx.setAngilalModal(true);
    }
    if (page === 3) {
      smsctx.setPriceModal(true);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.subheader}>
          {data.map((item, index) => {
            return (
              <div
                className={index === page ? css.oneheaderactive : css.oneheader}
                onClick={() => {
                  setPage(index);
                  props.setPlantype(page + 1);
                  // setBtnmodified(false);
                }}
                key={index}
              >
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
        {page !== 0 && (
          <div className={css.btn}>
            <span
              onClick={ProductOpen}
              style={{
                fontSize: page === 3 ? "13px" : "14px",
              }}
            >
              {(page === 1 && "Брэндийн төлөвлөгөө үүсгэх") ||
                (page === 2 && "Ангилалын төлөвлөгөө үүсэгх") ||
                (page === 3 && "Үнийн дүнгийн төлөвлөгөө үүсгэх")}
            </span>

            <img src={plusIcon} alt="plus icon" />
          </div>
        )}
        {page === 0 && (
          <div className={css.btnProducts}>
            {btndata.map((item) => {
              return (
                <div
                  key={item.id}
                  className={css.onebtn}
                  onClick={() => {
                    if (item.id == 2) {
                      // smsctx.setCollecttrue(true);
                      setPage(4);
                    } else {
                      smsctx.setProductModal(true);
                      // setPage(5);
                    }
                  }}
                >
                  <button>{item.name}</button>
                  <img src={plusIcon} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={css.body}>
        {page === 0 && (
          <Productcomponent
            btnmodified={btnmodified}
            setBtnmodified={setBtnmodified}
            multiProduct={multiProduct}
          />
        )}
        {page === 1 && (
          <BrandComponent
            btnmodified={btnmodified}
            setBtnmodified={setBtnmodified}
          />
        )}
        {page === 2 && (
          <AngilalComponent
            btnmodified={btnmodified}
            setBtnmodified={setBtnmodified}
          />
        )}
        {page === 3 && (
          <TotalPrice
            btnmodified={btnmodified}
            setBtnmodified={setBtnmodified}
          />
        )}
        {page === 4 && <MultiProductsModal setPage={setPage} />}
      </div>
    </div>
  );
};

export default Tabs;
