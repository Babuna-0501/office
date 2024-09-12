import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TableProducts from './TableProducts';
import { productHeaders } from '../utils';
import myHeaders from '../../../../components/MyHeader/myHeader';

const getReqOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function AddProducts({
  onClose,
  supplierId,
  selectedRows,
  setSelectedRows,
  filterLoading,
  setFilterLoading,
  addFunction
}) {
  const [allProducts, setAllProducts] = useState([]);
  const [params, setParams] = useState('');
  const [page, setPage] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(false);

  async function getAllProducts(type) {
    const response = await fetch(
      `${
        process.env.REACT_APP_API_URL2
      }/api/products/get1?supplier=${supplierId}${params}&page=${
        type === 'update' ? page + 1 : page
      }&limit=50`,
      getReqOptions
    )
      .then(res => res.json())
      .catch(error => {
        console.log('error', error);
      });

    if (response.code === 200) {
      if (type === 'update') {
        setAllProducts([...allProducts, ...response?.data]);
        setScrollLoading(false);
      } else {
        setAllProducts(response.data);
        setScrollLoading(false);
      }
    } else {
      setAllProducts([...allProducts]);
      setScrollLoading(false);
    }

    setFilterLoading(false);
  }

  useEffect(() => {
    getAllProducts();
  }, [supplierId, params]);

  const columns = useMemo(() => productHeaders, []);
  const data = useMemo(() => allProducts, [allProducts]);

  const fetchMoreData = useCallback(() => {
    setPage(page + 1);

    if (!filterLoading) {
      setScrollLoading(true);
    }

    setTimeout(() => {
      getAllProducts('update');
    }, 1500);
  });

  return (
    <div className='addProduct-table-container'>
      <TableProducts
        columns={columns}
        data={data}
        update={fetchMoreData}
        scrollLoading={scrollLoading}
        setScrollLoading={setScrollLoading}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        params={params}
        setParams={setParams}
        setPage={setPage}
        setFilterLoading={setFilterLoading}
        filterLoading={filterLoading}
      />

      <div className='bottom-buttons'>
        <button className='order_detail_button' onClick={onClose}>
          Болих
        </button>
        <button
          className='order_detail_button'
          onClick={addFunction}
          disabled={selectedRows.length === 0 ? true : false}
        >
          Нэмэх
        </button>
      </div>
    </div>
  );
}

export default AddProducts;
