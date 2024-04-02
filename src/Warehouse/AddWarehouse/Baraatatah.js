import React, { useState, useContext, useEffect, useRef } from "react";
import css from "./baraatatah.module.css";
import Button from "../../components/Button/Button";
import closeicon from "../../assets/close.svg";
import CollectionHook from "../../Hooks/CollectionHook";
import myHeaders from "../../components/MyHeader/myHeader";
import { styles } from "./style";
import Suppliers from "../../components/Suppliers/Suppliers";
import ProductReportHook from "../../Hooks/ProductsReportHook";
import OneProduct from "./OneProduct";
import { Modal } from "../../components/common";
import AddProduct from "./addProduct/addProduct";

const Baraatatah = (props) => {
  //alert('baraa tatah')
  const [products, setProducts] = useState([]);
  const [searchvalue, setSearchvalue] = useState(null);
  const [searchsku, setSearchsku] = useState(null);
  const [searchid, setSearchid] = useState(null);
  const [notes, setNotes] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouse, setWarehouse] = useState(null);
  const [supplersearch, setSupplersearch] = useState(null);
  const [toAguulah, setToAguulah] = useState(null);
  const [mainAguulah, setMainAguulah] = useState("");
  const [productids, setProductids] = useState(null);
  const [page, setPage] = useState(1);
  const [mainAguulahProducts, setMainAguulahProducts] = useState([]);
  const [oneAguulah, setOneAguulah] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterPage, setFilterPage] = useState(1);
  // console.log("mainaguulah+++++++", categories);

  const warectx = useContext(CollectionHook);
  const productctx = useContext(ProductReportHook);
  const closeHandler = () => {
    if (props.baraa) {
      warectx.setBaraaTatah(false);
      warectx.setBaraaOrlogo(false);
      warectx.setNewWarehouseOpen(false);
    } else {
      warectx.setNewWarehouseOpen(false);
      warectx.setBaraaOrlogo(false);
      setNotes(null);
      setProducts(null);
    }
  };

  window.addEventListener("scroll", () => {
    updateImage();
  });

  function updateImage() {
    // bgImageEl.style.opacity = 1 - window.pageYOffset / 900;
    // bgImageEl.style.backgroundSize = 160 - window.pageYOffset / 12 + "%";
  }
  useEffect(() => {
    setCategories(productctx.sitedata.categories);
    let controller = new AbortController();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    };

    let url = `https://api2.ebazaar.mn/api/warehouse/get?supplier=${supplersearch}`;
    // let url = `https://api2.ebazaar.mn/api/warehouse/get?supplier=${13873}`;

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setWarehouses(res.data);

        controller = null;
      })
      .catch((error) => {
        console.log("product get error", error);
      });
    return () => controller?.abort();
  }, [supplersearch]);

  useEffect(() => {
    let controller = new AbortController();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    };

    let url = `https://api2.ebazaar.mn/api/warehouse/get?id=${mainAguulah}`;

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log("res house+++++++", res);
        let data = [];
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
          } else {
            data.push(Number(item));
          }
        });
        // console.log("data aguulah", data);
        setProductids(data);
        setOneAguulah(res.data);
      })
      .catch((error) => {
        console.log("product get error", error);
      });
    return () => controller?.abort();
  }, [mainAguulah]);
  useEffect(() => {
    let paged = productids?.filter(
      (e, i) => i >= 50 * page - 50 && i <= 50 * page - 1 && e
    );
    let url = `https://api2.ebazaar.mn/api/products/get1?ids=[${paged}]`;
    // console.log("url , uurl second", url);

    fetch(url, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("res, res", res);
        let data = [];
        // if (res.data) {
        //   res.data?.map((item) => {
        //     data.push({
        //       ...item,
        //       tatahToo: 0,
        //     });
        //   });
        // }
        setMainAguulahProducts(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [productids]);

  useEffect(() => {
    // console.log("productids-------11111111", productids);
    let controller = new AbortController();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    };

    let params = "";
    if (searchvalue !== null) {
      params += `search=${searchvalue}&`;
    }
    if (searchsku !== null) {
      params += `sku=${searchsku}&`;
    }
    if (!searchid !== null) {
      params += `id=${searchid}&`;
    }
    if (supplersearch !== null) {
      params += `supplier=${supplersearch}&`;
    }

    ///// eniig scroll-toi bolgoh
    let url = `https://api2.ebazaar.mn/api/products/get1?page=${filterPage}&limit=10&${params}`;

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        let data = [];
        res.data.map((item) => {
          data.push({
            ...item,
            tatahToo: 0,
          });
        });
        setProducts([...products, ...data]);
        controller = null;
      })
      .catch((error) => {
        console.log("product get error", error);
      });
    return () => controller?.abort();
  }, [searchid, searchsku, searchvalue, supplersearch, filterPage]);
  useEffect(() => {
    setFilterPage(1);
    setProducts([]);
  }, [searchid, searchsku, searchvalue, supplersearch]);
  const CancelHandler = () => {};
  const ApproveHandler = () => {
    if (notes === null) {
      alert("Та татан авалтын тэмдэглэлээ хийнэ үү.");
      return;
    }
    if (props.baraa === "tatah" && mainAguulah === toAguulah) {
      alert("Та хүргэх агуулахаа өөр агуулах сонгоно уу");
      return;
    }

    if (props.baraa === "tatah" && toAguulah === null) {
      alert("Та хүргэх агуулахаа агуулахаа сонгоно уу---");
      return;
    }
    if (props.baraa === "oruulah" && toAguulah === null) {
      alert("Та хүргэх агуулахаа агуулахаа сонгоно уу+++");
      return;
    }

    let raw = "";
    let size = 0;
    let productToo = false;
    let data = [];
    if (props.baraa === "oruulah") {
      products.map((item) => {
        if (item.tatahToo !== 0) {
          data.push(item);
        }
      });
      let product = {};
      data.forEach((item) => {
        product[item._id] = Number(item.tatahToo);
      });
      Object.size = function (obj) {
        let size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      size = Object.size(product);

      raw = JSON.stringify({
        to: toAguulah,
        note: notes,
        date: new Date(),
        products: product,
      });
    }

    if (props.baraa === "tatah") {
      mainAguulahProducts.map((item) => {
        if (item.tatahToo !== 0) {
          data.push(item);
        }
      });
      let product = {};
      data.forEach((item) => {
        product[item._id] = Number(item.tatahToo);
        if (oneAguulah[0][`${item._id}`].stock[0] < Number(item.tatahToo)) {
          productToo = true;
        }
      });
      Object.size = function (obj) {
        let size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      size = Object.size(product);

      raw = JSON.stringify({
        from: mainAguulah,
        to: toAguulah,
        note: notes,
        date: new Date(),
        products: product,
      });
    }
    if (props.baraa === "shuudorulah") {
      let data = [];
      products.map((item) => {
        if (item.tatahToo !== 0) {
          data.push(item);
        }
      });
      let product = {};
      data.forEach((item) => {
        product[item._id] = Number(item.tatahToo);
      });
      Object.size = function (obj) {
        let size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      size = Object.size(product);

      raw = JSON.stringify({
        to: warehouse,
        note: notes,
        date: new Date(),
        products: product,
      });
    }

    if ((props.baraa === "tatah" || props.baraa === "oruulah") && size === 0) {
      alert("Та татан авалтын барааныхаа тоог хийнэ үү");
      return;
    }
    if (productToo) {
      alert(
        "Та татан авах барааны тоогоо шалгана уу, үндсэн агуулахын үлдэгдэлээс татан авах тоо их байна."
      );
      return;
    }
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };
    fetch(`https://api2.ebazaar.mn/api/warehouse/transfer`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          let aa = JSON.parse(requestOptions.body);

          let product_line = [];

          Object.entries(aa.products).forEach((entry) => {
            const [key, value] = entry;

            product_line.push({
              product_id: Number(key),
              quantity: value,
            });
          });

          let rawdata = {
            document_id: Math.floor(Math.random() * 10000),
            warehouse: aa.to,
            product_line: product_line,
          };

          fetch(`https://api2.ebazaar.mn/api/inventory/insert/new`, {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(rawdata),
          })
            .then((res) => {
              console.log("orlogiin tuuh ruu nemlee", res);
            })
            .catch((error) => {
              console.log("orlogiin tuuh aldaa garlaa");
            });
          setNotes(null);
          setProducts(null);
          size = null;
          warectx.setBaraaOrlogo(false);
          warectx.setNewWarehouseOpen(false);
          warectx.setBaraaTatah(false);
          setMainAguulahProducts([]);
          setMainAguulah("");
          setToAguulah(null);
          setNotes(null);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // tur haav

  // const checkedProductsFilter = () => {
  //   let checkedProductsCopy = [...checkedProducts];

  //   if (searchid) {
  //     checkedProductsCopy = checkedProductsCopy.filter((product) =>
  //       product._id.toString().includes(searchid.toString())
  //     );
  //   }

  //   if (searchsku) {
  //     checkedProductsCopy = checkedProductsCopy.filter((product) =>
  //       product.sku.toString().includes(searchsku.toString())
  //     );
  //   }

  //   if (searchsku) {
  //     checkedProductsCopy = checkedProductsCopy.filter((product) =>
  //       product.name.toLowerCase().includes(searchvalue.toLowerCase())
  //     );
  //   }

  //   setFilteredProducts(checkedProductsCopy);
  // };

  // useEffect(() => {
  //   setFilteredProducts(checkedProducts);
  // }, [checkedProducts]);

  // useEffect(() => {
  //   checkedProductsFilter();
  // }, [searchvalue, searchsku, searchid]);

  return (
    <div className={css.container}>
      <div className={css.iconcontainer}>
        <img
          src={closeicon}
          alt="close icon"
          onClick={closeHandler}
          className={css.closebtn}
        />
      </div>
      <div className={css.enebol}>
        <span className={css.headerwrapper}>Бараа татан авалт</span>
        <div className={css.headerfooterwrapper}>
          {(props.baraa === "oruulah" || props.baraa === "shuudorulah") && (
            <div className={css.suppliercontainer}>
              <Suppliers setSuppValue={setSupplersearch} />
            </div>
          )}

          {props.baraa === "oruulah" && (
            <div className={css.supplierwrapper}>
              <span>Орлогын агуулах</span>
              <select
                value={toAguulah}
                onChange={(e) => {
                  setToAguulah(e.target.value);
                }}
              >
                <option>--Агуулах--</option>
                {warehouses?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {props.baraa === "tatah" && (
            <div className={css.suppliercontainer}>
              <Suppliers setSuppValue={setSupplersearch} />
            </div>
          )}
          {props.baraa === "tatah" && (
            <div className={css.supplierwrapper}>
              <span>Үндсэн агуулах</span>
              <select
                value={mainAguulah}
                onChange={(e) => {
                  setMainAguulah(e.target.value);
                }}
              >
                <option>--Агуулах--</option>
                {warehouses?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {props.baraa === "shuudorulah" && (
            <div className={css.supplierwrapper}>
              <span>Агуулах сонголт</span>
              <select
                value={warehouse}
                onChange={(e) => {
                  setWarehouse(e.target.value);
                }}
              >
                <option>--Агуулах--</option>
                {warehouses?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {props.baraa === "tatah" && (
            <div className={css.supplierwrapper}>
              <span>Хүргэх агуулах</span>
              <select
                value={toAguulah}
                onChange={(e) => {
                  setToAguulah(e.target.value);
                }}
              >
                <option>--Хүргэх агуулах--</option>
                {warehouses?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <div className={css.subheader}>
            <span>Тэмдэглэл</span>
            <input
              placeholder="Татан авалтын тэмдэглэл"
              className={css.headerwrapperinput}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className={css.subheader}>
            <button
              className={css.addProduct}
              onClick={() => {
                setSearchsku("");
                setSearchvalue("");
                setSearchid("");
                setIsModal(true);
              }}
            >
              Бараа нэмэх
            </button>
          </div>
        </div>
        <div
          style={{
            marginTop: "16px",
            borderRadius: "12px",
          }}
        >
          <div className={css.bodywrapper}>
            {props.baraa === "tatah" && (
              <div className={css.header}>
                <div
                  className={css.oneheader}
                  style={{ ...styles.checkboxcontainer }}
                >
                  <span>IDS</span>
                  <input
                    placeholder="Хайх"
                    value={searchid}
                    onChange={(e) => {
                      setSearchid(e.target.value);
                    }}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Бүтээгдэхүүний нэр</span>
                  <input
                    placeholder="Хайх"
                    value={searchvalue}
                    onChange={(e) => setSearchvalue(e.target.value)}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Бүтээгдэхүүний sku</span>
                  <input
                    placeholder="Хайх"
                    value={searchsku}
                    onChange={(e) => setSearchsku(e.target.value)}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Бүтээгдэхүүний ангилал</span>
                  <input
                    placeholder="Хайх"
                    value={searchsku}
                    onChange={(e) => setSearchsku(e.target.value)}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Зураг</span>
                  <input placeholder="Хайх" disabled />
                </div>

                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Агуулахын үлдэгдэл</span>
                  <input placeholder="Хайх" disabled />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Татах тоо</span>
                  <input placeholder="Хайх" disabled />
                </div>
              </div>
            )}
            {props.baraa === "shuudorulah" && (
              <div className={css.header}>
                <div
                  className={css.oneheader}
                  style={{ ...styles.checkboxcontainer }}
                >
                  <span>ID</span>
                  <input
                    placeholder="Хайх"
                    value={searchid}
                    onChange={(e) => setSearchid(e.target.value)}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Бүтээгдэхүүний нэр</span>
                  <input
                    placeholder="Хайх"
                    value={searchvalue}
                    onChange={(e) => setSearchvalue(e.target.value)}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Бүтээгдэхүүний sku</span>
                  <input
                    placeholder="Хайх"
                    value={searchsku}
                    onChange={(e) => setSearchsku(e.target.value)}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Зураг</span>
                  <input placeholder="Хайх" disabled />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Агуулахын үлдэгдэл</span>
                  <input placeholder="Хайх" disabled />
                </div>
                <div className={css.oneheader}>
                  <span>Татах тоо13</span>
                  <input placeholder="Хайх" disabled />
                </div>
              </div>
            )}
            {props.baraa === "oruulah" && (
              <div className={css.header}>
                <div
                  className={css.oneheader}
                  style={{ ...styles.checkboxcontainer }}
                >
                  <span>ID</span>
                  <input
                    placeholder="Хайх"
                    value={searchid}
                    onChange={(e) => setSearchid(e.target.value)}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Бүтээгдэхүүний нэр</span>
                  <input
                    placeholder="Хайх"
                    value={searchvalue}
                    onChange={(e) => setSearchvalue(e.target.value)}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Бүтээгдэхүүний sku</span>
                  <input
                    placeholder="Хайх"
                    value={searchsku}
                    onChange={(e) => setSearchsku(e.target.value)}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Зураг</span>
                  <input placeholder="Хайх" disabled />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.supplierContainer,
                  }}
                >
                  <span>Агуулахын үлдэгдэл</span>
                  <input placeholder="Хайх" disabled />
                </div>
                <div className={css.oneheader}>
                  <span>Татах то1</span>
                  <input placeholder="Хайх" disabled />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.inputContainer,
                  }}
                >
                  <span>Үйлдвэрлэсэн огноо</span>
                  <input placeholder="Хайх" disabled />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.inputContainer,
                  }}
                >
                  <span>Хугацаа дуусах огноо</span>
                  <input placeholder="Хайх" disabled />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    ...styles.inputContainer,
                  }}
                >
                  <span>Сери дугаар</span>
                  <input placeholder="Хайх" disabled />
                </div>
              </div>
            )}
            <div className={css.productwrapper}>
              {props.baraa === "tatah" && mainAguulahProducts
                ? mainAguulahProducts.map((item, index) => {
                    // console.log("item", item);
                    return (
                      <div className={css.productcontainer} key={index}>
                        <div
                          style={{
                            ...styles.checkboxcontainer,
                            display: "flex",
                            alignItems: "center",
                          }}
                          // className={css.productname}
                        >
                          <input
                            type="checkbox"
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <span>{item._id}</span>
                        </div>
                        <div
                          style={{
                            ...styles.supplierContainer,
                          }}
                          className={css.productname}
                        >
                          <span>{item.name}</span>
                        </div>
                        <div
                          style={{
                            ...styles.supplierContainer,
                          }}
                          className={css.productname}
                        >
                          <span>{item.sku}</span>
                        </div>
                        <div
                          style={{
                            ...styles.supplierContainer,
                          }}
                          className={css.productname}
                        >
                          <span>{item.category_id}</span>
                          <span>
                            {item.category_id !== 0 && categories
                              ? categories[`${Number(item.category_id)}`]?.name
                              : item.category_id}
                          </span>
                        </div>
                        <div
                          className={css.imagewrapper}
                          style={{
                            ...styles.supplierContainer,
                          }}
                        >
                          <img
                            src={
                              item.image
                                ? item.image[0]
                                : "https://ebazaar.mn/media/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg"
                            }
                            alt="product image"
                          />
                        </div>
                        <div
                          style={{
                            ...styles.supplierContainer,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className={css.productname}
                        >
                          <span>
                            {oneAguulah[0][`${item._id}`]
                              ? oneAguulah[0][`${item._id}`].stock[0]
                              : ""}
                          </span>
                        </div>
                        <div
                          style={{
                            ...styles.supplierContainer,
                          }}
                          className={css.productname}
                        >
                          <input
                            onChange={(e) => {
                              let aaa = mainAguulahProducts;
                              aaa.find((x) => x._id === item._id).tatahToo =
                                e.target.value;
                              setMainAguulahProducts(aaa);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                : null}
              {props.baraa == "oruulah" && checkedProducts.length ? (
                checkedProducts.map((item, index) => {
                  return (
                    <OneProduct
                      item={item}
                      key={index}
                      products={products}
                      setProducts={setProducts}
                    />
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  Бараагаа сонгоно уу!
                </div>
              )}
              {props.baraa == "shuudorulah" && products
                ? products.map((item, index) => {
                    return (
                      <div className={css.productcontainer} key={index}>
                        <div
                          style={{
                            ...styles.checkboxcontainer,
                            display: "flex",
                            alignItems: "center",
                          }}
                          className={css.productname}
                        >
                          <input
                            type="checkbox"
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <span>{item._id}</span>
                        </div>
                        <div
                          style={{
                            ...styles.supplierContainer,
                          }}
                          className={css.productname}
                        >
                          <span>{item.name}</span>
                        </div>
                        <div
                          style={{
                            ...styles.supplierContainer,
                          }}
                          className={css.productname}
                        >
                          <span>{item.sku}</span>
                        </div>
                        <div
                          className={css.imagewrapper}
                          style={{
                            ...styles.supplierContainer,
                          }}
                        >
                          <img
                            src={
                              item.image
                                ? item.image[0]
                                : "https://ebazaar.mn/media/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg"
                            }
                            alt="product image"
                          />
                        </div>
                        <div
                          style={{
                            ...styles.supplierContainer,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className={css.productname}
                        >
                          <span>{item.stock}</span>
                        </div>

                        <div
                          style={{
                            ...styles.supplierContainer,
                          }}
                          className={css.productname}
                        >
                          <input
                            onChange={(e) => {
                              let aaa = products;
                              aaa.find((x) => x._id === item._id).tatahToo =
                                e.target.value;
                              setProducts(aaa);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className={css.btncontainer}>
            <Button className={css.cancelbtn} onClick={closeHandler}>
              Цуцлах
            </Button>
            <Button className={css.approvebtn} onClick={ApproveHandler}>
              Хадгалах
            </Button>
          </div>
        </div>
      </div>
      <Modal
        closeHandler={() => setIsModal(false)}
        show={isModal}
        width={"fitContent"}
        height={"70%"}
      >
        <AddProduct
          products={products}
          setSearchid={setSearchid}
          setSearchvalue={setSearchvalue}
          setSearchsku={setSearchsku}
          checkedProducts={checkedProducts}
          setCheckedProducts={setCheckedProducts}
          setIsModal={setIsModal}
          filterPage={filterPage}
          setFilterPage={setFilterPage}
        />
      </Modal>
    </div>
  );
};

export default Baraatatah;
