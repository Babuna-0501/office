import css from "./headerContent.module.css";
import UpointHeader from "../components/Upoint/UpointHeader";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Upoint</h1>
      </div>

      <div className={css.rightSide}>
        <UpointHeader userData={props.userData} />
      </div>
    </div>
  );
};
