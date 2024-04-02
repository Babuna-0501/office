import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import css from "./giftproduct.module.css";
import closeBtn from "../assets/close.svg";
import PromoHook from "../Hooks/PromoHook";
import ProductReportHook from "../Hooks/ProductsReportHook";
import myHeaders from "../components/MyHeader/myHeader";

import TableGiftProd from "./TableGiftProd";

const GiftProduct = () => {
  const ctx = useContext(PromoHook);
  const ctxSitedata = useContext(ProductReportHook);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // console.log("selectrows", selectedRows);
  // console.log("ctx.willUpdateProd.supplierID", ctx.willUpdateProd.supplierID);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const getProducts = () => {
      let url;
      if (ctx.willUpdateProd.supplierID) {
        url = `https://api2.ebazaar.mn/api/products/get1?supplier=${ctx.willUpdateProd.supplierID}&search=${ctx.searchValue}`;
      }
      if (ctx.supplierID) {
        url = `https://api2.ebazaar.mn/api/products/get1?supplier=${ctx.supplierID}&search=${ctx.searchValue}`;
      }

      // console.log("url", url);
      fetch(url, requestOptions)
        .then((r) => r.json())
        .then((response) => {
          // console.log("res", response.data);
          setData([]);

          let data = [];
          response.data.forEach((dat) => {
            let brand;
            let categoryAngilal;
            ctxSitedata.sitedata.categories.filter((item) => {
              if (item.id === dat.category_id) {
                return (categoryAngilal = item.name);
              }
            });
            ctx.brands.filter((item) => {
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
              gift: false,
            });
          });

          setData(data);
        })
        .catch((error) => {
          console.log("Product tathad aldaa garlaa" + error.message);
          setData([]);
        });
    };
    try {
      getProducts();
    } catch (error) {
      console.log(error.message);
      setData([]);
    }
  }, [ctx.searchValue]);
  const addProductsHandler = () => {
    let dete = selectedRows.map((item) => {
      return {
        threshold_qty: 0,
        min_csku_qty: 0,
        gift_qty: 0,
        is_gift: true,
        product_id: item._id,
        product_name: item.name,
      };
    });
    let data = {
      package_id: Math.floor(Math.random() * 10000),
      dete,
    };
    // ctx.setGiftProduct([...ctx.giftProduct, data]);

    ctx.setGiftProduct([data]);
    // console.log("data", data);

    ctx.setGiftProd(false);
    ctx.setPromoProductAdd(false);
    ctx.setSearchValue("");
  };
  // console.log("data+++++------", data);
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <img
          src={closeBtn}
          className={css.closeBtn}
          onClick={() => ctx.setGiftProd(false)}
        />
        <div className={css.headerContainer}>
          <h1>Бүтээгдэхүүн нэмэх</h1>
        </div>
        <div className={css.tableContainer}>
          <TableGiftProd data={data} setSelectedRows={setSelectedRows} />
        </div>
        <div className={css.btnContainer}>
          <div className={css.buttonsContainer}>
            <button
              className={css.btnone}
              onClick={() => {
                ctx.setPromoProductAdd(false);
                ctx.setGiftProd(false);
                setData([]);
                ctx.setSearchValue("");
              }}
            >
              Цуцлах++++
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

export default GiftProduct;
