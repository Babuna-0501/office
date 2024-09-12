import { useEffect, useState } from "react";
import css from "./product.module.css";

export const Product = (props) => {
  const { product, newAcceptedPros, setNewAcceptedPros, selectAll } = props;

  const isChecked = newAcceptedPros.includes(product._id);
  const [checked, setChecked] = useState(isChecked);
  console.log(product)
  useEffect(() => {
    if (selectAll) {
      if (!newAcceptedPros.includes(product._id)) {
        const updatedPros = [...newAcceptedPros, product._id];
        setNewAcceptedPros(updatedPros);
      }
    }
  }, [product._id, newAcceptedPros, selectAll]);

  const handleChecked = () => {
    const updatedPros = isChecked
      ? newAcceptedPros.filter((id) => id !== product._id)
      : [...newAcceptedPros, product._id];

    setNewAcceptedPros(updatedPros);
  };

  useEffect(() => {
    if (isChecked !== checked) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  return (
    <div className={css.container}>
      <input type="checkbox" checked={checked} onChange={handleChecked}></input>
      <img className={css.picture} src={product?.image[0]} alt="product" />
      <div className={css.text}>{product?.name}</div>
    </div>
  );
};
