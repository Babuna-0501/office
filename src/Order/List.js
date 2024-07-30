import React, { useState, useEffect } from 'react';
import Order from './Order';
import LoadingSpinner from '../components/Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import css from './List.module.css';
import myHeaders from '../components/MyHeader/myHeader';
import XTcompany from './XTcompany';

const List = props => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderChecks, setOrderChecks] = useState([]);
  const [tradeShopList, setTradeShopList] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [buramhanworks, setBuramhanworks] = useState([]);
  const [tugeegch, setTugeegch] = useState([]);

  const [shipments, setShipments] = useState([]);
  const [inventories, setInventories] = useState([]);

  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedData, setSelectedData] = useState(props.selectedData);
  let orderIds = [];

  useEffect(() => {
    setSelectedData([]);
    if (props.selectAll) {
      setOrderChecks(orders.map(() => true));
    } else {
      setOrderChecks(orders.map(() => false));
      props.setSelectedData([]);
    }
  }, [orders.length, props.selectAll]);

  useEffect(() => {
    orders?.map(order => {
      orderIds = [...orderIds, order.order_id];
    });
    if (
      props.selectAll &&
      orders.length > 0 &&
      orderIds.length === orders.length
    ) {
      setSelectedData(orderIds);
      props.setSelectedData(orderIds);
    }
  }, [orders.length]);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let supID =
      props.userData.company_id.replaceAll('|', '') == 1
        ? 13884
        : props.userData.company_id.replaceAll('|', '');

    fetch(
      `${
        process.env.REACT_APP_API_URL2
      }/api/sfa/tradeshop/list?supplierId=${Number(supID)}`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        // console.log("tradeshop", res.data);
        setTradeShopList(res);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    if (props.userData.company_id !== '|1|') {
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/users?company=${props.userData.company_id}`,
        requestOptions
      )
        .then(res => res.json())
        .then(res => {
          setBuramhanworks(res.data);
          props.setBuramhanajilchid(res.data);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/order/status/list`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        // console.log("reeeeeees", res);
        if (res.code === 200) {
          setStatusData(res.data);
        }
      })
      .catch(error => {
        console.log('error status', error);
      });
  }, [props]);

  useEffect(() => {
    // console.log("EFFECT", props.hariutsagchNer);
    const getOrders = () => {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let url;

      if ((props.start && props.end) || props.hariutsagchNer !== '') {
        console.log('negiig duudlaa');
        url = `${process.env.REACT_APP_API_URL2}/api/orders/?order_type=1&order_start=${props.start}&order_end=${props.end}&page=${page}&back_user_id=${props.hariutsagchNer}`;
        console.log('urlll', url);
        setLoading(true);
        fetch(url, requestOptions)
          .then(r => r.json())
          .then(response => {
            setOrders([...orders, ...response.data]);
            setLoading(false);
          })
          .catch(error => console.log('error', error));
      } else if (props.userData.company_id === '|13954|') {
        console.log('ARIG');
        let params = '';
        if (props.order_start && props.order_end) {
          params += `order_start=${props.order_start}&`;
          params += `order_end=${props.order_end}&`;
        }

        if (props.arigSupplier) {
          params += `supplier_id=${
            props.arigSupplier == 'Нийлүүлэгч' ? 13954 : props.arigSupplier
          }&`;
        }

        if (props.date) {
          params += `order_date=${props.date}&`;
        }
        if (props.delivery_date) {
          params += `delivery_date=${props.delivery_date}&`;
        }
        if (props.price) {
          params += `amount_equal=${parseInt(props.price)}&`;
        }
        if (props.phone) {
          params += `tradeshop_phone=${parseInt(props.phone)}&`;
        }
        if (props.tugeegch) {
          console.log('props.tugeegchprops.tugeegch', props.tugeegch);
          if (props.tugeegch == 'null') {
            params += `deliveryManNull=true&`;
          } else if (props.tugeegch === 'notNull') {
            params += `deliveryManNotNull=true&`;
          } else {
            params += `delivery_man=${props.tugeegch}&`;
          }
        }
        if (props.orderId) {
          params += `id=${parseInt(props.orderId)}&`;
        }
        if (props.isTugeegch) {
          // params += `id=${parseInt(props.orderId)}&`;
        }
        if (props.searchStatus) {
          params += `order_status=${parseInt(props.searchStatus)}&`;
        }
        if (props.tradeshopname) {
          params += `tradeshop_name=${props.tradeshopname}&`;
        }

        if (props.bustype) {
          params += `business_type=${parseInt(props.bustype)}&`;
        }
        if (props.district) {
          params += `tradeshop_disctrict=${parseInt(props.district)}&`;
        }
        if (props.hariutsagchNer) {
          params += `back_user_id=${props.hariutsagchNer}&`;
        }
        if (props.origin) {
          params += `origin=${props.origin}&`;
        }

        let newUrl = `${process.env.REACT_APP_API_URL2}/api/orders?${params}page=${page}`;
        console.log('URL ARIG', newUrl);

        localStorage.setItem('url', newUrl);
        fetch(newUrl, requestOptions)
          .then(r => r.json())
          .then(response => {
            console.log('response arig order  ++++----///****', response);
            setLoading(false);
            console.log('asdasdsad', newUrl);
            setOrders(prev => [...prev, ...response.data]);
          })
          .catch(error => console.log('error++++', error));
      } else if (
        (props.userData.company_id === '|13987|' ||
          props.userData.company_id === '|14006|' ||
          props.userData.company_id === '|13992|' ||
          props.userData.company_id === '|13991|' ||
          props.userData.company_id === '|13994|' ||
          props.userData.company_id === '|13965|' ||
          props.userData.company_id === '|13995|' ||
          props.userData.company_id === '|4805|' ||
          props.userData.company_id === '|10683|' ||
          props.userData.company_id === '|1232|' ||
          props.userData.company_id === '|13990|' ||
          props.userData.company_id === '|13996|' ||
          props.userData.company_id === '|13993|' ||
          props.userData.company_id === '|13997|' ||
          props.userData.company_id === '|13998|' ||
          props.userData.company_id === '|14000|' ||
          props.userData.company_id === '|13999|') &&
        currentPath === '/shuurhai'
      ) {
        console.log('SHUURHAI');
        let params = '';

        if (props.date) {
          params += `order_date=${props.date}&`;
        }
        if (props.delivery_date) {
          params += `delivery_date=${props.delivery_date}&`;
        }
        if (props.price) {
          params += `amount_equal=${parseInt(props.price)}&`;
        }
        if (props.phone) {
          params += `tradeshop_phone=${parseInt(props.phone)}&`;
        }
        if (props.orderId) {
          params += `id=${parseInt(props.orderId)}&`;
        }
        if (props.isTugeegch) {
          // params += `id=${parseInt(props.isTugeegch)}&`;
        }
        if (props.searchStatus) {
          params += `order_status=${parseInt(props.searchStatus)}&`;
        }
        if (props.tradeshopname) {
          params += `tradeshop_name=${props.tradeshopname}&`;
        }
        if (props.tugeegch) {
          if (props.tugeegch == 'null') {
            params += `deliveryManNull=true&`;
          } else if (props.tugeegch === 'notNull') {
            params += `deliveryManNotNull=true&`;
          } else {
            params += `delivery_man=${props.tugeegch}&`;
          }
        }
        if (props.bustype) {
          params += `business_type=${parseInt(props.bustype)}&`;
        }
        if (props.district) {
          params += `tradeshop_disctrict=${parseInt(props.district)}&`;
        }
        if (props.hariutsagchNer) {
          params += `back_user_id=${props.hariutsagchNer}&`;
        }
        if (props.origin) {
          params += `origin=${props.origin}&`;
        }

        // url = `${process.env.REACT_APP_API_URL2}/api/orders?order_type=1&supplier_id=13884&${params}page=${page}`;
        let newUrl = `${
          process.env.REACT_API_URL2
        }/orders?vendor=${props.userData.company_id.replaceAll(
          '|',
          ''
        )}&${params}page=${page}`;

        localStorage.setItem('url----', newUrl);
        // console.log("requestOptions------------requestOptions", requestOptions);

        fetch(newUrl, requestOptions)
          .then(r => r.json())
          .then(response => {
            console.log(
              'response shuurhai tugeelt  ++++----///****++++++++++++++++++++++++++++++++++++',
              response
            );
            setLoading(false);
            // console.log("response filter", response.data);
            setOrders(prev => [...prev, ...response.data]);
          })
          .catch(error => console.log('error++++------------------', error));
      } else if (currentPath === '/orders' || currentPath === '/return') {
        console.log('ORDER PATH', props);
        let params = '';
        if (props.supplier) {
          params += `supplier_id=${parseInt(props.supplier)}&`;
        }
        if (props.order_start && props.order_end) {
          params += `order_start=${props.order_start}&`;
          params += `order_end=${props.order_end}&`;
        }
        if (props.date) {
          params += `order_date=${props.date}&`;
        }
        if (props.delivery_date) {
          params += `delivery_date=${props.delivery_date}&`;
        }
        if (props.orderId) {
          params += `id=${parseInt(props.orderId)}&`;
        }
        if (props.price) {
          params += `amount_equal=${parseInt(props.price)}&`;
        }
        if (props.phone) {
          params += `tradeshop_phone=${parseInt(props.phone)}&`;
        }
        if (props.tugeegch) {
          if (props.tugeegch == 'null') {
            params += `deliveryManNull=true&`;
          } else if (props.tugeegch === 'notNull') {
            params += `deliveryManNotNull=true&`;
          } else {
            params += `delivery_man=${props.tugeegch}&`;
          }
        }
        if (props.isTugeegch) {
          // params += `id=${parseInt(props.isTugeegch)}&`;
        }
        if (props.orderStatus) {
          params += `order_status=${parseInt(props.orderStatus)}&`;
        }
        if (props.tradeshopname) {
          params += `tradeshop_name=${props.tradeshopname}&`;
        }

        if (props.bustype) {
          params += `business_type=${parseInt(props.bustype)}&`;
        }
        if (props.city) {
          params += `city=${parseInt(props.city)}&`;
        }

        if (props.district) {
          params += `tradeshop_disctrict=${parseInt(props.district)}&`;
        }
        if (props.khoroo) {
          params += `khoroo=${parseInt(props.khoroo)}&`;
        }
        if (props.address) {
          params += `address=${props.address}&`;
        }

        if (props.hariutsagchNer) {
          params += `back_user_id=${props.hariutsagchNer}&`;
        }
        if (props.origin) {
          params += `origin=${props.origin}&`;
        }

        if (props.xtphone) {
          let filteredXT;
          for (const user of props.buramhanajilchid) {
            if (
              user.phone_number &&
              user.phone_number === Number(props.xtphone)
            ) {
              filteredXT = user;
              break;
            }
          }

          params += `back_user_id=${filteredXT.user_id}&`;
        }
        if (currentPath === '/orders') {
          url = `${process.env.REACT_APP_API_URL2}/api/orders?order_type=1&${params}page=${page}`;
        } else if (currentPath === '/return') {
          url = `${process.env.REACT_APP_API_URL2}/api/orders?order_type=2&${params}page=${page}`;
        }

        localStorage.setItem('url', url);
        // console.log("url engiin order", url);
        fetch(url, requestOptions)
          .then(r => r.json())
          .then(response => {
            setLoading(false);
            setOrders(prev => [...prev, ...response.data]);

            if (props.address) {
              setOrders(prev =>
                prev.filter(
                  order =>
                    !(
                      (order.status === 1 || order.status === 5) &&
                      props.userData.company_id !== '|1|'
                    ) || props.userData.company_id === '|13901|'
                )
              );
            }

            if (props.xtvalue > 1) {
              if (props.xtvalue === 2) {
                setOrders(prev =>
                  prev.filter(order => order.back_office_user !== null)
                );
              }

              if (props.xtvalue === 3) {
                setOrders(prev =>
                  prev.filter(order => order.back_office_user === null)
                );
              }
            }

            if (props.paymentMethod !== null) {
              setOrders(prev =>
                prev.filter(order => {
                  if (order.order_data !== null) {
                    const orderData = JSON.parse(order.order_data);
                    console.log('jsonOrderData: ', orderData);
                    if (
                      Number(orderData.payment?.paymentId) ===
                      props.paymentMethod
                    ) {
                      return true;
                    }
                  }

                  return false;
                })
              );
            }

            // if (props.origin) {
            //   setOrders((prev) =>
            //     prev.filter((order) => order.origin === props.origin)
            //   );
            // }

            if (orders?.length !== 0) {
              props.setPopModal(false);
              setLoading(false);
            }
          })
          .catch(error => console.log('error++++', error));
      }
    };
    getOrders();
  }, [
    page,
    props.date,
    props.delivery_date,
    props.phone,
    props.searchOrderCompanyName,
    props.tradeshop_name,
    props.bustype,
    props.district,
    props.orderStatus,
    props.supplier,
    props.price,
    props.xtphone,
    props.city,
    props.khoroo,
    props.address,
    props.xtvalue,
    props.orderPaymentMethod,
    props.xtName,
    props.xtPhone,
    props.origin,
    props.hariutsagchNer
  ]);

  useEffect(() => {
    props.setFooterdata(orders);
  }, [orders]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/users?company=14031`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(
          'res----res--------++++++++++++++*//////////////',
          res.data
        );
        setTugeegch(res.data);
      })
      .catch(error => {
        console.log('fetch backoffice response error', error);
      });
  }, [props.userData.company_id === '|14031|']);

  useEffect(() => {
    const getShipments = async () => {
      try {
        const companyId = Number(props.userData.company_id.replaceAll('|', ''));

        const shipmentsUrl = `${process.env.REACT_APP_API_URL2}/api/shipment?supplierId=${companyId}`;
        const inventoryUrl = `${process.env.REACT_APP_API_URL2}/api/warehouse/get`;
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const [shipmentRes, inventoryRes] = await Promise.all([
          fetch(shipmentsUrl, requestOptions),
          fetch(inventoryUrl, requestOptions)
        ]);
        const shipmentData = await shipmentRes.json();
        const inventoryData = await inventoryRes.json();

        setShipments(shipmentData.data);
        setInventories(
          inventoryData.data.filter(inven => inven.supplier_id === companyId)
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (XTcompany.includes(props.userData.company_id)) {
      getShipments();
    }
  }, []);

  const checkHandler = (index, value, id) => {
    if (value === true) {
      selectedData.push(id);
      props.setSelectedData(selectedData);
    } else {
      const filteredData = selectedData.filter(hello => hello !== id);
      props.setSelectedData(filteredData);
      setSelectedData(filteredData);
    }
    setOrderChecks(prev =>
      prev.map((val, ind) => {
        if (ind === index) {
          return !val;
        } else {
          return val;
        }
      })
    );

    if (value) {
      props.setSelectedOrders(prev => [...prev, orders[index]]);
    } else {
      props.setSelectedOrders(prev =>
        prev.filter(order => orders[index].order_id !== order.order_id)
      );
    }
  };

  useEffect(() => {
    if (orderChecks.length > 0 && orderChecks.includes(true)) {
      props?.setTugeegchBtnDisabled(false);
    } else {
      props?.setTugeegchBtnDisabled(true);
    }
  }, [orderChecks]);

  // if (orderIds.length === orders.length) {
  //   setAllOrderId(orderIds);
  // }
  return orders ? (
    <>
      <div id='scrollableDiv' className={css.scrollcontainer}>
        <InfiniteScroll
          dataLength={orders.length}
          next={() => setPage(prev => prev + 1)}
          hasMore={true}
          loader={
            loading === true && (
              <div className={css.loading}>
                <LoadingSpinner />
              </div>
            )
          }
          scrollableTarget='scrollableDiv'
        >
          {orders.map((order, index) => {
            return (
              <Order
                data={order}
                userData={props.userData}
                key={index}
                index={index}
                locations={props.locations}
                businessType={props.businessType}
                setOrders={setOrders}
                orders={orders}
                appctx={props.appctx}
                statusData={statusData}
                buramhanworks={buramhanworks}
                tugeegch={tugeegch}
                checked={orderChecks[index]}
                checkHandler={checkHandler}
                shipments={shipments}
                inventories={inventories}
                tradeShopList={tradeShopList}
                fieldsData={props.fieldsData}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  ) : null;
};

export default List;
