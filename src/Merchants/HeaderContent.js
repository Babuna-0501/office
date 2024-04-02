import css from "./headerContent.module.css";
import MerchantReportBtn from "../components/MerchantReportBtn/MerchantReportBtn";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Мерчант</h1>
      </div>
      <div className={css.rightSide}>
        <MerchantReportBtn />
      </div>
    </div>
  );
};
