import React, { useEffect, useState, useContext } from 'react';
import css from './product.module.css';
import myHeaders from '../../../components/MyHeader/myHeader';
import checkbox from '../../../assets/Tick Square.svg';
import checked from '../../../assets/Tick Square_green.svg';
import ShuurkhaiHook from '../../../Hooks/ShuurkhaiHook';
import { replaceImageUrl } from '../../../utils';

const Product = props => {
  const shuurkhaCtx = useContext(ShuurkhaiHook);
  const [product, setProduct] = useState(props?.data);
  const [isCheck, setIsCheck] = useState(false);
  const [showTrue, setShowTrue] = useState(true);
  const [isActive, setIsActive] = useState(
    product.locations['62f4aabe45a4e22552a3969f'].is_active.channel[1] === 1
      ? true
      : false
  );
  const [supplierName, setSupplierName] = useState('');
  const [supplierImage, setSupplierImage] = useState('');
  const [catName, setCatName] = useState(
    shuurkhaCtx.productGroup?.filter(
      item => item.id === product.supplierProductGroup
    )
  );

  // console.log("TEST", catName);

  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${product.vendor}`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        // console.log(res.data);
        setSupplierName(res?.data[0]?.name);
        setSupplierImage(res?.data[0]?.media);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  let color =
    product.stock === 0 || product.stock < 0
      ? '#ffa39e'
      : product.stock < product.proper_stock * 1.3
      ? '#ffe58f'
      : '#fff';

  return (
    <>
      <div className={css.itemContainer} style={{ backgroundColor: color }}>
        <div className={css.idContainer}>
          <div className={css.check} onClick={() => setIsCheck(!isCheck)}>
            {isCheck ? <img src={checked} /> : <img src={checkbox} />}
          </div>
          <div className={css.id}>
            <span>{product._id}</span>
          </div>
        </div>
        <div className={css.showBtn} onClick={() => setShowTrue(!showTrue)}>
          {showTrue === isActive ? (
            <img src='/media/on.svg' alt='' style={{ width: '35px' }} />
          ) : (
            <img src='/media/off.svg' alt='' style={{ width: '35px' }} />
          )}
        </div>
        <div className={css.suppName}>
          <img
            src={
              supplierImage === undefined || supplierImage === ''
                ? `${process.env.REACT_APP_MEDIA_URL}/small/6451839791366876118714579441202301180039211652005125652064228302797616.jpg`
                : supplierImage
            }
            alt=''
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              objectFit: 'contain'
            }}
          />
          <span>
            {supplierName === undefined || supplierName === ''
              ? 'Шуурхай түгээлт'
              : supplierName}
          </span>
        </div>
        <div className={css.image}>
          <img
            src={replaceImageUrl(product.image[0])}
            alt='product'
            style={{ width: '70px ', height: '36px', objectFit: 'contain' }}
          />
        </div>
        <div className={css.name}>
          <span>{product.name}</span>
        </div>
        <div className={css.category}>
          <span>{catName[0]?.name} </span>
        </div>
        <div className={css.desc}>
          <span>{product.description}</span>
        </div>
        <div className={css.stock}>
          <span
            style={
              product.stock === 0 || product.stock < 0
                ? { backgroundColor: 'red', color: 'white' }
                : product.stock < product.proper_stock * 1.3
                ? { backgroundColor: 'yellow' }
                : null
            }
          >
            {product.stock}ш
          </span>
        </div>
        <div className={css.date}>
          <span>{product.created_date.slice(0, 10)}</span>
        </div>
        <div className={css.barcode}>
          <span>{product.bar_code}</span>
        </div>
        <div className={css.sku}>
          <span>{product.sku}</span>
        </div>
        <div className={css.price}>
          <span>
            {product.locations['62f4aabe45a4e22552a3969f'].price.channel[1]} ₮
          </span>
        </div>
        <div className={css.proper}>
          <span>
            {product.proper_stock === 0 || product.proper_stock === undefined
              ? '0ш'
              : `${product.proper_stock}ш`}
          </span>
        </div>
        <div className={css.safe}>
          <span>
            {product.safe_stock === 0 ||
            product.safe_stock === null ||
            product.safe_stock === undefined
              ? '0ш'
              : `${product.safe_stock}ш`}
          </span>
        </div>
        <div className={css.minOrder}>
          <span>0</span>
        </div>
        <div className={css.suppMin}>
          <span>0</span>
        </div>
        <div className={css.pickpack}>
          <span>button</span>
        </div>
        <div
          className={css.order}
          onClick={() => shuurkhaCtx.setPrdctOrder(true)}
        >
          <span>Захиалах</span>
        </div>
      </div>
    </>
  );
};

export default Product;
