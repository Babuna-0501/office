import React, { useState, useEffect, useContext } from "react";
import css from "./list.module.css";
import { Select } from "antd";
import arrowdown from "../assets/Arrow - Down.svg";
import Button from "../components/Button/Button";
import checkboxicon from "../assets/check box.svg";
import chechboxchecked from "../assets/Tick Square on 2.svg";
import ProductHeader from "./ProductHeader";
import SearchedInput from "./SearchedInput";
import AppHook from "../Hooks/AppHook";
import myHeaders from "../components/MyHeader/myHeader";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";

const HighLight = (props) => {
  // console.log(props);
  const [data, setData] = useState();

  const [businessType, setBusinessType] = useState([]);

  const [oldProducts, setOldProducts] = useState([]);
  const [chosedProducts, setChosedProducts] = useState([]);
  const [searchvalue, setSearchvalue] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchSelectedProductsFalse, setSearchSelectedProductsFalse] =
    useState([]);
  const [newproducts, setNewproducts] = useState([]);
  const [newproductsfalse, setNewproductsfalse] = useState([]);
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  const appctx = useContext(AppHook);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useEffect(() => {
    let data = [];
    newproducts.map((item) => {
      data.push(false);
    });
    setNewproductsfalse(data);
  }, [newproducts]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://api.ebazaar.mn/api/site_data`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log("res highlighst", res);
        let data = [];
        res.business_types.map((item) => {
          data.push(item.business_type_id);
        });
        // console.log("data business type", data);
        setBusinessType(data);
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
    let url = `https://api.ebazaar.mn/api/pages/?page_id=1`;
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        const data = res?.data?.find((a) => a.type === "Product Grid")?.new_data
          ?.id["1"];
        setData(
          res?.data?.find((a) => a.type === "Product Grid")?.new_data?.id["1"]
        );

        fetch(
          `https://api2.ebazaar.mn/api/products/get1?ids=[${
            res?.data?.find((a) => a.type === "Product Grid")?.new_data?.id["1"]
          }]`,
          requestOptions
        )
          .then((res) => res.json())
          .then((res) => {
            let dataaa = [];
            // console.log("product", res.data);
            let aa = res.data.map((e) => ({
              value: e._id,
              label: `${e._id} - ${e.name}`,
            }));
            res.data.map((item) => {
              dataaa.push(true);
            });
            let sortedProduct = [];
            data?.map((e) => {
              res.data?.map((product) => {
                if (e == product._id) {
                  sortedProduct.push(product);
                }
              });
            });
            setOldProducts(sortedProduct);
            setChosedProducts(dataaa);
          })
          .catch((error) => {
            console.log("aldaa garlaa", error);
          });
      })
      .catch((error) => {
        alert("Алдаа гарлаа");
      });
  }, []);

  const businessTypeList = props.businessType.map((e) => ({
    value: e.business_type_id,
    label: `${e.business_type_id} - ${e.business_type_name}`,
  }));

  const save = () => {
    // console.log("newproducts", newproducts);
    let newIDS = [];
    newproducts.map((item) => {
      newIDS.push(item._id);
    });
    // console.log("chosedProducts", chosedProducts);
    chosedProducts.map((item, index) => {
      if (item) {
        oldProducts.map((x, y) => {
          if (index === y) {
            newIDS.push(x._id);
          }
        });
      }
    });

    let ids = {};
    businessType.forEach((item) => {
      ids[`${item}`] = [...newIDS];
    });

    let aa = {
      id: ids,
      link: {
        link_title: "Бүгдийг үзэх",
        title: "Бүтээгдэхүүний жагсаалт",
        applink: "product_list",
        link: "",
      },
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(aa),
    };
    // console.log("requestOptions", requestOptions);

    fetch(
      `https://api2.ebazaar.mn/api/component/updateFeaturedProducts`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.code === 200) {
          alert(res.message);
          window.location.replace("/");
        }
        // appctx.setPage(["dashboard"]);
      })
      .catch((error) => {
        console.log("ontsloh buteegdehuun", error);
      });
  };

  const deleteAllHandler = () => {};

  const checkedHandler = (item, index) => {
    // console.log("chosed index", index);
    const updatedCheckedState = chosedProducts.map((item, position) =>
      index === position ? !item : item
    );

    setChosedProducts(updatedCheckedState);
  };
  const checkedHandlerOne = (item, index) => {
    const updatedCheckedState = searchSelectedProductsFalse.map(
      (item, position) => (index === position ? !item : item)
    );

    setSearchSelectedProductsFalse(updatedCheckedState);
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let params = "";
    if (searchvalue?.length > 2) {
      params += `?search=${searchvalue}`;
      let urlNew = `https://api2.ebazaar.mn/api/products/get1${params}`;
      // console.log("urlnew", urlNew);
      fetch(urlNew, requestOptions)
        .then((r) => r.json())
        .then((response) => {
          let data = [];
          response.data.map((item) => {
            data.push(false);
          });
          setSearchSelectedProductsFalse(data);
          setSearchedProducts(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [searchvalue]);
  const cancelfirstHandler = () => {
    setSearchvalue(null);
  };
  const newProductSelectHandler = (item, index) => {
    // console.log("chosed index", index);
    const updatedCheckedState = newproductsfalse.map((item, position) =>
      index === position ? !item : item
    );

    setNewproductsfalse(updatedCheckedState);
  };
  const tsutslahHandler = () => {
    setNewproducts([]);
  };

  const selectedTsutslahHandler = () => {
    // console.log("newproductsfalse", newproductsfalse);
    let newprod = [];
    newproductsfalse.map((item, index) => {
      if (item) {
        newproducts.map((x, y) => {
          if (index === y) {
            newprod.push(x);
          }
        });
      }
    });

    setSearchvalue(null);
    setNewproducts(newprod);
  };
  const saveHandler = () => {
    searchSelectedProductsFalse.map((item, index) => {
      // console.log("item", item);
      // console.log("index", index);
      searchedProducts.map((x, y) => {
        if (item && index === y) {
          setNewproducts((prev) => [...prev, x]);
          setSearchvalue(null);
        }
      });
    });
  };
  const cancel = () => {
    // appctx.setPage(["dashboard"]);
    window.location.replace("/");
  };

  const sortHandler = () => {
    let changedProducts = [...oldProducts];
    // console.log("oldProducts", oldProducts);

    //remove and save the dragged item content
    const draggedItemContent = changedProducts.splice(dragItem.current, 1)[0];

    //switch the position
    changedProducts.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    setOldProducts(changedProducts);
    //  console.log("aa higlight product sort", changedProducts);
  };

  return (
    <div className={css.ccontainer}>
      <div className={css.wrapper}>
        <div className={css.ontslohwrapper}>
          <span>Одоо байгаа онцлох бүтээгдэхүүн харах</span>
          {/* <img src={arrowdown} alt="arrow down " /> */}
        </div>
        <div className={css.ontslohcontainer}>
          <div className={css.alldelete} onClick={deleteAllHandler}>
            {/* Сонгогдсоныг цуцлах */}
          </div>
          <div className={css.bodywrapper}>
            <div className={css.headerwrapper}>
              <div
                className={css.onewrapper}
                style={{
                  width: "100px",
                }}
              >
                <span>Product id</span>
                <input />
              </div>
              <div
                className={css.onewrapper}
                style={{
                  width: "250px",
                }}
              >
                <span>Бүтээгдэхүүний нэр</span>
                <input />
              </div>
              <div
                className={css.onewrapper}
                style={{
                  width: "100px",
                }}
              >
                <span>Зураг</span>
                <input />
              </div>
            </div>
            <div className={css.bodywrapper1}>
              {oldProducts
                ? oldProducts.map((item, index) => {
                  console.log("oldProducts", oldProducts);
                    return (
                      <div
                        className={css.oneproduct}
                        key={index}
                        draggable
                        onDragStart={(e) => (dragItem.current = index)}
                        onDragEnter={(e) => (dragOverItem.current = index)}
                        onDragEnd={sortHandler}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <div
                          style={{
                            width: "100px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => checkedHandler(item, index)}
                        >
                          <img
                            src={
                              chosedProducts[index] === false
                                ? checkboxicon
                                : chechboxchecked
                            }
                            alt="check box "
                          />
                          <span className={css.productid}>{item._id}</span>
                        </div>
                        <div
                          style={{
                            width: "250px",
                            marginLeft: "20px",
                          }}
                        >
                          <span className={css.productname}>{item.name}</span>
                        </div>
                        <div
                          style={{
                            width: "100px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={item.image[0]}
                            className={css.productimage}
                          />
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>

      <div className={css.ehniiserachaaa}>
        <div className={css.searchedwrappercontainer}>
          <SearchedInput
            title="Шинэ бүтээгдэхүүн нэмэх"
            setSearch={setSearchvalue}
          />
        </div>

        {searchvalue && (
          <div className={css.toaa}>
            <div className={css.toaatwo}>
              {searchedProducts.map((item, index) => {
                return (
                  <div className={css.twocontainer} key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          width: "100px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => checkedHandlerOne(item, index)}
                      >
                        <img
                          src={
                            searchSelectedProductsFalse[index] === true
                              ? chechboxchecked
                              : checkboxicon
                          }
                          alt="check box "
                        />
                        <span className={css.productid}>{item._id}</span>
                      </div>
                      <div>
                        <span>{item.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={css.btnwrapper}>
              <Button className={css.cancelbtn} onClick={cancelfirstHandler}>
                Цуцлах
              </Button>
              <Button className={css.approvebtn} onClick={saveHandler}>
                Хадгалах
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={css.ehniiserach}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className={css.tableheader}>
            Шинээр сонгогдсон бүтээгдэхүүн
          </span>
        </div>
        <div className={css.tablecontainer}>
          <ProductHeader />
          <div className={css.tablebodywrapper}>
            {newproducts.map((item, index) => {
              return (
                <div className={css.onenewprduct} key={index}>
                  <div
                    className={css.onewrapper_wrpaper}
                    style={{
                      width: "100px",
                    }}
                    onClick={() => newProductSelectHandler(item, index)}
                  >
                    <img
                      src={
                        newproductsfalse[index] === true
                          ? chechboxchecked
                          : checkboxicon
                      }
                      alt="check box "
                    />
                    <span>{item._id}</span>
                  </div>
                  <div
                    className={css.onewrapper_wrpaper}
                    style={{
                      width: "200px",
                      marginLeft: "20px",
                    }}
                  >
                    <span>{item.name}</span>
                  </div>
                  <div
                    className={css.onewrapper_wrpaper}
                    style={{
                      width: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={item.image[0]} className={css.productimage} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={css.btnwrapper}>
          <Button className={css.cancelbtn} onClick={tsutslahHandler}>
            Бүгдийг цуцлах
          </Button>
          <Button className={css.approvebtn} onClick={selectedTsutslahHandler}>
            Сонгосоныг хадгалах
          </Button>
        </div>
      </div>

      <div className={css.tableheader}>Суваг сонгох</div>
      <Select
        allowClear
        mode="multiple"
        placeholder="Суваг"
        style={{ width: "100%" }}
        value={businessType}
        options={businessTypeList}
        onChange={(value) => {
          setBusinessType(value);
        }}
      />
      <div className={css.firstBtn}>
        <Button className={css.cancelbtn} onClick={() => cancel()}>
          Буцах
        </Button>
        <Button className={css.approvebtn} onClick={() => save()}>
          Хадгалах
        </Button>
      </div>
    </div>
  );
};

export default HighLight;
