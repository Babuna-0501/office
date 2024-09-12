import React, { useEffect, useContext, useState } from 'react';
import css from './categories.module.css';
import ProductReportHook from '../../Hooks/ProductsReportHook';

const Categories = () => {
  const [data, setData] = useState([]);

  const prodctx = useContext(ProductReportHook);

  return (
    <div
      style={{
        width: '100%'
      }}
    >
      {prodctx.allCat &&
        prodctx.allCat.map((item, index) => {
          return (
            <div key={item.id} className={css.wrapper}>
              <span>{item.name}</span>
              {/* <input /> */}

              <img
                src={item.chosed ? '/media/on.svg' : '/media/off.svg'}
                alt='open hidden button'
                onClick={() => {
                  console.log('clicked');
                  let aa = [...prodctx.allCat];
                  aa.find(x => x.id === item.id).chosed = !item.chosed;
                  prodctx.setAllCat(aa);
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Categories;
