import React, { useContext, useState } from 'react';
import css from './supplier.module.css';
import ShuurkhaiHook from '../../../Hooks/ShuurkhaiHook';

const Supplier = props => {
  const { data, setIndex } = props;
  const shuurkhaiCtx = useContext(ShuurkhaiHook);
  const [catName, setCatName] = useState(
    shuurkhaiCtx.productGroup?.filter(item => item.id === data.category_id)
  );

  // console.log("DATA", data);
  return (
    <>
      <div className={css.itemContainer}>
        <div className={css.imgContainer}>
          <img
            src={data.media}
            alt=''
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              objectFit: 'contain'
            }}
          />
        </div>
        <div
          className={css.nameContainer}
          onClick={() => {
            // shuurkhaiCtx.setSuppId(data.id);
            console.log(data.id);
            setIndex(data.id);
          }}
          style={{ cursor: 'pointer' }}
        >
          <span>{data.name}</span>
        </div>
        <div className={css.showContainer}>
          {data.is_active === 1 ? (
            <img src='/media/on.svg' alt='' style={{ width: '35px' }} />
          ) : (
            <img src='/media/off.svg' alt='' style={{ width: '35px' }} />
          )}
        </div>
        <div className={css.registerContainer}>
          <span>{data.register}</span>
        </div>
        <div className={css.categoryContainer}>
          <span>{catName[0].name}</span>
        </div>
        <div className={css.detailedAddress}>
          <span>{data.address}</span>
        </div>
        <div className={css.orderLimit}>
          <span>{data.minimum_order_amount} ₮</span>
        </div>
      </div>
    </>
  );
};

export default Supplier;
