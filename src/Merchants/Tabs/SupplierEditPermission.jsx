import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import myHeaders from '../../components/MyHeader/myHeader';
import close from '../../assets/close.svg';
import css from './supplierEditPermission.module.css';

export const SupplierEditPermission = props => {
  const {
    setModal,
    orderEditPermission,
    userId,
    update,
    setUpdate,
    allSuppliers
  } = props;
  const [supps, setSupps] = useState(allSuppliers);

  const [raw, setRaw] = useState();
  const [supplierIds, setSupplierIds] = useState([]);

  useEffect(() => {
    if (orderEditPermission !== null) {
      const supplierIds = Object.keys(JSON.parse(orderEditPermission)).map(
        Number
      );
      setSupplierIds(supplierIds);
    }
  }, [orderEditPermission]);

  const handleSuppliers = (checked, id) => {
    if (checked) {
      setSupplierIds([...supplierIds, id]);
    } else {
      setSupplierIds(supplierIds.filter(sup => sup !== id));
    }
  };

  useEffect(() => {
    let permissionSup = [];
    supplierIds.map(sup => {
      permissionSup.push({ [sup]: true });
    });

    const newRaw = permissionSup?.reduce((accumulator, currentValue) => {
      return { ...accumulator, ...currentValue };
    }, {});
    setRaw(newRaw);
  }, [supplierIds]);

  const save = () => {
    const url = `${process.env.REACT_APP_API_URL2}/user`;
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({
        userId: userId,
        editPermission: raw
      })
    };

    fetch(url, requestOptions)
      .then(res => res.json())
      .then(response => {
        if (response.message === 'success') {
          setUpdate(!update);
          setModal(false);
          alert(response.message);
        } else {
          alert('error', response.message);
        }
      });
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.headerText}>Нийлүүлэгчийн тохиргоо</div>
        <div
          onClick={() => {
            setModal(false);
          }}
        >
          <img src={close} alt='close' />
        </div>
      </div>
      {/* <div className={css.inputField}>
        <input
          type="search"
          placeholder="Хайх"
          onChange={(e) => {
            if (e.target.value === "") {
              setSuppName("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSuppName(e.target.value);
            }
          }}
        />
      </div> */}
      <div className={css.body}>
        <InfiniteScroll
          dataLength={supps.length}
          hasMore={true}
          loader={
            <p style={{ textAlign: 'center' }}>
              <b>Нийлүүлэгч алга ...</b>
            </p>
          }
        >
          {supps.length > 0
            ? supps.map((sup, idx) => (
                <div
                  key={idx}
                  className={css.listContainer}
                  style={{
                    backgroundColor: supplierIds.includes(sup.id)
                      ? 'rgba(136, 255, 0, 0.427)'
                      : 'rgb(255, 255, 255)'
                  }}
                >
                  <div className={css.listGeneral}>
                    <div className={css.listSingle}>
                      <input
                        type='checkbox'
                        onChange={e =>
                          handleSuppliers(e.target.checked, sup.id)
                        }
                        checked={supplierIds.includes(sup.id) ? true : false}
                      />
                      <img src={sup.media} alt='logo' />
                      <div className={css.listText}>{sup.name}</div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </InfiniteScroll>
      </div>
      <div className={css.submit}>
        <div className={css.saveBtn} onClick={save}>
          SAVE
        </div>
      </div>
    </div>
  );
};
