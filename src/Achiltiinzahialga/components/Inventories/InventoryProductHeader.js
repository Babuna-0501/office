import css from "./inventoryProductHeader.module.css";
import { Dropdown } from "../common/Dropdown";
import { Checkbox } from "../common/Checkbox";
import { Input } from "../common/Input";

const InventoryProductHeader = (props) => {
  const {
    zIndex,
    checkHandler,
    checked,
    categories,
    name,
    setName,
    category,
    setCategory,
    barcode,
    setBarcode,
    sku,
    setSku,
    price,
    setPrice,
  } = props;

  return (
    <div className={css.headerContainer} style={{ zIndex }}>
      <div className={css.wrapper}>
        {/* Checkbox to select all shipments */}
        <div
          className={css.fieldWrapper}
          style={{
            width: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Checkbox onChange={checkHandler} checked={checked} />
        </div>

        {/* Picture */}
        <div className={css.fieldWrapper} style={{ width: 78 }}>
          <span className={css.fieldTitle}>Зураг</span>
          <Input size="small" disabled />
        </div>

        {/* Product Name */}
        <div className={css.fieldWrapper} style={{ width: 200 }}>
          <span className={css.fieldTitle}>Бүтээгдэхүүний нэр</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            type="text"
            placeholder="Хайх"
          />
        </div>

        {/* Categories */}
        <div className={css.fieldWrapper} style={{ width: 150 }}>
          <span className={css.fieldTitle}>Ангилал</span>
          <Dropdown name="inventory-product-header" />
        </div>

        {/* Remaining */}
        <div className={css.fieldWrapper} style={{ width: 150 }}>
          <span className={css.fieldTitle}>Үлдэгдэл</span>
          <Dropdown name="inventory-product-remaining" />
        </div>

        {/* Barcode */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.fieldTitle}>Баркод</span>
          <Input
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            size="small"
            type="text"
            placeholder="Хайх"
          />
        </div>

        {/* SKU */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.fieldTitle}>SKU</span>
          <Input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            size="small"
            type="text"
            placeholder="Хайх"
          />
        </div>

        {/* Price */}
        <div className={css.fieldWrapper} style={{ width: 90 }}>
          <span className={css.fieldTitle}>Үнэ</span>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            size="small"
            type="text"
            placeholder="Хайх"
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryProductHeader;
