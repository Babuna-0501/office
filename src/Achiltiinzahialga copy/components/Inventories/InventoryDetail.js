import { useState, useEffect, useContext } from "react";
import css from "./intentoryDetail.module.css";
import InventoryProducts from "./InventoryProducts";
import InventoryHistory from "./InventoryHistory";
import { ShipmentContext } from "../../../Hooks/ShipmentHook";

const InventoryDetail = (props) => {
  const { inventory, allInventories, userData, isCar, users } = props;
  const { setIsInventory, setInvName } = useContext(ShipmentContext);

  const tabs = [
    {
      id: 1,
      header: "Бүтээгдэхүүн",
      content: (
        <InventoryProducts
          inventory={inventory}
          allInventories={allInventories}
          userData={userData}
          isCar={isCar}
          users={users}
          key={`inventory-detail-products`}
        />
      ),
    },
    {
      id: 2,
      header: "Ачилтын захиалгын түүх",
      content: <InventoryHistory key={`inventory-history`} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    setInvName(inventory.name);

    return () => {
      setIsInventory(false);
    };
  }, []);

  return (
    <div className={css.inventoryDetailContainer}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <div className={css.tabHeaders}>
            {tabs.map((tab, index) => {
              return (
                <button
                  key={`inventory-detail-tab-header-${index}`}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`${css.singleTabHeader} ${
                    activeTab === tab.id && css.active
                  }`}
                >
                  {tab.header}
                </button>
              );
            })}
          </div>
        </div>

        <div className={css.contentWrapper}>
          {tabs.find((tab) => tab.id === activeTab).content}
        </div>
      </div>
    </div>
  );
};

export default InventoryDetail;
