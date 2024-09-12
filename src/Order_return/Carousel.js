import React, { useState, useEffect } from 'react';
import css from './carousel.module.css';
import arrowleft from '../assets/Arrow - Left.svg';
import arrowRight from '../assets/Arrow - Right.svg';
import { replaceImageUrl } from '../utils';

const Carousel = ({ pos, idx, activeIdx }) => {
  //   const item = createItem(pos, idx, activeIdx);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  const RIGHT = '-1';
  const LEFT = '+1';

  useEffect(() => {
    let data = [];
    if (pos.images) {
      pos.images.map(item => {
        data.push(item);
      });
    }
    setImages(data);
  }, [pos]);
  const onSwiped = direction => {
    const change = direction === RIGHT ? RIGHT : LEFT;
    const adjustedIdx = index + Number(change);
    let newIdx;
    if (adjustedIdx >= images.length) {
      newIdx = 0;
    } else if (adjustedIdx < 0) {
      newIdx = images.length - 1;
    } else {
      newIdx = adjustedIdx;
    }
    setIndex(newIdx);
  };

  return (
    <li className={css.reason}>
      <div className={css.headerss}>
        <h4>Барааны дугаар : {pos.product_id}</h4>
        <p>Шалтгаан : {pos.comment ? pos.comment : 'шалтгаан бичигдээгүй'}</p>
      </div>
      <div className={css.imagewrapper}>
        {pos.images && (
          <img
            src={replaceImageUrl(images[index])}
            alt='product image'
            className={css.zurag}
          />
        )}
        <img
          src={arrowleft}
          alt='right'
          className={css.lefticon}
          onClick={() => onSwiped(LEFT)}
        />
        <img
          src={arrowRight}
          alt='left'
          className={css.righticon}
          onClick={() => onSwiped(RIGHT)}
        />
      </div>
    </li>
  );
};

export default Carousel;
