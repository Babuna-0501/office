// CSS
import { useState } from "react";
import { Button, Input } from "./common";
import css from "./detailedShipmentReport.module.css";
import LoadingSpinner from "../../components/Spinner/Spinner";
import writeXlsxFile from "write-excel-file";
import ErrorPopup from "./common/ErrorPopup";
import myHeaders from "../../components/MyHeader/myHeader";

const initSchema = [
  {
    column: "Дугаар",
    type: String,
    value: (s) => s.id,
    width: 10,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Барааны нэр",
    type: String,
    value: (s) => s.name,
    width: 30,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Баркод",
    type: String,
    value: (s) => s.barcode,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Нэгж үнэ",
    type: Number,
    value: (s) => Number(s.price),
    width: 20,
    align: "center",
    alignVertical: "center",
    format: "#,##0.00",
  },
  {
    column: "Тоо ширхэг",
    type: Number,
    value: (s) => Number(s.quantity),
    width: 10,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Нийт үнэ",
    type: Number,
    value: (s) => s.totalPrice,
    width: 20,
    align: "center",
    alignVertical: "center",
    format: "#,##0.00",
  },
  {
    column: "Гарсан агуулах",
    type: String,
    value: (s) => s.outInventory,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Авах агуулах",
    type: String,
    value: (s) => s.inInventory,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Үүссэн огноо",
    type: String,
    value: (s) => s.createdDate,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Хариуцагч",
    type: String,
    value: (s) => s.owner,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Төрөл",
    type: String,
    value: (s) => s.type,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
];

export const DetailedShipmentReport = (props) => {
  const { closeHandler, userData, users, inventories } = props;

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [schema, setSchema] = useState(initSchema);
  const [reportData, setReportData] = useState([]);

  const getAmountOfProduct = async ({ _id }) => {
    const url = `https://api2.ebazaar.mn/api/shipment/get/final?_id=${_id}&products=true`;
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(url, requestOptions);
    const resData = await res.json();

    const products = [];
    const productsIds = [];

    resData.data[0].products.map((product) => {
      productsIds.push(Number(product.productId));
      products.push({ id: product.productId, qty: product.quantity });
    });

    const productUrl = `https://api2.ebazaar.mn/api/products/get1?ids=[${productsIds.join(
      ","
    )}]`;

    const productRes = await fetch(productUrl, requestOptions);
    const productData = await productRes.json();

    const productsData = [];

    await productData.data.map((product) => {
      products.map((el) => {
        if (el.id === product._id) {
          productsData.push({
            qty: el.qty,
            _id: el.id,
            bar_code: product.bar_code,
            price:
              product.locations["62f4aabe45a4e22552a3969f"]?.price?.channel[
                "1"
              ],
            name: product.name,
            amount:
              product.locations["62f4aabe45a4e22552a3969f"]?.price?.channel[
                "1"
              ] * el.qty,
          });
        }
      });
    });

    return productsData;
  };

  const getWarehouseName = async ({ id }) => {
    try {
      const url = `https://api2.ebazaar.mn/api/warehouse/get/new?id=${id}`;
      myHeaders.append(
        "ebazaar_token",
        "3c205f7da6d452a6d35f2d99ba63fa7d:73fe47deeedf667fa99b22b175af29ad040cbcfc3055eafb2b80a77c1c07e0822ebf31cbf494005d2397d49143efcea632d479e59e0e056e09b20ea844dfc4dd3ba62eb74df1d2831a069d55a01a2f3f"
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      return resData.data[0].name;
    } catch (error) {
      return " ";
    }
  };

  const generateReport = async () => {
    try {
      if (startDate === "") {
        throw new Error("Эхлэх огноогоо сонгоно уу!");
      }
      if (endDate === "") {
        throw new Error("Дуусах огноогоо сонгоно уу!");
      }

      if (startDate > endDate) {
        throw new Error("Эхлэх болон Дуусах огноо буруу байна!");
      }

      setLoading(true);
      const companyId =
        Number(userData.company_id.replaceAll("|", "")) === 1
          ? 13884
          : Number(userData.company_id.replaceAll("|", ""));

      setLoading(true);

      const url = `https://api2.ebazaar.mn/api/shipment/get/final?supplierId=${companyId}&startDate=${startDate}&endDate=${endDate}&createdDate=true`;
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const movementResData = await res.json();

      // total price tootsoolohiin tuld async function ashiglav

      const checkType = ({ type }) => {
        if (type === 1) {
          return "Орлого";
        } else if (type === 2) {
          return "Зарлага";
        } else if (type === 3) {
          return "Агуулах хооронд";
        } else {
          return "";
        }
      };
      const checkStatus = ({ status }) => {
        if (status === 1) {
          return "Хүлээгдэж буй";
        } else if (status === 2) {
          return "Баталгаажсан";
        } else {
          return "";
        }
      };

      async function processMovementData(movement) {
        const products = await getAmountOfProduct({ _id: movement._id });
        const to = await getWarehouseName({ id: movement.to });
        const from = await getWarehouseName({ id: movement.from });
        return {
          id: movement._id,
          createDate: movement.createdDate.slice(0, 10),
          inInventory: to,
          outInventory: from,
          status: checkStatus({ status: Number(movement.status) }),
          owner: users.find((usr) => usr.user_id === movement.requestedBy)
            ?.first_name,
          type: checkType({ type: Number(movement.status) }),
          products: products,
        };
      }

      const movementFilteredData = await Promise.all(
        movementResData.data.map(processMovementData)
      );

      const reportDataCopy = [];

      movementFilteredData.map((movement) => {
        movement.products.map((product) => {
          reportDataCopy.push({
            barcode: product.bar_code || "",
            name: product.name,
            createdDate: movement.createDate,
            id: movement.id,
            price: product.price,
            quantity: product.qty,
            totalPrice: product.amount,
            outInventory: movement.outInventory,
            inInventory: movement.inInventory,
            owner: movement.owner,
            type: movement.type,
          });
        });
      });

      setReportData(reportDataCopy);

      setReportReady(true);
    } catch (error) {
      setErrorMsg(error.message);
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    writeXlsxFile(reportData, {
      schema,
      fileName: `shipment-report-/${startDate}/-/${endDate}/.xlsx`,
      headerStyle: {
        backgroundColor: "#d3d3d3",
        align: "center",
        alignVertical: "center",
        borderColor: "#000000",
      },
      fontFamily: "Calibri",
      fontSize: 11,
      alignVertical: "center",
      align: "center",
      dateFormat: "mm/dd/yyyy",
      stickyRowsCount: 1,
    });
  };

  const restart = () => {
    setStartDate("");
    setEndDate("");
    setReportData([]);
    setSchema(initSchema);
    setReportReady(false);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1>Дэлгэрэнгүй тайлан</h1>
          <button onClick={closeHandler} type="button">
            Хаах
          </button>
        </div>

        {!loading && !reportReady && (
          <div className={css.content}>
            <div className={css.dateContainer}>
              <label htmlFor="startDate">Эхлэх огноо</label>
              <Input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                id="startDate"
                type="date"
                size="medium"
              />
            </div>

            <div className={css.dateContainer}>
              <label htmlFor="endDate">Дуусах огноо</label>
              <Input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                id="endDate"
                type="date"
                size="medium"
              />
            </div>
          </div>
        )}

        {!loading && reportReady && (
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>Тайлан амжилттай үүслээ...</span>
          </div>
        )}

        {loading && (
          <div className={css.loadingSpinner}>
            <LoadingSpinner />
          </div>
        )}

        <div className={css.btnContainer}>
          {!reportReady && (
            <>
              <Button
                disabled={loading}
                onClick={closeHandler}
                variant="secondary"
                size="medium"
              >
                Цуцлах
              </Button>
              <Button
                onClick={generateReport}
                disabled={loading}
                variant="primary"
                size="medium"
              >
                Тайлан бэлтгэх
              </Button>
            </>
          )}
          {reportReady && (
            <>
              <Button
                disabled={loading}
                onClick={restart}
                variant="secondary"
                size="medium"
              >
                Дахин бэлтгэх
              </Button>
              <Button
                onClick={downloadReport}
                disabled={loading}
                variant="primary"
                size="medium"
              >
                Тайлан татах
              </Button>
            </>
          )}
        </div>
      </div>

      {showErrorMsg && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => setShowErrorMsg(false)}
        />
      )}
    </>
  );
};
