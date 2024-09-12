import React, { useState, useContext, useEffect } from 'react';
import css from './productmodal.module.css';
import closeIcon from '../../assets/close.svg';
import checkbox from '../../assets/check box.svg';
import checked from '../../assets/Tick Square_green.svg';
import SMSHook from '../../Hooks/SMSHook';
import myHeaders from '../../components/MyHeader/myHeader';
import AppHook from '../../Hooks/AppHook';
import { replaceImageUrl } from '../../utils';

const widtharray = [50, 150, 100, 100, 100, 100, 100];

const Productmodal = props => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState(null);
  const [onecategory, setOnecategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [onebrand, setOnebrand] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [sku, setSku] = useState(null);
  const [allchecked, setAllchecked] = useState(false);
  const [supplierCategories, setSupplierCategories] = useState([]);
  const smsctx = useContext(SMSHook);
  const appctx = useContext(AppHook);
  // console.log("props", props);
  useEffect(() => {
    let ids = [];

    props.sitedata &&
      props.sitedata.categories
        .filter(x => x.parent_id === 0)
        .map(item => {
          ids.push(item.id);
        });
    setSupplierCategories(ids);
    setCategory(props.sitedata.categories);
    setBrand(props.sitedata.brands);
    let supid = appctx.userData.company_id.replaceAll('|', '');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${
      supid == 1 ? 13884 : supid
    }`;
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(res => {
        if (res.data && res.data.supplier_is_active) {
          let data = JSON.parse(res.data.supplier_is_active);
          if (data.categories && data.categories.length !== 0) {
            setSupplierCategories(data.categories);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
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
          smsctx.setChosedProdIDS(uniqueIDS);
        })
        .catch(error => {
          console.log(error);
        });
      let aa = products.map(item => {
        return {
          ...item,
          chosed: true
        };
      });

      setProducts(aa);
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
    // console.log("url new ", url);
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(res => {
        // console.log("res", res);
        let updateProducts = [];
        res.data.map(item => {
          if (
            smsctx.chosedProdIDS.length !== 0 &&
            smsctx.chosedProdIDS.includes(item._id)
          ) {
            updateProducts.push({
              ...item,
              chosed: true
            });
          } else {
            updateProducts.push({
              ...item,
              chosed: false
            });
          }
        });
        setProducts(updateProducts);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [barcode, sku, search, onecategory, onebrand]);

  const ChosedHandler = (item, index) => {
    if (item.chosed === true) {
      if (smsctx.chosedProdIDS.includes(item._id)) {
        let aa = smsctx.chosedProdIDS;
        aa = aa.filter(e => e !== item._id);
        smsctx.setChosedProdIDS(aa);
      }
    }
    if (item.chosed === false) {
      if (smsctx.chosedProdIDS.includes(item._id) === false) {
        smsctx.setChosedProdIDS(prev => [...prev, item._id]);
      }
    }

    let update = products.map((x, i) => {
      if (item._id === x._id) {
        return {
          ...x,
          chosed: item.chosed === true ? false : true
        };
      } else {
        return {
          ...x
        };
      }
    });

    setProducts(prev => [...update]);
  };

  const SingleProductHandler = () => {
    let uniqueIDS = [...new Set(smsctx.chosedProdIDS)];
    if (uniqueIDS.length === 0) {
      alert('Та бүтээгдэхүүнээ сонгоно уу');
      return;
    }

    smsctx.setChosedProdIDS(uniqueIDS);
    smsctx.setProductModal(false);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <span>Бүтээгдэхүүний төлөвлөгөө үүсгэх</span>
          <img
            src={closeIcon}
            alt='close icon'
            onClick={() => {
              smsctx.setProductModal(false);
              smsctx.setCollecttrue(false);
            }}
          />
        </div>
        <div className={css.body}>
          {smsctx.collecttrue && (
            <div className={css.bodyheader}>
              <input
                placeholder='Багц бүтээгдэхүүний нэр...'
                value={smsctx.collectTitle}
                onChange={e => {
                  smsctx.setCollectTitle(e.target.value);
                }}
              />
            </div>
          )}

          <div>
            <div className={css.productheader}>
              <div>
                <img
                  src={allchecked ? checked : checkbox}
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                  onClick={() => {
                    setAllchecked(!allchecked);
                  }}
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
                {/* <input
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                /> */}
                <select
                  value={onecategory}
                  onChange={e => {
                    setOnecategory(e.target.value);
                  }}
                >
                  <option value={''}>-Category-</option>

                  {category &&
                    category
                      .filter(x => supplierCategories.includes(x.parent_id))
                      .map((item, index) => {
                        return (
                          <option
                            value={item.id}
                            // style={{
                            //   display: supplierChannels.includes(item.id)
                            //     ? "block"
                            //     : "none",
                            // }}
                          >
                            {item.name}
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
                          src={item.chosed === true ? checked : checkbox}
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
                              ? replaceImageUrl(
                                  item.image[0].replace('original', 'product')
                                )
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
          <button
            className={css.cancel}
            onClick={() => {
              smsctx.setProductModal(false);
              smsctx.setCollecttrue(false);
            }}
          >
            Цуцлах
          </button>
          <button className={css.savebtn} onClick={SingleProductHandler}>
            Үүсгэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productmodal;
