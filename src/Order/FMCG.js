import { stringify } from 'rc-field-form/es/useWatch';
import React, { useState, useEffect, useContext } from 'react';

function FMCG(props) {
  const order = props.data;

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
        // console.log("response++++1111", response);
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
                console.log(Object.keys(price_list)[0]);
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
          console.log('bracket bracket ', res);
          discountLines.push(...res);
        });

      fetch(
        `${process.env.REACT_APP_API_URL}/api/AGMG/bracket?tradeshop_code=${tradeShopID}&term_id=${term}`,
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          // console.log("result+++++ trade_shop id", result);
        });
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

    let backHeader = new Headers();
    backHeader.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    backHeader.append('Content-Type', 'application/json');

    var backOfficeLog = {
      method: 'POST',
      headers: backHeader,
      body: JSON.stringify({
        section_name: 'Анунгоо МаркетГейт захиалга',
        entry_id: props.userData.id,
        user_name: props.userData.email,
        action: 'Анунгоо МаркетГейт захиалга илгээв'
      }),
      redirect: 'follow'
    };
    // console.log("props.userData", props.userData.email);

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/create/backofficelog`,
      backOfficeLog
    )
      .then(r => r.json())
      .then(response => {
        console.log('backoffice response');
      })
      .catch(error => {
        console.log('backoffice error', error);
      });
    // console.log("requestOptions anungoo market gate", requestOptions);
    fetch(
      `${process.env.REACT_APP_API_URL}/api/AGMG/send_order`,
      requestOptions
    )
      .then(r => r.text())
      .then(response => {
        console.log('anungoo market gate response', response);
        alert(`Захиалга ${response}.`);
        // if (response === "success") {
        //   // console.log("Амжилттай илгээлээ");
        //   alert("Амжилттай илгээлээ.");
        // } else {
        //   alert(`Message. ${response}`);
        // }

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
  console.log('loaded', loaded);
  console.log('tradeshopterm', tradeshopTerm);
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
          <button onClick={OrderHandler}>Илгээх</button>
        )}
      </div>
    ) : null;
  return (
    <div id='bg' style={{ zIndex: '150' }}>
      <div id='foo'>
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

        {renderHTML}
      </div>
    </div>
  );
}

export default FMCG;
