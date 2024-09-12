import css from './style.module.css';
import { useState, useContext } from 'react';
import { ModuleContext } from './index';

const Warehouses = props => {
  const data = props.data;
  const context = useContext(ModuleContext);
  return (
    <div
      className={css.warehouse}
      onClick={() => context.setActiveWarehouse(data)}
    >
      <div className={css.top}>
        <div className='warehouse-img'>
          <img src='/images/warehouse.svg' />
        </div>
        <p className='warehouse-name'>{data.name}</p>
      </div>
      <div className='bottom'></div>
    </div>
  );
};

export default Warehouses;
