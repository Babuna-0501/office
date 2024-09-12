import React, { useState, useEffect, useContext } from 'react';
import css from './ordercancel.module.css';
import carOrange from '../../assets/car_orange.svg';
import closeWhite from '../../assets/close_white.svg';
import Ellipse_gray from '../../assets/Ellipse_gray.svg';
import Ellipse_orange from '../../assets/Ellipse_orange.svg';
import arrowDownGray from '../../assets/Arrow - Down.svg';
import AppHook from '../../Hooks/AppHook';
import myHeader from '../../components/MyHeader/myHeader';

const OrderCancel = props => {
  const [active, setActive] = useState(null);
  const [data, setData] = useState([]);
  const [reasonModal, setReasonModal] = useState(false);
  const [value, setValue] = useState(null);
  // const appctx = useContext(AppHook);
  console.log('order cancel props', props);

  useEffect(() => {
    let controller = new AbortController();

    fetch(`${process.env.REACT_APP_API_URL2}/api/order/cancelreason`, {
      method: 'GET',
      headers: myHeader,
      signal: controller.signal
    })
      .then(r => r.json())
      .then(res => {
        console.log('cancel reason data', res.data);
        setData(res.data);
        controller = null;
      })
      .catch(error => {
        console.log('order reason tathad aldaa ', error);
      });

    return () => controller?.abort();
  }, []);

  const chooseHandler = () => {
    setReasonModal(true);
  };
  const chooseReasonHandler = (item, index) => {
    console.log('item', item);
    setActive(index);
    setReasonModal(false);
    setValue(item);
  };
  const confirmHandler = () => {
    // console.log("clicked");
    if (value === null) {
      alert('Та захиалгийг цуцлах шалтгаан сонгоно уу');
      return;
    } else {
      props.cancelOn(value.ID);
      setValue(null);

      // props.setLines(false);
      // appctx?.setPage["orders"];
      return;
    }
  };
  return (
    <div className={css.container}>
      <div className={css.cardContainer}>
        <div className={css.closeContainer}>
          <img
            src={closeWhite}
            alt='close btn'
            onClick={() => props.setOrderCancelState(false)}
          />
        </div>
        <div className={css.imageContainer}>
          <img src={carOrange} alt='car delivery' />
        </div>
        <div className={css.header}>
          <span>Захиалга цуцлах</span>
        </div>
        <div style={{ position: 'relative' }}>
          <label className={css.label}>Та яагаад цуцалж байгаа вэ?</label>
          <div className={css.valueContainer} onClick={chooseHandler}>
            <span>{value ? value.name : ''}</span>
            <img src={arrowDownGray} />
          </div>
          {reasonModal && (
            <div className={css.reasonContainer}>
              {data.map((it, index) => {
                return (
                  <div
                    key={index}
                    className={css.reasonWrapper}
                    onClick={() => chooseReasonHandler(it, index)}
                  >
                    <img
                      src={index === active ? Ellipse_orange : Ellipse_gray}
                    />{' '}
                    <div className={css.reasonDes}>
                      <p
                        style={{
                          color: index === active ? '#37474F' : '#78909C'
                        }}
                      >
                        {it.name}
                      </p>
                      <p
                        style={{
                          color: index === active ? '#37474F' : '#78909C'
                        }}
                      >
                        {it.reason}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={css.content}>
          <span>Та энэ захиалгыг цуцлахдаа итгэлтэй байна уу?</span>
        </div>
        <div className={css.buttonscontainer}>
          <button className={css.okbnt} onClick={confirmHandler}>
            Тийм
          </button>
          <button
            className={css.cancelBtn}
            onClick={() => props.setOrderCancelState(false)}
          >
            Үгүй
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCancel;
