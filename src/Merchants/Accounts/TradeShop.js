import { Modal, Popconfirm, message } from 'antd';
import { useEffect, useState } from 'react';
import css from './tradeshop.module.css';
import { styles } from './style';
import myHeaders from '../../components/MyHeader/myHeader';
import DeleteIcon from '../../assets/delete_red_small.svg';
import Edit from '../../assets/EditSquare.svg';
import SingleProduct from '../SingleTemplate';
import editIcon from '../../assets/Edit_icon.svg';
import Detail from './Detail';

const TradeShop = props => {
  let shop = props.data;
  const [openZaza, setOpenZaza] = useState(false);
  const [template, setTemplate] = useState();
  const [templates, setTemplates] = useState([]);
  const [openAlco, setOpenAlco] = useState(false);
  const [selectValue, setSelectValue] = useState(props.data.approved);

  const [data, setData] = useState([]);
  const [detail, setDetail] = useState(false);
  const [type, setType] = useState();

  let city = shop.city;
  let district = shop.district;
  let khoroo = shop.khoroo;
  let locations = props.locations;
  let businessType = null;
  let channel = null;

  const locationsCity = [
    { id: 1, name: 'УБ' },
    { id: 11, name: 'АРА' },
    { id: 32, name: 'БӨА' },
    { id: 47, name: 'БХА' },
    { id: 69, name: 'БУА' },
    { id: 86, name: 'ГАА' },
    { id: 106, name: 'ГСА' },
    { id: 111, name: 'ДУА' },
    { id: 117, name: 'ДГА' },
    { id: 132, name: 'ДОА' },
    { id: 148, name: 'ДУА' },
    { id: 165, name: 'ЗАА' },
    { id: 190, name: 'ОРА' },
    { id: 194, name: 'ӨХА' },
    { id: 214, name: 'ӨГА' },
    { id: 230, name: 'СБА' },
    { id: 244, name: 'СЭА' },
    { id: 262, name: 'ТӨА' },
    { id: 290, name: 'УВА' },
    { id: 310, name: 'ХОА' },
    { id: 329, name: 'ХӨА' },
    { id: 355, name: 'ХЭА' }
  ];
  const locationsDistrict = [
    { id: 2, name: 'БНД' },
    { id: 3, name: 'БХД' },
    { id: 4, name: 'БГД' },
    { id: 5, name: 'БЗД' },
    { id: 6, name: 'НД' },
    { id: 7, name: 'СХД' },
    { id: 8, name: 'СБД' },
    { id: 9, name: 'ХУД' },
    { id: 10, name: 'ЧД' }
  ];

  if (locations) {
    locations.map(location => {
      locationsDistrict.map(locationD => {
        if (locationD.id === parseInt(district, 10)) {
          district = locationD.name;
        } else if (location.location_id === parseInt(district, 10)) {
          district = location.location_name;
        }
      });
    });
    locations.map(location => {
      if (location.location_id === parseInt(khoroo, 10)) {
        khoroo = location.location_name;
      }
    });
    locations.map(location => {
      locationsCity.map(locationCity => {
        if (locationCity.id === parseInt(city, 10)) {
          city = locationCity.name;
        } else if (location.location_id === parseInt(city, 10)) {
          city = location.location_name;
        }
      });
    });
  }

  if (props.businessType) {
    props.businessType.map(type => {
      if (type.business_type_id === parseInt(shop.businessType)) {
        businessType = type.business_type_name;
        channel = type.channel_name;
      }
    });
  }

  let foo = () => {
    setDetail(false);
  };

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(props.data)));
  }, [props.data]);

  useEffect(() => {
    if (openZaza) {
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
  };

  const save = () => {
    var raw = JSON.stringify({
      status: type,
      tradeshop_id: shop.tradeshopId
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
          props.getRequest();
        } else {
          message.error('Алдаа гарлаа');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    setOpenAlco(false);
  };

  return (
    <div
      style={{
        width: '100%',
        flex: '1',
        display: 'flex',
        borderBottom: '0.8px solid #cfd8dc',
        borderRight: '0.8px solid #cfd8dc',
        padding: '0 5px',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ fontSize: '12px', ...styles.tradeshopId }}>
        {shop.tradeshopId}
      </div>
      <div
        className={css.address}
        style={{ fontSize: '12px', ...styles.tradeshopName }}
      >
        {shop.tradeshopName}
      </div>
      <div style={{ fontSize: '12px', ...styles.tradeshopType }}>
        {businessType}
      </div>
      <div style={{ fontSize: '12px', ...styles.tradeshopChannel }}>
        {channel}
      </div>
      <div
        style={{
          fontSize: '12px',
          ...styles.tradeshopCity,
          textAlign: 'center'
        }}
      >
        {city}
      </div>
      <div
        style={{
          fontSize: '12px',
          ...styles.tradeshopDistrict,
          textAlign: 'center'
        }}
      >
        {district}
      </div>
      <div
        style={{
          fontSize: '12px',
          ...styles.tradeshopKhoroo,
          textAlign: 'center'
        }}
      >
        {khoroo}
      </div>
      <div
        className={css.address}
        style={{
          fontSize: '12px',
          ...styles.tradeshopAddress,
          padding: '0 3px',
          textAlign: 'center'
        }}
      >
        {shop.address}
      </div>

      <div
        className={css.general}
        style={{
          ...styles.licenceContainer
        }}
        onClick={() => {
          setOpenAlco(true);
        }}
      >
        {shop.alcohol === 1 ? (
          <div
            style={{
              width: '85px',
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
        ) : shop.alcohol === 2 ? (
          <div
            style={{
              width: '85px',
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
        ) : shop.alcohol === 3 ? (
          <div
            style={{
              width: '85px',
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
              width: '85px',
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
          // overflow: "hidden",
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
            width: '85px',
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
        style={{ textAlign: 'center', width: '30px' }}
      >
        <img
          src={editIcon}
          alt='edit icon'
          onClick={() => setDetail(true)}
        ></img>
      </div>

      <select
        style={{
          backgroundColor:
            selectValue === null
              ? 'white'
              : selectValue === 'true'
              ? '#f6ffed'
              : '#fff0f6',
          border:
            selectValue === null
              ? '1px solid #cfd8dc'
              : selectValue === 'true'
              ? '1px solid #b7eb8f'
              : '1px solid #ffadd2',
          borderRadius: '5px',
          color:
            selectValue === null
              ? 'black'
              : selectValue === 'true'
              ? '#389e0d'
              : '#c41d7f',
          textAlign: 'center',
          marginLeft: '2px'
        }}
        onChange={e => {
          let text = '';
          if (e.target.value === 'false') {
            text = 'DECLINE';
          } else if (e.target.value === 'true') {
            text = 'ACCEPT';
          }
          if (text) {
            if (window.confirm(`Are you sure to ${text} ?`)) {
              setSelectValue(e.target.value);
              const PutRequest = () => {
                var requestOptions = {
                  method: 'PUT',
                  headers: myHeaders,
                  body: JSON.stringify({
                    approved: e.target.value
                  }),
                  redirect: 'follow'
                };
                fetch(
                  `${process.env.REACT_APP_API_URL2}/tradeshops?tradeshopId=${shop.tradeshopId}`,
                  requestOptions
                )
                  .then(res => res.json())
                  .then(response => {
                    if (response.message === 'success') {
                      props.getRequest();
                    }
                  });
              };
              PutRequest();
            }
          } else {
            setSelectValue('');
          }
        }}
        value={selectValue}
      >
        {selectValue ? null : <option value=''>...</option>}
        <option value='true'>Accept</option>
        <option value='false'>Decline</option>
      </select>

      {detail ? (
        <Detail
          data={shop}
          locations={props.locations}
          bustype={props.businessType}
          setDetail={foo}
          setData={setData}
          business={props.business}
          userData={props.userData}
          getRequest={props.getRequest}
          selectValue={selectValue}
          sfa={props.sfa}
          datas={props.datas}
        />
      ) : null}

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
                Захиалгын загвар - {shop.name} -{' '}
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
                Захиалгын загвар - {shop.name}
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
              tradeshop_id={shop.id}
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

                    <img
                      src={DeleteIcon}
                      onClick={() => {
                        deleteTemplate(e._id);
                      }}
                      alt='edit'
                      height={25}
                      style={{ cursor: 'pointer' }}
                    />
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

      <Modal
        title={
          <div
            style={{
              fontSize: '14px',
              fontWeight: '700'
            }}
          >
            Тусгай зөвшөөрөл - {data.tradeshopName}
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
    </div>
  );
};

export default TradeShop;
