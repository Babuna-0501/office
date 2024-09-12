import React, { useEffect, useState } from 'react';
import css from './suppliers.module.css';
import myHeaders from '../MyHeader/myHeader';

const Suppliers = props => {
  const [searchValue, setSearchValue] = useState(null);
  const [data, setData] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [supplierName, setSupplierName] = useState(null);

  const getSuppliers = () => {
    if (searchValue === null) {
      return;
    }
    if (searchValue !== null) {
      setSearchModal(true);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?name=${searchValue}`,
        requestOptions
      )
        .then(r => r.json())
        .then(response => {
          // console.log("arig supplier", response.data);
          setData(response.data);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };
  useEffect(() => {
    getSuppliers();
  }, [searchValue]);

  const chooseHandler = item => {
    setSupplierName(item.name);
    props.setSuppValue(item.id);
    setSearchModal(false);
  };
  // const toggleHandler = () => {
  // setSearchModal((searchModal) => setSearchModal(!searchModal));
  // };
  const modalHandler = () => {
    setSearchModal(true);
    setSupplierName(null);
  };
  return (
    <div className={css.container}>
      <label style={{ marginTop: supplierName ? '10px' : '0px' }}>
        Нийлүүлэгч
      </label>
      {supplierName && (
        <p className={css.supName} onClick={modalHandler}>
          {supplierName}
        </p>
      )}
      {supplierName === null ? (
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          // onClick={toggleHandler}
        />
      ) : null}

      {searchModal && searchValue?.length > 0 && (
        <div className={css.wrapper}>
          {data?.map((item, index) => {
            return (
              <p onClick={() => chooseHandler(item)} key={index}>
                {item.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Suppliers;
