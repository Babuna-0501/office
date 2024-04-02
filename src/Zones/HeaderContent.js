import css from "./headerContent.module.css";
import ZonesHeader from "../components/Zones/ZonesHeader";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Бүсчлэл</h1>
      </div>
      <div className={css.rightSide}>
        <ZonesHeader />
      </div>
    </div>
  );
};
