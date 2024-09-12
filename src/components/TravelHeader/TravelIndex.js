import React, { useState, useEffect } from 'react';
import css from './travel.module.css';
import myHeaders from '../MyHeader/myHeader';
import { CSVLink, CSVDownload } from 'react-csv';

const TravelIndex = () => {
  const [data, setData] = useState([]);
  let headers = [
    { label: 'GrandTotal', key: 'GrandTotal' },
    { label: 'Total', key: 'Total' },
    { label: 'TradeshopID', key: 'TradeshopID' },
    { label: 'TradeshopName', key: 'TradeshopName' },
    { label: 'WaitingTotal', key: 'WaitingTotal' },
    { label: 'target', key: 'target' },
    { label: 'target_result', key: 'target_result' }
  ];

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/marathons/target`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        //   console.log("res", res);
        if (res.code === 200) {
          // setData(res.data);
          setData(res.data);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);
  const SaveHandler = () => {
    if (data.length === 0) {
      alert('Та дахин оролдоно уу');
      return;
    }
  };
  return (
    <div className={css.container}>
      <button onClick={SaveHandler}>
        <CSVLink data={data} target='_blank' headers={headers}>
          Тайлан татах
        </CSVLink>
      </button>
    </div>
  );
};

export default TravelIndex;
