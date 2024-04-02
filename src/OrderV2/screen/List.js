import React, { useState, useEffect } from 'react';
import Total from './Total';
import myHeaders from '../../components/MyHeader/myHeader';
import Order from './Order';
import ListHeader from './ListHeader';
import './style.css';

const List = () => {
  const [page, setPage] = useState(1);
  const [interval, setIntervalDate] = useState(['', '']);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null); // Филтэр хийж байгаа датаг энэ стэйтэд хадгаллаа.
  const sequence = [
    'index',
    'id',
    'status',
    'orderlist',
    'orderdate',
    'deliverydate',
    'paidamount',
    'note',
    'customerphone',
    'customer',
    'merchants',
    'customerchannel',
    'city',
    'district',
    'khoroo',
    'address',
    'paymenttype',
    'srcode',
    'origin',
    'vat',
    'salesman',
    'deliveryman',
    'manager',
    'butsaalt',
  ];
  const sequenceSizes = {
    index: 52,
    id: 65,
    status: 90,
    orderlist: 150,
    orderdate: 120,
    deliverydate: 120,
    paidamount: 120,
    note: 150,
    paymenttype: 100,
    customer: 120,
    customerphone: 85,
    merchants: 160,
    customerchannel: 140,
    city: 140,
    district: 120,
    khoroo: 120,
    address: 150,
    srcode: 120,
    origin: 120,
    vat: 120,
    salesman: 120,
    deliveryman: 120,
    manager: 140,
    butsaalt: 120,
  };

  useEffect(() => {
    fetchData();
  }, [page, interval]); // Хуудас солигдох үед датаг fetch хийнэ.

  const fetchData = () => {
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const url = `https://api2.ebazaar.mn/api/orders/?order_type=1&order_start=${interval[0]}&order_end=${interval[1]}&page=${page}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        setFilteredData(result.data); //Fetch хийгдсэн датаг филтэрдэнэ
      })
      .catch((error) => console.log('error', error));
  };

  //Филтэр хийсэн датаг энд update хийж байна
  const handleFilterChange = (field, value) => {
    const filtered = data.filter((item) => item[field].toString().includes(value.toString()));
    setFilteredData(filtered);
  };

  return (
    <div>
      <ListHeader sequence={sequence} sequenceSizes={sequenceSizes} onFilterChange={handleFilterChange} />
      {filteredData ? (
        filteredData.map((order) => <Order data={order} sequence={sequence} sequenceSizes={sequenceSizes} />)
      ) : (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <Total data={filteredData || data} />
    </div>
  );
};

export default List;
