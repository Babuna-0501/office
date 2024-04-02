import InventoryHistoryHeader from "./InventoryHistoryHeader";
import css from "./inventoryHistory.module.css";

const InventoryHistory = () => {
  return (
    <div className={css.historyContainer}>
      <InventoryHistoryHeader />
    </div>
  );
};

export default InventoryHistory;
