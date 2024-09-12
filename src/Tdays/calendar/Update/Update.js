import React, { useContext, useState, useEffect } from 'react';

import css from './update.module.css';
import Calendar from './Calendar';
import TdaysHook from '../../../Hooks/TdaysHook';
// import NewSupplier from "../SelectSupplier/NewSupplier";
import SupplierIndex from '../../../Zones/suppliers/SupplierIndex';
import myHeaders from '../../../components/MyHeader/myHeader';

const Update = props => {
  const [name, setName] = useState(null);
  const [schedule, setSchedule] = useState(null);

  const [chosedChannels, setChosedChannels] = useState([]);
  const [chosedZones, setChosedZones] = useState([]);
  const [chosedSupplier, setChosedSupplier] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState('10:00');
  const [allDays102, setAllDays102] = useState([]);

  const tdaysctx = useContext(TdaysHook);
  console.log('props update', tdaysctx.updateProduct);
  useEffect(() => {
    // console.log(" tdaysctx.updateProduct", tdaysctx.updateProduct);
    setChosedSupplier(tdaysctx.updateProduct.supplier);
    setChosedChannels(tdaysctx.updateProduct.channel);
    setChosedZones(tdaysctx.updateProduct.zone);
    setSchedule(tdaysctx.updateProduct.schedule);
    setName(tdaysctx.updateProduct.name);
    setCreatedDate(tdaysctx.updateProduct.createdDate);
    setDeliveryTime(tdaysctx.updateProduct.deliveryTime);
  }, [tdaysctx.updateProduct]);

  // console.log("chosedSupplier+++", chosedSupplier);
  const cancelHandler = () => {
    tdaysctx.setUpdateProduct(null);
    props.setUpdateModal(false);
  };
  console.log('tdaysctx.days-----', tdaysctx.days);

  useEffect(() => {
    let alldaysKey = [];
    alldaysKey.push(Object.keys(tdaysctx.allChosedDays));
    console.log('keys', alldaysKey);
    let days101 = [];
    alldaysKey[0].map(item => {
      if (tdaysctx.allChosedDays[`${item}`] === true) {
        // console.log("tdays.choseddays true", item);
        if (item.toString() !== 'NaN-NaN-NaN') {
          days101.push(item);
        }
      }
    });
    setAllDays102(days101);
  }, [tdaysctx.allChosedDays]);
  console.log('csetAllDays102', allDays102);
  const confirmHandler = () => {
    let uuu = {};
    // console.log("tdaysctx.days", tdaysctx.days);

    if (tdaysctx.allChosedDays) {
      console.log('tdaysctx.days-----', tdaysctx.days);
      // let bbb = Object.keys(tdaysctx.allChosedDays);
      // // bbb = tdaysctx.days;
      // console.log("bbb", bbb);

      allDays102.map(item => {
        // console.log("item", item);
        if (item === 'NaN-NaN-NaN') {
          console.log('item', item);
        } else {
          let data = new Date(item);
          // console.log("data", data);
          let yearaaa = data.getFullYear();
          let monthaaa = data.getMonth() + 1;
          let daysaaa = data.getDate();

          if (monthaaa < 10) {
            monthaaa = `0${monthaaa}`;
          } else {
            monthaaa = `${monthaaa}`;
          }
          if (daysaaa < 10) {
            daysaaa = `0${daysaaa}`;
          } else {
            daysaaa = `${daysaaa}`;
          }
          uuu[`${yearaaa}-${monthaaa}-${daysaaa}`] = true;
        }
      });
    }
    let abc = [];

    abc.push(uuu);

    const raw = JSON.stringify({
      id: tdaysctx.updateProduct.id,
      name: name,
      supplier: Number(chosedSupplier),
      // supplier: 13873,
      // createdDate: tdaysctx.updateProduct.createdDate,
      schedule: abc,
      zone: chosedZones,
      channel: chosedChannels,
      delivery_time: deliveryTime
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: raw
    };
    // console.log("fdfdf", JSON.stringify(raw));
    console.log('requestOptions', requestOptions);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/calendar/update`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        // console.log("tdays update", res);
        if (res.code === 200) {
          alert('Та амжилттай шинэчлэлээ.');
          props.setUpdateModal(false);
        }
      })
      .catch(error => {
        alert('Алдаа гарлаа.++++ ' + error.message);
        props.setUpdateModal(false);
        console.log('Calendar does not create ', error);
      });
  };

  const nameHandler = e => {
    setName(e.target.value);
  };
  // console.log("chosedSupplier", chosedSupplier);
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.inputContainer}>
          <input value={name} onChange={nameHandler} />
          {/* <NewSupplierUpdate
            setChosedSupplier={setChosedSupplier}
            chosedSupplier={chosedSupplier}
          /> */}
          <div style={{ width: '250px' }}>
            <SupplierIndex
              id={chosedSupplier}
              setSuppID={setChosedSupplier}
              height={32}
            />
          </div>
        </div>
        <div className={css.calendar}>
          <Calendar
            name={name}
            chosedSupplier={chosedSupplier}
            schedule={schedule}
            setSchedule={setSchedule}
            chosedChannels={chosedChannels}
            setChosedChannels={setChosedChannels}
            chosedZones={chosedZones}
            setChosedZones={setChosedZones}
            setChosedSupplier={setChosedSupplier}
            zonedata={props.zonedata}
            deliveryTime={deliveryTime}
            setDeliveryTime={setDeliveryTime}
          />
        </div>

        <div className={css.btncontainers}>
          <button className={css.cancelbtn} onClick={cancelHandler}>
            Цуцлах
          </button>
          <button className={css.confirmbtn} onClick={confirmHandler}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
