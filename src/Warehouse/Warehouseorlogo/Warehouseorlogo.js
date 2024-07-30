import React, { useContext, useEffect, useState } from 'react';
import css from './warehouseorlogo.module.css';
import AppHook from '../../Hooks/AppHook';
import myHeaders from '../../components/MyHeader/myHeader';
import { styles } from './style';
import Delgerengui from './Delgerengui';

const Warehouseorlogo = () => {
  const [data, setData] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [onedata, setOnedata] = useState([]);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const warectx = useContext(AppHook);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/inventory/get?warehouse=${warectx.selectedWareHouse._id}`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        let productids = [];
        setData(res.message.reverse());
        res.message.map(item => {
          productids.push(item.product_id);
        });
        if (productids.length !== 0) {
          fetch(
            `${process.env.REACT_APP_API_URL2}/api/products/get1?ids=${productids}`,
            requestOptions
          )
            .then(res => res.json())
            .then(res => {
              setProducts(res.data);
            })
            .catch(error => {
              console.log('error', error);
            });
        }

        fetch(
          `${
            process.env.REACT_API_URL2
          }/backoffice/users?company=${warectx.userData.company_id.replaceAll(
            '|',
            ''
          )}`,
          requestOptions
        )
          .then(res => res.json())
          .then(res => {
            setWorkers(res.data);
          })
          .catch(error => {
            console.log('company users fetch error', error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [warectx.selectedWareHouse]);
  const openHandler = item => {
    setOpen(true);
    setOnedata(item);
  };
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.wrapper} style={styles.numberContainer}>
          <span>Бүртгэлийн дугаар</span>
          <input disabled className={css.inputwrapper} />
        </div>
        <div className={css.wrapper} style={styles.createdContainer}>
          <span>Үүссэн огноо</span>
          <input disabled className={css.inputwrapper} />
        </div>
        <div className={css.wrapper} style={styles.companyContainer}>
          <span>Үүсгэсэн хүн</span>
          <input disabled className={css.inputwrapper} />
        </div>
        <div className={css.wrapper} style={styles.notifContainer}>
          <span>Барааны</span>
          <input disabled className={css.inputwrapper} />
        </div>
      </div>
      <div className={css.bodywrapper}>
        {data.map(item => {
          let user = '';
          workers &&
            workers.map(item => {
              return (user = item.first_name);
            });
          return (
            <div className={css.bodywrapperone}>
              <div style={styles.numberContainer}>
                <span className={css.status}>{item.document_id}</span>
              </div>
              <div style={styles.createdContainer}>
                <span className={css.status}>{item.date}</span>
              </div>
              <div style={styles.companyContainer}>
                <span className={css.status}>{user ? user : item.by}</span>
              </div>
              <div style={styles.notifContainer} className={css.delgerengui}>
                <div onClick={() => openHandler(item)}>
                  <span className={css.statusbtn}>Дэлгэрэнгүй</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {open && (
        <Delgerengui
          data={onedata}
          setOpen={setOpen}
          setOnedata={setOnedata}
          products={products}
        />
      )}
    </div>
  );
};

export default Warehouseorlogo;
