import React, { useState, useContext, useEffect } from 'react';
import css from './index.module.css';
import SupplierHook from '../Hooks/SupplierHook';
import Tailan from './Tailan';
import myHeaders from '../components/MyHeader/myHeader';
import settingIcon from '../assets/Setting.svg';
import deleteIcon from '../assets/delete_red_small.svg';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const Indextailan = props => {
  const [data, setData] = useState([]);
  const [updatedata, setUpdatedata] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const supctx = useContext(SupplierHook);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent userData={props.userData} />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  console.log('supctx', supctx);

  console.log('suppliers', suppliers);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        setSuppliers(res.data);
      })
      .catch(error => {
        console.log('supplier fetch error', error);
      });
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/supplier/options`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        console.log('ddd', res);
        setData(res.data);
      })
      .catch(error => {
        console.log('error+++++++++++', error);
      });
  }, []);

  const ModifiedHandler = item => {
    console.log('item', item);
    setUpdatedata(item);
    supctx.setDataopen(true);
  };
  return (
    <div className={css.container}>
      <div className={css.headerwrapper}>
        <div className={css.header}>
          <div
            className={css.oneheader}
            style={{
              width: '250px'
            }}
          >
            <span>Нэр</span>
            <input />
          </div>
          <div
            className={css.oneheader}
            style={{
              width: '200px'
            }}
          >
            <span>Үүссэн огноо</span>
            <input />
          </div>
          <div
            className={css.oneheader}
            style={{
              width: '200px'
            }}
          >
            <span>Засварлах</span>
            <input />
          </div>
        </div>
        <div className={css.body}>
          {data &&
            data.map((item, index) => {
              // let supname;
              // if (typeof Number(item.name) == "number") {
              //   supname = suppliers.filter((item) => item.id == item.name);
              // }

              return (
                <div key={index} className={css.onerow}>
                  <div
                    className={css.infowrapper}
                    style={{
                      width: '250px'
                    }}
                  >
                    <span>{item.name}</span>
                  </div>
                  <div
                    className={css.infowrapper}
                    style={{
                      width: '200px'
                    }}
                  >
                    <span>
                      {item.createDate ? item.createDate.split(',')[0] : ''}
                    </span>
                  </div>
                  <div
                    className={css.infowrapper}
                    style={{
                      width: '200px'
                    }}
                  >
                    <img
                      src={settingIcon}
                      alt='setting button'
                      onClick={() => ModifiedHandler(item)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {supctx.dataopen && <Tailan updatedata={updatedata} />}
    </div>
  );
};

export default Indextailan;
