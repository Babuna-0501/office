import React, { useContext, useEffect, useState } from "react";
import css from "./updatediscount.module.css";
// import Select from "react-select";
import EllipseGrayIcon from "../assets/Component 92.svg";
import { Select } from "antd";
import OkIcon from "../assets/OK.svg";
import ArrawRightGray from "../assets/Arrow - Right.svg";
import PromoHook from "../Hooks/PromoHook";
import settingData from "./settingData.json";
import discount from "./discount.json";
import SmallTable from "./SmallTable";
import BackOfficeHook from "../Hooks/BackOfficeHook";
import Productctx from "../Hooks/ProductsReportHook";
import myHeaders from "../components/MyHeader/myHeader";
import ZonesSidebar from "./ZonesModal/ZonesSidebar";
import SupplierUpdate from "./Suppliers/SupplierUpdate";

const UpdateDiscount = (props) => {
  const promoctx = useContext(PromoHook);
  const backofficectx = useContext(BackOfficeHook);
  const sitedatactx = useContext(Productctx);
  const [channel, setChannel] = useState([]);
  const [defaultSupplier, setDefaultSupplier] = useState(null);

  const [zoneMapIDS, setZoneMapIDS] = useState(["62f4aabe45a4e22552a3969f"]);
  const [zoneTransdata, setZoneTransdata] = useState([]);
  const [optionsDefault, setOptionsDefault] = useState([]);

  // console.log("promoctx.willUpdateProd", promoctx.willUpdateProd);

  const options = [];
  let defaultName;
  if (backofficectx.suppliers) {
    backofficectx.suppliers.map((supplier) => {
      options.push({ value: supplier.id, label: supplier.english_name });
      if (supplier.id === promoctx.willUpdateProd.supplierID) {
        defaultName = supplier.english_name;
      }
    });
  }

  const chosedChannelHandler = (value) => {
    // console.log("selected channel option", selectedOptions);
    let aa = promoctx.willUpdateProd;

    aa["channel_id"] = value;
    promoctx.setWillUpdateProd(aa);
  };
  let content = discount.filter((item) => {
    if (item.id === promoctx.willUpdateProd?.discount_data?.discounttype) {
      return item;
    }
  });
  useEffect(() => {
    const fetchdata = () => {
      let url = `https://api.ebazaar.mn/api/site_data`;
      fetch(url, {
        method: "GET",
        myHeaders: myHeaders,
      })
        .then((r) => r.json())
        .then((response) => {
          let aa = [];
          response.business_types.map((item) => {
            aa.push({
              value: item.business_type_id,
              label: item.business_type_name,
            });
          });

          setOptionsDefault(aa);
        });
    };
    try {
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, [promoctx.willUpdateProd]);

  useEffect(() => {
    if (promoctx.willUpdateProd.supplierID) {
      backofficectx.suppliers.filter((supplier) => {
        if (supplier.id === promoctx.willUpdateProd.supplierID) {
          setDefaultSupplier({
            value: supplier.id,
            label: supplier.english_name,
          });
        }
      });
    }
    if (promoctx.willUpdateProd.conditions) {
      let dataaa = [];
      promoctx.willUpdateProd.conditions.map((item, index) => {
        // console.log("item", item);
        dataaa.push({
          dete: [item],
          package_id: item.package_id,
        });
      });
      // console.log("dataaa", dataaa);
      promoctx.setGiftProduct(dataaa);
    }

    if (promoctx.willUpdateProd) {
      let info = [];
      promoctx.willUpdateProd.locations.map((it) => {
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(`https://api2.ebazaar.mn/api/zones?id=${it}`, requestOptions)
          .then((r) => r.json())
          .then((res) => {
            info.push(...res.data);
          })
          .catch((error) => {
            console.log("error", error.message);
          });
      });
      setZoneTransdata(info);
    }
  }, [promoctx.willUpdateProd]);
  useEffect(() => {
    if (
      promoctx.willUpdateProd.discount_data.discounttype === 1 &&
      promoctx.willUpdateProd.discount_data.type === "percent"
    ) {
      promoctx.setSettingIndex(0);
    } else if (
      promoctx.willUpdateProd.discount_data.discounttype === 1 &&
      promoctx.willUpdateProd.discount_data.type === "amount"
    ) {
      promoctx.setSettingIndex(1);
    } else if (
      promoctx.willUpdateProd.discount_data.discounttype === 3 &&
      promoctx.willUpdateProd.discount_data.threshold_amount === 0
    ) {
      promoctx.setSettingIndex(4);
    } else {
      promoctx.setSettingIndex(5);
    }
  }, []);
  useEffect(() => {
    let aa = promoctx.willUpdateProd;
    aa.locations = zoneMapIDS;
    // console.log("aa+-", aa);
    promoctx.setWillUpdateProd(aa);
  }, [zoneMapIDS]);

  useEffect(() => {
    let channelData = [];
    sitedatactx?.sitedata?.business_types?.map((item) => {
      promoctx?.willUpdateProd?.channel_id?.map((x) => {
        // console.log("x", x);
        if (x === item.business_type_id) {
          channelData.push(item);
        }
      });
    });
    setChannel(channelData);
  }, [promoctx?.willUpdateProd?.channel_id]);
  useEffect(() => {
    promoctx.setDiscountChannel(channel);
  }, [channel]);

  const deleteHandler = () => {
    promoctx.setDeleteModal(true);
  };

  useEffect(() => {
    promoctx?.setProducts([]);

    let ids = promoctx.willUpdateProd.products;
    // console.log("ids", ids);

    const products = () => {
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `https://api2.ebazaar.mn/api/products/get1?ids=[${ids}]`,
        requestOptions
      )
        .then((r) => r.json())
        .then((res) => {
          // console.log("promo update", res.data);
          promoctx?.setProducts(res.data);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    };
    try {
      products();
    } catch (error) {
      console.log("error product download", error);
    }
  }, [promoctx.updateDisProd]);

  const deleteGiftHandler = (item, index) => {
    const newList = promoctx.willUpdateProd.conditions.filter(
      (t) => t.product_id !== item.product_id
    );
    promoctx.willUpdateProd.conditions = [...newList];
  };

  useEffect(() => {
    promoctx.willUpdateProd?.conditions.map((item, index) => {
      // console.log("item condition", item);
      if (item.gift_qty > 0) {
        promoctx.setQiftQty(item.gift_qty);
      }
      if (item.threshold_qty) {
        promoctx.setThresholdQty(item.threshold_qty);
      }
    });
  }, []);

  let DiscountTypeValue;
  if (
    promoctx.willUpdateProd.discount_data.type === "amount" &&
    promoctx.willUpdateProd.discount_data.discounttype === 1
  ) {
    DiscountTypeValue = (
      <div className={css.inputContainerTwo}>
        <input
          className={css.inputTwo}
          style={{ border: "none", padding: "11px 16px" }}
          value={promoctx.willUpdateProd.discount_data.value}
          onChange={(e) =>
            promoctx.setWillUpdateProd({
              ...promoctx.willUpdateProd,
              discount_data: {
                ...promoctx.willUpdateProd.discount_data,
                value: e.target.value,
              },
            })
          }
          type="text"
          placeholder="Урамшууллын утга"
        />
      </div>
    );
  }
  // console.log("promoctx.giftproduct", promoctx.giftProduct);
  const settingHandler = (index, parentID) => {
    // console.log("index", index);
    // setSetting(index);
    promoctx.setSettingIndex(index);
  };

  // console.log("promoctx.products ---promoctx.products", promoctx.products);
  // let discountContet = settingData.map((item, index) => {
  //   if (promoctx.willUpdateProd.discount_data.discounttype === item.parentID) {
  //     return (
  //       <div
  //         className={
  //           index === setting ? css.chosedContainera : css.choseContainer
  //         }
  //         onClick={() => settingHandler(index)}
  //       >
  //         <img
  //           src={index === setting ? OkIcon : EllipseGrayIcon}
  //           style={{ width: "16px", height: "100%", marginRight: "8px" }}
  //         />
  //         <div className={css.choseContent}>
  //           <h3>{item.name}</h3>
  //         </div>
  //       </div>
  //     );
  //   }
  // });
  let discountContet = settingData.map((item, index) => {
    if (promoctx.willUpdateProd.discount_data.discounttype === item.parentID) {
      return (
        <div
          className={
            index === promoctx.settingIndex
              ? css.chosedContainera
              : css.choseContainer
          }
          onClick={() => settingHandler(index, item.parentID)}
        >
          <img
            src={index === promoctx.settingIndex ? OkIcon : EllipseGrayIcon}
            style={{ width: "16px", height: "100%", marginRight: "8px" }}
          />
          <div className={css.choseContent}>
            <h3>{item.name}</h3>
          </div>
        </div>
      );
    }
  });

  // let discountContentAmoun;
  // if (setting === 1) {
  //   discountContentAmoun = settingData.map((item, index) => {
  //     if (
  //       promoctx.willUpdateProd.discount_data.discounttype === item.parentID
  //     ) {
  //       return (
  //         <div
  //           className={
  //             index === setting ? css.chosedContainera : css.choseContainer
  //           }
  //           onClick={() => settingHandler(index)}
  //         >
  //           <img
  //             src={index === setting ? OkIcon : EllipseGrayIcon}
  //             style={{ width: "16px", height: "100%", marginRight: "8px" }}
  //           />
  //           <div className={css.choseContent}>
  //             <h3>{item.name}</h3>
  //           </div>
  //         </div>
  //       );
  //     }
  //   });
  // }
  // console.log("promoctx.giftProduct", promoctx.giftProduct);
  const zoneSidebarHandler = () => {
    promoctx.setZonessidebar(true);
  };

  return (
    <div className={css.containerName}>
      <div>
        <div className={css.wrapper}>
          <div className={css.firstContainer}>
            <div className={css.header}>
              <h3>Урамшуулал, хямдралын төрөл</h3>
            </div>
            <div className={css.titleContainer}>
              <div className={css.titlewrapper}>
                <input
                  placeholder="Гарчиг3"
                  value={promoctx?.willUpdateProd?.discount_data?.title}
                  onChange={(e) =>
                    promoctx?.setWillUpdateProd({
                      ...promoctx?.willUpdateProd,
                      discount_data: {
                        ...promoctx?.willUpdateProd.discount_data,
                        title: e.target.value,
                      },
                    })
                  }
                  className={css.titleConInput}
                  style={{
                    height: "52px",
                    padding: "16px 20px",
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#37474F",
                  }}
                />
              </div>
              <div className={css.selectContainer}>
                <div className={css.chosedContainer}>
                  <img src={OkIcon} />{" "}
                  <span>
                    {content[0]?.name ? content[0]?.name : "Нийлүүлэгч"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "840px" }}>
            <div style={{ width: "100%" }}>
              <SupplierUpdate
                title="Нийлүүлэгч"
                supID={promoctx?.willUpdateProd?.supplierID}
              />
            </div>
            {/* {Number(1217) === 1217 && (
              <div style={{ width: "840px" }}>
                <div className={css.header}>
                  <h3>Нийлүүлэгч</h3>
                </div>
                <div>
                  <Select
                    options={options}
                    id="supplier"
                    onChange={handleChange}
                    defaultValue={{
                      label: defaultName,
                      value: promoctx.willUpdateProd.supplierID,
                    }}
                  />
                </div>
              </div>
            )} */}
          </div>

          <div className={css.secondContainer}>
            <div className={css.header}>
              <h3>Тохиргоо</h3>
            </div>
            <div className={css.settingsContainer}>
              <div className={css.settingsWrapper}>
                <div
                  style={{
                    display: "flex",
                    width: "410px",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  {discountContet}
                </div>
                <div className={css.discountContainer}>
                  {promoctx.settingIndex === 0 && (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Хямдралын утга"
                      className={css.discountInput}
                      value={promoctx.willUpdateProd.discount_data.value}
                      onChange={(e) =>
                        promoctx.setWillUpdateProd({
                          ...promoctx.willUpdateProd,
                          discount_data: {
                            ...promoctx.willUpdateProd.discount_data,
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  )}
                  {promoctx.settingIndex === 1 && (
                    <div className={css.settingOneContainer}>
                      <div className={css.settingOneWrapper}>
                        <input
                          type="number"
                          min="0"
                          placeholder="Үнийн дүн"
                          value={
                            promoctx.willUpdateProd.discount_data
                              .threshold_amount
                          }
                          onChange={(e) =>
                            promoctx.setWillUpdateProd({
                              ...promoctx.willUpdateProd,
                              discount_data: {
                                ...promoctx.willUpdateProd.discount_data,
                                threshold_amount: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className={css.settingOneWrapper}>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Хямдралын утга"
                          value={promoctx.willUpdateProd.discount_data.value}
                          onChange={(e) =>
                            promoctx.setWillUpdateProd({
                              ...promoctx.willUpdateProd,
                              discount_data: {
                                ...promoctx.willUpdateProd.discount_data,
                                value: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                  {promoctx.settingIndex === 4 && (
                    <div className={css.newGiftContainer}>
                      <div className={css.inputContainerTwob}>
                        <input
                          className={css.inputTwob}
                          style={{ border: "none", padding: "11px 16px" }}
                          value={promoctx.thresholdQty}
                          onChange={(e) =>
                            promoctx.setThresholdQty(e.target.value)
                          }
                          type="text"
                          placeholder="Урамшууллын утга"
                          // onChange={e => setPriceAndQuantity(e.target.value)}
                        />
                      </div>
                      <div className={css.inputContainerTwob}>
                        <input
                          className={css.inputTwob}
                          style={{ border: "none", padding: "11px 16px" }}
                          value={promoctx.giftQty}
                          onChange={(e) => promoctx.setQiftQty(e.target.value)}
                          type="text"
                          placeholder="Бэлгийн утга"
                        />
                      </div>
                    </div>
                  )}
                  {promoctx.settingIndex === 5 && (
                    <div className={css.newGiftContainer}>
                      <div className={css.inputContainerTwob}>
                        <input
                          className={css.inputTwob}
                          style={{ border: "none", padding: "11px 16px" }}
                          value={promoctx.thresholdQty}
                          onChange={(e) =>
                            promoctx.setThresholdQty(e.target.value)
                          }
                          type="text"
                          placeholder="Урамшууллын утга"
                          // onChange={e => setPriceAndQuantity(e.target.value)}
                        />
                      </div>
                      <div className={css.inputContainerTwob}>
                        <input
                          className={css.inputTwob}
                          style={{ border: "none", padding: "11px 16px" }}
                          value={promoctx.giftQty}
                          onChange={(e) => promoctx.setQiftQty(e.target.value)}
                          type="text"
                          placeholder="Бэлгийн утга"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "410px",
                }}
              >
                <div className={css.settingDateContainer}>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      height: "24px",
                      border: "none",
                      outline: "none",
                    }}
                    value={promoctx.willUpdateProd.start_date}
                    placeholder="Эхлэх өдөр"
                    onChange={(e) =>
                      promoctx.setWillUpdateProd({
                        ...promoctx.willUpdateProd,
                        start_date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <img src={ArrawRightGray} className={css.image} />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className={css.settingDateContainer}>
                    <input
                      type="date"
                      style={{
                        width: "100%",
                        height: "24px",
                        border: "none",
                        outline: "none",
                      }}
                      value={promoctx.willUpdateProd.end_date}
                      placeholder="Дуусах өдөр"
                      onChange={(e) =>
                        promoctx.setWillUpdateProd({
                          ...promoctx.willUpdateProd,
                          end_date: e.target.value,
                        })
                      }
                    />

                    {/* <span>Дуусах огноо</span> */}
                  </div>
                </div>
              </div>
              <div>
                {promoctx.willUpdateProd.discount_data.discounttype === 1 && (
                  <div className={css.commentContainer}>
                    <input
                      placeholder="Тайлбар"
                      value={
                        promoctx.willUpdateProd?.discount_data?.description
                          ? promoctx.willUpdateProd?.discount_data?.description
                          : "Тайлбар байхгүй."
                      }
                      onChange={(e) =>
                        promoctx.setWillUpdateProd({
                          ...promoctx.willUpdateProd,
                          discount_data: {
                            ...promoctx.willUpdateProd.discount_data,
                            description: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                )}
                {promoctx.willUpdateProd.discount_data.discounttype === 3 && (
                  <div className={css.commentContainer}>
                    <input
                      placeholder="Тайлбар"
                      value={
                        promoctx.willUpdateProd?.discount_data?.description
                          ? promoctx.willUpdateProd?.discount_data?.description
                          : "Тайлбар байхгүй."
                      }
                      onChange={(e) =>
                        promoctx.setWillUpdateProd({
                          ...promoctx.willUpdateProd,
                          discount_data: {
                            ...promoctx.willUpdateProd.discount_data,
                            description: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <SmallTable
            data={promoctx.products}
            newProduct={promoctx.setProducts}
          />
          <div
            style={{
              width: "840px",
              background: "#FFFFFF",
              paddingLeft: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            {/* <div
              className={css.addButtonContainer}
              onClick={productsAddHandler}
            >
              <div>Нэмэх</div>
              <img src={PlusIcon} />
            </div> */}
          </div>
          {promoctx.willUpdateProd.discount_data.type === "gifts" && (
            <div className={css.discountHeader}>
              <h3>Хямдралын бүтээгдэхүүн нөхцөл</h3>
            </div>
          )}

          {promoctx.willUpdateProd.discount_data.type === "gifts" && (
            <div className={css.giftContainer}>
              <div className={css.giftwrapper}>
                {promoctx.willUpdateProd.conditions?.map((item, index) => {
                  // console.log("item", item);
                  return (
                    <div
                      onClick={() => deleteGiftHandler(item, index)}
                      className={css.packageContainer}
                    >
                      <span>Package ID : {item.package_id}</span>

                      {item.is_gift ? (
                        <span>
                          Бэлэгийн бүтээгдэхүүний нэр : {item.product_name}
                        </span>
                      ) : (
                        <span>Бүтээгдэхүүний нэр : {item.product_name}</span>
                      )}

                      <span>Бүтээгдэхүүний ID : {item.product_id}</span>

                      {item.is_gift ? (
                        <span>
                          Бэлэгийн бүтээгдэхүүний тоо: {item.gift_qty}ш
                        </span>
                      ) : (
                        <span>
                          Үндсэн бүтээгдэхүүн тоо: {item.threshold_qty}ш
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* <span
                onClick={giftProductHandler}
                className={css.packageAddContainer}
              >
                Нэмэх
              </span> */}
            </div>
          )}
          <div className={css.lastContainer}>
            <div className={css.headers}>
              <h2>Сувгийн тохиргоо</h2>
            </div>
            {/* <div
              className={css.generalContainer}
              onClick={() => promoctx.setChannel(true)}
            >
              <div className={css.channelContainer}>
                {channel?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#37474F",
                      }}
                    >
                      {item?.business_type_name},{" "}
                    </span>
                  );
                })}
              </div>{" "}
              <div className={css.iconContainer}>
                <img src={ArrawRightGray} className={css.smallIcon} />
              </div>
            </div> */}
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              defaultValue={promoctx.willUpdateProd.channel_id}
              onChange={chosedChannelHandler}
              options={optionsDefault}
            />
          </div>
          <div className={css.lastContainer}>
            <div className={css.headers}>
              <h2>Бүсчлэлийн тохиргоо</h2>
            </div>
            <div className={css.generalContainer}>
              <div>
                {
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#37474F",
                    }}
                  >
                    {zoneTransdata?.map((it, index) => {
                      let name = it.name;
                      name = name.replace("ZONE_MGL", "Бүх бүсчлэл");
                      name = name.replace("ZONE_UB", "Улаанбаатар");
                      return (
                        <span
                          key={index}
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#37474F",
                          }}
                        >
                          {name},{" "}
                        </span>
                      );
                    })}
                  </span>
                }
              </div>
              <img
                src={ArrawRightGray}
                className={css.smallIcon}
                onClick={zoneSidebarHandler}
              />
              {promoctx.zonessidebar && (
                <ZonesSidebar
                  setZoneMapIDS={setZoneMapIDS}
                  setZoneTransdata={setZoneTransdata}
                />
              )}
            </div>
          </div>
          <div className={css.buttonsContainer}>
            <button onClick={deleteHandler} className={css.deleteBtn}>
              Хямдрал, урамшуулал устгах
            </button>
            {/* <button onClick={DiscountProductUpdate} className={css.confirm}>
              Шинэчлэх
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDiscount;
