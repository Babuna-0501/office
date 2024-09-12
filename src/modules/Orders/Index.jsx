// CSS
import css from './styles.module.css';

// Packages
import { useContext, useEffect, useState } from 'react';

// Hooks
import { HeaderContext } from '../../Hooks/HeaderHook';

// Components
import {
  HeaderContent,
  OrderFooter,
  OrderHeader,
  OrderList
} from './components';
import myHeaders from '../../components/MyHeader/myHeader';
import { LoadingSpinner } from '../../components/common';
import { GlobalContext } from '../../Hooks/GlobalContext';

const Orders = props => {
  const { setHeaderContent, setShowRefreshBtn } = useContext(HeaderContext);
  const { loggedUser, locations, categories, businessTypes, globalDataReady } =
    useContext(GlobalContext);

  const { suppliers } = props;

  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [orders, setOrders] = useState([]);

  const [ordersLoading, setOrdersLoading] = useState(true);

  // Filter States
  const [orderId, setOrderId] = useState('');
  const [orderSupplier, setOrderSupplier] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [tradeshopName, setTradeshopName] = useState('');
  const [tradeshopPhone, setTradeshopPhone] = useState('');
  const [orderChannel, setOrderChannel] = useState('');
  const [orderCity, setOrderCity] = useState('');
  const [orderDistrict, setOrderDistrict] = useState('');
  const [orderKhoroo, setOrderKhoroo] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  const filterStates = {
    orderId,
    setOrderId,
    orderSupplier,
    setOrderSupplier,
    orderDate,
    setOrderDate,
    deliveryDate,
    setDeliveryDate,
    orderPrice,
    setOrderPrice,
    tradeshopName,
    setTradeshopName,
    tradeshopPhone,
    setTradeshopPhone,
    orderChannel,
    setOrderChannel,
    orderCity,
    setOrderCity,
    orderDistrict,
    setOrderDistrict,
    orderKhoroo,
    setOrderKhoroo,
    orderAddress,
    setOrderAddress
  };

  useEffect(() => {
    setHeaderContent(
      <HeaderContent
        userData={loggedUser}
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
      />
    );
    setShowRefreshBtn(true);

    return () => {
      setHeaderContent(<></>);
      setShowRefreshBtn(false);
    };
  }, [setHeaderContent, setShowRefreshBtn, loggedUser, orderStatus]);

  const getOrders = async () => {
    try {
      if (currentPage === 0) {
        setOrdersLoading(true);
      }

      let params = `order_type=1&page=${currentPage}&order_by=created_desc&`;

      if (orderId) {
        params += `id=${orderId}&`;
      }

      if (orderSupplier) {
        params += `supplier_id=${orderSupplier}&`;
      }

      if (orderDate) {
        params += `order_date=${orderDate}&`;
      }

      if (deliveryDate) {
        params += `delivery_date=${deliveryDate}&`;
      }

      if (orderPrice) {
        params += `amount_equal=${orderPrice}&`;
      }

      if (tradeshopName) {
        params += `tradeshop_name=${tradeshopName}&`;
      }

      if (tradeshopPhone) {
        params += `tradeshop_phone=${tradeshopPhone}&`;
      }

      if (orderChannel) {
        params += `business_type=${orderChannel}&`;
      }

      if (orderCity) {
        params += `city=${orderCity}&`;
      }

      if (orderDistrict) {
        params += `tradeshop_disctrict=${orderDistrict}&`;
      }

      if (orderKhoroo) {
        params += `khoroo=${orderKhoroo}&`;
      }

      if (orderAddress) {
        params += `address=${orderAddress}&`;
      }

      if (orderStatus) {
        params += `order_status=${orderStatus}&`;
      }

      const url = `${process.env.REACT_APP_API_URL2}/api/orders?${params}`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.data.length === 0) setHasMore(false);

      if (currentPage === 0) {
        setOrders(resData.data);
      } else {
        setOrders(prev => [...prev, ...resData.data]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (globalDataReady) getOrders();
  }, [
    currentPage,
    globalDataReady,
    orderId,
    orderSupplier,
    orderDate,
    deliveryDate,
    orderPrice,
    tradeshopName,
    tradeshopPhone,
    orderChannel,
    orderCity,
    orderDistrict,
    orderKhoroo,
    orderAddress,
    orderStatus
  ]);

  useEffect(() => {
    setCurrentPage(0);
  }, [
    orderId,
    orderSupplier,
    orderDate,
    deliveryDate,
    orderPrice,
    tradeshopName,
    tradeshopPhone,
    orderChannel,
    orderCity,
    orderDistrict,
    orderKhoroo,
    orderAddress,
    orderStatus
  ]);

  return (
    <div className={css.ordersContainer}>
      <div className={css.contentContainer}>
        <OrderHeader
          zIndex={orders.length + 1}
          suppliers={suppliers}
          locations={locations}
          channels={businessTypes}
          filterStates={filterStates}
        />

        {!ordersLoading && orders.length > 0 && (
          <OrderList
            orders={orders}
            suppliers={suppliers}
            locations={locations}
            channels={businessTypes}
            setCurrentPage={setCurrentPage}
            hasMore={hasMore}
          />
        )}

        {ordersLoading && (
          <div className={css.loadingSpinner}>
            <LoadingSpinner />
          </div>
        )}
      </div>

      <OrderFooter
        orders={orders}
        zIndex={orders.length + 1}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Orders;
