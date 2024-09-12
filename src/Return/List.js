import React, { useState, useEffect, useContext } from 'react';
import css from './list.module.css';
import ReturnSidebar from './ReturnSidebar';
import Tailbar from './Tailbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '../components/Spinner/Spinner';
import myHeaders from '../components/MyHeader/myHeader';
import { styles } from './style';
import { replaceImageUrl } from '../utils';
const List = props => {
  const [requests, setRequests] = useState([]);
  const [tailbar, setTailbar] = useState(false);
  const [returnShow, setReturnShow] = useState(false);
  const [oneProduct, setOneProduct] = useState([]);
  const [active, setActive] = useState(null);
  const [page, setPage] = useState(0);
  // console.log("requests", requests);

  useEffect(() => {
    let controller = new AbortController();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      signal: controller.signal
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/returnproduct/get`;

    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setRequests(response.data);
        controller = null;
      })
      .catch(error => console.log('error', error));
    return () => controller?.abort();
  }, [returnShow, tailbar, page]);
  const tailbarFunc = (id, index) => {
    setTailbar(true);
    setActive(index);
  };
  const sideBarHandler = id => {
    console.log('id', id);
    let content = requests.filter(item => {
      return item.receipt_id === id;
    });
    setOneProduct(content);
    setReturnShow(true);
  };

  let content = requests ? (
    <div className={css.container}>
      {requests.map((tx, index) => {
        // if (tx.type === 1) {
        //   amountConsume += tx.upoint_amount;
        // } else {
        //   amountCollect += tx.upoint_amount;
        // }
        let imageProduct = (
          <image
            src={`${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`}
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover'
            }}
          />
        );
        if (tx.image !== null || tx.image !== undefined) {
          imageProduct = (
            <img
              src={replaceImageUrl(tx?.image)}
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover'
              }}
            />
          );
        }

        let dataCreate;
        if (tx.created_date) {
          let OnDate = tx.created_date.split('T')[0];
          let OnHours = tx.created_date.split('T')[1];
          let onHours1 = OnHours.split('.')[0];
          dataCreate = `${OnDate} ${onHours1}`;
        } else {
          dataCreate = tx.created_date;
        }
        return (
          <div
            className={css.rowReturn}
            style={{
              display:
                [803070, 803071].indexOf(requests.user_id) !== -1
                  ? 'none'
                  : 'display'
            }}
            key={index}
          >
            <div style={styles.checkboxcontainer}>
              <input
                type='checkbox'
                // id={requests.id}
                className={css.inputWrapper}
              />{' '}
            </div>
            <div
              // style={{ width: "155px" }}
              // className={css.inputContainer}
              onClick={() => sideBarHandler(tx.receipt_id)}
              style={styles.phoneContainer}
            >
              <div className={css.phonewrapper}>
                <span className={css.textwrapper}>{tx.phone}</span>
              </div>
            </div>
            <div style={styles.serviceCenter}>
              <div className={css.tradeshopwrapper}>
                <span className={css.textwrapper}>{tx.tradeshop_name}</span>
              </div>
            </div>
            <div style={styles.addressContainer}>
              <div className={css.addressContainer}>
                <span className={css.textwrapper}>{tx.address1}</span>
              </div>
            </div>
            <div style={styles.statusContainer}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                {tx.status === 1 && (
                  <button className={css.buttonApp}>Зөвшөөрөх?</button>
                )}
                {tx.status === 2 && (
                  <button className={css.buttonApprove}>Зөвшөөрсөн</button>
                )}
                {tx.status === 3 && (
                  <button className={css.buttonReject}>Татгалзсан</button>
                )}
              </div>
            </div>
            <div style={styles.createdDateContainer}>
              <div>
                <span className={css.textwrapper}>{dataCreate}</span>
              </div>
            </div>
            <div style={styles.padaanContainer}>
              <div>
                <span className={css.textwrapper}>{tx.receipt_id}</span>
              </div>
            </div>
            <div style={styles.productContainer}>
              <div>
                <span className={css.textwrapper}>{tx.product_name}</span>
              </div>
            </div>
            <div style={styles.countContainer}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span className={css.textwrapper}>{tx.product_quantity}ш</span>
              </div>
            </div>
            <div style={styles.reasonContainer}>
              <div>
                <span className={css.textwrapper}>{tx.cause_name}</span>
              </div>
            </div>
            <div
              style={styles.tailbarContainer}
              onClick={() => tailbarFunc(tx.receipt_id, index)}
            >
              <div>
                <span className={css.textwrapper}>{tx.detail}</span>
              </div>
            </div>
            <div
              style={styles.conditionContainer}
              onClick={() => tailbarFunc(tx.receipt_id, index)}
            >
              <div>
                <span className={css.textwrapper}>{tx.additional_detail}</span>
              </div>
            </div>
            <div style={styles.imageContainer}>
              <div className={css.imagewrapper}>{imageProduct}</div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <span>Түр хүлээнэ үү ...</span>
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div id='scrollableDiv' style={{ width: '100%' }}>
        {/* <div id="scrollableDiv" style={{ height: "100vh", overflow: "auto" }}> */}
        <InfiniteScroll
          dataLength={requests?.length}
          next={() => setPage(prev => prev + 1)}
          hasMore={true}
          useWindow={false}
          loader={
            requests?.length === 0 && (
              <div className={css.loading}>
                <LoadingSpinner />
              </div>
            )
          }
          scrollableTarget='scrollableDiv'
        >
          {content}
        </InfiniteScroll>
      </div>
      {tailbar && <Tailbar setTailbar={setTailbar} oneProduct={oneProduct} />}
      {returnShow && (
        <ReturnSidebar
          setReturnShow={setReturnShow}
          oneProduct={oneProduct}
          setTailbar={setTailbar}
        />
      )}
    </div>
  );
};

export default List;
