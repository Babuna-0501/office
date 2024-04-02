import css from "./headerContent.module.css";
import ShipmentHeader from "./ShipmentHeader";
import { ShipmentHeaderBtns } from "./ShipmentHeaderBtns";

export const HeaderContent = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <ShipmentHeader />
      </div>
      <div className={css.rightSide}>
        <ShipmentHeaderBtns />
      </div>
    </div>
  );
};
