import React, { useContext } from 'react';
import css from './userdetail.module.css';
import checkbox from '../../assets/check box.svg';
import checked from '../../assets/Tick Square_green.svg';
import SMSHook from '../../Hooks/SMSHook';
import { replaceImageUrl } from '../../utils';

const Userdetail = props => {
  const smsctx = useContext(SMSHook);

  // console.log("props users", props);
  const ChosedHandler = () => {
    let aa = [...props.users];
    aa.find(x => x.user_id === props.data.user_id).chosed = !props.data.chosed;

    props.setUsers(aa);
  };
  return (
    <div
      className={css.container}
      style={{
        background:
          props.data && props.data.chosed === true ? '#F4FAED' : '#fff',
        borderRadius: props.data && props.data.chosed === true ? '12px' : '12px'
      }}
    >
      <img
        src={props.data && props.data.chosed === true ? checked : checkbox}
        style={{
          width: '18px',
          height: '18px',
          marginRight: '10px'
        }}
        alt='chosed icon'
        onClick={ChosedHandler}
      />
      <div className={css.imagecontainer}>
        <img
          src={
            props.data && props.data.profile_picture
              ? replaceImageUrl(props.data.profile_picture)
              : `${process.env.REACT_APP_MEDIA_URL}/product/69883d9becbcf663f7f3da1b874eab762cf6581c3ee1d3e81098e6f14aae.jpg`
          }
          alt='zurag'
        />
      </div>
      <div className={css.detailwrapper}>
        <p className={css.detailname}>
          {props.data.first_name
            ? props.data.first_name
            : 'Xудалдааны төлөөлөгч'}
        </p>
        <p className={css.detailrole}>
          {props.data.role ? props.data.roleName.Role : 'Худалдааны төлөөлөгч'}
        </p>
        <p className={css.detailjob}>
          /{props.data.role ? props.data.roleName.Role : 'Улаанбаатар'}/
        </p>
      </div>
    </div>
  );
};

export default Userdetail;
