import React, { useState, useEffect, useContext } from 'react';
import marshruticon from '../assets/xtmarshrut.svg';
import marshrutIconBlack from '../assets/xtmarshrut_black.svg';
import css from './onext.module.css';
import arrowright from '../assets/Arrow - Right.svg';
import arrowrightBlack from '../assets/Arrow_right_black.svg';
import MyComponent from './MapsComponent';
import calendarIcon from '../assets/Calendar 2.svg';
import Plusicon from '../assets/plus icon.svg';
import XTHook from '../Hooks/XtHook';
import { TradeshopList } from './TradeshopList';
import myHeaders from '../components/MyHeader/myHeader';

const Onext = ({ data, listdata, worksdata, setWorksdata }) => {
  const [info, setInfo] = useState([]);
  const [active, setActive] = useState(null);
  const [mapState, setMapState] = useState(null);
  const [marshrutdata, setMarshrutdata] = useState([]);
  const [alldate, setAlldate] = useState([]);

  const [showMap, setShowMap] = useState(false);

  const xtctx = useContext(XTHook);

  // console.log("onext data", data);
  // console.log("onext listdata", listdata);

  useEffect(() => {
    let dataaa = [];
    let secondata = [];
    let keydata = [];

    listdata.forEach(item => {
      keydata.push(Object.keys(item));
    });
    listdata &&
      listdata?.map((item, index) => {
        if (Number(item.user) === Number(data.user_id)) {
          secondata.push(item);

          if (dataaa.includes(item.CreatedDate.split(',')[0])) {
          } else {
            dataaa.push(item.CreatedDate.split(',')[0]);
          }
        }
      });
    // console.log("secondata", secondata);
    setAlldate(dataaa.reverse());
    // setMarshrutdata(secondata);
    setInfo(data);
  }, [data]);

  const Handler = (i, data) => {
    console.log('x ++++++t +++++i', data);
    let newdate = new Date();
    // console.log("newdata", newdate);
    let newToday = newdate.getDate();
    let newYear = newdate.getFullYear();
    let newMonth = newdate.getMonth();
    // console.log(newToday, newMonth + 1, newYear);
    let today = `${newMonth + 1}/${newToday}/${newYear}`;

    //// data = 7/3/2023
    if (data === today) {
      setTimeout(() => {
        fetch(
          `${process.env.REACT_APP_API_URL2}/api/tracking?CreateDate=${today}&user=878`,
          {
            method: 'GET',
            headers: myHeaders
          }
        )
          .then(res => res.json())
          .then(res => {
            // console.log("res", res);
            if (res.code === 200 && res.list.length > 1) {
              setMarshrutdata(res.list);
            }
          })
          .catch(error => {
            console.log('error ', error);
          });
      }, [1000]);
    } else {
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/tracking?CreateDate=${data}&user=878`,
        {
          method: 'GET',
          headers: myHeaders
        }
      )
        .then(res => res.json())
        .then(res => {
          // console.log("res", res);
          if (res.code === 200 && res.list.length > 1) {
            setMarshrutdata(res.list);
          }
        })
        .catch(error => {
          console.log('error ', error);
        });
    }

    setActive(i);
    setMapState(data);
  };
  const onCalendarHandler = () => {
    xtctx.setCalendarOpen(true);
    xtctx.setHi(false);
  };
  // console.log("alldate", alldate);

  const TrackerHandler = () => {
    let maptrack = data.background;
    if (maptrack === 1) {
      maptrack = 0;
    } else {
      maptrack = 1;
    }

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        user_id: data.user_id,
        background: maptrack
      }),

      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        // console.log("success", res);

        if (res.code === 200) {
          setInfo({
            ...info,
            background: maptrack
          });
          let aa = [...worksdata];
          aa.find(item => item.user_id === data.user_id).background = maptrack;
          setWorksdata(aa);
          alert(res.message);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <div className={css.container}>
      <div className={css.headerWrapper}>
        <div className={css.smallwrapper}>
          <span className={css.headerName}>{info && info.first_name}</span>
          <span className={css.headerNameSub}>{info && info.role}</span>
        </div>
        <div>
          <span className={css.headerName}>{alldate && alldate[active]}</span>
          <span className={css.headerNameSub}>
            {alldate[active] ? 'Маршрут' : ''}
          </span>
        </div>

        <div className={css.buttonsWrapper}>
          <div onClick={() => setShowMap(p => !p)}>
            <img src={marshrutIconBlack} alt='Show Map' />
          </div>
          <button>ХТ хуваарь тохиргоо</button>
        </div>
      </div>
      <div className={css.secondwrapper}>
        <div className={css.daywrapper}>
          <ul className={css.ulwrapper}>
            <li>
              <div className={css.btnaddwrapper} onClick={onCalendarHandler}>
                <span className={css.hubaarispan}>
                  <img
                    src={calendarIcon}
                    alt='calendar'
                    style={{
                      width: '20.5px',
                      height: '20.5px'
                    }}
                  />
                  Хуваарь нэмэх
                </span>
                <img
                  src={Plusicon}
                  alt='plus icon'
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                />
              </div>
            </li>
            {alldate.map((item, index) => {
              return (
                <li
                  className={css.wrapper}
                  style={{
                    background: active === index ? '#FFF7E6' : '#fff'
                  }}
                  onClick={() => Handler(index, item)}
                >
                  <span className={`${active === index ? css.new : css.bar}`}>
                    {item}
                  </span>
                  <img
                    src={`${
                      active === index ? marshrutIconBlack : marshruticon
                    }`}
                    alt='marshrut'
                    className={css.marshrut}
                  />
                  <img
                    src={`${active === index ? arrowrightBlack : arrowright}`}
                    alt='arrow'
                    className={css.marshrut}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className={css.map}>
          {!showMap && (
            <>
              <div className={css.title}>Хувиарласан харилцагчийн жагсаалт</div>
              <TradeshopList />
            </>
          )}
          {showMap && (
            <>
              <div className={css.title}>
                <div> Өдрийн маршрут {alldate && alldate[active]} </div>
                <div className={css.showrapper} onClick={TrackerHandler}>
                  <span>Замын маршрут бичих зөвшөөрөх </span>
                  {info.background === 1 ? (
                    <img
                      src='https://admin.ebazaar.mn/media/on.svg'
                      alt='open'
                    />
                  ) : (
                    <img
                      src='https://admin.ebazaar.mn/media/off.svg'
                      alt='close'
                    />
                  )}
                </div>
              </div>
              <div className={css.mapwrapper}>
                <MyComponent mapState={mapState} marshrutdata={marshrutdata} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onext;
