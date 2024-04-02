// CSS
import css from "./logHeader.module.css";

export const LogHeader = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Лог</h1>
      </div>
    </div>
  );
};
