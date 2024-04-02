import React, { useState, useEffect, useContext } from "react";
import { Modal, Input, Checkbox } from "antd";
import ZonesHook from "../Hooks/ZonesHook";
import UserHook from "../Hooks/userHook";
import ProductHook from "../Hooks/ProductHook";
import okIcon from "../assets/OK 2.svg";
import Circle from "../assets/Danger Circle.svg";
import css from "./paymentTerm.module.css";
import myHeaders from "../components/MyHeader/myHeader";

const PaymentTerm = (props) => {
  //   console.log("props payment term++++--------", props);
  const { Search } = Input;
  const zonesctx = useContext(ZonesHook);
  const userctx = useContext(UserHook);
  const prodctx = useContext(ProductHook);
  const [open2, setOpen2] = useState(false);
  const [data, setData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [checked, setCheck] = useState(prodctx.selected);
  const [checkedProd, setCheckedProd] = useState(prodctx.selected);
  const [activeSetting, setActiveSetting] = useState(1);
  const [defaultPrice, setDefaultPrice] = useState();
  const [products, setProducts] = useState([]);
  const [onePrice, setOnePrice] = useState();
  const [selectedZoneId, setSelectedZoneId] = useState(
    "62f4aabe45a4e22552a3969f"
  );

  const [companyId, setUserCompanyId] = useState(
    props.userData.company_id === "|1|"
      ? 13884
      : parseInt(props.userData.company_id.replaceAll("|", ""))
  );

  const [bustype, setBustype] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`https://api.ebazaar.mn/api/site_data`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("res checked", res);
        // setProducts(res.data);
        setBustype(res.business_types);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  //   console.log("props.userdata.company_id", props.userData);

  // useEffect(() => {
  //   fetch(
  //     `https://api2.ebazaar.mn/api/backoffice/suppliers?name=${searchValue}`,
  //     {
  //       method: "GET",
  //       headers: myHeaders,
  //     }
  //   )
  //     .then((r) => r.json())
  //     .then((res) => {
  //       console.log("payment term suplier", res.data);
  //       setSuppliersTerm(res.data);
  //     });
  // }, [searchValue]);

  // console.log("prodctx.selected", prodctx.selected);
  // console.log("checked", checked);
  // console.log("checkedProd", checkedProd);
  // console.log("zonesctx.zonedata", zonesctx.zonedata);
  // console.log(business_types);

  const business_types = userctx.sitedata.business_types;

  useEffect(() => {
    fetchProduct();
  }, [companyId]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `https://api2.ebazaar.mn/api/products/get1?ids=[${checkedProd}]`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("res checked", res);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [checkedProd]);

  const fetchProduct = () => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    let url = `https://api2.ebazaar.mn/api/products/get1?supplier=${companyId}`;
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("error collection", error);
      });
  };

  const save = () => {
    console.log("activeSetting", activeSetting);
    if (activeSetting === 2) {
      const aaa = (id, index) => `locations.${id}.price.channel.${index}`;
      const aaatradeshop = (id) => `locations.${id}.price.tradeshop`;

      var myHeaders = new Headers();
      myHeaders.append(
        "ebazaar_token",
        localStorage.getItem("ebazaar_admin_token")
      );
      myHeaders.append("Content-Type", "application/json");
      let aa = [];
      //   console.log("checkedProd", checkedProd);
      //   console.log("aaa ---------", aa);
      for (let i = 0; i < checkedProd.length; i++) {
        // console.log("pcheckedProd[i]", checkedProd[i]);
        // console.log("Hello world === ", products);

        aa.push({
          product_id: parseInt(checkedProd[i]),
          data: {
            [aaa(selectedZoneId, 1)]: Number(
              document.getElementById("1").value
                ? document.getElementById("1").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["1"]
            ),
            [aaa(selectedZoneId, 2)]: Number(
              document.getElementById("2").value
                ? document.getElementById("2").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["2"]
            ),
            [aaa(selectedZoneId, 3)]: Number(
              document.getElementById("3").value
                ? document.getElementById("3").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["3"]
            ),
            [aaa(selectedZoneId, 4)]: Number(
              document.getElementById("4").value
                ? document.getElementById("4").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["4"]
            ),
            [aaa(selectedZoneId, 5)]: Number(
              document.getElementById("5").value
                ? document.getElementById("5").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["5"]
            ),
            [aaa(selectedZoneId, 6)]: Number(
              document.getElementById("6").value
                ? document.getElementById("6").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["6"]
            ),
            [aaa(selectedZoneId, 7)]: Number(
              document.getElementById("7").value
                ? document.getElementById("7").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["7"]
            ),
            [aaa(selectedZoneId, 8)]: Number(
              document.getElementById("8").value
                ? document.getElementById("8").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["8"]
            ),
            [aaa(selectedZoneId, 9)]: Number(
              document.getElementById("9").value
                ? document.getElementById("9").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["9"]
            ),
            [aaa(selectedZoneId, 10)]: Number(
              document.getElementById("10").value
                ? document.getElementById("10").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["10"]
            ),
            [aaa(selectedZoneId, 11)]: Number(
              document.getElementById("11").value
                ? document.getElementById("11").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["11"]
            ),
            [aaa(selectedZoneId, 12)]: Number(
              document.getElementById("12").value
                ? document.getElementById("12").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["12"]
            ),
            [aaa(selectedZoneId, 13)]: Number(
              document.getElementById("13").value
                ? document.getElementById("13").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["13"]
            ),
            [aaa(selectedZoneId, 14)]: Number(
              document.getElementById("14").value
                ? document.getElementById("14").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["14"]
            ),
            [aaa(selectedZoneId, 15)]: Number(
              document.getElementById("15").value
                ? document.getElementById("15").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["15"]
            ),
            [aaa(selectedZoneId, 16)]: Number(
              document.getElementById("16").value
                ? document.getElementById("16").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["16"]
            ),
            [aaa(selectedZoneId, 17)]: Number(
              document.getElementById("17").value
                ? document.getElementById("17").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["17"]
            ),
            [aaa(selectedZoneId, 18)]: Number(
              document.getElementById("18").value
                ? document.getElementById("18").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["18"]
            ),
            [aaa(selectedZoneId, 19)]: Number(
              document.getElementById("19").value
                ? document.getElementById("19").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["19"]
            ),
            [aaa(selectedZoneId, 20)]: Number(
              document.getElementById("20").value
                ? document.getElementById("20").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["20"]
            ),
            [aaa(selectedZoneId, 21)]: Number(
              document.getElementById("21").value
                ? document.getElementById("21").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["21"]
            ),
            [aaa(selectedZoneId, 22)]: Number(
              document.getElementById("22").value
                ? document.getElementById("22").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["22"]
            ),
            [aaa(selectedZoneId, 23)]: Number(
              document.getElementById("23").value
                ? document.getElementById("23").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["23"]
            ),
            [aaa(selectedZoneId, 24)]: Number(
              document.getElementById("24").value
                ? document.getElementById("24").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["24"]
            ),
            [aaa(selectedZoneId, 25)]: Number(
              document.getElementById("25").value
                ? document.getElementById("25").value
                : products.filter((item) => item._id == checkedProd[i])[0]
                    .locations[`62f4aabe45a4e22552a3969f`].price.channel["25"]
            ),
            [aaatradeshop(selectedZoneId)]: {},
          },
        });
      }

      var raw = JSON.stringify({
        supplier_id: parseInt(companyId),
        products: aa,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log("price term  active - 2", requestOptions);
      fetch(`https://api2.ebazaar.mn/api/product/channel/set`, requestOptions)
        .then((r) => r.json())
        .then((res) => {
          if (res.code === 200) {
            let bbb = JSON.parse(requestOptions.body);

            bbb.products.map((item) => {
              //   console.log("item", item);

              fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
                body: JSON.stringify({
                  section_name: "Бүтээгдэхүүний үнийн өөрчлөлт.",
                  entry_id: item.product_id,
                  user_name: props.userData.email,
                  action: `Шинэ үнэ : ${item.data}`,
                }),
              })
                .then((res) => res.json())
                .then((res) => console.log("res", res))
                .catch((error) => {
                  console.log("error", error);
                });
            });

            alert("Амжилттай хадгалагдлаа");
          } else {
            alert("Алдаа гарлаа, Дахин оролдоно уу");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else if (activeSetting === 1) {
      var myHeaders = new Headers();
      myHeaders.append(
        "ebazaar_token",
        localStorage.getItem("ebazaar_admin_token")
      );
      myHeaders.append("Content-Type", "application/json");
      let aa = [];
      for (let i = 0; i < checkedProd.length; i++) {
        aa.push({
          product_id: checkedProd[i],
          data: {
            "locations.62f4aabe45a4e22552a3969f.price.channel.1":
              Number(onePrice) || 0,

            "locations.62f4aabe45a4e22552a3969f.price.channel.2":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.3":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.4":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.5":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.6":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.7":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.8":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.9":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.10":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.11":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.12":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.13":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.14":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.15":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.16":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.17":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.18":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.19":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.20":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.21":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.22":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.23":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.24":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.channel.25":
              Number(onePrice) || 0,
            "locations.62f4aabe45a4e22552a3969f.price.tradeshop": {},
          },
        });
      }
      console.log("aa", aa);

      var raw = JSON.stringify({
        supplier_id: parseInt(companyId),
        products: aa,
      });

      console.log(raw);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log("price term  active - 1", requestOptions);
      fetch(`https://api2.ebazaar.mn/api/product/channel/set`, requestOptions)
        .then((r) => r.json())
        .then((res) => {
          if (res.code === 200) {
            aa &&
              aa.map((item) => {
                fetch(`https://api2.ebazaar.mn/api/create/backofficelog`, {
                  method: "POST",
                  headers: myHeaders,
                  redirect: "follow",
                  body: JSON.stringify({
                    section_name: "Бүтээгдэхүүний үнийн өөрчлөлт.",
                    entry_id: item.product_id,
                    user_name: props.userData.email,
                    action: `Шинэ үнэ : ${item.data}`,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => console.log("res", res))
                  .catch((error) => {
                    console.log("error", error);
                  });
              });
            alert("Амжилттай хадгалагдлаа");
          } else {
            alert("Алдаа гарлаа, Дахин оролдоно уу");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  let filtered = data?.map((a) => ({
    ...a,
    label: a.name,
    value: a._id,
  }));

  console.log("business_types", business_types);
  return (
    <div
      style={{
        overflowY: "scroll",
        height: "100vh",
        width: "100vw",
        padding: "20px",
      }}
    >
      <div className={css.tableContainerLong}>
        <div style={{ width: "621px" }}>
          <div
            className={css.headerContainerLong}
            style={{ padding: "0 12px" }}
          >
            <div style={{ width: "20%" }}>
              <div className={css.tableHeader}>Img</div>
            </div>
            <div style={{ width: "45%" }}>
              <div className={css.tableHeader}>Бүтээгдэхүүн</div>
            </div>
            <div style={{ width: "35%" }}>
              <div className={css.tableHeader}>SKU</div>
            </div>
            <div style={{ width: "5%" }}>
              <div className={css.tableHeader}>Price</div>
            </div>
          </div>
          <div className={css.tableBodyLong}>
            {checkedProd?.map((e, i) => (
              <div
                style={{
                  display: "flex",
                  height: "51px",
                  padding: "5px 10px",
                  borderBottom: "1px solid #CFD8DC",
                  alignItems: "center",
                }}
                key={i}
              >
                <div style={{ width: "20%" }}>
                  <img
                    src={data
                      ?.find((a) => a._id === e)
                      ?.image[0].replace("original", "small")}
                    height={40}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    width: "45%",
                  }}
                >
                  {data?.find((a) => a._id === e)?.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    width: "35%",
                  }}
                >
                  {data?.find((a) => a._id === e)?.sku}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    width: "5%",
                  }}
                >
                  {data
                    ?.find((a) => a._id === e)
                    ?.locations[`62f4aabe45a4e22552a3969f`].price.channel[
                      "1"
                    ].toLocaleString()}
                  ₮
                </div>
              </div>
            ))}
          </div>
          <div
            className={css.add}
            onClick={() => setOpen2(true)}
            style={{ margin: "10px" }}
          >
            Бүтээгдэхүүн <div className={css.plus}>+</div>
          </div>
        </div>
      </div>
      <div className={css.settingContainer}>
        <div style={{ display: "flex" }}>
          <div
            className={activeSetting === 1 ? css.active : css.inactive}
            onClick={() => {
              setActiveSetting(1);
            }}
            style={{ marginRight: "10px" }}
          >
            <img
              src={activeSetting === 1 ? okIcon : Circle}
              className={css.icon}
              alt=""
            />
            Нэг үнийн тохиргоо
          </div>
          {activeSetting === 1 && (
            <input
              style={{ outline: "none", padding: "2px 15px" }}
              placeholder="Үнэ"
              className={css.inactive}
              onChange={(e) => setOnePrice(e.target.value)}
            />
          )}
        </div>
        <div
          className={activeSetting === 2 ? css.active : css.inactive}
          onClick={() => {
            setActiveSetting(2);
          }}
        >
          <img
            src={activeSetting === 2 ? okIcon : Circle}
            className={css.icon}
            alt=""
          />
          Ялгаатай үнийн тохиргоо
        </div>
      </div>
      {activeSetting === 2 && (
        <div style={{ display: "flex" }}>
          <div className={css.tableContainer}>
            <div style={{ width: "321px" }}>
              <div
                className={css.headerContainer}
                style={{ padding: "0 12px" }}
              >
                <div style={{ width: "60%" }}>
                  <div className={css.tableHeader}>Бүсчлэлийн нэр</div>
                </div>
                {/* <div style={{ width: "40%" }}>
									<div className={css.tableHeader}>Үнэ</div>
									<input
										className={css.price}
										placeholder="бүх бүсчлэл үнэ"
										style={{
											width: "100%",
											outline: "none",
										}}
									/>
								</div> */}
              </div>
              <div className={css.tableBody}>
                {zonesctx.zonedata?.map((e, i) => (
                  <div
                    style={{
                      display: "flex",
                      height: "51px",
                      padding: "5px 10px",
                      borderBottom: "1px solid #CFD8DC",
                      alignItems: "center",
                      background: e._id === selectedZoneId ? "#ffedcc" : "#fff",
                    }}
                    key={i}
                    onClick={() => {
                      setSelectedZoneId(e._id);
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        width: "60%",
                      }}
                    >
                      {e.name}
                    </div>
                    {/* <input
											className={css.price}
											style={{
												width: "40%",
												outline: "none",
											}}
										/> */}
                  </div>
                ))}
              </div>
            </div>
            <div
              className={css.add}
              // onClick={() => }// бүсчлэл цэс рүү үсэрнэ
              style={{ margin: "10px" }}
            >
              Бүсчлэл <div className={css.plus}>+</div>
            </div>
          </div>
          <div className={css.tableContainer}>
            <div style={{ width: "321px" }}>
              <div
                className={css.headerContainer}
                style={{ padding: "0 12px" }}
              >
                <div style={{ width: "60%" }}>
                  <div className={css.tableHeader}>Сувгийн нэр</div>
                </div>
                <div style={{ width: "40%" }}>
                  <div className={css.tableHeader}>Үнэ</div>
                  <input
                    className={css.price}
                    placeholder="бүх сувагийн үнэ"
                    onChange={(e) => {
                      setDefaultPrice(e.target.value);
                    }}
                    style={{
                      width: "100%",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
              <div className={css.tableBody}>
                {bustype &&
                  bustype.map((e, i) => (
                    <div
                      style={{
                        display: "flex",
                        height: "51px",
                        padding: "5px 10px",
                        borderBottom: "1px solid #CFD8DC",
                        alignItems: "center",
                      }}
                      key={i}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          width: "60%",
                        }}
                      >
                        {e.business_type_name}
                      </div>
                      <input
                        className={css.price}
                        defaultValue={defaultPrice}
                        style={{
                          width: "40%",
                          outline: "none",
                        }}
                        id={e.business_type_id}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={css.firstBtn}
        onClick={() => {
          checkedProd.length > 0 ? save() : alert("Бүтээгдхүүн сонгоно уу");
        }}
      >
        <span>Хадгалах</span>
      </div>

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
            "Бүтээгдэхүүн нэмэх"
          )
        }
        centered
        open={open2}
        onOk={() => {
          setCheckedProd(checked);
          setOpen2(false);
          document.getElementById("1").value = "";
          document.getElementById("2").value = "";
          document.getElementById("3").value = "";
          document.getElementById("4").value = "";
          document.getElementById("5").value = "";
          document.getElementById("6").value = "";
          document.getElementById("7").value = "";
          document.getElementById("8").value = "";
          document.getElementById("9").value = "";
          document.getElementById("10").value = "";
          document.getElementById("11").value = "";
          document.getElementById("12").value = "";
          document.getElementById("13").value = "";
          document.getElementById("14").value = "";
          document.getElementById("15").value = "";
          document.getElementById("16").value = "";
          document.getElementById("17").value = "";
          document.getElementById("18").value = "";
          document.getElementById("19").value = "";
          document.getElementById("20").value = "";
          document.getElementById("21").value = "";
          document.getElementById("22").value = "";
          document.getElementById("23").value = "";
          document.getElementById("24").value = "";
          document.getElementById("25").value = "";
        }}
        onCancel={() => setOpen2(false)}
        width="50%"
        okText={"Сонгох"}
        cancelText={"Хаах"}
        bodyStyle={{ padding: "5px 30px" }}
      >
        <Search
          placeholder="Хайлт хийх ..."
          onSearch={(value) => setSearchValue(value)}
          style={{
            width: 400,
          }}
        />
        <Checkbox.Group
          options={
            searchValue
              ? filtered.filter((e) =>
                  e.name.toLowerCase().includes(searchValue.toLowerCase())
                )
              : filtered
          }
          defaultValue={prodctx.selected}
          onChange={(e) => setCheck(e)}
          style={{ height: "500px", overflowY: "scroll" }}
        />
      </Modal>
    </div>
  );
};

export default PaymentTerm;
