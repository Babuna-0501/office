import React, { useEffect, useState } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import css from './suppfilter.module.css';
import { useContext } from 'react';
import ShuurkhaiHook from '../../Hooks/ShuurkhaiHook';

const SuppFilter = () => {
  const shuurkhaCtx = useContext(ShuurkhaiHook);

  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [supplierName, setSupplierName] = useState(null);

  const getSupplier = () => {
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
      const url = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?name=${searchValue}`;

      fetch(url, requestOptions)
        .then(r => r.json())
        .then(res => {
          setData(res.data);
        })
        .catch(err => console.log('ERROR: ', err));
    }
  };

  useEffect(() => {
    getSupplier();
  }, [searchValue]);

  const chooseHandler = item => {
    setSupplierName(item.name);
    shuurkhaCtx.setSupplier(item.id);
    setSearchModal(false);
  };

  const modalHandler = () => {
    setSearchModal(true);
    setSupplierName(null);
  };

  return (
    <div className={css.container}>
      {/* <label style={{ marginTop: supplierName ? "10px" : "0px" }}>
				Нийлүүлэгч
			</label> */}
      {supplierName && (
        <p className={css.supName} onClick={modalHandler}>
          {supplierName}
        </p>
      )}
      {supplierName === null ? (
        <input
          value={searchValue}
          onChange={e => {
            if (e.target.value === '') {
              setSearchValue('');
            }
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setSearchValue(e.target.value);
            }
          }}
        />
      ) : null}
      {searchModal && searchValue?.length > 0 && (
        <div className={css.wrapper}>
          {data?.map((item, idx) => {
            return (
              <p onClick={() => chooseHandler(item)} key={idx}>
                {item.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SuppFilter;
