import React, { useState, useContext } from 'react';
import css from './tabindex.module.css';
import Background from '../Othercomponents/Background';
import OrderTab from './Tabcomponents/OrderTab';
import LogTab from './Tabcomponents/LogTab';
import NotifTab from './Tabcomponents/NotifTab';
import closeBlack from '../../assets/close.svg';
import Modal from './Modal/Modal';
import OrderButton from './Buttons/OrderButton';
import NotifButtons from './Buttons/NotifButtons';
import OrderReportHook from '../../Hooks/OrderReportHook';
import OrderCancel from '../OrderCancel/OrderCancel';
import myHeaders from '../../components/MyHeader/myHeader';
import closeIcon from '../../assets/close.svg';
import Button from './Buttons/Button';
import prinfIcon from '../../assets/Upload.svg';
import LinesCopy from '../LinesCopy';
import { NoteTab } from './Tabcomponents/NoteTab';
import Barimt from './OrderReport/Barimt';
import ZarlagaBarimt from './ZarlagaBarimt';

const dataTabs = [
  { id: 0, name: 'Order' },
  { id: 1, name: 'Notif' },
  { id: 2, name: 'Log' },
  { id: 3, name: 'Тэмдэглэл' }
];
const TabIndex = props => {
  const [active, setActive] = useState(props.active || 0);
  const [order, setOrder] = useState(props.data);
  const [pushNotifMessage, setPushNotifMessage] = useState('');
  const [orderCancelFromConfirm, setOrderCancelFromConfirm] = useState(false);
  const [orderCancelState, setOrderCancelState] = useState(false);
  const [reportShow, setReportShow] = useState(false);
  const [zarlagaBarimt, setZarlagaBarimt] = useState(false);

  const [lines, setLines] = useState(null);

  const permission = Object.values(JSON.parse(props.userData.permission))[0];
  // console.log("props tabindex", props);
  const orderCtx = useContext(OrderReportHook);
  //   console.log("orders hook++++", orderCtx);
  console.log('USER', props);

  let total = 0;
  order.line.map(l => {
    total += parseFloat(l.price.toFixed(2)) * l.quantity;
  });

  const tabHandler = i => {
    console.log('i----i', i);
    setActive(i);
  };
  const closeHandler = () => {
    props.setOrderTabOpen(false);
    props.setLines(false);

    props.setNotes(false);
  };
  const OrderCancelHandler = id => {
    // console.log("order cancel id", id);
    if (window.confirm('Та захиалгыг цуцлахдаа итгэлтэй байна уу?')) {
      var raw = JSON.stringify({
        order_id: order.order_id,
        order_status: 5,
        cancel_reason: Number(id)
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log('order cancel status', requestOptions);
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/status`,
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          console.log('order status', result);
          if (result.code === 200) {
            alert('Захиалгыг цуцаллаа!');
            let aa = order;
            aa.status = 5;
            // console.log("aa.status", aa);
            setOrder(aa);
            setOrderCancelState(false);
          } else {
            alert('Алдаа гарлаа');
          }
        });
    }
  };
  const ConfirmOrderCancel = () => {
    setOrderCancelFromConfirm(false);
  };
  const ConfirmOrderCancelApprove = () => {
    var raw = JSON.stringify({
      order_id: parseInt(order.order_id)
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log('confirm order undo', requestOptions);
    fetch(`${process.env.REACT_APP_API_URL2}/api/order/undo`, requestOptions)
      .then(response => response.json())
      .then(res => {
        if (res.code === 200) {
          setOrderCancelFromConfirm(false);
          let bb = order;
          bb.status = 5;
          setOrder(bb);
        }
      })
      .catch(error => {
        console.log('confirm order cancel error', error);
      });
  };
  console.log('props.porps', props);
  let locations = props.locations;
  return (
    <Background className={css.wrapper}>
      {zarlagaBarimt ? (
        <ZarlagaBarimt setZarlagaBarimt={setZarlagaBarimt} order={order} />
      ) : null}
      <div className={css.firstcontainer}></div>
      <div className={css.secondcontainer}>
        <div className={css.closecontainer}>
          <div className={css.headercontainer}>
            <span>Захиалгын дугаар : {order.order_id}</span>
            <img
              src={prinfIcon}
              alt='Print'
              onClick={() => setReportShow(true)}
              style={{
                height: '20px',
                marginLeft: '15px'
              }}
            />
            <img
              src={prinfIcon}
              alt='Print'
              onClick={() => setZarlagaBarimt(true)}
              style={{
                height: '20px',
                marginLeft: '15px'
              }}
            />
          </div>
          <img alt='Close' src={closeBlack} onClick={closeHandler} />
        </div>

        <div className={css.secondwrapper}>
          <Modal order={order} />
        </div>

        <div className={css.headerwrapper}>
          {dataTabs.map((item, index) => {
            return (
              <span
                key={index}
                onClick={() => tabHandler(index)}
                className={`${
                  active === index ? css.activebutton : css.unactive
                }`}
              >
                {item.name}
              </span>
            );
          })}
        </div>
        <div
          style={{
            overflowY: 'scroll',
            height: '60vh'
          }}
        >
          {active === 0 && (
            <div
              style={{
                paddingLeft: '22px',
                paddingRight: '22px',
                overflowY: 'scroll',
                height: '60vh'
              }}
            >
              <LinesCopy
                setLines={setLines}
                userData={props.userData}
                data={props.data}
                setOrder={setOrder}
                company={props.userData.company_id}
                locations={locations}
                businessType={props.businessType}
                appctx={props.appctx}
              />
            </div>
          )}
          {active === 1 && (
            <NotifTab
              order={order}
              setPushNotifMessage={setPushNotifMessage}
              hasNotif={props.hasNotif}
              setHasNotif={props.setHasNotif}
            />
          )}
          {permission && permission.log?.read === true && active === 2 && (
            <LogTab order={order} />
          )}
          {active === 3 && (
            <NoteTab
              data={props.bigData}
              note={props.note}
              setFoo={props.setFoo}
              id={props.id}
              setNotes={props.setNotes}
              userData={props.userData}
            />
          )}
        </div>
        <div
          className={css.buttoncontainer}
          style={{
            display: active === 0 || active === 3 ? 'none' : 'block'
          }}
        >
          {active === 1 && (
            <NotifButtons pushNotif={pushNotifMessage} order={order} />
          )}
        </div>
      </div>
      {orderCancelState && (
        <OrderCancel
          setOrderCancelState={setOrderCancelState}
          order={order}
          setOrder={props.setOrder}
          cancelOn={OrderCancelHandler}
        />
      )}
      {orderCancelFromConfirm && (
        <div className={css.confirmcancel}>
          <div className={css.modalTwo}>
            <div className={css.closewrapper}>
              <img src={closeIcon} onClick={ConfirmOrderCancel} />
            </div>
            <div className={css.contentwrapper}>
              <span>
                Та баталгаажсан захиалга цуцлахдаа итгэлтэй байна уу...
              </span>
            </div>
            <div className={css.btnwrapper}>
              <Button
                className={css.cancelbtn}
                name='Цуцлах'
                clickHandler={ConfirmOrderCancel}
              />
              <Button
                className={css.approvebtn}
                name='Тийм'
                clickHandler={ConfirmOrderCancelApprove}
              />
            </div>
          </div>
        </div>
      )}
      {/* Тайлан хэвлэх */}
      {reportShow && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 160,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* {props.userData.id === 351 ? (
            <OrderReport
              order={order}
              setReportShow={setReportShow}
              total={total}
            />
          ) : (
            <OrderReportJpg
              order={order}
              setReportShow={setReportShow}
              total={total}
            />
          )} */}
          <Barimt
            orderXT={props.orderXT}
            order={order}
            total={total}
            setReportShow={setReportShow}
          />
        </div>
      )}
    </Background>
  );
};

export default TabIndex;
