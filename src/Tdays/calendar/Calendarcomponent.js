import React, { useContext, useState, useEffect } from 'react';
import css from './calendarcomponent.module.css';

import TdaysHook from '../../Hooks/TdaysHook';
import Calendar from './CalendarMonth/NewCalendar';
import AppHook from '../../Hooks/AppHook';
import NewSupplier from './SelectSupplier/NewSupplier';
import ProductReportHook from '../../Hooks/ProductsReportHook';
import myHeaders from '../../components/MyHeader/myHeader';

const Calendarcomponent = props => {
  const tdaysctx = useContext(TdaysHook);
  const appctx = useContext(AppHook);

  const [title, setTitle] = useState(null);

  const [supId, setSupId] = useState(928);
  const ctxProduct = useContext(ProductReportHook);
  // console.log("supID", supId);

  useEffect(() => {
    let arr = [];

    ctxProduct.sitedata?.business_types.map(it => {
      arr.push(it);
    });
    tdaysctx.setChannel(arr);
  }, []);

  // console.log("props+++++", props.user.email);
  // console.log("supId", supId);

  const cancelHandler = () => {
    tdaysctx.setNewDays(false);
    tdaysctx.setSupplierID(null);
    tdaysctx.setZoneID(null);
    tdaysctx.setChannelID(null);
  };
  // console.log("supplier id", tdaysctx.supplierID);
  // console.log("tdaysctx.channelID", tdaysctx.channelID);

  const submitHandler = () => {
    // console.log("tdaysctx?.supplierID", tdaysctx?.supplierID);
    if (title === null) {
      alert('Та түгээлтийн өдрийн нэрээ оруулна уу');
      return;
    }
    // if (tdaysctx?.supplierID === undefined || tdaysctx?.supplierID === null) {
    //   alert("Та нийлүүлэгчээ сонгоно уу");
    //   return;
    // }
    // console.log("tdaysctx.channelID", tdaysctx.channelID);
    // console.log("tdaysctx.list", tdaysctx.list);

    if (supId === null) {
      alert('Та нийлүүлэгчээ сонгоно уу');
      return;
    }
    if (tdaysctx.channelID === undefined || tdaysctx.channelID === null) {
      alert('Та сувагаа сонгоно уу');
      return;
    }
    if (tdaysctx.zoneID === undefined || tdaysctx.zoneID === null) {
      alert('Та бүсчлэлээ сонгоно уу');
      return;
    }
    if (tdaysctx.days === undefined || tdaysctx.days === null) {
      alert('Та түгээлтийн өдрүүдээ сонгоно уу');
      return;
    }
    //// Өдрийг бичихийн өмнө 0 нэмнэ
    // console.log("submit days", tdaysctx.days);
    // tdaysctx?.days?.map((item) => {
    //   console.log("dayas item", item);
    // });

    const raw = {
      name: title,
      supplier: Number(supId),
      // supplier: 13873,
      schedule: [tdaysctx.days],
      zone: tdaysctx.zoneID,
      // zone: ["62f4aabe45a4e22552a3969f"], //// Монгол
      channel: tdaysctx.channelID,
      isActive: '1',
      delivery_time: tdaysctx.deliveryTime
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(raw)
    };
    console.log('calendar shineer uusgeh', requestOptions);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/calendar/create`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        console.log('res', res);
        if (res.result === 'success') {
          alert('Та амжилттай үүсгэлээ.');
          setTitle('');
          setSupId(null);
          tdaysctx.setSupplierID(null);
          tdaysctx.setDays(null);
          tdaysctx.setZoneID(null);
          tdaysctx.setChannelID([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22
          ]);
          tdaysctx.setNewDays(false);
        }
      })
      .catch(error => {
        console.log('Calendar does not create ', error);
      });
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.calendarContainer}>
          <div className={css.headercontainer}>
            <input
              placeholder='Нэр оруулах'
              className={css.input}
              value={title}
              type='text'
              onChange={e => setTitle(e.target.value)}
            />

            <div style={{ width: '250px' }}>
              <NewSupplier setSupId={setSupId} />
            </div>
          </div>

          <Calendar zonedata={props.zonedata} />
        </div>

        <div className={css.btnsContainer}>
          <button className={css.cancel} onClick={cancelHandler}>
            Цуцлах
          </button>
          <button className={css.approve} onClick={submitHandler}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendarcomponent;
