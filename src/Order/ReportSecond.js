import React, { useState, useEffect, useContext } from 'react';
import CSV from './CSV';
import OrderReportHook from '../Hooks/OrderReportHook';
import css from './reportsecond.module.css';
import OrderHook from '../Hooks/OrdersHook';
import Spinner from '../components/Spinner/Spinner';
import myHeaders from '../components/MyHeader/myHeader';
import SuppliersNew from '../components/SupplierNew/SuppliersNew';
import SelectCompany from './Company/SelectCompany';
import { Modal } from '../Achiltiinzahialga/components/common';
import { Button, Checkbox } from '../components/common';

/////// ORDERIIN HURAANGUI TAILAN
function ReportSecond(props) {
  const orderFilterctx = useContext(OrderHook);
  const { updateUser, fieldsDataReport, setFieldsDataReport } = orderFilterctx;

  // console.log("props delgerengui report", props);
  let [data, setData] = useState(true);
  let [foo, setFoo] = useState(false);
  const [sp, setSp] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [chosedsup, setChosedsup] = useState(null);
  const [searchModal, setSearchModal] = useState(false);
  const [urltrue, setUrltrue] = useState(false);
  const [suppliersDATA, SetSuppliersData] = useState([]);
  const [supSelect, setSupSelect] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const chooseHandler = item => {
    setChosedsup(item);
    setSearchValue(null);
    setSearchModal(false);
  };

  let locations = props.locations;
  let categories = props.categories;
  let suppliers = props.page.suppliers;
  const orderCtx = useContext(OrderReportHook);
  // console.log("orderFilterctx");
  useEffect(() => {
    if (!props.permissionData.order.report) {
      //alert("Таньд захиалгын тайлангийн эрх байхгүй байна.");
      //orderCtx?.setReportSecond(false);
      //return;
    }
  }, [props.permissionData]);

  let status = props.status ? props.status : '';
  let tradeshopPhone = orderFilterctx.phone ? orderFilterctx.phone : '';
  let supplierID = orderFilterctx?.supplierID ? orderFilterctx?.supplierID : '';

  let csv = [
    [
      'Order number',
      'Vendor',
      'Total',
      'Completed at',
      'When to ship',
      'Shipped at',
      'Note',
      'Receiver phone',
      'Receiver info',
      'Receiver name',
      'Branch',
      'Business type',
      'State name',
      'District',
      'Quarter',
      'Address',
      'Original total',
      'Status',
      'Register'
    ]
  ];
  if (props.userData.company_id === '|14014|') {
    csv[0].push('XT ID', 'XT name', 'XT phone');
    console.log('csv', csv);
  }
  if (props.userData.company_id === '|13954|') {
    csv = [
      [
        'Order number',
        'Vendor',
        'Register',
        'Total',
        'Completed at',
        'When to ship',
        'Branch',
        'Original total',
        'Status'
      ]
    ];
  }

  if (props.userData.company_id === '|948|') {
    csv[0].push('Payment Method', 'XT Name');
  }

  let [blah, setBlah] = useState(csv);
  const getCategories = categoryId => {
    // console.log("gettin cats");
    let cats = {
      main: '',
      sub: '',
      subsub: ''
    };
    categories.map(category => {
      if (category.id === categoryId) {
        if (category.parent_id === 0) {
          cats['main'] = category['name'];
        } else {
          let parent = category.parent_id;
          categories.map(categoryParent => {
            if (categoryParent.id === category.parent_id) {
              if (categoryParent.id === 0) {
                cats['main'] = categoryParent['name'];
                cats['sub'] = category['name'];
              } else {
                categories.map(categoryParentParent => {
                  if (categoryParentParent.id === categoryParent.parent_id) {
                    cats['main'] = categoryParentParent['name'];
                    cats['sub'] = categoryParent['name'];
                    cats['subsub'] = category['name'];
                  }
                });
              }
            }
          });
        }
      }
    });
    return cats;
  };

  const getOrders = () => {
    const date_start = document.getElementById('date_start');
    const date_end = document.getElementById('date_end');
    let urlReport = localStorage.getItem('url');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    if (
      props.userData.company_id === '|1|' &&
      date_start.value &&
      date_end.value
    ) {
      // urlReport = `${process.env.REACT_APP_API_URL2}/api/orders?delivery_start=${date_start?.value}&delivery_end=${date_end?.value}&page=all`;

      // urlReport = `${process.env.REACT_APP_API_URL2}/api/orders?delivery_start=2023-06-01&delivery_end=2023-06-30&tradeshop_phone=95051516&page=all`;
      // urlReport = `${process.env.REACT_APP_API_URL2}/api/orders?delivery_start=2023-06-01&delivery_end=2023-06-30&tradeshop_phone=99964644&page=all`;

      // urlReport = `${process.env.REACT_APP_API_URL2}/api/orders?order_start=2023-04-01&order_end=2023-06-30&tradeshop_phone=99964644&page=all`;
      urlReport = `${process.env.REACT_APP_API_URL2}/api/order/duplicate/get?start_date=${date_start?.value}&end_date=${date_end?.value}`;
      requestOptions['method'] = 'POST';
      requestOptions['body'] = JSON.stringify({
        start_date: date_start?.value,
        end_date: date_end?.value + ' 23:59:59',
        delivery_date: true,
        order_date: true,
        projection: {
          order_id: 1,
          customer_id: 1,
          line: 1,
          user_id: 1,
          tradeshop_name: 1,
          tradeshop_id: 1,
          tradeshop_horoo: 1,
          tradeshop_district: 1,
          tradeshop_city: 1,
          supplier_name: 1,
          status: 1,
          state: 1,
          register: 1,
          order_type: 1,
          order_date: 1,
          order_cancel_reason: 1,
          description: 1,
          delivery_date: 1,
          customer_type: 1,
          business_type_id: 1,
          business_name: 1,
          address: 1,
          back_office_user: 1,
          cart_date: 1,
          coupon_amount: 1,
          delivery_status: 1,
          grand_total: 1,
          minimum_order_amount: 1,
          order_data: 1,
          origin: 1,
          payment_amount: 1,
          payment_status: 1,
          phone: 1,
          pickpack: 1,
          supplier_id: 1,
          updated_date: 1,
          raw_order: 1
        }
      });
    }

    if (
      props.userData.company_id !== '|1|' &&
      date_start.value &&
      date_end.value
    ) {
      urlReport = `${process.env.REACT_APP_API_URL2}/api/orders?order_type=1&delivery_start=${date_start?.value}&delivery_end=${date_end?.value}&page=all`;
    }
    console.log('requestOptions', requestOptions);
    console.log('urlReport +++++ huraaangui tailan', urlReport);
    setSp(true);
    fetch(urlReport, requestOptions)
      .then(r => r.json())
      .then(response => {
        setSp(false);
        let counter = 0;
        let lines = [];
        console.log('buramhan order all ', response);
        let newdata = [];
        if (props.userData.company_id === '|1|') {
          newdata = response;
        } else {
          newdata = response.data;
        }
        newdata.map(order => {
          const orderId = order.order_id;
          let supplierName = order.supplier_name;

          const customerPhone = order.phone;
          const customerAddress = order.address;
          const createdDate = order.order_date
            ? order.order_date.substr(0, 10) +
              ' ' +
              order.order_date.substr(11, 8)
            : '';
          const shippingDate = order.delivery_date
            ? order.delivery_date.substr(0, 10)
            : '';
          let note = '';
          let city = '';
          let khoroo = '';
          let district = '';
          let supRegister = '';
          let buram = [];

          if (props.userData.company_id === '|14014|') {
            props.buramhanajilchid.map(item => {
              console.log('item', item);
              if (item.user_id === Number(order.back_office_user)) {
                buram.push(item);
              }

              if (order.back_office_user === null) {
                buram.push({
                  created_date: '2019-01-01T00:00:00.000Z',
                  email: 'example@example.com',
                  employee_id: 'null',
                  first_name: 'null',
                  is_active: 1,
                  last_name: 'null',
                  leasing: 'null',
                  notification: 'null',
                  origin: 1,
                  permission: '',
                  phone_number: 99999999,
                  profile_picture: null,
                  role: 1,
                  special_tradeshops: null,
                  supplier_id: '|14014|',
                  target: null,
                  tradeshop: null,
                  updated_by: 351,
                  updated_date: '2000-01-01T01:01:01.000Z',
                  user_id: '0000',
                  zones: null
                });
              }
            });
          }

          if (props.userData.company_id === '|948|') {
            const userIds = order.back_office_user
              .split(',')
              .map(id => Number(id))
              .filter(id => id);

            for (const userId of userIds) {
              props.buramhanajilchid?.map(item => {
                if (item.user_id === Number(userId)) {
                  buram.push(item);
                }
              });
            }
          }

          let aaSup = suppliers.filter(item => item.id === order.supplier_id);
          supRegister = aaSup.map(item => {
            return item.register;
          });

          locations &&
            locations.map(location => {
              if (
                location.location_id == parseInt(order.tradeshop_district, 10)
              ) {
                district = location.location_name;
              }
            });
          locations &&
            locations.map(location => {
              if (location.location_id == parseInt(order.tradeshop_horoo, 10)) {
                khoroo = location.location_name;
              }
            });
          locations &&
            locations.map(location => {
              if (location.location_id == parseInt(order.tradeshop_city, 10)) {
                city = location.location_name;
              }
            });
          try {
            if (order.description !== null) {
              note = JSON.parse(order.description).sort(
                (a, b) => new Date(b.date) - new Date(a.date)
              )[0].body;

              if (Array.isArray(note)) {
                note = note[0].body;
              }
            }
          } catch (e) {
            console.log('description error', e);
          }
          let total = 0;

          order.line
            .filter(e => {
              if (Number(supSelect) === null) {
                return e;
              }
              if (Number(supSelect) === 0) {
                return e;
              }
              if (Number(supSelect) === Number(e.vendor)) {
                return e;
              }
            })
            .map(l => {
              total += l.quantity * l.price;
            });

          let rawTotal = 0;

          let rawOrder;
          if (order.raw_order) {
            rawOrder = JSON.parse(order.raw_order?.toLowerCase());
          }
          if (rawOrder) {
            if (rawOrder.length !== 0) {
              rawOrder.map(ro => {
                rawTotal =
                  rawTotal + parseInt(ro.quantity, 10) * parseInt(ro.price, 10);
              });
            } else {
              // console.log("-------------------------------------");
              // console.log(order);
              console.log('order');
            }
          }
          let orderStatus = '';
          if (order.status === 1) {
            orderStatus = 'Хүлээгдэж буй';
          } else if (order.status === 2) {
            orderStatus = 'Баталгаажсан';
          } else if (order.status === 3) {
            orderStatus = 'Хүргэгдсэн';
          } else if (order.status === 5) {
            orderStatus = 'Цуцлагдсан';
          }

          if (Number(supSelect) == 948) {
            supplierName = 'Нүүдэл ЖИ ХХК';
          }

          let temp = [
            orderId,
            supplierName,
            total,
            createdDate,
            shippingDate,
            '',
            // order.upoint_bonus_amount,
            // order.upoint_consume_amount,
            // order.upoint_added_bonus_amount,
            note ? note : '',
            customerPhone,
            order.register,
            order.business_name ? order.business_name : '',
            order.tradeshop_name,
            '',
            city,
            district,
            khoroo,
            order.address,
            Number(rawTotal),
            orderStatus,
            supRegister
          ];
          if (props.userData.company_id === '|14014|') {
            console.log('buram', buram);
            temp.push(
              buram[0].user_id,
              buram[0].first_name,
              buram[0].phone_number
            );
          }
          if (props.userData.company_id === '|13954|') {
            temp = [
              orderId,
              supplierName,
              supRegister,
              total,
              createdDate,
              shippingDate,
              order.tradeshop_name,
              Number(rawTotal),
              orderStatus
            ];
          }
          if (props.userData.company_id === '|948|') {
            const payMeth = [
              { Id: 0, Name: 'Дансаар' },
              { Id: 1, Name: 'Бэлнээр' },
              { Id: 2, Name: 'Зээлээр' },
              { Id: 3, Name: 'Бэлэн+Данс' },
              { Id: 4, Name: 'Бэлэн+Зээл' },
              { Id: 5, Name: 'Данс+Зээл' }
            ];
            // const orderdata =
            //   order && order?.order_data ? JSON.parse(order.order_data) : "";

            let orderdata = '';
            if (
              order &&
              order.order_data !== null &&
              order.order_data !== 'null'
            ) {
              orderdata = JSON.stringify(order.order_data);
            }
            const paymentMethod =
              orderdata && orderdata['payment']
                ? payMeth.find(el => el.Id === orderdata['payment'].paymentId)
                    .Name ?? ''
                : '';

            temp.push(paymentMethod, buram[0].first_name);
          }
          // console.log("temp", temp);
          lines.push(temp);
        });
        setFoo(true);
        setBlah(csv => csv.concat(lines));
        orderFilterctx.setSupplierID('');
        orderFilterctx.setPhone('');
      })
      .catch(error => {
        console.log('error all order fetch error', error);
        setSp(false);
      });
  };

  useEffect(() => {
    if (searchValue === null) {
      return;
    }
    if (searchValue !== null) {
      setSearchModal(true);
      var myHeaders = new Headers();
      myHeaders.append(
        'ebazaar_token',
        localStorage.getItem('ebazaar_admin_token')
      );
      myHeaders.append('Content-Type', 'application/json');
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?name=${searchValue}`,
        requestOptions
      )
        .then(r => r.json())
        .then(response => {
          SetSuppliersData(response.data);
          // setSearchValue(response.data);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, [searchValue]);

  const fieldsDataReportCheck = () => {
    fieldsDataReport.map(field => {
      if (blah.length > 1 && !field.show) {
        const index = blah[0].findIndex(
          element => element.toLowerCase() === field.fieldName.toLowerCase()
        );
        if (index > -1) {
          blah.map(e => e.splice(index, 1));
        }
        setBlah(blah);
      }
    });
  };

  let renderHTML =
    foo && data && blah.length > 1 ? (
      <>
        <span id='close' onClick={() => orderCtx.setReportSecond(false)}>
          Close
        </span>
        <CSV data={blah} />
      </>
    ) : (
      <div style={{ display: 'flex', position: 'relative' }}>
        <div>
          <div>
            <span
              style={{
                fontWeight: '700',
                color: '#37474F'
              }}
            >
              Үндсэн тайлан
            </span>
          </div>
          {props.userData.company_id == '|948|' ? (
            <SelectCompany setSupSelect={setSupSelect} />
          ) : null}

          <div>
            <label>Эхлэх огноо</label>
            <input type='date' className='dateselect' id='date_start' />
          </div>
          <div>
            <label>Дуусах огноо</label>
            <input type='date' className='dateselect' id='date_end' />
          </div>
          {!sp && (
            <button
              onClick={() => {
                getOrders();
                setIsModal(true);
              }}
              className={css.btnContainer}
            >
              Тайлан бэлтгэх
            </button>
          )}
        </div>
        {sp && (
          <div className={css.spinnercontainer}>
            <Spinner />
          </div>
        )}
        <div>
          <span id='close' onClick={() => orderCtx.setReportSecond(false)}>
            Close
          </span>
        </div>
      </div>
    );

  return (
    <div id='formwithtransparentbackground'>
      <div id='form'>{renderHTML}</div>

      <div id='transparentbackground'></div>
      {isModal && (
        <Modal
          width={500}
          height={600}
          closeHandler={() => setIsModal(!isModal)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              width: '100%',
              height: '100%',
              padding: '20px 30px'
            }}
          >
            <div style={{ width: '100%' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700' }}>
                Field үүд сонгох
              </h2>
            </div>
            <div className={css.content}>
              {fieldsDataReport.map((field, index) => {
                return csv[0].filter(e => e == field.fieldName).length ? (
                  <div className={css.singleField} key={index}>
                    <Checkbox
                      variant='primary'
                      checked={field.show}
                      onChange={e => {
                        setFieldsDataReport(prevFieldsData => {
                          return prevFieldsData.map((item, idx) =>
                            idx === index
                              ? { ...item, show: e.target.checked }
                              : item
                          );
                        });
                      }}
                    />
                    <label>{field.fieldName}</label>
                  </div>
                ) : null;
              })}
            </div>
            <div className={css.footer}>
              <div className={css.left}>
                <Button
                  variant='primary'
                  size='medium'
                  onClick={() => {
                    fieldsDataReportCheck();
                    setIsModal(!isModal);
                    orderCtx.setReportSecond(false);
                    updateUser({ fieldsDataReport: 'restart' });
                  }}
                >
                  Reset
                </Button>
              </div>
              <div className={css.right}>
                <Button
                  variant='secondary'
                  size='medium'
                  onClick={() => {
                    setIsModal(!isModal);
                  }}
                >
                  Цуцлах
                </Button>
                <Button
                  variant='primary'
                  size='medium'
                  onClick={() => {
                    fieldsDataReportCheck();
                    setIsModal(!isModal);
                    updateUser({ fieldsDataReport });
                  }}
                >
                  Хадгалах
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ReportSecond;
