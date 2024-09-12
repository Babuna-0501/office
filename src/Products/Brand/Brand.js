import React, { useContext } from 'react';
import css from './brand.module.css';
import settingIcon from '../../assets/Setting.svg';
import deleteIcon from '../../assets/delete_red_small.svg';
import ProductHook from '../../Hooks/ProductHook';
import { replaceImageUrl } from '../../utils';

const Brand = props => {
  const prdctx = useContext(ProductHook);

  const ProductHandler = () => {
    prdctx.setBrandFix(true);
    prdctx.setBrandID(props.item);
    prdctx.setBrandSlug(props.item.brand_code);
  };
  return (
    <div className={css.container}>
      <div className={css.first}>
        <div className={css.imageContainer}>
          <img src={replaceImageUrl(props.item.image)} />
        </div>
        <span>{props.item.name}</span>
      </div>
      <div className={css.second}>
        <img src={settingIcon} onClick={ProductHandler} />
        <img src={deleteIcon} />
      </div>
    </div>
  );
};

export default Brand;
