import css from "./inventories.module.css";

import warehouse from "../assets/shipment/warehouse.svg";
import carIcon from "../assets/shipment/carIcon.svg";
import { useState, useEffect, useContext } from "react";
import InventoryDetail from "./components/Inventories/InventoryDetail";
import { ShipmentContext } from "../Hooks/ShipmentHook";

  const warehouseTypeFinder = ({ type }) => {
    let value = "";

    switch (type) {
      case 1:
        value = "Үндсэн агуулах";
        break;
      case 2:
        value = "Салбар агуулах";
        break;
      case 3:
        value = "Шууд борлуулалт (van)";
        break;
      case 4:
        value = "Түгээлтийн машин";
        break;
      case 5:
        value = "Үйлдвэр";
        break;
      default:
        value = "Unknown";
    }

    return value;
  };

  const Inventories = (props) => {
    const { inventories, userData, users, search, selectedInventoryType } =
      props;
    const { isInventory, setIsInventory } = useContext(ShipmentContext);

    const [cars, setCars] = useState([]);
    const [houseInventories, setHouseInventories] = useState([]);

    const [selectedInventory, setSelectedInventory] = useState(null);
    const { isCar, setIsCar } = useContext(ShipmentContext);

    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
      let carInvens = inventories.filter(
        (inventory) => inventory.type === 4 || inventory.type === 3
      );
      let houseInvens = inventories.filter(
        (inventory) => inventory.type !== 4 && inventory.type !== 3
      );

      if (search !== "") {
        carInvens = carInvens.filter(
          (inven) =>
            inven.name.toLowerCase()[0] === search.toLowerCase()[0] &&
            inven.name.toLowerCase().includes(search.toLowerCase())
        );
        houseInvens = houseInvens.filter(
          (inven) =>
            inven.name.toLowerCase()[0] === search.toLowerCase()[0] &&
            inven.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (selectedInventoryType !== "") {
        carInvens = carInvens.filter(
          (inven) => inven.type === Number(selectedInventoryType)
        );
        houseInvens = houseInvens.filter(
          (inven) => inven.type === Number(selectedInventoryType)
        );
      }

      setCars(carInvens);
      setHouseInventories(houseInvens);
    }, [inventories, search, selectedInventoryType]);

    const carClickHandler = (index) => {
      setSelectedInventory(cars[index]);
      setIsInventory(true);
      setIsCar(true);
    };

    const mainInvenClickHandler = (index) => {
      setSelectedInventory(houseInventories[index]);
      setIsInventory(true);
      setIsCar(false);
    };

    return (
      <>
        <div className={css.inventoriesContainer}>
          {houseInventories.length > 0 && (
            <div className={css.topSide}>
              <div className={css.inventoriesWrapper}>
                {houseInventories.map((inventory, index) => {
                  return (
                    <SingleHouseInventory
                      key={`house-inventory-${inventory._id}`}
                      inventory={inventory}
                      clickHandler={() => mainInvenClickHandler(index)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {cars.length > 0 && (
            <div className={css.bottomSide}>
              <div className={css.carsWrapper}>
                {cars.map((car, index) => {
                  return (
                    <SingleCarInventory
                      key={`car-inventory-${car._id}`}
                      car={car}
                      index={index}
                      clickHandler={carClickHandler}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {isInventory && (
          <InventoryDetail
            inventories={inventories}
            inventory={selectedInventory}
            allInventories={inventories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userData={userData}
            isCar={isCar}
            users={users}
          />
        )}
      </>
    );
  };

  export default Inventories;

  const SingleHouseInventory = (props) => {
    const { inventory, clickHandler } = props;

    return (
      <div onClick={clickHandler} className={css.singleInventoryWrapper}>
        <div className={css.singleInventoryInfo}>
          <div className={css.imageWrapper}>
            <img src={warehouse} alt="Warehouse" />
          </div>

          <div className={css.singleInventoryName}>
            <h2 style={{ textOverflow: "ellipsis" }}>{inventory.name}</h2>
            <span>
              {/*  category and products */}
              {/* {productCategoryCount.toLocaleString()} төрөл /{" "}
            {productCount.toLocaleString()} бараа */}
            </span>
          </div>
        </div>

        <div className={css.singleInventoryDetails}>
          <div>
            <span className={css.detailsTitle}>Агуулхын төрөл:</span>
            <span className={css.detailsText}>
              {warehouseTypeFinder({ type: inventory.type })}
            </span>
          </div>

          <div>
            <span className={css.detailsTitle}>Хариуцсан ажилтан:</span>
            <span
              className={css.detailsText}
              style={{ textOverflow: "ellipsis" }}
            >
              {inventory.managerEmail ?? ""}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const SingleCarInventory = (props) => {
    const { car, index, clickHandler } = props;

    return (
      <div
        onClick={() => clickHandler(index)}
        key={index}
        className={css.singleCarWrapper}
      >
        <div className={css.singleCarInfo}>
          <div className={css.imageWrapper}>
            <img src={carIcon} alt="Car" />
          </div>

          <div className={css.singleCarName}>
            <h2>{car.name}</h2>
            {/* <span>
            {productCategoryCount.toLocaleString()} төрөл /{" "}
            {productCount.toLocaleString()} бараа
          </span> */}
          </div>
        </div>

        <div className={css.singleCarDetails}>
          <div>
            <span className={css.detailsTitle}>Агуулхын төрөл:</span>
            <span className={css.detailsText}>
              {warehouseTypeFinder({ type: car.type })}
            </span>
          </div>
          <div>
            <span className={css.detailsTitle}>Хариуцсан ажилтан:</span>
            <span className={css.detailsText}>{car.managerEmail ?? ""}</span>
          </div>
        </div>
      </div>
    );
  };
