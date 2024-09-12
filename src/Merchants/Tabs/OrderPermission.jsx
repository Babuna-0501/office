import { useEffect } from 'react';
import { OrderEditPermission } from './OrderEditPermission';
import myHeaders from '../../components/MyHeader/myHeader';
import { useState } from 'react';
import { Modal } from '../../components/common/Modal';
import { SupplierEditPermission } from './SupplierEditPermission';
import css from './orderPermission.module.css';

export const OrderPermission = props => {
  const { userId, orderEditPermission, includedSuppId, getSupplier } = props;

  const [allSuppliers, setAllSuppliers] = useState([]);
  const [modal, setModal] = useState(false);

  const [update, setUpdate] = useState(false);
  const [updatedPermission, setUpdatedPermission] = useState(null);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  useEffect(() => {
    getSupplier();
    fetch(
      `${process.env.REACT_APP_API_URL2}/users/alldata?page=1&limit=1&users=${userId}`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        setUpdatedPermission(res.data[0].orderEditPermission);
      });
  }, [userId, update]);

  useEffect(() => {
    if (includedSuppId.length > 0) {
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${includedSuppId}`,
        requestOptions
      )
        .then(r => r.json())
        .then(res => {
          setAllSuppliers(res.data);
        });
    } else {
      console.log('supplier hooson baina');
    }
  }, [includedSuppId]);

  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <input
          placeholder='Ажиллахгүй ...'
          // value={name}
          // onChange={(e) => setName(e.target.value)}
          disabled
          className={css.input}
        />
        <button className={css.addBtn} onClick={() => setModal(true)}>
          нэмэх
        </button>
      </div>

      {(
        update ? updatedPermission?.length > 3 : orderEditPermission?.length > 3
      ) ? (
        <OrderEditPermission
          orderEditPermission={update ? updatedPermission : orderEditPermission}
          allSuppliers={allSuppliers}
        />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Эрх өгсөн нийлүүлэгч алга
        </div>
      )}

      {modal && (
        <Modal>
          <SupplierEditPermission
            setModal={setModal}
            orderEditPermission={
              update ? updatedPermission : orderEditPermission
            }
            userId={userId}
            update={update}
            setUpdate={setUpdate}
            includedSuppId={includedSuppId}
            allSuppliers={allSuppliers}
          />
        </Modal>
      )}
    </div>
  );
};
