import { ModuleContext } from './index';
import myHeaders from '../components/MyHeader/myHeader';
import Warehouses from './Warehouses';
import css from './style.module.css';
import Ctx from './WarehouseContext';
import { useState, createContext, useEffect, useContext } from 'react';
const WarehouseContext = createContext();

const List = props => {
  const [data, setData] = useState(null);
  let renderHTML = [];
  const context = useContext(ModuleContext);
  useEffect(() => {
    fetchData();
  }, []);
  if (data) {
    data.data.map(wh => {
      context.setWarehouseList(data.data);
      renderHTML.push(<Warehouses data={wh} />);
    });
  }
  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/warehouse?limit=1000`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setData(response);
      });
  };
  return data ? (
    <>
      <div style={{ padding: '1rem' }}>
        <button
          onClick={() => props.setWarehouseForm(true)}
          className='pageButton big'
        >
          + Шинэ агуулах үүсгэх
        </button>
      </div>
      {renderHTML}
    </>
  ) : (
    <div>Түр хүлээнэ үү...</div>
  );
};

export { List, WarehouseContext };
