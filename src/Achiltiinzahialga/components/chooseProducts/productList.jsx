import React, { useEffect, useState } from 'react';
import css from './productList.module.css';

const ProductList = props => {
  const {
    truncater,
    checkedProducts,
    setCheckedProducts,
    productData,
    setProductdata,
    fromAguulah
  } = props;

  function findProductByIndex(array, index) {
    if (index >= 0 && index < array.length) {
      return array[index];
    }
    return null; // Return null if the index is out of bounds
  }

  const removeProduct = ({ nonDuplicatable, _id }) => {
    const updatedCheckedProducts = checkedProducts.filter(
      product =>
        product.nonDuplicatable !== nonDuplicatable || product._id !== _id
    );
    setCheckedProducts(updatedCheckedProducts);

    const updatedProductsData = productData.filter(
      product =>
        product.nonDuplicatable !== nonDuplicatable || product.productId !== _id
    );
    setProductdata(updatedProductsData);
  };

  const productInputHandler = ({ e, productId, idx, nonDuplicatable }) => {
    const name = e.target.name;
    const value = e.target.value;
    // Create a copy of the existing productData array
    const updatedProductData = [...productData];

    // Find the product by index
    const productAtIndex = findProductByIndex(updatedProductData, idx);

    if (productAtIndex) {
      // If the product exists, update its property
      if (
        name === 'quantity' ||
        name === 'buyPrice' ||
        name === 'sellPrice' ||
        name === 'discount'
      ) {
        productAtIndex[name] = Number(value);
        productAtIndex['nonDuplicatable'] = nonDuplicatable;
      } else {
        productAtIndex[name] = value;
        productAtIndex['nonDuplicatable'] = nonDuplicatable;
      }
    } else {
      // If the product doesn't exist, create a new object and push it to the array
      let newProduct;

      if (
        name === 'quantity' ||
        name === 'buyPrice' ||
        name === 'sellPrice' ||
        name === 'discount'
      ) {
        newProduct = {
          productId: productId,
          [name]: Number(value)
        };
      } else {
        newProduct = {
          productId: productId,
          [name]: value
        };
      }

      updatedProductData.push(newProduct);
    }

    // Update the state with the modified array
    setProductdata(updatedProductData);
  };

  useEffect(() => {
    console.log(productData);
  }, [productData]);
  console.log('checkedProducts', checkedProducts);

  return (
    <div className={css.products}>
      {checkedProducts
        .sort((a, b) => a._id - b._id)
        .map((checkedProduct, idx) => {
          const timestamp = new Date().getTime().toString(36);
          const random = Math.random().toString(36).substring(2, 8);
          const nonDuplicatable = `${timestamp}${random}`;
          let buyPrice = 0;
          let sellPrice = 0;
          let quantity = 0;
          let discount = 0;
          let expireDate = null;
          let manufacturedDate = null;
          let seriesNumber = '';
          productData
            .sort((a, b) => a.productId - b.productId)
            .map(product => {
              if (
                checkedProduct._id === product.productId &&
                product.nonDuplicatable == checkedProduct.nonDuplicatable
              ) {
                buyPrice = product?.buyPrice || 0;
                sellPrice = product?.sellPrice || 0;
                quantity = product?.quantity || 0;
                discount = product?.discount || 0;
                seriesNumber = product?.seriesNumber || '';
                expireDate = product?.expireDate || null;
                manufacturedDate = product?.manufacturedDate || null;
              }
            });
          let total = buyPrice * quantity;
          let discountAmount = total * (discount / 100);
          let afterDiscount = total - discountAmount;

          return (
            <div
              className={css.oneProduct}
              key={checkedProduct.nonDuplicatable + checkedProduct._id}
            >
              <div className={css.oneField} style={{ width: '80px' }}>
                <span>{checkedProduct.bar_code}</span>
              </div>
              <div className={css.oneField}>
                <span>{truncater(checkedProduct.name, 40)}</span>
              </div>
              <div className={css.oneField}>
                <span>{checkedProduct.sku}</span>
              </div>
              <div
                className={css.oneField}
                style={{ width: '70px', justifyContent: 'center' }}
              >
                <div className={css.imgWrapper}>
                  <img
                    src={
                      checkedProduct.image[0] ||
                      `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
                    }
                    alt='cola'
                  />
                </div>
              </div>
              <div className={css.oneField}>
                <span>{fromAguulah ? checkedProduct.stock : ''}</span>
              </div>
              <div className={css.oneField} style={{ width: '70px' }}>
                <input
                  type='text'
                  placeholder='татах тоо'
                  name='quantity'
                  required
                  onChange={e => {
                    productInputHandler({
                      productId: checkedProduct._id,
                      e,
                      idx,
                      nonDuplicatable: checkedProduct.nonDuplicatable
                    });
                  }}
                />
              </div>
              <div className={css.oneField}>
                <input
                  type='text'
                  placeholder='Ширхэгийн үнэ'
                  name='buyPrice'
                  value={buyPrice}
                  onChange={e => {
                    productInputHandler({
                      productId: checkedProduct._id,
                      e,
                      idx,
                      nonDuplicatable: checkedProduct.nonDuplicatable
                    });
                  }}
                />
              </div>
              <div className={css.oneField}>
                <input
                  type='text'
                  placeholder='Зарах үнэ'
                  name='sellPrice'
                  value={sellPrice}
                  onChange={e => {
                    productInputHandler({
                      productId: checkedProduct._id,
                      e,
                      idx,
                      nonDuplicatable: checkedProduct.nonDuplicatable
                    });
                  }}
                />
              </div>
              <div className={css.oneField}>
                <input
                  type='number'
                  placeholder='Дүн'
                  name='total'
                  disabled
                  value={total}
                  onChange={e => {
                    productInputHandler({
                      productId: checkedProduct._id,
                      e,
                      idx,
                      nonDuplicatable: checkedProduct.nonDuplicatable
                    });
                  }}
                />
              </div>
              <div className={css.oneField}>
                <input
                  type='text'
                  placeholder='Хямдрал %'
                  name='discount'
                  value={discount}
                  onChange={e => {
                    productInputHandler({
                      productId: checkedProduct._id,
                      e,
                      idx,
                      nonDuplicatable: checkedProduct.nonDuplicatable
                    });
                  }}
                />
              </div>
              <div className={css.oneField}>
                <input
                  type='number'
                  placeholder='Хямдарсан дүн'
                  disabled
                  value={discountAmount}
                />
              </div>
              <div className={css.oneField}>
                <input
                  type='number'
                  placeholder='Төлөх дүн'
                  disabled
                  value={afterDiscount}
                />
              </div>

              <div className={css.oneField} style={{ padding: '0px 10px' }}>
                <input
                  type='date'
                  name='manufacturedDate'
                  onChange={e => {
                    productInputHandler({
                      productId: checkedProduct._id,
                      e,
                      idx,
                      nonDuplicatable: checkedProduct.nonDuplicatable
                    });
                  }}
                />
              </div>
              <div className={css.oneField} style={{ padding: '0px 10px' }}>
                <input
                  type='date'
                  name='expireDate'
                  onChange={e => {
                    productInputHandler({
                      productId: checkedProduct._id,
                      e,
                      idx,
                      nonDuplicatable: checkedProduct.nonDuplicatable
                    });
                  }}
                />
              </div>
              <div className={css.oneField} style={{ width: '100px' }}>
                <input
                  type='text'
                  name='seriesNumber'
                  placeholder='seriesNumber'
                  value={seriesNumber}
                  onChange={e => {
                    productInputHandler({
                      productId: checkedProduct._id,
                      e,
                      idx,
                      nonDuplicatable: checkedProduct.nonDuplicatable
                    });
                  }}
                />
              </div>
              <div className={css.buttonWrapper}>
                <button
                  onClick={() => {
                    setCheckedProducts([
                      ...checkedProducts,
                      {
                        ...checkedProduct,
                        nonDuplicatable
                      }
                    ]);
                    setProductdata([
                      ...productData,
                      {
                        productId: checkedProduct._id,
                        nonDuplicatable
                      }
                    ]);
                  }}
                >
                  +
                </button>
                <button
                  onClick={() =>
                    removeProduct({
                      nonDuplicatable: checkedProduct.nonDuplicatable,
                      _id: checkedProduct._id
                    })
                  }
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductList;
