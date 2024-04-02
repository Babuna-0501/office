import { useContext } from "react";
import { Button } from "./components/common";
import { ShipmentContext } from "../Hooks/ShipmentHook";
import CollectionHook from "../Hooks/CollectionHook";

export const ShipmentHeaderBtns = () => {
  const warectx = useContext(CollectionHook);

  const {
    isInventory,
    setCreateInventoryShipmentOrder,
    setShipmentReturn,
    setAddInventory,
    isCar,
  } = useContext(ShipmentContext);

  return (
    <div
      style={{
        marginRight: 14,
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      {!isInventory && (
        <Button
          onClick={() => setAddInventory(true)}
          variant="primary"
          size="medium"
        >
          Агуулах нэмэх
        </Button>
      )}
      <Button
        variant="primary"
        size="medium"
        onClick={() => {
          warectx.setOrlogoType(true);
        }}
      >
        Бараа татах
      </Button>

      {isInventory && isCar && (
        <>
          <Button
            onClick={() => setCreateInventoryShipmentOrder(true)}
            variant="primary"
            size="medium"
            width={140}
          >
            Ачилт
          </Button>
          <Button
            onClick={() => setShipmentReturn(true)}
            variant="primary"
            size="medium"
            width={140}
          >
            Хөдөлгөөн
          </Button>
        </>
      )}
    </div>
  );
};
