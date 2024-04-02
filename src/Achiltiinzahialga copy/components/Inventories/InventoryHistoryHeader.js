import { Checkbox, Dropdown, Input } from "../common";
import css from "./inventoryHistoryHeader.module.css";

const InventoryHistoryHeader = (props) => {
  const { zIndex } = props;

  return (
    <div className={css.headerContainer} style={{ zIndex }}>
      <div className={css.wrapper}>
        {/* Checkbox*/}
        <div
          className={css.fieldWrapper}
          style={{
            width: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Checkbox />
        </div>

        {/* Shipment Number */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.fieldTitle}>Ачилтын дугаар</span>
          <Input size="small" placeholder="Хайх" />
        </div>

        {/* Status */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.fieldTitle}>Төлөв</span>
          <Dropdown />
        </div>

        {/* Products */}
        <div className={css.fieldWrapper} style={{ width: 150 }}>
          <span className={css.fieldTitle}>Бүтээгдэхүүн</span>
          <Input size="small" type="text" disabled />
        </div>

        {/* Date */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.fieldTitle}>Огноо</span>
          <Input type="date" size="small" />
        </div>

        {/* Inventory */}
        <div className={css.fieldWrapper} style={{ width: 150 }}>
          <span className={css.fieldTitle}>Харьцсан агуулах</span>
          <Dropdown />
        </div>

        {/* Hariutsagch */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.fieldTitle}>Хариуцагч</span>
          <Dropdown />
        </div>

        {/* Type */}
        <div className={css.fieldWrapper} style={{ width: 100 }}>
          <span className={css.fieldTitle}>Төрөл</span>
          <Dropdown />
        </div>

        {/* Direction */}
        <div className={css.fieldWrapper} style={{ width: 100 }}>
          <span className={css.fieldTitle}>Чиглэл</span>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default InventoryHistoryHeader;
