import css from "./movementList.module.css";

import Header from "./components/MovementList/Header";
import { useEffect, useState } from "react";
import SingleMovement from "./components/MovementList/SingleMovement";
import LoadingSpinner from "../components/Spinner/Spinner";

const MovementList = (props) => {
  const [searchType, setSearchType] = useState("");
  const [newMovements, setNewMovements] = useState([]);

  const {
    inventories,
    products,
    users,
    shipments: initialMovements,
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
    shipmentCallAgain,
    userData,
    getShipments,
  } = props;

  const [movements, setMovements] = useState([]);
  const [oldMovements, setOldMovements] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    let initialMovementsCopy = JSON.parse(JSON.stringify(initialMovements));

    const shipmentUsers = [];
    const movementUsers = [];
    for (const user of users) {
      if ([1, 2, 4].includes(user.role)) {
        movementUsers.push(user.user_id);
      } else {
        shipmentUsers.push(user.user_id);
      }
    }

    initialMovementsCopy = initialMovementsCopy.map((movement) => {
      if (shipmentUsers.includes(movement.createUser)) {
        return { ...movement, myOrigin: 1 };
      }

      if (movementUsers.includes(movement.createUser)) {
        return { ...movement, myOrigin: 2 };
      }
      return { ...movement };
    });

    initialMovementsCopy = initialMovementsCopy.map((movement) => {
      const fromInven = inventories.find((inven) => inven._id === movement.from);
      const toInven = inventories.find((inven) => inven._id === movement.to);

      if (movement.myOrigin === 1 && movement.tugeegchID) {
        return { ...movement, shipmentNewType: 1 };
      }

      if (movement.myOrigin === 1 && !movement.tugeegchID) {
        return { ...movement, shipmentNewType: 2 };
      }

      if (movement.myOrigin === 1 && !fromInven && !toInven) {
        return { ...movement, shipmentNewType: 1 };
      }

      if (fromInven && toInven) {
        if (movement.myOrigin === 2 && fromInven.type === 3 && toInven.type === 2) {
          return { ...movement, shipmentNewType: 3 };
        }

        if (movement.myOrigin === 2 && (fromInven.type !== 3 || toInven.type !== 2)) {
          return { ...movement, shipmentNewType: 2 };
        }
      }

      return { ...movement };
    });

    setMovements(initialMovementsCopy.map((obj) => ({ ...obj })));
    setOldMovements(initialMovementsCopy.map((obj) => ({ ...obj })));
    setLoading(false);
  }, [initialMovements, inventories, users]);

  useEffect(() => {
    if (oldMovements.length > 0) {
      if (Number(searchType) === 1) {
        const filteredMovements = oldMovements.filter(
          (movement) => movement.shipmentNewType === Number(searchType)
        );
        setNewMovements(filteredMovements);
      } else if (Number(searchType) === 2) {
        const filteredMovements = oldMovements.filter(
          (movement) => movement.shipmentNewType === Number(searchType)
        );
        setNewMovements(filteredMovements);
      } else if (Number(searchType) === 3) {
        const filteredMovements = oldMovements.filter(
          (movement) => movement.shipmentNewType === Number(searchType)
        );
        setNewMovements(filteredMovements);
      } else {
        setMovements(oldMovements);
      }
    }
  }, [searchType]);

  useEffect(() => {
    if (newMovements.length > 0) {
      setMovements(newMovements);
    }
  }, [newMovements]);

  return (
    <div className={css.movementListContainer}>
      <Header
        zIndex={movements.length + 1}
        inventories={inventories}
        users={users}
        {...{
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
        }}
      />

      {!loading && !shipmentCallAgain && movements.length === 0 && (
        <div className={css.loadingSpinner}>
          <span>Илэрц олдсонгүй</span>
        </div>
      )}

      {!loading && !shipmentCallAgain && movements.length > 0 && (
        <div className={css.contentContainer}>
          {movements.map((movement, index) => {
            return (
              <SingleMovement
                key={`single-movement-row-${movement._id}`}
                zIndex={movements.length - index}
                movement={movement}
                allMovements={movements}
                inventories={inventories}
                products={products}
                setMovements={setMovements}
                users={users}
                userData={userData}
                getShipments={getShipments}
              />
            );
          })}
        </div>
      )}
      {(loading || shipmentCallAgain) && (
        <div className={css.loadingSpinner}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default MovementList;
