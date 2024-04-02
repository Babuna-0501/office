import css from "./headerContent.module.css";
import WheelHeader from "../components/Wheel/WheelHeader";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Маркетинг - Хүрд</h1>
      </div>
      <div className={css.rightSide}>
        <WheelHeader />
      </div>
    </div>
  );
};
