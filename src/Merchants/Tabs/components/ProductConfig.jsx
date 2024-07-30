import React, { useEffect, useState } from 'react';
import css from './productconfig.module.css';
import LoadingSpinner from '../../../components/Spinner/Spinner';
import close from '../../../assets/close.svg';
import checkedBox from '../../../assets/Tick Square on 2.svg';
import checkBox from '../../../assets/Tick Square.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import myHeaders from '../../../components/MyHeader/myHeader';

const ProductConfig = props => {
  useEffect(() => {
    const productList =
      props.optionValue === 'included'
        ? props.includeProductList
        : props.excludeProductList;

    const productListArray = productList.split(',');
    const initialCheckedProducts = productListArray.map(Number).filter(Boolean);

    props.setCheckedProducts(initialCheckedProducts);
  }, [props.optionValue, props.includeProductList, props.excludeProductList]);

  const handleSave = () => {
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        tradeshop: {
          TradeshopID: props.result.t_id,
          IncludeProductList:
            props.optionValue === 'included'
              ? props.checkedProducts.toString()
              : [],
          ExcludeProductList:
            props.optionValue === 'excluded'
              ? props.checkedProducts.toString()
              : []
        },
        business: {
          CustomerID: props.result.c_id,
          RegisterNo: props.result.c_register
        }
      }),
      redirect: 'follow'
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/merchant/update`,
      requestOptions
    ).then(res => {
      if (res.status === 200) {
        alert('Success');
        props.setModal(false);
      }
    });

    props.getSupplier();
    props.setOptionValue('all');
  };

  const handleInputChange = e => {
    props.setFilters({
      ...props.filters,
      page: 1
    });
    props.setProducts([]);
    const { name, value } = e.target;
    props.setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.headerTitle}>Бараануудын тохиргоо</div>
        <div
          onClick={() => {
            props.setOptionValue('all');
            props.setModal(false);
          }}
        >
          <img src={close} alt='close' />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          height: '95%'
        }}
      >
        <div className={css.filters}>
          <div className={css.filter}>
            <span>ID</span>
            <input
              type='text'
              name='id'
              value={props.filters.id}
              onChange={handleInputChange}
            />
          </div>
          <div className={css.filter}>
            <span>Name</span>
            <input
              type='text'
              name='search'
              value={props.filters.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={css.filter}>
            <span>Barcode</span>
            <input
              type='text'
              name='bar_code'
              value={props.filters.bar_code}
              onChange={handleInputChange}
            />
          </div>
          <div className={css.filter}>
            <span>Нийлүүлэгч</span>
            <input
              type='text'
              name='supplier'
              value={props.filters.supplier}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div id='productsContainer' className={css.products}>
          <InfiniteScroll
            dataLength={props.products?.length || 0}
            next={() =>
              props.setFilters({
                ...props.filters,
                page: props.filters.page + 1
              })
            }
            hasMore={true}
            loader={
              props.isLoading ? (
                <div className={css.loading}>
                  <LoadingSpinner />
                </div>
              ) : (
                <div className={css.loading}>
                  <span>Бараа олдсонгүй</span>
                </div>
              )
            }
            scrollableTarget='productsContainer'
          >
            {props.products.map((e, index) => (
              <div className={css.product} key={index}>
                <img
                  src={
                    props.checkedProducts.includes(e._id)
                      ? checkedBox
                      : checkBox
                  }
                  onClick={() => {
                    const index = props.checkedProducts.indexOf(e._id);
                    if (index !== -1) {
                      const updatedProducts = [...props.checkedProducts];
                      updatedProducts.splice(index, 1);
                      props.setCheckedProducts(updatedProducts);
                    } else {
                      props.setCheckedProducts([
                        ...props.checkedProducts,
                        e._id
                      ]);
                    }
                  }}
                  alt={e.name}
                />
                <span>{e._id}</span>
                <span>{e.name}</span>
                <span>{e.bar_code}</span>
                <span>{e.supplier_id}</span>
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <div className={css.footer}>
          <button
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductConfig;
