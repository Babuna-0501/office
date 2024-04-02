import css from "./headerContainer.module.css";

export const HeaderContainer = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Буцаалт</h1>
      </div>
    </div>
  );
};
