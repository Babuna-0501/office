import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import myHeaders from './HeaderContent/HeaderContent';
import css from './discountproducts.module.css';
import closeBtn from '../assets/close.svg';
import PromoHook from '../Hooks/PromoHook';
import ProductReportHook from '../Hooks/ProductsReportHook';
import TableDiscProdV1 from './TableDiscProdV1';
import ProductAdd from './Product/ProductAdd';

const DiscountProductV1 = () => {
  const ctx = useContext(PromoHook);
  const ctxSitedata = useContext(ProductReportHook);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // console.log("dat+++++++a", data);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const getProducts = () => {
      let url = `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${ctx?.supplierID}&search=${ctx.searchValue}`;
      // console.log("url", url);
      fetch(url, requestOptions)
        .then(r => r.json())
        .then(response => {
          // console.log("res", response.data);

          let data = [];
          response.data.forEach(dat => {
            let brand;
            let categoryAngilal;
            ctxSitedata.sitedata.categories.filter(item => {
              if (item.id === dat.category_id) {
                return (categoryAngilal = item.name);
              }
            });
            ctx.brands.filter(item => {
              if (item.id === dat.brand) {
                return (brand = item.name);
              }
            });
            data.push({
              ...dat,
              // key: Math.random(),
              suppName: ctx.supplierName,
              brandName: brand,
              categoryName: categoryAngilal,
              gift: false
            });
          });

          setData(data);
        })
        .catch(error => {
          console.log('Product tathad aldaa garlaa' + error.message);
        });
    };
    try {
      getProducts();
    } catch (error) {
      console.log(error.message);
    }
  }, [ctx.searchValue]);
  const addProductsHandler = () => {
    ctx.setProducts(selectedRows);
    ctx.setPromoProductAdd(false);
    ctx.setSearchValue('');
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <img
          src={closeBtn}
          className={css.closeBtn}
          onClick={() => ctx.setPromoProductAdd(false)}
        />
        <div className={css.headerContainer}>
          <h1>Бүтээгдэхүүн нэмэх</h1>
        </div>
        <div className={css.tableContainer}>
          <TableDiscProdV1 data={data} setSelectedRows={setSelectedRows} />
          {/* <ProductAdd /> */}
        </div>
        <div className={css.btnContainer}>
          <div className={css.buttonsContainer}>
            <button
              className={css.btnone}
              onClick={() => {
                ctx.setPromoProductAdd(false);
                setData([]);
                ctx.setSearchValue('');
              }}
            >
              Цуцлах
            </button>
            <button className={css.btntwo} onClick={addProductsHandler}>
              Нэмэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountProductV1;
