import React, { useState, useContext } from "react";
import css from "./supplierindex.module.css";
import SupplierHook from "../../Hooks/SupplierHook";
import { Button } from "../common";
const SupplierIndex = () => {
  const supctx = useContext(SupplierHook);
  return (
    <div className={css.container}>
      <Button
        variant="primary"
        size="medium"
        onClick={() => {
          supctx.setDataopen(true);
        }}
      >
        Шинээр нэмэх
      </Button>
    </div>
  );
};

export default SupplierIndex;
