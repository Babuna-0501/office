import { useState } from "react";
import { createContext } from "react";

export const ShipmentContext = createContext(null);

export const ShipmentProvider = ({ children }) => {
  const [isInventory, setIsInventory] = useState(false);
  const [isCar, setIsCar] = useState(false);
  const [createInventoryShipmentOrder, setCreateInventoryShipmentOrder] =
    useState(false);
  const [shipmentReturn, setShipmentReturn] = useState(false);
  const [invName, setInvName] = useState("");
  const [addInventory, setAddInventory] = useState(false);

  const value = {
    isInventory,
    setIsInventory,
    createInventoryShipmentOrder,
    setCreateInventoryShipmentOrder,
    shipmentReturn,
    setShipmentReturn,
    invName,
    setInvName,
    addInventory,
    setAddInventory,
    isCar,
    setIsCar,
  };

  return (
    <ShipmentContext.Provider value={value}>
      {children}
    </ShipmentContext.Provider>
  );
};
