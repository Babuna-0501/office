import css from "./headerContent.module.css";
import CollectionHeader from "../components/CollectionHeader/CollectionHeader";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Collection</h1>
      </div>
      <div className={css.rightSide}>
        <CollectionHeader />
      </div>
    </div>
  );
};
