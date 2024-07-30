import React, { useEffect, useState } from 'react';
import css from './brandbody.module.css';
import blackchecked from '../../assets/check box_black.svg';
import checkedgray from '../../assets/check box.svg';

const BrandBody = props => {
  const [branddata, setBranddata] = useState([]);

  useEffect(() => {
    let update = props.brands?.map(item => {
      return {
        ...item,
        chosed: false,
        totalAmount: null,
        actionAmount: null
      };
    });
    setBranddata(update);
  }, [props.brands]);

  const CheckedHandler = item => {
    let update = branddata.map(x => {
      if (x.BrandID === item.BrandID) {
        return {
          ...x,
          chosed: x.chosed == true ? false : true
        };
      }
      return x;
    });
    setBranddata(update);
    props.setChosedData(update);
  };
  return (
    <div className={css.container}>
      {branddata &&
        branddata?.map((item, index) => {
          return (
            <div
              key={index}
              className={css.wrapper}
              style={{
                background: item.chosed ? '#F2F2F2' : '#fff',
                borderBottom: item.chosed
                  ? '1px solid #fff'
                  : '1px solid rgba(0, 0, 0, 0.08)'
              }}
              onClick={() => CheckedHandler(item)}
            >
              <img src={item && item.chosed ? blackchecked : checkedgray} />
              <p>
                <img
                  src={
                    item && item.Image
                      ? item.Image
                      : `${process.env.REACT_APP_MEDIA_URL}/product/3972463217692126714577193090202305010152296735091923881782527978709705.png`
                  }
                  alt='logo'
                  style={{
                    width: '40px',
                    height: '40px'
                  }}
                />
              </p>
              <span>{item.BrandName}</span>
            </div>
          );
        })}
    </div>
  );
};

export default BrandBody;
