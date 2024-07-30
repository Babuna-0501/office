import React, { useState, useContext, useEffect } from 'react';
import css from './productmodal.module.css';
import closeIcon from '../../assets/close.svg';
import checkbox from '../../assets/check box.svg';
import checked from '../../assets/Tick Square_green.svg';
import SMSHook from '../../Hooks/SMSHook';
import myHeaders from '../../components/MyHeader/myHeader';
import ProductReportHook from '../../Hooks/ProductsReportHook';
import AppHook from '../../Hooks/AppHook';

const widtharray = [50, 150, 100, 100, 100, 100, 100];

const MultiProductsModal = props => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState(null);
  const [onecategory, setOnecategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [onebrand, setOnebrand] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [sku, setSku] = useState(null);
  const [chosedProducts, setChosedProducts] = useState([]);
  const [allchecked, setAllchecked] = useState(false);
  const appctx = useContext(AppHook);
  const smsctx = useContext(SMSHook);
  const prodctx = useContext(ProductReportHook);

  // console.log("props", props);
  useEffect(() => {
    setCategory(prodctx.sitedata.categories);
    setBrand(prodctx.sitedata.brands);
  }, [props]);

  useEffect(() => {
    if (allchecked) {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let supid = appctx.userData.company_id.replaceAll('|', '');
      let url = `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${
        supid == 1 ? 13884 : supid
      }`;

      console.log('hi', url);
      fetch(url, requestOptions)
        .then(res => res.json())
        .then(res => {
          console.log('hi', res);
          let ids = [];
          res &&
            res.data.map(x => {
              ids.push(x._id);
            });
          let uniqueIDS = [...new Set(ids)];
          console.log('uniqueIDS', uniqueIDS);
          smsctx.setMultiProductIDS(uniqueIDS);
          setChosedProducts(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [allchecked]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let params = '';

    if (search && search.length >= 3) {
      params += `search=${search.toLowerCase()}&`;
    }
    if (barcode !== null) {
      params += `bar_code=${barcode}&`;
    }
    if (sku !== null) {
      params += `sku=${sku}&`;
    }
    if (onebrand !== null && onebrand !== '') {
      params += `brand=${onebrand}&`;
    }

    if (onecategory !== null && onecategory !== '') {
      params += `category=${onecategory}&`;
    }
    let supid = appctx.userData.company_id.replaceAll('|', '');
    let url = `${
      process.env.REACT_APP_API_URL2
    }/products/get1?${params}supplier=${
      supid == 1 ? 13884 : supid
    }&page=${page}&limit=25`;
    console.log('url new ', url);
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(res => {
        // console.log("res", res);
        let updateProducts = [];
        res.data.map(item => {
          updateProducts.push({
            ...item,
            chosed: false
          });
        });
        setProducts(updateProducts);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [barcode, sku, search, onecategory, onebrand]);

  const ChosedHandler = (item, index) => {
    // console.log("item", item);
    let ids = [];

    if (chosedProducts.length !== 0) {
      chosedProducts.map(item => ids.push(item._id));
      if (ids.includes(item._id)) {
        let aa = chosedProducts.filter(x => x._id !== item._id);
        setChosedProducts(aa);
      } else {
        setChosedProducts([...chosedProducts, item]);
      }
    } else {
      setChosedProducts([...chosedProducts, item]);
    }
  };
  useEffect(() => {
    let newids = [];
    chosedProducts.map(item => {
      newids.push(item._id);
    });
    let uniqueIDS = [...new Set(newids)];
    smsctx.setMultiProductIDS(uniqueIDS);
  }, [chosedProducts]);
  const SaveHandler = () => {
    if (smsctx.collectTitle === null) {
      alert('Та багц бүтээгдэхүүний нэрийг оруулна уу');
      return;
    }
    if (chosedProducts.length === 0) {
      alert('Та багц бүтээгдэхүүн сонгоно уу');
      return;
    }
    let obj = {
      _id: Math.random(),
      title: smsctx.collectTitle,
      products: chosedProducts,
      totalAmount: 0,
      totalQuantity: 0
    };
    console.log(obj);
    smsctx.setMultiProducts(prev => [...prev, obj]);
    smsctx.setMultiProductIDS([]);
    props.setPage(0);
  };
  const SelectAllHandler = () => {
    setAllchecked(!allchecked);
  };
  const CancelHandler = () => {
    props.setPage(0);
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <span>Бүтээгдэхүүний төлөвлөгөө үүсгэх</span>
          <img src={closeIcon} alt='close icon' onClick={CancelHandler} />
        </div>
        <div className={css.body}>
          <div className={css.bodyheader}>
            <input
              placeholder='Багц бүтээгдэхүүний нэр...'
              value={smsctx.collectTitle}
              onChange={e => {
                smsctx.setCollectTitle(e.target.value);
              }}
            />
          </div>

          <div>
            <div className={css.productheader}>
              <div>
                <img
                  src={allchecked ? checked : checkbox}
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                  onClick={SelectAllHandler}
                />
              </div>
              <div
                className={css.one}
                style={{
                  width: widtharray[0]
                }}
              >
                <span>IMG</span>
                <input disabled />
              </div>
              <div
                className={css.one}
                style={{
                  width: widtharray[1]
                }}
              >
                <span>Бүтээгдэхүүний нэр</span>
                <input
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                  }}
                  placeholder='Хайх'
                />
              </div>
              <div
                className={css.one}
                style={{
                  width: widtharray[2]
                }}
              >
                <span>Ангилал</span>

                <select
                  value={onecategory}
                  onChange={e => {
                    setOnecategory(e.target.value);
                  }}
                >
                  <option value={''}>-Category-</option>
                  {category &&
                    category.map((item, index) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                </select>
              </div>
              <div
                className={css.one}
                style={{
                  width: widtharray[3]
                }}
              >
                <span>Брэнд</span>

                <select
                  value={onebrand}
                  onChange={e => {
                    setOnebrand(e.target.value);
                  }}
                >
                  <option value={''}>-Brand-</option>
                  {brand &&
                    brand.map((item, index) => {
                      return (
                        <option value={item.BrandID} key={index}>
                          {item.BrandName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div
                className={css.one}
                style={{
                  width: widtharray[3]
                }}
              >
                <span>Баркод</span>
                <input
                  value={barcode}
                  onChange={e => {
                    setBarcode(e.target.value);
                  }}
                  placeholder='Хайх'
                />
              </div>
              <div
                className={css.one}
                style={{
                  width: widtharray[3]
                }}
              >
                <span>SKU</span>
                <input
                  placeholder='Хайх'
                  value={sku}
                  onChange={e => {
                    setSku(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={css.productbody}>
              {products &&
                products.map((item, index) => {
                  let cat = category.filter(x => x.id === item.category_id)[0];
                  let brandname = brand.filter(
                    x => x.BrandID === item.brand
                  )[0];
                  return (
                    <div
                      className={css.oneproduct}
                      style={{
                        background: item.chosed === true ? '#F2F2F2' : '#fff'
                      }}
                    >
                      <div
                        className={css.onewrapper}
                        // style={{
                        //   width: widtharray[0],
                        // }}
                      >
                        <img
                          src={
                            smsctx.multiProductIDS.includes(item._id)
                              ? checked
                              : checkbox
                          }
                          alt='checkbox'
                          style={{
                            width: '15px',
                            height: '15px'
                          }}
                          onClick={() => ChosedHandler(item, index)}
                        />
                      </div>
                      <div
                        className={css.onewrapper}
                        style={{
                          width: widtharray[0]
                        }}
                      >
                        <img
                          src={
                            item.image
                              ? item.image[0].replace('original', 'product')
                              : `${process.env.REACT_APP_MEDIA_URL}/product/69883d9becbcf663f7f3da1b874eab762cf6581c3ee1d3e81098e6f14aae.jpg`
                          }
                        />
                      </div>
                      <div
                        className={css.onewrapper}
                        style={{
                          width: widtharray[1]
                        }}
                      >
                        <span>{item.name}</span>
                      </div>
                      <div
                        className={css.onewrapper}
                        style={{
                          width: widtharray[2]
                        }}
                      >
                        <span>{cat && cat.name}</span>
                      </div>

                      <div
                        className={css.onewrapper}
                        style={{
                          width: widtharray[3]
                        }}
                      >
                        <span>{brandname && brandname.BrandName}</span>
                      </div>
                      <div
                        className={css.onewrapper}
                        style={{
                          width: widtharray[4]
                        }}
                      >
                        <span>{item.bar_code}</span>
                      </div>
                      <div
                        className={css.onewrapper}
                        style={{
                          width: widtharray[5]
                        }}
                      >
                        <span>{item.sku}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={css.footer}>
          <button className={css.cancel} onClick={CancelHandler}>
            Цуцлах
          </button>
          <button className={css.savebtn} onClick={SaveHandler}>
            Үүсгэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiProductsModal;
