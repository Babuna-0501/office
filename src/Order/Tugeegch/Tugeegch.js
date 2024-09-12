import React, { useState, useEffect, useContext } from 'react';
import css from './tugeegch.module.css';
import myHeaders from '../../components/MyHeader/myHeader';

const Tugeegch = props => {
  const [users, setUsers] = useState([]);
  const [chosed, setChosed] = useState(null);

  useEffect(() => {
    let update = props.users.filter(item => item.role === 2);

    let backUser = props.order;
    if (backUser.back_office_user !== null) {
      if (backUser.back_office_user?.length > 5) {
        let ids = backUser.back_office_user.split(',');
        ids.map(x => {
          update.map((user, index) => {
            if (user.user_id === x) {
              setChosed(x);
            }
          });
        });
      } else if (backUser.back_office_user) {
        update.map(x => {
          if (x.user_id == backUser.back_office_user) {
            setChosed(x.user_id);
          }
        });
      }
    }

    setUsers(update);
  }, [props.order]);

  const TugeegchHubaarilah = () => {
    let userIDS = [];

    let backUser = props.order;
    if (backUser.back_office_user !== null) {
      if (backUser.back_office_user.length > 4) {
        let aa = backUser.back_office_user.split(',');
        aa.map(item => {
          userIDS.push(Number(item));
        });
      }
      userIDS.push(978);
    } else {
      userIDS.push(978);
    }

    let uniqueChars = [...new Set(userIDS)];

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        orderId: props.order.order_id,
        backUserID: `'${uniqueChars.toString()}'`
      }),
      redirect: 'follow'
    };
    console.log('requestOptions backoffuce user chose', requestOptions);

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/order/update/new`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
        if (res.code === 200) {
          let aa = props.order;
          aa.back_office_user = uniqueChars.toString();
          props.setOrder(aa);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <select
      value={chosed}
      onChange={e => {
        console.log('e.target.value', e.target.value);
        setChosed(e.target.value);
        TugeegchHubaarilah();
      }}
      style={{
        width: '100%'
      }}
    >
      <option>Түгээгч байхгүй</option>
      {users &&
        users.map((item, index) => {
          return (
            <option value={item.user_id} key={index}>
              {item.first_name}
            </option>
          );
        })}
    </select>
  );
};

export default Tugeegch;
