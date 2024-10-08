import React, { useEffect, useState, useContext } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import css from './products.module.css';
import closeicon from '../../assets/close.svg';
import checkbox from '../../assets/check box.svg';
import checked from '../../assets/Tick Square_green.svg';
import { styles } from './style';
import SMSHook from '../../Hooks/SMSHook';
import { replaceImageUrl } from '../../utils';

const Products = props => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [supplier, setSupplier] = useState(props.supID ? props.supID : null);
  const [barcode, setBarcode] = useState(null);
  const [sku, setSku] = useState(null);
  const [productid, setProductid] = useState(null);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState(null);
  const [productname, setProductname] = useState(null);
  const [brand, setBrand] = useState(null);
  const [price, setPrice] = useState(null);
  const [createdate, setCreatedate] = useState(null);
  let smsctx = useContext(SMSHook);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let params = '';
    if (supplier !== null) {
      params += `supplier=${supplier}&`;
    }
    if (search && search.length >= 3) {
      params += `search=${search}&`;
    }
    if (barcode !== null) {
      params += `bar_code=${barcode}&`;
    }
    if (sku !== null) {
      params += `sku=${sku}&`;
    }
    if (productid !== null) {
      params += `id=${productid}&`;
    }
    if (category !== null) {
      params += `category=${category}&`;
    }

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/products/get1?${params}page=${page}&limit=50`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        // console.log("res", res);
        // let update = res.data.map((item) => {
        //   if (
        //     smsctx.prodIDS.length !== 0 &&
        //     smsctx.prodIDS.includes(item._id)
        //   ) {
        //     return {
        //       ...item,
        //       chosed: true,
        //     };
        //   } else {
        //     return {
        //       ...item,
        //       chosed: false,
        //     };
        //   }
        // });

        let update = res.data.map(item => {
          return {
            ...item,
            chosed: false
          };
        });
        setData(update);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [page, productid, barcode, sku, search, supplier]);
  const ChosedHandler = item => {
    // if (smsctx.prodIDS.length !== 0 && smsctx.prodIDS.includes(item._id)) {
    //   let update = smsctx.prodIDS.filter((x) => x !== item._id);
    //   smsctx.setProdIDS(update);
    // } else {
    //   smsctx.setProdIDS((prev) => [...prev, item._id]);
    // }

    // let update = item;
    // update.chosed = update.chosed === false ? true : false;
    let product = { ...item, qty: 1 };

    let update = [...data];
    update = update.map(x => {
      if (x._id === item._id) {
        return {
          ...x,
          chosed: x.chosed === true ? false : true
        };
      }
      return x;
    });
    props.setProduct(prev => [...prev, product]);
    setData(prev => [...update]);
  };
  const ChosedHandlerOne = item => {
    let aa = [...data];
    aa.find(x => x._id === item._id).chosed = !item.chosed;
    setData(aa);
  };
  return (
    <div className={css.background}>
      <div className={css.wrapper}>
        <div>
          <div className={css.closewrapper}>
            <span>Бүтээгдэхүүн нэмэх</span>{' '}
            <img
              src={closeicon}
              onClick={() => {
                props.onClose(false);
              }}
            />
          </div>
          <div className={css.body}>
            <div className={css.header}>
              <div
                className={css.checkedcontainer}
                style={{
                  ...styles.checkboxcontainer
                }}
              >
                <img src={checkbox} />
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.idcontainer
                }}
              >
                <span>ID</span>
                <input
                  value={productid}
                  onChange={e => {
                    setProductid(e.target.value);
                  }}
                />
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.supplierContainer
                }}
              >
                <span>Нийлүүлэгч </span>
                <input
                  value={supplier}
                  onChange={e => {
                    setSupplier(e.target.value);
                  }}
                />
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.imageContainer
                }}
              >
                <span>IMG </span>
                {/* <input /> */}
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.productContainer
                }}
              >
                <span>Бүтээгдэхүүн нэр </span>
                <input
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.angilalContainer
                }}
              >
                <span>Ангилал</span>
                <input
                  value={category}
                  onChange={e => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.brandContainer
                }}
              >
                <span>Брэнд</span>
                <input
                  value={brand}
                  onChange={e => {
                    setBrand(e.target.value);
                  }}
                />
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.priceContainer
                }}
              >
                <span>Үнэ</span>
                <input
                  value={price}
                  onChange={e => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.dateContainer
                }}
              >
                <span>Үүссэн огноо</span>
                <input
                  type='date'
                  value={createdate}
                  onChange={e => {
                    setCreatedate(e.target.value);
                  }}
                />
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.skuContainer
                }}
              >
                <span>SKU</span>
                <input
                  value={sku}
                  onChange={e => {
                    setSku(e.target.value);
                  }}
                />
              </div>
              <div
                className={css.idcontainer}
                style={{
                  ...styles.barcodeContainer
                }}
              >
                <span>Баркод</span>
                <input
                  value={barcode}
                  onChange={e => {
                    setBarcode(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={css.product}>
              {data &&
                data.map((item, index) => {
                  let priceValue = 0;
                  let priceKeys = Object.keys(item.locations);
                  if (priceKeys.length !== 0) {
                    priceValue =
                      item.locations[priceKeys[0]]?.price?.channel['1'];
                  }

                  return (
                    <div
                      className={css.oneproduct}
                      key={index}
                      style={{
                        display:
                          props.prodIDS && props.prodIDS.includes(item._id)
                            ? 'none'
                            : 'flex'
                      }}
                      onClick={() => ChosedHandlerOne(item)}
                    >
                      <div
                        className={css.onechecked}
                        style={{
                          ...styles.checkboxcontainer
                        }}
                      >
                        <img
                          src={item && item.chosed ? checked : checkbox}
                          // src={checkbox}
                          alt='check box'
                          onClick={() => ChosedHandler(item)}
                        />
                      </div>
                      <div
                        className={css.oneid}
                        style={{
                          ...styles.idcontainer
                        }}
                      >
                        <span>{item && item._id}</span>
                      </div>
                      <div
                        className={css.onesup}
                        style={{
                          ...styles.supplierContainer
                        }}
                      >
                        <span>
                          {item && item.supplier_id && item.supplier_id}
                        </span>
                      </div>
                      <div
                        className={css.onesup}
                        style={{
                          ...styles.imageContainer
                        }}
                      >
                        <img
                          src={
                            item && item.image
                              ? replaceImageUrl(item.image[0])
                              : `${process.env.REACT_APP_MEDIA_URL}/product/69883d9becbcf663f7f3da1b874eab762cf6581c3ee1d3e81098e6f14aae.jpg`
                          }
                        />
                      </div>
                      <div
                        className={css.onesup}
                        style={{
                          ...styles.productContainer
                        }}
                      >
                        <span>{item && item.name && item.name}</span>
                      </div>
                      <div
                        className={css.onesup}
                        style={{
                          ...styles.angilalContainer
                        }}
                      >
                        <span>
                          {item && item.category_id && item.category_id}
                        </span>
                      </div>
                      <div
                        className={css.onesup}
                        style={{
                          ...styles.brandContainer
                        }}
                      >
                        <span>
                          {item && item.category_id && item.category_id}
                        </span>
                      </div>
                      <div
                        className={css.onesup}
                        style={{
                          ...styles.priceContainer
                        }}
                      >
                        <span>{`${priceValue && priceValue}₮`}</span>
                      </div>
                      <div
                        className={css.onesup}
                        style={{
                          ...styles.dateContainer
                        }}
                      >
                        <span>
                          {item &&
                            item.created_date &&
                            item.created_date.split('T')[0]}
                        </span>
                      </div>
                      <div
                        className={css.onesup}
                        style={{
                          ...styles.skuContainer
                        }}
                      >
                        <span>{item && item.sku && item.sku}</span>
                      </div>
                      <div
                        className={css.onesup}
                        style={{
                          ...styles.barcodeContainer
                        }}
                      >
                        <span>{item && item.barcode && item.bar_code}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={css.btncontainer}>
          <button
            className={css.cancel}
            onClick={() => {
              props.onClose(false);
            }}
          >
            Цуцлах
          </button>
          <button
            className={css.confirm}
            onClick={() => {
              props.onClose(false);

              // props.setProdids(smsctx.prodIDS);
              // smsctx.setProdIDS([]);
              if (data.length !== 0) {
                let newdata = data.filter(x => x.chosed);
                props.confirm(newdata);
              }
            }}
          >
            {props.btnTitle ? props.btnTitle : 'Nemeh'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
