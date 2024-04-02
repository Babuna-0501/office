import css from "./orderNegtgel.module.css";
import { Button } from "../../components/common";
import { useEffect, useState } from "react";
import myHeaders from "../../components/MyHeader/myHeader";
import { OrderNegtgelOld } from "./OrderNegtgelOld";
import { OrderMerchantNegtgel } from "./OrderMerchantNegtgel";

export const OrderNegtgel = (props) => {
  const [merchantReport, setMerchantReport] = useState(false);
  const [report, setReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState([]);

  const generateMerchantReport = () => {
    setMerchantReport(!merchantReport);
  };
  

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://api2.ebazaar.mn/api/orders?ids=${props.order_ids}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.code === 200) {
          setDatas(response.data);
        } else {
          alert(response.code);
        }
      });
  }, []);

  return (
    <div onClick={props.closeHandler} className={css.printRecieptContainer}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={css.receiptContainer}
      >
        <div className={css.receiptWrapper}>
          {!loading && !merchantReport && !report && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                onClick={() => setReport(true)}
                variant="primary"
                size="medium"
              >
                Захиалгын нэгтгэл1
              </Button>
              <Button
                onClick={generateMerchantReport}
                variant="primary"
                size="large"
              >
                Харилцагчийн захиалгын нэгтгэл
              </Button>
            </div>
          )}

          {merchantReport && datas && (
            <OrderMerchantNegtgel
              closeHandler={() => props.closeHandler()}
              datas={datas}
              selectedData={props.order_ids}
            />
          )}

          {report && (
            <OrderNegtgelOld closeHandler={() => props.closeHandler()} />
          )}
        </div>
      </div>
    </div>
  );
};
