import React, { useEffect, useState, useContext } from 'react';
import { Button, message } from 'antd';
import css from './list.module.css';
import settingIcon from '../assets/Setting.svg';
import deleteIcon from '../assets/delete_red_small.svg';
import YearHour from './components/YearHour';
import { Popconfirm, Switch } from 'antd';
import myHeaders from '../components/MyHeader/myHeader';
import { styles } from './style';
import AppHook from '../Hooks/AppHook';
const text = 'Та устгахдаа итгэлтэй байна уу?';

const dateFunction = a => {
  let year;
  let hour;
  ////   2022-11-15T02:17:20.712Z zadalj baigaa data
  if (a === null) {
    return {
      year: '0000:00:00',
      hour: '00:00'
    };
  } else if (a === undefined) {
    return {
      year: '0000:00:00',
      hour: '00:00'
    };
  } else if (a.includes(',')) {
    year = a.split(',')[0];
    year = new Date(year);
    // console.log("year", year);
    year = `${year.getFullYear()}-${year.getMonth() + 1}-${year.getDate()}`;
    hour = a.split(',')[1];
    let p = hour.split(':')[0].trim(' ');
    if (p < 10) {
      hour = `0${p}:${hour.split(':')[1]}`;
    }
    hour = hour.slice(0, 6);
    return {
      year: year,
      hour: hour
    };
  } else if (a) {
    year = a.split('T')[0];
    let b = a.split('T')[1];
    hour = b.toLocaleString().slice(0, 5);
    return {
      year: year,
      hour: hour
    };
  } else {
    return {
      year: '0000:00:00',
      hour: '00:00'
    };
  }
};

const List = props => {
  // console.log("props zones list", props);

  const updateHandler = (id, index) => {
    // console.log(id);
    props.zonesctx.setUpdateModal(true);
    props.zonesctx.setUpdateID(id);
  };

  //   console.log("Data", data);
  const showHandler = item => {
    const {
      _id,
      name,
      polygons,
      priority,
      supplier,
      isActive,
      createdDate,
      updateDate
    } = item;
    let aa;
    if (isActive === 1) {
      aa = 0;
    } else {
      aa = 1;
    }

    var raw = JSON.stringify({
      id: _id,
      update: {
        isActive: Number(aa)
      }
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log("reqeustOptions", requestOptions);
    fetch(`${process.env.REACT_APP_API_URL2}/api/zones/update`, requestOptions)
      .then(r => r.json())
      .then(res => {
        console.log('isactive zone ', res);
        if (res.code === 200) {
          let oldData = props.allData;

          let newDatas = oldData.filter(x => x._id === item._id);
          newDatas[0].isActive = Number(aa);
          console.log('newdatas', newDatas);
          console.log('old data', oldData);

          props.hi([...oldData, ...newDatas]);
        }
      })
      .catch(error => {
        console.log('error zones delete', error);
      });
  };

  const confirm = data => {
    // console.log("checked", data);
    var raw = JSON.stringify({
      supplierId: data.supplier,
      zoneId: data._id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log("reqeustOptions", requestOptions);
    fetch(`${process.env.REACT_APP_API_URL2}/api/zones/delete`, requestOptions)
      .then(r => r.json())
      .then(res => {
        if (res.code === 200) {
          console.log('zone delete res', res);
          let oldData = props.allData;
          console.log('olddata+++', oldData);
          let newDatas = oldData.filter(x => x._id !== data._id);
          props.hi([...newDatas]);
          alert('Амжилттай устгалаа.');
        }
      })
      .catch(error => {
        console.log('error zones delete', error);
      });
  };

  return (
    <div className={css.container}>
      <div className={css.inputContainer} style={styles.checkboxcontainer}>
        <input
          type='checkbox'
          // id={requests.id}
        />{' '}
      </div>
      <div
        style={styles.zonenamecontainer}
        onClick={() => updateHandler(props.data._id)}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: '400',
            color: '#37474F',
            marginLeft: '10px'
          }}
        >
          {props.data.name}
        </span>
      </div>
      <div style={styles.suppliercontainer}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: '400',
            color: '#37474F',
            marginLeft: '10px'
          }}
        >
          {/* {eee} */}
        </span>
      </div>
      <div
        style={{
          ...styles.showcontainer,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center'
          // background: "green",
        }}
      >
        <span
          onClick={() => showHandler(props.data)}
          className={css.switchcontainer}
        >
          {Number(props.data.isActive) === 0 ? (
            <img
              src='/media/off.svg'
              alt='zurag'
              style={{
                width: '100%'
              }}
            />
          ) : (
            <img
              src='/media/on.svg'
              alt='zurag'
              style={{
                width: '100%'
              }}
            />
          )}
        </span>
      </div>
      <div
        style={{
          ...styles.erembecontainer,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: '400',
            color: '#37474F'
          }}
        >
          {props.data.priority}
        </span>
      </div>
      <div
        style={{
          ...styles.createddatacontainer,
          // display: "flex",
          marginLeft: '10px'
          // flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <YearHour
          year={props.data.createdDate?.substr(0, 10)}
          hour={props.data.createdDate?.substr(11, 16)}
        />
      </div>
      <div style={{ ...styles.updatedatecontainer }}>
        <YearHour
          year={props.data.updateDate?.substr(0, 10)}
          hour={props.data.updateDate?.substr(10, 16)}
        />
      </div>
      <div style={{ ...styles.registercontainer }}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: '400',
            color: '#37474F'
          }}
        >
          {props.data.createdBy}
        </span>
      </div>
      <div style={{ ...styles.removecontainer }}>
        <div className={css.iconContainer}>
          <img
            src={settingIcon}
            onClick={() => updateHandler(props.data._id)}
          />
          {props.data._id === '62f4aabe45a4e22552a3969f' ||
          props.data._id === '62f4ae9545a4e22552a396a0' ? (
            <div></div>
          ) : (
            <Popconfirm
              placement='right'
              title={text}
              onConfirm={() => confirm(props.data)}
              okText='Тийм'
              cancelText='Үгүй'
            >
              <img
                src={deleteIcon}
                // onClick={() => deleteHandler(tx._id)}
              />
            </Popconfirm>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
