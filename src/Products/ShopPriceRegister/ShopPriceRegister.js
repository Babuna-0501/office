import React, { useState, useContext } from "react";
import readXlsxFile from "read-excel-file";
import css from "./shoppriceregister.module.css";
import Shops from "./Shops";
import ProductReportHook from "../../Hooks/ProductsReportHook";
import ProductHook from "../../Hooks/ProductHook";
import Upload from "./Upload";
import myHeaders from "../../components/MyHeader/myHeader";
import RegisterProduct from "./RegisterProduct";
import AppHook from "../../Hooks/AppHook";

const ShopPriceRegister = (props) => {
  const [page, setPage] = useState(1);
  const [shopsdata, setShopsdata] = useState([]);
  const [productdata, setProductdata] = useState([]);
  const sitedatactx = useContext(ProductReportHook);
  const prodctx = useContext(ProductHook);
  const appctx = useContext(AppHook);

  //   console.log("propseeeeeeeeee", props);
  const readExcel = () => {
    const id = (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
    document
      .getElementById("root")
      .insertAdjacentHTML(
        "beforeEnd",
        '<form method="post" enctype="multipart/form‐data" id="' +
          id +
          '" name=' +
          id +
          '><input type="file" id="read" /></form>'
      );

    document.getElementById("read").click();
    document.getElementById("read").addEventListener("change", () => {
      const schema = {
        name: {
          prop: "name",
          type: String,
        },
        barcode: {
          prop: "barcode",
          type: String,
        },

        sku: {
          prop: "sku",
          type: String,
        },
        price: {
          prop: "price",
          type: Number,
        },
        description: {
          prop: "description",
          type: String,
        },
        in_case: {
          prop: "in_case",
          type: Number,
        },
        active: {
          prop: "active",
          type: Number,
        },
        id: {
          prop: "id",
          type: Number,
        },
      };
      readXlsxFile(document.getElementById("read").files[0], {
        schema,
      }).then((rows) => {
        // console.log("rows", rows);
        // setImportData(rows.rows);

        // let newData = [];

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        rows.rows &&
          rows.rows.map((item) => {
            console.log("item", item);
            let url = "";

            if (item.id) {
              url = `https://api2.ebazaar.mn/api/products/get1?ids=[${parseInt(
                item.id
              )}]`;
            } else {
              url = `https://api2.ebazaar.mn/api/products/get1?bar_code=${parseInt(
                item.barcode
              )}`;
            }

            console.log("url948", url);
            fetch(url, requestOptions)
              .then((res) => res.json())
              .then((res) => {
                let newData = [];
                console.log("response upload", res);
                if (res.code === 200 && res.data.length !== 0) {
                  newData.push({
                    ...item,
                    product: true,
                    _id: res.data[0]._id,
                    supplier_id: res.data[0].supplier_id,
                  });
                } else {
                  newData.push({
                    ...item,
                    product: true,
                    _id: null,
                    supplier_id: null,
                  });
                }
                sitedatactx.setImportData((prev) => [...prev, ...newData]);
              })
              .catch((error) => {
                console.log("error", error);
              });
          });
      });
    });
  };

  const SaveHandler = () => {
    // console.log("productdata-productdata", sitedatactx.importData);
    // console.log("userdata", sitedatactx.shopIDS);

    let mewdata = [];
    if (sitedatactx.shopIDS.length === 0) {
      alert("Та дэлгүүрээ сонгоно уу");
      return;
    }
    if (sitedatactx.importData.length === 0) {
      alert("Та бараагаа оруулна уу");
      return;
    }

    sitedatactx.importData.map((item) => {
      if (item._id !== null) {
        let TIDS = [];
        sitedatactx.shopIDS.map((x) => {
          TIDS.push({
            tradeshopId: Number(x),
            price: Number(item.price),
          });
        });
        mewdata.push({
          supplier_id: item.supplier_id,
          data: [
            {
              _id: Number(item._id),
              tradeshop: TIDS,
            },
          ],
        });
        TIDS = [];
      }
    });

    let errordata = [];
    let successdata = [];

    mewdata &&
      mewdata.map((x) => {
        // console.log("x", x);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
          body: JSON.stringify(x),
        };
        console.log("requestOptions", requestOptions);
        fetch(
          `https://api2.ebazaar.mn/api/product/channel-price`,
          requestOptions
        )
          .then((res) => res.json())
          .then((res) => {
            console.log("res-----", res);
            if (res.code === 200) {
              if (res.code === 200 && res.data && res.data.length !== 0) {
                errordata.push({
                  error: "aldaa",
                  message: res.data.toString(),
                });
              } else if (res.code === 200 && res.data.length === 0) {
                successdata.push(res);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    sitedatactx.setShopIDS([]);
    sitedatactx.setImportData([]);
    setPage(1);
    prodctx.setShopPrice(false);
    if (errordata.length !== 0) {
      let title = [];

      errordata.map((item) => {
        title.push(JSON.stringify(item.message));
      });
      alert(
        `Дутуу бүртгэгдлээ. Дутуу орсон бүтээгдэхүүний дугаар : ${title.toString()}`
      );
      errordata = [];
    }

    if (successdata.length !== 0) {
      alert(`Та ${successdata.length} хэдэн барааны сувгийн үнийг шинэчлэлээ.`);
      sitedatactx.setShopIDS([]);
      sitedatactx.setImportData([]);
      setPage(1);
      prodctx.setShopPrice(false);
    }
  };
  console.log("shopsdata", shopsdata);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {page === 1 && (
          <>
            <div className={css.body}>
              <div className={css.shopscontainer}>
                <div>
                  <div className={css.contentheader}>
                    <span>Дэлгүүрийн нэрс</span>
                  </div>
                  <div className={css.shopswrapper}>
                    {shopsdata &&
                      shopsdata
                        .filter((x) =>
                          sitedatactx.shopIDS.includes(x.tradeshop_id)
                        )
                        .map((item, index) => {
                          return <p key={index}>{item.tradeshop_name} </p>;
                        })}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#37474F",
                      fontWeight: "400",
                    }}
                  >
                    {shopsdata &&
                      shopsdata.length !== 0 &&
                      `Нийт дэлгүүр : ${
                        shopsdata.filter((x) =>
                          sitedatactx.shopIDS.includes(x.tradeshop_id)
                        ).length
                      }ш`}
                  </div>
                </div>

                <div className={css.shopnemeh}>
                  <button
                    onClick={() => {
                      setPage(2);
                    }}
                  >
                    Дэлгүүр нэмэх
                  </button>
                </div>
              </div>
              <div className={css.shopscontainer}>
                <div className={css.contentheader}>
                  <span>Барааны мэдээлэл</span>
                </div>
                <div>
                  <div className={css.header}>
                    <span
                      style={{
                        width: "150px",
                      }}
                    >
                      SKUS
                    </span>
                    <span
                      style={{
                        width: "150px",
                      }}
                    >
                      Price
                    </span>
                  </div>
                  <div className={css.skubody}>
                    {sitedatactx.importData &&
                      sitedatactx.importData.map((item, index) => {
                        return (
                          <div
                            className={css.onesku}
                            style={{
                              background: item._id === null ? "red" : "#fff",
                            }}
                          >
                            <p>{item.sku}</p>
                            <p>{item.price}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div
                  className={css.shopnemeh}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {" "}
                  <div
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Урт : {sitedatactx.importData.length}
                  </div>
                  <button
                    onClick={() => {
                      readExcel();
                      setPage(4);
                    }}
                  >
                    Масс импорт
                  </button>
                </div>
              </div>
            </div>
            <div className={css.btnwrapper}>
              <button
                style={{
                  background: "#ECEFF1",
                  color: "#78909C",
                }}
                onClick={() => {
                  sitedatactx.setShopIDS([]);
                  sitedatactx.setImportData([]);
                  prodctx.setShopPrice(false);
                }}
              >
                Цуцлах
              </button>
              <button
                style={{
                  background: "#ffa600",
                  color: "#fff",
                }}
                onClick={SaveHandler}
              >
                Хадгалах
              </button>
            </div>
          </>
        )}
        {page === 2 && <Shops setPage={setPage} setShopsdata={setShopsdata} />}
        {/* {page === 3 && (
          <RegisterProduct setPage={setPage} setProductdata={setProductdata} />
        )} */}
        {page === 4 && (
          <Upload setPage={setPage} setProductdata={setProductdata} />
        )}
      </div>
    </div>
  );
};

export default ShopPriceRegister;
