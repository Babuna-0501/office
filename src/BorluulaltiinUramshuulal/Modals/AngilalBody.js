import React, { useEffect, useState } from "react";
import css from "./angilalbody.module.css";
import blackchecked from "../../assets/check box_black.svg";
import checkedgray from "../../assets/check box.svg";

const AngilalBody = (props) => {
  const [data, setData] = useState([]);
  console.log("angilal props", props);
  useEffect(() => {
    let update = props.categories?.map((item) => {
      return {
        ...item,
        chosed: false,
        totalAmount: null,
        actionAmount: null,
      };
    });
    setData(update);
  }, [props.categories]);
  const CheckedHandler = (item) => {
    let update = data.map((x) => {
      if (x.id === item.id) {
        return {
          ...x,
          chosed: x.chosed == true ? false : true,
        };
      }
      return x;
    });
    setData(update);
    props.setChosedData(update);
  };
  return (
    <div className={css.container}>
      {" "}
      {data &&
        data.map((item, index) => {
          return (
            <div
              key={index}
              className={css.wrapper}
              style={{
                background: item.chosed ? "#F2F2F2" : "#fff",
                borderBottom: item.chosed
                  ? "1px solid #fff"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              }}
              onClick={() => CheckedHandler(item)}
            >
              <img src={item && item.chosed ? blackchecked : checkedgray} />
              <p>
                <img
                  src={
                    item && item.logo
                      ? item.logo[1]
                      : "https://ebazaar.mn/media/product/3972463217692126714577193090202305010152296735091923881782527978709705.png"
                  }
                  alt="logo"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </p>
              <span>{item.name}</span>
            </div>
          );
        })}
    </div>
  );
};

export default AngilalBody;
