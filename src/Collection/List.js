import React, { useEffect, useState, useContext } from "react";
import css from "./list.module.css";
import settingIcon from "../assets/Setting.svg";
import deleteIcon from "../assets/delete_red_small.svg";
import { Popconfirm } from "antd";
import myHeaders from "../components/MyHeader/myHeader";

const text = "Та устгахдаа итгэлтэй байна уу?";
const List = (props) => {
  const [colData, setColData] = useState([]);

  useEffect(() => {
    let ad;
    if (props.data) {
      ad = props.data.filter((item) => item.isActive !== 0);
      setColData(ad);
    }
  }, [props.data]);
  console.log("coldata", props.data);
  const confirm = (data) => {
    // console.log("collection delete data", data);
    let raw = {
      id: data._id,
      supplier: data.supplier,
      update: {
        isActive: 0,
        sku: data.sku,
      },
    };
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
    };
    // console.log("collection delete requestOptions", requestOptions);

    fetch(`https://api2.ebazaar.mn/api/collection/update`, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        alert("Амжилттай устгалаа");
        const aa = colData.filter((item) => item._id !== data._id);
        setColData(aa);
      })
      .catch((error) => {
        console.log("Collection delete ", error);
      });
  };
  const updateHandler = (item, index) => {
    // props.setUpdate(true);
    // props.setUpdateProduct(item);
  };

  let content =
    colData &&
    colData.map((item, index) => {
      return (
        <div className={css.wrapper} key={index}>
          <span style={{ width: "200px" }}>{item.name}</span>
          <ul style={{ width: "200px" }}>
            {item.sku.map((i, index) => {
              return <li key={index}>{i}</li>;
            })}
          </ul>
          <div className={css.iconContainer}>
            <img src={settingIcon} onClick={() => updateHandler(item, index)} />
            <Popconfirm
              placement="right"
              title={text}
              onConfirm={() => confirm(item)}
              okText="Тийм"
              cancelText="Үгүй"
            >
              <img src={deleteIcon} />
            </Popconfirm>
          </div>
        </div>
      );
    });
  return <div className={css.container}>{content}</div>;
};

export default List;
