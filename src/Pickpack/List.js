import { useContext, useState } from 'react';
import css from './list.module.css';
import { useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
import { Button, Drawer, LoadingSpinner } from '../components/common';
import closeIcon from '../assets/shipment/closeIcon.svg';
import { HeaderContext } from '../Hooks/HeaderHook';
import InfiniteScroll from 'react-infinite-scroll-component';

export const List = () => {
  const [pickpackOrders, setPickpackOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const { setShowRefreshBtn } = useContext(HeaderContext);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setShowRefreshBtn(true);

    return () => {
      setShowRefreshBtn(false);
    };
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (currentPage === 1) {
          setLoading(true);
        }

        const url = `${process.env.REACT_APP_API_URL2}/api/inventory/list/get?page=${currentPage}&limit=50`;
        const requestOptions = {
          method: 'GET',
          headers: myHeaders
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        let productIds = [];

        for (const order of resData) {
          for (const product of order.line) {
            productIds.push(product.product_id);
          }
        }

        productIds = [...new Set(productIds)];

        const productUrl = `${process.env.REACT_APP_API_URL2}/api/products/get1?page=all&suppliers=13884`;

        const productRes = await fetch(productUrl, requestOptions);
        const productData = await productRes.json();

        setProducts(prev => [...prev, ...productData.data]);
        setPickpackOrders(prev => [...prev, ...resData]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [currentPage]);

  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <div className={css.singleHeaderItem} style={{ width: 150 }}>
          <span className={css.headerText}>Захиалгын дугаар</span>
        </div>

        <div className={css.singleHeaderItem} style={{ width: 200 }}>
          <span className={css.headerText}>Бүтээгдэхүүн</span>
        </div>

        <div className={css.singleHeaderItem} style={{ width: 100 }}>
          <span className={css.headerText}>Огноо</span>
        </div>

        <div className={css.singleHeaderItem} style={{ width: 120 }}>
          <span className={css.headerText}>Төлөв</span>
        </div>

        <div className={css.singleHeaderItem} style={{ width: 90 }}>
          <span className={css.headerText}>Татах</span>
        </div>

        <div className={css.pageInfo}>
          <span className={css.text}>Хуудас: {currentPage}</span>
        </div>
      </div>

      {!loading && (
        <div className={css.content} id='scrollDiv'>
          <InfiniteScroll
            scrollableTarget='scrollDiv'
            dataLength={pickpackOrders.length}
            hasMore={true}
            next={() => {
              setCurrentPage(prev => prev + 1);
            }}
            loader={<h4 className={css.loadingScroll}>Уншиж байна...</h4>}
          >
            {pickpackOrders.map(order => {
              return (
                <SingleOrder
                  key={`pickpack-order-list-single-${order._id}`}
                  order={order}
                  products={products}
                  setPickpackOrders={setPickpackOrders}
                />
              );
            })}
          </InfiniteScroll>
        </div>
      )}

      {loading && (
        <div className={css.loadingSpinner}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

const SingleOrder = ({ order, products, setPickpackOrders }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [showDetail, setShowDetail] = useState(false);

  const showDrawer = () => setShowDetail(true);

  useEffect(() => {
    const productsCopy = [];

    for (const prod of order.line) {
      const currentProd = products.find(
        product => product._id === prod.product_id
      );
      productsCopy.push({ ...currentProd, ...prod });
    }

    setOrderProducts(productsCopy);
  }, [order._id, products]);

  const submitHandler = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL2}/api/pickpack/orderstatus`;
      const token = `Token Q6wIoo74oj4j69IyoZngShnWltCGWSB69bvJcALubLsO75jiIjf5cnddrrvDIL82FzjM9YSQxUcCPSZaTuALWjMlrLvcWxbJ9BTBT4lM9K5jzU6NWWTGzUydj5LBlcjA`;

      const postHeaders = new Headers();
      postHeaders.append('Content-Type', 'application/json');
      postHeaders.append('pickpack_token', token);

      const body = {
        code: order.document_id,
        status: 'completed',
        type: 2
      };

      const requestOption = {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify(body)
      };

      const res = await fetch(url, requestOption);
      console.log('RES:', res.body);
      if (res.status === 200) {
        setShowDetail(false);
        setPickpackOrders(prev =>
          prev.map(curOrder =>
            curOrder._id === order._id
              ? { ...curOrder, status: 'completed' }
              : { ...curOrder }
          )
        );
        alert('Амжилттай!');
      } else {
        console.log('first');
        throw new Error();
      }
    } catch (error) {
      alert(error.message ?? 'Алдаа гарлаа дахин оролдоно уу!');
    }
  };

  return (
    <>
      <div
        key={`pickpack-order-list-single-${order._id}`}
        className={css.singleOrderRow}
      >
        <div className={css.singleOrderItem} style={{ width: 150 }}>
          <span className={css.text}>{order.document_id}</span>
        </div>

        <div className={css.singleOrderItem} style={{ width: 200 }}>
          <div className={css.productImageWrapper}>
            {orderProducts.slice(0, 4).map((prod, index) => {
              return (
                <div
                  key={`${order._id}-order-prod-img-${index}`}
                  className={css.singleProductImage}
                  style={{ zIndex: 4 - index }}
                  onClick={showDrawer}
                >
                  <img src={prod.image?.[0]} alt={prod.name} />
                </div>
              );
            })}
            {orderProducts.length > 4 && (
              <div onClick={showDrawer} className={css.otherProds}>
                +{orderProducts.length - 4}
              </div>
            )}
          </div>
        </div>

        <div className={css.singleOrderItem} style={{ width: 100 }}>
          <span className={css.text}>
            {order.date.split(',')[0]} <br /> {order.date.split(',')[1]}
          </span>
        </div>

        <div className={css.singleOrderItem} style={{ width: 120 }}>
          <span className={css.text}>
            {order.status === 'created' && 'Үүссэн'}
            {order.status === 'completed' && 'Татагдсан'}
          </span>
        </div>

        <div className={css.singleOrderItem} style={{ width: 90 }}>
          <button
            disabled={order.status === 'completed'}
            type='button'
            className={`${css.statusChangeBtn} ${css[order.status]}`}
            onClick={submitHandler}
          >
            {order.status === 'created' && 'Татах'}
            {order.status === 'completed' && 'Татагдсан'}
          </button>
        </div>
      </div>

      <Drawer closeHandler={() => setShowDetail(false)} show={showDetail}>
        <div className={css.detailsContainer}>
          <div className={css.detailsHeader}>
            <h1 className={css.title}>Захиалгын дугаар: {order.document_id}</h1>

            <button
              onClick={() => setShowDetail(false)}
              type='button'
              className={css.closeButton}
            >
              <img src={closeIcon} alt='Close' />
            </button>
          </div>

          <div className={css.detailsOrder}>
            <span>
              <strong>Огноо:</strong> {order.date.split(',')[0]}{' '}
              {order.date.split(',')[1]}
            </span>
            <span>
              <strong>Төлөв:</strong> {order.status === 'created' && 'Үүссэн'}
              {order.status === 'completed' && 'Татагдсан'}
            </span>
          </div>

          <div className={css.detailsContent}>
            {orderProducts.map(product => {
              return (
                <div
                  key={`order-details-single-product-${product._id}`}
                  className={css.detailsSingleProduct}
                >
                  <div className={css.detailsProdImage}>
                    <img src={product.image?.[0]} alt={product.name} />
                  </div>

                  <div className={css.detailsProdInfo}>
                    <h3>{product.name}</h3>
                    <span>
                      SKU: {product.sku} / Barcode: {product.bar_code}
                    </span>
                    <p>Тоо ширхэг: {product.quantity.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={css.detailsFooter}>
            <Button
              onClick={() => setShowDetail(false)}
              variant='secondary'
              size='large'
              width={120}
            >
              Болих
            </Button>
            <Button
              disabled={order.status === 'completed'}
              variant='primary'
              size='large'
              width={140}
              onClick={submitHandler}
            >
              {order.status === 'created' && 'Татах'}
              {order.status === 'completed' && 'Татагдсан'}
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
