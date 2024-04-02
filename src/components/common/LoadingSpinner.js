// CSS
import css from "./loadingSpinner.module.css";

export const LoadingSpinner = () => {
  return (
    <div className={css.container}>
      <div className={css.shapeOne} />
      <div className={css.shapeTwo} />
      <div className={css.shapeThree} />
      <div className={css.shapeFour} />
    </div>
  );
};
