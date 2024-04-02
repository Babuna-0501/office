import React, { useState, useEffect, useContext } from "react";
import css from "./baraatatah.module.css";
import Tatah from "./Tatah";
import Header from "./Header";
const data = [250, 100, 100, 250];

const BaraaTatah = (props) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    props.setRawdata(filteredProducts);
  }, [filteredProducts]);

  return (
    <div>
      <Header />
      <div className={css.productheader}>
        <div
          className={css.product}
          style={{
            width: data[0],
          }}
        >
          <span>Нэр</span>
          {/* <input disabled /> */}
        </div>
        <div
          className={css.product}
          style={{
            width: data[1],
          }}
        >
          <span>Үлдэгдэл тоо</span>
          {/* <input disabled /> */}
        </div>
        <div
          className={css.product}
          style={{
            width: data[1],
          }}
        >
          <span>Татан авах тоо</span>
          {/* <input disabled /> */}
        </div>
        <div
          className={css.product}
          style={{
            width: data[2],
            lineHeight: "0.8",
          }}
        >
          <span>Сери дугаар</span>
          {/* <input disabled /> */}
        </div>
        <div
          className={css.product}
          style={{
            width: data[2],
            lineHeight: "0.8",
          }}
        >
          <span>Үйлдвэрлэсэн огноо</span>
          {/* <input disabled /> */}
        </div>

        <div
          className={css.product}
          style={{
            width: data[2],
            lineHeight: "0.8",
          }}
        >
          <span>Огноо дуусахгүй</span>
          {/* <input disabled /> */}
        </div>
      </div>
      <div className={css.productbody}>
        {filteredProducts &&
          filteredProducts
            .sort(function (x, y) {
              return x._id - y._id;
            })
            .map((product, index) => {
              return (
                <Tatah
                  product={product}
                  key={index}
                  setFilteredProducts={setFilteredProducts}
                  filteredProducts={filteredProducts}
                  data={props.data}
                />
              );
            })}
      </div>
    </div>
  );
};

export default BaraaTatah;
