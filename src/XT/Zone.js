import React, { useEffect, useState } from 'react';
import css from './zone.module.css';
import closeicon from '../assets/close.svg';
import myHeaders from '../components/MyHeader/myHeader';
import { zoneStyles } from './zoneStyle';
import OneZone from './OneZone';

const Zone = props => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`${process.env.REACT_APP_API_URL2}/api/zones`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
        if (res.data.length !== 0) {
          let zoneids = [];
          console.log('props.data.zones', props.data.zones);
          if (props.data.zones && props.data.zones.length > 25) {
            let aa = props.data.zones.split(',');
            aa.map(item => {
              zoneids.push(item);
            });
          } else {
            zoneids.push(props.data.zones);
          }

          let update = res.data.map(item => {
            if (zoneids.length !== 0 && zoneids.includes(item._id)) {
              return {
                ...item,
                checked: true
              };
            } else {
              return {
                ...item,
                checked: false
              };
            }
          });
          setData(update);
        }
        // setData(res.data);
      })
      .catch(e => {
        console.log('e', e);
      });
  }, [props]);
  const closeHandler = () => {
    props.setZoneOpen(false);
  };
  const submitHandler = () => {
    let ids = [];
    data.map(item => {
      if (item.checked) {
        ids.push(item._id);
      }
    });
    let raw = {
      user_id: props.data.user_id,
      zones: ids.toString()
    };
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };
    console.log('requestOptions', requestOptions);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        console.log(' hereglegchiig update hiilee ', res);
        if (res.code === 200) {
          let update = [...props.worksdata];
          update = update.map(x => {
            if (x.user_id === props.data.user_id) {
              return {
                ...x,
                zones: ids.toString()
              };
            }
            return x;
          });
          props.setWorksdata(prev => [...update]);
          alert('Амжилттай хадгалагдлаа');
          props.setZoneOpen(false);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  console.log('props', props);
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div>
          <div className={css.closewrapper}>
            <div className={css.headercontainer}>Бүсчлэл сонгох</div>
            <img src={closeicon} alt='close' onClick={closeHandler} />
          </div>
          <div className={css.body}>
            <div className={css.header}>
              <div
                style={{
                  width: '200px',
                  borderRight: '1px solid #CFD8DC'
                }}
              >
                Name
              </div>
              <div
                style={{
                  width: '200px'
                }}
              >
                Created by
              </div>
            </div>
            <div className={css.zonebody}>
              {data &&
                data.map((item, index) => {
                  return (
                    <OneZone
                      item={item}
                      setData={setData}
                      key={index}
                      data={data}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className={css.bntcontainer}>
          <button onClick={closeHandler} className={css.cancel}>
            Цуцлах
          </button>
          <button onClick={submitHandler} className={css.confirm}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Zone;
