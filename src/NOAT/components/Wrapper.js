import React, { useState, useEffect, useContext } from "react";
import css from "./wrapper.module.css";
// import myHeaders from "../../components/MyHeader/myHeader";
import Modal from "../Modal/Modal";
import AppHook from "../../Hooks/AppHook";
import { Company } from "../NoatCompany";

const Wrapper = (props) => {
    let bar = 123
  // console.log(myHeaders);
  const [totalAmount, setTotalAmount] = useState(null);
  const [noatAmount, setNoatAmount] = useState(null);
  const [nxatAmount, setNxatAmount] = useState(null);
  const [stockLine, setStockLine] = useState([]);
  const [statusChange, setStatusChange] = useState(false);
  const [btndisabled, setBtndisabled] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shineMonth, setShineMonth] = useState(null);
  const [newYear, setNewYear] = useState(null);
  const [newMonth, setNewMonth] = useState(null);
  const [newDay, setNewDay] = useState(null);
  const noatctx = useContext(AppHook);

  let myHeaders = new Headers();
  myHeaders.append(
    "ebazaar_token",
    localStorage.getItem("ebazaar_admin_token")
  );
  myHeaders.append("Content-Type", "application/json");

  const TotalHandler = (e) => {
    setTotalAmount(e.target.value);
  };
  const noatHandler = (e) => {
    setNoatAmount(e.target.value);
  };
  const nxatHandler = (e) => {
    setNxatAmount(e.target.value);
  };
  useEffect(() => {







    setOrderData(props.item);
    let newdate = new Date();
    const newday = newdate.getDate();

    // console.log("dayayyayaa", newdate);
    let newMonth = newdate.getMonth();
    let newYear = newdate.getFullYear();
    setNewYear(newYear);
    setNewMonth(newMonth);
    setNewDay(newday);
    let totalAmountOrig = 0;
    let alcoholAmongOrig = 0;
    let noatAmountOrig = 0;
    props.item.line.map((x) => {
      ////// x.city_tax =>True gej baisaniig x.alcohol === true gej solib

        if (x.alcohol) {
          alcoholAmongOrig += (x.price.toFixed(2) * x.quantity.toFixed(2)) / 56;
          totalAmountOrig += x.price.toFixed(2) * x.quantity.toFixed(2);

          noatAmountOrig += (x.price.toFixed(2) * x.quantity.toFixed(2)) / 11.2;
        } else {
          totalAmountOrig += x.price.toFixed(2) * x.quantity.toFixed(2);
          noatAmountOrig += (x.price.toFixed(2) * x.quantity.toFixed(2)) / 11;
        }

    });
    //setTotalAmount(Number(totalAmountOrig.toFixed(2)));
    setTotalAmount(Number(totalAmountOrig.toFixed(2)));
    setNoatAmount(Number(noatAmountOrig.toFixed(2)));
    // setNoatAmount(Number(totalAmount / 11).toFixed(2));
    setNxatAmount(Number(alcoholAmongOrig.toFixed(2)));

    let vat = props.item.vat;
    vat = null;
    if (vat !== "НӨАТ шивсэн") {
      let data = JSON.parse(vat ? vat : null);

      setStatusChange(data?.sent);
    } else {
      setStatusChange(true);
    }



        let _city = 0
    let _total = 0
    let _noat = 0
    let x = 0
    if(props.item.coupon_amount) {
        console.log('99!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        props.item.line.map((item) => {
            x = item.quantity.toFixed(2) * item.price.toFixed(2);
            x = x - (x / totalAmountOrig * props.item.coupon_amount) //tempVat += x/
            if (item.alcohol) {
                _city += x / 56;
                _total += x;

                _noat += x / 11.2;
            } else {
                _total += x
                _noat += x / 11;
            }
        })
            setTotalAmount(Number(_total.toFixed(2)));
                setNoatAmount(Number(_noat.toFixed(2)));
                // setNoatAmount(Number(totalAmount / 11).toFixed(2));
                setNxatAmount(Number(_city.toFixed(2)));
    };
    console.log(props.item)
    console.log('---------------------------------------------------------------------------------------------------------------------------------------')
            console.log(_city  + ' and ' +  _total + ' and ' +  _noat)






  }, [props.item]);

  const SendTwoHandler = () => {
    setBtndisabled(true);

    let myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    myHeaders.append("Content-Type", "application/json");


    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    console.log("props.userData.company_id", props.userData.company_id);

    let registerCompany = "";

    registerCompany = Company[props.userData.company_id];
    if (registerCompany === "") {
      alert("Таны бүртгэлтэй компаны олдохгүй байна");
      return;
    }

    fetch(
      `https://api2.ebazaar.mn/api/orders?id=${props.item.order_id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("response", res);
        let approve = true;
        if (res.data[0].vat !== null) {
          if (
            !window.confirm(
              "Энэ баримт НӨАТ шивэгдсэн байна. Та дахин НӨАТ илгээхдээ итгэлтэй байна уу"
            )
          ) {
            approve = false;
          }
        }

        if (approve) {
          let aa = orderData;
          aa.vat = `{\"sent\":true,\"amount\":\"0.00\",\"vat\":\"0.00\",\"cashAmount\":\"0.00\",\"nonCashAmount\":\"0.00\",\"billIdSuffix\":\"\",\"billType\":\"0\",\"stocks\":[{\"code\":\"0\",\"name\":\"Nongshim117\",\"measureUnit\":\"ш\",\"qty\":\"0.00\",\"unitPrice\":\"0.00\",\"totalAmount\":\"0.00\",\"vat\":\"5236.36\",\"barCode\":\"6920238083016\",\"cityTax\":\"0.00\"},{\"code\":\"556173\",\"name\":\"Nongshim120\",\"measureUnit\":\"ш\",\"qty\":\"0.00\",\"unitPrice\":\"0.00\",\"totalAmount\":\"0.00\",\"vat\":\"0.00\",\"barCode\":\"6920238082019\",\"cityTax\":\"0.00\"},{\"code\":\"556170\",\"name\":\"Nongshim120\",\"measureUnit\":\"ш\",\"qty\":\"20.00\",\"unitPrice\":\"0.00\",\"totalAmount\":\"0.00\",\"vat\":\"0.00\",\"barCode\":\"6920238082064\",\"cityTax\":\"0.00\"},{\"code\":\"551158\",\"name\":\"OttogiJinRamenMild12020\",\"measureUnit\":\"ш\",\"qty\":\"0.00\",\"unitPrice\":\"0.00\",\"totalAmount\":\"0.00\",\"vat\":\"0.0\",\"barCode\":\"8801045999906\",\"cityTax\":\"0.00\"}],\"customerNo\":\"ЧТ76022383\",\"cityTax\":\"0.00\",\"bankTransactions\":null,\"districtCode\":\"24\",\"posNo\":\"1000\",\"taxType\":\"1\",\"registerNo\":\"6388094\",\"reportMonth\":\"2023-03\"}"`;
          setOrderData(aa);

          let registerCheckUrl = `https://api2.ebazaar.mn/api/ebarimt/merchant/info?regno=${props.item.register.toUpperCase()}`;

          fetch(registerCheckUrl, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          })
            .then((res) => res.json())
            .then((res) => {
              console.log("response register check", res);
              if (res.found == true) {
                noatctx.setNoatCheck(true);
                let stockLinesArray = [];

                let tot = 0;
                let bb = 0;
                let ORDERTOTAL = 0
                  let totalAmountOrig = 0
                                  let _total = 0
                let _noat = 0
                let _city = 0
      props.item.line.map((x) => {
        totalAmountOrig += x.price.toFixed(2) * x.quantity.toFixed(2);
    });
                console.log('ORDERTOTAL ================================================ ' + totalAmountOrig)

                props.item.line.map((item) => {
                  console.log(item)
                  let x;
                  let wat = 0;
                  let perVat1;
                  let perVat2;
                  x = item.quantity.toFixed(2) * item.price.toFixed(2);




                  console.log('x before coupone' + x)
                  let tempVat = 0
                  let tempCity = 0

                if(props.item.coupon_amount) {// MAIN COUPON LOGIC discount=product/total order*coupon
                    x = x - (x / totalAmountOrig * props.item.coupon_amount) //tempVat += x/
                    if (item.alcohol) {
                        _city += x / 56;
                        _total += x;

                        _noat += x / 11.2;
                    } else {
                        _total += x
                        _noat += x / 11;
                    }
                } else {
                    //x = totalAmountOrig//tempVat += x/
                    if (item.alcohol) {
                        _city += x / 56;
                        _total += x;

                        _noat += x / 11.2;
                    } else {
                        _total += x
                        _noat += x / 11;
                    }
                }
                  console.log('x after coupone' + x)
                  tot = tot + x;
                  if (item.city_tax) {
                    bb = (x / 56).toFixed(2);
                    wat = (x / 11.2).toFixed(2);
                  } else {
                    bb = "0.00";
                    wat = (x / 11).toFixed(2);
                  }

                  wat = wat.toString();

                  let newprice;
                  if (wat.includes(".")) {
                    perVat1 = wat.split(".")[0];
                    perVat2 = wat.split(".")[1].slice(0, 2);
                    newprice = `${perVat1}.${perVat2}`;
                  } else {
                    newprice = `${wat}.00`;
                  }
                  ////50мл/32ш\"\"
                  let unitNewPrice = x / item.quantity

                  stockLinesArray.push({
                    code: item.product_id.toString(),
                    name: item.product_name.replace(/\//g, ""),
                    measureUnit: "ш",
                    qty: item.quantity.toFixed(2).toString(),
                    unitPrice: unitNewPrice.toFixed(2).toString(),
                    totalAmount: x.toFixed(2).toString(),
                    vat: `${newprice}`,
                    barCode: `${
                      item.product_bar_code
                        ? item.product_bar_code
                        : item.product_sku
                    }`.toString(),
                    cityTax: bb.toString(),
                  });
                });


                //setTotalAmount(_total)

                setStockLine(stockLinesArray);

                let shineSar = shineMonth !== null ? shineMonth : newMonth;


                let mainRaw = {
                  amount: _total.toFixed(2).toString(),
                  vat: _noat.toFixed(2).toString(),
                  cashAmount: _total.toFixed(2).toString(),
                  nonCashAmount: "0.00",
                  billIdSuffix: "",
                  // billType: checked ? "1" : "3",
                  billType: "3",
                  stocks: stockLinesArray,
                  customerNo: props.item.register.toUpperCase(),
                  cityTax: _city.toFixed(2).toString(),
                  bankTransactions: null,
                  districtCode: "24",
                  posNo: "1000",
                  taxType: "1",
                  registerNo: registerCompany.toString(),
                  reportMonth: `2024-02`,
                };
                let mainRawMonth = {
                  amount: _total.toFixed(2).toString(),
                  vat: _noat.toFixed(2).toString(),
                  cashAmount: _total.toFixed(2).toString(),
                  nonCashAmount: "0.00",
                  billIdSuffix: "",
                  // billType: checked ? "1" : "3",
                  billType: "3",
                  stocks: stockLinesArray,
                  customerNo: props.item.register.toUpperCase(),
                  cityTax: _city.toFixed(2).toString(),
                  bankTransactions: null,
                  districtCode: "24",
                  posNo: "1000",
                  taxType: "1",
                  registerNo: registerCompany.toString(),
                  // reportMonth: `${newYear}-${
                  //   shineSar < 10 ? "0" + shineSar : shineSar
                  // }`,
                };
                if(props.item.coupon_amount) {
                  console.log(mainRawMonth)
                  console.log(mainRawMonth)
                }

                let newRequestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  redirect: "follow",
                  // mode: "no-cors",
                  body: JSON.stringify({
                    orderId: props.item.order_id,
                    register: registerCompany.toString(),
                    body: newDay > 7 ? mainRawMonth : mainRaw,
                  }),
                };
                  console.log('SEND BLOCK%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
                  console.log(newDay > 7 ? mainRawMonth : mainRaw)

                //*******************************************************************************************************************
                /////////// NOAT-iin server luu ilgeej bn
                let newUrl = `https://api2.ebazaar.mn/api/ebarimt/barimt`;
                fetch(newUrl, newRequestOptions)
                  .then((res) => res.json())
                  .then((res) => {
                    console.log("res barimt burtgehed response", res);

                    if (res.data.errorCode) {
                      alert(
                        `Баримт үүсгэхэд алдаа гарлаа. ${res.data.message}`
                      );

                      noatctx.setOrderID(null);
                      return;
                    }

                                          if (res.code === 200) {
                                            let url = `https://api2.ebazaar.mn/api/order/vatupdate`;
                                            fetch(url, {
                                              method: "POST",
                                              headers: myHeaders,
                                              redirect: "follow",

                                              body: JSON.stringify({
                                                order_id: props.item.order_id,
                                                vat_data: JSON.stringify({
                                                  sent: true,
                                                  ...res.data,
                                                }),
                                              }),
                                            })
                                              .then((r) => r.json())
                                              .then((response) => {
                                                console.log("response second vat", response);
                                                noatctx.setNoatCheck(false);

                                                let aaa = props.orders.map((item) => {
                                                  if (item.order_id === props.item.order_id) {
                                                    return {
                                                      ...item,
                                                      vat: JSON.stringify({
                                                        sent: true,
                                                      }),
                                                    };
                                                  }
                                                  return item;
                                                });

                                                props.setOrders(aaa);
                                                setBtndisabled(false);
                                                noatctx.setOrderID(null);
                                                alert(`Амжилттай НӨАТ шинэчлэлээ.`);
                                              })
                                              .catch((error) => {
                                                console.log("vat sender error", error);
                                              });
                                          }
                  }) //*******************************************************************************************************************
                  .catch((error) => {
                    console.log("error fetch ebarimt  ", error);
                  });
              } else if (res.found === false) {
                alert("Регистерийн дугаар олдсонгүй");
                return;
              }
              if (res.error) {
                alert("Харилцагч олдсонгүй");
              }
            })
            .catch((error) => {
              console.log("register check error", error);
            });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const ModalOpenHandler = () => {
    if (newDay <= 7) {
      setModalOpen(true);
    }
  };
  //const couponAmount = props.item.coupon_amount ? 

  let totalAmountOrig = 0
  if(props.item.coupon_amount) {

      props.item.line.map((x) => {
        totalAmountOrig += x.price.toFixed(2) * x.quantity.toFixed(2);
    });
          console.log('++++++++++++++++++++++++++++++++++++')
    console.log(totalAmountOrig + ' and ' + props.item.coupon_amount)
    const percentage = ((props.item.coupon_amount * 100) / totalAmountOrig).toFixed(2)
    console.log('----------' + (totalAmountOrig - (totalAmountOrig / 100 * percentage)))
  }
  return (
    <div
      className={css.wrapper}
      style={{
        background: statusChange ? "#FFFAF2" : "#fff",
        border: statusChange ? "1.2px solid #FFA600" : "1px solid #ECEFF1",
      }}
    >
      <div>
        <div className={css.headerwrapper}>
          <div className={css.headerOne}>
            <h4 className={css.htwo}>{props.item.tradeshop_name}</h4>
            {props.item.vat === null && (
              <button className={css.buttonone}>Илгээгээгүй</button>
            )}
            {props.item.vat !== null && (
              <button className={css.buttontowwww}>Илгээсэн</button>
            )}
          </div>
          <div className={css.headerOne}>
            <h4 className={css.hone}>
              Захиалгын дугаар: {props.item.order_id}
            </h4>
            <h4 className={css.hone}>ТТД: {props.item.register}</h4>
          </div>
        </div>
        <div style={{margin: '1rem 0', background: props.item.coupon_amount ? 'brown' : '#ccc', borderRadius: '3px', padding: '0 .25rem'}}>
          <span style={{fontSize: '11px', color: props.item.coupon_amount ? 'white' : ''}}>Coupon: {props.item.coupon_amount ? props.item.coupon_amount : '--------------------'}</span>
        </div>
        <div className={css.productwrapper}>
          <div className={css.productheader}>
            <span className={css.baraa}>Бүтээгдэхүүн нэр</span>
            <span className={css.qt}>Т/Ш</span>
            <span className={css.price}>Үнэ</span>
            <span className={css.total}>Нийт</span>
            <span className={css.nxat}>НӨАТ</span>
            <span className={css.noat}>НХАТ</span>
          </div>
          <div className={css.bothhhh}>
            {props.item.line.map((x, index) => {

              let totalPrice = x.price.toFixed(2) * x.quantity.toFixed(2);
              let realTotalPrice  = x.price.toFixed(2) * x.quantity.toFixed(2);
              console.log(props.item.order_id + 'total is ' + totalPrice)

             //
                if(props.item.coupon_amount) {
                  totalAmountOrig = 0

                    props.item.line.map((x) => {
                      totalAmountOrig += x.price.toFixed(2) * x.quantity.toFixed(2);
                  });
                        //console.log('++++++++++++++++++++++++++++++++++++')
                  //console.log(totalAmountOrig + ' and ' + props.item.coupon_amount)
                  //const percentage = ((props.item.coupon_amount * 100) / totalPrice).toFixed(2)
                  console.log('---------- --- totalAmountOrig ' + totalAmountOrig)
                  console.log('---------- --- coupon ' + props.item.coupon_amount)
                  console.log(totalPrice)
                  totalPrice = totalPrice - (totalPrice/totalAmountOrig*props.item.coupon_amount)
                  console.log(totalPrice)
                }
              //

              let noatPrice = 0;
              let realNOAT = 0
              let nxatPrice = 0;
              if (x.alcohol) {
                nxatPrice = (totalPrice / 56).toFixed(2);
                nxatPrice = nxatPrice.toLocaleString() + "₮";
                noatPrice = (totalPrice / 11.2).toFixed(2);
                realNOAT = (realTotalPrice / 11.2).toFixed(2);
              } else {
                noatPrice = (totalPrice / 11).toFixed(2);
              }
              return (
                <div className={css.oneorderwrapper} key={index}>
                  <span
                    className={css.baraa}
                    style={{
                      marginRight: "5px",
                    }}
                  >
                    {x.product_name}
                  </span>
                  <span className={css.qt}>{x.quantity}ш</span>
                  <span className={css.price} style={{ marginRight: "5px" }}>
                    {x.price.toLocaleString()}₮
                  </span>
                  <span className={css.total} style={{ marginRight: "5px" }}>
                    {totalPrice.toLocaleString()}₮
                  </span>
                  <span className={css.nxat} style={{ marginRight: "5px" }}>
                    {noatPrice.toLocaleString()}₮
                  </span>
                  <span
                    className={css.noat}
                    style={{
                      color: "#58cf92",
                      fontWeight: "700",
                    }}
                  >
                    {nxatPrice !== 0 ? nxatPrice : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={css.bottomcss}>
        <div className={css.inputwrapper}>
          <div className={css.inputOne}>
            <span>Нийт захиалгын дүн</span>
            <input value={totalAmount} onChange={TotalHandler} type="number" />
          </div>
          <div className={css.inputOne}>
            <span>НӨАТ дүн</span>
            <input value={noatAmount} onChange={noatHandler} type="number" />
          </div>
          <div className={css.inputOne}>
            <span>НХАТ</span>
            <input value={nxatAmount} onChange={nxatHandler} type="number" />
          </div>
        </div>
        <div className={css.buttonwrapper}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "#37474f",
            }}
          >
            {props.item.order_date.split("T")[0]}
          </span>
          {orderData && orderData?.vat === null && (
            <button
              // onClick={sendHandler}
              // onClick={SendTwoHandler}
              onClick={newDay <= 7 ? ModalOpenHandler : SendTwoHandler}
              disabled={btndisabled ? true : false}
              className={
                btndisabled ? css.confirmbuttondisabled : css.confirmbutton
              }
            >
              Илгээх
            </button>
          )}
          {orderData && orderData?.vat !== null && (
            <button
              // onClick={sendHandler}
              disabled={btndisabled ? true : false}
              className={css.repeatCornifm}
              onClick={newDay <= 7 ? ModalOpenHandler : SendTwoHandler}
            >
              Дахин илгээх
            </button>
          )}
        </div>
      </div>

      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          SendTwoHandler={SendTwoHandler}
          newMonth={newMonth}
          setShineMonth={setShineMonth}
        />
      )}
    </div>
  );
};

export default Wrapper;
