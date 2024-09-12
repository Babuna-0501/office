import React, { useState, useEffect, useContext } from 'react';
import LendHook from '../../Hooks/LendHook';
import myHeaders from '../../components/MyHeader/myHeader';

import css from './newzone.module.css';
const Newzone = props => {
  const [data, setData] = useState([]);
  const [hello, setHello] = useState([]);
  let lendctx = useContext(LendHook);
  console.log('props.newdaata', props.data);
  useEffect(() => {
    const hello = [
      { id: 1, name: 'Hi' },
      { id: 2, name: 'World' }
    ];
    setHello(hello);

    let controller = new AbortController();
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      mode: 'cors'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/zones`;
    if (props.data.zones !== null) {
      if (props.data.zones.length > 24) {
        props.data.zones.split(',').map(item => {
          url = url + `?id=${item}`;
          console.log('url - 2', url);
          fetch(url, requestOptions)
            .then(r => r.json())
            .then(response => {
              console.log('multi zone ', response);
              setData(response.data);
              controller = null;
              url = `${process.env.REACT_APP_API_URL2}/api/zones`;
            })
            .catch(error => {
              console.log('error', error);
            });
        });
      } else {
        url = url + `?id=${props.data.zones}`;
        console.log('url - 1', url);

        fetch(url, requestOptions)
          .then(r => r.json())
          .then(response => {
            console.log('one zone ', response);
            setData(response.data);
            controller = null;
            url = `${process.env.REACT_APP_API_URL2}/api/zones`;
          })
          .catch(error => {
            console.log('error', error);
          });
      }
    } else if (props.data.zones === null) {
      console.log('props.data.zones === null');
    }
    return () => controller?.abort();
  }, [props.data]);
  console.log('zone data ++++ ------ ********', data);

  return (
    <div className={css.container}>
      Newzone
      <div>
        {hello?.map(item => {
          return <p>{item.name} </p>;
        })}
      </div>
      <div
        style={{
          display: 'block'
        }}
      >
        <div>neg </div>
        {data &&
          data.map((item, index) => {
            // console.log("hi new zone 123456", item);
            return <div key={index}>{`Ene bol ${item.name}`}</div>;
          })}
        <div>Hieeee</div>
      </div>
    </div>
  );
};

export default Newzone;
