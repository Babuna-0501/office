import React, { useEffect, useState } from 'react';

import css from './listcomp.module.css';
import myHeaders from '../../../components/MyHeader/myHeader';
const ListCompBrands = props => {
  const [totalProd, setTotalProd] = useState([]);
  const [totalProdLength, setTotalProdLength] = useState('');
  const [totalWidth, setTotalWidth] = useState('');
  const [backColor, setBackColor] = useState('');
  const colorData = [
    { id: 3362, background: '#FFA600' },
    { id: 3361, background: '#90A4AE' },
    { id: 3360, background: '#84C6E8' },
    { id: 3359, background: '#8CD35D' },
    { id: 3358, background: '#C0D997' },
    { id: 3357, background: '#FFD976' },
    { id: 3356, background: '#FFD976' },
    { id: 3355, background: '#FFD976' },
    { id: 3354, background: '#FFD976' }
  ];

  useEffect(() => {
    let controller = new AbortController();
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/products/get1?brand=${props.name.BrandID}&page=all`,
      {
        method: 'GET',
        headers: myHeaders,
        signal: controller.signal
      }
    )
      .then(r => r.json())
      .then(res => {
        let tot = 0;
        res.data.map(item => {
          tot = tot + 1;
        });
        setTotalProdLength(tot);
        setTotalProd(res.data);
        setTotalWidth(tot * 10);
        controller = null;
      })
      .catch(error => {
        console.log('error', error);
      });
    colorData.map(color => {
      if (color.id === props.name.BrandID) {
        setBackColor(color.background);
      }
    });
    return () => controller?.abort();
  }, [props]);

  return (
    <li className={css.liwrapper}>
      <span className={css.name} style={{ width: '100px' }}>
        {props.name.BrandName}
      </span>{' '}
      <div className={css.grap}>
        <div
          className={css.grapik}
          style={{
            borderRadius: '6px',
            // width: `${totalWidth > 245 ? 245 : totalWidth}px`,
            width: `${totalWidth > 240 ? 260 : totalWidth}px`
          }}
          data-percentage={totalWidth}
        >
          <span
            style={{
              border: `0px solid ${backColor}`,
              height: '20px',
              borderRadius: '4px',
              background: backColor,
              overflow: 'hidden',
              width: '100%'
            }}
          ></span>
        </div>
        <span className={css.spanwrapper}>{totalProdLength}ш</span>
      </div>
    </li>
  );
};

export default ListCompBrands;
