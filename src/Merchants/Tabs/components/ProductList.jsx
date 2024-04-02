import React from "react";
import css from "./productlist.module.css";
import deleteIcon from "../../../assets/Delete.svg";
import myHeaders from "../../../components/MyHeader/myHeader";

const ProductList = ({
  product,
  key,
  result,
  optionValue,
  products,
  setProducts,
}) => {
  const deleteProduct = () => {
    setProducts(products.filter((e) => e._id !== Number(product._id)));
    let productList = [];
    products.map((e) => productList.push(e._id));
    console.log("productList", productList);
    productList = productList.filter((e) => e !== Number(product._id));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        tradeshop: {
          TradeshopID: result.t_id,
          IncludeProductList:
            optionValue === "included" ? productList.toString() : [],
          ExcludeProductList:
            optionValue === "excluded" ? productList.toString() : [],
        },
        business: {
          CustomerID: result.c_id,
          RegisterNo: result.c_register,
        },
      }),
      redirect: "follow",
    };

    fetch("https://api2.ebazaar.mn/api/merchant/update", requestOptions).then(
      (res) => {
        if (res.status === 200) {
          alert("Success");
        }
      }
    );
  };
  return (
    <div key={key} className={css.listContainer}>
      <div className={css.listGeneral}>
        <div className={css.listSingle}>
          <div className={css.listID}>{product._id}</div>
          <img src={product.image[0]} alt={product.image[0]} />
          <div className={css.listText}>{product.name}</div>
        </div>
        <div className={css.deleteIcon}>
          {optionValue !== "all" && (
            <img
              src={deleteIcon}
              alt=""
              onClick={() => {
                deleteProduct();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
