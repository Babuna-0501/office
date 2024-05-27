import { useContext, useEffect, useState } from "react";
import css from "./yunaReport.module.css";
import OrderReportHook from "../Hooks/OrderReportHook";
import LoadingSpinner from "../components/Spinner/Spinner";
import myHeaders from "../components/MyHeader/myHeader";
import writeXlsxFile from "write-excel-file";

const tradeshopIds = [
  3601, 5880, 5881, 5882, 5883, 5885, 5887, 6200, 6222, 6268, 10220
];

const initialSchema = [
  {
    column: "Код",
    type: String,
    value: (d) => d.sku,
    width: 10,
    alignVertical: "center",
    align: "center",
  },
  {
    column: "Нэр",
    type: String,
    value: (d) => d.name,
    width: 0,
    alignVertical: "center",
    align: "center",
  },
];

export const YunaReport = (props) => {
  const { setShowYunaReport } = useContext(OrderReportHook);

  const [reportLoading, setReportLoading] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const [starDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [schema, setSchema] = useState(initialSchema);

  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    ////|| Number(props.userData.company_id !== 907)
    if (!props.permissionData.order.report) {
      alert("Танд тайлангийн эрх байхгүй байна.");
      setShowYunaReport(false);
    }
  }, [props, setShowYunaReport]);

  const generateReport = async () => {
    try {
      setReportLoading(true);

      if (starDate === "" || endDate === "") {
        alert("Эхлэх болон Дуусах өдрүүдээ оруулна уу");
        return;
      }

      if (endDate < starDate) {
        alert("Эхлэх болон Дуусах өдрийг буруу сонгосон байна");
        setStartDate("");
        setEndDate("");
        return;
      }

      const orderUrl = `https://api2.ebazaar.mn/api/orders?order_type=1&supplier_id=14045&order_start=${starDate}&order_end=${endDate}&page=all`;
      const tradeshopUrl = `https://api2.ebazaar.mn/api/merchants?id=${tradeshopIds.toString()}&page=all`;
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const [orderRes, tradeshopRes] = await Promise.all([
        fetch(orderUrl, requestOptions),
        fetch(tradeshopUrl, requestOptions),
      ]);
      const orderData = await orderRes.json();
      const tradeshopData = await tradeshopRes.json();

      if (orderData.data.length === 0) {
        alert("Сонгосон хугацаанд захиалга хийгдээгүй байна.");
        setStartDate("");
        setEndDate("");
        return;
      }

      const schemaCopy = [...schema];

      for (const data of tradeshopData.data) {
        schemaCopy.push({
          column: data.tradeshop_name,
          type: Number,
          value: (d) => {
            const key = data.tradeshop_id;
            return d[key];
          },
          width: data.tradeshop_name.length,
          alignVertical: "center",
          align: "center",
          id: data.tradeshop_id,
        });
      }

      schemaCopy.push({
        column: "Нийт",
        type: Number,
        value: (d) => d.total,
        alignVertical: "center",
        align: "center",
      });

      let initProducts = [];
      for (const order of orderData.data) {
        for (const prod of order.line) {
          initProducts.push({ ...prod, tradeshop_id: order.tradeshop_id });
        }
      }

      const uniqueProducts = initProducts
        .filter(
          (obj, index, self) =>
            index === self.findIndex((o) => o.product_id === obj.product_id)
        )
        .sort((a, b) => a.product_sku - b.product_sku);

      const reportDataCopy = [];

      for (const product of uniqueProducts) {
        if (product.product_name.length > schemaCopy[1].width) {
          schemaCopy[1].width = product.product_name.length;
        }

        const data = {
          sku: product.product_sku,
          name: product.product_name,
          id: product.product_id,
        };

        for (const shop of tradeshopData.data) {
          data[shop.tradeshop_id] = 0;
        }

        data.total = 0;

        reportDataCopy.push(data);
      }

      for (const product of initProducts) {
        const reportProduct = reportDataCopy.find(
          (obj) => obj.id === product.product_id
        );
        reportProduct[product.tradeshop_id] += product.quantity;
        reportProduct.total += product.quantity;
      }

      const repCopy = reportDataCopy.map((obj) => ({ ...obj }));

      console.log("repCopy", repCopy);

      for (const id of tradeshopIds) {
        let allHasZero = true;

        for (const rep of repCopy) {
          if (rep[id] > 0) {
            allHasZero = false;
            break;
          }
        }

        if (allHasZero) {
          for (const rep of repCopy) {
            delete rep[id];
          }

          const indexSchema = schemaCopy.findIndex((el) => el.id === id);
          schemaCopy.splice(indexSchema, 1);
        }
      }

      for (const data of repCopy) {
        delete data.id;
      }

      for (const schem of schemaCopy) {
        delete schem.id;
      }

      setSchema(schemaCopy);
      setReportData(repCopy);

      setReportReady(true);
    } catch (error) {
      console.log("error while generating report: ", error);
      alert("Тайлан бэлтгэхэд алдаа гарлаа.");
    } finally {
      setReportLoading(false);
    }
  };

  const downloadReport = () => {
    writeXlsxFile(reportData, {
      schema,
      fileName: `yuna-report-/${starDate}/-/${endDate}/.xlsx`,
      headerStyle: {
        backgroundColor: "#d3d3d3",
        align: "center",
        alignVertical: "center",
        borderColor: "#000000",
      },
      fontFamily: "Tahoma",
      fontSize: 8,
      alignVertical: "center",
    });
  };

  const refresh = () => {
    setReportReady(false);
    setStartDate("");
    setEndDate("");
    setSchema(initialSchema);
    setReportData([]);
    setReportLoading(false);
  };

  const closeHandler = () => setShowYunaReport(false);

  return (
    <div id="formwithtransparentbackground">
      <div id="form" style={{ height: 240, width: 400 }}>
        <div className={css.wrapper}>
          <div className={css.headerWrapper}>
            <h1 className={css.title}>Yuna тайлан</h1>
            <button
              type="button"
              onClick={closeHandler}
              className={css.closeBtn}
            >
              Хаах
            </button>
          </div>

          <div className={css.contentWrapper}>
            {!reportLoading && !reportReady && (
              <>
                <div className={css.datePickerContainer}>
                  <label htmlFor="startDate">Эхлэх огноо</label>
                  <input
                    id="startDate"
                    type="date"
                    className="dateselect"
                    style={{ width: "100%" }}
                    value={starDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className={css.datePickerContainer}>
                  <label htmlFor="endDate">Дуусах огноо</label>
                  <input
                    id="endDate"
                    type="date"
                    className="dateselect"
                    style={{ width: "100%" }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </>
            )}
            {!reportLoading && reportReady && (
              <div className={css.textWrapper}>
                <h1>Тайлан амжилттай үүслээ...</h1>
              </div>
            )}
            {reportLoading && (
              <div className={css.spinnerWrapper}>
                <LoadingSpinner />
              </div>
            )}
          </div>

          <div className={css.btnWrapper}>
            {!reportReady && (
              <button
                onClick={generateReport}
                className={css.submitBtn}
                type="button"
                disabled={reportLoading}
              >
                Тайлан бэлтгэх
              </button>
            )}
            {reportReady && (
              <>
                <button
                  onClick={refresh}
                  className={css.refreshBtn}
                  type="button"
                >
                  Дахин тайлан бэлтгэх
                </button>
                <button
                  onClick={downloadReport}
                  className={css.submitBtn}
                  type="button"
                >
                  Тайлан татах
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div onClick={closeHandler} id="transparentbackground"></div>
    </div>
  );
};
