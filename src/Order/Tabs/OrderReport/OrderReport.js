import React, { useEffect, useState } from 'react';
import css from './orderreport.module.css';
import closeBlack from '../../../assets/close.svg';
import myHeaders from '../../../components/MyHeader/myHeader';
import Shipdate from './Shipdate';
import OrderInfo from './OrderInfo';
import * as htmlToImage from 'html-to-image';
import tamgaSrc from '../../../assets/tamgaNerstTal.jpg';

const OrderReport = props => {
  const [suppler, setSupplier] = useState([]);
  const [display, setDisplay] = useState('block');
  const [tugeegchData, setTugeegchData] = useState(null);
  const boUserId = props?.order?.back_office_user;
  const [pFont, setPFont] = useState('20px');
  const [lineHeight, setLineHeight] = useState('20px');
  // const tamgaSrc =
  //   `${process.env.REACT_APP_MEDIA_URL}/original/18336143748685155183331816202310050523075729224212983221574332916618.png`;
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

  useEffect(() => {
    let aa = document.getElementById('padaan');
  }, [props]);

  const DownloadHandler = async () => {
    const padaan = document.getElementById('padaan');
    const padaanprint = document.getElementById('print');
    const padaanBody = document.getElementById('padaanBody');

    console.log('padaanBody', padaanBody.offsetHeight * 0.5);
    padaanprint.style.display = 'none';
    padaan.style.overflowY = 'hidden';
    padaan.style.minHeight =
      props.order.line.length < 35
        ? '3508px'
        : `${padaanBody.offsetHeight + 1350}px`;

    padaan.style.minWidth = '2480px';
    padaan.style.overflowX = 'none';

    setDisplay('none');

    htmlToImage
      .toJpeg(padaan, {
        quality: 1,
        skipAutoScale: false,
        height: padaan.scrollHeight
      })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'Зарлагын баримт.jpeg';
        link.href = dataUrl;
        link.click();
        props.setReportShow(false);
      })
      .catch(error => {
        console.log('Padaan error ', error);
      });
  };

  return (
    <>
      <div
        style={{
          cursor: 'pointer',
          position: 'absolute',
          backgroundColor: '#fff',
          zIndex: '20',
          top: '0',
          right: '0',
          borderRadius: '50%',
          margin: '10px'
        }}
      >
        <img
          src={closeBlack}
          alt='close'
          onClick={() => {
            props.setReportShow(false);
          }}
        />
      </div>
      <div className={css.container} id='padaan'>
        <div
          style={{
            height: 'max-content',
            width: '100%'
          }}
          id='padaanBody'
        >
          <div style={{ fontSize: pFont }}>
            {props.order?.supplier_id === 14191 && (
              <div
                style={{
                  height: '50px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <strong style={{ fontSize: pFont }}>
                  НХМаягт БМ-3 Зарлагын баримт
                </strong>
                <strong
                  style={{
                    width: '750px',
                    textAlign: 'center',
                    fontSize: pFont
                  }}
                >
                  Сангийн сайдын 2017 оны 12 дугаар сарын 5 өдрийн 347 тоот
                  тушаалын хавсралт
                </strong>
              </div>
            )}

            <div className={css.address}>
              <div className={css.supplier}>
                <div>
                  <img
                    src='/logo.svg'
                    alt='logo'
                    style={{
                      width: '45px',
                      height: '45px',
                      marginRight: '15px',
                      marginTop: '20px'
                    }}
                  />
                </div>
                <div className={css.addressinfo}>
                  <p
                    style={{
                      fontWeight: '700',
                      color: '#1A1A1A',
                      fontSize: pFont
                    }}
                  >
                    {suppler && suppler[0]?.name}
                  </p>
                  <div>
                    <p style={{ fontSize: pFont }}>
                      {suppler && suppler[0]?.address}
                    </p>
                    <p
                      style={{
                        display: suppler[0] ? 'flex' : 'none',
                        alignItems: 'center',
                        gap: '20px',
                        width: '100%'
                      }}
                    >
                      <span style={{ fontSize: pFont }}>
                        <strong
                          style={{
                            marginRight: '20px',
                            fontWeight: '700',
                            fontSize: pFont
                          }}
                        >
                          Утас:
                        </strong>{' '}
                        {suppler && suppler[0]?.phone}
                      </span>
                      <span style={{ fontSize: pFont }}>
                        <strong
                          style={{
                            marginRight: '20px',
                            fontWeight: '700',
                            fontSize: pFont
                          }}
                        >
                          И-мэйл:
                        </strong>{' '}
                        {suppler && suppler[0]?.email}
                      </span>

                      {suppler?.[0]?.bank_accounts.length > 0 && (
                        <span style={{ fontSize: pFont }}>
                          <strong
                            style={{
                              marginRight: '20px',
                              fontWeight: '700',
                              fontSize: pFont
                            }}
                          >
                            Данс:
                          </strong>
                          {suppler?.[0]?.bank_accounts &&
                            suppler?.[0]?.bank_accounts.map(bankAccount => {
                              return (
                                bankAccount.bankName +
                                ': ' +
                                bankAccount.accountNumber +
                                ' , '
                              );
                            })}
                          {/* {props.order?.supplier_id === 14191 && ( */}
                          <strong
                            style={{
                              marginRight: '20px',
                              fontWeight: '700',
                              fontSize: pFont
                            }}
                          >
                            Нэр:
                            <span
                              style={{
                                marginRight: '20px',
                                fontSize: pFont
                              }}
                            >
                              {suppler?.[0]?.bank_accounts?.[0]?.accountHolder}
                            </span>
                          </strong>
                          {/* )} */}

                          <span
                            style={{
                              marginRight: '20px',
                              fontSize: pFont
                            }}
                          >
                            Данс &nbsp;&nbsp; / &nbsp;&nbsp; Бэлэн
                          </span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.header}>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: pFont,
                  color: '#1A1A1A'
                }}
              >
                Зарлагын баримт
              </div>
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <strong
                  style={{
                    marginRight: '20px',
                    fontWeight: '700',
                    fontSize: pFont,
                    color: '#1A1A1A'
                  }}
                >
                  Захиалагч :
                </strong>
                <span
                  style={{
                    fontWeight: '700',
                    fontSize: pFont,
                    color: '#1A1A1A'
                  }}
                >
                  {props.order.tradeshop_name}
                </span>
              </div>
              <div className={css.addresstwo}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}
                >
                  <p
                    style={{
                      marginBottom: '0',
                      fontSize: pFont,
                      fontWeight: '400'
                    }}
                  >
                    <strong
                      style={{
                        marginRight: '20px',
                        fontWeight: '700',
                        fontSize: pFont,
                        color: '#1A1A1A'
                      }}
                    >
                      Хүргэлтийн хаяг :
                    </strong>
                    {props.order.address}
                  </p>
                  {props?.orderXT?.first_name && (
                    <p
                      style={{
                        marginBottom: '0',
                        fontSize: pFont,
                        fontWeight: '400'
                      }}
                    >
                      <strong
                        style={{
                          marginRight: '20px',
                          fontWeight: '700',
                          fontSize: pFont,
                          color: '#1A1A1A'
                        }}
                      >
                        XT Нэр:
                      </strong>
                      {props?.orderXT?.first_name}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '20px'
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontWeight: '400',
                        fontSize: pFont,
                        color: '#1A1A1A'
                      }}
                    >
                      <strong
                        style={{
                          marginRight: '20px',
                          fontWeight: '700',
                          fontSize: pFont,
                          color: '#1A1A1A'
                        }}
                      >
                        Регистер:
                      </strong>
                      {props.order && props.order.register}
                    </span>
                    <span
                      style={{
                        fontWeight: '400',
                        fontSize: pFont,
                        color: '#1A1A1A',
                        marginLeft: '10px'
                      }}
                    >
                      <strong
                        style={{
                          marginRight: '10px',
                          fontWeight: '700',
                          fontSize: pFont,
                          color: '#1A1A1A'
                        }}
                      >
                        Утас:
                      </strong>
                      {props.order && props.order.phone}
                    </span>
                  </div>
                  {props?.orderXT?.phone_number && (
                    <p
                      style={{
                        marginBottom: '0',
                        fontSize: pFont,
                        fontWeight: '400'
                      }}
                    >
                      <strong
                        style={{
                          marginRight: '20px',
                          fontWeight: '700',
                          fontSize: pFont,
                          color: '#1A1A1A'
                        }}
                      >
                        XT Утас:
                      </strong>
                      {props?.orderXT?.phone_number}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Shipdate data={props.order} pFont={pFont} />
            <OrderInfo data={props.order} display={display} pFont={pFont} />
            <div className={css.allgroup}>
              <div
                style={{
                  display: 'flex',
                  width: '500px'
                }}
              >
                <span
                  style={{
                    width: '200px',
                    fontSize: pFont
                  }}
                >
                  Хүлээн авсан :
                </span>
                <span className={css.group}>
                  <p style={{ fontSize: pFont }}>/</p>
                  <p style={{ fontSize: pFont }}>/</p>
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: 'fit-content'
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    minWidth: '200px',
                    marginRight: '25px',
                    width: 'fitContent',
                    fontSize: pFont
                  }}
                >
                  Хүлээлгэн өгсөн : &nbsp;
                  {tugeegchData?.name !== '' && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <span style={{ fontSize: pFont }}>
                        Түгээгчийн нэр : &nbsp; {tugeegchData?.name}
                      </span>
                      <span style={{ fontSize: pFont }}>
                        Түгээгчийн утас : &nbsp; {tugeegchData?.phone_number}
                      </span>
                    </div>
                  )}
                </span>
                <span className={css.group}>
                  <p style={{ fontSize: pFont }}>/</p>{' '}
                  <p style={{ fontSize: pFont }}>/</p>
                </span>
              </div>
            </div>
            {props.order?.supplier_id === 14191 && (
              <div className={css.anhaaruulga}>
                <div
                  style={{
                    display: 'block',
                    width: '550px',
                    height: '400px',
                    marginTop: '-60px'
                  }}
                >
                  <img src={tamgaSrc} alt='tamga' />
                </div>
                <p style={{ fontSize: pFont, lineHeight: lineHeight }}>
                  Анхааруулга: <br></br>
                  Харилцагч та барааны төлбөрийг{' '}
                  {suppler?.[0]?.bank_accounts &&
                    suppler?.[0]?.bank_accounts.map(
                      bankAccount =>
                        bankAccount.bankName + ': ' + bankAccount.accountNumber
                    )}
                  &nbsp; / А.Баасанжаргал / дансанд шилжүүлнэ үү!
                  <br></br>
                  Захиалга авсан болон бараа хүргэсэн ажилтан нь хувийн дансанд
                  мөнгө авах эрхгүй болно.
                </p>
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              marginTop: '20px',
              fontSize: pFont,
              fontWeight: '400',
              color: '#1A1A1A'
            }}
          >
            <div
              className={css.button}
              onClick={() => {
                DownloadHandler();
                setPFont('30px');
                setLineHeight('30px');
              }}
              id='print'
            >
              Зарлагын баримт хэвлэх
            </div>
            {/* <div>
					Нийт дүн:
					<strong
					style={{
							marginLeft: "20px",
						}}
					>
					{props.order.grand_total.toLocaleString() + "₮"}
					</strong>
				</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderReport;
