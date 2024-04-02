import css from "./headerContent.module.css";
import Promo from "../components/Promo/Promo";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Хямдрал, урамшуулал</h1>
      </div>
      <div className={css.rightSide}>
        <Promo />
      </div>
    </div>
  );
};
