import React, { useContext, useEffect, useState } from 'react';
import css from './promoindex.module.css';
import { styles } from './style';
import myHeaders from '../components/MyHeader/myHeader';
import OnePromo from './components/OnePromo/OnePromo';
import NewPromo from './components/NewPromo/NewPromo';
import PromoHookV1 from '../Hooks/PromoHookV1';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const PromoIndex = props => {
  const [data, setData] = useState([]);
  const promoctx = useContext(PromoHookV1);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/discounts`;
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('resPromo', res);
        setData(res);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);
  return (
    <div className={css.container}>
      <div className={css.headername}>
        <div>
          <span>Ner</span>
          <input />
        </div>
      </div>
      <div className={css.body}>
        {data &&
          data.map((item, index) => {
            return <OnePromo item={item} key={index} />;
          })}
      </div>
      {promoctx.newPromo && <NewPromo />}
    </div>
  );
};

export default PromoIndex;
