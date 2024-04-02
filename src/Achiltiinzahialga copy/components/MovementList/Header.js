import css from "./header.module.css";
import { Dropdown, Input } from "../common";

const Header = (props) => {
  const {
    zIndex,
    inventories,
    users,
    number,
    setNumber,
    outInventory,
    setOutInventory,
    inInventory,
    setInInventory,
    createdDate,
    setCreatedDate,
    createdUser,
    setCreatedUser,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    searchType,
    setSearchType,
  } = props;

  return (
    <div className={css.headerContainer} style={{ zIndex }}>
      <div className={css.wrapper}>
        {/* Id Field */}
        <div className={css.fieldWrapper} style={{ width: 100 }}>
          <span className={css.fieldTitle}>Дугаар</span>
          <Input
            size="small"
            type="text"
            placeholder="Хайх"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        {/* Status */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.fieldTitle}>Төлөв</span>
          <Dropdown
            value={selectedStatus}
            onChangeHandler={setSelectedStatus}
            datas={[
              { label: "Хүлээгдэж буй", value: 1 },
              { label: "Баталгаажсан", value: 2 },
              { label: "Цуцлагдсан", value: 3 },
            ]}
            name="shipment-header-status"
          />
        </div>

        {/* Items Field */}
        <div className={css.fieldWrapper} style={{ width: 160 }}>
          <span className={css.fieldTitle}>Ачилт</span>
          <Input size="small" type="text" disabled />
        </div>

        {/* Price Field */}
        <div className={css.fieldWrapper} style={{ width: 130 }}>
          <span className={css.fieldTitle}>Нийт үнэ</span>
          <Input size="small" type="text" disabled />
        </div>

        {/* Outgoing Warehouse */}
        <div className={css.fieldWrapper} style={{ width: 150 }}>
          <span className={css.fieldTitle}>Гарсан агуулах</span>
          <Dropdown
            value={outInventory}
            onChangeHandler={setOutInventory}
            datas={inventories.map((inv) => ({
              value: inv._id,
              label: inv.name,
            }))}
            name="shipment-header-outgoing-warehouse"
          />
        </div>

        {/* Incoming Warehouse */}
        <div className={css.fieldWrapper} style={{ width: 150 }}>
          <span className={css.fieldTitle}>Авах агуулах</span>
          <Dropdown
            value={inInventory}
            onChangeHandler={setInInventory}
            datas={inventories.map((inv) => ({
              value: inv._id,
              label: inv.name,
            }))}
            name="shipment-header-incoming-warehouse"
          />
        </div>

        {/* Created Date */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.fieldTitle}>Үүссэн огноо</span>
          <Input
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
            size="small"
            type="date"
          />
        </div>

        {/* Hariutsagch */}
        <div className={css.fieldWrapper} style={{ width: 140 }}>
          <span className={css.fieldTitle}>Хариуцагч</span>
          <Dropdown
            value={createdUser}
            onChangeHandler={setCreatedUser}
            datas={users
              .filter((user) => user.first_name)
              .map((user) => ({
                value: user.user_id,
                label: user.first_name,
              }))}
            name="shipment-header-hariutsagch"
          />
        </div>

        {/* Type */}
        <div className={css.fieldWrapper} style={{ width: 140 }}>
          <span className={css.fieldTitle}>Төрөл</span>
          <Dropdown
            value={searchType}
            onChangeHandler={setSearchType}
            datas={[
              { label: "Ачилт", value: 1 },
              { label: "Хөдөлгөөн", value: 2 },
              { label: "Буцаалт", value: 3 },
            ]}
            name="shipment-header-types"
          />
        </div>

        {/* Return */}
        <div className={css.fieldWrapper} style={{ width: 120 }}>
          <span className={css.fieldTitle}>Буцаасан бараа</span>
          <Dropdown name="shipment-header-return" />
        </div>
      </div>
    </div>
  );
};

export default Header;
