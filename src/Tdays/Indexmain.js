import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import css from './indexmaina.module.css';
import TdaysHook from '../Hooks/TdaysHook';
import ZonesHook from '../Hooks/ZonesHook';
import Calendarcomponent from './calendar/Calendarcomponent';
import List from './List';
import Update from './calendar/Update/Update';
import myHeaders from '../components/MyHeader/myHeader';
import { styles } from './style';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo(props => {
  const [searchDate, setSearchDate] = useState(null);
  const [searchZoneIndex, setSearchZoneIndex] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [zonedata, setZonedata] = useState([]);

  const tdaysctx = useContext(TdaysHook);
  const zonectx = useContext(ZonesHook);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  const get = () => {
    ReactDOM.render(
      <React.StrictMode>
        <List
          supplier={props.supplier}
          suppliers={props.suppliers}
          zonectx={zonectx}
          tdaysctx={tdaysctx}
          searchDate={searchDate}
          setUpdateModal={setUpdateModal}
        />
      </React.StrictMode>,
      document.getElementById('foobaraaaa')
    );
  };
  useEffect(() => {
    get();
  }, [props.supplier, zonectx, tdaysctx, searchDate]);
  useEffect(() => {
    zonectx?.setSearchzone(searchZoneIndex);
  }, [setSearchZoneIndex]);

  // const FeatchZones = () => {
  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //   };
  //   let url = `${process.env.REACT_APP_API_URL2}/api/zones`;
  //   // url = searchzone ? url + `?name=${searchzone}` : url;
  //   fetch(url, requestOptions)
  //     .then((r) => r.json())
  //     .then((res) => {
  //       setZonedata(res.data);
  //     })
  //     .catch((error) => {
  //       console.log("error zone ", error);
  //     });
  // };
  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL2}/api/zones`,
          {
            method: 'GET',
            headers: myHeaders,
            signal: controller.signal
          }
        );
        const res = await response.json();
        setZonedata(res.data);
        controller = null;
      } catch (e) {
        console.log('zone error', e);
      }
    })();
    return () => controller?.abort();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.rowHeaderlocal}>
        <div style={styles.checkboxcontainer}>
          <div className={css.firstContainer}>
            <span className='header'></span>
            <input type='checkbox' />
          </div>
        </div>
        <div style={styles.zonescontainer}>
          <div>
            <span className='header'>Бүсчлэл</span>
            <input
              type='text'
              // onKeyPress={(e) => searchById(e)}
              disabled='disabled'
              className={css.inputWrapper}
              // value={searchZoneIndex}
              // onChange={(e) => setSearchZoneIndex(e.target.value)}
            />
          </div>
        </div>
        <div style={{ ...styles.showcontainer, marginRight: '10px' }}>
          <span className='header'>Show</span>
          <input
            type='text'
            disabled
            // onKeyPress={(e) => searchById(e)}

            className={css.inputWrapper}
          />
        </div>
        <div
          style={{ ...styles.tugeeltiinContainer }}
          className={css.middleContainer}
        >
          <div className={css.middleWrapper}>
            <span className='header' style={{ width: '100%' }}>
              Түгээлтийн өдрийн хуваарь
            </span>
            <input
              type='text'
              placeholder='Хайх ...'
              value={searchDate}
              onChange={e => setSearchDate(e.target.value)}
            />
          </div>
        </div>
        <div style={styles.supplierContainer}>
          <div>
            <span className='header' style={{ width: '100%' }}>
              Нийлүүлэгч
            </span>
            <input type='text' placeholder='Хайх ...' />
          </div>
        </div>
        <div style={styles.createdcontainer}>
          <div>
            <span className='header' style={{ width: '100%' }}>
              Үүссэн огноо
            </span>
            <input type='date' placeholder='Хайх ...' />
          </div>
        </div>
        <div style={styles.createdUser}>
          <div>
            <span className='header' style={{ width: '100%' }}>
              Үүссэн хэрэглэгч
            </span>
            <input type='text' placeholder='Хайх ...' disabled='disabled' />
          </div>
        </div>
        <div style={styles.updatedUser}>
          <div>
            <span className='header' style={{ width: '100%' }}>
              Шинэчилсэн хэрэглэгч
            </span>
            <input type='text' placeholder='Хайх ...' disabled='disabled' />
          </div>
        </div>
        <div style={{ width: '180px' }}>
          <div></div>
        </div>
      </div>
      {tdaysctx?.newDays && (
        <Calendarcomponent zonedata={zonedata} user={props.userData} />
      )}
      {updateModal && (
        <Update
          setUpdateModal={setUpdateModal}
          zonedata={zonedata}
          user={props.userData}
        />
      )}
      <div id='foobaraaaa' className={css.body}></div>
    </div>
  );
}, areEqual);

export default Index;
