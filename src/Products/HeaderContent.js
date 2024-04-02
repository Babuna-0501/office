import css from "./headerContent.module.css";
import ProductReportBtn from "../components/ProductReportBtn/ProductReportBtn";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Бүтээгдэхүүн</h1>
      </div>
      <div className={css.rightSide}>
        <ProductReportBtn
          setPage={props.setPage}
          userData={props.userData}
          suppliers={props.suppliers}
        />
      </div>
    </div>
  );
};
