import React, { useState, useEffect } from "react";
import css from "./productavatar.module.css";

const ProductAvatar = (props) => {
  const [avatar, setAvatar] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    setAvatar(props?.data);
    let aa = 0;
    props?.data?.line?.map((item) => {
      aa = aa + 1;
    });
    setTotal(aa);
  }, [props]);

  let images = avatar.line?.slice(0, 3).map((l, index) => {
    if (l.product_image) {
      let image =
        l.product_image.split(",").length === 0
          ? l.product_image
          : l.product_image.split(",")[0];
      return (
        <li className={css.avatars__item} key={index}>
          <img
            src={image.replace("original", "small")}
            alt="product"
            className={css.avatars__img}
          />
        </li>
      );
    }
  });
  let backgimage = avatar.line?.slice(4, 5).map((l, index) => {
    if (l.product_image) {
      let image =
        l.product_image.split(",").length === 0
          ? l.product_image
          : l.product_image.split(",")[0];
      return (
        <img
          src={image.replace("original", "small")}
          alt="product"
          className={css.avatars__imgBack}
          key={index}
        />
      );
    }
  });
  let bbb;

  if (avatar.line?.length > 3) {
    bbb = (
      <li className={css.avatars__itemBack}>
        <span className={css.avatars__others}>+{total - 3}</span>
        {backgimage}
      </li>
    );
  } else {
    bbb = "";
  }
  return (
    <ul className={css.avatars}>
      {images}

      {bbb}
    </ul>
  );
};

export default ProductAvatar;
