import React, { useState, useEffect, useContext } from "react";
import css from "./list.module.css";
import myHeaders from "../../components/MyHeader/myHeader";
import SMSHook from "../../Hooks/SMSHook";
import checkboxicon from "../../assets/check box.svg";
import chechboxchecked from "../../assets/Tick Square on 2.svg";

const data = [
  { id: 0, name: "ХТ нэрс" },
  { id: 1, name: "Бараанууд" },
];

const List = (props) => {
  const [name, setName] = useState(0);
  const [xtners, setXtners] = useState([]);
  const [xtnersfalse, setXtnersfalse] = useState([]);
  const [productFalse, setProductFalse] = useState(false);
  const [tutam, setTutam] = useState(true);
  const [allproduct, setAllproduct] = useState(true);
  const [productlist, setProductlist] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchname, setSearchname] = useState(null);
  const [searchsku, setSearchsku] = useState(null);
  const [searchbarcode, setSearchbarcode] = useState(null);
  const [searchangilal, setSearchangilal] = useState(null);
  const [checkedall, setChechedall] = useState(false);
  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  const [uramshuulal, setUramshuulal] = useState(null);

  const [page, setPage] = useState(1);
  const smsctx = useContext(SMSHook);

  // console.log(
  //   "props list",
  //   props.userdata.userData.company_id.replaceAll("|", "")
  // );

  useEffect(() => {
    let aa = [];
    let bb = props.userdata.categories.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    aa.push(...bb);
    setCategoryList(aa);
  }, [props]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api2.ebazaar.mn/api/backoffice/users?company=${props.userdata.userData.company_id.replaceAll(
        "|",
        ""
      )}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log("res", res);
        let listarray = [...res.data];
        listarray.fill(false);
        setXtnersfalse(listarray);
        setXtners(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let params = "";
    if (searchname !== null) {
      params += `search=${searchname}&`;
    }
    if (searchsku !== null) {
      params += `sku=${searchsku}&`;
    }
    if (searchbarcode !== null) {
      params += `bar_code=${searchbarcode}&`;
    }
    if (searchangilal !== null) {
      params += `category=${searchangilal.toString()}`;
    }
    let url = `https://api2.ebazaar.mn/api/products/get1?${params}page=${page}&limit=50`;
    // console.log("url--------------url", url);
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log("res", res);
        let aa = [];
        res.data &&
          res.data.map((item, index) => {
            aa.push({
              ...item,
              checked: checkedall ? true : false,
            });
          });

        setProductlist(aa);
      })
      .catch((error) => {
        console.log("error product fetch", error);
      });
  }, [searchname, searchsku, searchbarcode, searchangilal]);
  const CancelHandler = () => {
    if (productFalse) {
      setProductFalse(false);
      setAllproduct(true);
    } else {
      smsctx.setModalOpen(false);
    }
  };

  const ChosedHandler = (position) => {
    let update = xtnersfalse.map((item, i) => (i === position ? !item : item));
    setXtnersfalse(update);
  };
  const angilalShow = (item) => {
    // console.log("item =-=---------------", item);
    let aa = categoryList?.filter((x) => x.id == item);
    return aa[0].name;
  };
  const AllCheckedHandler = () => {
    setChechedall((prev) => !prev);
    let ids = [];
    let newUpdate = productlist.map((item) => {
      ids.push(item._id);
      return {
        ...item,
        checked: item.checked ? false : true,
      };
    });
    if (checkedall === true) {
      let dataids = [];
      ids.map((x) => {
        if (smsctx.ids.includes(x) !== true) {
          dataids.push(x);
        }
      });
      smsctx.setIds((prev) => [...prev, ...dataids]);
    }
    if (checkedall === false) {
      let allids = [];
      smsctx.ids.map((item) => {
        if (ids.includes(item) === false) {
          allids.push(item);
        }
      });

      smsctx.setIds(allids);
    }

    setProductlist(newUpdate);
  };

  const ChosedOneHandler = (item) => {
    let ids = [];

    if (item.checked === false) {
      ids.push(item._id);
      smsctx.setIds((prev) => [...prev, ...ids]);
    }

    if (item.checked === true) {
      let aa = smsctx.ids.filter((x) => x !== item._id);

      smsctx.setIds(aa);
    }

    let newdata = productlist.map((obj) => {
      if (obj._id === item._id) {
        return {
          ...obj,
          checked: obj.checked === true ? false : true,
        };
      }
      return obj;
    });

    setProductlist(newdata);
  };

  const SaveHandler = () => {
    let uniquids = [...new Set(smsctx.ids)];

    let xtdata = [];
    let xtids = [];
    xtnersfalse.map((item, i) => {
      if (item === true) {
        xtdata.push(xtners[i].first_name);
        xtids.push(xtners[i].user_id);
      }
    });

    if (xtdata.length === 0) {
      alert("Та худалдааны төлөөлөгчөө сонгоно уу");
      return;
    }
    if (totalValue === null) {
      alert("Та нийт үнэ оруулна уу");
      return;
    }
    if (uramshuulal === null) {
      alert("Та урамшуулалын дүн оруулна уу");
      return;
    }
    if (startdate === null) {
      alert("Та эхлэх огноо оруулна уу");
      return;
    }
    if (enddate === null) {
      alert("Та дуусах огноо оруулна уу");
      return;
    }
    if (allproduct === false && uniquids.length === 0) {
      alert("Та бүтээгдэхүүний сонгоно уу");
      return;
    }

    const data = {
      name: `${xtdata && xtdata.join("-")}-${startdate}-${enddate}`,
      xt_ids: xtids,
      supplier_id: Number(
        props.userdata.userData.company_id.replaceAll("|", "")
      ),
      totalValue: Number(totalValue),
      uramshuulal: Number(uramshuulal),
      tutam: tutam,
      startdate: startdate,
      enddate: enddate,
      productids: allproduct === false ? uniquids : [],
      allProducts: allproduct === true ? true : false,
    };
    // console.log("aaaaaa", JSON.stringify(data));
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(
      `https://api2.ebazaar.mn/api/supplier/options/userdiscount`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("response borluulaltiin uramshuulalt", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.bigcontainer}>
          {data.map((item, index) => (
            <div
              className={css.xtwrapper}
              style={{
                display: name === index ? "flex" : "none",
                flexDirection: "column",
              }}
            >
              <div className={css.garchig}>{item.name}</div>
              <div className={css.smallcontainer}>
                {xtners &&
                  xtners.map((item, index) => {
                    return (
                      <div
                        className={css.smallwrapper}
                        onClick={() => ChosedHandler(index)}
                        key={index}
                      >
                        <img
                          src={
                            xtnersfalse[index] === true
                              ? chechboxchecked
                              : checkboxicon
                          }
                          alt="checked box"
                        />
                        <span>{item.first_name}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
          {productFalse && (
            <div className={css.productwrapper}>
              <div>
                <span className={css.spanvalue}>Эхлэх огноо</span>
                <input
                  value={startdate}
                  onChange={(e) => {
                    setStartdate(e.target.value);
                  }}
                  type="date"
                  className={css.inputvalue}
                />
              </div>
              <div>
                <span className={css.spanvalue}>Дуусах огноо</span>
                <input
                  value={enddate}
                  onChange={(e) => {
                    setEnddate(e.target.value);
                  }}
                  type="date"
                  className={css.inputvalue}
                />
              </div>
              <div>
                <span className={css.spanvalue}>Нийт мөнгөн дүн</span>
                <input
                  placeholder="Мөнгөн дүн"
                  type="number"
                  value={totalValue}
                  onChange={(e) => {
                    setTotalValue(e.target.value);
                  }}
                  className={css.inputvalue}
                />
              </div>
              <div>
                <span className={css.spanvalue}>Урамшуулал</span>
                <input
                  placeholder="Мөнгөн дүн"
                  type="number"
                  value={uramshuulal}
                  onChange={(e) => {
                    setUramshuulal(e.target.value);
                  }}
                  className={css.inputvalue}
                />
              </div>
              <div className={css.nextwrapper}>
                <img
                  src={tutam === true ? chechboxchecked : checkboxicon}
                  alt="checked box"
                  onClick={() => {
                    setTutam((prev) => !prev);
                  }}
                />
                <span
                  className={css.spanvalue}
                  style={{
                    fontWeight: "400",
                  }}
                >
                  тутамд
                </span>
              </div>
              <div>
                <div className={css.spanvalue}>Бүх бүтээгдэхүүн </div>
                <div className={css.productchecker}>
                  <img
                    src={allproduct === true ? chechboxchecked : checkboxicon}
                    alt="checked box"
                    onClick={() => {
                      setAllproduct((prev) => !prev);
                    }}
                  />
                  <span>All</span>
                </div>
              </div>
            </div>
          )}
          {!allproduct && (
            <div className={css.productcontainer}>
              <div className={css.header}>
                <div
                  className={css.oneheader}
                  style={{
                    width: "30px",
                  }}
                >
                  <img
                    src={checkedall ? chechboxchecked : checkboxicon}
                    onClick={AllCheckedHandler}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    width: "220px",
                  }}
                >
                  <span>Бүтээгдэхүүн нэр</span>
                  <input
                    value={searchname}
                    onChange={(e) => {
                      setSearchname(e.target.value);
                    }}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    width: "150px",
                  }}
                >
                  <span>Бүтээгдэхүүн sku</span>
                  <input
                    value={searchsku}
                    onChange={(e) => {
                      setSearchsku(e.target.value);
                    }}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    width: "150px",
                  }}
                >
                  <span>Бүтээгдэхүүн barcode</span>
                  <input
                    value={searchbarcode}
                    onChange={(e) => {
                      setSearchbarcode(e.target.value);
                    }}
                  />
                </div>
                <div
                  className={css.oneheader}
                  style={{
                    width: "150px",
                  }}
                >
                  <span>Ангилал</span>
                  <select
                    value={searchangilal}
                    onChange={(e) => {
                      setSearchangilal(e.target.value);
                    }}
                  >
                    {categoryList &&
                      categoryList.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className={css.body}>
                {productlist &&
                  productlist.map((item, index) => {
                    return (
                      <div className={css.onewrapper} key={index}>
                        <div
                          className={css.oneitem}
                          style={{
                            width: "30px",
                          }}
                        >
                          <img
                            src={
                              item.checked === true
                                ? chechboxchecked
                                : checkboxicon
                            }
                            alt="goe icon"
                            onClick={() => ChosedOneHandler(item)}
                          />
                        </div>
                        <div
                          className={css.oneitem}
                          style={{
                            width: "220px",
                          }}
                        >
                          <span>{item.name}</span>
                        </div>
                        <div
                          className={css.oneitem}
                          style={{
                            width: "150px",
                          }}
                        >
                          <span>{item.sku}</span>
                        </div>
                        <div
                          className={css.oneitem}
                          style={{
                            width: "150px",
                          }}
                        >
                          <span>{item.bar_code}</span>
                        </div>
                        <div
                          className={css.oneitem}
                          style={{
                            width: "150px",
                          }}
                        >
                          <span>{angilalShow(item.category_id)}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <div className={css.btnwrapper}>
          <button className={css.wrapperbtn} onClick={CancelHandler}>
            Цуцлах
          </button>

          <button
            className={css.confirm}
            onClick={() => {
              if (productFalse === true) {
                SaveHandler();
              } else {
                setProductFalse(true);
              }
            }}
          >
            {productFalse === true ? "Хадгалах" : "Үргэлжлүүлэх"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
