import React, { useEffect, useState } from 'react';
import closeBlack from '../../../assets/close.svg';
import myHeaders from '../../../components/MyHeader/myHeader';
import tamgaSrc from '../../../assets/tamgaNerstTal.jpg';
import './Barimt.css';
import html2pdf from 'html2pdf.js';
import logo from './logo.png';
import Shipdate from './Shipdate';

const Barimt = props => {
  let totalDiscountAmount = 0;
  let totalOriginalAmount = 0;
  let totalQuantity = 0;

  if (props.order.supplier_id === 14233) {
    //alert('will print box')
  }

  const myData = props;

  const [suppler, setSupplier] = useState([]);
  const [tugeegchData, setTugeegchData] = useState(null);
  const boUserId = props?.order?.back_office_user;

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${props.order.supplier_id}`,
      {
        method: 'GET',
        headers: myHeaders
      }
    )
      .then(res => res.json())
      .then(res => {
        setSupplier(res.data);
        console.log(suppler[0].id);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [props.order]);
  useEffect(() => {
    if (boUserId) {
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/users?id=${
          boUserId.split(',').map(Number)[0]
        }`,
        {
          method: 'GET',
          headers: myHeaders
        }
      )
        .then(res => res.json())
        .then(res => {
          boUserId.split(',').map(Number)?.length === 2
            ? setTugeegchData({
                name: res?.data?.[0]?.first_name,
                phone_number: res?.data?.[0]?.phone_number
              })
            : setTugeegchData({
                name: '',
                phone_number: ''
              });

          //  setSupplier(res.data);
        })
        .catch(error => {
          alert('Алдаа гарлаа');
          console.log('Бо дата авахад алдаа гарлаа', error);
        });
    }
  }, []);

  const handlePrint = () => {
    const rep = document.getElementById('orderReport');
    const print = document.getElementById('printBtn');
    const close = document.getElementById('closeBtn');
    print.style.display = 'none';
    close.style.display = 'none';
    var opt = {
      margin: [10, 0, 22, 0],
      filename: `Зарлагын баримт.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        dpi: 300,
        scale: 2,
        letterRendering: true,
        useCORS: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(rep).save();
    // window.print(rep);
    props.setReportShow(false);
  };
  let boxHeader = null;
  if (props.order.supplier_id === 14233 || props.order.supplier_id === 14246) {
    boxHeader = (
      <th
        style={{
          fontSize: '10px',
          height: '1px',
          textAlign: 'center',
          border: '1px solid black'
        }}
      >
        Хайрцаг
      </th>
    );
  }

  let bank = {
    name: suppler?.[0]?.bank_accounts?.[0]?.accountHolder,
    bank: suppler?.[0]?.bank_accounts?.[0]?.bankName,
    account: suppler?.[0]?.bank_accounts?.[0]?.accountNumber
  };

  let bankInfo = null;
  if (props.order?.supplier_id !== 14233) {
    bankInfo = (
      <>
        {suppler?.[0]?.bank_accounts.length > 0 && (
          <div>
            <p style={{ fontWeight: 'bold', margin: '0 !important' }}>Данс:</p>
            <p>
              <span>
                {suppler?.[0]?.bank_accounts &&
                  suppler?.[0]?.bank_accounts.map(bankAccount => {
                    return (
                      bankAccount.bankName +
                      ': ' +
                      bankAccount.accountNumber +
                      (props.order.supplier_id !== 14246
                        ? ' /' + bankAccount.accountHolder + '/ '
                        : '') +
                      ' , '
                    );
                  })}
              </span>
            </p>
          </div>
        )}
        <div
          style={{
            display: 'none'
          }}
        >
          <p>Нэр:</p>
          <p
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100px'
            }}
          >
            <span style={{ marginLeft: '0.125rem' }}>
              <span style={{ marginLeft: '0.125rem' }}>
                {suppler?.[0]?.bank_accounts
                  ?.map(account => account.accountHolder)
                  .join(', ')}
              </span>
            </span>
          </p>
        </div>
      </>
    );
  } else {
    if (
      myData &&
      myData.orderXT &&
      myData.orderXT.bankAccounts &&
      myData.orderXT.bankAccounts.length > 0
    ) {
      bankInfo = (
        <>
          <p>
            Данс:
            <span>
              {myData.orderXT.bankAccounts[0].bankName +
                ' - ' +
                myData.orderXT.bankAccounts[0].account}
            </span>
          </p>
          <p>
            Нэр:
            <span>{myData.orderXT.bankAccounts[0].holder}</span>
          </p>
        </>
      );
    } else {
      bankInfo = <p>Банкны данс мэдээлэл байхгүй</p>;
    }
  }

  let totalBoxes = 0;

  return (
    <div className='container' id='orderReport'>
      <div className='closeBtn'>
        <img
          src={closeBlack}
          id='closeBtn'
          alt='closeBtn'
          onClick={() => {
            props.setReportShow(false);
          }}
          width={40}
          height={40}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='header'>
        {props.order?.supplier_id === 14191 && (
          <div className='headTop'>
            <p>НХМаягт БМ-З Зарлагын баримт</p>
            <p>
              Сангийн сайдын 2017 оны 12 дугаар сарын 5 өдрийн 347 тоот тушаалын
              хавсралт
            </p>
          </div>
        )}
        <div style={{ height: '90px', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: '80px'
            }}
          >
            <img
              src={logo}
              alt='logo'
              className='logoImg'
              width={60}
              height={60}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: '80px',
              right: '0px'
            }}
            class='containerSlippery'
          >
            <div
              style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '40%'
              }}
            >
              <h1
                className='compName'
                style={{ margin: '0', fontSize: '.0.688rem' }}
              >
                {suppler && suppler[0]?.name}
              </h1>
              <p style={{ fontSize: '.688rem', margin: '0', padding: '0' }}>
                {suppler && suppler[0]?.address}
              </p>
              <p style={{ fontSize: '.0.688rem', margin: '0', padding: '0' }}>
                Утас:{' '}
                <span
                  style={{ fontSize: '.0.688rem', margin: '0', padding: '0' }}
                >
                  {suppler && suppler[0]?.phone}
                </span>
              </p>
              <p style={{ fontSize: '.0.688rem', margin: '0', padding: '0' }}>
                И-мэйл:{' '}
                <span
                  style={{ fontSize: '.0.688rem', margin: '0', padding: '0' }}
                >
                  {suppler && suppler[0]?.email}
                </span>
              </p>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '0px',
                width: '60%',
                right: '0px'
              }}
            >
              {bankInfo}
              <p style={{ textAlign: 'right', fontWeight: 'bold' }}>
                Данс / Бэлэн
              </p>
            </div>
          </div>
        </div>
        <div className='headReport'>
          <p style={{ fontWeight: 'bold', fontSize: '10px', margin: '0' }}>
            Зарлагын баримт
          </p>
          <p style={{ fontWeight: 'bold', fontSize: '10px', margin: '0' }}>
            <span style={{ fontWeight: 'bold', fontSize: '10px', margin: '0' }}>
              Захиалагч: {props.order.tradeshop_name}
            </span>
          </p>
        </div>
        <div className='headInformation'>
          <div className='infoLeft'>
            <p style={{ fontWeight: 'bold', fontSize: '10px', margin: '0' }}>
              Хүргэлтийн хаяг:{' '}
              <span style={{ fontSize: '10px' }}>{props.order.address}</span>
            </p>
            <div className='regPhone'>
              <p
                style={{
                  marginRight: '10px',
                  fontWeight: 'bold',
                  fontSize: '10px'
                }}
              >
                Регистер:{' '}
                <span style={{ fontSize: '10px' }}>
                  {props.order && props.order.register}
                </span>
              </p>
              <p style={{ fontWeight: 'bold', fontSize: '10px' }}>
                Утас:{' '}
                <span style={{ fontSize: '10px' }}>
                  {props.order && props.order.phone}
                </span>
              </p>
            </div>
          </div>
          <div className='infoRight'>
            <p style={{ fontWeight: 'bold', fontSize: '10px', margin: '0' }}>
              ХТ Нэр:{' '}
              {props?.orderXT?.first_name && (
                <span style={{ fontSize: '10px' }}>
                  {props?.orderXT?.first_name}
                </span>
              )}
            </p>

            <p style={{ fontWeight: 'bold', fontSize: '10px', margin: '0' }}>
              ХТ утас:{' '}
              {props?.orderXT?.phone_number && (
                <span style={{ fontSize: '10px' }}>
                  {props?.orderXT?.phone_number}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      <Shipdate data={props.order} />
      <div className='List'>
        <table style={{}}>
          <thead>
            <th
              style={{
                fontSize: '10px',
                height: '1px',
                textAlign: 'center',
                border: '1px solid black'
              }}
            >
              №
            </th>
            <th
              style={{
                fontSize: '10px',
                height: '1px',
                border: '1px solid black'
              }}
            >
              Баркод:
            </th>
            <th
              style={{
                fontSize: '10px',
                height: '1px',
                border: '1px solid black'
              }}
            >
              Бүтээгдэхүүний нэр
            </th>
            <th
              style={{
                fontSize: '10px',
                height: '1px',
                textAlign: 'center',
                border: '1px solid black'
              }}
            >
              Тоо ширхэг
            </th>
            <th
              style={{
                fontSize: '10px',
                height: '1px',
                textAlign: 'center',
                border: '1px solid black',
                display:
                  props.order?.supplier_id === 14246 ||
                  props.order?.supplier_id === 14233
                    ? null
                    : 'none'
              }}
            >
              {props.order?.supplier_id === 14246 ? 'Хэмжих нэгж' : 'Хайрцаг'}
            </th>

            <th
              style={{
                fontSize: '10px',
                height: '1px',
                textAlign: 'center',
                border: '1px solid black'
              }}
            >
              Үнэ
            </th>
            <th
              style={{
                fontSize: '10px',
                height: '1px',
                textAlign: 'center',
                border: '1px solid black'
                // margin: "15px",
              }}
            >
              Нийт үнэ
            </th>
            <th
              style={{
                fontSize: '10px',
                height: '1px',
                textAlign: 'center',
                border: '1px solid black'
              }}
            >
              % хөнгөлөлт
            </th>
            <th
              style={{
                fontSize: '10px',
                height: '1px',
                textAlign: 'center',
                border: '1px solid black'
                // margin: "15px",
              }}
            >
              Нийт хөнгөлөлт
            </th>
            <th
              style={{
                fontSize: '10px',
                height: '1px',
                textAlign: 'center',
                border: '1px solid black'
                // margin: "15px",
              }}
            >
              төлөх дүн
            </th>
          </thead>
          <tbody style={{ lineHeight: '12px' }}>
            {myData.order.line.map((item, ind) => {
              const discount =
                item.base_price !== item.price
                  ? ((item.base_price - item.price) / item.base_price) * 100 +
                    '%'
                  : '';
              const discountAmount =
                item.base_price !== item.price
                  ? item.base_price * item.quantity - item.price * item.quantity
                  : 0;
              totalOriginalAmount += item.base_price * item.quantity;
              if (item.base_price !== item.price) {
                totalDiscountAmount += discountAmount;
              }
              let foo = item.isBox
                ? 'хайрцаг ' + item.quantity / item.product_in_case
                : 'шт';
              if (props.order.supplier_id === 14233) {
                let foobarblah = item.quantity / item.product_in_case;

                foo =
                  (Number.isInteger(foobarblah)
                    ? foobarblah
                    : foobarblah.toFixed(2)) + ' хайрцаг';
              }

              const totalPrice = item.quantity * item.price;
              totalQuantity += item.quantity;
              let boxInfo = null;

              if (
                props.order.supplier_id === 14233 ||
                props.order.supplier_id === 14246
              ) {
                const boxNum = item.quantity / item.product_in_case;

                totalBoxes += boxNum;
                boxInfo = (
                  <td
                    style={{
                      width: '10%',
                      fontSize: '10px',
                      textAlign: 'center',
                      border: '1px solid black'
                    }}
                  >
                    {boxNum.toFixed(2) * 1}
                  </td>
                );
              }
              return (
                <tr>
                  <td
                    style={{
                      width: '1%',
                      fontSize: '10px',
                      // height: "6px",
                      textAlign: 'center',
                      border: '1px solid black'
                    }}
                  >
                    {ind + 1}
                  </td>
                  <td
                    style={{
                      width: '15%',
                      fontSize: '10px',
                      border: '1px solid black'
                    }}
                  >
                    {item.product_bar_code}
                  </td>
                  <td
                    style={{
                      width: '59%',
                      fontSize: '10px',
                      border: '1px solid black',
                      padding: '0 .25rem'
                    }}
                  >
                    <div className='container_tworowtext'>
                      <p className='tworowtext'>{item.product_name}</p>
                    </div>
                  </td>
                  <td
                    style={{
                      width: '5%',
                      fontSize: '10px',
                      textAlign: 'center',
                      border: '1px solid black'
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      width: '5%',
                      fontSize: '10px',
                      textAlign: 'center',
                      border: '1px solid black',
                      display:
                        props.order?.supplier_id === 14246 ||
                        props.order?.supplier_id === 14233
                          ? null
                          : 'none'
                    }}
                  >
                    {foo}
                  </td>

                  <td
                    style={{
                      width: '10%',
                      fontSize: '10px',
                      textAlign: 'center',
                      border: '1px solid black'
                    }}
                  >
                    {item.base_price.toLocaleString() + '₮'}
                  </td>
                  <td
                    style={{
                      width: '10%',
                      fontSize: '10px',
                      textAlign: 'right',
                      border: '1px solid black'
                    }}
                  >
                    {(item.base_price * item.quantity).toLocaleString() + '₮'}
                  </td>
                  <td
                    style={{
                      width: '5%',
                      fontSize: '10px',
                      textAlign: 'center',
                      border: '1px solid black'
                    }}
                  >
                    {discount}
                  </td>
                  <td
                    style={{
                      width: '10%',
                      fontSize: '10px',
                      textAlign: 'right',
                      border: '1px solid black'
                    }}
                  >
                    {discountAmount > 0
                      ? discountAmount.toLocaleString() + '₮'
                      : null}
                  </td>
                  <td
                    style={{
                      width: '10%',
                      fontSize: '10px',
                      textAlign: 'right',
                      border: '1px solid black',
                      fontWeight: 'bold'
                    }}
                  >
                    {(item.price * item.quantity).toLocaleString()}₮
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tr style={{ lineHeight: '12px' }}>
            <td
              style={{ fontWeight: 'bold', border: '1px solid black' }}
              colspan={
                props.order.supplier_id === 14233 ||
                props.order.supplier_id === 14246
                  ? 3
                  : 3
              }
            >
              Нийт дүн
            </td>

            <td
              style={{
                border: '1px solid black',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {totalQuantity.toLocaleString()}
            </td>
            <td
              style={{
                border: '1px solid black',
                textAlign: 'center',
                fontWeight: 'bold',
                display: props.order.supplier_id !== 14246 ? 'none' : null
              }}
            ></td>
            <td
              style={{
                border: '1px solid black',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {totalBoxes}
            </td>
            <td
              style={{
                border: '1px solid black',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {totalOriginalAmount.toLocaleString()}₮
            </td>
            <td
              style={{
                border: '1px solid black',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            ></td>

            <td
              style={{
                border: '1px solid black',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {totalDiscountAmount.toLocaleString()}₮
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                textAlign: 'right'
              }}
              colspan='2'
            >
              {props.total ? props.total.toLocaleString() + '₮' : 'N/A'}
            </td>
          </tr>
          <tr style={{ lineHeight: '12px' }}>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                textAlign: 'right'
              }}
              colspan={
                props.order.supplier_id === 14246 ||
                props.order.supplier_id === 14233
                  ? 9
                  : 8
              }
            >
              НӨАТгүй дүн
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                textAlign: 'right'
              }}
            >
              {parseFloat(
                (props.total - props.total / 11).toFixed(2)
              ).toLocaleString()}
              ₮
            </td>
          </tr>
          <tr style={{ lineHeight: '12px' }}>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                textAlign: 'right'
              }}
              colspan={
                props.order.supplier_id === 14246 ||
                props.order.supplier_id === 14233
                  ? 9
                  : 8
              }
            >
              НӨАТ
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                textAlign: 'right'
              }}
            >
              {parseFloat((props.total / 11).toFixed(2)).toLocaleString()}₮
            </td>
          </tr>
          <tr style={{ lineHeight: '12px' }}>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                textAlign: 'right'
              }}
              colspan={
                props.order.supplier_id === 14246 ||
                props.order.supplier_id === 14233
                  ? 9
                  : 8
              }
            >
              Нийт дүн
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                textAlign: 'right'
              }}
            >
              {props.total ? props.total.toLocaleString() + '₮' : 'N/A'}
            </td>
          </tr>
        </table>
      </div>
      <div
        className='footer'
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        <div className='signature'>
          <p style={{ fontWeight: 'bold', fontSize: '10px', margin: '0' }}>
            Хүлээн авсан:
            ................................................................
          </p>
          <div
            className='confirmOrder'
            style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
          >
            <p style={{ fontWeight: 'bold', fontSize: '10px', margin: '0' }}>
              Хүлээлгэн өгсөн:
              ................................................................
            </p>
            {tugeegchData?.name !== '' && (
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '10px' }}>
                  Түгээгчийн нэр:{' '}
                  <span style={{ fontSize: '10px' }}>{tugeegchData?.name}</span>
                </p>
                <p style={{ fontWeight: 'bold', fontSize: '10px' }}>
                  Түгээгчийн утас:{' '}
                  <span style={{ fontSize: '10px' }}>
                    {tugeegchData?.phone_number}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
        {props.order?.supplier_id === 14191 && (
          <div className='warning'>
            <div>
              <img src={tamgaSrc} width={180} height={100} alt='tamga' />
            </div>
            <div style={{ width: '400px' }}>
              <p>
                Анхааруулга: <br></br>
                Харилцагч та барааны төлбөрийг{' '}
                {suppler?.[0]?.bank_accounts &&
                  suppler[0].bank_accounts.map(
                    (bankAccount, index) =>
                      `${bankAccount.bankName}:${bankAccount.accountNumber}${
                        index < suppler[0].bank_accounts.length - 1 ? ' ' : ''
                      }`
                  )}
                &nbsp; &nbsp; &nbsp; / {suppler && suppler[0]?.english_name} /
                &nbsp; / А.Баасанжаргал / дансанд шилжүүлнэ үү! &nbsp; Захиалга
                авсан болон бараа хүргэсэн ажилтан нь хувийн дансанд мөнгө авах
                эрхгүй болно.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className='printBtn' id='printBtn' onClick={handlePrint}>
        Хэвлэх
      </div>
    </div>
  );
};

export default Barimt;
