import { useEffect, useState } from 'react';
import myHeaders from '../../../../components/MyHeader/myHeader';
import editSvg from '../edit.svg';
import trashSvg from '../trash.svg';
import dangerSvg from '../dangerCircle.svg';
import Incrementer from '../../incrementer/Incrementer';
import AlertCustom from '../../alertCustom/AlertCustom';
import AddProducts from './AddProducts';
import { replaceImageUrl } from '../../../../utils';
import CalculatePrice from './CalculatePrice';
import CancelReasons from './CancelReasons';
import UpdateOrderStatus from './UpdateOrderStatus';

const putReqOptions = { method: 'PUT', headers: myHeaders, redirect: 'follow' };

const postReqOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};

const reqUrl = `${process.env.REACT_APP_API_URL2}/api/orders/cart`;

function OrderTabContent({ products = [], orderId, supplierId, order }) {
  const [showProducts, setShowProducts] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [cancelReasons, setCancelReasons] = useState([]);
  const [cancelReason, setCancelReason] = useState({});
  const [filterLoading, setFilterLoading] = useState(false);
  const [changedOrder, setChangedOrder] = useState({
    price: 0,
    quantity: 0,
    product_id: 0,
    show: false
  });

  const [showAlert, setShowAlert] = useState({
    message: '',
    type: '',
    show: false,
    submitType: ''
  });

  const updateProduct = async () => {
    let total = 0;

    const body = {
      price: changedOrder.price,
      quantity: changedOrder.quantity
    };

    const response = await fetch(`${reqUrl}/${orderId}`, {
      ...putReqOptions,
      body: JSON.stringify([{ product_id: changedOrder.product_id, ...body }])
    })
      .then(res => res.json())
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

    products.map(product => (total += product.total));
    order.grand_total = total;

    setChangedOrder({
      ...changedOrder,
      product_id: 0,
      show: false
    });
  };

  const deleteProduct = async () => {
    let total = 0;

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

      products.map(product => (total += product.total));
      order.grand_total = total;
    } else {
      setShowAlert({ message: response?.message, type: 'error', show: true });
    }

    setChangedOrder({
      ...changedOrder,
      product_id: 0,
      show: false
    });
  };

  const addProduct = async () => {
    let type = '';

    const addProducts = selectedRows.map(item => {
      return {
        product_id: item._id,
        quantity: item.quantity,
        price: 10
      };
    });

    const response = await fetch(`${reqUrl}/${orderId}`, {
      ...putReqOptions,
      body: JSON.stringify(addProducts)
    }).then(res => res.json());

    if (response.result) {
      products = products.push(...selectedRows);

      selectedRows.map(item => (order.grand_total += item.total));

      type = 'success';
    } else {
      type = 'error';
    }

    setShowAlert({
      ...showAlert,
      show: true,
      message: response.message,
      type: type
    });

    setShowProducts(false);

    setChangedOrder({ ...changedOrder, show: false });
  };

  const changeQuantity = value => {
    setChangedOrder({ ...changedOrder, quantity: value });
  };

  const changePrice = value => {
    setChangedOrder({ ...changedOrder, price: Number(value) });
  };

  const changeReason = value => {
    setCancelReason(value);
  };

  const getCancelReason = async () => {
    setShowAlert({
      type: 'approve',
      message:
        'Та энэ захиалгыг цуцлахдаа итгэлтэй байна уу? Та ягаад цуцалж байгаа вэ?',
      show: true,
      submitType: 'cancel'
    });

    const response = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/order/cancelreason`,
      {
        method: 'GET',
        headers: myHeaders
      }
    )
      .then(res => res.json())
      .catch(error => {
        console.log('error', error);
      });

    if (response?.code === 200) {
      setCancelReasons(response?.data);
    }
  };

  const updateOrderStatus = async statusCode => {
    const requestOptions = {
      ...postReqOptions,
      body: JSON.stringify({
        order_id: orderId,
        order_status: statusCode,
        cancel_reason: Number(cancelReason)
      })
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/order/status`,
      requestOptions
    )
      .then(res => res.json())
      .catch(error => console.log('error', error));

    if (response?.code === 200) {
      order.status = statusCode;
    }

    setShowAlert({
      type: response?.code === 200 ? 'success' : 'error',
      message: response.message,
      show: true,
      submitType: ''
    });
  };

  useEffect(() => {
    setChangedOrder({ price: 0, quantity: 0, product_id: 0, show: false });
    setShowProducts(false);
  }, [supplierId]);

  if (showProducts) {
    return (
      <AddProducts
        onClose={() => setShowProducts(false)}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        filterLoading={filterLoading}
        setFilterLoading={setFilterLoading}
        supplierId={supplierId}
        addFunction={addProduct}
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
                  <img
                    src={replaceImageUrl(product.image[0])}
                    alt={index.toString()}
                  />
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
                    <CalculatePrice
                      product={product}
                      color='color-red'
                      changePrice={changePrice}
                      changedOrder={changedOrder}
                    />
                    <CalculatePrice
                      product={product}
                      color='color-gray'
                      changePrice={changePrice}
                      changedOrder={changedOrder}
                    />
                  </div>
                ) : (
                  <CalculatePrice
                    product={product}
                    changePrice={changePrice}
                    changedOrder={changedOrder}
                  />
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
                        show: true,
                        submitType: 'delete'
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
          onClose={() =>
            setShowAlert({ type: '', message: '', show: false, submitType: '' })
          }
          message={showAlert.message}
          type={showAlert.type}
          onSubmit={
            showAlert.submitType === 'delete'
              ? deleteProduct
              : showAlert.submitType === 'cancel'
              ? () => updateOrderStatus(5)
              : ''
          }
          content={
            showAlert.submitType === 'cancel' && (
              <CancelReasons reasons={cancelReasons} onChange={changeReason} />
            )
          }
        />
      )}

      {changedOrder.show ? (
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
      ) : (
        <UpdateOrderStatus
          orderStatus={order.status}
          cancelFunction={getCancelReason}
          submitFunction={updateOrderStatus}
        />
      )}
    </div>
  );
}

export default OrderTabContent;
