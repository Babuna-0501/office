import React, { useContext, useEffect, useState } from 'react';
import Tab from './components/tab/Tab';
import OrderSideBar from './components/sidebar/sidebar';
import './style.css';
import OrderList from './screens/OrderList/OrderList';
import OrderReport from './screens/OrderReport/OrderReport';
import OrderSettings from './screens/OrderSettings/OrderSettings';
import { LoadingSpinner } from '../components/common';
import HeaderContent from './HeaderContent';
import { HeaderContext } from '../Hooks/HeaderHook';
import myHeaders from './components/MyHeader/myHeader';
import Negtgel from './components/negtgel/Negtgel';

export const tsastaltaindol = '|14233|';
export const nerst = '|14191|';

const admin = '|1|';

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const App = props => {
  const { currentSupplier, userData } = props;

  const tableFields = JSON.parse(userData.tablePosition2)?.order?.field || {};

  const supplierId =
    currentSupplier && currentSupplier.length > 0 ? currentSupplier[0].id : '';

  const { setHeaderContent } = useContext(HeaderContext);

  const [page, setPage] = useState(1);
  const [tabLoading, setTabLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  const [selectedSupplier, setSelectedSupplier] = useState(
    userData.company_id === admin ? '' : supplierId
  );

  const [salesMans, setSalesMans] = useState([]);
  const [deliveryMans, setDeliveryMans] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [params, setParams] = useState('');

  const [showModal, setShowModal] = useState(false);

  const filterByDate = ({ startDate, endDate }) => {
    setPage(1);
    setFilterLoading(true);
    setParams(`&order_date=true&start_date=${startDate}&end_date=${endDate}`);
  };

  const getUsers = async () => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/users`,
        requestOptions
      );

      const res = await data.json();

      if (res.data && res.data.length > 0) {
        const filteredDeliveryMans = res.data.filter(
          item => item.role === 2 && item.first_name
        );

        const filteredSalesMans = res.data.filter(
          item => item.role === 1 && item.first_name
        );

        setDeliveryMans(filteredDeliveryMans);
        setSalesMans(filteredSalesMans);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setHeaderContent(
      <HeaderContent
        selectedRows={selectedRows}
        deliveryMans={deliveryMans}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    );
  }, [selectedRows, showModal]);

  const extendedProps = {
    selectedSupplier,
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
    setFilterLoading
  };

  const tabs = [
    {
      label: 'Захиалгын жагсаалт B2B',
      content: () => <OrderList origin='b2b' {...extendedProps} />
    },
    {
      label: 'Захиалгын жагсаалт SFA',
      content: () => <OrderList origin='sfa' {...extendedProps} />
    },
    {
      label: 'Захиалгын тохиргоо',
      content: () => (
        <OrderSettings tableFields={tableFields} userData={userData} />
      )
    },
    { label: 'Захиалгын тайлан', content: () => <OrderReport /> }
  ];

  if (!currentSupplier || currentSupplier.length === 0) {
    return (
      <div id='loadingSpinner'>
        <LoadingSpinner />
      </div>
    );
  }

  const payloadData = selectedRows.map(item => {
    return item.original;
  });

  return (
    <div className='Container_order2'>
      <div className='sidebarWrapper'>
        <OrderSideBar
          suppliers={currentSupplier}
          setPage={setPage}
          filterByDate={filterByDate}
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
          setParams={setParams}
          setTabLoading={setTabLoading}
        />
      </div>

      <Tab
        tabs={tabs}
        setPage={setPage}
        setParams={setParams}
        setTabLoading={setTabLoading}
      />

      <Negtgel
        open={showModal}
        cancel={() => {
          setShowModal(false);
        }}
        payload={payloadData}
        users={[...deliveryMans, ...salesMans]}
      />
    </div>
  );
};

export default App;
