import css from "./headerContent.module.css";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Борлуулалтын орлого</h1>
      </div>
      {/* <div className={css.rightSide}>
        <MerchantReportBtn />
      </div> */}
    </div>
  );
};
