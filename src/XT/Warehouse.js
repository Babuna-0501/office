import React, { useState, useEffect } from 'react';
import css from './warehouse.module.css';
import closeicon from '../assets/close.svg';
import checkedsvg from '../assets/Tick Square on 2.svg';
import uncheckedsvg from '../assets/Tick Square.svg';
import myHeaders from '../components/MyHeader/myHeader';

const Warehouse = props => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [userData, setUserData] = useState([]);
  const [inventorydata, setInventorydata] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const getInventories = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL2}/api/warehouse/get/new?limit=200`;
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();
        setInventorydata(resData.data);
      } catch (error) {
        console.log(error);
      }
    };

    getInventories();
  }, []);

  useEffect(() => {
    setData(inventorydata);
    let dd = [];
    inventorydata.map(item => {
      dd.push(false);
    });

    let data = [];
    if (props.data.inventory) {
      if (props.data.inventory.length > 25) {
        let aa = props.data.inventory.split(',');
        data = aa;
      } else {
        data = props.data.inventory;
      }
    }

    setUserData(data);
  }, [props, inventorydata]);

  const Checkhandler = (item, index) => {
    if (userData.includes(item._id)) {
      let aa = userData.filter(x => x !== item._id);
      setUserData(aa);
    } else {
      let aa = [];
      if (typeof userData == 'string') {
        aa.push(userData);
      } else {
        aa = [...userData];
      }
      setUserData(prev => [...aa, item._id]);
    }
  };

  const SaveHandler = () => {
    let rawData = JSON.stringify({
      user_id: props.data.user_id,
      inventory: userData ? userData.toString() : null
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: rawData
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`;

    fetch(url, requestOptions)
      .then(rs => rs.json())
      .then(res => {
        if (res.code === 200) {
          let data = props.worksdata;
          data = data.map(item => {
            if (item.user_id === props.data.user_id) {
              return {
                ...item,
                inventory: userData ? userData.toString() : null
              };
            }
            return item;
          });
          props.setWorksdata(data);
          props.setAguulahOpen(false);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredWarehouses = inventorydata.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <span>Худалдааны төлөөлөгчийн нэрс : {props.data.first_name}</span>
          <img
            src={closeicon}
            alt='close icon'
            onClick={() => {
              props.setAguulahOpen(false);
            }}
          />
        </div>
        <div className={css.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Агуулах хайх..."
            className={css.searchInput}
          />
        </div>
        <div className={css.body}>
          <div className={css.subheader}>
            <div style={{ width: '50px' }}>ID</div>
            <div style={{ width: '150px' }}>Агуулахын нэр</div>
          </div>
          <div className={css.subbody}>
            {filteredWarehouses.map((item, index) => (
              <div className={css.subaguulah} key={item._id}>
                <div style={{ width: '50px' }}>
                  <img
                    src={userData.includes(item._id) ? checkedsvg : uncheckedsvg}
                    style={{ width: '25px', height: '25px' }}
                    onClick={() => Checkhandler(item, index)}
                    alt="check"
                  />
                </div>
                <div style={{ width: '150px' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={css.footer}>
          <button
            className={css.cancel}
            onClick={() => {
              props.setAguulahOpen(false);
            }}
          >
            Цуцлах
          </button>
          <button className={css.confirm} onClick={SaveHandler}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
