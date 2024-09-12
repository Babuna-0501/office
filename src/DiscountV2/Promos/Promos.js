import React, { useContext, useState, useEffect } from 'react';
import css from './promos.module.css';
import Promo from './Promo';
import PromoHook from '../../Hooks/PromoHook';
import ZonesHook from '../../Hooks/ZonesHook';
import ProductReportHook from '../../Hooks/ProductsReportHook';
import myHeaders from '../../components/MyHeader/myHeader';
import BackOfficeHook from '../../Hooks/BackOfficeHook';
import locationjson from '../compontent/locationname.json';
import InfiniteScroll from 'react-infinite-scroll-component';

const Promos = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const ctx = useContext(PromoHook);
  const productctx = useContext(ProductReportHook);
  const zonectx = useContext(ZonesHook);
  const supplierctx = useContext(BackOfficeHook);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/discounts?limit=50&page=${page}`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        let data = [];

        response.forEach(item => {
          // console.log("item", item.locations);
          // console.log("item", item);
          let supplierName = '';
          supplierctx.suppliers.map(x => {
            if (item.supplierID === x.id) {
              supplierName = x.name;
            }
          });

          let locationName = [];
          if (item.locations) {
            zonectx.zonedata.map(t => {
              item.locations.map(x => {
                // console.log("x", x);
                if (x === t._id) {
                  locationjson.map(z => {
                    // console.log("z.name_engluish", z.name_english);
                    // console.log("t.name", t.name);
                    if (z.name_english === t.name) {
                      locationName.push(z.name_mgl);
                    } else {
                      locationName.push(t.name);
                    }
                  });
                }
              });
            });
          }

          let skus = [];
          let catName = [];
          if (item.channel_id) {
            productctx.sitedata.business_types.map(t => {
              item.channel_id?.map(x => {
                if (t.business_type_id === x) {
                  return catName.push(t.business_type_name);
                }
              });
            });
          }

          if (item.discount_data) {
            item.discount_data?.conditions?.map(x => {
              // console.log("x", x);
              skus.push(x.sku);
            });
          }
          let productName = [];
          let productBarcode = [];
          fetch(
            `${process.env.REACT_APP_API_URL2}/api/products/get1?ids=[${item.products}]`,
            requestOptions
          )
            .then(r => r.json())
            .then(res => {
              // console.log("product with promo", res.data);
              res.data.map(item => {
                productName.push(item.name);
                productBarcode.push(item.bar_code);
              });
            })
            .catch(error => {
              console.log('promo-toi product tatahad aldaa garlaa', error);
            });
          //   console.log("locationName", locationName);
          data.push({
            ...item,
            catName: catName,
            skus: skus,
            location: locationName,
            supplierName: supplierName,
            productName: productName,
            productBarcode: productBarcode
          });
        });
        let newdata = data.reverse();

        setData(prev => [...prev, ...newdata]);
        ctx.setData(data);
      })
      .catch(error => console.log('error', error));
  }, [page]);

  console.log('page', page);
  console.log('data.legbnth', data.length);
  return (
    <div className={css.body}>
      <div id='scrollableDiv' style={{ height: '85vh', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={data?.length}
          next={() => setPage(prev => prev + 1)}
          hasMore={true}
          loader={
            data?.length === 0 && (
              <div className={css.loading}>
                <span>Loading ...</span>
              </div>
            )
          }
          scrollableTarget='scrollableDiv'
        >
          {data.length > 0
            ? data.map((item, index) => {
                return (
                  <Promo
                    item={item}
                    key={index}
                    setData={setData}
                    data={data}
                  />
                );
              })
            : null}
        </InfiniteScroll>
      </div>
      <div
        style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#1A1A1A'
        }}
      >
        {data ? `Урт : ${data.length}` : '0'}
      </div>
    </div>
  );
};

export default Promos;
