import css from "./product.module.css";

export const AcceptedProducts = (props) => {
  const { acceptedProList } = props;

  return acceptedProList.length > 0 ? (
    acceptedProList.map((product) => {
      return (
        <div key={product._id} className={css.container}>
          <img className={css.picture} src={product?.image[0]} alt="product" />
          <div className={css.text}>{product.name}</div>
        </div>
      );
    })
  ) : (
    <div className={css.container}>Бүтээгдэхүүн тохируулаагүй байна .</div>
  );
};
