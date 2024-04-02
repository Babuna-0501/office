import React, { useEffect } from "react";
import Background from "../../components/Background/Background";
import css from "./orderlog.module.css";

const Orderlog = (props) => {
  const closeHandler = () => {
    props.setLogtrue(false);
    props.setOnelog([]);
  };
  console.log("props.statusData", props.statusData);
  return (
    <Background>
      <div className={css.wrapper}>
        <div className={css.empty}></div>
        <div className={css.logwrapper}>
          <div className={css.closewrapper} onClick={closeHandler}>
            close
          </div>
          <div
            style={{
              fontWeight: "700",
              fontSize: "18px",
              borderBottom: "1px solid #CFD8DC ",
              width: "100%",
            }}
          >
            Захиалгын лог
          </div>
          <div className={css.logcontainer}>
            <div>
              <span>
                <b style={{ marginRight: "5px" }}>Захиалгын дугаар :</b>{" "}
                {props.onelog[0].entry_id}
              </span>
            </div>
            <ul
              style={{
                marginBottom: "16px",
              }}
            >
              {props.onelog.map((item) => {
                console.log("item action ", item.action);
                let aaction;
                if (item.action.includes("Шинэ захиалга:")) {
                  aaction = item.action.replace("Шинэ захиалга:", "");
                  console.log("aaction", aaction);
                  aaction = JSON.parse(aaction);
                  props.statusData.map((item) => {
                    if (item.OrderStatusID === Number(aaction.order_status)) {
                      aaction["status_name"] = item.Name.toLowerCase();
                    }
                  });
                }
                // console.log("action json parse", JSON.parse(item.action));
                return (
                  <li className={css.liwrapper}>
                    <span>
                      <b style={{ marginRight: "5px" }}>Логын дугаар :</b>{" "}
                      {item.log_id}
                    </span>{" "}
                    <span>
                      <b style={{ marginRight: "5px" }}>Логын төрөл :</b>{" "}
                      {item.section_name}
                    </span>
                    <span>
                      <b style={{ marginRight: "5px" }}>Өөрчлөлт :</b>{" "}
                      {/* {item.action} */}
                      {aaction.order_id} дугаартай захиалга{" "}
                      {aaction.status_name}
                    </span>
                    <span>
                      <b style={{ marginRight: "5px" }}>Өөрчилсөн ажилтан :</b>{" "}
                      {item.user_name}
                    </span>
                    <span>
                      <b style={{ marginRight: "5px" }}>Өөрчилсөн он сар : </b>
                      {item.date_time.split("T")[0]}{" "}
                      {item.date_time.split("T")[1].substring(0, 5)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Orderlog;
