import css from "./inventories.module.css";

import warehouse from "../assets/shipment/warehouse.svg";
import carIcon from "../assets/shipment/carIcon.svg";
import { useState, useEffect, useContext } from "react";
import InventoryDetail from "./components/Inventories/InventoryDetail";
import { ShipmentContext } from "../Hooks/ShipmentHook";

const Inventories = (props) => {
  const { inventories, userData, users, search, selectedInventoryType } = props;
  const { isInventory, setIsInventory } = useContext(ShipmentContext);

  const [cars, setCars] = useState([]);
  const [houseInventories, setHouseInventories] = useState([]);

  const [selectedInventory, setSelectedInventory] = useState(null);
  const { isCar, setIsCar } = useContext(ShipmentContext);

  useEffect(() => {
    let carInvens = inventories.filter((inventory) => inventory.type === 3);
    let houseInvens = inventories.filter((inventory) => inventory.type === 2);

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
          inventory={selectedInventory}
          allInventories={inventories}
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

  const [productCount, setProductCount] = useState(0);
  const [productCategoryCount, setProductCategoryCount] = useState(0);

  useEffect(() => {
    const calcCounts = async () => {
      try {
        let productCountCopy = 0;
        let productCategoryCountCopy = 0;

        for (const product of inventory.products) {
          productCountCopy += product[Object.keys(product)[0]];
          productCategoryCountCopy++;
        }

        setProductCategoryCount(productCategoryCountCopy);
        setProductCount(productCountCopy);
      } catch (error) {
        console.log(error);
      }
    };

    calcCounts();
  }, [inventory]);

  return (
    <div onClick={clickHandler} className={css.singleInventoryWrapper}>
      <div className={css.singleInventoryInfo}>
        <div className={css.imageWrapper}>
          <img src={warehouse} alt="Warehouse" />
        </div>

        <div className={css.singleInventoryName}>
          <h2 style={{ textOverflow: "ellipsis" }}>{inventory.name}</h2>
          <span>
            {productCategoryCount.toLocaleString()} төрөл /{" "}
            {productCount.toLocaleString()} бараа
          </span>
        </div>
      </div>

      <div className={css.singleInventoryDetails}>
        <div>
          <span className={css.detailsTitle}>Агуулхын төрөл:</span>
          <span className={css.detailsText}>Үндсэн агуулах</span>
        </div>

        <div>
          <span className={css.detailsTitle}>Хариуцсан ажилтан:</span>
          <span
            className={css.detailsText}
            style={{ textOverflow: "ellipsis" }}
          >
            {inventory.manager ?? ""}
          </span>
        </div>
      </div>
    </div>
  );
};

const SingleCarInventory = (props) => {
  const { car, index, clickHandler } = props;

  const [productCount, setProductCount] = useState(0);
  const [productCategoryCount, setProductCategoryCount] = useState(0);

  useEffect(() => {
    const calcCounts = async () => {
      try {
        let productCountCopy = 0;
        let productCategoryCountCopy = 0;

        for (const product of car.products) {
          productCountCopy += product[Object.keys(product)[0]];
          productCategoryCountCopy++;
        }

        setProductCategoryCount(productCategoryCountCopy);
        setProductCount(productCountCopy);
      } catch (error) {
        console.log(error);
      }
    };

    calcCounts();
  }, [car]);

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
          <span>
            {productCategoryCount.toLocaleString()} төрөл /{" "}
            {productCount.toLocaleString()} бараа
          </span>
        </div>
      </div>

      <div className={css.singleCarDetails}>
        <div>
          <span className={css.detailsTitle}>Агуулхын төрөл:</span>
          <span className={css.detailsText}>Машин</span>
        </div>

        <div>
          <span className={css.detailsTitle}>Хариуцсан ажилтан:</span>
          <span className={css.detailsText}>{car.manager ?? ""}</span>
        </div>
      </div>
    </div>
  );
};
