import { useMemo } from 'react';
import css from './millhouseLines.module.css';
import { replaceImageUrl } from '../../utils';

export const MillhouseLines = ({ order }) => {
  console.log('ORDER: ', order);
  const products = useMemo(() => {
    const result = {
      millhouse: {
        products: [],
        total: 0,
        title: 'Милл Хаус ХХК'
      },
      ng: {
        products: [],
        total: 0,
        title: 'Нүүдэл Жи ХХК'
      }
    };

    for (const product of order.line) {
      if (product.vendor && product.vendor === 14033 && product.quantity > 0) {
        result.ng.products.push(product);
        result.ng.total += product.price * product.quantity;
      }

      if (product.vendor && product.vendor === 948 && product.quantity > 0) {
        result.millhouse.products.push(product);
        result.millhouse.total += product.price * product.quantity;
      }
    }

    return result;
  }, [order]);

  return (
    <div>
      {Object.keys(products).map((key, index) => {
        return (
          <>
            {products[key].products.length > 0 ? (
              <div style={{ marginBottom: index === 0 ? 30 : 0 }} key={index}>
                <h1 className={css.title}>{products[key].title}</h1>
                {products[key].products.map((product, prodIndex) => {
                  const totalAmount = product.price * product.quantity;
                  const imageUrl = product.product_image
                    ? product.product_image
                        .split(',')[0]
                        .replace('original', 'small')
                    : '';

                  return (
                    <div
                      key={`product-${index}-${prodIndex}`}
                      className={css.container}
                    >
                      <div className={css.firstWrapper}>
                        <div className={css.imageContainer}>
                          <img
                            src={replaceImageUrl(imageUrl)}
                            alt={product.product_name}
                          />
                        </div>

                        <div className={css.detailWrapper}>
                          <h3
                            className={css.hd3}
                            style={{ fontWeight: 300, margin: '0' }}
                          >
                            {product.product_name}
                          </h3>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <span
                              style={{
                                color: '#90A4AE',
                                fontSize: '14px',
                                fontWeight: 700
                              }}
                            >
                              {product.price.toLocaleString()}₮
                            </span>
                            <span
                              style={{
                                color: '#FFA400',
                                fontSize: '12px',
                                fontWeight: 700,
                                marginLeft: '5px'
                              }}
                            >
                              {' '}
                              x {product.quantity}
                            </span>
                            <span
                              style={{
                                color: '#263238',
                                fontSize: '14px',
                                fontWeight: 700,
                                marginLeft: '5px'
                              }}
                            >
                              {' '}
                              {totalAmount.toLocaleString()}₮
                            </span>
                          </div>
                          <div className={css.barcodeContainer}>
                            {product.product_sku ? (
                              <span
                                style={{
                                  fontWeight: 300,
                                  fontSize: '14px',
                                  color: '#37474f'
                                }}
                              >
                                Бүтээгдэхүүн sku : {product.product_sku}
                              </span>
                            ) : null}

                            {product.product_bar_code ? (
                              <span
                                style={{
                                  fontWeight: 300,
                                  fontSize: '14px',
                                  color: '#37474f'
                                }}
                              >
                                {' '}
                                Barcode : {product.product_bar_code}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <p className={css.total}>
                  Нийт: {products[key].total.toLocaleString()}₮
                </p>
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};
