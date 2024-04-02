// CSS
import css from "./pbiHeader.module.css";

const PBIHeader = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Тайлан</h1>
      </div>
    </div>
  );
};

export default PBIHeader;
