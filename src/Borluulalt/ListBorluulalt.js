import { useEffect, useState } from 'react';
import css from './borluulalt.module.css';
import { OneList } from './OneList';
import myHeaders from '../components/MyHeader/myHeader';

export const ListBorluulalt = () => {
  const [data, setData] = useState([]);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/order/payments`, requestOptions)
      .then(res => res.json())
      .then(response => setData(response.data));
  }, []);

  return (
    <div className={css.boxContainer}>
      {data.map((d, index) => {
        return <OneList d={d} key={index} />;
      })}
    </div>
  );
};
