import React, { useState, useEffect } from 'react';
import css from './orderlist.module.css';
import { styles } from './style';
import ProductAvatar from '../Order/ProductAvatar/ProductAvatar';
import Note from '../Order/Note';
import Button from '../components/Button/Button';
import ReasanSidebar from './ReasanSidebar';
import Notes from '../Order/Notes';

const OrderList = ({ order, data, buramkhan, userData, setOrders, orders }) => {
  const [total, setTotal] = useState('');
  const [aaabbb, setAaabbb] = useState({});
  const [statusColor, setStatusColor] = useState(null);
  const [phoneOne, setPhoneOne] = useState(null);
  const [phoneTwo, setPhoneTwo] = useState(null);
  const [foo, setFoo] = useState('');
  const [oneperson, setOneperson] = useState([]);
  const [orderreason, setOrderreason] = useState([]);
  const [sidebaropen, setSidebaropen] = useState(false);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [khoroo, setKhoroo] = useState(null);
  const [busType, setBusType] = useState(null);
  const [notes, setNotes] = useState(false);
  // console.log("data", data);
  const permission = Object.values(JSON.parse(userData.permission))[0];
  const StatusData = [
    { id: 1, backgroundColor: '#eceff1' },
    { id: 2, backgroundColor: '#00add0' },
    { id: 3, backgroundColor: '#58dd42' },
    { id: 4, backgroundColor: '#EB5E43' },
    { id: 5, backgroundColor: 'red' },
    { id: 6, backgroundColor: 'green' },
    { id: 7, backgroundColor: '#D6DF2A' },
    { id: 8, backgroundColor: '#D6DF2A' },
    { id: 9, backgroundColor: '#D6DF2A' },
    { id: 10, backgroundColor: '#D6DF2A' },
    { id: 11, backgroundColor: '#D6DF2A' },
    { id: 12, backgroundColor: '#D6DF2A' },
    { id: 13, backgroundColor: '#D6DF2A' }
  ];
  // console.log("order", order);
  useEffect(() => {
    StatusData.map(item => {
      if (item.id === order.status) {
        setStatusColor(item.backgroundColor);
      }
    });

    if (order?.phone?.includes(',')) {
      setPhoneOne(order.phone.split(',')[0]);
      setPhoneTwo(order.phone.split(',')[1]);
    } else {
      setPhoneOne(order.phone);
    }
    setFoo(order.description);
    let totalaa = 0;
    let aa = JSON.parse(JSON.stringify(order));
    aa.line.map(l => {
      totalaa += Number(l.quantity) * parseFloat(l.price.toFixed(2));
    });

    setTotal(Number(totalaa));
    setAaabbb(order);

    data.locations.map(item => {
      if (item.location_id === Number(order.tradeshop_city)) {
        setCity(item.location_name);
      }
      if (item.location_id === Number(order.tradeshop_district)) {
        setDistrict(item.location_name);
      }
      if (item.location_id === Number(order.tradeshop_horoo)) {
        setKhoroo(item.location_name);
      }
    });
    data.businessType.map(item => {
      if (item.business_type_id === Number(order.business_type_id)) {
        setBusType(item.business_type_name);
      }
    });
  }, [order]);
  // console.log("Data", data);
  useEffect(() => {
    buramkhan &&
      buramkhan.map(item => {
        if (order.back_office_user !== null) {
          if (item.user_id === Number(order.back_office_user)) {
            setOneperson(item);
          }
        }
      });
  }, [buramkhan]);

  const openHandler = () => {
    setSidebaropen(true);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper} style={styles.checkboxcontainer}>
        <input type='checkbox' />
        <span
          onClick={openHandler}
          style={{
            background: statusColor,
            padding: '2px 6px',
            borderRadius: '4px',
            color: `${statusColor === '#eceff1' ? '#37474F' : '#fff'}`
          }}
        >
          {order.order_id}
        </span>
      </div>
      <div className={css.wrapper} style={styles.logoContainer}>
        <img
          src={
            order?.supplier_logo
              ? order?.supplier_logo.replace('product', 'small')
              : `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
          }
        />
      </div>
      <div className={css.wrapper} style={styles.supplierContainer}>
        <span>{order.supplier_name}</span>
      </div>
      <div className={css.wrapper} style={styles.notifContainer}>
        <img src='http://ebazaar.mn/icon/noti.svg' alt='noti' />
      </div>

      <div className={css.wrapper} style={styles.orderImageContainer}>
        <ProductAvatar data={order} />
      </div>
      <div className={css.wrapper} style={styles.orderDateContainer}>
        <span>
          {order.order_date
            ? order.order_date.substr(5, 5) +
              ' ' +
              order.order_date.substr(11, 5)
            : ''}
        </span>
      </div>
      <div className={css.wrapper} style={styles.deliverDateContainer}>
        <span>
          {' '}
          {order.delivery_date ? order.delivery_date.substr(5, 5) : ''}
        </span>
      </div>
      <div className={css.wrapper} style={styles.totalPriceContainer}>
        <span> {total && total?.toLocaleString()}₮</span>
      </div>
      <div className={css.wrapper} style={styles.paidPriceContainer}>
        <span>{order.supplier_name}</span>
      </div>
      <div
        className={css.wrapper}
        style={styles.noteContainer}
        onClick={() => {
          if (permission?.order?.update) {
            if (data.userData.company_id !== '|13954|') {
              setNotes(true);
            }
          }
        }}
      >
        <span>
          {aaabbb.description ? (
            <Note note={foo} setFoo={setFoo} />
          ) : (
            <div style={{ width: '100%', color: '#fff' }}>.</div>
          )}
        </span>
      </div>
      <div className={css.wrapper} style={styles.phoneContainer}>
        <span>
          {phoneOne} <br />
          {phoneTwo}
        </span>
      </div>
      <div className={css.wrapper} style={styles.channelNameContainer}>
        <span>{order.tradeshop_name}</span>
      </div>
      <div className={css.wrapper} style={styles.channelContainer}>
        <span>{busType ? busType : null}</span>
      </div>
      <div className={css.wrapper} style={styles.provinceContainer}>
        <span>{city ? city : null}</span>
      </div>
      <div className={css.wrapper} style={styles.districtContainer}>
        <span>{district ? district : null}</span>
      </div>
      <div className={css.wrapper} style={styles.khorooContainer}>
        <span>{khoroo ? khoroo : null}</span>
      </div>
      <div className={css.wrapper} style={styles.khorooContainer}>
        <span>{order.address}</span>
      </div>
      {userData.company_id === '|14014|' && (
        <>
          {' '}
          <div
            className={css.wrapper}
            style={{
              ...styles.khorooContainer,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <span>{oneperson ? oneperson?.user_id : null}</span>
          </div>
          <div className={css.wrapper} style={styles.khorooContainer}>
            <span>{oneperson ? oneperson?.first_name : null}</span>
          </div>
          <div className={css.wrapper} style={styles.khorooContainer}>
            <span>{oneperson ? oneperson?.phone_number : null}</span>
          </div>
        </>
      )}
      {(userData.id === 370 || userData.id === 351 || userData.id === 683) &&
        order.order_data && (
          <div
            className={css.wrapper}
            style={{
              ...styles.khorooContainer,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button className={css.btn} onClick={openHandler}>
              харах
            </Button>
          </div>
        )}
      {sidebaropen && (
        <ReasanSidebar
          data={order}
          setSidebaropen={setSidebaropen}
          maindata={data}
        />
      )}
      {notes ? (
        <Notes
          note={foo}
          setFoo={setFoo}
          id={order.order_id}
          setNotes={setNotes}
          userData={userData}
          setAaabbb={setAaabbb}
          aaabbb={aaabbb}
        />
      ) : null}
    </div>
  );
};

export default OrderList;
