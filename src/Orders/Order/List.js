import Total from './Total';
import myHeaders from '../../components/MyHeader/myHeader';
import { useState, useContext, useEffect } from 'react';
import Order from './Order';
import ListHeader from './ListHeader';

const List = () => {
  const [page, setPage] = useState(1);
  const [interval, setIntervalDate] = useState(['2023-12-10', '2023-12-13']);
  const [data, setData] = useState(null);
  const sequence = [
    'index',
    'id',
    'supplier',
    'orderdate',
    'deliverydate',
    'totalamount',
    'paymenttype',
    'paidamount',
    'note',
    'customer',
    'customerphone',
    'customerchannel',
    'city',
    'district',
    'khoroo',
    'address',
    'srcode',
    'couriercode',
    'customerregion'
  ];
  const sequenceSizes = {
    index: 52,
    id: 120,
    supplier: 120,
    orderdate: 120,
    deliverydate: 120,
    totalamount: 120,
    paymenttype: 120,
    paidamount: 120,
    note: 120,
    customer: 120,
    customerphone: 120,
    customerchannel: 120,
    city: 120,
    district: 120,
    khoroo: 120,
    address: 120,
    srcode: 120,
    couriercode: 120,
    customerregion: 120
  };
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/orders/?order_type=1&order_start=${interval[0]}&order_end=${interval[1]}&page=${page}`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setData(response.data);
      });
  }, []);
  return data ? (
    <>
      <ListHeader sequence={sequence} sequenceSizes={sequenceSizes} />
      {data.map(order => {
        return (
          <Order
            data={order}
            sequence={sequence}
            sequenceSizes={sequenceSizes}
          />
        );
      })}
      <Total data={data} />
    </>
  ) : (
    <div>Түр хүлээнэ үү...</div>
  );
};

export default List;
