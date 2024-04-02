import React, { useContext } from "react";
import css from "./tdays.module.css";
import TdaysHook from "../../Hooks/TdaysHook";
import { Button } from "../common";

const Tdays = () => {
  const tdaysctx = useContext(TdaysHook);
  const selectHandler = () => {
    tdaysctx.setNewDays(true);
  };
  return (
    <Button variant="primary" size="medium" onClick={selectHandler} width={170}>
      Шинээр нэмэх
    </Button>
  );
};

export default Tdays;
