import { Checkbox, Dropdown, Input } from "../common";
import css from "./inventoryHistoryHeader.module.css";

const InventoryHistoryHeader = (props) => {
  const { zIndex } = props;

  return (
    <div className={css.container} style={{ zIndex }}>
      <div>
        <span></span>
      </div>
      <div>
        <span>Дугаар</span>
      </div>
      <div style={{ width: "90px" }}>
        <span>Төлөв</span>
      </div>
      <div style={{ width: "100px" }}>
        <span>Төрөл</span>
      </div>
      <div style={{ width: "250px" }}>
        <span>Орлогодсон агуулах</span>
      </div>
      <div style={{ width: "250px" }}>
        <span>Зарлагадсан агуулах</span>
      </div>
      <div style={{ width: "150px" }}>
        <span>Огноо</span>
      </div>
    </div>
  );
};

export default InventoryHistoryHeader;
