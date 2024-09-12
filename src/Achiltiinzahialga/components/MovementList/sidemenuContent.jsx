import React from 'react';
import css from './sidemenuContent.module.css';
import { useEffect } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';
import { useState } from 'react';
import { replaceImageUrl } from '../../../utils';

const SidemenuContent = ({ sidemenuData, inventories }) => {
  const [products, setProducts] = useState([]);
  const [productsIdQty, setProductsIdQty] = useState([]);
  const [productsDetail, setProductsDetail] = useState([]);

  const getDetail = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL2}/api/shipment/get/final?_id=${sidemenuData._id}&products=true`;

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData?.data[0]?.products) {
        const productsIdQtyCopy = [];

        setProductsDetail(resData?.data[0]?.products);

        resData?.data[0]?.products.map(product => {
          productsIdQtyCopy.push({
            productId: product.productId,
            quantity: product.quantity
          });
        });
        console.log('productsIdQtyCopyproductsIdQtyCopy', productsIdQtyCopy);
        setProductsIdQty(productsIdQtyCopy);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const url = `${
        process.env.REACT_API_URL2
      }/products/get1?ids=[${productsIdQty.map(item => item.productId)}]`;

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      setProducts(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('productsIdQty', productsIdQty);

  const getProductQuantity = ({ id }) => {
    const product = productsIdQty.find(
      product => product.productId === Number(id)
    );
    return product ? product.quantity : 0;
  };

  useEffect(() => {
    if (sidemenuData) {
      getDetail();
    }
  }, [sidemenuData]);

  useEffect(() => {
    if (productsIdQty.length !== 0) {
      getProduct();
    }
  }, [productsIdQty]);

  const getInventoryName = ({ inventoryId }) => {
    if (!inventoryId) {
      return '';
    }
    const foundInventory = inventories.find(e => e._id === inventoryId);
    return foundInventory ? foundInventory.name : null;
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <span style={{ fontWeight: '700', fontSize: '30px' }}>Хөдөлгөөн</span>
        <div className={css.headerInfo}>
          <span>
            <strong>Үүссэн огноо: </strong>
            {sidemenuData.createdDate.slice(0, 10)}
          </span>
          <div className={css.warehousesInfo}>
            <div>
              <span>
                {getInventoryName({ inventoryId: sidemenuData?.from })}
              </span>
            </div>
            <img
              style={{ height: '40px' }}
              src='	/static/media/arrow-right.99b8a05c36a6a1040bc241e82526c995.svg'
              alt='arrow'
            />
            <div>
              <span>{getInventoryName({ inventoryId: sidemenuData.to })}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={css.productsList}>
        {productsIdQty.map(prdct => {
          return products.map(
            product =>
              prdct.productId === product._id && (
                <div
                  className={css.oneProduct}
                  key={product._id * Math.random()}
                >
                  <div className={css.productLeft}>
                    <img
                      src={
                        replaceImageUrl(product.image[0]) ||
                        `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
                      }
                      alt='asd'
                    />
                  </div>
                  <div className={css.productRight}>
                    <span>{product.name}</span>
                    <span>
                      SKU: {product?.sku} / Barcode: {product?.bar_code}
                    </span>
                    <span>{getProductQuantity({ id: product._id })} ш</span>
                  </div>
                </div>
              )
          );
        })}
      </div>
    </div>
  );
};

export default SidemenuContent;
