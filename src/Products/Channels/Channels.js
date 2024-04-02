import React, { useState, useContext, useEffect } from "react";
import css from "./channels.module.css";
import ProductReportHook from "../../Hooks/ProductsReportHook";

const Channels = (props) => {
  const [data, setData] = useState([]);
  const [allChecked, setAllChecked] = useState(true);

  const prodctx = useContext(ProductReportHook);

  useEffect(() => {
    setData(prodctx.bustype);
  }, []);
  
  useEffect(() => {
    const allChosed = data.every((item) => item.chosed === true);
    setAllChecked(allChosed);
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div className={css.wrapper}>
        <span>Бүгдийг сонгох</span>
        <img
          src={
            allChecked
              ? "https://admin.ebazaar.mn/media/on.svg"
              : "https://admin.ebazaar.mn/media/off.svg"
          }
          alt="open hidden button"
          onClick={() => {
            setAllChecked((checked) => !checked);
            const updatedData = data.map((el) => ({
              ...el,
              chosed: !allChecked,
            }));
            setData(updatedData);
            prodctx.setBustype(updatedData);
          }}
        />
      </div>
      {data &&
        data.map((item, index) => {
          return (
            <div key={item.business_type_id} className={css.wrapper}>
              <span>{item.business_type_name}</span>
              {/* <input /> */}

              <img
                src={
                  item.chosed
                    ? "https://admin.ebazaar.mn/media/on.svg"
                    : "https://admin.ebazaar.mn/media/off.svg"
                }
                alt="open hidden button"
                onClick={() => {
                  let aa = [...data];
                  aa.find(
                    (x) => x.business_type_id === item.business_type_id
                  ).chosed = !item.chosed;
                  prodctx.setBustype(aa);
                  setData(aa);
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Channels;
