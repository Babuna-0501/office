import React from 'react';
import css from './list.module.css';
import settingIcon from '../assets/Setting.svg';
import deleteIcon from '../assets/delete_red_small.svg';

const List = props => {
  const updateHandler = (id, index) => {
    // console.log(id);
    props.zonesctx.setUpdateModal(true);
    props.zonesctx.setUpdateID(id);
  };
  //   console.log("Data", data);
  const deleteHandler = id => {
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      id: id,
      update: {
        isActive: 0
      }
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log("reqeustOptions", requestOptions);
    fetch(`${process.env.REACT_APP_API_URL2}/api/zones/update`, requestOptions)
      .then(r => r.json())
      .then(res => {
        alert('Та амжилттай устгалаа.');
        let aa = props.zonesctx?.data?.filter(item => {
          return item._id !== id;
        });
        props.zonesctx?.setData(aa);
      })
      .catch(error => {
        console.log('error zones delete', error);
      });
  };
  return props.zonesctx?.data ? (
    <div className={css.wrapper}>
      {props.zonesctx?.data?.map((tx, index) => {
        // console.log("tx", tx);
        let aaa = tx.createdDate ? tx.createdDate.split('T')[0] : '';
        let bbb = tx.createdDate
          ? tx.createdDate.split('T')[1].slice(0, 5)
          : '';
        if (tx.isActive === 1) {
          return (
            <div className={css.container} key={index}>
              <div className={css.inputContainer} style={{ width: '35px' }}>
                <input
                  type='checkbox'
                  // id={requests.id}
                />{' '}
              </div>
              <div
                style={{ width: '300px', marginRight: '80px' }}
                onClick={() => updateHandler(tx._id, index)}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#37474F'
                  }}
                >
                  {tx.name}
                </span>
              </div>
              <div style={{ width: '106px', marginRight: '10px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#37474F'
                  }}
                >
                  {aaa}
                </span>
                <br />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#37474F'
                  }}
                >
                  {bbb}
                </span>
              </div>
              <div style={{ width: '180px' }}>
                <div className={css.iconContainer}>
                  <img src={settingIcon} />
                  <img src={deleteIcon} onClick={() => deleteHandler(tx._id)} />
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  ) : (
    <span>Түр хүлээнэ үү ...</span>
  );
};

export default List;
