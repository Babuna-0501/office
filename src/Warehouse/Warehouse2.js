import React, { useState, useEffect, useContext } from 'react';
import ListWarehouse2 from './ListWarehouse2';
import ListProduct from './ListProduct';
import AppHook from '../Hooks/AppHook';
import LoadingSpinner from '../components/Spinner/Spinner';
import css from './list.module.css';
import myHeaders from '../components/MyHeader/myHeader';
import AddWarehouse from './AddWarehouse/AddWarehouse';
import CollectionHook from '../Hooks/CollectionHook';
import Baraatatah from './AddWarehouse/Baraatatah';
import Background from '../components/Background/Background';
import Modal from './AddWarehouse/Modal';
import { styles } from './style';
import Tabopen2 from './TabOpen/Tabopen2';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const Warehouse = props => {
  const appctx = useContext(AppHook);
  const [warehouse, setWarehouse] = useState();
  const [loading, setLoading] = useState(false);
  const [nameSearch, setNameSearch] = useState(null);
  const [ID, setID] = useState();
  const [searchproducts, setSearchProducts] = useState([]);
  const [supplerName, setSupplerName] = useState(null);
  const [warehouseName, setWarehouseName] = useState(null);
  const [workerName, setWorkerName] = useState(null);
  const [searchsku, setSearchsku] = useState(null);
  const [searchbarcode, setSearchbarcode] = useState(null);
  const [searchcategory, setSearchcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState([]);
  const [warehouseId, setWarehouseId] = useState('');
  const [page, setPage] = useState(1);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    if (window.location.pathname === '/ware-house') {
      setHeaderContent(
        <HeaderContent
          setSubPage={props.setSubPage}
          setSelectedWareHouse={props.setSelectedWareHouse}
          subPage={props.subPage}
          userData={props.userData}
        />
      );

      return () => {
        setHeaderContent(<></>);
      };
    }
  }, []);

  const warectx = useContext(CollectionHook);

  const Fetchdata = () => {
    setLoading(true);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/warehouse/get/new`;
    let params = '';
    if (supplerName) {
      params += `supplier_name=${supplerName}&`;
    }
    if (warehouseName) {
      params += `name=${warehouseName}&`;
    }
    if (workerName) {
      params += `manager=${workerName}&`;
    }
    if (params) {
      url = `${process.env.REACT_APP_API_URL2}/api/warehouse/get/new?${params}`;
    }

    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        setWarehouse(res?.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        alert('Алдаа гарлаа');
      });
  };
  useEffect(() => {
    try {
      Fetchdata();
    } catch (error) {
      console.log('error', error);
    }
  }, [warehouseName, supplerName, workerName]);

  useEffect(() => {
    if (
      nameSearch?.length >= 2 ||
      searchsku?.length >= 2 ||
      searchbarcode?.length >= 2 ||
      searchcategory?.length >= 2
    ) {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let params = '';
      if (nameSearch !== null) {
        params += `search=${nameSearch}&`;
      }
      if (searchsku) {
        params += `sku=${searchsku}&`;
      }
      if (searchbarcode) {
        params += `bar_code=${searchbarcode}&`;
      }
      if (searchcategory) {
        params += `category=${Number(searchcategory)}&`;
      }
      let urlNew = `${process.env.REACT_APP_API_URL2}/api/products/get1?${params}`;

      setLoading(true);
      fetch(urlNew, requestOptions)
        .then(r => r.json())
        .then(response => {
          // console.log("response/data", response.data);
          setSearchProducts(response.data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
        });
    } else {
      setSearchProducts();
    }
  }, [nameSearch, searchsku, searchbarcode, searchcategory]);

  return (
    <div className={css.wrappermain}>
      <div style={{ ...styles.allWidthContainer }}>
        <div className='row header'>
          <div style={{ ...styles.companyContainer }}>
            <input type='checkbox' style={{ height: '20px' }} />
          </div>
          <div style={{ ...styles.numberContainer }}>
            <div>Агуулахын нэр</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                value={warehouseName}
                onChange={e => {
                  setWarehouseName(e.target.value);
                }}
              />
            </div>
          </div>

          <div style={{ ...styles.notifContainer }}>
            <div>Төрөл</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
              />
            </div>
          </div>
          <div style={{ ...styles.notifContainer }}>
            <div>Show</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                disabled
              />
            </div>
          </div>
          <div style={{ ...styles.createdContainer }}>
            <div>Үүсгэсэн ажилтан</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                value={workerName}
                onChange={e => setWorkerName(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.registerContainer }}>
            <div>Нийлүүлэгч</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
                value={supplerName}
                onChange={e => {
                  setSupplerName(e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ ...styles.serviceContainer, display: 'none' }}>
            <div>Үүсгэсэн огноо</div>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                style={{ padding: '8px' }}
              />
            </div>
          </div>
          <div style={{ width: '100px' }}></div>
        </div>
        {loading ? (
          <div className={css.loading}>
            <LoadingSpinner />
          </div>
        ) : (
          <ListWarehouse2
            page={page}
            warehouse={warehouse}
            warehouseId={warehouseId}
            setWarehouseId={setWarehouseId}
            products={products}
            setProducts={setProducts}
            setSelectedWarehouse={setSelectedWarehouse}
          />
        )}
      </div>
      {appctx.tabOpenstate && (
        <Tabopen2
          setPage={setPage}
          products={products}
          warehouseId={warehouseId}
          selectedWarehouse={selectedWarehouse}
          categories={props.categories}
        />
      )}
      {warectx.newWarehouseOpen && <AddWarehouse data={props} />}
      {warectx.baraaTatah && (
        <Background className={css.newBACK}>
          <Baraatatah baraa='tatah' />
        </Background>
      )}
      {warectx.baraaOrlogo && (
        <Background className={css.newBACK}>
          <Baraatatah baraa='oruulah' />
        </Background>
      )}
      {warectx.orlogoType && (
        <Background className={css.newBACK}>
          <Modal />
        </Background>
      )}
    </div>
  );
};

export default Warehouse;
