import React from 'react';
import './productImg.css';
import Avatar from '../avatar/Avatar';
import { replaceImageUrl } from '../../../utils';

const ProductAvatar = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className='product-list'>
      {data.slice(0, 4).map((item, index) => {
        const imageUrl =
          item.image && item.image.length > 0
            ? replaceImageUrl(item.image[0])
            : '';

        return (
          <div key={index} className='product-item'>
            <Avatar
              imageUrl={index === 3 ? '' : imageUrl}
              name={index === 3 ? `+${data.length - 3}` : item.product_name}
              position={index === 3 ? 3 : 0}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductAvatar;
