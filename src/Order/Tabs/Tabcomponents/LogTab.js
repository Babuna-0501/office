import React, { useEffect, useState } from 'react';
import css from './logtab.module.css';
import LogList from '../LogComponent/LogList';
import myHeaders from '../../../components/MyHeader/myHeader';

const LogTab = props => {
  console.log('order ID', props.order.order_id);
  const [logs, setLogs] = useState([]);

  console.log('props', logs);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/get/backofficelog?entry_id=${props.order.order_id}`;
    console.log('url', url);
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('logs ', res);
        setLogs(res.data);
      })
      .catch(error => {
        console.log('aldaa ', error);
      });
  }, [props.order]);
  return (
    <div className={css.container}>
      <ul>
        {logs &&
          logs.map((item, index) => {
            return <LogList item={item} key={index} />;
          })}
      </ul>
    </div>
  );
};

export default LogTab;
