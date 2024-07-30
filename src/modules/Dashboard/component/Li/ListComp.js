import React, { useEffect, useState } from 'react';

import css from './listcomp.module.css';
import myHeaders from '../../../../components/MyHeader/myHeader';
const ListComp = props => {
  // console.log("props ", props);
  const [totalProd, setTotalProd] = useState([]);
  const [totalProdLength, setTotalProdLength] = useState('');
  const [totalWidth, setTotalWidth] = useState('');
  const [backColor, setBackColor] = useState('');
  const colorData = [
    { id: 27125, background: '#FFA600' },
    { id: 27126, background: '#90A4AE' },
    { id: 27140, background: '#84C6E8' },
    { id: 27129, background: '#8CD35D' },
    { id: 27130, background: '#C0D997' },
    { id: 27124, background: '#FFD976' },
    { id: 27137, background: '#FFD976' },
    { id: 27139, background: '#FFD976' },
    { id: 27127, background: '#FFD976' }
  ];

  useEffect(() => {
    let controller = new AbortController();
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/products/get1?category=${props.name.id}&page=all`,
      {
        method: 'GET',
        headers: myHeaders,
        signal: controller.signal
      }
    )
      .then(r => r.json())
      .then(res => {
        let tot = 0;
        res.data?.map(item => {
          tot = tot + 1;
        });
        setTotalProdLength(tot);
        setTotalProd(res.data);
        setTotalWidth(tot * 5);
        controller = null;
      })
      .catch(error => {
        console.log('error', error);
      });
    colorData.map(color => {
      // console.log("----", color[`${props.name.id}`].["background"]);
      // setBackColor(color[`${props.name.id}`]);
      if (color.id === props.name.id) {
        setBackColor(color.background);
      }
    });
    return () => controller?.abort();
  }, [props]);

  return (
    <li className={css.liwrapper}>
      <span className={css.name}>{props.name.name}</span>{' '}
      <div className={css.grap}>
        <div
          className={css.grapik}
          style={{
            borderRadius: '6px',
            width: `${totalWidth}px`
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

export default ListComp;
