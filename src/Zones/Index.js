import React, { useState, useEffect, useContext } from 'react';
import List from './List';
import css from './index.module.css';
import Modal from './ZonesMap/Modal';
import ZonesHook from '../Hooks/ZonesHook';
import UpdateModal from './Update/UpdateModal';
import myHeaders from '../components/MyHeader/myHeader';
import { styles } from './style';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo(props => {
  // console.log("props+++buschlel", props);

  // console.log("productsCtx", productsCtx);

  const [namesearch, setNamesearch] = useState('');
  const [priority, setPriority] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [data, setData] = useState([]);
  const [merchantsinfo, setMerchantsinfo] = useState([]);
  const zonesctx = useContext(ZonesHook);

  const { setHeaderContent } = useContext(HeaderContext);

  console.log('props', props.userData);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      signal: controller.signal,
      body: JSON.stringify({
        supplierId:
          props.userData.company_id === '|1|'
            ? 13884
            : props.userData.company_id.replaceAll('|', '')
      })
    };
    // `${process.env.REACT_APP_API_URL2}/api/sfa/tradeshop/list?supplierId=${props.userData.company_id.replaceAll("|","")}`;
    // fetch(`${process.env.REACT_APP_API_URL2}/api/tradeshop/alldata`, requestOptions)
    // fetch(
    //   `${process.env.REACT_APP_API_URL2}/api/sfa/tradeshop/list?supplierId=${props.userData.company_id.replaceAll(
    //     "|",
    //     ""
    //   )}`,
    //   requestOptions
    // )
    console.log('requestOptions', requestOptions);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/sfa/tradeshop/list`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        console.log('Merchants all merchants buramhan', res);
        let data = [];
        let supID =
          props.userData.company_id === '|1|'
            ? 13884
            : props.userData.company_id.replaceAll('|', '');
        res.map(item => {
          if (
            item[`${supID}`].tradeshops[0].address.coordinate[1] > 39 &&
            item[`${supID}`].tradeshops[0].address.coordinate[1] < 51 &&
            item[`${supID}`].tradeshops[0].address.coordinate[0] > 90 &&
            item[`${supID}`].tradeshops[0].address.coordinate[0] < 150
          ) {
            data.push(item);
          }
        });
        console.log('merchant data ', data);
        zonesctx.setMerchantDatas(data);
        setMerchantsinfo(data);
        controller = null;
      })
      .catch(error => {
        console.log('error', error);
      });
    return () => controller?.abort();
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/zones?name=${namesearch}&start_date=${startdate}&end_date=${enddate}&priority=${priority}`,
      requestOptions
    )
      .then(r => r.json())
      .then(response => {
        // console.log("data buschlel", response.data);
        zonesctx.setData(response.data);
        setData(response.data);
      })
      .catch(error => console.log('error', error));
  }, [props, namesearch, priority, startdate, enddate]);

  const searchById = e => {
    setNamesearch(e.target.value);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className='row header'>
          <div style={styles.checkboxcontainer}>
            <div>
              <input type='checkbox' className={css.inputcontainer} />
            </div>
          </div>
          <div style={styles.zonenamecontainer}>
            <div>
              <span className='header'>Бүсчлэлийн нэр</span>
              <input
                type='text'
                onKeyPress={e => searchById(e)}
                placeholder='Хайх ...'
                className={css.inputWrapper}
              />
            </div>
          </div>
          <div style={styles.suppliercontainer}>
            <div>
              <span className='header'>Нийлүүлэгч</span>
              <input type='text' />
            </div>
          </div>
          <div style={styles.showcontainer}>
            <div>
              <span className='header'>Show</span>
              <input type='number' disabled />
            </div>
          </div>
          <div style={styles.erembecontainer}>
            <div>
              <span className='header'>Эрэмбэ</span>
              <input
                type='number'
                value={priority}
                onChange={e => setPriority(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.createddatacontainer}>
            <div>
              <span className='header'>Үүссэн огноо</span>
              <input
                type='date'
                value={startdate}
                onChange={e => setStartdate(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.updatedatecontainer}>
            <div>
              <span className='header'>Шинэчилсэн огноо</span>
              <input
                type='date'
                onChange={e => setEnddate(e.target.value)}
                value={enddate}
              />
            </div>
          </div>
          <div style={styles.registercontainer}>
            <div>
              <span className='header'>Бүртгэсэн</span>
              <input type='text' disabled />
            </div>
          </div>
          <div style={{ width: '80px' }}>
            <div></div>
          </div>
        </div>
      </div>
      {zonesctx.modal && (
        <Modal
          supplier={props.supplier}
          merchantsinfo={merchantsinfo}
          data={props}
        />
      )}
      {zonesctx.updateModal && (
        <UpdateModal
          supplier={props.supplier}
          zonesctx={zonesctx}
          merchantsinfo={merchantsinfo}
          data={props}
        />
      )}
      <div id='foobarTwo' className={css.listwrapper}>
        {data.map((item, index) => {
          return (
            <List
              key={index}
              suppliers={props.suppliers}
              supplier={props.supplier}
              userData={props.userData}
              data={item}
              allData={data}
              hi={setData}
              zonesctx={zonesctx}
            />
          );
        })}
      </div>
    </div>
  );
}, areEqual);

export default Index;
