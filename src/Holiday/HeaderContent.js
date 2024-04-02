import css from "./headerContent.module.css";
import HolidayHeader from "../components/Holiday/HolidayHeader";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Маркетинг - Баярын мишээл</h1>
      </div>
      <div className={css.rightSide}>
        <HolidayHeader />
      </div>
    </div>
  );
};
