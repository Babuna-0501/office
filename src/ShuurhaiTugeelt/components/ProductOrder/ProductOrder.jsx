import React, { useContext } from 'react';
import ShuurkhaiHook from '../../../Hooks/ShuurkhaiHook';
import css from './productorder.module.css';
import closeIcon from '../../../assets/close.svg';
import { ArrowRight } from '../../../assets/icons';

const ProductOrder = () => {
  const shuurkhaiCtx = useContext(ShuurkhaiHook);
  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <span className={css.headerTxt}>Захиалгын дугаар: R121545</span>
        <div
          className={css.closeBtn}
          onClick={() => shuurkhaiCtx.setPrdctOrder(false)}
          style={{ cursor: 'pointer' }}
        >
          <img src={closeIcon} alt='closeBtn' />
        </div>
      </div>
      <div className={css.topContainer}>
        <div className={css.infoContainer}>
          <div className={css.infoSupp}>
            <div className={css.suppImg}>
              <img
                src='https://media.ebazaar.link/logo/supplier/gem-international.jpg'
                alt='logo'
              />
            </div>
            <div className={css.suppTxts}>
              <span className={css.suppHeader}>Нийлүүлэгч</span>
              <span className={css.suppName}>GEM International LLC</span>
            </div>
          </div>
          <div className={css.infoArrow}>
            <ArrowRight width={'35px'} height={'25px'} />
          </div>
          <div className={css.infoSupp}>
            <div className={css.suppImg}>
              <img
                src={`${process.env.REACT_APP_MEDIA_URL}/product/6451839791366876118714579441202301180039211652005125652064228302797616.jpg`}
                alt='logo'
              />
            </div>
            <div className={css.suppTxts}>
              <span className={css.suppHeader}>Агуулах</span>
              <span className={css.suppName}>Шуурхай түгээлт</span>
            </div>
          </div>
        </div>
        <div className={css.orderDate}>
          <div className={css.dateLeft}>
            <div className={css}>
              <span>Захиалсан:</span>
              <span>2023/09/25</span>
            </div>
            <div className={css}>
              <span>Хүргүүлсэн өдөр:</span>
              <span></span>
            </div>
          </div>
          <div className={css.dateRight}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrder;
