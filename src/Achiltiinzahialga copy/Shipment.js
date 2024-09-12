import css from './shipment.module.css';
import { Button, Modal } from './components/common';

import uploadWhite from '../assets/shipment/upload-shipment.svg';
import uploadDark from '../assets/shipment/uploadDark.svg';
import { useState, useEffect, useRef } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
import MovementList from './MovementList';
import Inventories from './Inventories';
import LoadingSpinner from '../components/Spinner/Spinner';
import { useContext } from 'react';
import { ShipmentContext } from '../Hooks/ShipmentHook';
import AddInventory from './components/AddInventory';
import arrowDown from '../assets/shipment/arrow-down-shipment.svg';
import calendar from '../assets/shipment/Calendar.svg';
import chevronRight from '../assets/shipment/chevron-right.svg';
import searchIcon from '../assets/shipment/searchIcon.svg';
import chevronDown from '../assets/shipment/chevron-down.svg';
import ErrorPopup from './components/common/ErrorPopup';
import { Pagination } from './components/common/Pagination';

import { ShipmentReport } from './components/ShipmentReport';
import { DetailedShipmentReport } from './components/DetailedShipmentReport';
import { CombinedProducts } from './components/CombinedProducts';
import { HeaderContext } from '../Hooks/HeaderHook';

import { HeaderContent } from './HeaderContent';

const Shipment = props => {
  const statuses = [
    { title: 'Бүх төлөв', color: '#fff', value: '' },
    { title: 'Хүлээгдэж буй', color: '#D9D9D9', value: '1' },
    { title: 'Баталгаажсан', color: '#00ADD0', value: '2' },
    { title: 'Цуцлагдсан', color: '#EB5E43', value: '3' }
  ];

  const dates = [
    { title: 'Өнөөдөр+Өчигдөр', value: 'today+yesterday' },
    { title: 'Өнөөдөр', value: 'today' },
    { title: 'Өчигдөр', value: 'yesterday' },
    { title: 'Сүүлийн 3 хоног', value: '3 days' },
    { title: 'Сүүлийн 7 хоног', value: '7 days' },
    { title: 'Сүүлийн 1 сар', value: '1 month' },
    { title: 'Огноогоор шүүх', value: 'custom' }
  ];

  const { userData } = props;

  const { addInventory, setAddInventory } = useContext(ShipmentContext);

  const [inventories, setInventories] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const [inventoriesLoading, setInventoriesLoading] = useState(false);
  const [shipmentsLoading, setShipmentsLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);

  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);

  const statusFilterRef = useRef(null);
  const dateFilterRef = useRef(null);

  // Filter States
  const [filterUrl, setFilterUrl] = useState('');
  const [number, setNumber] = useState('');
  const [outInventory, setOutInventory] = useState('');
  const [inInventory, setInInventory] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [createdUser, setCreatedUser] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [selectedShipmentStatus, setSelectedShipmentStatus] = useState('');
  const [selectedShipmentDate, setSelectedShipmentDate] = useState(
    dates[0].value
  );
  const [customStartDate, setCustomStarDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const [startDate, setStartDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
      new Date().getDate() - 1
    }`
  );
  const [endDate, setEndDate] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );

  const [inventorySearch, setInventorySearch] = useState('');
  const [selectedInventoryType, setSelectedInventoryType] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);

  const [count, setCount] = useState(0);
  const [shipmentCallAgain, setShipmentCallAgain] = useState(false);

  const [shipmentTotalPage, setShipmentTotalPage] = useState(0);
  const [shipmentCurrentPage, setShipmentCurrentPage] = useState(1);

  const [showReport, setShowReport] = useState(false);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [showCombinedProducts, setShowCombinedProducts] = useState(false);

  const { setHeaderContent, setShowRefreshBtn } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);
    setShowRefreshBtn(true);

    return () => {
      setHeaderContent(<></>);
      setShowRefreshBtn(false);
    };
  }, []);

  const changeDate = () => {
    const today = new Date();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const threeDays = new Date(new Date().setDate(new Date().getDate() - 3));
    const sevenDays = new Date(new Date().setDate(new Date().getDate() - 7));
    const oneMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));

    setCreatedDate('');

    if (selectedShipmentDate === 'today+yesterday') {
      setStartDate(
        `${yesterday.getFullYear()}-${
          yesterday.getMonth() + 1
        }-${yesterday.getDate()}`
      );
      setEndDate(
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      );
    }

    if (selectedShipmentDate === 'today') {
      setStartDate(
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      );
      setEndDate(
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      );
    }

    if (selectedShipmentDate === 'yesterday') {
      setStartDate(
        `${yesterday.getFullYear()}-${
          yesterday.getMonth() + 1
        }-${yesterday.getDate()}`
      );
      setEndDate(
        `${yesterday.getFullYear()}-${
          yesterday.getMonth() + 1
        }-${yesterday.getDate()}`
      );
    }

    if (selectedShipmentDate === '3 days') {
      setStartDate(
        `${threeDays.getFullYear()}-${
          threeDays.getMonth() + 1
        }-${threeDays.getDate()}`
      );
      setEndDate(
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      );
    }

    if (selectedShipmentDate === '7 days') {
      setStartDate(
        `${sevenDays.getFullYear()}-${
          sevenDays.getMonth() + 1
        }-${sevenDays.getDate()}`
      );
      setEndDate(
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      );
    }

    if (selectedShipmentDate === '1 month') {
      setStartDate(
        `${oneMonth.getFullYear()}-${
          oneMonth.getMonth() + 1
        }-${oneMonth.getDate()}`
      );
      setEndDate(
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      );
    }

    if (selectedShipmentDate === 'custom') {
      if (customStartDate === '') {
        setAlertMsg('Эхлэх огноог сонгоно уу!');
        setShowAlert(true);
        return;
      }

      if (customEndDate === '') {
        setAlertMsg('Дуусах огноог сонгоно уу!');
        setShowAlert(true);
        return;
      }

      if (customStartDate > customEndDate) {
        setAlertMsg('Эхлэх болон Дуусах огноог буруу сонгосон байна!');
        setShowAlert(true);
        return;
      }

      setStartDate(customStartDate);
      setEndDate(customEndDate);
    }

    setShipmentCurrentPage(1);
    setShowDateFilter(false);
  };

  useEffect(() => {
    const getInventories = async () => {
      try {
        if (inventoriesLoading) return;

        setInventoriesLoading(true);

        const companyId =
          Number(userData.company_id.replaceAll('|', '')) === 1
            ? 13884
            : Number(userData.company_id.replaceAll('|', ''));

        const url = `${process.env.REACT_APP_API_URL2}/api/warehouse/get`;
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        setInventories(
          resData.data.filter(inventory => inventory.supplier_id === companyId)
        );
      } catch (error) {
        console.log(error);
      } finally {
        setInventoriesLoading(false);
      }
    };

    getInventories();
  }, []);

  useEffect(() => {
    if (createdDate) {
      setStartDate(createdDate);
      setEndDate(createdDate);
      setSelectedShipmentDate(dates[dates.length - 1].value);
      setCustomStarDate(createdDate);
      setCustomEndDate(createdDate);
    } else {
      setStartDate(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          new Date().getDate() - 1
        }`
      );
      setEndDate(
        `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`
      );
      setSelectedShipmentDate(dates[0].value);
      setCustomStarDate('');
      setCustomEndDate('');
    }
  }, [createdDate]);

  const getShipments = async () => {
    try {
      if (shipmentsLoading) return;

      if (count === 0) {
        setShipmentsLoading(true);
      } else {
        setShipmentsLoading(false);
      }

      if (count > 0) {
        setShipmentCallAgain(true);
      } else {
        setShipmentCallAgain(false);
      }
      setCount(prev => prev + 1);

      let params = `page=${shipmentCurrentPage}&`;

      if (number) {
        params += `id=${number}&`;
      }

      if (outInventory !== '') {
        params += `from=${outInventory}&`;
      }

      if (inInventory !== '') {
        params += `to=${inInventory}&`;
      }

      if (selectedStatus !== '') {
        params += `status=${selectedStatus}`;
      }

      if (createdUser !== '') {
        params += `tugeegchID=${createdUser}`;
      }

      const companyId =
        Number(userData.company_id.replaceAll('|', '')) === 1
          ? 1
          : Number(userData.company_id.replaceAll('|', ''));

      const url = `${process.env.REACT_APP_API_URL2}/api/shipment?supplierId=${companyId}&${params}&startDate=${startDate}&endDate=${endDate}`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      setFilterUrl(url);

      let productsIds = [];

      for (const shipment of resData.data) {
        for (const product of shipment.products) {
          productsIds.push(product.productId);
        }
      }

      productsIds = [...new Set(productsIds)];

      const productUrl = `${
        process.env.REACT_API_URL2
      }/products/get1?ids=[${productsIds.join(',')}]`;

      const productRes = await fetch(productUrl, requestOptions);
      const productData = await productRes.json();

      setProducts(productData.data);
      setShipments(resData.data);
      // console.log("RES DATA: ", resData.data);
      setShipmentTotalPage(resData.pageNumber);
    } catch (error) {
      console.log(error);
    } finally {
      setShipmentsLoading(false);
      setShipmentCallAgain(false);
    }
  };

  useEffect(() => {
    getShipments();
  }, [
    userData,
    startDate,
    endDate,
    shipmentCurrentPage,
    number,
    outInventory,
    inInventory,
    selectedStatus,
    createdUser
  ]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (usersLoading) return;

        setUsersLoading(true);

        const companyId = Number(userData.company_id.replaceAll('|', ''));

        const url = `${process.env.REACT_APP_API_URL2}/api/backoffice/users?company=${companyId}`;
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        setUsers(resData.data);
        // console.log("USER", resData.data);
      } catch (error) {
        console.log('error while fetching users: ', error);
      } finally {
        setUsersLoading(false);
      }
    };

    getUsers();
  }, [userData, startDate, endDate]);

  useEffect(() => {
    setSelectedStatus(selectedShipmentStatus);
  }, [selectedShipmentStatus]);

  useEffect(() => {
    setSelectedShipmentStatus(selectedStatus);
  }, [selectedStatus]);

  const tabs = [
    {
      id: 1,
      header: 'Ачилтын жагсаалт',
      content: (
        <MovementList
          inventories={inventories}
          shipments={shipments}
          products={products}
          users={users}
          selectedShipmentStatus={selectedShipmentStatus}
          key={`shipment-movement-list`}
          userData={userData}
          getShipments={getShipments}
          {...{
            number,
            setNumber,
            outInventory,
            setOutInventory,
            inInventory,
            setInInventory,
            createdDate,
            setCreatedDate,
            createdUser,
            setCreatedUser,
            selectedType,
            setSelectedType,
            selectedStatus,
            setSelectedStatus,
            shipmentCallAgain
          }}
        />
      )
    },
    {
      id: 2,
      header: 'Агуулах',
      content: (
        <Inventories
          inventories={inventories}
          userData={userData}
          users={users}
          search={inventorySearch}
          selectedInventoryType={selectedInventoryType}
          key={`shipment-inventories-list`}
        />
      )
    }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    const closeDropdowns = e => {
      if (
        statusFilterRef.current &&
        showStatusFilter &&
        !statusFilterRef.current.contains(e.target)
      ) {
        setShowStatusFilter(false);
      }

      if (
        dateFilterRef.current &&
        showDateFilter &&
        !dateFilterRef.current.contains(e.target)
      ) {
        setShowDateFilter(false);
      }
    };

    document.addEventListener('mousedown', closeDropdowns);

    return () => {
      document.removeEventListener('mousedown', closeDropdowns);
    };
  }, [showStatusFilter, showDateFilter]);

  return (
    <>
      <div className={css.container}>
        {!inventoriesLoading && !shipmentsLoading && !usersLoading && (
          <div className={css.wrapper}>
            <div className={css.header}>
              <div className={css.tabHeaders}>
                {tabs.map((tab, index) => {
                  return (
                    <button
                      key={`shipment-tab-button-${index}`}
                      type='button'
                      onClick={() => setActiveTab(tab.id)}
                      className={`${css.singleTabHeader} ${
                        activeTab === tab.id && css.active
                      }`}
                    >
                      {tab.header}
                    </button>
                  );
                })}
              </div>

              <div className={css.rightSide}>
                {activeTab === 1 && (
                  <>
                    <div className={css.filters}>
                      <div className={css.dateFilterWrapper}>
                        <button
                          type='button'
                          onClick={() => setShowDateFilter(true)}
                          className={css.dateFilterBtn}
                        >
                          <div>
                            <img src={calendar} alt='Calendar' />
                            <span>
                              {
                                dates.find(
                                  date => date.value === selectedShipmentDate
                                ).title
                              }
                            </span>
                          </div>
                          <img src={arrowDown} alt='Arrow Down' />
                        </button>

                        {showDateFilter && (
                          <div
                            ref={dateFilterRef}
                            className={css.dateFilterDropdownWrapper}
                          >
                            <div className={css.triangle} />

                            <div className={css.dateFilterDropdown}>
                              <div className={css.radioButtons}>
                                {dates.map((date, index) => {
                                  return (
                                    <div
                                      key={`date-filter-radio-button-${index}`}
                                      className={css.radioBtnWrapper}
                                      style={{ zIndex: dates.length - index }}
                                    >
                                      <input
                                        id={date.title}
                                        type='radio'
                                        name='date'
                                        checked={
                                          selectedShipmentDate === date.value
                                        }
                                        onChange={() => {
                                          setSelectedShipmentDate(date.value);
                                        }}
                                      />
                                      <label htmlFor={date.title}>
                                        {date.title}
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>

                              {selectedShipmentDate === 'custom' && (
                                <div className={css.subDateFilters}>
                                  <input
                                    type='date'
                                    value={customStartDate}
                                    onChange={e =>
                                      setCustomStarDate(e.target.value)
                                    }
                                  />
                                  <img src={chevronRight} alt='Chevron Right' />
                                  <input
                                    type='date'
                                    value={customEndDate}
                                    onChange={e =>
                                      setCustomEndDate(e.target.value)
                                    }
                                  />
                                </div>
                              )}

                              <div className={css.dateFilterBtns}>
                                <Button
                                  variant='secondary'
                                  size='medium'
                                  width={80}
                                  onClick={() => setShowDateFilter(false)}
                                >
                                  Цуцлах
                                </Button>
                                <Button
                                  onClick={changeDate}
                                  variant='primary'
                                  size='medium'
                                  width={100}
                                >
                                  Шүүх
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className={css.statusFilterWrapper}>
                        <button
                          type='button'
                          onClick={() => setShowStatusFilter(true)}
                          className={css.statusFilterBtn}
                        >
                          <span>
                            {
                              statuses.find(
                                stat => stat.value === selectedShipmentStatus
                              ).title
                            }
                          </span>
                          <img src={arrowDown} alt='Arrow Down' />
                        </button>

                        {showStatusFilter && (
                          <div
                            ref={statusFilterRef}
                            className={css.statusFilterDropdownWrapper}
                          >
                            <div className={css.triangle} />

                            <div className={css.statusFilterDropdown}>
                              {statuses.map((status, index) => {
                                return (
                                  <button
                                    className={css.singleStatusBtn}
                                    style={{
                                      boxShadow:
                                        index === statuses.length - 1 && 'none',
                                      zIndex: statuses.length - index
                                    }}
                                    type='button'
                                    onClick={() => {
                                      setSelectedShipmentStatus(status.value);
                                      setShowStatusFilter(false);
                                    }}
                                  >
                                    <div
                                      style={{ backgroundColor: status.color }}
                                    />
                                    <span>{status.title}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={css.reportBtns}>
                      <Button
                        onClick={() => setShowCombinedProducts(true)}
                        variant='primary'
                        size='medium'
                      >
                        Нэгтгэл
                      </Button>

                      <Button
                        onClick={() => setShowReport(true)}
                        variant='primary'
                        size='medium'
                        icon
                      >
                        <img src={uploadWhite} alt='Report' />
                        Тайлан
                      </Button>

                      <Button
                        onClick={() => setShowDetailedReport(true)}
                        variant='secondary'
                        size='medium'
                        icon
                      >
                        <img src={uploadDark} alt='Shipment' />
                        Дэлгэрэнгүй тайлан
                      </Button>
                    </div>
                  </>
                )}
                {activeTab === 2 && (
                  <div className={css.inventoryFiltersWrapper}>
                    <div className={css.inventorySearch}>
                      <label htmlFor='inventorySearch'>
                        <img src={searchIcon} alt='Search Icon' />
                      </label>
                      <input
                        id='inventorySearch'
                        type='text'
                        placeholder='Хайх...'
                        value={inventorySearch}
                        onChange={e => setInventorySearch(e.target.value)}
                      />
                    </div>

                    <select
                      className={css.inventoryTypeFilter}
                      style={{ background: `url(${chevronDown})` }}
                      value={selectedInventoryType}
                      onChange={e => setSelectedInventoryType(e.target.value)}
                    >
                      <option value={''}>Бүгд</option>
                      <option value={'2'}>Үндсэн агуулах</option>
                      <option value={'3'}>Машин</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div
              className={css.contentWrapper}
              style={{
                bottom: activeTab === 1 && shipmentTotalPage > 0 ? 40 : 0
              }}
            >
              {tabs.find(tab => tab.id === activeTab).content}
            </div>

            {activeTab === 1 && shipmentTotalPage > 0 && (
              <Pagination
                totalPage={shipmentTotalPage}
                currentPage={shipmentCurrentPage}
                setCurrentPage={setShipmentCurrentPage}
              />
            )}
          </div>
        )}

        {(inventoriesLoading || shipmentsLoading || usersLoading) && (
          <div className={css.loaderWrapper}>
            <LoadingSpinner />
          </div>
        )}
      </div>

      {addInventory && (
        <Modal closeHandler={() => setAddInventory(false)}>
          <AddInventory
            inventoriesLoading={inventoriesLoading}
            closeHandler={() => setAddInventory(false)}
            userData={userData}
            setInventories={setInventories}
          />
        </Modal>
      )}

      {showAlert && (
        <ErrorPopup
          message={alertMsg}
          closeHandler={() => setShowAlert(false)}
        />
      )}

      {showReport && (
        <Modal
          closeHandler={() => {
            setShowReport(false);
          }}
          width={346}
          height={300}
        >
          <ShipmentReport
            closeHandler={() => setShowReport(false)}
            users={users}
            inventories={inventories}
            userData={userData}
          />
        </Modal>
      )}

      {showDetailedReport && (
        <Modal
          closeHandler={() => setShowDetailedReport(false)}
          width={346}
          height={300}
        >
          <DetailedShipmentReport
            closeHandler={() => setShowDetailedReport(false)}
            userData={userData}
            users={users}
            inventories={inventories}
          />
        </Modal>
      )}

      {showCombinedProducts && (
        <CombinedProducts
          startDate={startDate}
          endDate={endDate}
          closeHandler={() => setShowCombinedProducts(false)}
          userData={userData}
          filterUrl={filterUrl}
        />
      )}
    </>
  );
};

export default Shipment;
