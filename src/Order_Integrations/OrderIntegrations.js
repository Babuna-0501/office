import React, { useState, useEffect } from 'react';
import css from './orderintegrations.module.css';
import { styles } from './style';
import OrderIntegrationsList from './OrderIntegrationsList';
const OrderIntegrations = () => {
  const [data, setData] = useState([]);
  const [company, setCompany] = useState('');
  const [namesearch, setNamesearch] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/cola/order`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        eb_token:
          'eb_cola_integration_05f60b8248eb98591c10ce996eedff0831db539ebe913f6531551299730f4a024a4707e7510ee2e9915c9e8bb1d8c18b558c4f76c765e6e3628705262f85fc9a'
      }
    })
      .then(res => res.json())
      .then(res => {
        // console.log("res cola ", res.data);
        let alldata = [];
        res.data.map(item => {
          alldata.push({
            ...item,
            companyName: 'cola'
          });
        });

        setData(prev => [...prev, ...alldata]);
      })
      .catch(error => {
        console.log('error', error);
      });
    fetch(`${process.env.REACT_APP_API_URL}/api/agmg/order`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        eb_token:
          'eb_anungoo_integration_05f60b8248eb98591c10ce996eedff0831db539ebe913f6531551299730f4a024a4707e7510ee2e9915c9e8bb1d8c18b558c4f76c765e6e3628705262f85fc9a'
      }
    })
      .then(res => res.json())
      .then(res => {
        // console.log("res anungoo", res.data);
        let alldata = [];
        res.data.map(item => {
          alldata.push({
            ...item,
            companyName: 'anungoo'
          });
        });
        setData(prev => [...prev, ...alldata]);
      })
      .catch(error => {
        console.log('error', error);
      });

    // setData(aa);
  }, []);
  console.log('data', data);
  let bbb = data.sort(function (a, b) {
    var c = new Date(a.DateCreate);
    var d = new Date(b.DateCreate);
    return d - c;
  });
  return (
    <div className={css.container}>
      <div className={css.headerwrapper}>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>DocumentNo</span>
          {/* <input type="text" onKeyPress={(e) => searchById(e)} /> */}
          <input type='text' />
        </div>

        <div
          className={css.header}
          style={{
            ...styles.logoContainer
          }}
        >
          <span className={css.headerTitle}>TradeShopId</span>
          {/* <input type="text" onKeyPress={(e) => searchById(e)} /> */}
          <input type='text' />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>Name</span>
          {/* <input type="text" onKeyPress={(e) => searchById(e)} /> */}
          <input
            type='text'
            value={namesearch}
            onChange={e => setNamesearch(e.target.value)}
          />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>FullAddress</span>
          {/* <input type="text" onKeyPress={(e) => searchById(e)} /> */}
          <input type='text' />
        </div>
        <div
          className={css.headeaaaar}
          style={{
            ...styles.moneyContainer
          }}
        >
          <span className={css.headerTitle}>Amount</span>
          {/* <input type="text" onKeyPress={(e) => searchById(e)} /> */}
          <input
            type='text'
            style={{
              width: '100%'
            }}
          />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>DateCreate</span>
          {/* <input type="text" onKeyPress={(e) => searchById(e)} /> */}
          <input type='text' />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>DDate</span>
          {/* <input type="text" onKeyPress={(e) => searchById(e)} /> */}
          <input type='text' />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>Company name</span>
          {/* <input type="text" onKeyPress={(e) => searchById(e)} /> */}

          <select
            value={company}
            onChange={e => setCompany(e.target.value)}
            className={css.chosedSELECT}
          >
            <option value=''>------</option>
            <option value='cola'>MCS COCA COLA</option>
            <option value='anungoo'>Anungoo</option>
          </select>
        </div>
      </div>
      <div className={css.wrapperbody}>
        {data &&
          company !== null &&
          bbb
            .filter(item => item.companyName === company)
            .map(item => {
              return <OrderIntegrationsList data={item} company={company} />;
            })}

        {data &&
          company === '' &&
          bbb.map(item => {
            return <OrderIntegrationsList data={item} />;
          })}
      </div>
    </div>
  );
};

export default OrderIntegrations;
