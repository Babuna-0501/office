import React, { useContext } from "react";

import css from "./zonesheader.module.css";
import ZonesHook from "../../Hooks/ZonesHook";
import { Button } from "../common";

const ZonesHeader = () => {
  const zonesctx = useContext(ZonesHook);
  const ModalHandler = () => {
    zonesctx.setModal(true);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button variant="primary" size="medium" onClick={ModalHandler}>
        Шинээр нэмэх
      </Button>
    </div>
  );
};

export default ZonesHeader;
