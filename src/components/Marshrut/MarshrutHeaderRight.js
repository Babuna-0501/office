import React, { useContext } from "react";
import css from "./marshrutheaderright.module.css";
import XTHook from "../../Hooks/XtHook";
import { Button } from "../common";

const MarshrutHeaderRight = () => {
  const xtctx = useContext(XTHook);

  return (
    <div className={css.container}>
      {xtctx.page === 0 && (
        <Button variant="primary" size="medium">
          Ажилтан нэмэх
        </Button>
      )}
    </div>
  );
};

export default MarshrutHeaderRight;
