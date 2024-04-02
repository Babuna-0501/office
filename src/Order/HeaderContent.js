import css from "./headerContent.module.css";
import Date from "./Date/Date";
import OrderStatus from "./OrderStatus/Orderstatus";
import Suppliers from "./Suppliers/Suppliers";
import OrderReportBtn from "../components/OrderReportBtn/OrderReportBtn";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Захиалга</h1>
        <div className={css.filters}>
          <Date />
          <OrderStatus />
          <Suppliers />
        </div>
      </div>
      <div className={css.rightSide}>
        <OrderReportBtn userData={props.userData} />
      </div>
    </div>
  );
};
