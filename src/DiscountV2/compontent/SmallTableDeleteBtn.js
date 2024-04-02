import React, { useContext, useState, useEffect } from "react";
import PromoHook from "../../Hooks/PromoHook";
import css from "./deletebutton.module.css";

import { Popconfirm } from "antd";
const SmallTableDeletebtn = (props) => {
  const text = "Та устгахдаа итгэлтэй байна уу?";
  const promoctx = useContext(PromoHook);
  const [data, setData] = useState([]);

  //   promoctx.products;
  const confirm = () => {
    // console.log(
    //   " promoctx.willUpdateProd.products;",
    //   promoctx.willUpdateProd.products
    // );
    // console.log("props delete btn", props);
    let aaa = data.filter((item) => item !== props.data._id);

    // console.log("aaa", aaa);
  };
  useEffect(() => {
    setData(promoctx.willUpdateProd.products);
  }, []);

  return (
    <div className={css.btncontainer}>
      {" "}
      <Popconfirm
        placement="right"
        title={text}
        onConfirm={confirm}
        okText="Тийм"
        cancelText="Үгүй"
      >
        <button>Устгах</button>
      </Popconfirm>
    </div>
  );
};

export default SmallTableDeletebtn;
