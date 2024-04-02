import css from "./headerContent.module.css";
import BHeader from "../BorluulaltiinUramshuulal/Header/BHeader";
import RightHeader from "../BorluulaltiinUramshuulal/Header/RightHeader";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <BHeader />
      </div>
      <div className={css.rightSide}>
        <RightHeader userData={props.userData} />
      </div>
    </div>
  );
};
