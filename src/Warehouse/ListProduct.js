import React, { useState, useContext } from "react";
import css from "./list.module.css";
import { useEffect } from "react";
import { Drawer, DatePicker, Tabs } from "antd";
import calendar from "../assets/Calendar.svg";
import arrowICON from "../assets/Arrow - Right.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../components/Spinner/Spinner";
import AppHook from "../Hooks/AppHook";
import myHeaders from "../components/MyHeader/myHeader";
import { styles } from "./style";
import TatahProductIndex from "./TatahProduct/TatahProductIndex";

const List = (props) => {
  //alert('List')
  const { RangePicker } = DatePicker;
  const appctx = useContext(AppHook);
  const [productIds, setProductIds] = useState();
  const [productStock, setProductStock] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [sad, setsad] = useState();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filteredIds, setFilteredIds] = useState();
  const [data, setData] = useState([]);
  const [tatahProduct, setTatahProduct] = useState(false);
  const [onebaraa, setOnebaraa] = useState(null);
  const [onebaraastock, setOnebaraastock] = useState(null);

  // console.log("props listproduct", props);
  // console.log("appctx.selectedWareHouse.", appctx.selectedWareHouse);
  // console.log("appctx.selectedWareHouse._id", appctx.selectedWareHouse._id);
  // console.log("productStock", productStock);

  useEffect(() => {
    if (appctx.selectedWareHouse._id) {
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      let url = `https://api2.ebazaar.mn/api/warehouse/get?id=${appctx.selectedWareHouse._id}`;
      console.log(url);

      fetch(url, requestOptions)
        .then((r) => r.json())
        .then((res) => {
          // console.log("res=>res.warehouse", res.data[0]);
          let aaa = [];

          Object.keys(res.data[0]).map((item) => {
            if (
              item == "_id" ||
              item == "supplier_id" ||
              item == "supplier_name" ||
              item == "name" ||
              item == "location" ||
              item == "manager" ||
              item == "type" ||
              item == "origin" ||
              item == "created_date"
            ) {
              console.log("item", item);
            } else {
              aaa.push(item);
            }
          });
          setData(res.data[0]);
          // setProductIds(Object.keys(res.data[0]));
          setProductIds(aaa);
          setProductStock(res.data[0]);
        })
        .catch((error) => {
          // console.log("neg warehouse baraa harah", error);
          alert("Алдаа гарлаа");
        });
    }
  }, [appctx.selectedWareHouse]);

  useEffect(() => {
    if (props.searchproducts) {
      setProducts([]);
      setPage(1);
      setFilteredIds(
        productIds?.filter((e) =>
          props.searchproducts.map((a) => a._id.toString()).includes(e)
        )
      );
    } else if (props.ID) {
      setProducts([]);
      setPage(1);
      setFilteredIds(productIds?.filter((e) => e.includes(props.ID)));
    } else {
      setProducts([]);
      setFilteredIds(productIds);
    }
  }, [props.ID, productIds, props.searchproducts]);

  useEffect(() => {
    if (appctx.selectedWareHouse) {
      appctx.setSubPage(appctx.selectedWareHouse.name);
    }
  }, [appctx.selectedWareHouse]);

  const indata = selectedProduct?._id && data[selectedProduct?._id]?.in;
  const outdata = selectedProduct?._id && data[selectedProduct?._id]?.out;

  useEffect(() => {
    if (indata && outdata) {
      setsad([
        ...indata?.map((e) => ({ type: "in", data: e })),
        ...outdata?.map((e) => ({ type: "out", data: e })),
      ]);
    } else if (indata) {
      setsad([...indata?.map((e) => ({ type: "in", data: e }))]);
    } else if (outdata) {
      setsad([...outdata?.map((e) => ({ type: "out", data: e }))]);
    }
  }, [selectedProduct, appctx.selectedWareHouse]);

  const inDates =
    indata &&
    Array.from(new Set([...indata?.map((e) => e?.date?.split(",")[0])]));

  const outDates =
    outdata &&
    Array.from(new Set([...outdata?.map((e) => e?.date?.split(",")[0])]));

  const allDates =
    sad &&
    Array.from(new Set([...sad?.map((e) => e?.data?.date?.split(",")[0])]));

  allDates?.sort(function (a, b) {
    a = Date.parse(a);
    b = Date.parse(b);
    return a > b ? 1 : a < b ? -1 : 0;
  });
  // console.log("allDates", allDates);

  useEffect(() => {
    if (filteredIds) {
      let paged = filteredIds?.filter(
        (e, i) => i >= 50 * page - 50 && i <= 50 * page - 1 && e
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      let url = `https://api2.ebazaar.mn/api/products/get1?ids=[${paged}]`;
      fetch(url, requestOptions)
        .then((r) => r.json())
        .then((res) => {
          setProducts([...products, ...res.data]);
          // console.log("propduct set product ", res.data);
        })
        .catch((error) => {
          console.log("error", error, paged, page, filteredIds);
        });
    }
  }, [filteredIds, page]);

  const showDrawer = (e) => {
    setOpen(true);
    setSelectedProduct(e);
  };
  const onClose = () => {
    setOpen(false);
  };

  const footer = () => {
    return (
      <div
        style={{
          display: "flex",
          height: "80px",
          padding: "18px 35px",
          justifyContent: "space-between",
          boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className={css.cancel}>Цуцлах</div>
        <div className={css.transfer}>Бүтээгдэхүүн шилжүүлэх</div>
      </div>
    );
  };
  const negBaraaTATAH = (e, item, stockuldegdel) => {
    setTatahProduct(true);
    setOnebaraa(item);
    setOnebaraastock(stockuldegdel);
  };

  let content = products && (
    <div id="scrollableDiv" style={{ height: "80vh", overflow: "auto" }}>
      <InfiniteScroll
        dataLength={products?.length}
        next={() => {
          setPage((prev) => prev + 1);
        }}
        hasMore={true}
        scrollableTarget="scrollableDiv"
        loader={
          products?.length === 0 && (
            <div className={css.loading}>
              <LoadingSpinner />
            </div>
          )
        }
      >
        {products?.map((item, i) => {
            let stockuldegdel = productStock[item._id]?.stock?.[0]
              ? productStock[item._id]?.stock?.[0]
              : productStock[item._id]?.stock?.toLocaleString();
            let zonePrice = "";
            let productactive = 0;
            let locationkey = Object.keys(item.locations);
            if (locationkey.length > 0) {
              zonePrice =
                item.locations[locationkey[0]]?.price?.channel[
                  "1"
                ]?.toLocaleString();
              zonePrice = `${zonePrice}₮`;

              productactive =
                item.locations[locationkey[0]]?.is_active?.channel["1"];
            } else {
              zonePrice = "";
            }

            return (
              <div className={`${css.container}`} key={i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    ...styles.allWidthContainer,
                  }}
                  className={css.fs12}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",

                      padding: "0px 8px",
                      ...styles.productwrapper1,
                    }}
                  >
                    <input type="checkbox" />
                  </div>
                  <div
                    style={{
                      ...styles.productwrapper2,
                      padding: "0px 8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#37474F",
                      }}
                    >
                      {item?._id}
                    </span>
                  </div>
                  <div
                    style={{ ...styles.productwrapper3, padding: "0px 8px" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#37474F",
                        width: "50%",
                      }}
                    >
                      {productactive === 0 ? (
                        <img
                          src="https://admin.ebazaar.mn/media/off.svg"
                          alt="sfsd"
                        />
                      ) : (
                        <img
                          src="https://admin.ebazaar.mn/media/on.svg"
                          alt="aaa"
                        />
                      )}
                    </span>
                  </div>
                  <div
                    style={{ ...styles.productwrapper4, padding: "0px 8px" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#37474F",
                        width: "70%",
                      }}
                    >
                      {item?.image !== null ? (
                        <img
                          src={
                            item?.image[0] &&
                            item?.image[0] !==
                              "https://ebazaar.mn/icon/photo-add.svg"
                              ? item?.image[0]?.replace("original", "small")
                              : item?.image[0]
                          }
                          alt=""
                          className="product-image"
                        />
                      ) : (
                        "HI"
                      )}
                    </span>
                  </div>
                  <div
                    style={{
                      ...styles.productwrapper5,
                      padding: "0px 8px",
                      textOverflow: "ellipsis",
                    }}
                    className={css.productname}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#37474F",

                        lineHeight: "14px",
                        alignItems: "center",
                      }}
                    >
                      {item?.name}
                    </span>
                  </div>

                  <div
                    style={{
                      ...styles.productwrapper6,
                      overflow: "hidden",
                      padding: "0px 8px",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#37474F",
                      }}
                    >
                      {
                        props.categories.find(
                          (c) => c?.id === item?.category_id
                        )?.name
                      }
                    </span>
                  </div>
                  <div
                    style={{ ...styles.productwrapper7, padding: "0px 8px" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#37474F",
                      }}
                    >
                      {zonePrice}
                    </span>
                  </div>
                  <div
                    style={{ ...styles.productwrapper8, padding: "0px 8px" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#37474F",
                        width: "100%",
                      }}
                    >
                      {item?.sku}
                    </span>
                  </div>
                  <div
                    style={{ ...styles.productwrapper9, padding: "0px 8px" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#37474F",
                        width: "100%",
                        display: "flex",
                        overflow: "hidden",
                      }}
                    >
                      {item?.bar_code}
                    </span>
                  </div>
                  <div
                    style={{ ...styles.productwrapper10, padding: "0px 8px" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#37474F",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {stockuldegdel && stockuldegdel}
                    </span>
                  </div>
                  <div
                    style={{ ...styles.productwrapper11, padding: "0px 8px" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        width: "100%",
                      }}
                      onClick={(e) => {
                        negBaraaTATAH(e, item, stockuldegdel);
                      }}
                    >
                      <div
                        style={{
                          width: "90%",
                          borderRadius: "5px",
                          textAlign: "center",
                          color: "#FFFFFF",
                          background: "#B0BEC5",
                          fontSize: "12px",
                        }}
                      >
                        Татан авах
                      </div>
                    </span>
                  </div>
                  <div
                    style={{ ...styles.productwrapper12, padding: "0px 8px" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        width: "100%",
                      }}
                      onClick={() => {
                        showDrawer(item);
                      }}
                    >
                      <div
                        style={{
                          width: "90%",
                          borderRadius: "5px",
                          textAlign: "center",
                          color: "#546E7A",
                          background: "#ECEFF1",
                          border: "1px solid #CFD8DC",
                          fontSize: "12px",
                        }}
                      >
                        Хөдөлгөөн
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            );
        })}
        <div style={{ height: "120px" }}></div>
        {tatahProduct && (
          <TatahProductIndex
            setOnebaraastock={setOnebaraastock}
            onebaraastock={onebaraastock}
            onebaraa={onebaraa}
            setOnebaraa={setOnebaraa}
            setTatahProduct={setTatahProduct}
            setProductStock={setProductStock}
            productStock={productStock}
            setProducts={setProducts}
            products={products}
          />
        )}
      </InfiniteScroll>
      <Drawer
        title={<div className={css.title}>Хөдөлгөөн</div>}
        placement="right"
        onClose={onClose}
        footer={footer()}
        open={open}
        width="571px"
      >
        <div style={{ display: "flex", marginBottom: "24px" }}>
          <img
            src={
              selectedProduct?.image[0] &&
              selectedProduct?.image[0] !==
                "https://ebazaar.mn/icon/photo-add.svg"
                ? selectedProduct?.image[0].replace("original", "small")
                : selectedProduct?.image[0]
            }
            alt=""
            height={66}
            width={66}
            style={{
              background: "#FFFFFF",
              border: "1px solid #CFD8DC",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
              borderRadius: "5.65714px",
              marginRight: "15px",
            }}
          />
          <div>
            <div className={css.sku}>SKU: {selectedProduct?.sku}</div>
            <div
              className={css.description}
              style={{ maxHeight: "100px", overflowY: "scroll" }}
            >
              {selectedProduct?.description}
            </div>
          </div>
        </div>
        {/*
        holboogui bga tul tur haasan 
        <div style={{
						display: "flex",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<div className={css.time}>Өчигдөр</div>
					<div className={css.time}>Сүүлийн 7 хоног</div>
					<div className={css.time}>Сүүлийн 1 сар</div>
					<div className={css.time}>Сүүлийн 3 сар</div>
				</div>
				<RangePicker
					placeholder={["Эхлэх", "Дуусах"]}
					separator={separotorIcon}
					suffixIcon={icon}
					ranges={{
						Today: [moment(), moment()],
						"This Month": [moment().startOf("month"), moment().endOf("month")],
					}}
					format="YYYY-MM-DD"
					style={{ height: "42px", marginTop: "13px", width: "100%" }}
				/> */}
        <Tabs
          defaultActiveKey="1"
          style={{ width: "100%", marginTop: "36px" }}
          items={[
            {
              label: <div className={css.tabHeader}>Бүгд</div>,
              key: "1",
              children: (
                <div>
                  {allDates?.reverse().map((q, i) => (
                    <div key={i}>
                      <div className={css.date}>
                        {q.includes("T")
                          ? `${q.split("T")[0]} ${q
                              .split("T")[1]
                              .substring(0, 8)}`
                          : q}
                      </div>
                      {sad
                        ?.filter((e) => e?.data?.date?.split(",")[0] === q)
                        ?.map((r, x) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              margin: "7px 0",
                            }}
                            key={x}
                          >
                            <div>
                              <div className={css.description}>
                                {r?.data?.note}
                              </div>
                              <div className={css.document_id}>
                                захиалгын дугаар: {r?.data?.document_id}
                              </div>
                              <div className={css.time2}>
                                {r?.data?.date?.split(",")[1]}
                              </div>
                            </div>
                            <div
                              key={i}
                              className={
                                r?.type === "out" ? css.outAmount : css.inAmount
                              }
                            >
                              {r.type === "out"
                                ? "-"
                                : r.type === "in"
                                ? "+"
                                : null}
                              {r?.data?.quantity?.toLocaleString()}
                              <div className={css.time2}>
                                Үлдэгдэл: {r?.data?.stock?.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ),
            },
            {
              label: <div className={css.tabHeader}>Орсон</div>,
              key: "2",
              children: (
                <div>
                  {inDates?.reverse().map((q, b) => (
                    <div key={b}>
                      <div className={css.date}>
                        {" "}
                        {q.includes("T")
                          ? `${q.split("T")[0]} ${q
                              .split("T")[1]
                              .substring(0, 8)}`
                          : q}
                      </div>
                      {appctx.selectedWareHouse[selectedProduct?._id]?.in
                        ?.filter((a) => a?.date?.split(",")[0] === q)
                        ?.map((r, m) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            key={m}
                          >
                            <div>
                              <div className={css.description}>{r?.note}</div>
                              <div className={css.document_id}>
                                захиалгын дугаар: {r?.data?.document_id}
                              </div>
                              <div className={css.time2}>
                                {r?.data?.date?.split(",")[1]}
                              </div>
                            </div>
                            <div className={css.inAmount}>
                              +{r?.quantity.toLocaleString()}
                              <div className={css.time2}>
                                Үлдэгдэл: {r?.stock?.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ),
            },
            {
              label: <div className={css.tabHeader}>Гарсан</div>,
              key: "3",
              children: (
                <div>
                  {outDates?.reverse().map((q, k) => (
                    <div key={k}>
                      <div className={css.date}>{q}</div>
                      {appctx.selectedWareHouse[selectedProduct?._id]?.out
                        ?.filter((a) => a?.date?.split(",")[0] === q)
                        ?.map((r, n) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            key={n}
                          >
                            <div>
                              <div className={css.description}>{r?.note}</div>
                              <div className={css.document_id}>
                                захиалгын дугаар: {r?.data?.document_id}
                              </div>
                              <div className={css.time2}>
                                {r?.data?.date?.split(",")[1]}
                              </div>
                            </div>
                            <div className={css.outAmount}>
                              -{r?.quantity?.toLocaleString()}
                              <div className={css.time2}>
                                Үлдэгдэл: {r?.stock?.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </Drawer>
    </div>
  );
  return (
    <div
      className={css.listcontainer}
      style={{ height: "100vh", overflow: "auto" }}
    >
      {content}
    </div>
  );
};

export default List;
