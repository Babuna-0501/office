import React, { useEffect, useState, useContext } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import css from './noatheader.module.css';
import AppHook from '../../Hooks/AppHook';
import { Company } from '../NoatCompany';

const NoatHeader = props => {
  console.log('props -----------n', props);

  const noatctx = useContext(AppHook);
  let registter = '';
  registter = Company[props.userData.company_id];
  console.log(props);

  const ShalgahHandler = () => {
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({
        register: Number(registter)
      })
    };
    fetch(`${process.env.REACT_APP_API_URL2}/api/ebarimt/info`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('Res', res);
        if (res.code === 200) {
          noatctx.setNoatInfo(res.data);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (noatctx.noatCheck) {
      ShalgahHandler();
    }
  }, [noatctx.noatCheck]);
  useEffect(() => {
    ShalgahHandler();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '16px',
        width: '100%'
      }}
    >
      <div>
        <button className={css.btncontainerCancel} onClick={ShalgahHandler}>
          Илгээгээгүй баримт шалгах
        </button>
      </div>
      <div className={css.container}>
        <span>
          Илгээхэд бэлэн:{' '}
          {noatctx.noatInfo && noatctx.noatInfo.extraInfo.countBill}
        </span>
      </div>
      <div className={css.container}>
        <span>
          Үлдэгдэл:{' '}
          {noatctx.noatInfo && noatctx.noatInfo.extraInfo.countLottery}
        </span>
      </div>
    </div>
  );
};

export default NoatHeader;
