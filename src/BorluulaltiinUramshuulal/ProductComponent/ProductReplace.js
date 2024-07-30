import React, { useState, useContext, useEffect } from 'react';
import { styles } from './style';
import checkbox from '../../assets/check box.svg';
import checked from '../../assets/Tick Square_green.svg';
import css from './product.module.css';
import SMSHook from '../../Hooks/SMSHook';
import TargetComp from './TargetComp';

const ProductReplace = props => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [actionAmount, setActionAmount] = useState(100000);
  const [totalWidth, setTotalWidth] = useState(null);
  const smsctx = useContext(SMSHook);

  useEffect(() => {
    let total = 0;
    if (props.item.totalQuantity > 0) {
      total +=
        total +
        Number(
          props.item.totalQuantity *
            props.item.locations['62f4aabe45a4e22552a3969f'].price.channel['1']
        );
    }
    total = total + Number(props.item.totalAmount);
    // console.log("total", total);
    // console.log("width", (Number(actionAmount) * 100) / Number(totalAmount));
    setTotalWidth((Number(actionAmount) * 100) / Number(totalAmount));

    setTotalAmount(total);
    smsctx.setTotalAmount(total);
  }, [props.item]);

  const ChosedHandler = item => {
    // console.log("item", item);
  };

  return (
    <div className={css.oneproduct}>
      <div
        className={css.onesup}
        style={{
          ...styles.imageContainer
        }}
      >
        <img
          src={
            props.item && props.item.image
              ? props.item.image[0].replace('original', 'product')
              : `${process.env.REACT_APP_MEDIA_URL}/product/69883d9becbcf663f7f3da1b874eab762cf6581c3ee1d3e81098e6f14aae.jpg`
          }
        />
      </div>
      <div
        className={css.onesup}
        style={{
          ...styles.productContainer,
          marginRight: '10px'
        }}
      >
        <span>{props.item && props.item.name && props.item.name}</span>
      </div>
      <div
        className={css.onesup}
        style={{
          ...styles.angilalContainer
        }}
      >
        <span>{props.item && props.catname && props.catname.name}</span>
      </div>
      <div
        className={css.onesup}
        style={{
          ...styles.brandContainer
        }}
      >
        <span>
          {props.item && props.brandname && props.brandname.BrandName}
        </span>
      </div>

      <div
        className={css.onesup}
        style={{
          ...styles.skuContainer
        }}
      >
        <span>{props.item && props.item.sku && props.item.sku}</span>
      </div>
      <div
        className={css.onesup}
        style={{
          ...styles.barcodeContainer
        }}
      >
        <span>{props.item && props.item.bar_code && props.item.bar_code}</span>
      </div>
      <div
        className={`${css.onesup} ${css.position}`}
        style={{
          ...styles.barcodeContainer
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: '700',
            display: 'flex',

            justifyContent: 'center'
          }}
        >
          {props.item.totalAmount
            ? `${props.item.totalAmount.toLocaleString()}₮`
            : null}
        </span>
      </div>
      <div
        className={`${css.onesup}`}
        style={{
          ...styles.barcodeContainer,
          display: 'flex',

          justifyContent: 'center'
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: '700'
          }}
        >
          {props.item ? `${props.item.totalQuantity}ш` : null}
        </span>
      </div>
      <div
        className={css.onesup}
        style={{
          ...styles.barcodeContainer,
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <div
          style={{
            display: 'block'
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#1A1A1A',
              fontWeight: '400'
            }}
          >
            {totalAmount ? `${totalAmount.toLocaleString()}₮` : null}
          </p>
        </div>
        <div
          style={{
            position: 'relative',
            width: '100px',
            display: 'block'
          }}
        >
          <p
            className={css.action}
            style={{
              width: `${totalWidth ? totalWidth : 0}px`
            }}
          ></p>
          <p
            className={css.target}
            style={{
              width: `${totalWidth ? 100 : 0}px`
            }}
          ></p>
          <p className={css.base}></p>
        </div>
      </div>
    </div>
  );
};

export default ProductReplace;
