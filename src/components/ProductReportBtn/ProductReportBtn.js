import React, { useContext, useEffect, useState } from "react";
import upload from "../../assets/Upload_white.svg";
import refreshIcon from "../../assets/refresh.svg";
import settingIcon from "../../assets/Setting_darkgray.svg";
import PaperIcon from "../../assets/Paper.svg";
import PriceSetting from "../../assets/Price Setting 2.png";
import css from "./productreportbtn.module.css";
import ProductsReportHook from "../../Hooks/ProductsReportHook";
import ProductHook from "../../Hooks/ProductHook";
import { Modal } from "antd";
import ShopPriceRegister from "../../Products/ShopPriceRegister/ShopPriceRegister";
import { Button } from "../common";

const ProductReportBtn = (props) => {
  const productsCtx = useContext(ProductsReportHook);
  const prodCtx = useContext(ProductHook);
  const settingHandler = () => {
    prodCtx.setSettingView(true);
  };

  const [toi, setToi] = useState(0);
  const [soi, setSoi] = useState(0);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({});
  const [companyId, setUserCompanyId] = useState(
    props.userData.company_id === "|1|"
      ? 13884
      : parseInt(props.userData.company_id.replaceAll("|", ""))
  );

  const permission = Object.values(JSON.parse(props.userData.permission))[0];

  const getProducts = () => {
    setOpen(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://api2.ebazaar.mn/api/products/get1?supplier=${companyId}`,
      requestOptions
    )
      .then((r) => r.json())
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  useEffect(() => {
    if (open) {
      getProducts();
    }
  }, [companyId]);

  const arraymove = (arr, fromIndex, toIndex) => {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    setProducts([...arr]);
  };

  const newArray = products.map((e, i) => ({
    id: e._id,
    priority: newOrder[`${e._id}`] || products.length - i,
    supplier: parseInt(companyId),
  }));

  const save = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(newArray);
    // newArray
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`https://api2.ebazaar.mn/product/priority/set`, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert("Амжилттай хадгалагдлаа");
        } else {
          alert("Алдаа гарлаа, Дахин оролдоно уу");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        gap: 10,
      }}
    >
      {productsCtx?.selectedProductsId?.length !== 0 && (
        <>
          {prodCtx?.priceTerm ? (
            <>
              <div
                className={`${css.setting}`}
                onClick={() => prodCtx?.setPriceTerm(false)}
              >
                <span>Цуцлах</span>
              </div>
              {/* <div className={css.firstBtn}>
								<span>Хадгалах</span>
							</div> */}
            </>
          ) : (
            <>
              {/* <div
                className={css.firstBtn}
                onClick={() => {
                  prodCtx.setShopPrice(true);
                }}
              >
                <img src={upload} alt="upload" />
                <span>Сувгийн үнэ</span>
              </div> */}

              <div>
                <Button
                  onClick={() => {
                    prodCtx.setCreateProd(true);
                  }}
                  variant="primary"
                  size="medium"
                  icon
                >
                  <img src={upload} alt="upload" /> Нэг бүтээгдэхүүн бүртгэх
                </Button>
              </div>

              <Button
                onClick={() => {
                  prodCtx.setShopPrice(true);
                }}
                variant="primary"
                size="medium"
                icon
              >
                <img src={upload} alt="upload" /> Сувгийн үнэ
              </Button>
              {permission?.product?.update && (
                <Button
                  variant="primary"
                  size="medium"
                  icon
                  onClick={() => getProducts()}
                >
                  <img src={upload} alt="upload" />
                  Эрэмбэлэх
                </Button>
              )}

              <Button
                variant="primary"
                size="medium"
                icon
                onClick={() => productsCtx?.setMassImport(true)}
              >
                <img src={upload} alt="upload" />
                Масс импорт
              </Button>
              <Button
                onClick={() => productsCtx.setMassUpdate(true)}
                variant="primary"
                size="medium"
                icon
              >
                <img src={upload} alt="upload" />
                Масс шинэчлэх
              </Button>

              {/* <a href="/assets/Calendar.svg" download="Calendar.svg"> */}

              <Button
                variant="secondary"
                size="medium"
                icon
                onClick={() => prodCtx?.setPriceTerm(true)}
              >
                <img
                  src={PriceSetting}
                  alt="upload"
                  className={css.pricesettingImg}
                />
                Үнийн тохиргоо
              </Button>
              <a
                href="https://ebazaar.mn/static/media/massupdate.zip"
                download="file"
              >
                <Button variant="secondary" size="medium" icon>
                  <img src={PaperIcon} alt="upload" className={css.thirdimg} />
                  Масс импорт загварх
                </Button>
              </a>

              <Button
                variant="secondary"
                size="medium"
                icon
                onClick={() => productsCtx?.setMassExport(true)}
              >
                <img src={PaperIcon} alt="upload" />
                Export
              </Button>

              <Button
                variant="secondary"
                size="medium"
                icon
                onClick={settingHandler}
              >
                <img src={settingIcon} alt="upload" className={css.thirdimg} />
                Тохиргоо
              </Button>
            </>
          )}
          <Modal
            title={
              props.userData.company_id === "|1|" ? (
                <div>
                  Компани сонгох
                  <select
                    name="supplier"
                    id="supplier"
                    selected={companyId}
                    style={{ marginLeft: "20px", outline: "none" }}
                    onChange={(e) => {
                      setUserCompanyId(e.target.value);
                    }}
                  >
                    <option>---</option>
                    {props.suppliers.map((e, index) => (
                      <option value={e.id} key={index}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                "Эрэмбэлэх"
              )
            }
            centered
            open={open}
            onOk={() => {
              setOpen(false);
              save();
            }}
            onCancel={() => setOpen(false)}
            width="80%"
            okText={"Хадгалах"}
            cancelText={"Цуцлах"}
            bodyStyle={{ padding: "5px 30px" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  width: "80px",
                  fontWeight: "700",
                  lineHeight: "18px",
                }}
              >
                Хуучин эрэмбэ
              </span>
              <span
                style={{
                  width: "100px",
                  fontWeight: "700",
                  lineHeight: "18px",
                }}
              >
                Шинэ эрэмбэ
              </span>
              <span
                style={{
                  width: "70px",
                  fontWeight: "700",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                ID
              </span>
              <span
                style={{
                  width: "70px",
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "700",
                }}
              >
                Зураг
              </span>
              <span
                style={{
                  width: "500px",
                  fontWeight: "700",
                }}
              >
                Бүтээгдэхүүний нэр
              </span>
              <span
                style={{
                  width: "150px",
                  fontWeight: "700",
                }}
              >
                Үлдэгдэл
              </span>
              <span
                style={{
                  width: "100px",
                  overflow: "hidden",
                  fontWeight: "700",
                }}
              >
                Идэвхи
              </span>
            </div>
            <div style={{ overflow: "scroll", height: "700px" }}>
              {products?.map((item, index) => {
                let iamage = item.image[0];
                // console.log("typeof", typeof iamage);
                let iamageTwo =
                  iamage === undefined || iamage === null
                    ? "https://ebazaar.mn/icon/photo-add.svg"
                    : iamage.replace("original", "small");
                return (
                  <div
                    key={index}
                    style={{
                      fontSize: "12px",
                      color: "#37474F",
                      fontWeight: "400",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      height: "30px",
                    }}
                    draggable="true"
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => {
                      setToi(index);
                    }}
                    onDragStart={(e) => {
                      setSoi(index);
                    }}
                    onDrop={(e) => {
                      arraymove(products, soi, toi);
                    }}
                  >
                    <span
                      style={{
                        width: "80px",
                      }}
                    >
                      {products.length - index}
                    </span>
                    <span
                      style={{
                        width: "100px",
                      }}
                    >
                      <input
                        style={{
                          width: "80px",
                          outline: "none",

                          border:
                            newArray.filter(
                              (al) => al.priority === newOrder[`${item._id}`]
                            ).length > 1
                              ? "0.8px solid red"
                              : "0.8px solid #cfd8dc",

                          color:
                            newArray.filter(
                              (al) => al.priority === newOrder[`${item._id}`]
                            ).length > 1
                              ? "red"
                              : "#4d4d4d",
                        }}
                        value={newOrder[`${item._id}`] || ""}
                        onChange={(a) => {
                          let newq = {
                            ...newOrder,
                            [`${item._id}`]: parseInt(a.target.value),
                          };
                          setNewOrder(newq);
                        }}
                      />
                    </span>
                    <span
                      style={{
                        width: "70px",
                      }}
                    >
                      {item._id}
                    </span>
                    <span
                      style={{
                        width: "70px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={iamageTwo}
                        height={25}
                        width={25}
                        alt="product image"
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                    <span
                      style={{
                        width: "500px",
                        overflow: "hidden",
                        height: "25px",
                        lineHeight: "14px",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        width: "150px",
                        overflow: "hidden",
                        height: "25px",
                      }}
                    >
                      <div
                        style={{
                          background:
                            item.stock === 0 ? "rgb(235, 94, 67)" : "white",
                          width: item.stock === 0 ? "43px" : "150px",
                          color: item.stock === 0 ? "white" : "inherit",
                          borderRadius: "8px",
                          paddingLeft: item.stock === 0 ? "10px" : "0px",
                        }}
                      >
                        {item.stock}ш
                      </div>
                    </span>
                    <span
                      style={{
                        marginLeft: "10px",
                        width: "80px",
                      }}
                    >
                      {item?.locations["62f4aabe45a4e22552a3969f"].is_active
                        .channel[1] === 1 ? (
                        <div style={{ color: "green" }}>Тийм</div>
                      ) : (
                        <div style={{ color: "red" }}>Үгүй</div>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </Modal>
        </>
      )}

      {prodCtx.shopPrice && <ShopPriceRegister userData={props.userData} />}
    </div>
  );
};

export default ProductReportBtn;
