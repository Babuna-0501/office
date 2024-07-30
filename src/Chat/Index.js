import React, { useContext, useEffect } from 'react';
import css from './index.module.css';
import closeIcon from '../assets/close.svg';
import FilterIcon from '../assets/Filter 4.svg';
import ChatHook from '../Hooks/ChatHook';
import AppHook from '../Hooks/AppHook';
import Message from './component/Message';
import Messenger from './messagecomponent/Messenger';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useState } from 'react';
const { Search } = Input;

const Index = props => {
  const chatctx = useContext(ChatHook);
  const appctx = useContext(AppHook);
  const [data, setData] = useState([]);
  const onSearch = value => console.log(value);

  const showMessengerHandler = data => {};
  // console.log("appctx chat", appctx);
  const Fetchdata = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let url = `${process.env.REACT_APP_API_URL2}/api/users/get?phone=${
      appctx.userData.phone ? appctx.userData.phone : 88058822
    }`;
    // let url = `https://api.ebazaar.link/api/chats?tradeshop_id=T2150`;
    // let url = `https://api.ebazaar.link/api/chats?tradeshop_id=T2150`;

    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        // console.log("chat res", res);
        let phoneNumber;
        res.map(tx => {
          phoneNumber = tx.PhoneNumber;
        });

        if (phoneNumber) {
          fetch(
            `${
              process.env.REACT_APP_API_URL2
            }/api/merchants?user_phone=${Number(phoneNumber)}`,
            requestOptions
          )
            .then(r => r.json())
            .then(res => {
              // console.log("res", res);
              setData(res.data);
            });
        }
      });
  };
  useEffect(() => {
    try {
      Fetchdata();
    } catch (error) {
      alert('Алдаа гарлаа');
    }
  }, []);
  return (
    <div className={css.container}>
      <div className={css.firstcontainer}></div>
      <div className={css.wrapper}>
        <div className={css.header}>
          <p>Чат</p>
          <img
            src={closeIcon}
            alt='close icon'
            onClick={() => chatctx.setChatopen(false)}
          />
        </div>
        <div className={css.secondheader}>
          <Search
            placeholder='Хайх ...'
            onSearch={onSearch}
            style={{
              width: 450
            }}
          />
          <img src={FilterIcon} alt='filter icon' />
        </div>
        <div className={css.verticalcontainer}>
          {data.map((tx, index) => {
            return (
              <Message
                showMessengerHandler={showMessengerHandler}
                tx={tx}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
