import React, { useContext, useState, useEffect } from "react";
import SMSHook from "../../Hooks/SMSHook";
import css from "./angilalcomponent.module.css";
import OneAngilal from "./OneAngilal";
import editIcon from "../../assets/Edit_icon.svg";
import Content from "../Content/Content";
import AppHook from "../../Hooks/AppHook";

const AngilalComponent = (props) => {
  const [data, setData] = useState([]);
  const [btnmodified, setBtnmodified] = useState(false);
  const [supCategory, setSupCategory] = useState([]);

  const smsctx = useContext(SMSHook);
  useEffect(() => {
    if (
      smsctx.supplierInfo &&
      smsctx.supplierInfo.supplier_is_active !== null &&
      smsctx.supplierInfo.supplier_is_active !== "" &&
      smsctx.supplierInfo.supplier_is_active !== undefined
    ) {
      console.log(
        "smsctx.supplierInfo.supplier_is_active",
        smsctx.supplierInfo.supplier_is_active
      );
      let data = JSON.parse(smsctx.supplierInfo.supplier_is_active);
      if (data.categories && data.categories.length > 0) {
        console.log("data.categories", data.categories);
        setSupCategory(data.categories);
      }
    }
  }, []);

  useEffect(() => {
    setData(smsctx.Angilaldata);
    console.log("smsctx.Angilaldata");
  }, [smsctx.Angilaldata]);

  useEffect(() => {
    let update = [];
    if (smsctx.categoriesdata && smsctx.categoriesdata.length !== 0) {
      smsctx.sitedata.categories.map((item) => {
        smsctx.categoriesdata.map((x) => {
          if (x.categoryId === item.id) {
            update.push({
              ...item,
              totalAmount: x.goal.amount,
              actionAmount: x.succeeded.amount,
              waiting: x.succeeded.amount,
            });
          }
        });
      });
    }
    smsctx.setAngilaldata(update);
    setData(update);
  }, [smsctx.categoriesdata]);

  return smsctx.Angilaldata ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "50vh",
      }}
    >
      <div
        style={{
          height: "100%",
        }}
      >
        <div className={css.header}>
          <div
            className={css.oneheader}
            style={{
              width: "200px",
            }}
          >
            <span>Ангилал</span>
            <input placeholder="Хайх" />
          </div>
          <div
            className={css.oneheader}
            style={{
              width: "150px",
            }}
          >
            <span>Үнийн дүнгийн төлөвлөгөө</span>
          </div>
          {btnmodified && (
            <div
              className={css.oneheader}
              style={{
                width: "130px",
              }}
            >
              <span>Биелэлт</span>
            </div>
          )}
        </div>
        <div className={css.body}>
          {smsctx.Angilaldata &&
            smsctx.Angilaldata.map((item, index) => {
              return (
                <OneAngilal
                  item={item}
                  key={index}
                  btnmodified={btnmodified}
                  supCategory={supCategory}
                />
              );
            })}
        </div>
      </div>

      {btnmodified ? (
        <div className={css.btncontainerTwo}>
          <button
            className={css.editwrapper}
            onClick={(e) => {
              setBtnmodified(false);
            }}
          >
            <img src={editIcon} alt="edit icon" className={css.editbtn} />
            <span> Засварлах</span>
          </button>
        </div>
      ) : (
        <div className={css.btncontainerTwo}>
          <button
            className={css.cancel}
            onClick={() => {
              // props.onClose();
            }}
          >
            Цуцлах
          </button>
          <button
            className={css.confirm}
            onClick={() => {
              setBtnmodified(true);
            }}
          >
            Хадгалах
          </button>
        </div>
      )}
    </div>
  ) : (
    <Content />
  );
};

export default AngilalComponent;
