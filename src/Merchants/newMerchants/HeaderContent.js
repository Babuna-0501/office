import css from "./headerContent.module.css";
import MerchantRequest from "../../components/MerchantRequest/MerchantRequest";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Харилцагчийн хүсэлт</h1>
      </div>
      <div className={css.rightSide}>
        <MerchantRequest data={props.data} />
      </div>
    </div>
  );
};
