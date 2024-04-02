import React, { useContext } from "react";

import css from "./warehouseindex.module.css";
import { Button } from "../common";
import CollectionHook from "../../Hooks/CollectionHook";

const WarehouseIndex = (props) => {
  const warectx = useContext(CollectionHook);
  // console.log("props", props);
  const permission = Object.values(JSON.parse(props.userData.permission))[0];
  // console.log("permission", permission.inventory);
  const wareHouseHandler = () => {
    warectx.setNewWarehouseOpen(true);
  };
  const baraaTatahHandler = () => {
    // warectx.setBaraaTatah(true);
    warectx.setOrlogoType(true);
  };
  return (
    <div className={css.container}>
      <Button variant="primary" size="medium" onClick={baraaTatahHandler}>
        Бараа татах
      </Button>

      {(permission.inventory.admin || permission.inventory.create) && (
        <Button variant="primary" size="medium" onClick={wareHouseHandler}>
          Шинэ агуулах нэмэх
        </Button>
      )}
    </div>
  );
};

export default WarehouseIndex;
