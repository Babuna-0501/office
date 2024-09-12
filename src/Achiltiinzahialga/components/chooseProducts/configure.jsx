import React, { useContext, useEffect, useState } from 'react';
import css from './configure.module.css';
import myHeaders from '../../../components/MyHeader/myHeader';
import { GlobalContext } from '../../../Hooks/GlobalContext';

const Configure = props => {
  const {
    setIsProduct,
    supplier,
    setSupplier,
    toAguulah,
    setToAguulah,
    fromAguulah,
    setFromAguulah,
    description,
    setDescription
  } = props;
  const { suppliers } = useContext(GlobalContext);

  const [warehouseOption, setWarehouseOption] = useState([]);

  const supplierOption = [];

  suppliers
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(supplier => {
      supplierOption.push({ name: supplier.name, value: supplier.id });
    });

  const getWarehouses = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL2}/api/warehouse/get/new`;
      if (supplier.id) {
        url = `${process.env.REACT_APP_API_URL2}/api/warehouse/get/new?supplierId=${supplier.id}`;
      }
      console.log(url);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      const warehouses = resData.data;
      const warehouseOptionCopy = [];

      if (warehouses?.length > 0) {
        warehouses
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(warehouse => {
            warehouseOptionCopy.push({
              name: warehouse.name,
              value: warehouse._id
            });
          });

        setWarehouseOption(warehouseOptionCopy);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, [supplier.id]);

  return (
    <div className={css.container}>
      <div className={css.inputWrapper}>
        <span>Нийлүүлэгч</span>
        <select
          value={supplier.name}
          onChange={e => {
            const selectedName = e.target.value;
            const selectedId = supplierOption.find(item =>
              item.name.includes(selectedName)
            )?.value;
            setSupplier({ id: selectedId, name: selectedName });
          }}
          style={{ cursor: 'pointer' }}
        >
          <option value=''>--Нийлүүлэгч--</option>
          {supplierOption?.map((item, index) => {
            return (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={css.inputWrapper}>
        <span>Орлогодох агуулах</span>
        <select
          value={toAguulah}
          onChange={e => {
            setToAguulah(e.target.value);
          }}
          style={{ cursor: 'pointer' }}
        >
          <option value=''>--Агуулах--</option>
          {warehouseOption?.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={css.inputWrapper}>
        <span>Зарлагадах агуулах</span>
        <select
          value={fromAguulah}
          onChange={e => {
            setFromAguulah(e.target.value);
          }}
          style={{ cursor: 'pointer' }}
        >
          <option value=''>--Агуулах--</option>
          {warehouseOption?.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={css.inputWrapper}>
        <span>Тэмдэглэл</span>
        <input
          placeholder='Хөдөлгөөний тэмдэглэл'
          value={description}
          onChange={e => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div
        className={css.inputWrapper}
        style={{
          justifyContent: 'flex-end',
          height: '100%'
        }}
      >
        <button
          onClick={() => {
            setIsProduct(true);
          }}
        >
          Бараа нэмэх
        </button>
      </div>
    </div>
  );
};

export default Configure;
