import React, { useState, useContext, useEffect } from 'react';
import { styles } from './style';
import css from './xt.module.css';
import Marshrut from './Marshrut';
import myHeaders from '../components/MyHeader/myHeader';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const XT = props => {
  const [active, setActive] = useState(null);
  const [listdata, setListdata] = useState([]);
  const [worksdata, setWorksdata] = useState([]);
  const [onextdata, setOnextdata] = useState([]);
  const [inventorydata, setInventorydata] = useState([]);
  const [roleman, setRoleman] = useState([]);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent setPage={props.appctx.setPage} />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useState(() => {
    let controller = new AbortController();

    fetch(
      `${
        process.env.REACT_APP_API_URL2
      }/api/backoffice/users?company=${props.userData.company_id.replaceAll(
        '|',
        ''
      )}`,
      {
        method: 'GET',
        headers: myHeaders,
        signal: controller.signal
      }
    )
      .then(res => res.json())
      .then(res => {
        setWorksdata(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    fetch(
      `${
        process.env.REACT_APP_API_URL2
      }/api/tracking?supplier=${props.userData.company_id.replaceAll('|', '')}`,
      {
        method: 'GET',
        headers: myHeaders,
        signal: controller.signal
      }
    )
      .then(r => r.json())
      .then(res => {
        // console.log("cancel reason data", res.list);

        setListdata(res.list);
        fetch(`${process.env.REACT_APP_API_URL2}/api/warehouse/get`, {
          method: 'GET',
          headers: myHeaders,
          signal: controller.signal
        })
          .then(res => res.json())
          .then(res => {
            // console.log("Inventory ", res);
            setInventorydata(prev => [...prev, ...res.data]);
            fetch(`${process.env.REACT_APP_API_URL2}/api/backoffice/role`, {
              method: 'GET',
              headers: myHeaders
            })
              .then(res => res.json())
              .then(res => {
                // console.log("res", res);
                setRoleman(res.roles);
              })
              .catch(error => {
                console.log('error', error);
              });
          })
          .catch(error => {
            console.log('error', error);
          });

        controller = null;
      })
      .catch(error => {
        console.log('order reason tathad aldaa ', error);
      });

    return () => controller?.abort();
  }, []);

  // console.log("listdata", listdata);

  const showHandler = (i, a) => {
    setActive(i);
    console.log('a----------a-----------a', a);
    setOnextdata(a);
  };
  return (
    <div className={css.container}>
      <div className={css.headerwrapper}>
        <div
          className={css.header}
          style={{
            ...styles.firstContainer
          }}
        >
          <span className={css.headerTitle}>Код</span>
          <input type='text' />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.adminContainer
          }}
        >
          <span className={css.headerTitle}>Албан тушаал</span>
          <input type='text' />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>Овог</span>
          <input type='text' />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>Нэр</span>
          <input type='text' />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          {/* <span className={css.headerTitle}>Бүсчлэл хувиарлах</span> */}
          <span className={css.headerTitle}>Маршрут </span>
          <input type='text' disabled />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>Дэлгүүр хувиарлах</span>
          <input type='text' disabled />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>Өдөр хувиарлах</span>
          <input type='text' disabled />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>Агуулах хувиарлах</span>
          <input type='text' disabled />
        </div>
        <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer
          }}
        >
          <span className={css.headerTitle}>Бүсчлэл хувиарлах</span>
          <input type='text' disabled />
        </div>
        {/* <div
          className={css.header}
          style={{
            ...styles.checkboxcontainer,
          }}
        >
          <span className={css.headerTitle}>ХТ дэлгүүр сонгох</span>
          <input type="text" disabled />
        </div> */}
      </div>
      <div className={css.wrapperbody}>
        {worksdata.map((item, index) => {
          return (
            <Marshrut
              data={item}
              roleman={roleman}
              key={index}
              onClick={() => showHandler(index, item)}
              index={index}
              setActive={setActive}
              listdata={listdata}
              onextdata={onextdata}
              inventorydata={inventorydata}
              worksdata={worksdata}
              setWorksdata={setWorksdata}
            />
          );
        })}
        {/* {active === index && <Onext />} */}
      </div>
    </div>
  );
};

export default XT;
