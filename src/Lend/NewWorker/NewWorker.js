import React, { useContext } from "react";
import css from "./newworker.module.css";
import LendHook from "../../Hooks/LendHook";
const NewWorker = () => {
  const lendctx = useContext(LendHook);
  const closeHandler = () => {
    lendctx.setNewWorkers(false);
  };

  return (
    <div className={css.container}>
      <div className={css.background} onClick={closeHandler}></div>
      <div className={css.wrapper}>
        <div className={css.header}>
          <h4 onClick={closeHandler}>Close</h4>
        </div>
        <div className={css.mainwrapper}>
          <div className={css.headertitle}>
            <span>Ажилтны мэдээлэл</span>
          </div>
          <div className={css.onewrapper}>
            <label>Албан тушаал</label>
            <div className={css.inputwrapper}>
              <input />
            </div>
          </div>
          <div className={css.onewrapper}>
            <label>Овог</label>
            <div className={css.inputwrapper}>
              <input />
            </div>
          </div>
          <div className={css.onewrapper}>
            <label>Нэр</label>
            <div className={css.inputwrapper}>
              <input />
            </div>
          </div>
          <div className={css.onewrapper}>
            <label>Регистр №</label>
            <div className={css.inputwrapper}>
              <input />
            </div>
          </div>
          <div className={css.onewrapper}>
            <label>Утасны дугаар</label>
            <div className={css.inputwrapper}>
              <input />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWorker;
