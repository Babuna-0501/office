import css from "./headerContent.module.css";
import MarshrutHeader from "../components/Marshrut/MarshrutHeader";
import MarshrutHeaderRight from "../components/Marshrut/MarshrutHeaderRight";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <MarshrutHeader setPage={props.setPage} />
      </div>
      <div className={css.rightSide}>
        <MarshrutHeaderRight setPage={props.setPage} />
      </div>
    </div>
  );
};
