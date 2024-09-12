import React from 'react';
import css from './delgerengui.module.css';
import closeicon from '../../assets/close.svg';
import { replaceImageUrl } from '../../utils';
const Delgerengui = props => {
  const closeHandler = () => {
    props.setOpen(false);
    props.setOnedata([]);
  };

  return (
    <div className={css.container}>
      <div className={css.hooson}></div>

      <div className={css.newbody}>
        <div className={css.header}>
          <span>Бараа таталтын түүх</span>
          <img src={closeicon} alt='close button' onClick={closeHandler} />
        </div>
        <div className={css.firstwrapper}>
          {props.data &&
            props.data.line.map(item => {
              console.log('item', item);

              let oneproduct = props.products.filter(
                x => x._id === item.product_id
              )[0];
              return (
                <div className={css.secondwrapper}>
                  <div className={css.imagewrapper}>
                    <img
                      src={
                        oneproduct && oneproduct.image
                          ? replaceImageUrl(oneproduct?.image[0])
                          : `${process.env.REACT_APP_MEDIA_URL}/product/69883d9becbcf663f7f3da1b874eab762cf6581c3ee1d3e81098e6f14aae.jpg`
                      }
                      style={{
                        width: '45px',
                        height: '45px'
                      }}
                      alt='product image'
                    />
                  </div>
                  <div>
                    <div className={css.wrapper}>
                      <span className={css.nameheader}>
                        Бүтээгдэхүүний дугаар:{' '}
                      </span>
                      <span className={css.name}>
                        {item.product_id ? item.product_id : ''}
                      </span>
                    </div>
                    <div className={css.wrapper}>
                      <span className={css.nameheader}>
                        Бүтээгдэхүүний sku:{' '}
                      </span>
                      <span className={css.name}>
                        {oneproduct ? oneproduct.sku : ''}
                      </span>
                    </div>
                    <div className={css.wrapper}>
                      <span className={css.nameheader}>
                        Бүтээгдэхүүний barcode:{' '}
                      </span>
                      <span className={css.name}>
                        {oneproduct ? oneproduct.bar_code : ''}
                      </span>
                    </div>
                    <div className={css.wrapper}>
                      <span className={css.nameheader}>Татагдсан тоо: </span>
                      <span className={css.name}>{item.quantity}ш</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Delgerengui;
