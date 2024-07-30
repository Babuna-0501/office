import { useEffect } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';
import InventoryHistoryHeader from './InventoryHistoryHeader';
import css from './inventoryHistory.module.css';

import SingleInventoryHistory from './singleInventoryHistory/singleInventoryHistory';
import { useState } from 'react';
const InventoryHistory = props => {
  const { inventories, inventory } = props;
  const [shipments, setShipmets] = useState([]);

  const getShipments = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL2}/api/shipment/get/final?statuses=[3,4]&warehouse=${inventory._id}`;

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      setShipmets(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inventory) {
      getShipments();
    }
  }, [inventory]);

  return (
    <div className={css.historyContainer}>
      <InventoryHistoryHeader />
      <div className={css.historiesContainer}>
        {shipments.map(shipment => (
          <SingleInventoryHistory
            inventories={inventories}
            inventory={inventory}
            shipment={shipment}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryHistory;
