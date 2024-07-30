import React, { useState, useEffect, useContext } from 'react';
import css from './angilal.module.css';
import myHeaders from '../../components/MyHeader/myHeader';
import closeIcon from '../../assets/close.svg';
import checkboxicon from '../../assets/check box.svg';
import chechboxchecked from '../../assets/Tick Square on 2.svg';
import SMSHook from '../../Hooks/SMSHook';
const Angilal = () => {
  const [angilal, setAngilal] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/site_data`, requestOptions)
      .then(res => res.json())
      .then(res => {
        setAngilal(res.categories);
      })
      .catch(error => {
        console.log('fetch sitedata error', error);
      });
  }, []);
  return (
    <div className={css.background}>
      <div className={css.modal}>
        <div className={css.body}>
          <div className={css.header}>
            <span>Ангилалын төлөвлөгөө</span>
            <img src={closeIcon} alt='close icon' />
          </div>
          <div className={css.subbody}>
            <div className={css.subheader}>
              <div>
                {' '}
                <img src={checkboxicon} />{' '}
              </div>
              <div>
                <span>Ангилал</span>
                <input />
              </div>
              <div>
                <span>Үнийн дүн төлөвлөгөө</span>
                <input />
              </div>
            </div>
            <div className={css.angilal}>{}</div>
          </div>
        </div>
        <div className={css.btncontainer}>
          <button className={css.cancel}>Цуцлах</button>
          <button className={css.confirm}>Хадгалах</button>
        </div>
      </div>
    </div>
  );
};

export default Angilal;
