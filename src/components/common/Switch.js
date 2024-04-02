import css from "./switch.module.css";

export const Switch = ({ checked, checkHandler }) => {
  return (
    <div onClick={checkHandler} className={`${css.container} ${checked ? css.checked : ""}`}>
      <div className={css.switch} />
    </div>
  );
};
