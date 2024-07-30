import React, { useState, useEffect } from 'react';
import css from './avatar.module.css';

const Avatar = props => {
  const [data, setData] = useState([]);
  // console.log("props avatar", props);
  useEffect(() => {
    let aa = [];
    props.ids &&
      props.ids.map(x => {
        let bbb = props.users.filter(item => item.user_id === x);
        aa.push(bbb[0]);
      });
    setData(aa);
  }, [props]);

  let images = data.slice(0, 3).map((item, index) => {
    return (
      <div
        className={css.avatar}
        style={{
          zIndex: index + 1
        }}
        key={index}
      >
        <img
          src={
            item && item.profile_picture
              ? item.profile_picture.replace('original', 'small')
              : `${process.env.REACT_APP_MEDIA_URL}/product/69883d9becbcf663f7f3da1b874eab762cf6581c3ee1d3e81098e6f14aae.jpg`
          }
          alt='avatar image'
        />
      </div>
    );
  });

  let backgimage;
  if (data.length > 3) {
    backgimage = data.slice(4, 5).map((l, i) => {
      let too = data.length - 4;
      if (too > 0) {
      } else {
        too = '';
      }
      return (
        <div
          className={css.avatar}
          style={{
            zIndex: 4 + 1,
            background: '#E6E6E6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          key={i}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#b3b3b3'
            }}
          >
            +{too}
          </span>
        </div>
      );
    });
  }

  return (
    <div className={css.container}>
      {images}
      {backgimage}
    </div>
  );
};

export default Avatar;
