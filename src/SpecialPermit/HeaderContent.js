import css from "./headerContent.module.css";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Харилцагчийн медиа</h1>
      </div>
    </div>
  );
};
