import React, { useEffect, useState, useContext } from 'react';
import css from './noatindex.module.css';
import Wrapper from './components/Wrapper';
import myHeaders from '../components/MyHeader/myHeader';
import NoatIndexTwo from '../NOATV2/NoatIndexTwo';
import AppHook from '../Hooks/AppHook';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const NoatIndex = props => {
  const [orders, setOrders] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [layoutStyle, setLayoutStyle] = useState('grid');
  const noatctx = useContext(AppHook);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(
      <HeaderContent setPage={props.appctx.setPage} userData={props.userData} />
    );

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    console.log('year', year);
    console.log('month', month);
    console.log('day', day);

    // let url = `${process.env.REACT_APP_API_URL2}/api/orders?order_start=${year}-04-15&order_end=${year}-${
    // 	month + 1 < 10 ? "0" + Number(month + 1) : month + 1
    // }-${day < 10 ? "0" + day : day}&supplier_id=13884&order_status=3&page=all`;
    console.log('props', props);
    let supid =
      props.userData.company_id === '|1|'
        ? 13884
        : props.userData.company_id.replaceAll('|', '');

    let url = `${
      process.env.REACT_API_URL2
    }/orders?order_start=${year}-05-20&order_end=${year}-${
      month + 1 < 10 ? '0' + Number(month + 1) : month + 1
    }-${
      day < 10 ? '0' + day : day
    }&supplier_id=${supid}&order_status=3&page=all`;
    console.log('url', url);

    let newUrl = `${process.env.REACT_APP_API_URL2}/api/orders?supplier_id=${supid}&order_status=3&page=0`;

    if (noatctx.startdate && noatctx.enddate) {
      newUrl = `${process.env.REACT_APP_API_URL2}/api/orders?supplier_id=${supid}&order_start=${noatctx.startdate}&order_end=${noatctx.enddate}&order_status=3&page=all`;
    }
    if (noatctx.orderID !== null) {
      newUrl = `${process.env.REACT_APP_API_URL2}/api/orders?supplier_id=${supid}&id=${noatctx.orderID}`;
    }

    console.log('newUrl', newUrl);

    if (isMounted) {
      fetch(newUrl, requestOptions)
        .then(r => r.json())
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.log('error order fetch error', error);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [noatctx.startdate, noatctx.enddate, noatctx.orderID]);

  return (
    <div className={css.container}>
      <div className={css.buttons}>
        <button
          className={`${css.button} ${
            layoutStyle === 'row' ? css.active : 'grid'
          }`}
          onClick={() => {
            setLayoutStyle('row');
          }}
        >
          Row
        </button>
        <button
          className={`${css.button} ${
            layoutStyle === 'grid' ? css.active : 'row'
          }`}
          onClick={() => {
            setLayoutStyle('grid');
          }}
        >
          Grid
        </button>
      </div>
      {layoutStyle == 'grid' ? (
        <div className={`${css.wrapper}`}>
          {orders.length !== 0 &&
            orders.map((item, index) => {
              return (
                <Wrapper
                  item={item}
                  setOrders={setOrders}
                  orders={orders}
                  key={index}
                  userData={props.userData}
                  supplier={supplier}
                />
              );
            })}
          {orders.length === 0 && (
            <div className={css.container_loading}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      ) : (
        <div>
          <NoatIndexTwo />
        </div>
      )}
    </div>
  );
};

export default NoatIndex;
