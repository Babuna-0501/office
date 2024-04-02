import React, { useState, useEffect, useContext } from "react";
import css from "./list.module.css";
import myHeaders from "../components/MyHeader/myHeader";

const List = (props) => {
  const [data, setData] = useState(null);
  // console.log(data);
  let zar = props.zar ? 1 : "";
  let addPoint = props.addPoint ? 1 : "";
  let added = props.added ? 1 : "";
  const getData = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `https://api2.ebazaar.mn/api/upoint/data?user_id=${props?.searchID}&order_id=${props?.orderID}&start_date=${props.enteredDate}&end_date=${props.lastDate}&consume=${zar}&bonus=${addPoint}&returs=${added}`;

    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        // console.log("upoint", JSON.parse(response.line_consume));
        // console.log(response);
        setData(response.data);
        // props.setSearchID("");
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getData();
  }, [
    props?.searchID,
    props?.orderID,
    props?.enteredDate,
    props?.lastDate,
    props?.zar,
    props.addPoint,
    props.added,
  ]);
  let amountConsume = 0;
  let amountCollect = 0;

  return data ? (
    <div>
      {data.map((tx) => {
        // let dateDay = tx.split("T")[0];

        let dateDay = tx.bonus_point_date
          ? tx.bonus_point_date.split("T")[0]
          : "";
        let dateHours = tx.bonus_point_date
          ? tx.bonus_point_date.split("T")[1]
          : "";
        dateHours = dateHours ? dateHours.split(".")[0] : "";
        if (tx.type === 1) {
          amountConsume += tx.upoint_amount;
        } else {
          amountCollect += tx.upoint_amount;
        }
        return (
          <div className="row">
            <div style={{ width: "120px" }}>
              <div>
                <span>{tx.order_id}</span>
              </div>
            </div>
            <div style={{ width: "120px" }}>
              <div>
                <span>{tx.user_id}</span>
              </div>
            </div>
            <div style={{ width: "80px" }}>
              <div
                style={{
                  border: tx.bonus_return_staus === 1 ? "1px solid red" : "",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "4px 0",
                }}
              >
                <span>{tx.original_added_bonus_point}</span>
              </div>
            </div>
            <div style={{ width: "80px" }}>
              <div
                style={{
                  border:
                    tx.consume_return_status === 1 && tx.original_consume_point
                      ? "1px solid red"
                      : "",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "4px 0",
                }}
              >
                <span>{tx.original_consume_point}</span>
              </div>
            </div>

            <div style={{ width: "180px" }}>
              <div>
                <span>{`${dateDay} ${dateHours}`}</span>
              </div>
            </div>
            <div style={{ width: "180px" }}>
              <div>
                <span>{tx.date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <span>Түр хүлээнэ үү ...</span>
  );
};

export default List;
