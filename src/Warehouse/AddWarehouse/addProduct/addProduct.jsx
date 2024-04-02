import React, { useEffect, useState } from "react";
import css from "./addProduct.module.css";
import { styles } from "../style";
import { Button } from "../../../components/common";
import checkedIcon from "../../../assets/Tick Square_green.svg";
import checkboxIcon from "../../../assets/check box.svg";
import InfiniteScroll from "react-infinite-scroll-component";

const AddProduct = ({
  products,
  searchid,
  setSearchid,
  searchvalue,
  setSearchvalue,
  searchsku,
  setSearchsku,
  checkedProducts,
  setCheckedProducts,
  setIsModal,
  filterPage,
  setFilterPage,
}) => {
  const handleCheckedProducts = ({ product }) => {
    const isIncludes = checkedProducts.some(
      (checkedProduct) => checkedProduct._id === product._id
    );

    if (isIncludes) {
      const filteredProducts = checkedProducts.filter(
        (a) => a._id !== product._id
      );
      setCheckedProducts(filteredProducts);
    } else {
      setCheckedProducts([...checkedProducts, product]);
    }
  };


  return (
    <div className={css.container}>
      <div className={css.headerTitle}>Барааны жагсаалт</div>
      <div className={css.tableContainer}>
        <div className={css.tableHeader}>
          <div className={css.column}>
            <div className={css.headerColumn}>
              <span>ID</span>
              <input
                placeholder="Хайх"
                value={searchid}
                onChange={(e) => setSearchid(e.target.value)}
              />
            </div>
          </div>
          <div className={css.column} style={{ width: "250px" }}>
            <div className={css.headerColumn}>
              <span>Бүтээгдэхүүний нэр</span>
              <input
                placeholder="Хайх"
                value={searchvalue}
                onChange={(e) => setSearchvalue(e.target.value)}
              />
            </div>
          </div>
          <div className={css.column}>
            <div className={css.headerColumn}>
              <span>Бүтээгдэхүүний sku</span>
              <input
                placeholder="Хайх"
                value={searchsku}
                onChange={(e) => setSearchsku(e.target.value)}
              />
            </div>
          </div>
          <div className={css.column}>
            <div className={css.headerColumn}>
              <span>Зураг</span>
              <input disabled />
            </div>
          </div>
        </div>
        <div id="scrollableDiv" className={css.rows}>
          <InfiniteScroll
            dataLength={products.length}
            next={() => setFilterPage(filterPage + 1)}
            hasMore={true}
            // loader={
            //   loading === true && <div className={css.loading}>... Loading</div>
            // }
            scrollableTarget="scrollableDiv"
          >
            {products.map((product, idx) => (
              <div className={css.tableRow} key={idx}>
                <div className={css.column}>
                  <img
                    src={
                      checkedProducts.some(
                        (checkedProduct) => checkedProduct._id === product._id
                      )
                        ? checkedIcon
                        : checkboxIcon
                    }
                    onClick={() => {
                      handleCheckedProducts({ product: product });
                    }}
                    style={{ boxSizing: "border-box", marginRight: "10px" }}
                  />

                  <span>{product._id}</span>
                </div>
                <div className={css.column} style={{ width: "250px" }}>
                  <span>{product.name}</span>
                </div>
                <div className={css.column}>
                  <span>{product.sku}</span>
                </div>
                <div className={css.column}>
                  <div className={css.imgContainer}>
                    <img src={product.image[0]} alt="img" />
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
      <div
        className={css.footer}
        onClick={() => {
          setSearchsku("");
          setSearchid("");
          setSearchvalue("");
          setIsModal(false);
        }}
      >
        <Button>Нэмэх</Button>
      </div>
    </div>
  );
};

export default AddProduct;
