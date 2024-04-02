import React from "react";
import css from "./noatindextwo.module.css";
import Main from "./components/Body";
import Modal from "./components/modal";
import { ContextStore } from "./hooks/context";
const NoatIndexTwo = () => {
  return (
    <div className={css.container}>
      <ContextStore>
        <Main />
        <Modal />
      </ContextStore>
    </div>
  );
};

export default NoatIndexTwo;
