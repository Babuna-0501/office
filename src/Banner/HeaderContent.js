import css from "./headerContent.module.css";
import BannerHeader from "../components/BannerHeader/BannerHeader";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Маркетинг - Баннер</h1>
      </div>
      <div className={css.rightSide}>
        <BannerHeader />
      </div>
    </div>
  );
};
