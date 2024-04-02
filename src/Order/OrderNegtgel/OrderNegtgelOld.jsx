import { useState, useEffect, useRef, useCallback, useContext } from "react";
import css from "./orderNegtgelOld.module.css";
import myHeaders from "../../components/MyHeader/myHeader";
import { Button, Input, LoadingSpinner } from "../../components/common";
import { CalendarGray } from "../../assets/icons";
import ErrorPopup from "../../Achiltiinzahialga/components/common/ErrorPopup";

import { GlobalContext } from "../../Hooks/GlobalContext";
import OrdersHook from "../../Hooks/OrdersHook";

import * as htmlToImage from "html-to-image";
import writeXlsxFile from "write-excel-file";

const initSchema = [
  {
    column: "№",
    type: Number,
    value: (p) => p.number,
    width: 10,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Бүтээгдэхүүн",
    type: String,
    value: (p) => p.name,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "SKU",
    type: String,
    value: (p) => p.sku,
    width: 10,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Barcode",
    type: String,
    value: (p) => p.barcode,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Нэгж үнэ",
    type: Number,
    value: (p) => p.price,
    width: 10,
    align: "right",
    alignVertical: "center",
  },
  {
    column: "Тоо ширхэг",
    type: Number,
    value: (p) => p.quantity,
    width: 10,
    align: "right",
    alignVertical: "center",
  },
  {
    column: "Нийт үнэ",
    type: Number,
    value: (p) => p.totalPrice,
    width: 10,
    align: "right",
    alignVertical: "center",
  },
];

export const OrderNegtgelOld = ({ closeHandler }) => {
  const { loggedUser } = useContext(GlobalContext);
  const ordersCtx = useContext(OrdersHook);
  const { checkedOrders } = ordersCtx;

  const [reportReady, setReportReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [products, setProducts] = useState([]);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [schema, setSchema] = useState(initSchema);
  const [reportData, setReportData] = useState([]);
  const [usersXt, setUsersXt] = useState([]);
  const [chosenXt, setChosenXt] = useState("");

  const receiptRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      setWidth(receiptRef.current.clientWidth);
      setHeight(receiptRef.current.clientHeight);
    }
  }, [loading]);

  useEffect(() => {
    console.log("checkedOrderscheckedOrders", checkedOrders);
  }, [checkedOrders]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const companyId = Number(loggedUser.company_id.replaceAll("|", ""));

        const url = `https://api2.ebazaar.mn/api/backoffice/users?role=1&company=${companyId}`;
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        setUsersXt(resData.data);
      } catch (error) {
        console.log("error while fetching users: ", error);
      }
    };

    getUsers();
  }, []);

  const generateReport = async () => {
    try {
      setLoading(true);

      const ordersId = [];

      checkedOrders.map((order) => {
        ordersId.push(order.order_id);
      });

      if (deliveryDate === "" && chosenXt === "" && ordersId.length === 0) {
        throw new Error(
          "Хүргүүлэх огноо худалдааны төлөөлөгч аль нэгийг сонгоно уу!"
        );
      }

      const url = `https://api2.ebazaar.mn/api/orders?delivery_start=${deliveryDate}&delivery_end=${deliveryDate}&sales_man=${chosenXt}&ids=${ordersId}&page=all&order_type=1`;
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      console.log(url);

      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      console.log(resData)

      if (resData.data.length === 0) {
        throw new Error("Сонгосон өдөр хүргүүлэх захиалга олдсонгүй!");
      }

      let productIds = [];
      const prods = [];

      for (const order of resData.data) {
        for (const prod of order.line) {
          productIds.push(prod.product_id);
          prods.push({ ...prod });
        }
      }

      productIds = [...new Set(productIds)];

      const productsCopy = [];

      for (const id of productIds) {
        for (const prod of prods) {
          if (prod.product_id === id) {
            productsCopy.push({ ...prod, totalCount: 0 });
            break;
          }
        }
      }

      for (const product of productsCopy) {
        for (const prod of prods) {
          if (product.product_id === prod.product_id) {
            product.totalCount += prod.quantity;
            // break;
          }
        }
      }

      const reportDataCopy = [];
      const schemaCopy = [...schema];

      for (let i = 0; i < productsCopy.length; i++) {
        const product = productsCopy[i];
        const data = {
          number: i + 1,
          name: product.product_name,
          sku: product.product_sku ? product.product_sku : "",
          barcode: product.product_bar_code ? product.product_bar_code : "",
          price: product.price,
          quantity: product.totalCount,
          totalPrice: product.price * product.totalCount,
        };

        if (data.name.length + 5 > schemaCopy[1].width) {
          schemaCopy[1].width = data.name.length + 5;
        }
        if (data.sku.length + 5 > schemaCopy[2].width) {
          schemaCopy[2].width = data.sku.length + 5;
        }
        if (data.barcode.length + 5 > schemaCopy[3].width) {
          schemaCopy[3].width = data.barcode.length + 5;
        }
        if ((data.price + "").length + 5 > schemaCopy[4].width) {
          schemaCopy[4].width = (data.price + "").length + 5;
        }
        if ((data.quantity + "").length + 5 > schemaCopy[5].width) {
          schemaCopy[5].width = (data.quantity + "").length + 5;
        }
        if ((data.totalPrice + "").length + 5 > schemaCopy[6].width) {
          schemaCopy[6].width = (data.totalPrice + "").length + 5;
        }

        reportDataCopy.push({ ...data });
      }
      console.log('-----------------------------------------------------------------')
      console.log(reportDataCopy)
      console.log('----------------------------------------------------------------------------------------')
      setProducts(productsCopy);
      setReportData(reportDataCopy);
      setSchema(schemaCopy);
      setReportReady(true);
    } catch (error) {
      setErrorMsg(error.message);
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  const downloadHandler = useCallback(() => {
    if (receiptRef.current === null) return;

    htmlToImage
      .toPng(receiptRef.current, {
        cacheBust: true,
        canvasWidth: width * 3,
        canvasHeight: height * 3,
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Захиалгын-нэгтгэл-${deliveryDate}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.log(err));
  }, [receiptRef, height, width, deliveryDate]);

  const downloadReport = () => {
    console.log(reportData)
    writeXlsxFile(reportData, {
      schema,
      sheet: `Захиалгын нэгтгэл ${deliveryDate}`,
      fileName: `Захиалгын-нэгтгэл-/${deliveryDate}/.xlsx`,
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

  return (
    <>
      <div onClick={closeHandler} className={css.printRecieptContainer}>
        <div id="scrollableDiv" className={css.scrollcontainer}>
          <div
            onClick={(e) => e.stopPropagation()}
            ref={receiptRef}
            className={css.receiptContainer}
          >
            <div className={css.receiptWrapper}>
              <span className={css.title}>Захиалгын нэгтгэл--</span>

              {!loading && reportReady && (
                <>
                  <div className={css.shipmentDetails}>
                    <span>Хүргүүлэх огноо: {deliveryDate}</span>
                  </div>

                  <table className={css.productTables}>
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}>№</th>
                        <th>Бүтээгдэхүүн</th>
                        <th>SKU</th>
                        <th>Barcode</th>
                        <th>Нэгж үнэ</th>
                        <th>Тоо ширхэг</th>
                        <th>Нийт үнэ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => {
                        return (
                          <tr key={`receipt-${product._id}`}>
                            <td>{index + 1}</td>
                            <td>{product.product_name}</td>
                            <td>{product.product_sku}</td>
                            <td>{product.product_bar_code}</td>
                            <td>{product.price.toLocaleString()}₮</td>
                            <td>{product.totalCount}</td>
                            <td>
                              {(
                                product.price * product.totalCount
                              ).toLocaleString()}
                              ₮
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className={css.productFooterWrapper}>
                    <div className={css.productsDetail}>
                      <span>Нийт барааны төрөл: {products.length}</span>
                      <span>
                        Нийт бүтээгдэхүүн:{" "}
                        {products
                          .reduce((acc, cur) => acc + cur.totalCount, 0)
                          .toLocaleString()}
                        ш
                      </span>
                      <div>
                        Нийт үнийн дүн:{" "}
                        {products
                          .reduce(
                            (acc, cur) => acc + cur.totalCount * cur.price,
                            0
                          )
                          .toLocaleString()}
                        ₮
                      </div>
                    </div>

                    <div className={css.infoFooter}>
                      <div className={css.rightSide}>
                        <span>
                          Захиалгын нэгтгэл үүсгэсэн:&nbsp;
                          ________________________
                        </span>
                        <span>
                          Захиалгын хүлээн авсан: &nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp; ________________________
                        </span>
                        <span>
                          Захиалгыг хянасан: &nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                          &nbsp;&nbsp; ________________________
                        </span>
                      </div>

                      <div className={css.leftSide}>Тэмдэг</div>
                    </div>
                  </div>
                </>
              )}

              {!loading && !reportReady && (
                <div className={css.dateSelectWrapper}>
                  <div>
                    <label>Хүргүүлэх огноо</label>
                    <Input
                      icon={<CalendarGray />}
                      iconposition="left"
                      type="date"
                      size="medium"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      name="deliveryDate"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                    }}
                  >
                    <label>Худалдааны төлөөлөгч сонгох</label>
                    <select
                      style={{
                        width: "max-content",
                        fontSize: "13px",
                        borderRadius: "8px",
                        padding: "4px 8px",
                        borderColor: "#cccccc",
                      }}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setChosenXt(e.target.value);
                      }}
                    >
                      <option style={{ fontSize: "13px" }} value="">
                        Сонгох
                      </option>
                      {usersXt.map((xt) => {
                        return (
                          <option
                            value={xt.user_id}
                            style={{ fontSize: "13px" }}
                          >
                            {xt?.first_name || xt?.last_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className={css.dateSelectBtns}>
                    <Button
                      onClick={generateReport}
                      variant="primary"
                      size="large"
                    >
                      Нэгтгэл бэлтгэх
                    </Button>
                  </div>
                </div>
              )}

              {loading && (
                <div className={css.loadingSpinner}>
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={css.printBtn}>
          <Button onClick={closeHandler} variant="secondary" size="medium">
            Болих
          </Button>

          <Button
            disabled={loading || !reportReady}
            onClick={(e) => {
              e.stopPropagation();
              downloadHandler();
            }}
            variant="primary"
            size="medium"
          >
            Татах
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              downloadReport();
            }}
            disabled={loading || !reportReady}
            variant="primary"
            size="medium"
          >
            Excel татах
          </Button>
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
