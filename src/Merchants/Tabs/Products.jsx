import React, { useState } from 'react';
import css from './products.module.css';
import ProductList from './components/ProductList';
import { Modal } from '../../components/common/Modal';
import ProductConfig from './components/ProductConfig';
import { useEffect } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '../../components/Spinner/Spinner';

const Products = ({
  getSupplier,
  includedConfig,
  userResult,
  includeProductList,
  excludeProductList
}) => {
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [optionValue, setOptionValue] = useState('all');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 50
  });

  useEffect(() => {
    setProducts([]);
  }, [optionValue]);

  useEffect(() => {
    getSupplier();
  }, [userResult?.t_phone, userResult?.t_id]);

  const fetchData = async () => {
    const queryParams = new URLSearchParams(filters);
    const url = `${
      process.env.REACT_API_URL2
    }/products/get1?suppliers=${includedConfig.toString()}&${queryParams}`;
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      setProducts([...products, ...resData.data]);
      setIsLoading(false);
    } catch (error) {
      console.error('An error occurred:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ((optionValue === 'all' && includedConfig) || modal) {
      fetchData();
    }
  }, [includedConfig, filters.page, filters, optionValue]);

  useEffect(() => {
    let url;
    if (optionValue === 'included') {
      url = `${process.env.REACT_APP_API_URL2}/api/products/get1?ids=[${includeProductList}]`;
    } else if (optionValue === 'excluded') {
      url = `${process.env.REACT_APP_API_URL2}/api/products/get1?ids=[${excludeProductList}]`;
    }

    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      try {
        const res = await fetch(url, requestOptions);
        const resData = await res.json();
        setProducts([...products, ...resData.data]);
        setIsLoading(false);
      } catch (error) {
        console.error('An error occurred:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [optionValue]);

  return (
    <div className={css.container}>
      <div className={css.optionContainer}>
        <select
          onChange={e => {
            setProducts([]);
            setIsLoading(true);
            setOptionValue(e.target.value);
          }}
          value={optionValue}
        >
          <option value='all'>Бүх бараа</option>
          <option value='included'>Зөвшөөрөгдсөн бараа</option>
          <option value='excluded'>Зөвшөөрөгдөөгүй бараа</option>
        </select>
      </div>
      <button
        style={
          optionValue === 'all'
            ? {
                cursor: 'not-allowed',
                opacity: '0.5'
              }
            : {}
        }
        className={css.addBtn}
        disabled={optionValue === 'all'}
        onClick={() => {
          setIsLoading(true);
          fetchData();
          setModal(true);
        }}
      >
        Нэмэх +
      </button>
      <div id='productsList' className={css.productsList}>
        <InfiniteScroll
          dataLength={products?.length || 0}
          next={() =>
            setFilters({
              ...filters,
              page: filters.page + 1
            })
          }
          hasMore={true}
          loader={
            isLoading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70vh'
                }}
              >
                <LoadingSpinner />
              </div>
            ) : (
              products?.length === 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <span>
                    {optionValue === 'included'
                      ? 'Зөвшөөрөгдсөн бараа '
                      : 'Зөвшөөрөгдөөгүй бараа '}
                    олдсонгүй ...
                  </span>
                </div>
              )
            )
          }
          scrollableTarget='productsList'
        >
          {products.map((product, index) => (
            <ProductList
              product={product}
              key={index}
              result={userResult}
              optionValue={optionValue}
              includeProductList={includeProductList}
              excludeProductList={excludeProductList}
              setProducts={setProducts}
              products={products}
            />
          ))}
        </InfiniteScroll>
      </div>

      {modal && (
        <Modal className={css.modalContainer} width={1400} height={800}>
          <ProductConfig
            setPage={setPage}
            page={page}
            modal={modal}
            setModal={setModal}
            products={products}
            setProducts={setProducts}
            filters={filters}
            setFilters={setFilters}
            isLoading={isLoading}
            result={userResult}
            optionValue={optionValue}
            checkedProducts={checkedProducts}
            setCheckedProducts={setCheckedProducts}
            setOptionValue={setOptionValue}
            includeProductList={includeProductList}
            excludeProductList={excludeProductList}
            getSupplier={getSupplier}
            fetchData={fetchData}
          />
        </Modal>
      )}
    </div>
  );
};

export default Products;
