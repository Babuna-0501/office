import React, { useContext } from "react";
import PromoHook from "../../Hooks/PromoHook";
import css from "./deletebutton.module.css";

import { Popconfirm } from "antd";
const Deletebutton = (props) => {
  const text = "Та устгахдаа итгэлтэй байна уу?";
  const promoctx = useContext(PromoHook);

  const confirm = () => {
    promoctx.setDeleteBTN(true);
  };

  let aa;
  if (props.data.supplierID === 10 || props.data.supplierID === 4766) {
    aa = <div></div>;
  } else {
    aa = (
      <Popconfirm
        placement="right"
        title={text}
        onConfirm={confirm}
        okText="Тийм"
        cancelText="Үгүй"
      >
        <button>Устгах</button>
      </Popconfirm>
    );
  }
  return <div className={css.btncontainer}>{aa}</div>;
};

export default Deletebutton;
