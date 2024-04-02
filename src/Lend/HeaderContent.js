import css from "./headerContent.module.css";
import LendHeader from "../components/Lend/LendHeader";
import LendButtons from "../components/Lend/LendButtons";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <LendHeader />
      </div>
      <div className={css.rightSide}>
        <LendButtons />
      </div>
    </div>
  );
};
