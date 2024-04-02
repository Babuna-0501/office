import css from "./headerContent.module.css";
import Tdays from "../components/Tdays/Tdays";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Түгээлтийн өдрийн хуваарь</h1>
      </div>

      <div className={css.rightSide}>
        <Tdays />
      </div>
    </div>
  );
};
