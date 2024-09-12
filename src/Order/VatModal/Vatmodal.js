import React, { useState, useEffect } from 'react';
import css from './vatmodal.module.css';
import closeBtn from '../../assets/close.svg';
import myHeaders from '../../components/MyHeader/myHeader';
import Item from 'antd/lib/list/Item';

const Vatmodal = props => {
  const [totalprice, setTotalprice] = useState('');
  const [noat, setNoat] = useState('');
  const [nxat, setNxat] = useState('');
  const [vatCompany, setVatCompany] = useState(null);
  const [stockLine, setStockLine] = useState([]);
  const [btndisabled, setBtndisabled] = useState(true);

  let aaa = props.data.line?.map(item => {
    let bbb = item.quantity * item.price;
    let ccc = bbb / 11;
    ccc = ccc.toString();
    console.log('ccc', ccc);
    if (ccc.includes('.')) {
      let smallPrice1 = ccc.split('.')[0];
      let smallPrice2 = ccc.split('.')[1]?.slice(0, 2);
      ccc = `${smallPrice1}.${smallPrice2}`;
    } else {
      ccc = `${ccc}.00`;
    }

    let ddd = 0;
    if (item.city_tax111 === true) {
      ddd = (bbb * 0.01).toFixed(2);
    } else {
      ddd = 0;
    }
    let eee;
    if (ddd !== 0) {
      eee = ddd.toLocaleString();
      eee = `${eee}₮`;
    }

    return (
      <tr>
        <td className={`${css.header} ${css.headertwo}`}>
          {item.product_name} / {item.product_sku}
        </td>
        <td>{item.product_sku}</td>
        <td>{item.quantity}ш</td>
        <td>{bbb.toLocaleString()}₮</td>
        <td>{ccc.toLocaleString()}₮</td>
        <td>{eee}</td>
      </tr>
    );
  });
  useEffect(() => {
    let tot = 0;
    let bb = null;

    let stockLinesArray = [];
    props.data.line.map(item => {
      let x;
      let wat = 0;
      let perVat1;
      let perVat2;
      x = item.quantity * item.price;
      tot = tot + x;
      if (item.city_tax === true) {
        bb = (tot * 0.01).toFixed(2);
      }
      wat = x / 11;
      wat = wat.toString();

      let newprice;
      if (wat.includes('.')) {
        perVat1 = wat.split('.')[0];
        perVat2 = wat.split('.')[1].slice(0, 2);
        newprice = `${perVat1}.${perVat2}`;
      } else {
        newprice = `${wat}.00`;
      }
      ////50мл/32ш\"\"
      stockLinesArray.push({
        code: item.product_id.toString(),
        name: item.product_name.replace(/\W/g, ''),
        measureUnit: 'ш',
        qty: item.quantity.toFixed(2).toString(),
        unitPrice: item.price.toFixed(2).toString(),
        totalAmount: x.toFixed(2).toString(),
        vat: `${newprice}`,
        barCode: `${
          item.product_bar_code ? item.product_bar_code : item.product_sku
        }`.toString(),
        cityTax: '0.00'
      });
    });
    setTotalprice(tot.toFixed(2));
    setStockLine(stockLinesArray);

    let aa = tot / 11;
    aa = aa.toString();
    let xxx;
    let yyy;
    if (aa.includes('.')) {
      xxx = aa.split('.')[0];
      yyy = aa.split('.')[1]?.slice(0, 2);
    } else {
      xxx = aa.split('.')[0];
      yyy = '00';
    }

    // setNoat(aa.toFixed(2));
    setNoat(`${xxx}.${yyy}`);

    // setNxat(bb);
    if (props.data.register === null || props.data.register === undefined) {
      alert(`Та байгууллагын регистерийн дугаарыг шалгана уу ...`);
      return;
    }
    fetch(
      `http://info.ebarimt.mn/rest/merchant/info?regno=${props.data.register}`,
      {
        method: 'GET'
      }
    )
      .then(r => r.json())
      .then(response => {
        if (response.found) {
          setVatCompany(response);
          response.found ? setBtndisabled(false) : setBtndisabled(false);
        }
      });
  }, [props]);

  const onApproveHandler = () => {
    if (vatCompany.found === false) {
      alert('Та татвар төлөгч биш байна.');
      return;
    }
    // if (totalprice.includes(".") && noat.includes(".")) {
    //   alert("Нийт үнэ, НӨАТ таслалаас хойш 2 оронтой байх хэрэгтэй.");
    //   return;
    // }
    let mainRaw = {
      amount: totalprice.toString(),
      vat: noat.toString(),
      cashAmount: totalprice.toString(),
      nonCashAmount: '0.00',
      billIdSuffix: '',
      billType: '3',
      stocks: stockLine,
      customerNo: props.data.register.toString(),
      cityTax: '0.00',
      bankTransactions: null,
      districtCode: '24',
      posNo: '1000',
      taxType: '1',
      registerNo: '6388094'
      // reportMonth: "2023-01",
    };
    let raw = {
      vat_data: 'НӨАТ шивсэн',
      order_id: props.data.order_id
      // order_id: order.id,
    };

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(raw)
    };

    let requestOptionsMain = {
      body: JSON.stringify(mainRaw)
    };

    console.log('requestOptionsMain', requestOptionsMain);

    fetch(`http://172.16.193.172:1337/put`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'http://172.16.193.172:1337/info',
        'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',

        'Access-Control-Allow-Headers':
          'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer
      body: JSON.stringify(mainRaw)
    })
      .then(r => r.text())
      .then(response => {
        console.log('VAT CONSOLE', response);

        // alert(`"VAT RESPONSE" ${response}`, response);
        fetch(`http://172.16.193.172:1337/senddata`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'include',
          headers: {
            'Access-Control-Allow-Origin': 'http://172.16.193.172:1337/info',
            'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',

            'Access-Control-Allow-Headers':
              'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer' // no-referrer
        })
          .then(r => r.text())
          .then(response => {
            console.log('response first vat', response);
            // alert(`Амжилттай senddata. ${response}`);
            let url = `${process.env.REACT_APP_API_URL2}/api/order/vatupdate`;
            fetch(url, requestOptions)
              .then(r => r.json())
              .then(response => {
                console.log('response second vat', response);
                alert(`Амжилттай НӨАТ шинэчлэлээ.`);
                let aa = props.data;
                aa.vat = 'НӨАТ шивсэн';
                props.setOrder(aa);
                props.close(false);
                setVatCompany(null);
              })
              .catch(error => {
                alert(`Алдаа гарлаа, НӨАТ шивэгдсэнгүй.`);
                console.log('vat sender error', error);
              });
          })
          .catch(error => {
            alert(`Алдаа гарлаа senddata. ${error}`);
          });

        // alert("Та амжилттай илгээлээ");
        setTotalprice(null);
        setNoat(null);
        setNxat(null);
      })
      .catch(error => {
        console.log('VAT ERROR', error);
        alert(`НӨАТ СЕРВЕР АЛДАА. ${error}`);
      });
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.firstwrapper}>
          <div className={css.company}>
            <h3>{`Компаны нэр : ${vatCompany?.name}`}</h3>
          </div>{' '}
          <div className={css.company}>
            <p>{`Регистерийн дугаар : ${props.data.register}`} </p>
          </div>
          <div className={css.company}>
            <p> {`НХАТ : ${vatCompany?.citypayer ? 'Тийм' : 'Үгүй'}`} </p>
            <p> {`НӨАТ : ${vatCompany?.vatpayer ? 'Тийм' : 'Үгүй'}`} </p>
          </div>
        </div>

        <div className={css.secondwrapper}>
          <div className={css.fitrswraper}>
            <div className={css.headercontainer}>
              <span>НӨАТ илгээх</span>
              <img
                src={closeBtn}
                className={css.closebtnicon}
                onClick={() => props.close(false)}
              />
            </div>
            <div className={css.tablewrapper}>
              <div className={css.tablecontainer}>
                <table>
                  <tr>
                    <th className={css.header}>Нэр</th>
                    <th>SKU</th>
                    <th>Т/Ш</th>
                    <th>Дүн</th>
                    <th>НӨАТ</th>
                    <th>НХАТ</th>
                  </tr>
                  {aaa}
                </table>
              </div>
            </div>
          </div>
          <div className={css.bottomwrapper}>
            <div className={css.totalwrapper}>
              <div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{`ТТД : `}</span>{' '}
                  <span
                    style={{
                      color: '#263238',
                      fontWeight: '400',
                      fontSize: '14px'
                    }}
                  >
                    {props.data.register}
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{`Нэр : `}</span>{' '}
                  <span
                    style={{
                      color: '#263238',
                      fontWeight: '400',
                      fontSize: '14px'
                    }}
                  >
                    {props.data.tradeshop_name}
                  </span>
                </div>
              </div>

              <div className={css.middlecontainer}>
                <div className={`${css.middlewrapper}`}>
                  <span>Нийт захиалгын дүн : &nbsp;</span>
                  {/* <span className={css.inputnice}>
                  {totalprice?.toLocaleString()}₮
                </span> */}

                  <input
                    className={css.inputcss}
                    value={totalprice}
                    onChange={e => setTotalprice(e.target.value)}
                  />
                </div>
                <div className={css.middlewrapper}>
                  <span>{`НӨАТ дүн :  `}&nbsp; </span>{' '}
                  {/* <span className={css.inputnice}>{noat?.toLocaleString()}₮</span> */}
                  <input
                    className={css.inputcss}
                    value={noat}
                    onChange={e => setNoat(e.target.value)}
                  />
                </div>
                <div className={css.middlewrapper}>
                  <span>{`НХАТ дүн :  `}&nbsp;</span>{' '}
                  {/* {nxat === 0 ? (
                  <span className={css.inputnice}></span>
                ) : (
                  <span className={css.inputnice}>
                    {nxat?.toLocaleString()}₮
                  </span>
                )} */}
                  <input
                    className={css.inputcss}
                    value={nxat}
                    onChange={e => setNxat(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div></div>
              <div className={css.btncontainer}>
                <button
                  onClick={() => props.close(false)}
                  className={css.cancel}
                >
                  Close
                </button>
                {/* <button className={css.approve} onClick={onApproveHandler}> */}
                <button
                  className={css.approve}
                  onClick={onApproveHandler}
                  // disabled={btndisabled}
                  style={{
                    background: vatCompany?.vatpayer ? '#ffa600' : '#eceff1',
                    color: vatCompany?.vatpayer ? '#fff' : '#78909c'
                  }}
                  disabled={btndisabled}
                >
                  Илгээх
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vatmodal;
