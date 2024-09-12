import { stringify } from 'rc-field-form/es/useWatch';
import React, { useState, useEffect, useContext } from 'react';

function FMCG(props) {
  const order = props.data;
  // console.log("order", order.order_id);

  // console.log("props fmcg", props);

  let [loaded, setLoaded] = useState(false);
  let [tradeshopTerm, setTradeshopTerm] = useState(null);
  //const [bracket, setBracket] = useState(null);
  let grandtotal = 0;
  let [tradeShopID, setTradeShopID] = useState(null);
  let [totalPrice, setTotalPrice] = useState(null);
  let [termData, setTermData] = useState(null);
  // console.log("order", order);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      window.localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/merchants/tradeshop?tradeshop_id=` +
        props.data.tradeshop_id,
      requestOptions
    )
      .then(r => r.json())
      .then(response => {
        let tradeShopId = null;
        let termId = null;
        //setTermData(JSON.parse(response.price_list[0].price_list))
        response.tradeshop_codes.map(tc => {
          if (tc.supplier_id === order.supplier_id) {
            tradeShopId = tc.tradeshop_code;
            response.price_list.map(pl => {
              if (pl.supplier_id === order.supplier_id) {
                setTermData(JSON.parse(pl.price_list));
                // console.log(pl.price_list);
                const price_list = JSON.parse(pl.price_list);
                setTradeshopTerm(Object.keys(price_list)[0]);
                // console.log(Object.keys(price_list)[0]);
                setTradeShopID(tradeShopId);
                setLoaded(true);
              }
            });
          }
        });
      })
      .catch(error => console.log('error', error));
  }, []);
  const send = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'eb_token',
      'eb_cola_integration_05f60b8248eb98591c10ce996eedff0831db539ebe913f6531551299730f4a024a4707e7510ee2e9915c9e8bb1d8c18b558c4f76c765e6e3628705262f85fc9a'
    );
    myHeaders.append('Content-Type', 'application/json');
    let lines = [];
    order.line.map(l => {
      lines.push({
        Quantity: l.quantity,
        Price: l.price,
        SKU: l.product_sku.toString()
      });
    });
    let orderData = {
      delivery_date: document.getElementById('deliverydate').value,
      tradeshop_code: tradeShopID,
      payment_term_id: parseInt(tradeshopTerm, 10),
      line: lines
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(orderData),
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/api/cola/send_order`,
      requestOptions
    )
      .then(r => r.text())
      .then(response => {
        // console.log(response);
        if (response === 'success') {
          alert('Амжилттай илгээлээ');
        } else {
          alert('Аlдаа гарлаа');
        }
      })
      .catch(error => console.log('error', error));
  };

  ///// Нэг функц
  const sendMGAG = () => {
    // console.log(termData);

    var myHeaders = new Headers();
    myHeaders.append(
      'eb_token',
      'eb_anungoo_integration_05f60b8248eb98591c10ce996eedff0831db539ebe913f6531551299730f4a024a4707e7510ee2e9915c9e8bb1d8c18b558c4f76c765e6e3628705262f85fc9a'
    );
    myHeaders.append('Content-Type', 'application/json');
    let sectors = {};
    let terms = {};
    let skus = [];
    // console.log("anungoo order", order);
    order.line.map(l => {
      skus.push(l.product_sku);
      for (let term in termData) {
        if (termData[term].hasOwnProperty(l.product_sku)) {
          if (!terms[term]) {
            terms[term] = [];
            terms[term].push(l);
          } else {
            terms[term].push(l);
          }
        }
      }
    });
    let discountLines = [];

    // console.log("TERM DATA", termData);
    for (let term in terms) {
      // console.log("term HYEEE", term);

      // console.log("tradeShopID", tradeShopID);
      var myHeaders = new Headers();
      myHeaders.append(
        'eb_token',
        'eb_anungoo_integration_05f60b8248eb98591c10ce996eedff0831db539ebe913f6531551299730f4a024a4707e7510ee2e9915c9e8bb1d8c18b558c4f76c765e6e3628705262f85fc9a'
      );
      myHeaders.append('Content-Type', 'application/json');

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      //// Anungoo bracket tatah API

      let ebBazaarHeaders = new Headers();
      ebBazaarHeaders.append(
        'ebazaar_token',
        localStorage.getItem('ebazaar_admin_token')
      );
      ebBazaarHeaders.append('Content-Type', 'application/json');

      var ebBazaarHeadersOptions = {
        method: 'GET',
        headers: ebBazaarHeaders,
        redirect: 'follow'
      };
      let url = `${
        process.env.REACT_APP_API_URL2
      }/api/discounts?skus=${stringify(skus)}&tradeshop_code=${tradeShopID}`;

      fetch(url, ebBazaarHeadersOptions)
        .then(r => r.json())
        .then(res => {
          discountLines.push(...res);
        });

      fetch(
        `${process.env.REACT_APP_API_URL}/api/AGMG/bracket?tradeshop_code=${tradeShopID}&term_id=${term}`,
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          let sectorId = null;

          let lines = [];
          //// Belegtei esehiig bodoh
          ////  order.line=>data
          /// discountLines => data
          // console.log("orderlines", order.line);

          let prod = [];
          let promoProd = [];
          let promoRaw = [];
          let giftRaw = [];
          let giftRawNew = [];

          if (discountLines) {
            order.line.map(item => {
              // console.log("order item", item);
              discountLines.map(d => {
                if (d) {
                  let aaa = d.skus.includes(item.product_sku);
                  if (aaa) {
                    prod.push(item);
                  }

                  // if (aaa && prod.length === 0) {
                  //   prod.push(item);
                  // } else if (aaa && prod.length !== 0) {
                  //   prod.map((it) => {
                  //     if (it.order_id !== item.order_id) {
                  //       prod.push(item);
                  //     }
                  //   });
                  // }
                }
              });
            });

            // console.log("prod promo - type", prod);
            // console.log("discountLines", discountLines);

            if (discountLines) {
              discountLines.map(it => {
                let discountData;
                if (it.discount_data.type === 'percent') {
                  let bbb; ///// tuhain order-iig abch bn
                  let ccc; //// promo conditions abch bn
                  let aaa; ///// tuhain promo olgoh bolomjtoi esehiig shalgaj bn. 0 bol olgohgui, 1-ees ih bol olgono.
                  let orderArr = [];
                  it.conditions.map(x => {
                    order.line.map(xy => {
                      if (x.sku === xy.product_sku) {
                        // bbb = xy;
                        orderArr.push(xy);
                        ccc = x;
                        discountData = it.discount_data;
                      }
                    });
                  });
                  console.log('bbb-orderiig abch bn', bbb);
                  console.log('orderArr abch bn', orderArr);
                  console.log('ccc', ccc);
                  let eeea = orderArr.map(it => {
                    let aa = 0;
                    aa = aa + it.quantity;
                    return aa;
                  });
                  bbb = eeea[0];
                  // console.log("eee", eeea);
                  aaa = Math.floor(bbb / ccc.threshold_qty);
                  // console.log("aaa", aaa);
                  // console.log("discountData", discountData);

                  ///// Hervee promo bielj baibal tuhain orderiin uniig percent-eer hymdruulj bn.
                  if (aaa > 0) {
                    order.line.map(l => {
                      if (l.product_sku === ccc.sku) {
                        let newPrice = l.price;

                        // newPrice = newPrice * discountData.value;
                        // newPrice = newPrice / 100;
                        // l.price = Math.ceil(l.price) - Math.floor(newPrice);
                      }
                    });
                    ////// Promo uusgej bn
                    promoRaw.push({
                      price_factor_details_item_id:
                        discountData.price_factor_details_item_id,
                      compensation_type: discountData.compensation_type,
                      discount_qty: 1
                    });
                  }
                } else if (it.discount_data.type === 'gift') {
                  let bbb; ///// tuhain order-iig abch bn
                  let zzz = []; ///// Promo-toi orderiig ylgaj abch bn
                  let ccc; //// promo conditions abch bn
                  let aaa = 0; ///// tuhain promo olgoh bolomjtoi esehiig shalgaj bn. 0 bol olgohgui, 1 bol 1 udaa, 2 bol 2 udaa , 3 bol 3 udaa
                  let too = 0;
                  order.line.map(x => {
                    let kkkk = it.skus.includes(x.product_sku);

                    if (kkkk) {
                      zzz.push(x);

                      too = too + Number(x.quantity);
                    }
                  });
                  // console.log("too", too);
                  // console.log("promotoi order zzz", zzz);
                  it.conditions.map(x => {
                    if (x.is_gift === false) {
                      if (too > x.threshold_qty) {
                        aaa = Math.floor(too / x.threshold_qty);
                      }
                    }
                  });
                  // console.log("aaa", aaa);
                  if (aaa > 0) {
                    it.conditions.map(x => {
                      if (x.is_gift === true) {
                        giftRawNew.push({
                          ...x,
                          quantity: aaa
                        });
                      }
                    });
                  }
                  // console.log("giftRawNew", giftRawNew);
                  let newArr = [];
                  if (giftRawNew.length > 1) {
                    giftRawNew.filter(it => {
                      if (newArr.length === 0) {
                        newArr.push(it);
                      }
                      if (newArr.length !== 0) {
                        newArr.map(x => {
                          if (x.sku === it.sku) {
                            x.quantity =
                              x.quantity > it.quantity
                                ? x.quantity
                                : it.quantity;
                          }
                          if (x.sku !== it.sku) {
                            newArr.push(it);
                          }
                        });
                      }
                    });
                  }
                  // console.log("newarr", newArr);
                  if (aaa > 0) {
                    promoRaw.push({
                      price_factor_details_item_id:
                        it?.discount_data?.price_factor_details_item_id,
                      compensation_type: it.discount_data.compensation_type,
                      discount_qty: aaa ? aaa : 0
                    });

                    ////// Gift uusgej bn

                    it.conditions.map(ix => {
                      if (ix.is_gift === true) {
                        giftRaw.push({
                          Quantity: aaa,
                          Price: 0,
                          SKU: ix.sku,
                          DiscountPrice: 0
                        });
                      }
                    });

                    if (giftRaw.length > 1) {
                      giftRaw.filter(it => {
                        // console.log("it", it);
                        if (giftRawNew.length === 0) {
                          giftRawNew.push(it);
                        } else if (giftRawNew.length !== 0) {
                          giftRawNew.map(x => {
                            if (x.SKU === it.SKU) {
                              x.Quantity =
                                x.Quantity > it.Quantity
                                  ? x.Quantity
                                  : it.Quantity;
                            }
                            if (x.SKU !== it.SKU) {
                              giftRawNew.push(it);
                            }
                          });
                        }
                      });
                    }
                    // console.log("giftRawNew", giftRawNew);
                    too = 0;
                  }
                }
              });
            }
          }
          ///// bracket bodoj ehleh

          const bracket = result.data;

          let TotalPrices = 0;
          // console.log("terms", terms);
          terms[term].map(t => {
            TotalPrices += t.quantity * t.price;
          });

          bracket?.sort(function (a, b) {
            return b.PriceTypeID - a.PriceTypeID;
          });
          terms[term].map(sectorLines => {
            for (let i = 0; i < bracket.length; i++) {
              if (TotalPrices > bracket[i].Bracket) {
                let Price = sectorLines.price * bracket[i].Value;
                sectorLines.DiscountPrice = Math.ceil(Price);
                sectorLines.DiscountPrice = Price;
                break;
              }
            }

            lines.push({
              Quantity: sectorLines.quantity,
              DiscountPrice: sectorLines.price,
              SKU: parseInt(sectorLines.product_sku),
              Price:
                sectorLines.DiscountPrice > 0
                  ? sectorLines.DiscountPrice
                  : sectorLines.price
            });

            sectorId = sectorLines.sector_id;
            // console.log("sectorId", sectorId);
          });

          let orderData =
            discountLines.length !== 0
              ? {
                  delivery_date: document.getElementById('deliverydate').value,
                  tradeshop_code: tradeShopID,
                  payment_term_id: parseInt(term, 10),
                  sector_id: parseInt(sectorId, 10),
                  line: lines
                  ////// Shineer nemeb хямдралын бүтээгдэхүүн нэмж байна

                  // promo: [...promoRaw],
                  // gifts: [...giftRawNew],

                  ////// Duusab
                }
              : {
                  delivery_date: document.getElementById('deliverydate').value,
                  tradeshop_code: tradeShopID,
                  payment_term_id: parseInt(term, 10),
                  sector_id: parseInt(sectorId, 10),
                  line: lines
                };
          // console.log(orderData);
          // var requestOptions = {
          //   method: "POST",
          //   headers: myHeaders,
          //   // body: JSON.stringify(orderData),
          //   body: JSON.stringify({
          //     order_id: order.order_id,
          //   }),

          //   redirect: "follow",
          // };

          // console.log("requestOptions anungoo market gate", requestOptions);

          // fetch(`${process.env.REACT_APP_API_URL}/api/AGMG/send_order`, requestOptions)
          //   .then((r) => r.text())
          //   .then((response) => {
          //     let res = JSON.parse(response);
          //     // console.log("res", res);
          //     if (response === "success") {
          //       // console.log("Амжилттай илгээлээ");
          //       alert("Амжилттай илгээлээ.");
          //     } else if (res.inserted_line) {
          //       alert(`${res.inserted_line} барааны захиалга үүслээ.`);
          //     } else if (res.error === 404) {
          //       alert("Хувиарлах ХТ эсвэл түгээгч олдсонгүй.");
          //     } else {
          //       alert("Алдаа гарлаа. Илгээж чадсангүй.");
          //     }
          //   })
          //   .catch((error) => console.log("error", error));
        })
        .catch(error => console.log('error', error));
    }

    //// Shine order sent
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      // body: JSON.stringify(orderData),
      body: JSON.stringify({
        order_id: order.order_id
      }),

      redirect: 'follow'
    };
    var backOfficeLog = {
      method: 'POST',
      headers: myHeaders,
      // body: JSON.stringify(orderData),
      body: JSON.stringify({
        section_name: 'Анунгоо маркет гейт захиалга илгээх',
        entry_id: props.data.user_id,
        user_name: 'Ganpurev',
        action: 'Анунгоо маркет гейт захиалга илгээв.'
      }),

      redirect: 'follow'
    };

    // console.log("requestOptions anungoo market gate", requestOptions);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/create/backofficelog`,
      backOfficeLog
    )
      .then(r => r.json())
      .then(response => {
        console.log('backoffice response', response);
      })
      .catch(error => {
        console.log('backoffice error', error);
      });

    fetch(
      `${process.env.REACT_APP_API_URL}/api/AGMG/send_order`,
      requestOptions
    )
      .then(r => r.text())
      .then(response => {
        // let res = JSON.parse(response);
        // console.log("res", res);
        if (response === 'success') {
          // console.log("Амжилттай илгээлээ");
          alert('Амжилттай илгээлээ.');
        } else {
          alert(`Message. ${response}`);
        }

        // else if (res.inserted_line) {
        //   alert(`${res.inserted_line} барааны захиалга үүслээ.`);
        // } else if (res.error === 404) {
        //   alert("Хувиарлах ХТ эсвэл түгээгч олдсонгүй.");
        // } else {
        //   alert("Алдаа гарлаа. Илгээж чадсангүй.");
        // }
      })
      .catch(error => console.log('error', error));
    ///// Shine order duusab
  };
  const OrderHandler = () => {
    sendMGAG();
  };
  const orderHandler1217 = () => {
    send();
  };
  let renderHTML =
    loaded && tradeshopTerm ? (
      <div>
        <h1>Захиалга илгээх</h1>
        <span className='close' onClick={() => props.setFmcg()}>
          Close
        </span>
        <label>TradeshopID</label>
        <input type='text' defaultValue={tradeShopID} disabled />
        <label>Хүргэлтийн өдөр</label>
        <input
          type='date'
          defaultValue={order.delivery_date.substr(0, 10)}
          id='deliverydate'
        />
        {props.data.supplier_id === 1217 ? (
          <button onClick={orderHandler1217}>Хадгалах</button>
        ) : (
          <button onClick={OrderHandler}>Хадгалах</button>
        )}
      </div>
    ) : null;
  return (
    <div id='bg'>
      <div id='foo'>
        {props.data.register === '#N/A' && (
          <div
            onClick={() => props.setFmcg(false)}
            style={{
              cursor: 'pointer',

              display: 'flex',
              justifyContent: 'flexEnd',
              width: '100%'
            }}
          >
            <span style={{ fontSize: '24px' }}>x</span>
          </div>
        )}

        {renderHTML}
      </div>
    </div>
  );
}

export default FMCG;
