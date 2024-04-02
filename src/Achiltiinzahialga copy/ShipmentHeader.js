import css from "./shipmentHeader.module.css";
import arrowLefticon from "../assets/Arrow - Right.svg";
import { useContext } from "react";
import { ShipmentContext } from "../Hooks/ShipmentHook";

const ShipmentHeader = () => {
  const { isInventory, setIsInventory, invName, setInvName } =
    useContext(ShipmentContext);

  return (
    <div className={css.container}>
      <span
        className={css.wrapper}
        onClick={() => {
          setIsInventory(false);
          setInvName("");
        }}
      >
        Ачилтын захиалга
      </span>
      {isInventory && (
        <div className={css.sub}>
          <img src={arrowLefticon} alt="sdfd" />
          <span className={css.wrapperspan}>{invName}</span>
        </div>
      )}
    </div>
  );
};

export default ShipmentHeader;
