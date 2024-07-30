import { useEffect, useState } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import InfiniteScroll from 'react-infinite-scroll-component';
import css from './paymentType.module.css';
import { EditPaymentType } from './EditPaymentType';

export const PaymentType = ({ id, permission, fetchdata }) => {
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const newPer = permission ? permission.split(',').map(Number) : [];
  const [acceptedIds, setAcceptedIds] = useState(permission ? newPer : []);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  useEffect(() => {
    if (searchValue.length >= 3 || searchValue.length === 0) {
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?name=${searchValue}`,
        requestOptions
      )
        .then(r => r.json())
        .then(res => {
          setAllSuppliers(res.data);
        });
    }
  }, [searchValue]);

  const PutRequest = () => {
    const raw = JSON.stringify({
      tradeshopId: id,
      orderPayment: acceptedIds
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/tradeshops?tradeshopId=${id}`,
      requestOptions
    )
      .then(res => res.json())
      .then(response => {
        if (response.message === 'success') {
          fetchdata();
        } else {
          setAcceptedIds(newPer);
        }
        alert(response.message);
      })
      .catch(error => {
        alert(error);
      });
  };

  useEffect(() => {
    if (acceptedIds.length !== newPer.length) {
      PutRequest();
    }
  }, [acceptedIds, id]);

  return (
    <div className={css.container}>
      <div>
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder='Хайх ...'
          style={{ border: '1px solid #ddd', padding: '8px' }}
        />
        <div className={css.suppliers}>
          <InfiniteScroll
            dataLength={allSuppliers.length}
            hasMore={true}
            loader={
              <p style={{ textAlign: 'center' }}>
                <b>Уншиж байна...</b>
              </p>
            }
          >
            {allSuppliers?.map(supplier => {
              return (
                <EditPaymentType
                  supplier={supplier}
                  acceptedIds={acceptedIds}
                  setAcceptedIds={setAcceptedIds}
                />
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};
