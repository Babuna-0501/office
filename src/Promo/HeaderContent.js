import css from "./headerContent.module.css";
import PromoHeader from "./components/Header/PromoHeader";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Promo</h1>
      </div>
      <div className={css.rightSide}>
        <PromoHeader />
      </div>
    </div>
  );
};
