// CSS
import css from "./shipmentReport.module.css";

// Components
import { Button, Input } from "./common";
import LoadingSpinner from "../../components/Spinner/Spinner";
import ErrorPopup from "./common/ErrorPopup";

// Packages
import { useState } from "react";
import writeXlsxFile from "write-excel-file";
import myHeaders from "../../components/MyHeader/myHeader";

const initialSchema = [
  {
    column: "Дугаар",
    type: String,
    value: (s) => s.id,
    width: 10,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Төлөв",
    type: String,
    value: (s) => s.status,
    width: 20,
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
    value: (s) => s.createDate,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Хариуцагч",
    // type: String,
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

export const ShipmentReport = (props) => {
  const { closeHandler, users, inventories, userData } = props;

  const [loading, setLoading] = useState(false);
  const [doneGenerate, setDoneGenerate] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [schema, setSchema] = useState(initialSchema);

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

    console.log("url", url);
    console.log("productData", productData);
    let amount = 0;

    await productData.data.map((product) => {
      products.map((el) => {
        if (el.id === product._id) {
          amount +=
            product.locations["62f4aabe45a4e22552a3969f"]?.price?.channel["1"] *
            el.qty;
        }
      });
    });

    return amount;
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
        const totalPrice = await getAmountOfProduct({ _id: movement._id });
        const to = await getWarehouseName({ id: movement.to });
        const from = await getWarehouseName({ id: movement.from });
        return {
          id: movement._id,
          createDate: movement.createdDate.slice(0, 10),
          inInventory: to,
          outInventory: from,
          status: checkStatus({ status: Number(movement.status) }),
          owner:
            users.find((usr) => usr.user_id === movement.requestedBy)
              ?.first_name || movement.requestedBy,
          type: checkType({ type: Number(movement.status) }),
          totalPrice: totalPrice,
        };
      }

      const movementFilteredData = await Promise.all(
        movementResData.data.map(processMovementData)
      );

      console.log(movementFilteredData);

      setReportData(movementFilteredData);

      setDoneGenerate(true);
    } catch (error) {
      setErrorMsg(error.message);
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    try {
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
    } catch (error) {
      console.error("An error occurred while generating the report:", error);
    }
  };
  const restart = () => {
    setStartDate("");
    setEndDate("");
    setReportData([]);
    setSchema(initialSchema);
    setDoneGenerate(false);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1>Тайлан</h1>
          <button disabled={loading} onClick={closeHandler} type="button">
            Хаах
          </button>
        </div>

        {!loading && !doneGenerate && (
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

        {!loading && doneGenerate && (
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
          {!doneGenerate && (
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
          {doneGenerate && (
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
