import React, { useState } from 'react';
import css from './promo.module.css';
import { styles } from '../Headermain/style';
import DeleteIcon from '../../assets/delete_red_small.svg';
import myHeaders from '../../components/MyHeader/myHeader';
import NewForm from '../NewForm/NewForm';

const Promo = props => {
  // console.log("props", props);

  const [openForm, setOpenForm] = useState(false);
  const DeleteHandler = () => {
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({
        discount_id: props.item._id,
        is_active: 0
      })
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/discount/delete`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        console.log('Res delete', res);
        if (res.code === 200) {
          let data = [...props.data];
          data = data.filter(x => x._id !== props.item._id);
          props.setData(data);
          alert(res.message);
        }
      })
      .catch(error => {
        alert(`Устгахад алдаа гарлаа. ${error}`);
      });
  };
  const OpenHandler = () => {
    if (props.item.supplierID === 10 || props.item.supplierID === 4766) {
      return;
    }
    console.log('open');
    setOpenForm(true);
  };
  return (
    <div className={css.container} onClick={OpenHandler}>
      <div
        style={{
          ...styles.one,
          overflow: 'hidden'
        }}
      >
        {props.item && props.item?.supplierName}
      </div>
      <div
        style={{
          ...styles.one,
          overflow: 'hidden'
        }}
        className={css.productname}
        title={props.item && props.item?.discount_data?.title?.toString()}
      >
        {props.item && props.item.discount_data?.title}
      </div>
      <div
        style={{
          ...styles.one,
          overflow: 'hidden'
        }}
        className={css.productname}
        title={props.item && props.item?.productName?.toString()}
      >
        {props.item && props.item?.productName?.toString()}
      </div>
      <div
        style={{
          ...styles.one,
          overflow: 'hidden'
        }}
        className={css.productname}
        title={props.item && props.item?.products?.toString()}
      >
        {props.item && props.item?.products?.toString()}
      </div>
      <div
        style={{
          ...styles.one,
          overflow: 'hidden'
        }}
        className={css.productname}
        title={props.item && props.item?.productBarcode?.toString()}
      >
        {props.item && props.item?.productBarcode?.toString()}
      </div>
      <div
        style={{
          ...styles.one,
          overflow: 'hidden'
        }}
        className={css.productname}
        title={props.item && props.item?.catName?.toString()}
      >
        {props.item && props.item?.catName?.toString()}
      </div>
      <div
        style={{
          ...styles.one,
          overflow: 'hidden'
        }}
        className={css.productname}
        title={props.item && props.item?.location?.toString()}
      >
        {props.item && props.item?.location?.toString()}
      </div>
      <div
        style={{
          ...styles.one,
          overflow: 'hidden'
        }}
      >
        {props.item && props.item?.start_date}
      </div>
      <div
        style={{
          ...styles.one,
          overflow: 'hidden'
        }}
      >
        {props.item && props.item?.end_date}
      </div>
      <div
        style={{
          ...styles.ten,
          overflow: 'hidden',
          display:
            props.item.supplierID === 10 || props.item.supplierID === 4766
              ? 'none'
              : 'block'
        }}
      >
        <img
          src={DeleteIcon}
          alt='delete icon'
          style={{
            width: '25px',
            height: '25px'
          }}
          onClick={DeleteHandler}
        />
      </div>
      {openForm && <NewForm setOpenForm={setOpenForm} data={props.item} />}
    </div>
  );
};

export default Promo;
