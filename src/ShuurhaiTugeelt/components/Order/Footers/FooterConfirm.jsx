import React, { useContext } from 'react';
import css from './footerconfirm.module.css';
import { Button } from '../../../../components/common';
import ShuurkhaiHook from '../../../../Hooks/ShuurkhaiHook';
import myHeaders from '../../../../components/MyHeader/myHeader';

const FooterConfirm = () => {
  const shuurkhaiCtx = useContext(ShuurkhaiHook);
  const orderHandler = () => {
    const date = `${shuurkhaiCtx.deliveryDate} ${shuurkhaiCtx.deliveryTime}:00`;
    var raw = JSON.stringify({
      supplierId: shuurkhaiCtx.prdctVendor,
      deliveryDate: date,
      line: shuurkhaiCtx.dataPass
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: raw
    };
    const url = `${process.env.REACT_APP_API_URL2}/order/backoffice`;
    console.log('TEST', raw);
    shuurkhaiCtx.setOrderComplete(true);
    fetch(url, requestOptions).then(res => {
      console.log('RESULT', res);
      if (res.ok === true) {
        alert('Захиалга амжилттай үүсгэлээ');
        shuurkhaiCtx.orderComplete(true);
      }
    });
  };

  return (
    <div className={css.container}>
      <div className={css.infoContainer}>
        <span className={css.infoTxt}>Нийт үнийн дүн: </span>
        <span className={css.infoPrice}>
          {shuurkhaiCtx.totalPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          ₮{' '}
        </span>
      </div>
      <div className={css.buttons}>
        <Button
          variant='secondary'
          width={'50%'}
          onClick={() => shuurkhaiCtx.setChange(true)}
        >
          Буцах
        </Button>
        <Button width={'50%'} onClick={() => orderHandler()}>
          Илгээх
        </Button>
      </div>
    </div>
  );
};

export default FooterConfirm;
