import { useContext, useState } from 'react';
import { HeaderContext } from '../../Hooks/HeaderHook';
import { useEffect } from 'react';
import PBIHeader from './components/PBIHeader';
import css from './styles.module.css';
import CheckDropdown from './components/CheckDropdown';
import myHeaders from '../../components/MyHeader/myHeader';
import { Management } from './screens/Management/Index';
import { Supplier } from './screens/Supplier/Index';
import { LoadingSpinner } from '../../components/common';
import { KPI } from './screens/KPI/Index';
import { MauDau } from './screens/MauDau/Index';

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

const PBIndex = () => {
  const { setHeaderContent, setShowRefreshBtn } = useContext(HeaderContext);

  const [tradeshops, setTradeshops] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [months] = useState([
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'February' }
  ]);
  const [types] = useState([
    { value: ['1', '2', '3', '4', '5'], label: 'GT' },
    {
      value: ['6', '7', '8', '9', '10', '11', '12', '13', '14'],
      label: 'Horeca'
    }
  ]);
  const [years] = useState(
    arrayRange(2021, new Date().getFullYear(), 1).map(val => ({
      value: val,
      label: val
    }))
  );
  const [orders, setOrders] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: []
  });
  const [currentOrders, setCurrentOrders] = useState([]);

  // Filter States
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [loading, setLoading] = useState(true);
  const [showAllMonths, setShowAllMonths] = useState(false);

  const tabs = [
    {
      id: 1,
      title: 'Management',
      content: (
        <Management key={`pi-management-screen`} orders={currentOrders} />
      )
    },
    {
      id: 2,
      title: 'KPI',
      content: (
        <KPI
          key={`pi-kpi-screen`}
          orders={currentOrders}
          setSelectedMonth={setSelectedMonth}
        />
      )
    },
    { id: 3, title: 'MAU/DAU', content: <MauDau key={`pi-maudau-screen`} /> },
    {
      id: 4,
      title: 'Supplier',
      content: (
        <Supplier
          key={`pi-supplier-screen`}
          orders={currentOrders}
          suppliers={suppliers}
          tradeshops={tradeshops}
        />
      )
    },
    { id: 5, title: 'PickPack' }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    setHeaderContent(<PBIHeader />);
    setShowRefreshBtn(true);

    return () => {
      setShowRefreshBtn(false);
      setHeaderContent(<></>);
    };
  }, [setHeaderContent, setShowRefreshBtn]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        for (let i = new Date().getMonth() + 1; i >= 1; i--) {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL2}/api/order/duplicate/get`,
            {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify({
                delivery_date: true,
                start_date: `${selectedYear}-${i}-01`,
                end_date: `${selectedYear}-${i}-31`,
                projection: {
                  order_id: 1,
                  supplier_id: 1,
                  customer_id: 1,
                  line: 1,
                  status: 1,
                  business_type_id: 1,
                  delivery_date: 1,
                  tradeshop_id: 1,
                  tradeshop_city: 1,
                  order_date: 1,
                  delivery_status: 1,
                  pickpack: 1
                }
              })
            }
          );

          let data = await res.json();
          data = data.map(d => ({
            ...d,
            totalPrice: d.line.reduce(
              (acc, cur) => acc + cur.price * cur.quantity,
              0
            )
          }));
          setOrders(prev => ({ ...prev, [i]: [...data] }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [selectedYear]);

  useEffect(() => {
    const getData = async () => {
      try {
        const supplierUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`;
        const locationsUrl = `${process.env.REACT_APP_API_URL}/api/site_data`;
        const statusUrl = `${process.env.REACT_APP_API_URL2}/api/order/status/list`;
        const tradeshopUrl = `${process.env.REACT_APP_API_URL2}/api/merchants?page=all`;

        const requestOptions = {
          method: 'GET',
          headers: myHeaders
        };

        const [supplierRes, locationsRes, statusRes, tradeshopRes] =
          await Promise.all([
            fetch(supplierUrl, requestOptions),
            fetch(locationsUrl, requestOptions),
            fetch(statusUrl, requestOptions),
            fetch(tradeshopUrl, requestOptions)
          ]);

        const supplierData = await supplierRes.json();
        const locationsData = await locationsRes.json();
        const statusData = await statusRes.json();
        const tradeshopData = await tradeshopRes.json();

        setSuppliers(
          supplierData.data.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
        );
        setLocations(locationsData.location);
        setStatuses(statusData.data);
        setTradeshops(tradeshopData.data);
      } catch (error) {}
    };

    getData();
  }, []);

  useEffect(() => {
    let curOrders = orders[selectedMonth];

    if (selectedSupplier) {
      curOrders = curOrders.filter(
        order => order.supplier_id === selectedSupplier
      );
    }

    if (selectedLocation) {
      curOrders = curOrders.filter(
        order => Number(order.tradeshop_city) === selectedLocation
      );
    }

    if (selectedStatus) {
      curOrders = curOrders.filter(order => order.status === selectedStatus);
    }

    if (selectedType) {
      curOrders = curOrders.filter(order =>
        selectedType.includes(order.business_type_id)
      );
    }

    setCurrentOrders(curOrders);
  }, [
    selectedMonth,
    orders,
    selectedSupplier,
    selectedLocation,
    selectedStatus,
    selectedType
  ]);

  return (
    <div className={css.container}>
      <div className={css.tabHeaders}>
        {tabs.map(tab => {
          return (
            <button
              key={tab.id}
              type='button'
              className={`${css.tabButton} ${
                tab.id === activeTab && css.active
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      <div className={css.contentWrapper}>
        <div className={css.content}>
          <div className={css.contentHeader}>
            {/* Vendor */}
            <div className={css.singleHeaderItem}>
              <span className={css.headerTitle}>Vendor</span>
              <CheckDropdown
                data={suppliers
                  .filter(supplier =>
                    [
                      ...new Set(
                        orders[selectedMonth].map(order => order.supplier_id)
                      )
                    ].includes(supplier.id)
                  )
                  .map(supplier => ({
                    value: supplier.id,
                    label: supplier.name
                  }))}
                selected={selectedSupplier}
                setSelected={setSelectedSupplier}
              />
            </div>

            {/* Type */}
            <div className={css.singleHeaderItem}>
              <span className={css.headerTitle}>Type</span>
              <CheckDropdown
                data={types}
                selected={selectedType}
                setSelected={setSelectedType}
              />
            </div>

            {/* State */}
            <div className={css.singleHeaderItem}>
              <span className={css.headerTitle}>State name</span>
              <CheckDropdown
                selected={selectedLocation}
                setSelected={setSelectedLocation}
                data={locations
                  .filter(
                    location =>
                      location.parent_id === 0 &&
                      [
                        ...new Set(
                          orders[selectedMonth].map(order =>
                            Number(order.tradeshop_city)
                          )
                        )
                      ].includes(location.location_id)
                  )
                  .map(location => ({
                    value: location.location_id,
                    label: location.location_name
                  }))}
              />
            </div>

            {/* Status */}
            <div className={css.singleHeaderItem}>
              <span className={css.headerTitle}>Status</span>
              <CheckDropdown
                selected={selectedStatus}
                setSelected={setSelectedStatus}
                data={statuses
                  .filter(status =>
                    [
                      ...new Set(
                        orders[selectedMonth].map(order => order.status)
                      )
                    ].includes(status.OrderStatusID)
                  )
                  .map(status => ({
                    value: status.OrderStatusID,
                    label: status.Name
                  }))}
              />
            </div>

            <div className={css.singleHeaderItem}>
              <span className={css.headerTitle}>Month</span>
              <CheckDropdown
                selected={selectedMonth}
                setSelected={setSelectedMonth}
                data={months}
                hasAll={false}
              />
            </div>

            <div className={css.singleHeaderItem}>
              <span className={css.headerTitle}>Year</span>
              <CheckDropdown
                selected={selectedYear}
                setSelected={setSelectedYear}
                data={years}
                hasAll={false}
              />
            </div>
          </div>

          {!loading && (
            <div className={css.mainContent}>
              {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
          )}
          {loading && (
            <div className={css.spinner}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PBIndex;
