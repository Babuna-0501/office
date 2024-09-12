import React from 'react';
import css from './orderbutton.module.css';
import Button from './Button';
import myHeaders from '../../../components/MyHeader/myHeader';

const OrderButton = props => {
  console.log('props order button----', props);
  const cancelHandler = () => {
    console.log('cancel clicked');
    props.setOrderCancelState(true);
  };
  const permission = Object.values(JSON.parse(props.userData.permission))[0];
  const confirm = () => {
    var raw = JSON.stringify({
      order_id: props.order.order_id,
      order_status: 2
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL2}/api/order/status`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.code === 200) {
          alert('Захиалгын статусыг амжилттай өөрчиллөө!');
          let aa = props.order;
          aa.status = 2;
          props.setOrder(aa);
          props.setTabState(false);
        } else {
          alert('Алдаа гарлаа');
        }
      });
  };
  const DeliveryHandler = () => {};
  const ApprovedHandler = () => {
    if (
      window.confirm(
        'Та захиалгын статусыг хүргэсэн төлөвт шилжүүлэхдээ итгэлтэй байна уу?'
      )
    ) {
      var raw = JSON.stringify({
        order_id: props.order.order_id,
        order_status: 3
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/status`,
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          if (result.code === 200) {
            alert('Захиалгын статусыг амжилттай өөрчиллөө!');
            let aa = props.order;
            aa.status = 3;
            props.setOrder(aa);
            props.setTabState(false);
          } else {
            alert('Алдаа гарлаа');
          }
        });
    }
  };
  const DeliveredHandler = () => {};
  const OrderConfirmCancel = () => {
    // console.log("daragdsan");
    props.setOrderCancelFromConfirm(true);
  };
  const CancelStatusFiveHandler = () => {};
  // props.order.supplier_id !== 975 || props.order.supplier_id !== 149 && ;
  let content;
  if (props.order.supplier_id === 975 || props.order.supplier_id === 149) {
    content = null;
  } else {
    if (props.order.status === 1) {
      content = (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            name='Цуцлах'
            className={css.cancelbtn}
            clickHandler={cancelHandler}
          />
          <Button
            name='Илгээх'
            className={css.approvebtn}
            clickHandler={confirm}
          />
        </div>
      );
    } else if (props.order.status === 2) {
      content = (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            name='Цуцлах'
            className={css.cancelbtn}
            clickHandler={OrderConfirmCancel}
          />
          <Button
            name='Баталгаажсан'
            className={css.approveOrder}
            clickHandler={ApprovedHandler}
          />
        </div>
      );
    } else if (props.order.status === 3) {
      content = (
        <Button
          name='Хүргэж өгсөн'
          className={css.delivered}
          clickHandler={DeliveryHandler}
        />
      );
    } else if (props.order.status === 4) {
      content = (
        <Button
          name='Хүргэгдсэн'
          className={css.delivered}
          clickHandler={DeliveredHandler}
        />
      );
    } else if (props.order.status === 5) {
      content = (
        <Button
          name='Цуцлагдсан'
          className={css.canceled}
          clickHandler={CancelStatusFiveHandler}
        />
      );
    }
  }
  return (
    <div className={css.container}>
      {permission.order && permission.order.update ? content : ''}
    </div>
  );
};

export default OrderButton;
