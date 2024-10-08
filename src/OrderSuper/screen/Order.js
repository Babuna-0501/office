import React, { useState, useEffect } from 'react';
import ProductAvatar from '../components/productImg/productImg';
import Channel from '../data/info';
import './style.css';
import getColorForStatus, { getChangeStatusThemes } from '../components/color';
import LocationData from '../data/location.json';
import OrderDetail from '../components/orderDetail/orderDetail';
import myHeaders from '../../components/MyHeader/myHeader';
import { ProductModal } from '../components/product/modal';
import { NoteOrderDetail } from '../components/note';
import DeliveryDate from '../components/DeliveryDate';
import Barimt from '../../Order/Tabs/OrderReport/Barimt';

const Order = ({ fieldsData, setOrder, ...props }) => {
  const [filteredData, setFilteredData] = useState([]);
  const data = filteredData.length ? filteredData : props.data;
  const [deliveryDate, setDeliveryDate] = useState(data.delivery_date);
  const [showDeliveryDate, setShowDeliveryDate] = useState(false);
  const [isModalPadaanOpen, setIsModalPadaanOpen] = useState(false);

  const handleDivClick = () => {
    setShowDeliveryDate(true);
  };

  const handleSave = updatedOrder => {
    setOrder(updatedOrder);
    setDeliveryDate(updatedOrder.delivery_date);
    setShowDeliveryDate(false);
  };

  //Padaan
  const handleClickPadaan = () => {
    setIsModalPadaanOpen(true);
  };

  const handleClosePadaan = () => {
    setIsModalPadaanOpen(false);
  };
  //Түгээгчийн попап
  const { color, name, fontColor } = getColorForStatus(
    props.userData.company_id === '|14268|' ? data.ShipmentStatus : data.status
  );

  const [userId, setUserId] = useState([]);
  const getBusinessTypeName = businessTypeId => {
    const id = parseInt(businessTypeId);
    const channel = Channel.find(item => item.business_type_id === id);
    return channel ? channel.business_type_name : 'Unknown';
  };

  const businessTypeId = parseInt(data.business_type_id);
  const businessTypeName = getBusinessTypeName(businessTypeId);
  const tradeshopCityId = parseInt(data.tradeshop_city);
  const tradeshopDistrict = parseInt(data.tradeshop_district);
  const tradeshopHoroo = parseInt(data.tradeshop_horoo);
  const location = LocationData.Location.find(
    item => item.location_id === tradeshopCityId
  );
  const location2 = LocationData.Location.find(
    item => item.location_id === tradeshopDistrict
  );
  const location3 = LocationData.Location.find(
    item => item.location_id === tradeshopHoroo
  );

  const formatDate = dateString => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    return formattedDate;
  };

  const formatDate2 = dateString => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    return formattedDate;
  };

  const paymentMethods = [
    { Id: 0, Name: 'Дансаар' },
    { Id: 1, Name: 'Бэлнээр' },
    { Id: 2, Name: 'Зээлээр' },
    { Id: 3, Name: 'Бэлэн+Данс' },
    { Id: 4, Name: 'Бэлэн+Зээл' },
    { Id: 5, Name: 'Данс+Зээл' }
  ];
  const originData = [
    { id: 1, name: 'Android' },
    { id: 2, name: 'iOS' },
    { id: 3, name: 'Web' },
    { id: 4, name: 'SFA' },
    { id: 5, name: 'Base' },
    { id: 6, name: 'Eclinic' },
    { id: 7, name: 'OnTimePos' },
    { id: 8, name: 'Pos Test' },
    { id: 9, name: 'Qmenu' },
    { id: 10, name: 'Amar' }
  ];
  let ids = [];
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(undefined);
  const [editedOrder, setEditedOrders] = useState([]);
  const [payment, setPayment] = useState();
  const handleOpen = e => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsOpen(true);
  };

  const [foo, setFoo] = useState('');

  useEffect(() => {
    setPayment(props.payment);
  }, [props.payment]);

  const handleClose = () => {
    setPayment(prev => ({
      ...prev,
      edit: false
    }));
    setEdit(undefined);
    setIsOpen(false);
  };

  const editData = async () => {
    try {
      setEditedOrders(prev => [...prev, edit]);
      setEdit(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const save = async () => {
    try {
      let priceBody = JSON.stringify({
        order_id: data.order_id,
        line: editedOrder.map(e => {
          return {
            order_detail_id: e.order_detail_id,
            product_id: e.product_id,
            price: e.price
          };
        })
      });
      let quantityBody = JSON.stringify({
        order_id: data.order_id,
        line: editedOrder.map(e => {
          return {
            order_detail_id: e.order_detail_id,
            quantity: e.quantity
          };
        })
      });
      let requestOptionsPrice = {
        method: 'POST',
        headers: myHeaders,
        body: priceBody,
        redirect: 'follow'
      };
      let requestOptionsQuantity = {
        method: 'POST',
        headers: myHeaders,
        body: quantityBody,
        redirect: 'follow'
      };
      await fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/update`,
        requestOptionsQuantity
      )
        .then(response => response.json())
        .then(result => {
          console.log('quantity', result);
        });
      await fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/update/price`,
        requestOptionsPrice
      )
        .then(res => res.json())
        .then(res => {
          console.log('price', res);
        })
        .catch(error => {
          console.log('error', error);
        });
      setIsOpen(false);
      window.location.reload();
    } catch (error) {}
  };

  const changePrice = e => {
    let value = isNaN(parseFloat(e.target.value))
      ? 0
      : parseFloat(e.target.value);
    return value;
  };

  const [activeTab, setActiveTab] = useState(1);
  const handleTabbClick = tabIndex => {
    setActiveTab(tabIndex);
  };

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [statusAlert, setStatusAlert] = useState(0);
  const [cancelReasonData, setCancelReasonData] = useState([]);
  const [cancelReason, setCancelReason] = useState();

  const openAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const ProductAddHandler = item => {
    let raw = JSON.stringify({
      orderId: data.order_id,
      products: item.map(x => {
        return {
          productId: x.productId,
          quantity: x.quantity == 0 ? 1 : x.quantity,
          price: x.price
        };
      })
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/orderDetail/create`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('product add', result);
        if (result.code == 200) {
          document.location.reload();
        }
      });
  };

  const updatePayment = async () => {
    if (payment.edit) {
      let existingData = JSON.parse(data.order_data);
      let term = existingData.term;
      let discounts = existingData.discounts;
      let paymentDetails = existingData.payment;
      let brTotal = existingData.brTotal;
      let wherehouse = existingData.wherehouse;
      let promotion = existingData.promotion;
      let percent = existingData.percent;
      let delivery_fee = existingData.delivery_fee;
      let type = existingData.type;

      existingData.prePayment = payment.paid;

      let raw = JSON.stringify({
        orderId: data.order_id,
        data: {
          term: term,
          discounts: discounts,
          brTotal: brTotal,
          wherehouse: wherehouse,
          prePayment: payment.paid,
          promotion: promotion,
          percent: percent,
          delivery_fee: delivery_fee,
          type: type
        }
      });

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(
        `${process.env.REACT_APP_API_URL2}/api/orderdata/update`,
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          console.log('payment update', result);
          document.location.reload();
        })
        .catch(error => console.log('error', error));
    }

    setPayment(prev => ({ ...prev, edit: !payment.edit }));
  };

  const cancel = async () => {
    try {
      let body = {
        order_id: data.order_id,
        order_status: 5,
        cancel_reason: Number(cancelReason)
      };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(body)
      };
      let url = `${process.env.REACT_APP_API_URL2}/api/order/status`;

      await fetch(url, requestOptions)
        .then(r => r.json())
        .then(result => {
          console.log(result);
          if (result.code === 200) {
            fetch(
              `${process.env.REACT_APP_API_URL2}/api/create/backofficelog`,
              {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
                body: JSON.stringify({
                  section_name: 'Захиалгын статусыг өөрчилөв.',
                  entry_id: data.order_id,
                  user_name: props.userData.email,
                  action: `Шинэ захиалга:{"orderId":${data.order_id},"order_status":5}`
                })
              }
            )
              .then(res => res.json())
              .then(res => console.log('res', res))
              .catch(error => {
                console.log('error', error);
              });

            alert('Амжилттай хадгалагдлаа');
          } else {
            alert('Алдаа гарлаа, Дахин оролдоно уу');
          }
        })
        .catch(error => console.log('error++++', error));
    } catch (error) {
      alert('Амжилтгүй');
      console.log(error);
    }
  };

  const getCancelReason = () => {
    fetch(`${process.env.REACT_APP_API_URL2}/api/order/cancelreason`, {
      method: 'GET',
      headers: myHeaders
    })
      .then(r => r.json())
      .then(res => {
        console.log('cancel reason data', res.data);
        setCancelReasonData(res.data);
      })
      .catch(error => {
        console.log('order reason tathad aldaa ', error);
      });
  };

  const submitShipmentStatus = async (order_id, code) => {
    try {
      console.log(order_id, code);
    } catch (error) {}
  };
  // 14,

  const submit = async () => {
    try {
      const { code } = getChangeStatusThemes(
        props.userData.company_id === '|14268|'
          ? data.ShipmentStatus
          : data.status
      );
      let prev = getColorForStatus(
        props.userData.company_id === '|14268|'
          ? data.ShipmentStatus
          : data.status
      );
      let body = {
        order_id: data.order_id,
        order_status: code
      };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(body)
      };
      let url =
        code != 3
          ? `${process.env.REACT_APP_API_URL2}/api/order/status`
          : `${process.env.REACT_APP_API_URL2}/api/order/recreate`;
      await fetch(url, requestOptions)
        .then(r => r.json())
        .then(result => {
          if (result.code === 200) {
            if (code == 14 || code == 15) {
              submitShipmentStatus(data.order_id, code);
            }
            fetch(
              `${process.env.REACT_APP_API_URL2}/api/create/backofficelog`,
              {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
                body: JSON.stringify({
                  section_name: 'Захиалгын статусыг өөрчилөв.',
                  entry_id: data.order_id,
                  user_name: props.userData.email,
                  action: `Шинэ захиалга:{"orderId":${data.order_id},"order_status":${code}}`
                })
              }
            )
              .then(res => res.json())
              .then(res => console.log('res', res))
              .catch(error => {
                console.log('error', error);
              });

            alert('Амжилттай хадгалагдлаа');
          } else {
            alert('Алдаа гарлаа, Дахин оролдоно уу');
          }
        })
        .catch(error => console.log('error++++', error));
      let d = new Date();
      let date =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1) +
        '-' +
        d.getDate() +
        ' ' +
        d.getHours() +
        ':' +
        d.getMinutes();
      let desc = '';

      var raw = JSON.stringify({
        order_id: data.order_id,
        order_note: prev.name
      });

      var requestOptionsNote = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/update_note`,
        requestOptionsNote
      )
        .then(response => response.text())
        .then(result => {
          props.fetch();
        });
    } catch (error) {
      alert('Амжилтгүй');
      console.log(error);
    }
  };

  // Захиалга устгах

  const orderDeleteHandler = async order_id => {
    try {
      const confirmed = window.confirm(
        'Та энэ захиалгыг устгахдаа итгэлтэй байна уу?'
      );
      if (!confirmed) {
        return;
      }
      let raw = JSON.stringify({
        order_id: parseInt(order_id)
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/datechange`,
        requestOptions
      );
      const result = await response.json();

      if (result.code === 200) {
        alert('Амжилттай устгалаа.');
      } else {
        alert('Алдаа гарлаа.');
      }
    } catch (error) {
      console.log('Error deleting order:', error);
      alert('Алдаа гарлаа.');
    }
  };
  // console.log(props, "props ireh");
  function getOriginNameById(id) {
    const origin = originData.find(item => item.id === id);
    return origin ? origin.name : 'Дата байхгүй';
  }

  const originName = getOriginNameById(data.origin);

  function formatCurrency(value) {
    return value ? value.toLocaleString() : '0';
  }

  const formatNumber = number => {
    const [integerPart, fractionalPart] = number.toString().split('.');
    const formattedIntegerPart = parseInt(integerPart, 10).toLocaleString(
      'en-US'
    );
    const formattedFractionalPart = fractionalPart
      ? fractionalPart.replace(/0+$/, '').substring(0, 3)
      : '';
    return formattedFractionalPart
      ? `${formattedIntegerPart}.${formattedFractionalPart}`
      : formattedIntegerPart;
  };

  return (
    <div className='WrapperOut'>
      <div className='order col_wrapper'>
        <div className='order_index' style={{ width: '52px' }}>
          <div>
            <input
              type='checkbox'
              checked={props.checked}
              onChange={props.onCheckboxChange}
            />
          </div>
        </div>

        {fieldsData?.order?.field
          .sort((a, b) => a.position - b.position)
          .map(field => {
            if (!field.show || !field.permission) return;
            switch (field.id) {
              case 1:
                return (
                  <div
                    className='order_id'
                    key={field.id}
                    style={{ width: '65px' }}
                  >
                    <div className='fullcontainer idWrapper'>
                      <span>{data.order_id}</span>
                    </div>
                  </div>
                );

              case 5:
                return (
                  <div
                    className='order_product'
                    key={field.id}
                    style={{ width: '130px' }}
                  >
                    <div className='fullcontainer'>
                      <ProductAvatar data={data} />
                    </div>
                  </div>
                );

              case 35:
                return (
                  <div
                    className='order_date'
                    key={field.id}
                    style={{ width: '125px' }}
                  >
                    <div className='fullcontainer order_date'>
                      <span>{formatDate(data.order_date)}</span>
                    </div>
                  </div>
                );

              case 36:
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      className='delivery_date'
                      key={data.id}
                      onClick={handleDivClick}
                      style={{ width: '125px' }}
                    >
                      <div className='fullcontainer order_date'>
                        <span
                          style={{ display: 'flex', alignItems: 'baseline' }}
                        >
                          {formatDate2(data.delivery_date)}
                        </span>
                      </div>
                    </div>
                    {showDeliveryDate && (
                      <DeliveryDate
                        data={data}
                        setOrder={handleSave}
                        closeDeliveryDate={() => setShowDeliveryDate(false)}
                      />
                    )}
                  </div>
                );

              case 9:
                return props.data.supplier_id === 14268 ? (
                  <div
                    className='payment_mode'
                    onClick={e => handleOpen(e)}
                    style={{ width: '100px' }}
                  >
                    <div className='fullcontainer price_wrapper idWrapper'>
                      {data && <span>{data.grand_total + 6000}₮</span>}
                      <span>
                        <span style={{ fontSize: '10px' }}>
                            <span
                              style={{
                                fontSize: '12px',
                                color: '#DA1414',
                                marginTop: '-3px'
                              }}
                            >
                              {payment && payment.balance !== undefined
                                ? formatNumber(payment.balance) + '₮'
                                : 'N/A'}
                            </span>
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className='payment_mode'
                    onClick={e => handleOpen(e)}
                    style={{ width: '100px' }}
                  >
                    <div className='fullcontainer price_wrapper idWrapper'>
                      {data && <span>{formatCurrency(data.grand_total)}₮</span>}
                      <span>
                        <span style={{ fontSize: '10px' }}>
                          {payment.edit ? (
                            <input
                              value={payment.balance}
                              style={{
                                fontSize: '13px',
                                width: '70px',
                                height: '33px'
                              }}
                              onChange={e => {
                                let price = changePrice(e);
                                setPayment(prev => ({
                                  ...prev,
                                  balance: changePrice(e),
                                  paid: payment.paid - price
                                }));
                              }}
                            />
                          ) : (
                            <span
                              style={{
                                fontSize: '12px',
                                color: '#DA1414',
                                marginTop: '-3px'
                              }}
                            >
                              {payment && payment.balance !== undefined
                                ? formatNumber(payment.balance) + '₮'
                                : 'N/A'}
                            </span>
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                );


              case 12:
                return (
                  <div
                    className='cancel_reason'
                    key={field.id}
                    style={{ width: '150px' }}
                  >
                    <div className='fullcontainer'>
                      <span className='order_desc-l'>
                        {data.Note && data.Note.length > 0
                          ? `${JSON.parse(data.Note)?.[0]?.body} (${
                              JSON.parse(data.Note)?.[0]?.date?.length > 0
                                ? JSON.parse(data.Note)?.[0]
                                    ?.date.toString()
                                    .substring(0, 10)
                                : null
                            })`
                          : null}
                      </span>
                    </div>
                  </div>
                );

              case 13:
                return (
                  <div
                    className='phone'
                    key={field.id}
                    style={{ width: '85px' }}
                  >
                    <div className='fullcontainer'>
                      <span className='elips'>{data.phone}</span>
                    </div>
                  </div>
                );

              case 7:
                return (
                  <div
                    className='merchant'
                    key={field.id}
                    style={{ width: '160px' }}
                  >
                    <div className='fullcontainer'>
                      <span className='elips'>{data.tradeshop_name}</span>
                    </div>
                  </div>
                );

              case 15:
                return (
                  <div
                    className='business_type'
                    key={field.id}
                    style={{ width: '120px' }}
                  >
                    <div className='fullcontainer'>
                      <span className='elips'>{businessTypeName}</span>
                    </div>
                  </div>
                );

              case 16:
                return (
                  <div
                    className='tradeshop_city'
                    key={field.id}
                    style={{ width: '140px' }}
                  >
                    <div className='fullcontainer'>
                      {location ? (
                        <span>{location.location_name}</span>
                      ) : (
                        <span>Байршил олдсонгүй</span>
                      )}
                    </div>
                  </div>
                );

              case 17:
                return (
                  <div
                    className='tradeshop_district'
                    key={field.id}
                    style={{ width: '120px' }}
                  >
                    <div className='fullcontainer'>
                      {location2 ? (
                        <span>{location2.location_name}</span>
                      ) : (
                        <span>Байршил олдсонгүй</span>
                      )}
                    </div>
                  </div>
                );

              case 18:
                return (
                  <div
                    className='tradeshop_horoo'
                    key={field.id}
                    style={{ width: '100px' }}
                  >
                    <div className='fullcontainer'>
                      {location3 ? (
                        <span>{location3.location_name}</span>
                      ) : (
                        <span>
                          Байршил <br /> олдсонгүй
                        </span>
                      )}
                    </div>
                  </div>
                );

              case 19:
                return (
                  <div
                    className='full_address'
                    key={field.id}
                    style={{ width: '270px' }}
                  >
                    <div className='fullcontainer'>
                      <span className='elips'>{data.address}</span>
                    </div>
                  </div>
                );

              case 20:
                return (
                  <div
                    className='payment_type'
                    key={field.id}
                    style={{ width: '120px' }}
                  >
                    <div className='fullcontainer'>
                      <span>{paymentMethods[data.payment_satus].Name}</span>
                    </div>
                  </div>
                );

              case 21:
                return (
                  <div
                    className='pick_pack'
                    key={field.id}
                    style={{ width: '120px' }}
                  >
                    <div className='fullcontainer'>
                      <span>Pickpack</span>
                    </div>
                  </div>
                );

              case 22:
                return (
                  <div
                    className='origin'
                    key={field.id}
                    style={{ width: '120px' }}
                  >
                    <div className='fullcontainer'>
                      <span>{originName}</span>
                    </div>
                  </div>
                );

              case 23:
                return (
                  <div
                    className='vat'
                    key={field.id}
                    style={{ width: '120px' }}
                  >
                    <div className='fullcontainer'>
                      <span>VAT</span>
                    </div>
                  </div>
                );

              case 33:
                return (
                  <div
                    className='salesman'
                    key={field.id}
                    style={{ width: '120px' }}
                  >
                    <div className='fullcontainer'>
                      <span>{data.sales_man}</span>&nbsp;
                      <span>{props?.salesmanFirstname || ''}</span>
                    </div>
                  </div>
                );

              case 28:
                return (
                  <div
                    className='deliveryman'
                    key={field.id}
                    style={{ width: '120px' }}
                  >
                    <div className='fullcontainer'>
                      <span>{data.deliver_man}</span>&nbsp;
                      <span>{props?.firstname || ''}</span>
                    </div>
                  </div>
                );

              case 25:
                return (
                  <div
                    className='manager'
                    key={field.id}
                    style={{ width: '140px' }}
                  >
                    <div className='fullcontainer'>
                      <span>manager</span>
                    </div>
                  </div>
                );

              case 32:
                return (
                  <div
                    className='butsaalt'
                    key={field.id}
                    style={{ width: '120px' }}
                  >
                    <div className='fullcontainer'>
                      <span>butsaalt</span>
                    </div>
                  </div>
                );

              case 34:
                return (
                  <div
                    className='order_supplier'
                    key={field.id}
                    style={{ width: '90px' }}
                  >
                    <div className='fullcontainer'>
                      <span
                        className='statusbar'
                        style={{ backgroundColor: color, color: fontColor }}
                      >
                        {name}
                      </span>
                    </div>
                  </div>
                );

              default:
                return;
            }
          })}

        <div className='delete'>
          <div className='fullcontainer'>
            <button
              className='delete_order'
              onClick={() => orderDeleteHandler(data.order_id)}
            >
              Устгах
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <OrderDetail isOpen={isOpen} onClose={handleClose}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Захиалгын дугаар {data.order_id}
            </h2>
            <span style={{ cursor: 'pointer' }} onClick={handleClickPadaan}>
              <svg
                width='26'
                height='26'
                viewBox='0 0 26 26'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.1324 16.7231L13.1324 3.67871'
                  stroke='#4D4D4D'
                  stroke-width='1.625'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M16.2915 13.5518L13.1325 16.7238L9.9735 13.5518'
                  stroke='#4D4D4D'
                  stroke-width='1.625'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M18.1512 8.80566L19.162 8.80566C21.3665 8.80566 23.153 10.5921 23.153 12.7977V18.0887C23.153 20.2879 21.3709 22.07 19.1717 22.07L7.10337 22.07C4.89879 22.07 3.11129 20.2825 3.11129 18.0779V12.7858C3.11129 10.5877 4.89445 8.80566 7.09254 8.80566H8.11304'
                  stroke='#4D4D4D'
                  stroke-width='1.625'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              {/* {isModalPadaanOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <button onClick={handleClosePadaan}>Хаах</button>
                    <Barimt order={data} />
                  </div>
                </div>
              )} */}
            </span>
          </div>
          <div className='delguur'>
            <div className='delguur_top'>
              <span>
                <svg
                  width='28'
                  height='28'
                  viewBox='0 0 28 28'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='28' height='28' rx='4' fill='#F2F2F2' />
                  <path
                    d='M20.5863 13.584V19.7211C20.5863 20.6673 19.8121 21.4415 18.8659 21.4415H9.47043C8.52419 21.4415 7.75 20.6673 7.75 19.7211V15.6673'
                    stroke='#4D4D4D'
                    stroke-width='1.4'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M8.88731 7.33398C8.32817 7.33398 7.81204 7.67807 7.64 8.1942L6.60774 11.1619C6.22064 12.2372 6.90882 13.2265 8.15613 13.2265C9.05935 13.2265 9.96258 12.7103 10.3927 11.9791C10.6077 12.7103 11.2959 13.2265 12.1991 13.2265C13.1024 13.2265 13.8766 12.7103 14.2206 11.9791C14.5647 12.7103 15.3389 13.2265 16.2421 13.2265C17.1454 13.2265 17.8335 12.7103 18.0486 11.9791C18.5217 12.7103 19.3819 13.2265 20.2852 13.2265C21.5325 13.2265 22.1776 12.2802 21.7905 11.1619L20.8873 8.1942C20.7153 7.67807 20.1991 7.33398 19.683 7.33398H8.88731Z'
                    stroke='#4D4D4D'
                    stroke-width='1.4'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M16.0817 21.0827L16.0817 17.4295C16.0817 16.4402 15.2645 15.666 14.3183 15.666H14.1463C13.157 15.666 12.3828 16.4832 12.3828 17.4295L12.3828 21.0827'
                    stroke='#4D4D4D'
                    stroke-width='1.4'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </span>
              <span className='delguur_name'>{data.tradeshop_name}</span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                fontSize: '12px'
              }}
            >
              {' '}
              <span style={{ fontWeight: 'bold' }}>Хаяг:</span>
              {data.address}
            </div>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                fontSize: '12px'
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                Регистр:
              </span>
              {data.supplier_register}
              <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                Утас:{' '}
              </span>{' '}
              {data.phone}
            </div>
            <div className='delguur_btm'>
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}
              >
                <span>
                  <span style={{ fontSize: '10px' }}>Захиалсан:</span> <br />
                  <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                    {data.order_date.split('T')[0]}
                  </span>{' '}
                </span>
                <span>
                  <span style={{ fontSize: '10px' }}>Хүргүүлэх өдөр:</span>{' '}
                  <br />{' '}
                  <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                    {data.delivery_date.split('T')[0]}
                  </span>{' '}
                </span>
                <span className='tulsun'>
                  <span style={{ fontSize: '10px' }}>Төлсөн:</span>
                  {payment.edit ? (
                    <input
                      value={payment.paid}
                      style={{ fontSize: '12px', width: '70px' }}
                      onChange={e => {
                        let price = changePrice(e);
                        setPayment(prev => ({
                          ...prev,
                          paid: price,
                          balance: payment.all - price
                        }));
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: '12px', color: '#2AB674' }}>
                      {payment.paid}₮
                    </span>
                  )}
                </span>
                <span className='uldsen'>
                  <span style={{ fontSize: '10px' }}>
                    Үлдэгдэл:
                    {payment.edit ? (
                      <input
                        value={payment.balance}
                        style={{
                          fontSize: '13px',
                          width: '70px',
                          height: '33px'
                        }}
                        onChange={e => {
                          let price = changePrice(e);
                          setPayment(prev => ({
                            ...prev,
                            balance: changePrice(e),
                            paid: payment.paid - price
                          }));
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: '12px',
                          color: '#DA1414',
                          marginTop: '-3px'
                        }}
                      >
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#DA1414',
                            marginTop: '-3px'
                          }}
                        >
                          {' '}
                          {payment && payment.balance !== undefined
                            ? formatNumber(payment.balance) + '₮'
                            : 'N/A'}
                        </div>
                      </span>
                    )}
                  </span>
                </span>
                <span>
                  <span style={{ fontSize: '12px' }}>Захиалгын нийт дүн </span>
                  <br />
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {payment && payment.all !== undefined
                      ? formatNumber(payment.all) + '₮'
                      : 'N/A'}
                  </span>
                </span>
                <div
                  className='btn_edit'
                  onClick={() => {
                    alert('Үнийн дүнг шинэчлэхдээ итгэлтэй байна уу!');
                    updatePayment();
                  }}
                >
                  {payment.edit ? '' : ''}
                  <svg
                    width='20'
                    height='21'
                    viewBox='0 0 20 21'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9.57797 2.54688H6.46214C3.89964 2.54688 2.29297 4.36104 2.29297 6.92938V13.8577C2.29297 16.426 3.89214 18.2402 6.46214 18.2402H13.8155C16.3863 18.2402 17.9855 16.426 17.9855 13.8577V10.501'
                      stroke='#808080'
                      stroke-width='1.25'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M7.3575 9.32242L13.585 3.09492C14.3608 2.31992 15.6183 2.31992 16.3942 3.09492L17.4083 4.10909C18.1842 4.88492 18.1842 6.14326 17.4083 6.91826L11.1508 13.1758C10.8117 13.5149 10.3517 13.7058 9.87167 13.7058H6.75L6.82833 10.5558C6.84 10.0924 7.02917 9.65076 7.3575 9.32242Z'
                      stroke='#808080'
                      stroke-width='1.25'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M12.6367 4.05664L16.4417 7.86164'
                      stroke='#808080'
                      stroke-width='1.25'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: '10px', display: 'flex', gap: '145px' }}>
                <span>
                  <span style={{ fontSize: '10px' }}>ХТ:</span>
                  {}
                </span>
                <span>
                  <span style={{ fontSize: '10px' }}>Түгээгч:</span>
                  <span style={{ fontWeight: 'bold', fontSize: '10px' }}>
                    {data.deliver_man}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className='tabs-container'>
            <div className='tabs-header'>
              <div
                className={`tab-item ${activeTab === 1 ? 'active' : ''}`}
                onClick={() => handleTabbClick(1)}
              >
                Захиалга
              </div>
              <div
                className={`tab-item ${activeTab === 2 ? 'active' : ''}`}
                onClick={() => handleTabbClick(2)}
              >
                Мэдэгдэл
              </div>
              <div
                className={`tab-item ${activeTab === 3 ? 'active' : ''}`}
                onClick={() => handleTabbClick(3)}
              >
                Лог
              </div>
              <div
                className={`tab-item ${activeTab === 4 ? 'active' : ''}`}
                onClick={() => handleTabbClick(4)}
              >
                Тэмдэглэл
              </div>
            </div>
            <div className='tab-content'>
              {activeTab === 1 && (
                <div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className='add_product' onClick={openAddPopup}>
                      Бүтээгдэхүүн нэмэх
                    </button>
                    <button className='add_product' onClick={() => save()}>
                      Хадгалах
                    </button>
                  </div>
                  <ProductModal
                    orderId={data.order_id}
                    close={closeAddPopup}
                    submit={e => {
                      ProductAddHandler(e);
                    }}
                    supId={data.supplier_id}
                    ids={ids}
                    open={isAddPopupOpen}
                  />

                  <div className='line-section'>
                    {data.line.map(product => {
                      let edited = editedOrder.filter(
                        e => e.order_detail_id == product.order_detail_id
                      );
                      return (
                        <div
                          key={product.order_detail_id}
                          className='product-line'
                        >
                          <img
                            src={product.product_image}
                            alt={product.product_name}
                          />
                          <div className='product-info'>
                            <div style={{ fontSize: '12px' }}>
                              {product.product_name}
                            </div>

                            <div className='line-btm' style={{ gap: '10px' }}>
                              {edited.length > 0 && (
                                <>
                                  <span style={{ fontWeight: 'bold' }}>
                                    {' '}
                                    {Math.floor(edited[0].price)}₮
                                  </span>
                                  <span>*{edited[0].quantity}</span>
                                  <span style={{ fontWeight: 'bold' }}>
                                    =
                                    {Math.floor(
                                      edited[0].price * edited[0].quantity
                                    )}
                                    ₮
                                  </span>
                                </>
                              )}
                              <>
                                <span
                                  style={{
                                    fontWeight: 'bold',
                                    color: edited.length > 0 ? 'red' : 'black'
                                  }}
                                >
                                  {' '}
                                  {formatNumber(product.price)}₮
                                </span>

                                <span
                                  style={{
                                    color: edited.length > 0 ? 'red' : 'black'
                                  }}
                                >
                                  &nbsp; * {product.quantity}&nbsp;
                                </span>
                                <span
                                  style={{
                                    fontWeight: 'bold',
                                    color: edited.length > 0 ? 'red' : 'black'
                                  }}
                                >
                                  =&nbsp;
                                  {formatNumber(
                                    product.price * product.quantity
                                  )}
                                  ₮
                                </span>
                              </>

                              <div
                                style={{
                                  fontSize: '12px',
                                  display: 'flex',
                                  gap: '10px',
                                  alignItems: 'center'
                                }}
                              >
                                <span>SKU:</span>
                                {product.product_sku}
                                <span style={{ fontSize: '12px' }}>
                                  Barcode:&nbsp;{product.product_bar_code}
                                </span>
                              </div>
                            </div>

                            <div
                              onClick={() => {
                                setEdit(prev => ({
                                  ...prev,
                                  product_id: product.product_id,
                                  order_detail_id: product.order_detail_id,
                                  price: product.price,
                                  quantity: product.quantity
                                }));
                              }}
                              className='edit_b'
                            >
                              Үнэ засах
                            </div>

                            {props.userData.company_id === '|14268|' ? (
                              <div style={{ fontSize: '12px' }}>
                                Хүргэлт: 6000₮
                              </div>
                            ) : (
                              <div style={{ fontSize: '12px' }}></div>
                            )}
                          </div>

                          {/* <button
                onClick={() =>
                  edit == undefined &&
                  edit?.order_detail_id == product.order_detail_id
                    ? setEdit({
                        order_detail_id: product.order_detail_id,
                        price: product.price,
                        quantity: product.quantity,
                      })
                    : editData()
                }
              >
                {edit == undefined &&
                edit?.order_detail_id == product.order_detail_id
                  ? "edit"
                  : "done"}
              </button> */}
                        </div>
                      );
                    })}
                    <div className='btn_btm'>
                      <button
                        onClick={() => {
                          if (cancelReasonData?.length == 0) getCancelReason();
                          if (cancelReason == undefined) {
                            setCancelReason(0);
                          }
                          setStatusAlert(1);
                        }}
                      >
                        Захиалга цуцлах
                      </button>
                      <button onClick={() => setStatusAlert(2)}>
                        {
                          getChangeStatusThemes(
                            props.userData.company_id === '|14268|'
                              ? data.ShipmentStatus
                              : data.status
                          )?.name
                        }
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div className='notif'>
                  <div className='notif_head'>Push notification</div>
                  <div className='notif_ctr'>
                    <p>
                      Таны Шуурхай түгээлт-д хийсэн захиалга баталгаажиж ХХ-ХХ
                      өдөр хүргэгдэхээр боллоо. eBazaar.mn - 77071907
                    </p>
                  </div>
                  <div className='notif_head'>Notification log</div>
                </div>
              )}
              {activeTab === 3 && <div>content for Tab 3</div>}
              {activeTab === 4 && (
                <NoteOrderDetail
                  note={foo}
                  setFoo={setFoo}
                  id={data.order_id}
                  userData={props.userData}
                />
              )}

              <Modal
                cancel={() => setEdit(undefined)}
                payload={edit}
                save={() => editData()}
                open={edit != undefined}
                onChange={(e, key) => {
                  setEdit(prev => ({
                    ...prev,
                    [key]: changePrice(e)
                  }));
                }}
              />
              <Dialog
                cancel={() => setStatusAlert(0)}
                payload={
                  getChangeStatusThemes(
                    props.userData.company_id === '|14268|'
                      ? data.ShipmentStatus
                      : data.status
                  )?.name
                }
                save={() => {
                  if (statusAlert == 1) {
                    cancel();
                  } else {
                    submit();
                  }
                }}
                open={statusAlert != 0}
                type={statusAlert}
                onChange={e => {}}
              >
                {statusAlert == 1 && (
                  <select
                    value={cancelReason}
                    onChange={e => setCancelReason(e.target.value)}
                  >
                    {cancelReasonData?.map((it, index) => {
                      return (
                        <option key={index} value={index}>
                          {it.name} : {it.reason}
                        </option>
                      );
                    })}
                  </select>
                )}
              </Dialog>
            </div>
          </div>
        </OrderDetail>
      )}
    </div>
  );
};

export default Order;

export const Dialog = ({
  open,
  children,
  payload,
  cancel,
  save,
  type,
  onChange
}) => {
  if (!open) return null;

  return (
    <section className='modal'>
      <article className='modal-content p-lg-4'>
        <div className='exit-icon text-end'>
          {/* <IoMdClose onClick={onClose} /> */}
          <button onClick={cancel}>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0.452054 0.450101C0.940209 -0.0380545 1.73167 -0.0380545 2.21982 0.450101L15.5532 13.7834C16.0413 14.2716 16.0413 15.063 15.5532 15.5512C15.065 16.0394 14.2735 16.0394 13.7854 15.5512L0.452054 2.21787C-0.0361014 1.72971 -0.0361014 0.938256 0.452054 0.450101Z'
                fill='#1A1A1A'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M15.5532 0.450101C16.0413 0.938256 16.0413 1.72971 15.5532 2.21787L2.21982 15.5512C1.73167 16.0394 0.940209 16.0394 0.452054 15.5512C-0.0361014 15.063 -0.0361014 14.2716 0.452054 13.7834L13.7854 0.450101C14.2735 -0.0380545 15.065 -0.0380545 15.5532 0.450101Z'
                fill='#1A1A1A'
              />
            </svg>
          </button>
        </div>
        <main className='modal-maincontentss price_up'>
          <span>
            Та статусыг {type == 1 ? 'устгагдсан' : payload.toLowerCase()}{' '}
            болгохдоо итгэлтэй байна уу
          </span>
          {children}
          <div className='modal-button'>
            <button onClick={cancel}>Цуцлах</button>
            <button onClick={save}>Хадгалах</button>
          </div>
        </main>
      </article>
    </section>
  );
};

export const Modal = ({ open, payload, cancel, save, onChange }) => {
  if (!open) return null;

  function formatCurrency(value) {
    return value.toLocaleString();
  }

  // Function to round to three decimal places
  function roundToThreeDecimals(value) {
    return parseFloat(value.toFixed(3));
  }

  const total = roundToThreeDecimals(payload.price * payload.quantity);

  const handlePriceChange = e => {
    const value = e.target.value;
    onChange({ target: { value: value ? parseFloat(value) : '' } }, 'price');
  };

  const handleQuantityChange = e => {
    const value = e.target.value;
    onChange(
      { target: { value: value ? parseInt(value, 10) : '' } },
      'quantity'
    );
  };

  return (
    <section className='modal'>
      <article className='modal-content p-lg-4'>
        <div className='exit-icon text-end'>
          <div onClick={cancel}>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.452054 0.450101C0.940209 -0.0380545 1.73167 -0.0380545 2.21982 0.450101L15.5532 13.7834C16.0413 14.2716 16.0413 15.063 15.5532 15.5512C15.065 16.0394 14.2735 16.0394 13.7854 15.5512L0.452054 2.21787C-0.0361014 1.72971 -0.0361014 0.938256 0.452054 0.450101Z'
                fill='#1A1A1A'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.5532 0.450101C16.0413 0.938256 16.0413 1.72971 15.5532 2.21787L2.21982 15.5512C1.73167 16.0394 0.940209 16.0394 0.452054 15.5512C-0.0361014 15.063 -0.0361014 14.2716 0.452054 13.7834L13.7854 0.450101C14.2735 -0.0380545 15.065 -0.0380545 15.5532 0.450101Z'
                fill='#1A1A1A'
              />
            </svg>
          </div>
        </div>
        <main className='modal-maincontents price_up'>
          <label>Price:</label>
          <input
            type='number'
            step='0.01'
            value={payload.price || ''}
            onChange={handlePriceChange}
          />
          <label>Quantity:</label>
          <input
            type='number'
            value={payload.quantity || ''}
            onChange={handleQuantityChange}
          />

          <span style={{ fontWeight: 700 }}>
            {formatCurrency(payload.price)}₮ * {payload.quantity} ш ={' '}
            {formatCurrency(total)}₮
          </span>
          <div className='modal-button p_price--update'>
            <button onClick={cancel}>Цуцлах</button>
            <button onClick={save}>Хадгалах</button>
          </div>
        </main>
      </article>
    </section>
  );
};
