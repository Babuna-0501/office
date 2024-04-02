import React, { useState, useContext } from "react";
import Price from "./Price";
import Info from "./Info";
import Media from "./Media";
import css from "./product.module.css";
import { Popconfirm, message, Drawer } from "antd";
import deleteIcon from "../assets/delete_red_small.svg";
import myHeaders from "../components/MyHeader/myHeader";
import { styles } from "./style";
import ProductReportHook from "../Hooks/ProductsReportHook";
import Merchant from "./Merchants/Merchants";
import { useEffect } from "react";

const Product = (props) => {
  let [product, setProduct] = useState(props?.data);
  let [warehouse, setWarehouse] = useState(props?.warehouseData);

  let [productVisibility, setProductVisibility] = useState(
    product?.locations["62f4aabe45a4e22552a3969f"].is_active.channel["1"]
  );
  const [butarhai, setButarhai] = useState(product?.product_measure);
  let [price, setPrice] = useState(null); // hasna
  let [info, setInfo] = useState(null);
  let [media, setMedia] = useState(null);
  const [showtrue, setShowtrue] = useState(false);
  const [merchantOpen, setMerchantOpen] = useState(false);
  const [selectedProd, setSelectedProd] = useState([]);
  const [productGroup, setProductGroup] = useState([]);

  const safeDecent = props.safeDecent.sort(
    (a, b) => a.merchantId - b.merchantId
  );
  const getStock = ({ data }) => {
    let content = (
      <div
        style={{
          background: "",
          width: "fitContent",
          height: "24px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          color: "black",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        -
      </div>
    );
    data.products.map((product) => {
      if (product?.bar_code === props.data?.bar_code) {
        content = (
          <div
            style={{
              display: "inline-block",
              background:
                product.stock <= product.safe
                  ? product.stock <= product.decent
                    ? "#EB5E43"
                    : "orange"
                  : "",
              height: product.stock <= product.safe ? "24px" : "",
              borderRadius: product.stock <= product.safe ? "8px" : "",
              color: product.stock <= product.safe ? "white" : "",
              fontSize: product.stock <= product.safe ? "12px" : "",
              fontWeight: product.stock <= product.safe ? 600 : "",
              padding: "3px 10px 0px 10px",
            }}
          >
            {product.stock}
          </div>
        );
      }
    });
    return content;
  };

  const pathname = window.location.pathname;
  ////// CONTEXT holbogdohgui bn
  const prodctx = useContext(ProductReportHook);
  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedProd((prevSelected) => [...prevSelected, item]);
    } else {
      setSelectedProd((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  useEffect(() => {
    for (let i = 1; i <= props.business_types.length; i++) {
      if (
        props.data.locations["62f4aabe45a4e22552a3969f"].is_active.channel[
          i
        ] === 1
      ) {
        setShowtrue(true);
      }
    }
  }, [props.data]);

  let image = null;
  if (product && product.image) {
    image = product?.image[0] && product.image[0];
  } else {
    image = "https://ebazaar.mn/icon/photo-add.svg";
  }

  const permission = Object.values(JSON.parse(props?.userData?.permission))[0];

  const setVisibility = () => {
    let aa = {};
    props.business_types.forEach((item, index) => {
      aa[`${item.business_type_id}`] = productVisibility === 0 ? 1 : 0;
    });

    let rawNew = {
      product_id: product._id,
      supplier_id: product.supplier_id,
      "locations.62f4aabe45a4e22552a3969f.is_active.channel": aa,
    };
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(rawNew),
      redirect: "follow",
    };
    let urlNew = `https://api2.ebazaar.mn/api/product/update1`;
    fetch(urlNew, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 200) {
          setProductVisibility(productVisibility === 0 ? 1 : 0);
          setShowtrue(!showtrue);
        } else {
          alert("Алдаа гарлаа. Please try again.");
        }
      });
  };
  const Butarhai = () => {
    let rawNew = {
      productId: product._id,
      measure: product.product_measure === true ? false : true,
    };
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(rawNew),
      redirect: "follow",
    };
    let urlNew = `https://api2.ebazaar.mn/api/product/measure`;
    fetch(urlNew, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("butarhai", result);
        if (result.code === 200) {
          let aa = product;
          aa.product_measure = aa.product_measure === true ? false : true;
          setButarhai(aa.product_measure);
          setProduct(aa);
        } else {
          alert("Алдаа гарлаа. Please try again.");
        }
      });
  };

  const sync = () => {
    let rawNew = {
      product_id: product._id,
    };
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(rawNew),
      redirect: "follow",
    };
    let urlNew = `https://api2.ebazaar.mn/api/pickpack/createproduct`;
    fetch(urlNew, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 200) {
          // setProductVisibility(productVisibility === 0 ? 1 : 0);
          alert("Амжилттай");
          props.setDummy2(props.dummy2 + 1);
          sss = true;
        } else {
          alert("Алдаа гарлаа.");
        }
      });
  };

  const SaveHandler = () => {
    let aa = JSON.parse(localStorage.getItem("prodids"));
    if (aa.length !== 0 && aa.includes(Number(product._id))) {
      let bb = aa.filter((x) => x !== product._id);
      // setMerchantIDS(bb);
      localStorage.setItem("prodids", JSON.stringify(bb));
    } else {
      aa.push(product._id);
      // setMerchantIDS(aa);
      localStorage.setItem("prodids", JSON.stringify(aa));
    }
  };

  let supplierName = "";
  let sss = product?.thirdparty_data?.pickpack?.sync;

  props.suppliers.map((s) => {
    if (s.id === product.supplier_id) {
      supplierName = s.name;
    }
  });
  let productCategory = "";
  if (props.categories && product.category_id) {
    props.categories.map((c) => {
      if (c.id === product.category_id) {
        productCategory = c.name;
      }
    });
  }

  let brand = "";
  if (parseInt(product.brand, 10) > 0) {
    props.brands?.map((brand) => {
      if (brand.BrandID === product.brand) {
        brand = brand.BrandName;
      }
    });
  }

  const selectedProductsHandler = (c, id, product) => {
    // console.log("props product", props.selected);

    if (c === true) {
      props?.setSelected((prev) => [...prev, id]);
      props?.setSelectedProduct(product);
    } else {
      props?.setSelected((prev) => prev.filter((a) => a !== id));
    }
  };
  const deleteHandler = (product) => {
    // console.log("clicked");
    //  var raw = JSON.stringify({
    // 		productId: product._id,
    // 	});
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };
    // console.log("delete requestOptions", requestOptions);
    fetch(
      `https://api2.ebazaar.mn/product/remove?productId=${product._id}`,
      requestOptions
    )
      .then((res) => {
        // console.log("product delete res", res);
        if (res.status === 200) {
          message.success("Амжилттай устгалаа");
          props.appctx.setPage(["products"]);
        } else {
          message.error("Алдаа гарлаа");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const [type, setType] = useState();
  const [selectedZone, setSelectedZone] = useState();
  const [defaultPrice, setDefaultPrice] = useState();

  //   const butarhaiHandler = () => {
  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: JSON.stringify({
  //         productId: props.data._id,
  //         measure: true,
  //       }),
  //       redirect: "follow",
  //     };
  //     let urlNew = `https://api2.ebazaar.mn/api/product/measure`;
  //     console.log("requestOptions", requestOptions);
  //     fetch(urlNew)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         if (result.code === 200) {
  //           alert("Амжилттай Бутархайгаар сагслалаа.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("butarhaigaar sagslah", error);
  //       });
  //   };

  useEffect(() => {
    setProduct(props?.data);
  }, [props?.data]);

  useEffect(() => {
    setWarehouse(props?.warehouseData);
  }, [props?.warehouseData]);

  const findWarehouseNameByProductId = (productId) => {
    if (warehouse && warehouse.data) {
      const warehouseItem = warehouse.data.find((item) =>
        item.products.some((product) => product._id === productId)
      );
      return warehouseItem ? warehouseItem.name : null;
    }
    return null;
  };

  const Tradeshops = [
    { name: "Tradeshop 1" },
    { name: "Tradeshop 2" },
    { name: "Tradeshop 3" },
    { name: "Tradeshop 4" },
    { name: "Tradeshop 5" },
  ];

  let color =
    product.stock < product.safe_stock
      ? "#ffa39e"
      : product.stock < product.safe_stock * 1.3
      ? "#ffe58f"
      : props?.selected?.includes(product._id)
      ? "#F1F1FA"
      : "#fff";

  return (
    <div>
      <div
        className="row"
        style={{
          backgroundColor: color,
        }}
      >
        <div style={{ ...styles.checkboxcontainer }} className="checker">
          <input
            type="checkbox"
            id={product._id}
            className={css.cheker}
            onChange={(c) => {
              selectedProductsHandler(c.target.checked, product._id, product);
            }}
            checked={props?.selected?.includes(product._id)}
          />
          <span
            onClick={() => permission.product.update && setInfo(!info)}
            className="recordid"
            style={{
              color: "#706AC5",
              textDecoration: "underline",
              width: "43px",
              overflow: "hidden",
            }}
          >
            {product._id}
          </span>
        </div>
        <div style={{ ...styles.logoContainer }}>
          <span onClick={() => permission.product.update && setVisibility()}>
            {/* {productVisibility === 1 ? (
              <img src="https://admin.ebazaar.mn/media/on.svg" alt="" />
            ) : (
              <img src="https://admin.ebazaar.mn/media/off.svg" alt="" />
            )} */}
            {showtrue === true ? (
              <img src="https://admin.ebazaar.mn/media/on.svg" alt="" />
            ) : (
              <img src="https://admin.ebazaar.mn/media/off.svg" alt="" />
            )}
          </span>
        </div>
        <div
          style={{
            width: "160px",
            display: props.userData.company_id === "|1|" ? "block" : "none",
          }}
        >
          {supplierName}
        </div>
        <div style={{ width: "80px" }} onClick={() => setMedia(true)}>
          <img
            src={
              image && image !== "https://ebazaar.mn/icon/photo-add.svg"
                ? image.replace("original", "original")
                : image
            }
            alt="zurag"
            className="product-image"
          />
        </div>
        <div style={{ width: "200px" }}>{product.name}</div>
        <div
          style={{
            width: "100px",
            display:
              props.userData.company_id === "|13884|" ||
              props.userData.company_id === "|1|"
                ? "block"
                : "none",
          }}
        >
          {product?.vendor}
        </div>
        {/* <div style={{ width: "80px" }}>
					{product.locations["62f4aabe45a4e22552a3969f"].priority.channel["1"]}
				</div> */}

        {/* Display product information */}
        {product && (
          <div style={{ width: "120px", marginLeft: "1rem" }}>
            {product._id && (
              <div>
                <p>{findWarehouseNameByProductId(product._id)}</p>
              </div>
            )}
          </div>
        )}

        <div style={{ width: "120px" }}>{productCategory}</div>
        {pathname !== "/oresh" ? (
          <div style={{ width: "240px" }}>
            {product.description
              ? product.description.slice(0, 60).concat(" ...")
              : product.description}
          </div>
        ) : (
          <div style={{ width: "120px" }}>
            {props.coSuppliers.map((coSupplier) =>
              coSupplier.supplierId == props.data.supplier_id
                ? coSupplier.supplierName
                : ""
            )}
          </div>
        )}
        {/* {product.stock > 0 && (
          <div style={{ width: "120px" }}>
            {product.stock.toLocaleString()}ш
          </div>
        )} */}
        {pathname === "/oresh" ? (
          safeDecent.map((e) => (
            <div
              style={{
                width: "120px",
                display: "flex",
                justifyContent: "center",
                alignItems: product.stock <= product.safe ? "center" : "",
              }}
            >
              {getStock({ data: e })}
            </div>
          ))
        ) : (
          <>
            <div style={{ width: "120px" }}>
              <div
                style={{
                  background: product.stock <= 0 ? "#EB5E43" : "",
                  width: product.stock <= 0 ? "41px" : "120px",
                  height: product.stock <= 0 ? "24px" : "",
                  justifyContent: product.stock <= 0 ? "center" : "",
                  display: product.stock <= 0 ? "flex" : "",
                  alignItems: product.stock <= 0 ? "center" : "",
                  borderRadius: product.stock <= 0 ? "8px" : "",
                  color: product.stock <= 0 ? "white" : "",
                  fontSize: product.stock <= 0 ? "12px" : "",
                  fontWeight: product.stock <= 0 ? 600 : "",
                }}
              >
                {product?.stock?.toLocaleString()}ш
              </div>
            </div>
          </>
        )}
        {props.userData.company_id === "|1|" && pathname !== "/oresh" && (
          <>
            <div style={{ width: "80px" }}>
              {product?.proper_stock?.toLocaleString()}
            </div>
            <div style={{ width: "80px" }}>
              {product?.safe_stock?.toLocaleString()}
            </div>
          </>
        )}
        {props.userData.company_id === "|1|" && (
          <>
            <div style={{ width: "80px" }}>
              {product?.minimum_order_quantity?.toLocaleString()}
            </div>
            <div style={{ width: "80px" }}>
              {product?.supplier_minimum_order_amount?.toLocaleString()}
            </div>
            <div style={{ width: "80px", display: "flex" }}>
              {product?.pick_date?.join(",")}
            </div>
          </>
        )}
        <div style={{ width: "120px" }}>{product?.bar_code}</div>
        {/* <div style={{ width: "120px" }}>{brand}</div> */}
        <div style={{ width: "120px" }}>{product.sku}</div>
        {/* <div style={{ width: "120px" }}>
          <span onClick={() => permission.product.update && setPrice(!price)}>
            {product.locations["62f4aabe45a4e22552a3969f"]?.price?.tradeshop?.[
              "6249"
            ] ||
              product.locations["62f4aabe45a4e22552a3969f"]?.price?.channel[
                "1"
              ]}
            ₮
          </span>
        </div> */}
        <div style={{ width: "120px" }}>
          <span onClick={() => permission.product.update && setPrice(!price)}>
            {product.locations["62f4aabe45a4e22552a3969f"]?.price?.channel["1"]}₮
          </span>
        </div>
/        {pathname !== "/oresh" ? (
          <>
            <div style={{ width: "100px" }}>
              <span>
                {
                  product.locations["62f4aabe45a4e22552a3969f"].in_case.channel[
                    "1"
                  ]
                }
              </span>
            </div>
            <div style={{ width: "100px" }}>
              <span>
                {product.city_tax === 1 ? (
                  <img
                    src="https://admin.ebazaar.mn/media/on.svg"
                    alt="small map"
                  />
                ) : (
                  <img
                    src="https://admin.ebazaar.mn/media/off.svg"
                    alt="small map"
                  />
                )}
              </span>
            </div>
            {/* <div style={{ width: "120px" }}>
					<span></span>
				</div> */}

            <div style={{ width: "100px" }}>
              {/* <span className={css.butarhai}>Тийм</span> */}
              <span onClick={() => permission.product.update && Butarhai()}>
                {butarhai === true ? (
                  <img
                    src="https://admin.ebazaar.mn/media/on.svg"
                    alt="small map"
                  />
                ) : (
                  <img
                    src="https://admin.ebazaar.mn/media/off.svg"
                    alt="small map"
                  />
                )}
              </span>
            </div>
          </>
        ) : null}
        {props.userData.company_id === "|1|" && (
          <div style={{ width: "80px" }}>
            {product.supplier_id === 13884 && (
              <span>
                {sss === false ? (
                  <button onClick={() => permission.pickpack.update && sync()}>
                    sync хийх
                  </button>
                ) : (
                  <div
                    style={{
                      width: "58px",
                      height: "23px",
                      backgroundColor: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #4d4d4d",
                    }}
                  >
                    Pickpack
                  </div>
                )}
              </span>
            )}
          </div>
        )}
        {props.userData.company_id === "|1|" && (
          <div
            style={{
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Popconfirm
              placement="left"
              title="Та энэ бүтээгдхүүнийг устгахдаа итгэлтэй байна уу?"
              onConfirm={() => deleteHandler(product)}
              okText="Тийм"
              cancelText="Үгүй"
            >
              <img src={deleteIcon} style={{ marginTop: "6px" }} />
            </Popconfirm>
          </div>
        )}
        <div
          style={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#2AB674",
            fontSize: "10px",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "6px",
            lineHeight: "0.9",
            textAlign: "center",
          }}
          onClick={() => {
            setMerchantOpen(true);
          }}
        >
          Дэлгүүр тохируулах
        </div>
      </div>
      {merchantOpen ? (
        <Merchant
          setMerchantOpen={setMerchantOpen}
          productids={props.selected}
        />
      ) : null}
      {price ? (
        <Price
          setPrice={setPrice}
          product={product}
          setProduct={setProduct}
          userData={props.userData}
        />
      ) : null}
      {info ? (
        <Info
          setInfo={setInfo}
          product={product}
          setProduct={setProduct}
          categories={props.categories}
          appctx={props.appctx}
          setPrice={setPrice}
          selected={props.selected}
          productGroup={props.productGroup}
        />
      ) : null}
      {media ? (
        <Media setMedia={setMedia} product={product} setProduct={setProduct} />
      ) : null}
      <Drawer
        title={<div className={css.title}>Бүтээгдэхүүний үнийн тохиргоо</div>}
        placement="right"
        onClose={onClose}
        open={open}
        width="750px"
      >
        <div style={{ display: "flex" }}>
          <div className={css.w200}>
            <div className={css.title}>Бүсчлэл</div>
            <div className={css.zonesss}>
              {props.zones?.map((e, i) => (
                <div
                  className={`${
                    e._id === selectedZone ? css.selectedZone : css.zones
                  }`}
                  key={i}
                  onClick={() => {
                    setSelectedZone(e._id);
                  }}
                >
                  <div key={e._id}>{e.name}</div>
                </div>
              ))}
              {props.zones?.length === 0 && (
                <div className={css.nozone}>Та бүсчлэлээ зурна уу</div>
              )}
            </div>
            <button
              className={css.plus}
              onClick={() => {
                setOpen(false);
                props.app.fn.route(["zones"]);
              }}
            >
              Бүсчлэл зурах
            </button>
          </div>
          {selectedZone && (
            <div className={css.w200}>
              <div className={css.title}>Төрөл</div>
              <div className={css.radios}>
                <div className={css.radio}>
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={type === 1}
                    onChange={() => setType(1)}
                  />
                  Сувагаар
                </div>
                <div className={css.radio}>
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={type === 2}
                    onChange={() => setType(2)}
                  />
                  Tradeshop
                </div>
              </div>
            </div>
          )}
          {type && (
            <div className={css.w250}>
              <div className={css.title}>Үнэ</div>
              <div className={css.nameinp}>
                <div className={`${css.w150} ${css.defaultPrice}`}>
                  Үндсэн үнэ
                </div>
                <input
                  className={`${css.inp} ${css.defaultInput}`}
                  onChange={(e) => {
                    setDefaultPrice(e.target.value);
                  }}
                />
              </div>
              {type === 1 ? (
                <div className={css.inps}>
                  {props?.business_types?.map((e, i) => (
                    <div className={css.nameinp} key={i}>
                      <div className={css.w150}>{e.business_type_name}</div>
                      <input className={css.inp} defaultValue={defaultPrice} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={css.inps}>
                  {Tradeshops.map((e, i) => (
                    <div key={i} className={css.nameinp}>
                      <div className={css.w150}>{e.name}</div>
                      <input className={css.inp} defaultValue={defaultPrice} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={css.savediv}>
          <button className={css.savebtn}>Хадгалах</button>
        </div>
      </Drawer>
    </div>
  );
};

export default Product;
