import css from "../newMerchants/headerContent.module.css";
// import MerchantReportBtn from "../components/MerchantReportBtn/MerchantReportBtn";

export const HeaderContent = (props) => {
  const { sfa } = props;
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>{sfa ? "Merchants" : "Accounts"}</h1>
      </div>
      <div className={css.rightSide}>{/* <MerchantReportBtn /> */}</div>
    </div>
  );
};
