import React, { useState, useEffect } from 'react';
import { Modal, message, Popconfirm } from 'antd';
import notifIcon from '../assets/Notification.svg';
import Edit from '../assets/EditSquare.svg';
import DeleteIcon from '../assets/delete_red_small.svg';
import css from './merchant.module.css';
import myHeaders from '../components/MyHeader/myHeader';
import { styles } from './style';
import checkboxblack from '../assets/check box_black.svg';
import checkboxgray from '../assets/check box.svg';
import SingleProduct from './SingleTemplate';
import Detail2 from './Detail2';

function Merchant(props) {
  let [detail, setDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlco, setOpenAlco] = useState(false);
  const [openZaza, setOpenZaza] = useState(false);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [type, setType] = useState();
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState();
  const [isTemplate, setIsTemplate] = useState(false);
  const [buramhanDate, setBuramhanDate] = useState(false);
  const [merchantIDS, setMerchantIDS] = useState([]);

  let [data, setData] = useState([]);

  // console.log("merchant props: ", props.data);

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(props.data)));

    if (props.buramhanmerchantIDS) {
      // console.log("props.buramhanmerchantIDS", props.buramhanmerchantIDS);
      if (
        props.buramhanmerchantIDS.includes(props.data.tradeshop_id.toString())
      ) {
        // console.log("ene ruu orj irsen true bolgoson");
        setBuramhanDate(true);
      }
    }
  }, [props]);
  let foo = () => {
    setDetail(false);
  };
  let city = data.city;
  let district = data.district;
  let khoroo = data.horoo;
  let locations = props.locations;
  let bustype = props.businessType;
  let businessType = null;
  let channel = null;

  if (locations) {
    locations.map(location => {
      if (location.location_id === parseInt(district, 10)) {
        district = location.location_name;
      }
    });
    locations.map(location => {
      if (location.location_id === parseInt(khoroo, 10)) {
        khoroo = location.location_name;
      }
    });
    locations.map(location => {
      if (location.location_id === parseInt(city, 10)) {
        city = location.location_name;
      }
    });
  }
  //{business_type_id: 2, business_type_name: '6 нэрийн дэлгүүр', channel_id: 1, channel_name: 'Хүнсний дэлгүүр'}
  if (props.businessType) {
    props.businessType.map(type => {
      if (type.business_type_id === parseInt(data.business_type_id)) {
        businessType = type.business_type_name;
        channel = type.channel_name;
      }
    });
  }
  const send = () => {
    if (title && body) {
      var raw = JSON.stringify({
        user_id: data.user_id,
        title: title,
        body: body,
        ...(isTemplate && { type: 5 })
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(
        `${process.env.REACT_APP_API_URL2}/api/notification/pushsingle`,
        requestOptions
      )
        .then(res => {
          if (res.status === 200) {
            message.success('Амжилттай илгээлээ');
          } else {
            message.error('Алдаа гарлаа');
          }
        })
        .catch(error => {
          console.log('error', error);
        });
      setOpen(false);
    } else {
      message.warning('Мэдээлэл дутуу байна');
    }
  };
  const save = () => {
    var raw = JSON.stringify({
      status: type,
      tradeshop_id: data.tradeshop_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/alcoholsale/status`,
      requestOptions
    )
      .then(res => {
        if (res.status === 200) {
          message.success('Амжилттай илгээлээ');
        } else {
          message.error('Алдаа гарлаа');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    setOpenAlco(false);
  };
  const deleteTemplate = id => {
    var raw = JSON.stringify({
      template_id: id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/ordertemplate/delete`,
      requestOptions
    )
      .then(res => {
        if (res.status === 200) {
          message.success('Амжилттай устгалаа');
          setTemplates(prev => prev?.filter(p => p._id !== id));
        } else {
          message.error('Алдаа гарлаа');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    setOpenAlco(false);
  };
  useEffect(() => {
    if (openZaza) {
      // templateee tatnaa

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let url = `${process.env.REACT_APP_API_URL2}/api/ordertemplate/get?tradeshop_id=${props.data.tradeshop_id}`;

      fetch(url, requestOptions)
        .then(r => r.json())
        .then(res => {
          setTemplates(res);
        })
        .catch(error => {
          alert('Алдаа гарлаа');
        });
    }
  }, [openZaza]);
  const approveHandler = () => {
    console.log('clicked');
  };

  const SaveHandler = () => {
    let aa = JSON.parse(localStorage.getItem('merchantIDS'));
    if (aa.length !== 0 && aa.includes(Number(data.tradeshop_id))) {
      let bb = aa.filter(x => x !== data.tradeshop_id);
      setMerchantIDS(bb);
      localStorage.setItem('merchantIDS', JSON.stringify(bb));
    } else {
      aa.push(data.tradeshop_id);
      setMerchantIDS(aa);
      localStorage.setItem('merchantIDS', JSON.stringify(aa));
    }
  };

  return (
    <>
      <div className={css.container}>
        {/* <div className="row"> */}
        <div
          style={{ ...styles.numberContainer, paddingLeft: '10px' }}
          className={css.general}
        >
          <img
            src={
              merchantIDS.includes(data.tradeshop_id)
                ? checkboxblack
                : checkboxgray
            }
            alt='check box'
            style={{
              width: '24px',
              height: '24px'
            }}
            onClick={SaveHandler}
          />
          <span
            onClick={() => setDetail(true)}
            style={{
              fontSize: '12px',
              fontWeight: '400',
              marginLeft: '10px'
            }}
          >
            {data.tradeshop_id}
          </span>
        </div>
        <div className={css.general} style={{ ...styles.createdContainer }}>
          {data?.created_date ? data?.created_date?.substring(0, 10) : null}
        </div>
        <div
          className={css.general}
          style={{
            ...styles.companyContainer
          }}
        >
          {data.customer_name}
        </div>
        <div className={css.general} style={{ ...styles.notifContainer }}>
          <img
            src={notifIcon}
            alt='notif'
            style={{ width: '24px', heigth: '24px', objectFit: 'cover' }}
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
        <div className={css.general} style={{ ...styles.registerContainer }}>
          {data.business_register}
        </div>
        <div className={css.general} style={{ ...styles.channelContainer }}>
          {channel}
        </div>
        <div className={css.general} style={{ ...styles.serviceContainer }}>
          {businessType}
        </div>

        <div className={css.general} style={{ ...styles.nameContainer }}>
          {data.tradeshop_name}
        </div>
        <div className={css.general} style={{ ...styles.phoneContainer }}>
          {data.user_phone_number}
        </div>
        <div
          className={css.general}
          style={{ ...styles.companyPhoneContainer }}
        >
          {data.tradeshop_phone}
        </div>
        <div className={css.general} style={{ ...styles.cityContainer }}>
          {city}
        </div>
        <div className={css.general} style={{ ...styles.districtContainer }}>
          {district}
        </div>
        <div className={css.general} style={{ ...styles.khorooContainer }}>
          {khoroo}
        </div>
        <div
          className={`${css.general} ${css.address}`}
          style={{ ...styles.addressContainer }}
          title={data.address}
        >
          {data.address}
        </div>

        <div
          className={css.general}
          style={{
            ...styles.licenceContainer,
            overflow: 'hidden',
            paddingLeft: '10px',
            paddingRight: '10px'
          }}
          onClick={() => {
            setOpenAlco(true);
          }}
        >
          {data.alcohol_sale === 1 ? (
            <div
              style={{
                width: '100%',
                borderRadius: '5px',
                textAlign: 'center',
                color: '#389e0d',
                background: '#f6ffed',
                border: '1px solid #b7eb8f',
                fontSize: '14px'
              }}
            >
              Зөвшөөрсөн
            </div>
          ) : data.alcohol_sale === 2 ? (
            <div
              style={{
                width: '100%',
                borderRadius: '5px',
                textAlign: 'center',
                color: '#0958d9',
                background: '#e6f4ff',
                border: '1px solid #91caff',
                fontSize: '14px'
              }}
            >
              Илгээгээгүй
            </div>
          ) : data.alcohol_sale === 3 ? (
            <div
              style={{
                width: '100%',
                borderRadius: '5px',
                textAlign: 'center',
                color: '#d48806',
                background: ' #fffbe6',
                border: '1px solid #ffe58f',
                lineHeight: '16px',
                fontSize: '14px'
              }}
            >
              Хянагдаж байгаа
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                borderRadius: '5px',
                textAlign: 'center',
                color: '#cf1322',
                background: '#fff1f0',
                border: '1px solid #ffa39e',
                fontSize: '14px'
              }}
            >
              Татгалзсан
            </div>
          )}
        </div>
        <div
          className={css.general}
          style={{
            ...styles.licenceContainer,
            overflow: 'hidden',
            paddingLeft: '10px',
            paddingRight: '10px'
          }}
          onClick={() => {
            setOpenZaza(true);
          }}
        >
          <div
            style={{
              background: '#fff0f6',
              width: '100%',
              borderRadius: '5px',
              textAlign: 'center',
              color: '#c41d7f',
              border: '1px solid #ffadd2',
              fontSize: '14px'
            }}
          >
            Загвар
          </div>
        </div>
        <div
          className={css.general}
          style={{
            ...styles.licenceContainer,
            overflow: 'hidden',
            paddingLeft: '10px',
            paddingRight: '10px',
            // display:
            //   props.userData.company_id === "|14014|" &&
            //   props.userData.tradeshop
            //     ? "block"
            //     : "none",
            display: buramhanDate ? 'block' : 'none'
          }}
        >
          {data.is_active === 1 ? (
            <div
              style={{
                background: '#B0BEC5',
                width: '100%',
                borderRadius: '5px',
                textAlign: 'center',
                color: '#fff',
                border: '1px solid #B0BEC5',
                fontSize: '14px'
              }}
              onClick={approveHandler}
            >
              Зөвшөөрөх
            </div>
          ) : (
            <div
              style={{
                background: '#ffa600',
                width: '100%',
                borderRadius: '5px',
                textAlign: 'center',
                color: '#fff',
                border: '1px solid #ffadd2',
                fontSize: '14px'
              }}
            >
              Зөвшөөрөгдсөн
            </div>
          )}
        </div>
      </div>
      <div>
        {detail ? (
          <Detail2
            data={props.data}
            locations={locations}
            bustype={bustype}
            setDetail={foo}
            setData={setData}
            user={props.userData}
          />
        ) : null}
      </div>
      <Modal
        title={
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700'
            }}
          >
            <div style={{ fontSize: '4px', lineHeight: '5px' }}>гэрлээ</div>
            {data.tradeshop_name} хэрэглэгч рүү мэдэгдэл илгээх
          </div>
        }
        centered
        open={open}
        onOk={() => {
          send();
        }}
        onCancel={() => setOpen(false)}
        width='50%'
        okText={'Илгээх'}
        cancelText={'Цуцлах'}
        bodyStyle={{ padding: '5px 30px' }}
      >
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700' }}>Гарчиг</div>
          <input
            placeholder='Текст бичих ...'
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              height: '40px',
              width: '100%',
              outline: 'none',
              fontSize: '14px',
              fontWeight: '600',
              padding: '10px'
            }}
          />
          <div
            style={{
              fontSize: '16px',
              fontWeight: '700',
              marginTop: '20px'
            }}
          >
            Бие
          </div>
          <input
            placeholder='Текст бичих ...'
            value={body}
            onChange={e => setBody(e.target.value)}
            style={{
              height: '100px',
              width: '100%',
              outline: 'none',
              fontSize: '14px',
              fontWeight: '600',
              padding: '10px'
            }}
          />

          <span
            style={{
              fontSize: '16px',
              fontWeight: '700',
              marginTop: '20px'
            }}
          >
            <input
              type='checkbox'
              onChange={a => {
                setIsTemplate(a.target.checked);
              }}
            />{' '}
            Санал болгож буй захиалгын загвар руу шилжих эсэх?
          </span>
        </div>
      </Modal>
      <Modal
        title={
          <div
            style={{
              fontSize: '14px',
              fontWeight: '700'
            }}
          >
            Тусгай зөвшөөрөл - {data.tradeshop_name}
          </div>
        }
        centered
        open={openAlco}
        onOk={() => {
          save();
        }}
        onCancel={() => setOpenAlco(false)}
        width='400px'
        okText={'Хадгалах'}
        cancelText={'Цуцлах'}
        bodyStyle={{ padding: '5px 30px' }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <input
              type='radio'
              name='type'
              // value={type}
              checked={type === 1}
              onChange={() => setType(1)}
              style={{
                marginRight: '5px'
              }}
            />
            Зөвшөөрсөн
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <input
              type='radio'
              name='type'
              // value={type}
              checked={type === 2}
              onChange={() => setType(2)}
              style={{
                marginRight: '5px'
              }}
            />
            Илгээгээгүй
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <input
              type='radio'
              name='type'
              // value={type}
              checked={type === 3}
              onChange={() => setType(3)}
              style={{
                marginRight: '5px'
              }}
            />
            Хянагдаж байгаа
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <input
              type='radio'
              name='type'
              // value={type}
              checked={type === 4}
              onChange={() => setType(4)}
              style={{
                marginRight: '5px'
              }}
            />
            Татгалзсан
          </div>
        </div>
      </Modal>
      <Modal
        title={null}
        centered
        open={openZaza}
        width='600px'
        footer={null}
        onCancel={() => setOpenZaza(false)}
        bodyStyle={{
          padding: '15px 25px',
          minHeight: '275px'
        }}
      >
        <div>
          <div>
            {template ? (
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '20px'
                }}
              >
                Захиалгын загвар - {data.tradeshop_name} -{' '}
                {templates[template - 1]?.template_name}
              </div>
            ) : (
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '20px'
                }}
              >
                Захиалгын загвар - {data?.tradeshop_name}
              </div>
            )}
          </div>
          {template ? (
            <SingleProduct
              suppliers={props.suppliers}
              setTemplate={setTemplate}
              template={template}
              templates={templates}
              setOpenZaza={setOpenZaza}
              tradeshop_id={props.data.tradeshop_id}
            />
          ) : (
            <>
              {templates?.map((e, i) => (
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    width: '100%',
                    padding: '5px 10px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    border: '1px solid #cfd8dc',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  key={i}
                >
                  {e.template_name}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        marginRight: '15px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px'
                      }}
                    >
                      {
                        props?.suppliers?.find(a => a.id === e.supplier_id)
                          ?.name
                      }
                    </div>
                    <div
                      style={{
                        marginRight: '10px',
                        width: '65px'
                      }}
                    >
                      <div>{e.line.length} төрлийн</div>
                      <div>
                        {e.line.length > 0
                          ? e.line
                              ?.map(i => i.quantity)
                              ?.reduce((a, b) => a + b)
                          : 0}{' '}
                        бараа
                      </div>
                    </div>

                    {/* <img
											src={DeleteIcon}
											onClick={() => {
												deleteTemplate(e._id);
											}}
											alt="edit"
											height={25}
											style={{ cursor: "pointer" }}
										/> */}
                    <Popconfirm
                      placement='right'
                      title='Та энэ загварыг устгахдаа итгэлтэй байна уу?'
                      onConfirm={() => deleteTemplate(e._id)}
                      okText='Тийм'
                      cancelText='Үгүй'
                    >
                      <img
                        src={DeleteIcon}
                        alt='edit'
                        height={25}
                        style={{ cursor: 'pointer' }}
                      />
                    </Popconfirm>
                    <img
                      src={Edit}
                      onClick={() => {
                        setTemplate(e._id);
                      }}
                      alt='edit'
                      height={25}
                      style={{ cursor: 'pointer', marginLeft: '20px' }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  setTemplate('new');
                }}
                style={{
                  padding: '5px',
                  fontSize: '14px',
                  borderRadius: '5px',
                  border: '1px solid #cfd8dc',
                  cursor: 'pointer',
                  fontWeight: '700'
                }}
              >
                Шинэ загвар нэмэх
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Merchant;
