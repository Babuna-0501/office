import React, { useState, useContext, useEffect } from 'react';
import css from './merchantindex.module.css';
import { styles } from './style';
import Suppliers from '../../components/Suppliers/Suppliers';
import InfiniteScroll from 'react-infinite-scroll-component';
import Merchant from './Merchant';
import myHeaders from '../../components/MyHeader/myHeader';
import { HeaderContext } from '../../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const MerchantIndex = props => {
  const [page, setPage] = useState(0);
  const [merchants, setMerchants] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const [activeValue, setActiveValue] = useState('');
  const [suppValue, setSuppValue] = useState(null);
  const [tradeshopid, setTradeshopid] = useState('');
  const [bustype, setBustype] = useState(null);
  const [is_active, setIs_active] = useState('');

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent data={props} />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let params = '';
    if (phoneNumber.length == 8) {
      params += `phone=${phoneNumber}&`;
    }
    if (tradeshopid.length === 4 || tradeshopid.length === '') {
      params += `tradeshop=${Number(tradeshopid)}&`;
    }
    if (bustype) {
      params += `business_type=${Number(bustype)}&`;
    }
    if (is_active !== '') {
      params += `is_active=${Number(is_active)}&`;
    }
    if (params !== '') {
      setPage(0);
    }

    let url = `${process.env.REACT_APP_API_URL2}/api/tradeshop/requests?${params}page=${page}`;

    console.log('url', url);
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        console.log('response', res.result);
        if (params !== '') {
          setMerchants(res.result);
        }
        setMerchants(prev => [...prev, ...res.result]);
      })
      .catch(error => {
        console.log('------error----', error);
      });
    // merchantctx.setAllMerchantRequest(merchants);
  }, [phoneNumber, page, tradeshopid, bustype, is_active]);

  const setOrderId = e => {
    setPhoneNumber(e);
  };
  return (
    <div
      style={{
        display: 'flex',
        width: 'auto',
        height: '100%',
        overflowX: 'scroll',
        overflowY: 'hidden'
      }}
    >
      <div
        style={{
          width: '2030px'
        }}
      >
        <div
          className='row header'
          style={{ padding: '0 0px', borderBottom: '0.8px solid #CCCCCC' }}
        >
          <div style={{ ...styles.checkboxcontainer }}>
            <div className={css.w700}>Request ID</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                disabled
                // onChange={(e) => setTradeshopID(e.target.value)}
              />
            </div>
          </div>

          <div style={{ ...styles.statusContainer }}>
            <div className={css.w700}>Нийлүүлэгч нэр</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                disabled
                // onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            {/* <Suppliers setSuppValue={setSuppValue} /> */}
          </div>
          <div style={{ ...styles.orderImageContainer }}>
            <div className={css.w700}>Идэвхтэй</div>
            <div>
              <input
                disabled
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                // onChange={(e) => setOrderId(e.target.value)}
              />
              {/* <select
                value={activeValue}
                onChange={(e) => setIs_active(e.target.value)}
              >
                <option value={""}>Бүгд</option>
                <option value={1}>Идэвхтэй</option>
                <option value={0}>Идэвхгүй</option>
              </select> */}
            </div>
          </div>
          <div style={{ ...styles.orderDateContainer }}>
            <div className={css.w700}>Үүссэн өдөр</div>
            <div>
              <input
                disabled
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                // onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.deliverDateContainer }}>
            <div className={css.w700}>Tradeshop Name</div>
            <div>
              <input
                disabled
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                // onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.deliverDateContainer }}>
            <div className={css.w700}>Үйл ажиллагааны төрөл</div>
            <div>
              <input
                disabled
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                // onChange={(e) => setOrderId(e.target.value)}
              />
              {/* <select
                value={bustype}
                onChange={(e) => setBustype(e.target.value)}
              >
                <option>-Үйл ажиллагааны чиглэл-</option>
                {props.businessType.map((item, index) => {
                  return (
                    <option value={item.business_type_id}>
                      {item.business_type_name}
                    </option>
                  );
                })}
              </select> */}
            </div>
          </div>
          <div style={{ ...styles.busTypeContainer }}>
            <div className={css.w700}>TradeshopID</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                // onChange={(e) => setOrderId(e.target.value)}
                onChange={e => setTradeshopid(e.target.value)}
                value={tradeshopid}
              />
            </div>
          </div>
          <div style={{ ...styles.totalPriceContainer }}>
            <div className={css.w700}>Хаяг</div>
            <div>
              <input
                disabled
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                // onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.upointContainer }}>
            <div className={css.w700}>Утас</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                onChange={e => setOrderId(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.paidPriceContainer }}>
            <div className={css.w700}>Register No</div>
            <div>
              <input
                disabled
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                // onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div id='scrollableDiv' className={css.scrollcontainer}>
          <InfiniteScroll
            dataLength={merchants?.length}
            next={() => setPage(prev => prev + 1)}
            hasMore={true}
            loader={
              merchants?.length === 0 && (
                <div className={css.loading}>Loading</div>
              )
            }
            scrollableTarget='scrollableDiv'
          >
            {merchants ? (
              merchants?.map((merchant, index) => {
                return (
                  <Merchant
                    data={merchant}
                    userData={props.userData}
                    key={index}
                    suppValue={suppValue}
                    maindata={props}
                  />
                );
              })
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                Мэдээлэл байхгүй байна.
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default MerchantIndex;
