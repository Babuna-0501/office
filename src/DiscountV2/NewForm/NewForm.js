import React, { useState, useEffect } from "react";
import css from "./newform.module.css";
import Select from "react-select";
import PlusIcon from "../../assets/plus_gray.svg";
import EllipseGrayIcon from "../../assets/Component 92.svg";
import OkIcon from "../../assets/OK.svg";
import ArrawRightGray from "../../assets/Arrow - Right.svg";
import myHeaders from "../../components/MyHeader/myHeader";

const NewForm = (props) => {
  console.log("props ", props);
  const [suppliers, setSuppliers] = useState([]);
  const [defvalue, setDefvalue] = useState(null);

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `https://api2.ebazaar.mn/api/backoffice/suppliers`;
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        if (res.code === 200) {
          console.log("supdata", res.data);
          let options = [];

          res.data &&
            res.data.map((x) => {
              options.push({ value: x.id, label: x.name });
            });
          setDefvalue(props.data.supplierName);
          setSuppliers(options);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.data]);

  const handleChange = () => {};

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <div>Урамшуулал хямдралын төрөл</div>
          <div className={css.inputwrapper}>
            <input placeholder="1Гарчиг" />
            <div>
              <img />
              <span>Бүтээгдэхүүн үнийн дүнгийн урамшуулал</span>
            </div>
          </div>
        </div>
        <div className={css.supwrapper}>
          <span>Нийлүүлэгч</span>

          {suppliers.length > 0 && defvalue !== null ? (
            <Select
              options={suppliers}
              onChange={handleChange}
              defaultValue={{
                label:
                  props.data && props.data.supplierName
                    ? props.data.supplierName
                    : "Нийлүүлэгч",
                value:
                  props.data && props.data.supplierID
                    ? props.data.supplierID
                    : 13884,
              }}
            />
          ) : (
            <Select options={suppliers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewForm;
