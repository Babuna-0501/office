import { useEffect, useMemo, useState } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';
import { formatNumber } from './utils';
import editSvg from './edit.svg';
import trashSvg from './trash.svg';
import dangerSvg from './dangerCircle.svg';
import Incrementer from '../incrementer/Incrementer';
import EditInput from '../editInput/EditInput';
import AlertCustom from '../alertCustom/AlertCustom';
import AddProducts from './AddProducts';
import { productHeaders } from './utils';

const getReqOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const putReqOptions = { method: 'PUT', headers: myHeaders, redirect: 'follow' };

const reqUrl = `${process.env.REACT_APP_API_URL2}/api/orders/cart`;

function OrderTabContent({ products = [], orderId, supplierId }) {
  const [changedOrder, setChangedOrder] = useState({
    price: 0,
    quantity: 0,
    product_id: 0,
    show: false
  });

  const [showAlert, setShowAlert] = useState({
    message: '',
    type: '',
    show: false
  });

  const [allProducts, setAllProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const getAllProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${supplierId}&page=1&limit=50`,
      getReqOptions
    )
      .then(res => res.json())
      .catch(error => {
        console.log('error', error);
      });

    if (response.code === 200) {
      setAllProducts(response?.data);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [supplierId]);

  const columns = useMemo(() => productHeaders, []);
  const data = useMemo(() => allProducts, [allProducts]);

  // const addProduct = async item => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_API_URL2}/api/orderDetail/create`,
  //     {
  //       method: 'POST',
  //       headers: myHeaders,
  //       body: JSON.stringify({
  //         orderId: data.order_id,
  //         products: item.map(x => {
  //           return {
  //             product_id: x.productId,
  //             quantity: x.quantity == 0 ? 1 : x.quantity,
  //             price: x.price
  //           };
  //         })
  //       }),
  //       redirect: 'follow'
  //     }
  //   )
  //     .then(response => {
  //       return response.json();
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // };

  const updateProduct = async () => {
    const body = {
      price: changedOrder.price,
      quantity: changedOrder.quantity
    };

    const response = await fetch(`${reqUrl}/${orderId}`, {
      ...putReqOptions,
      body: JSON.stringify([{ product_id: changedOrder.product_id, ...body }])
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log('error', error);
      });

    if (response?.result) {
      const filteredProduct = products.findIndex(
        item => item && item.product_id === changedOrder.product_id
      );

      products[filteredProduct].price = changedOrder.price;
      products[filteredProduct].quantity = changedOrder.quantity;
      products[filteredProduct].total = Math.floor(
        changedOrder.quantity * changedOrder.price
      );

      setShowAlert({ message: response?.message, type: 'success', show: true });
    } else {
      setShowAlert({ message: response?.message, type: 'error', show: true });
    }

    setChangedOrder({
      ...changedOrder,
      product_id: 0,
      show: false
    });
  };

  const deleteProduct = async () => {
    const response = await fetch(`${reqUrl}/${orderId}`, {
      ...putReqOptions,
      body: JSON.stringify([
        { product_id: changedOrder.product_id, quantity: 0 }
      ])
    })
      .then(res => res.json())
      .catch(error => {
        console.log('error', error);
      });

    if (response.result) {
      const filteredProduct = products.findIndex(
        item => item && item.product_id === changedOrder.product_id
      );

      products.splice(filteredProduct, 1);

      setShowAlert({ message: response?.message, type: 'success', show: true });
    } else {
      setShowAlert({ message: response?.message, type: 'error', show: true });
    }

    setChangedOrder({
      ...changedOrder,
      product_id: 0,
      show: false
    });
  };

  const changeQuantity = value => {
    setChangedOrder({ ...changedOrder, quantity: value });
  };

  const changePrice = value => {
    setChangedOrder({ ...changedOrder, price: Number(value) });
  };

  const firstOrderTotal = (product, color) => {
    return (
      <div>
        {color && (
          <p className={`font-size10 ${color}`}>
            {color === 'color-red' ? 'Өөрчлөгдсөн захиалга' : 'Анхны захиалга'}
          </p>
        )}
        <div className='order-tab-product-item-info-price'>
          {changedOrder.show &&
          product.product_id === changedOrder.product_id ? (
            <EditInput value={changedOrder.price} onChange={changePrice} />
          ) : (
            <span className={`font-size14 ${color}`}>
              {formatNumber(product.price)}₮
            </span>
          )}

          <span className={`font-size14 ${color}`}>x</span>
          <span className={`font-size14 ${color}`}>
            {formatNumber(product.quantity)}
          </span>
          <span className={`font-size14 ${color}`}>=</span>
          <span className={`font-size14 ${color}`}>
            {formatNumber(product.total)}₮
          </span>
        </div>
      </div>
    );
  };

  if (showProducts) {
    return (
      <AddProducts
        onClose={() => setShowProducts(false)}
        data={data}
        columns={columns}
        setSelectedRows={setSelectedRows}
        addFunction={() => {
          setShowProducts(false);
          setChangedOrder({ ...changedOrder, show: true });
        }}
      />
    );
  }

  return (
    <div className='order-tab-content'>
      <button className='add_product' onClick={() => setShowProducts(true)}>
        Бүтээгдэхүүн нэмэх
      </button>

      <div className='order-tab-product-list'>
        {products.map((product, index) => {
          const checker =
            product.price === 'product.price' &&
            product.quantity === 'product.quantity';

          return (
            <div key={index} className='order-tab-product-item'>
              <div className='order-tab-product-item-section'>
                <div className='order-tab-product-item-image'>
                  <img src={product.image[0]} alt={index.toString()} />
                </div>

                {checker && (
                  <div className='edit-svg'>
                    <img src={dangerSvg} alt='danger' />
                  </div>
                )}
              </div>

              <div className='order-tab-product-item-info'>
                <p className='font-size14'>{product.name}</p>
                <p className='font-size12 color-gray'>
                  SKU: {product.sku} / Barcode {product.bar_code}
                </p>

                {checker ? (
                  <div className='display-flex'>
                    {firstOrderTotal(product, 'color-red')}
                    {firstOrderTotal(product, 'color-gray')}
                  </div>
                ) : (
                  firstOrderTotal(product)
                )}
              </div>

              {changedOrder.show &&
              product.product_id === changedOrder.product_id ? (
                <>
                  <Incrementer
                    value={changedOrder.quantity}
                    setValue={changeQuantity}
                  />
                  <div
                    className='edit-svg'
                    onClick={() =>
                      setShowAlert({
                        message: 'Та үүнийг устгахдаа итгэлтэй байна уу?',
                        type: 'approve',
                        show: true
                      })
                    }
                  >
                    <img src={trashSvg} alt='trash' />
                  </div>
                </>
              ) : (
                <div
                  className='edit-svg'
                  onClick={() =>
                    setChangedOrder({
                      ...changedOrder,
                      product_id: product.product_id,
                      price: product.price,
                      quantity: product.quantity,
                      show: true
                    })
                  }
                >
                  <img src={editSvg} alt='edit' />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAlert.show && (
        <AlertCustom
          isOpen={showAlert.show}
          onClose={() => setShowAlert({ ...showAlert, show: false })}
          message={showAlert.message}
          type={showAlert.type}
          onSubmit={deleteProduct}
        />
      )}

      {changedOrder.show && (
        <div className='bottom-buttons'>
          <button
            className='order_detail_button'
            onClick={() =>
              setChangedOrder({
                ...changedOrder,
                product_id: 0,
                show: false
              })
            }
          >
            Болих
          </button>
          <button className='order_detail_button' onClick={updateProduct}>
            Хадгалах
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderTabContent;
