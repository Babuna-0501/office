import React, { useState } from 'react';
import css from './addProduct.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import myHeaders from '../../../components/MyHeader/myHeader';
import LoadingSpinner from '../../../components/Spinner/Spinner';
import checkboxIcon from '../../../assets/check box.svg';
import checkedIcon from '../../../assets/Tick Square_green.svg';
import { useEffect } from 'react';
import { Button } from '../common';

const AddProduct = props => {
  const {
    truncater,
    supplier,
    checkedProducts,
    setCheckedProducts,
    setIsProduct,
    fromAguulah,
    toAguulah
  } = props;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [chosenProduct, setChosenProduct] = useState({});
  const [orlogoHistory, setOrlogoHistory] = useState([]);
  const [chosenProductStock, setChosenProductStock] = useState('');
  const [zarlagaHistory, setZarlagaHistory] = useState([]);

  const [isChekedAll, setIsCheckedAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // for filter products
  const [filter, setFilter] = useState({
    bar_code: '',
    name: '',
    sku: '',
    img: ''
  });

  const handleCheckedProducts = ({ product, products }) => {
    const timestamp = new Date().getTime().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    const nonDuplicatable = `${timestamp}${random}`;

    if (products) {
      const productsCopy = [];

      products.map(e => {
        productsCopy.push({ ...e, nonDuplicatable });
      });

      !isChekedAll
        ? setCheckedProducts([...productsCopy])
        : setCheckedProducts([]);
    } else if (product) {
      if (products?.length === checkedProducts?.length) {
        setIsCheckedAll(true);
      } else {
        setIsCheckedAll(false);
      }

      const isIncludes = checkedProducts.some(
        checkedProduct => checkedProduct.bar_code === product.bar_code
      );

      if (isIncludes) {
        const filteredProducts = checkedProducts.filter(
          a => a.bar_code !== product.bar_code
        );
        setCheckedProducts(filteredProducts);
      } else {
        setCheckedProducts([
          ...checkedProducts,
          { ...product, nonDuplicatable }
        ]);
      }
    }
  };

  const handleFilter = e => {
    setPage(1);
    setProducts([]);

    const name = e.target.name;
    const value = e.target.value;

    setFilter({ ...filter, [name]: value });
  };

  const getProducts = async () => {
    try {
      setIsLoading(true);
      let baseUrl = fromAguulah
        ? `${process.env.REACT_APP_API_URL2}/api/warehouse/get/new`
        : `${process.env.REACT_APP_API_URL2}/api/products/get1`;

      const params = fromAguulah
        ? {
            // productPage: page,
            // poruductLimit: 50,
            id: fromAguulah,
            allProducts: true
          }
        : {
            page: page,
            limit: 50,
            ...filter,
            ...(supplier !== '' ? { supplier: supplier.id } : {})
          };

      const queryParams = new URLSearchParams(params).toString();
      const url = `${baseUrl}?${queryParams}`;

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      fromAguulah
        ? page < 2 && setProducts([...resData.data?.[0]?.products])
        : setProducts([...products, ...resData.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductHistory = async () => {
    try {
      let baseUrl = `${process.env.REACT_APP_API_URL2}/api/warehouse/get/new`;

      const params = {
        productId: chosenProduct._id,
        id: fromAguulah ? fromAguulah : toAguulah,
        movementType: 1,
        movementLimit: 200,
        movementPage: 1,
        productMovement: true
      };

      const params2 = {
        productId: chosenProduct._id,
        id: fromAguulah ? fromAguulah : toAguulah,
        movementType: 2,
        movementLimit: 200,
        movementPage: 1,
        productMovement: true
      };

      const queryParams = new URLSearchParams(params).toString();
      const queryParams2 = new URLSearchParams(params2).toString();

      const url = `${baseUrl}?${queryParams}`;
      const url2 = `${baseUrl}?${queryParams2}`;

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const res2 = await fetch(url2, requestOptions);

      const resData = await res.json();
      const resData2 = await res2.json();

      setOrlogoHistory(resData?.data?.[0].movement);
      setZarlagaHistory(resData2?.data?.[0].movement);

      setChosenProductStock(resData?.data?.[0]?.products?.[0]?.stock);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [supplier, filter.bar_code, filter.name, filter.sku, fromAguulah, page]);

  useEffect(() => {
    if ((fromAguulah || toAguulah) && chosenProduct._id) {
      getProductHistory();
    }
  }, [chosenProduct._id]);

  return (
    <div className={css.container}>
      <div className={css.container2}>
        <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
          <h2 style={{ fontWeight: '700', fontSize: '20px' }}>
            Барааны жагсаалт
          </h2>
        </div>
        <div className={css.header}>
          <div
            className={css.oneFieldHeader}
            style={{ flexDirection: 'row', gap: '5px', width: '100px' }}
          >
            <div style={{ display: 'flex', alignItems: 'centers' }}>
              <img
                src={isChekedAll ? checkedIcon : checkboxIcon}
                onClick={() => {
                  setIsCheckedAll(prev => !prev);
                  handleCheckedProducts({ products, isChekedAll: isChekedAll });
                }}
                style={{ width: '20px' }}
              />
            </div>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <span>Barcode</span>
              <input type='text' name='bar_code' onChange={handleFilter} />
            </div>
          </div>
          <div className={css.oneFieldHeader} style={{ width: '200px' }}>
            <span>Бүтээгдэхүүний нэр</span>
            <input type='text' name='name' onChange={handleFilter} />
          </div>
          <div className={css.oneFieldHeader}>
            <span>Бүтээгдэхүүний sku</span>
            <input type='text' name='sku' onChange={handleFilter} />
          </div>
          <div className={css.oneFieldHeader} style={{ width: '80px' }}>
            <span>Зураг</span>
            <input type='text' name='img' onChange={handleFilter} disabled />
          </div>
        </div>
        <div id='productList' className={css.productList}>
          <InfiniteScroll
            dataLength={products?.length}
            next={() => setPage(prev => prev + 1)}
            hasMore={true}
            scrollableTarget='productList'
          >
            {!isLoading ? (
              products.map(product => {
                return (
                  <div
                    className={css.product}
                    key={product.bar_code || Math.random() * 100}
                    onClick={() => {
                      setChosenProduct(product);
                    }}
                    style={
                      chosenProduct._id == product._id
                        ? { backgroundColor: '#ededed' }
                        : {}
                    }
                  >
                    <div
                      className={css.oneFieldBody}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        width: '150px'
                      }}
                    >
                      <img
                        src={
                          checkedProducts?.some(
                            checkedProduct =>
                              checkedProduct.bar_code === product.bar_code
                          )
                            ? checkedIcon
                            : checkboxIcon
                        }
                        onClick={() => {
                          handleCheckedProducts({ product: product });
                        }}
                        style={{ width: '20px' }}
                      />
                      <span
                        style={{
                          textAlign: 'center',
                          lineHeight: '50px'
                        }}
                      >
                        {product.bar_code}
                      </span>
                    </div>
                    <div
                      className={css.oneFieldBody}
                      style={{ width: '300px' }}
                    >
                      <span>{truncater(product.name, 50)}</span>
                    </div>
                    <div className={css.oneFieldBody}>
                      <span>{product.sku}</span>
                    </div>
                    <div className={css.oneFieldBody}>
                      <img
                        src={
                          product.image[0] ||
                          `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
                        }
                        alt={product._id}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px'
                }}
              >
                <LoadingSpinner />
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
      <div className={css.container3}>
        <div className={css.productBalance}>
          <div className={css.left}>
            <img
              src={chosenProduct?.image?.[0]}
              alt={chosenProduct?.image?.[0]}
              style={{ width: '120px', height: '90px', objectFit: 'contain' }}
            />
          </div>
          <div className={css.right}>
            <span>Үлдэгдэл: {chosenProductStock} ш</span>
            <span>Нэр: {chosenProduct.name}</span>
            <span>Barcode: {chosenProduct.bar_code}</span>
          </div>
        </div>
        <div className={css.productHistory}>
          <span style={{ fontWeight: '700', fontSize: '18px' }}>
            Бараа орлогодсон түүх
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className={css.oProducts}>
              <div className={css.header}>
                <span>Сери дугаар</span>
                <span>Огноо</span>
                <span>Хаанаас</span>
                <span>Тоо хэмжээ</span>
                <span>Үнэ</span>
                <span>Зарах үнэ</span>
              </div>
              {orlogoHistory.map(product => {
                return (
                  <div className={css.oProduct} key={product?._id}>
                    <span>{product?.seriesId}</span>
                    <span>{product?.date?.slice(0, 10)}</span>
                    <span>{product?.warehouseId}</span>
                    <span>{product?.stock}</span>
                    <span>{product?.buyPrice}</span>
                    <span>{product?.sellPrice}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={css.productHistory}>
          <span style={{ fontWeight: '700', fontSize: '18px' }}>
            Бараа зарлагадсан түүх
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className={css.oProducts}>
              <div className={css.header}>
                <span>Сери дугаар</span>
                <span>Огноо</span>
                <span>Хаанаас</span>
                <span>Тоо хэмжээ</span>
                <span>Үнэ</span>
                <span>Зарах үнэ</span>
              </div>
              {zarlagaHistory.map(product => {
                return (
                  <div className={css.oProduct} key={product?._id}>
                    <span>{product?.seriesId}</span>
                    <span>{product?.date?.slice(0, 10)}</span>
                    <span>{product?.warehouseId}</span>
                    <span>{product?.stock}</span>
                    <span>{product?.buyPrice}</span>
                    <span>{product?.sellPrice}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={css.footer}>
          <Button
            onClick={() => {
              setIsProduct(false);
            }}
          >
            Хадгалах
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
