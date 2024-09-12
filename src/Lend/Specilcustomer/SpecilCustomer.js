import React, { useContext, useState, useEffect } from 'react';
import css from './specilcustomer.module.css';
import Background from '../../Order/Othercomponents/Background';
import Button from '../components/Button';
import LendHook from '../../Hooks/LendHook';
import Headers from '../Headers/Headers';
import { styles } from './style';
import Customer from './Customer';
import myHeaders from '../../components/MyHeader/myHeader';
import userHook from '../../Hooks/userHook';

const SpecilCustomer = () => {
  const [customerFalse, setCustomerFalse] = useState([]);
  const [allMerchant, setAllMerchant] = useState([]);
  const [chosedMerchants, setChosedMerchants] = useState([]);
  const [markedPoint, setMarkedPoint] = useState([]);
  const lendctx = useContext(LendHook);
  const userctx = useContext(userHook);
  // console.log("userctx", userctx);

  const cancelHandler = () => {
    lendctx.setSpecilCustomer(false);
  };

  useEffect(() => {
    let controller = new AbortController();
    fetch(`${process.env.REACT_APP_API_URL2}/api/tradeshop/alldata`, {
      method: 'GET',
      headers: myHeaders,
      signal: controller.signal
    })
      .then(r => r.json())
      .then(response => {
        // console.log("response marker", response.result);

        let aa = [];
        if (response.result) {
          response?.result?.map(item => {
            if (item.g_latitude !== null || item.g_longtitude !== null) {
              aa.push(item);
            }
          });
        }
        setMarkedPoint(aa);
        controller = null;
      });
    return () => controller?.abort();
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL2}/api/merchants`, requestOptions)
      .then(r => r.json())
      .then(response => {
        // console.log("response merchant", response);
        let data = [];
        let customerDatas = [];
        response.data.map(item => {
          data.push(false);

          // let businessName;
          let cityName;
          let khorooName;
          // console.log("item", item);
          let businessName = userctx?.sitedata?.business_types.map(x => {
            let aa;
            if (x.business_type_id === Number(item.business_type_id)) {
              aa = x.business_type_name;
            }
            return aa;
          });

          userctx.sitedata.location.map(x => {
            if (x.location_id === Number(item.district)) {
              cityName = x.location_name;
            }
            if (x.location_id === Number(item.horoo)) {
              khorooName = x.location_name;
            }
          });

          customerDatas.push({
            ...item,
            businesName: businessName,
            cityName: cityName,
            khorooName: khorooName
          });
        });
        // console.log("customerdatas", customerDatas);
        setCustomerFalse(data);
        setAllMerchant(customerDatas);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);
  const ChoseHandler = (e, position) => {
    // console.log("e", e);
    // console.log("position", position);
    const updatedCheckedState = customerFalse.map((item, index) =>
      index === position ? !item : item
    );
    setCustomerFalse(updatedCheckedState);
  };
  // console.log("customerFalse", customerFalse);
  const approveHandler = () => {
    let customerData = [];
    customerFalse.map((item, index) => {
      if (item) {
        customerData.push(allMerchant[index]);
      }
    });

    lendctx.setCustomerData(customerData);
    lendctx.setSpecilCustomer(false);
  };

  return (
    <Background>
      <div className={css.container}>
        <div className={css.firstContainer}>
          <Headers title='Онцгой харилцагч нэмэх' onClick={cancelHandler} />
          <div className={css.bodyWrapper}>
            <div className={css.header}>
              <div
                className={css.columnheader}
                style={{
                  ...styles.checkboxcontainer
                }}
              >
                <input
                  style={{
                    width: '18.5px',
                    height: '18.5px'
                  }}
                />
              </div>
              <div
                className={css.columnheader}
                style={{
                  ...styles.codeContainer
                }}
              >
                <span>Ү.цэгийн нэр</span>
                <input />
              </div>
              <div
                className={css.columnheader}
                style={{
                  ...styles.positionContainer
                }}
              >
                <span>Суваг</span>
                <input />
              </div>
              <div
                className={css.columnheader}
                style={{
                  ...styles.nameContainer
                }}
              >
                <span>Ү.ажиллагааны чиглэл</span>
                <input />
              </div>
              <div
                className={css.columnheader}
                style={{
                  ...styles.dateContainer
                }}
              >
                <span>Байгууллагын нэр</span>
                <input />
              </div>
              <div
                className={css.columnheader}
                style={{
                  ...styles.zoneContainer
                }}
              >
                <span>Дүүрэг/Сум</span>
                <input />
              </div>
              <div
                className={css.columnheader}
                style={{
                  ...styles.settingContainer
                }}
              >
                <span>Хороо</span>
                <input />
              </div>
              <div
                className={css.columnheader}
                style={{
                  ...styles.addressContainer
                }}
              >
                <span>Хаягын дэлгэрэнгүй</span>
                <input style={{ visibility: 'hidden' }} />
              </div>
            </div>
            <div className={css.customercontainer}>
              {allMerchant.map((item, index) => {
                return (
                  <Customer
                    key={index}
                    data={item}
                    onClick={ChoseHandler}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className={css.containerbtn}>
          <Button className={css.cancelwrapper} onClick={cancelHandler}>
            Цуцлах
          </Button>
          <Button className={css.approvewrapper} onClick={approveHandler}>
            Хадгалах
          </Button>
        </div>
      </div>
    </Background>
  );
};

export default SpecilCustomer;
