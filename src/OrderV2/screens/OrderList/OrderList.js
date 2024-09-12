import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Table from '../../components/table/Table';
import myHeaders from '../../components/MyHeader/myHeader';
import Total from '../Total';
import OrderDetail from '../../components/orderDetail/OrderDetail';
import { LoadingSpinner } from '../../../components/common';
import DeliveryDate from '../../components/DeliveryDate';
import CityData from '../../data/city.json';
import DistrictData from '../../data/district.json';
import KhorooData from '../../data/khoroo.json';
import AlertCustom from '../../components/alertCustom/AlertCustom';

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function OrderList({
  selectedSupplier,
  origin,
  tableFields,
  userData,
  page,
  setPage,
  setSelectedRows,
  deliveryMans,
  salesMans,
  params,
  setParams,
  tabLoading,
  setTabLoading,
  filterLoading,
  setFilterLoading,
  isAdmin
}) {
  const [orders, setOrders] = useState([]);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [opennedRowData, setOpennedRowData] = useState({});
  const [showDeliveryDate, setShowDeliveryDate] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [warehouses, setWarehouses] = useState([]);
  const [showAlert, setShowAlert] = useState({
    message: '',
    type: '',
    show: false,
    submitType: ''
  });

  const delivery_mans = deliveryMans.map(man => ({
    value: man.user_id,
    label: man.first_name
  }));

  const sales_mans = salesMans.map(man => ({
    value: man.user_id,
    label: man.first_name
  }));

  const cityList = CityData.City.map(item => ({
    value: item.location_id,
    label: item.location_name
  }));

  const districtList = DistrictData.District.filter(
    item => selectedCity && item.parent_id === selectedCity
  );

  const khorooList = KhorooData.Khoroo.filter(
    item => selectedDistrict && item.parent_id === selectedDistrict
  );

  const filterHeaders = tableFields.filter(item => (item.show ? item : null));

  const customHeaders = filterHeaders.map(item => {
    const options = item.selectOptions || [];

    const addressOptionsFiltered =
      item.id === 16
        ? districtList.map(item => ({
            value: item.location_id,
            label: item.location_name,
            parent: item.parent_id
          }))
        : khorooList.map(item => ({
            value: item.location_id,
            label: item.location_name,
            parent: item.parent_id
          }));

    const addressOptions = [
      { value: '', label: 'Бүгд', parent: '' },
      ...addressOptionsFiltered
    ];

    const warehouse = warehouses?.map(item => ({
      value: item._id,
      label: item.name
    }));

    return {
      ...item,
      selectOptions:
        item.id === 15
          ? cityList
          : item.id === 16
          ? addressOptions
          : item.id === 17
          ? addressOptions
          : item.id === 22
          ? [...options, ...sales_mans]
          : item.id === 23
          ? [...options, ...delivery_mans]
          : item.id === 24
          ? [...options, ...warehouse]
          : options
    };
  });

  const columns = useMemo(() => customHeaders, [delivery_mans, sales_mans]);
  const data = useMemo(() => orders, [orders]);

  async function getData(type) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/orders/${origin}?${
        selectedSupplier ? `supplier_id=${selectedSupplier}` : ''
      }${params}&page=${type === 'update' ? page + 1 : page}&limit=50`,
      requestOptions
    )
      .then(res => res.json())
      .catch(err => console.log(err));

    if (response.message === 'success') {
      if (type === 'update') {
        setOrders([...orders, ...response.orders]);
        setScrollLoading(false);
      } else {
        setTabLoading(false);
        setOrders(response.orders);
        setScrollLoading(false);
      }
    } else {
      setOrders([...orders]);
      setTabLoading(false);
      setScrollLoading(false);
    }

    setFilterLoading(false);
  }

  async function getWareHouses() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/warehouse/get?supplier=${selectedSupplier}`,
      requestOptions
    )
      .then(res => res.json())
      .catch(err => console.log(err));

    if (response && response.code === 200) {
      setWarehouses(response.data);
    }
  }

  const fetchMoreData = useCallback(() => {
    setPage(page + 1);

    if (!filterLoading) {
      setScrollLoading(true);
    }

    setTimeout(() => {
      getData('update');
    }, 1500);
  });

  const changeDeliveryDate = row => {
    setShowDeliveryDate(true);
    setOpennedRowData(row.original);
  };

  useEffect(() => {
    getData();

    if (orders.length > 0 && selectedSupplier) {
      getWareHouses();
    }
  }, [selectedSupplier, origin, params, loadingButton]);

  return (
    <>
      {tabLoading ? (
        <div className='tab-loader'>
          <LoadingSpinner />
        </div>
      ) : (
        <Table
          isAdmin={isAdmin}
          columns={columns}
          data={data}
          update={fetchMoreData}
          scrollLoading={scrollLoading}
          setScrollLoading={setScrollLoading}
          setSelectedRows={setSelectedRows}
          setShowOrderDetail={setShowOrderDetail}
          deliveryMans={delivery_mans}
          salesMans={sales_mans}
          setParams={setParams}
          params={params}
          setPage={setPage}
          setFilterLoading={setFilterLoading}
          filterLoading={filterLoading}
          changeDeliveryDate={changeDeliveryDate}
          setOpennedRowData={setOpennedRowData}
          setSelectedCity={setSelectedCity}
          setSelectedDistrict={setSelectedDistrict}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
      )}

      <Total data={data} userData={userData} />

      <OrderDetail
        isOpen={showOrderDetail}
        onClose={() => setShowOrderDetail(false)}
        order={opennedRowData}
        userData={userData}
      />

      {showDeliveryDate && (
        <DeliveryDate
          data={opennedRowData}
          closeDeliveryDate={() => setShowDeliveryDate(false)}
          loadingButton={loadingButton}
          setLoadingButton={setLoadingButton}
        />
      )}

      {showAlert.show && (
        <AlertCustom
          isOpen={showAlert.show}
          onClose={() =>
            setShowAlert({ type: '', message: '', show: false, submitType: '' })
          }
          message={showAlert.message}
          type={showAlert.type}
        />
      )}
    </>
  );
}

export default OrderList;
