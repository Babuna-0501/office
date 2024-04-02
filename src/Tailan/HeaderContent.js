import css from "./headerContent.module.css";
import SupplierIndex from "../components/SupplierClass/SupplierIndex";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Нийлүүлэгч нарийвчилсан бүртгэл</h1>
      </div>

      <div className={css.rightSide}>
        <SupplierIndex userData={props.userData} />
      </div>
    </div>
  );
};
