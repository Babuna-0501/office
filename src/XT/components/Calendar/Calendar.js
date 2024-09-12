import React, { useState, useContext, useEffect } from 'react';
import css from './calendar.module.css';
import Wrapper from '../Wrapper/Wrapper';
import Garig from '../Garig/Garig';
import HeaderXT from '../Header/HeaderXT';
import XTHook from '../../../Hooks/XtHook';
import Month from './Month';
import Button from '../../../components/Button/Button';
import myHeaders from '../../../components/MyHeader/myHeader';
const Calendar = props => {
  const [garigState, setGarigState] = useState([]);

  const [calendarState, setCalendarState] = useState({
    buschlel: '',
    ontsgoiHariltsag: '',
    garig: '',
    days: ''
  });
  const [zonebtn, setZonebtn] = useState([]);
  const [data, setData] = useState({});
  const [zones, setZones] = useState([]);
  const xtctx = useContext(XTHook);
  const closeHandler = () => {
    xtctx.setCalendarOpen(false);
  };

  const data2023 = [
    ['1 сар', 36, 6, 0, 2023],
    ['2 сар', 29, 2, 1, 2023],
    ['3 сар', 32, 2, 2, 2023],
    ['4 сар', 34, 5, 3, 2023],
    ['5 сар', 30, 0, 4, 2023],
    ['6 сар', 32, 3, 5, 2023],
    ['7 сар', 35, 5, 6, 2023],
    ['8 сар', 31, 1, 7, 2023],
    ['9 сар', 33, 4, 8, 2023],
    ['10 сар', 36, 6, 9, 2023],
    ['11 сар', 31, 2, 10, 2023],
    ['12 сар', 34, 4, 11, 2023]
  ];
  let days = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'];

  const ChoseDays = b => {
    console.log('b', b);
    // checked[b] = !checked[b];
    // checked[b] = true;
    // setChecked(!checked[b]);

    let stateCopy = data;
    // setActive(b);

    data2023.map(m => {
      for (let i = 1; i <= m[1]; i++) {
        let temp = new Date(`${m[4]}-${m[3] + 1}-${i}`);
        // console.log("temp", temp);
        console.log('B', b);
        if (temp.getDay() === b) {
          if (
            stateCopy[
              `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
            ]
          ) {
            stateCopy[
              `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
            ] = false;
          } else {
            stateCopy[
              `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
            ] = true;
          }
        }
      }
    });

    setData({
      // ...data,
      ...stateCopy
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/api/zones`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(res => {
        setZones(res.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);
  const confirmHandler = () => {
    const zonesdata = [];
    zonebtn.map((item, index) => {
      if (item) {
        zones.map((x, y) => {
          if (y === index) {
            zonesdata.push(x);
          }
        });
      }
    });
    console.log('data odor', data);
    console.log('data zones', zonesdata);
    console.log('data garig', garigState);
    console.log('data xt', props.xtdata);
  };
  return (
    <Wrapper>
      <div className={css.container}>
        <HeaderXT zones={zones} setZonebtn={setZonebtn} />
        <Garig onClick={e => ChoseDays(e)} setGarigState={setGarigState} />
        <div className={css.calendarwrapper}>
          {data2023.map(item => {
            // console.log("item", item);
            return (
              <Month
                item={item}
                data={data2023}
                foobar={data}
                // index={index}
                key={Math.random()}
                days={days}
                setData={setData}
              />
            );
          })}
        </div>

        <div className={css.containerbtn}>
          <Button className={css.cancelbtn} onClick={closeHandler}>
            Цуцлах
          </Button>
          <Button className={css.confirmbtn} onClick={confirmHandler}>
            Хадгалах
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Calendar;
