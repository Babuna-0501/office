import React, { useState, useContext, useEffect } from 'react';

import Background from '../../components/Background/Background';
import css from './addwarehouse.module.css';
import Button from '../../components/Button/Button';
import CollectionHook from '../../Hooks/CollectionHook';
import Okicon from '../../assets/OK.svg';
import myHeaders from '../../components/MyHeader/myHeader';
import BackOfficeHook from '../../Hooks/BackOfficeHook';
import Baraatatah from './Baraatatah';

const AddWarehouse = props => {
  const [warehosename, setWarehousename] = useState(null);

  const [locationname, setLocationname] = useState(null);
  const [suppleirs, setSuppliers] = useState([]);
  const [suppler, setSuppler] = useState(null);
  const [page, setPage] = useState(0);
  const [warehouseType, setWarehouseType] = useState(null);
  const userData = props.data.userData;

  const warectx = useContext(CollectionHook);
  const suppctx = useContext(BackOfficeHook);
  const pathname = window.location.pathname;
  useEffect(() => {
    setSuppliers(suppctx.suppliers);
  }, []);

  const cancelHandler = () => {
    setWarehousename(null);
    setPage(0);
    warectx.setNewWarehouseOpen(false);
  };
  const approveHandler = () => {
    if (warehosename === null) {
      alert('Та агуулахын нэрийг оруулна уу');
      return;
    }
    if (warehouseType === null) {
      alert('Та агуулахын төрөл сонгоно уу');
      return;
    }
    if (locationname === null) {
      alert('Та байршлын нэрийг оруулна уу');
      return;
    }
    if (suppler === null || suppler === '--Нийлүүлэгч--') {
      alert('Та нийлүүлэгчээ оруулна уу');
      return;
    }
    let data = {
      supplier: Number(suppler),
      name: warehosename,
      location: locationname,
      manager: userData.email,
      type: 2,
      origin: 2
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/warehouse/create`;

    if (pathname === '/ware-house') {
      url = `${process.env.REACT_APP_API_URL2}/warehouse`;
      data = {
        supplierId: Number(userData.company_id.replace(/\|/g, '')),
        supplierName: userData.supplier_name,
        name: warehosename,
        location: locationname,
        manager: userData.id,
        managerEmail: userData.email,
        type: 1
      };
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(data)
    };

    fetch(url, requestOptions)
      .then(res => res.json())
      .then(res => {
        if (res.code === 200) {
          setPage(1);
        }
      })
      .catch(error => {
        console.log('warehouse register error', error);
      });
  };
  const productRecieveHandler = () => {
    setPage(2);
  };

  return (
    <Background className={css.background}>
      {page === 0 && (
        <div className={css.wrapper}>
          <div>
            <div className={css.header}>Шинэ агуулахын бүртгэл.</div>
            <div className={css.inputwrapper}>
              <div className={css.labelname}>
                <label>Нийлүүлэгч компани : </label>
              </div>

              <select
                value={suppler}
                onChange={e => setSuppler(e.target.value)}
                className={css.selectwrapper}
              >
                <option>--Нийлүүлэгч--</option>
                {suppleirs.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={css.inputwrapper}>
              <div className={css.labelname}>
                <label>Агуулахын нэр : </label>
              </div>
              <input
                type='text'
                value={warehosename}
                onChange={e => setWarehousename(e.target.value)}
              />
            </div>
            <div className={css.inputwrapper}>
              <div className={css.labelname}>
                <label>Байршилын нэр : </label>
              </div>
              <input
                type='text'
                value={locationname}
                onChange={e => setLocationname(e.target.value)}
              />
            </div>
            <div className={css.inputwrapper}>
              <div className={css.labelname}>
                <label>Агуулахын төрөл</label>
              </div>
              <select
                value={warehouseType}
                onChange={e => setWarehouseType(e.target.value)}
                className={css.selectwrapper}
              >
                <option>--Төрөл сонгох--</option>
                <option value={1}>Агуулах</option>
                <option value={2}>Ачааны машин (Van)</option>
              </select>
            </div>
          </div>
          <div className={css.btncontainer}>
            <Button className={css.cancelbtn} onClick={cancelHandler}>
              Цуцлах
            </Button>
            <Button className={css.approvebtn} onClick={approveHandler}>
              Бүртгэх
            </Button>
          </div>
        </div>
      )}
      {page === 1 && (
        <div className={css.modal}>
          <div className={css.headerwrapper}>
            <div className={css.imagecontainer}>
              <img
                src={Okicon}
                style={{
                  width: '80px',
                  height: '80px'
                }}
                alt='okay icon'
              />
            </div>
            <div className={css.header}>Амжилттай хадгаллаа.</div>
            <div className={css.header1}>
              Та шинэ агуулахдаа бүтээгдэхүүн татах уу
            </div>
          </div>
          <div className={css.modalbtb}>
            <Button className={css.modalcancel} onClick={cancelHandler}>
              Үгүй
            </Button>
            <Button
              className={css.modalapprove}
              onClick={productRecieveHandler}
            >
              Бүтээгдэхүүн татах
            </Button>
          </div>
        </div>
      )}
      {page === 2 && <Baraatatah suppctx={suppctx} baraa='shuudorulah' />}
    </Background>
  );
};

export default AddWarehouse;
