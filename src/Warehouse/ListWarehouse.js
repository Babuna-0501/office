import React, { useContext, useState } from 'react';

import css from './list.module.css';
import Edit from '../assets/EditSquare.svg';
import AppHook from '../Hooks/AppHook';
import { styles } from './style';
import settingIcon from '../assets/Setting.svg';
import Serinumber from './Serinumber';
import carsvg from '../assets/car.svg';

const List = props => {
  const appctx = useContext(AppHook);
  const [showOpen, setShowOpen] = useState(false);
  const [data, setData] = useState(null);

  // console.log("props warehouse ", appctx.userData);
  const ShowHideHandler = () => {
    console.log('clicked');
  };
  const SettingHandler = () => {
    console.log('clicked');
  };
  const ShowHandlier = e => {
    setData(e);
    setShowOpen(true);
  };
  return (
    <div className={css.listcontainer}>
      <div className={css.wrapper}>
        {props?.warehouse?.map((e, i) => {
          return (
            <div className={css.container} key={i}>
              <div
                style={{
                  ...styles.allWidthContainer,

                  display: 'flex'
                }}
              >
                <div
                  style={{ ...styles.companyContainer, paddingLeft: '10px' }}
                >
                  <input type='checkbox' />
                </div>
                <div
                  style={{
                    ...styles.numberContainer,
                    padding: '0px 8px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#37474F'
                    }}
                  >
                    {e.name}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.notifContainer,
                    padding: '0px 8px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#37474F'
                    }}
                  >
                    {e.type}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.notifContainer,
                    padding: '0px 8px'
                  }}
                >
                  <div onClick={ShowHideHandler}>
                    {e.type === 1 ? (
                      <img src='/media/on.svg' alt='open ' />
                    ) : (
                      <img src='/media/off.svg' alt='close' />
                    )}
                  </div>
                </div>
                <div
                  style={{
                    ...styles.createdContainer,
                    padding: '0px 8px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#37474F'
                    }}
                  >
                    {e.manager}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.registerContainer,
                    padding: '0px 8px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#37474F'
                    }}
                  >
                    {e.supplier_name}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.serviceContainer,
                    padding: '0px 8px',
                    display: 'none'
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#37474F'
                    }}
                  >
                    {e.supplier_name}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#37474F',
                    width: '50px'
                  }}
                >
                  <img
                    src={Edit}
                    onClick={() => {
                      console.log(e);
                      appctx.setTabOpenstate(true);
                      appctx.setSelectedWareHouse(e);
                    }}
                    alt='edit'
                  />
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#37474F',
                    width: '50px'
                  }}
                >
                  <img src={settingIcon} alt='edit' onClick={SettingHandler} />
                </span>
                <span
                  style={{
                    display: appctx.userData.id === 351 ? 'block' : 'hidden',
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#37474F',
                    width: '50px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={carsvg}
                    style={{
                      // width: "40px",
                      height: '25px'
                    }}
                    alt='edit'
                    onClick={() => ShowHandlier(e)}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {showOpen && <Serinumber setShowOpen={setShowOpen} data={data} />}
    </div>
  );
};

export default List;
