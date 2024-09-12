import React, { useEffect, useState, useContext } from 'react';
import css from './shops.module.css';
import myHeaders from '../../components/MyHeader/myHeader';
import Shop from './Shop';
import ProductReportHook from '../../Hooks/ProductsReportHook';
import AppHook from '../../Hooks/AppHook';
import InfiniteScroll from 'react-infinite-scroll-component';

const data = [
  { id: 0, name: '', width: '20px' },
  { id: 1, name: 'Ү.цэгийн нэр', width: '100px' },
  { id: 2, name: 'РД', width: '50px' },
  { id: 3, name: 'Суваг', width: '60px' },
  { id: 4, name: 'Ү.А чиглэл', width: '100px' },
  { id: 5, name: 'Дүүрэг/Сум', width: '100px' },
  { id: 6, name: 'Хороо', width: '50px' },
  { id: 7, name: 'Хаяг', width: '100px' }
];

const companyID = ['|1|', '|948|', '|14174|'];

const Shops = props => {
  const [shopdata, setShopdata] = useState([]);
  const [channel, setChannel] = useState([]);
  const [onechannel, setOnechannel] = useState('');
  const [location, setLocation] = useState([]);
  const [shopName, setShopName] = useState('');
  const [rNumber, setRNumber] = useState('');
  const [page, setPage] = useState(1);
  const sitedatactx = useContext(ProductReportHook);
  const appctx = useContext(AppHook);

  useEffect(() => {
    setChannel(sitedatactx.sitedata.business_types);
    setLocation(sitedatactx.sitedata.location);
  }, [sitedatactx.sitedata]);

  useEffect(() => {
    const fetchData = () => {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let params = '';
      if (rNumber) {
        params += `register=${rNumber}&`;
      }
      if (onechannel && onechannel !== '--Бүх суваг') {
        params += `business_type_id=${Number(onechannel)}&`;
      }
      if (shopName) {
        params += `tradeshop_name=${shopName}&`;
      }

      let url = `${process.env.REACT_APP_API_URL2}/api/merchants?page=${page}`;
      if (params) {
        url = `${process.env.REACT_APP_API_URL2}/api/merchants?${params}`;
      }

      fetch(url, requestOptions)
        .then(res => res.json())
        .then(res => {
          console.log('results tradeshops', res);

          let newdata = res.data;

          let update = newdata.map(item => ({
            ...item,
            chosed: false
          }));

          console.log('update', update);

          if (page === 1) {
            setShopdata(update);
          } else {
            setShopdata(prevData => [...prevData, ...update]);
          }
        })
        .catch(err => {
          console.log('error', err);
        });
    };

    fetchData();
  }, [onechannel, rNumber, shopName, page]);

  const SaveHandler = (item, index) => {
    if (index === 0) {
      if (sitedatactx.shopIDS.length !== 0) {
        sitedatactx.setShopIDS([]);
      } else {
        let ids = [];
        shopdata.forEach(item => {
          ids.push(item.TradeshopID);
        });
        let uniqueChars = [...new Set(ids)];
        sitedatactx.setShopIDS(uniqueChars);
      }
    }
  };

  const [allChecked, setAllChecked] = useState(false);
  const tradeshop_ids = shopdata.map(shop => shop.tradeshop_id);

  return (
    <div className={css.container}>
      <div>
        <div className={css.name}>Дэлгүүр</div>
        <div className={css.shopbody}>
          <div className={css.header}>
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ width: item.width }}
                  className={css.headerwrapper}
                  onClick={() => SaveHandler(item, index)}
                >
                  <span>{item.name}</span>
                  {index === 0 && (
                    <input
                      type='checkbox'
                      checked={allChecked}
                      onChange={e => {
                        setAllChecked(e.target.checked);
                        if (e.target.checked) {
                          sitedatactx.setShopIDS(tradeshop_ids);
                        } else {
                          sitedatactx.setShopIDS([]);
                        }
                      }}
                    />
                  )}
                  {index === 1 && (
                    <input
                      value={shopName}
                      onChange={e => {
                        setShopdata([]);
                        setPage(1);
                        setShopName(e.target.value);
                      }}
                    />
                  )}
                  {index === 2 && (
                    <input
                      value={rNumber}
                      onChange={e => {
                        setShopdata([]);
                        setPage(1);
                        setRNumber(e.target.value);
                      }}
                    />
                  )}
                  {index === 3 && (
                    <select
                      value={onechannel}
                      onChange={e => {
                        setPage(1);
                        setShopdata([]);
                        setOnechannel(e.target.value);
                      }}
                    >
                      <option value=''>--Бүх суваг</option>
                      {channel &&
                        channel.map((item, index) => (
                          <option
                            value={item.business_type_id}
                            key={item.business_type_id}
                          >
                            {item.business_type_name}
                          </option>
                        ))}
                    </select>
                  )}
                  {index >= 4 && <input disabled />}
                </div>
              );
            })}
          </div>
          <div className={css.body} id='scrollableDiv'>
            <InfiniteScroll
              dataLength={shopdata.length}
              next={() => setPage(prev => prev + 1)}
              hasMore={true}
              scrollableTarget='scrollableDiv'
            >
              {shopdata &&
                shopdata.map((item, index) => (
                  <Shop
                    setAllChecked={setAllChecked}
                    item={item}
                    channel={channel}
                    key={index}
                    location={location}
                  />
                ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            fontSize: '10px',
            color: '#37474F',
            fontWeight: '400'
          }}
        >
          {shopdata.length !== 0 && `Нийт дэлгүүрийн тоо : ${shopdata.length}`}
        </div>
        <div className={css.btnwrapper}>
          <button
            style={{
              background: '#ECEFF1',
              color: '#78909C'
            }}
            onClick={() => {
              props.setPage(1);
            }}
          >
            Цуцлах
          </button>
          <button
            style={{
              background: '#ffa600',
              color: '#fff'
            }}
            onClick={() => {
              props.setPage(1);
            }}
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shops;
