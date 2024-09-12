import { useState, useEffect, useContext } from 'react';
import { ModuleContext } from './index';
import myHeaders from '../components/MyHeader/myHeader';
import Warehouses from './Warehouses';
import css from './style.module.css';

const List = (props) => {
  const [data, setData] = useState(null);
  const [type1Warehouses, setType1Warehouses] = useState([]);
  const [type2Warehouses, setType2Warehouses] = useState([]);
  const [type3Warehouses, setType3Warehouses] = useState([]);
  const [type4Warehouses, setType4Warehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const context = useContext(ModuleContext);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.data) {
      context.setWarehouseList(data.data);

      const type1 = data.data.filter((wh) => wh.type === 1);
      const type2 = data.data.filter((wh) => wh.type === 2);
      const type3 = data.data.filter((wh) => wh.type === 3);
      const type4 = data.data.filter((wh) => wh.type === 4);

      setType1Warehouses(type1);
      setType2Warehouses(type2);
      setType3Warehouses(type3);
      setType4Warehouses(type4);
    }
  }, [data, context]);

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      const url = `${process.env.REACT_APP_API_URL2}/api/warehouse?limit=1000`;
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const filterWarehouses = (warehouses) => {
    return warehouses.filter((wh) =>
      wh.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredWarehouses = (warehouses, type) => {
    if (type === 'all') {
      return filterWarehouses(warehouses);
    }
    return filterWarehouses(warehouses).filter((wh) => wh.type === parseInt(type));
  };

  return (
    data ? (
      <>
        <div style={{ padding: '3rem', display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Агуулахын нэрээр хайх"
            value={searchTerm}
            onChange={handleSearch}
            className={css.searchInput}
          />
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className={css.dropdown}
          >
            <option value="all">Бүх агуулах</option>
            <option value="1">Үндсэн агуулах</option>
            <option value="2">Салбар агуулах</option>
            <option value="3">Шууд борлуулагч</option>
            <option value="4">Түгээлтийн машин</option>
          </select>
          <button
            onClick={() => props.setWarehouseForm(true)}
            className='pageButton big'
          >
            + Шинэ агуулах үүсгэх
          </button>
        </div>
        <div className='warehouseType' style={{ display: "flex", flexDirection: "column", padding: "30px" }}>
          {getFilteredWarehouses(type1Warehouses, selectedType).length > 0 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", borderBottom: "1px solid #2AB674", width: "160px" }}>Үндсэн агуулах</h2>
              <div className={css.warehouseList}>
                {getFilteredWarehouses(type1Warehouses, selectedType).map((wh) => (
                  <Warehouses key={wh.id} data={wh} />
                ))}
              </div>
            </div>
          )}

          {getFilteredWarehouses(type2Warehouses, selectedType).length > 0 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", borderBottom: "1px solid #2AB674", width: "160px" }}>Салбар агуулах</h2>
              <div className={css.warehouseList}>
                {getFilteredWarehouses(type2Warehouses, selectedType).map((wh) => (
                  <Warehouses key={wh.id} data={wh} />
                ))}
              </div>
            </div>
          )}

          {getFilteredWarehouses(type3Warehouses, selectedType).length > 0 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", borderBottom: "1px solid #2AB674", width: "160px" }}>Шууд борлуулагч</h2>
              <div className={css.warehouseList}>
                {getFilteredWarehouses(type3Warehouses, selectedType).map((wh) => (
                  <Warehouses key={wh.id} data={wh} />
                ))}
              </div>
            </div>
          )}

          {getFilteredWarehouses(type4Warehouses, selectedType).length > 0 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", borderBottom: "1px solid #2AB674", width: "180px" }}>Түгээлтийн машин</h2>
              <div className={css.warehouseList}>
                {getFilteredWarehouses(type4Warehouses, selectedType).map((wh) => (
                  <Warehouses key={wh.id} data={wh} />
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    ) : (
      <div>Түр хүлээнэ үү...</div>
    )
  );
};

export { List };
