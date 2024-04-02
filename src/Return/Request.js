import React, { useState, useEffect, useContext } from "react";
import Price from "./Price";
import Info from "./Info";
import Media from "./Media";
import Map from "./Map";
import myHeaders from "../components/MyHeader/myHeader";

function Product(props) {
  // console.log(props)
  let [product, setProduct] = useState(props.data);
  let [productVisibility, setProductVisibility] = useState(product.is_active);
  let [price, setPrice] = useState(null);
  let [info, setInfo] = useState(null);
  let [media, setMedia] = useState(null);
  let [map, setMap] = useState(null);
  let image = null;
  if (product && product.image) {
    image =
      product.image.split(",").length === 0
        ? product.image
        : product.image.split(",")[0];
  } else {
    image = "https://ebazaar.mn/icon/photo-add.svg";
  }
  const setVisibility = () => {
    var raw = JSON.stringify({
      ProductID: product.id,
      isActive: productVisibility === 0 ? 1 : 0,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("https://api2.ebazaar.mn/api/product/update", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 200) {
          setProductVisibility(productVisibility === 0 ? 1 : 0);
        } else {
          alert("Алдаа гарлаа. Please try again.");
        }
      });
  };
  let supplierName = "";
  props.suppliers.map((s) => {
    if (s.id === product.supplier_id) {
      supplierName = s.name;
    }
  });
  let productCategory = "";
  if (props.categories && product.category_id) {
    props.categories.map((c) => {
      if (c.id === product.category_id) {
        productCategory = c.name;
      }
    });
  }
  let brand = "";
  if (parseInt(product.brand, 10) > 0) {
    props.brands.map((brand) => {
      if (brand.BrandID === product.brand) {
        brand = brand.BrandName;
        // console.log(brand);
      }
    });
  }
  return product ? (
    <>
      <div className="row">
        <div style={{ width: "120px" }}>
          <input type="checkbox" id={product.id} />
          <span onClick={() => setInfo(!info)} className="recordid">
            {product.id}
          </span>
        </div>
        <div style={{ width: "80px" }}>
          <span onClick={() => setVisibility()}>
            {productVisibility === 0 ? (
              <img src="https://ebazaar.link/media/off.svg" alt="" />
            ) : (
              <img src="https://ebazaar.link/media/on.svg" alt="" />
            )}
          </span>
        </div>
        <div
          style={{
            width: "200px",
            display: props.userData.company_id === "|1|" ? "block" : "none",
          }}
        >
          {supplierName}
        </div>
        <div style={{ width: "80px" }} onClick={() => setMedia(true)}>
          <img
            src={
              image && image !== "https://ebazaar.mn/icon/photo-add.svg"
                ? image.replace("original", "product")
                : image
            }
            alt=""
            className="product-image"
          />
        </div>
        <div style={{ width: "320px" }}>{product.name}</div>
        <div style={{ width: "120px" }}>{product.priority}</div>
        <div style={{ width: "240px" }}>{productCategory}</div>
        <div style={{ width: "120px" }}>{product.bar_code}</div>
        <div style={{ width: "120px" }}>{brand}</div>
        <div style={{ width: "120px" }}>{product.sku}</div>
        <div style={{ width: "120px" }}>
          <span onClick={() => setPrice(!price)}>
            {product.price ? product.price.toLocaleString() : null}₮
          </span>
        </div>
        <div style={{ width: "120px" }}>
          <span>{product.in_case}</span>
        </div>
        <div style={{ width: "120px" }} onClick={() => setMap(true)}>
          <span>Map</span>
        </div>
      </div>
      <div>
        {price ? (
          <Price
            setPrice={setPrice}
            product={product}
            setProduct={setProduct}
          />
        ) : null}
        {info ? (
          <Info
            setInfo={setInfo}
            product={product}
            setProduct={setProduct}
            categories={props.categories}
          />
        ) : null}
        {media ? (
          <Media
            setMedia={setMedia}
            product={product}
            setProduct={setProduct}
          />
        ) : null}
        {map ? <Map /> : null}
      </div>
    </>
  ) : null;
}

export default Product;
