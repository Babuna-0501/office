import React from "react";
import css from "./products.module.css";
import checkboxicon from "../../assets/check box.svg";
import chechboxchecked from "../../assets/Tick Square on 2.svg";
const data = [250, 100, 100, 250];
const Products = (props) => {
  //   console.log("props product", props);
  const SelectHandler = (product) => {
    let copyProducts = [...props.products];
    copyProducts.find((x) => x._id === product._id).chosed = !product.chosed;
    props.setProducts(copyProducts);
  };
  return (
    <div>
      <div className={css.productheader}>
        <div
          className={css.product}
          style={{
            width: data[0],
          }}
        >
          <span>Name</span>
          <input />
        </div>
        <div
          className={css.product}
          style={{
            width: data[1],
          }}
        >
          <span>Stock</span>
          <input />
        </div>
        <div
          className={css.product}
          style={{
            width: data[2],
            lineHeight: "0.8",
          }}
        >
          <span>Агуулахын үлдэгдэл</span>
          <input />
        </div>
      </div>
      <div className={css.productbody}>
        {props.products &&
          props.products.map((product, index) => {
            let stock = "";
            if (props.data) {
              stock = props.data[product._id]?.stock[0];
              //   console.log("stock", stock);
            }

            return (
              <div className={css.productwrapper} key={product._id}>
                <div
                  style={{
                    width: data[0],
                  }}
                  className={css.prod}
                  onClick={() => SelectHandler(product)}
                >
                  <img
                    src={product.chosed ? chechboxchecked : checkboxicon}
                    alt={product.name}
                  />
                  <span>{product.name}</span>
                </div>
                <span
                  style={{
                    width: data[1],
                  }}
                >
                  {product.stock}
                </span>
                <span
                  style={{
                    width: data[2],
                  }}
                >
                  {stock ? stock : null}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
