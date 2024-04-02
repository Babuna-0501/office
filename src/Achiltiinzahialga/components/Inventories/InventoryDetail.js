import { useState, useEffect, useContext } from "react";
import css from "./intentoryDetail.module.css";
import InventoryProducts from "./InventoryProducts";
import InventoryHistory from "./InventoryHistory";
import { ShipmentContext } from "../../../Hooks/ShipmentHook";
import ProductHistory from "./productsHistory/productHistory";

const InventoryDetail = (props) => {
  const { inventory, allInventories, userData, isCar, users, inventories } =
    props;
  const { setIsInventory, setInvName } = useContext(ShipmentContext);
  const [productData, setProductData] = useState(null);

  const tabs = [
    {
      id: 1,
      header: "Бүтээгдэхүүн",
      content: (
        <InventoryProducts
          inventory={inventory}
          allInventories={allInventories}
          setActiveTab={props.setActiveTab}
          setProductData={setProductData}
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
      content: (
        <InventoryHistory
          key={`inventory-history`}
          inventories={inventories}
          inventory={inventory}
        />
      ),
    },
    {
      id: 3,
      header: "Хөдөлгөөн",
      content: (
        <ProductHistory
          productData={productData}
          inventory={inventory}
          setActiveTab={props.setActiveTab}
        />
      ),
    },
  ];

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
                  onClick={() => props.setActiveTab(tab.id)}
                  className={`${css.singleTabHeader} ${
                    props.activeTab === tab.id && css.active
                  }`}
                >
                  {tab.header}
                </button>
              );
            })}
          </div>
        </div>

        <div className={css.contentWrapper}>
          {tabs.find((tab) => tab.id === props.activeTab).content}
        </div>
      </div>
    </div>
  );
};

export default InventoryDetail;
