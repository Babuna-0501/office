import { replaceImageUrl } from '../../../utils';
import { Checkbox } from '../common';
import css from './singleInventoryProduct.module.css';

import { useEffect, useState } from 'react';

const SingleInventoryProduct = props => {
  const { zIndex, product, categories, checked, checkHandler } = props;
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    if (categories.length === 0) return;

    setCurrentCategory(categories.find(cat => cat.id === product.category_id));
  }, [product, categories]);

  return (
    <div
      className={`${css.singleInventoryProductContainer} ${
        checked && css.checked
      }`}
      style={{ zIndex }}
    >
      <div className={css.singleInventoryProductWrapper}>
        {/* Checkbox */}
        <div
          className={css.fieldWrapper}
          style={{
            width: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Checkbox checked={checked} onChange={checkHandler} />
        </div>

        {/* Picture */}
        <div
          className={css.fieldWrapper}
          style={{
            width: 78,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className={css.productImageWrapper}>
            <img src={replaceImageUrl(product.image[0])} alt={product.name} />
          </div>
        </div>

        {/* Product Name */}
        <div className={css.fieldWrapper} style={{ width: 200 }}>
          <span className={css.text}>{product.name}</span>
        </div>

        {/* Category */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.text}>
            {currentCategory ? currentCategory.name : 'Ангилалгүй'}
          </span>
        </div>

        {/* Remaining */}
        <div className={css.fieldWrapper} style={{ width: 90 }}>
          <span className={css.text}>{product.myStock.toLocaleString()}ш</span>
        </div>

        {/* Barcode */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.text}>{product.bar_code}</span>
        </div>

        {/* SKU */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.text}>{product.sku}</span>
        </div>

        {/* Price */}
        <div className={css.fieldWrapper} style={{ width: 90 }}>
          <span className={css.text}>
            {product.locations?.[
              '62f4aabe45a4e22552a3969f'
            ]?.price?.channel?.[1].toLocaleString()}
            ₮
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleInventoryProduct;
