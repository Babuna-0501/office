import React, { useEffect, useState, useContext } from 'react';
import Table from './Table';
import AddNewDiscount from './AddNewDiscount';
import PromoHook from '../Hooks/PromoHook';
import DiscountModal from './DiscountModal';
import UpdateDiscount from './UpdateDiscount';
import css from './index.module.css';
import DeletePromo from './DeletePromo';
import myHeaders from './HeaderContent/HeaderContent';

import ChannelSetting from './ChannelSettingV1';
import DiscountProductV1 from './DiscountProductV1';
import ZonesHook from '../Hooks/ZonesHook';
import ProductReportHook from '../Hooks/ProductsReportHook';
import GiftProduct from './GiftProduct';
import locationjson from './compontent/locationname.json';
import BackOfficeHook from '../Hooks/BackOfficeHook';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const Index = () => {
  const [data, setData] = useState([]);

  const ctx = useContext(PromoHook);
  const productctx = useContext(ProductReportHook);
  const zonectx = useContext(ZonesHook);
  const supplierctx = useContext(BackOfficeHook);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  const getData = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/discounts`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        console.log('response promo', response);
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

        setData(data.reverse());
        ctx.setData(data);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    getData();
  }, []);

  console.log('ctx.updateDisProd', ctx.updateDisProd);
  return (
    <div className={css.container}>
      <Table data={data} />
      {/* <Headermain />
      <Promos /> */}
      {ctx.newPromoAdd && <DiscountModal />}
      {ctx.nextPage && <AddNewDiscount />}
      {ctx.updateDisProd && <UpdateDiscount />}
      {ctx.deleteModal && <DeletePromo setData={setData} data={data} />}
      {ctx.promoProductAdd && <DiscountProductV1 />}

      {ctx.giftProd && <GiftProduct />}
      {ctx.channel && <ChannelSetting />}
    </div>
  );
};

export default Index;
