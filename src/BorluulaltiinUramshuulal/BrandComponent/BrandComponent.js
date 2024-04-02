import React, { useEffect, useContext, useState } from "react";
import css from "./brandcomponent.module.css";
import SMSHook from "../../Hooks/SMSHook";
import editIcon from "../../assets/Edit_icon.svg";
import OneItem from "./OneItem";

const BrandComponent = (props) => {
  const [data, setData] = useState([]);
  const [btnmodified, setBtnmodified] = useState(false);

  const smsctx = useContext(SMSHook);
  console.log("brandsbrands", smsctx.brandsdata);
  console.log("data", data);

  useEffect(() => {
    let update = [];

    smsctx.sitedata.brands.map((x) => {
      if (smsctx.brandsdata && smsctx.brandsdata.length !== 0) {
        smsctx.brandsdata.map((y) => {
          if (x.BrandID === y.brandId) {
            update.push({
              ...x,
              totalAmount: y.goal.amount,
              succeeded: y.succeeded.amount,
              waiting: y.waiting.amount,
            });
          }
        });
      }
    });

    setData(update);
  }, [smsctx.brandsdata]);

  useEffect(() => {
    setData(smsctx.chosedBrands);
  }, [smsctx.chosedBrands]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "50vh",
      }}
    >
      <div>
        <div className={css.header}>
          <div className={css.oneheader}>
            <span
              style={{
                width: "40px",
              }}
            >
              Лого
            </span>
          </div>
          <div
            className={css.oneheader}
            style={{
              width: "200px",
            }}
          >
            <span>Брэнд</span>
            <input placeholder="Хайх" />
          </div>
          <div
            className={css.oneheader}
            style={{
              width: "150px",
            }}
          >
            <span>Үнийн дүн төлөвлөгөө</span>
          </div>
          {btnmodified ? (
            <div className={css.oneheader}>
              <span>Биелэлт</span>
            </div>
          ) : null}
          <div>
            <span></span>
          </div>
        </div>
        <div className={css.body}>
          {data &&
            data.map((item, index) => {
              return (
                <OneItem
                  item={item}
                  key={index}
                  data={data}
                  btnmodified={btnmodified}
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
  );
};

export default BrandComponent;
