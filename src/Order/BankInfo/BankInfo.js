import React, { useEffect, useState } from "react";
import css from "./bankinfo.module.css";
import myHeaders from "../../components/MyHeader/myHeader";
const BankInfo = (props) => {
  const [orderdata, setOrderdata] = useState([]);
  const [newSup, setNewSup] = useState([]);
  const [bankname, setBankname] = useState(null);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    if (props.data.order_data) {
      let aa = JSON.parse(props?.data?.order_data);
      setOrderdata(aa);
    }
    if (props.data) {
      fetch(
        `https://api2.ebazaar.mn/api/backoffice/newsuppliers?id=${props.data.supplier_id}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("res", res);
          console.log("orderdata", orderdata);
          res.bankaccount?.map((item) => {
            if (
              orderdata &&
              orderdata["payment"] &&
              orderdata["payment"][`bankIndex`] &&
              item.bank == orderdata["payment"][`bankIndex`]
            ) {
              //   console.log("bank name", item.bank_name);
              setBankname(item.bank_name);
            } else {
              console.log("банк байхгүй байна");
            }
          });
          setNewSup(res);
        })
        .catch((error) => {
          console.log("new supplier fetch error", error);
        });
    }
  }, [props]);
  useEffect(() => {
    if (orderdata && newSup) {
      //   console.log("new sup", newSup);
      //   newSup[0].bankaccount.map((item) => {
      //     if (item.bank === orderdata["payment"][`bankIndex`]) {
      //       console.log(item.bank_name);
      //     }
      //   });
    }
  }, [orderdata, newSup]);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <span>Бэлэн :</span>
        <span>
          {orderdata && orderdata[`payment`] && orderdata[`payment`]?.m1
            ? `${orderdata[`payment`]?.m1.toLocaleString()}₮`
            : ""}
        </span>
      </div>

      <div className={css.wrapper}>
        <span>Банк :</span>
        <span>
          {orderdata && orderdata[`payment`] && orderdata[`payment`]?.m2
            ? `${orderdata[`payment`]?.m2.toLocaleString()}₮`
            : ""}{" "}
          <br></br>
          {bankname ? bankname : ""}
        </span>
      </div>
      <div className={css.wrapper}>
        <span>Зээл :</span>
        <span>
          {" "}
          {orderdata && orderdata[`payment`] && orderdata[`payment`]?.m3
            ? `${orderdata[`payment`]?.m3.toLocaleString()}₮`
            : ""}
        </span>
      </div>
    </div>
  );
};

export default BankInfo;
