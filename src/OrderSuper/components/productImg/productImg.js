import React, { useState, useEffect } from 'react';
import './productImg.css';
import { replaceImageUrl } from '../../../utils';

const ProductAvatar = props => {
  const [avatar, setAvatar] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    // console.log("Zurag irj bnuuu?", props.data);
    if (props?.data) {
      setAvatar(props.data);
      let aa = props.data?.line?.length ?? 0;
      setTotal(aa);
    }
  }, [props]);

  let images = avatar.line?.slice(0, 3).map((l, index) => {
    if (l.product_image) {
      let image =
        l.product_image.split(',').length === 0
          ? replaceImageUrl(l.product_image)
          : replaceImageUrl(l.product_image.split(',')[0]);
      return (
        <li className='avatars__item' key={index}>
          <img
            src={replaceImageUrl(image.replace('original', 'small'))}
            alt='product'
            className='avatars__img'
          />
        </li>
      );
    } else {
      return null;
    }
  });

  let additionalImage = null;
  if (avatar.line?.length > 3 && avatar.line[3]?.product_image) {
    let image = replaceImageUrl(
      avatar.line[3].product_image.replace('original', 'small')
    );
    additionalImage = (
      <li className='avatars__itemBack' key={3}>
        <span className='avatars__others'>+{total - 3}</span>
        <img src={image} alt='product' className='avatars__imgBack' />
      </li>
    );
  }

  return (
    <ul className='avatars'>
      {images}
      {additionalImage}
    </ul>
  );
};

export default ProductAvatar;
