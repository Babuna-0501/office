import css from "./headerContent.module.css";
import NoatHeader from "./Header/NoatHeader";
import SendBtn from "./Header/Sendbtn";

export const HeaderContent = (props) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <NoatHeader setPage={props.setPage} userData={props.userData} />
      </div>
      <div className={css.rightSide}>
        <SendBtn setPage={props.setPage} userData={props.userData} />
      </div>
    </div>
  );
};
