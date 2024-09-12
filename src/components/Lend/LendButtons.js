import React, { useContext, useState, useEffect } from 'react';
import { Button } from '../common';
import css from './lendbuttons.module.css';
import LendHook from '../../Hooks/LendHook';
import myHeaders from '../MyHeader/myHeader';
import AppHook from '../../Hooks/AppHook';
import LendCheck from '../../Lend/Lendcheck/LendCheck';

function LendButtons() {
  const lendctx = useContext(LendHook);
  const appctx = useContext(AppHook);
  const [btn, setBtn] = useState(false);
  // console.log("appctx");

  const zoneCancelHandler = () => {
    lendctx.setZoneState(false);
  };
  const zoneApproveHandler = () => {
    // lendctx.setZoneState(false);
    // console.log("lendctx.worker", lendctx.worker);
    let customerIDS = [];
    let zoneIDS = [];
    lendctx.customerData.map(item => {
      customerIDS.push(item.customer_id);
    });
    lendctx.filteredZones.map(item => {
      zoneIDS.push(item._id);
    });

    var raw = JSON.stringify({
      user_id: lendctx.worker.user_id,
      zones: zoneIDS
      // special_tradeshops: customerIDS,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log("lend zones seting update", requestOptions);

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`,
      requestOptions
    )
      .then(r => r.json())
      .then(response => {
        // console.log("response", response);
        if (response.code === 200) {
          lendctx.setZoneModal(true);
          lendctx.setFilteredZones([]);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const cancelHandler = () => {
    lendctx.setShopLeasing([]);
    lendctx.setLeasingLimit(null);
    lendctx.setStartDate(null);
    lendctx.setEndDate(null);
    lendctx.setZoneIDS([]);
    lendctx.setLendState(false);
    lendctx.setWorker(null);
    lendctx.setAllDelguur([]);
  };

  ///// zeel hadgalj bn
  const approveHandler = () => {
    if (lendctx.startDate === null || lendctx.endDate === null) {
      alert('Та эхлэл болон дуусах огноогоо оруулна уу...');
      return;
    }
    if (lendctx.leasingLimit === null) {
      alert('Та зээлийн хязгаарыг оруулна уу...');
      return;
    }
    // if (lendctx.zoneIDS.length === 0) {
    //   alert("Та зээлд хамрагдах бүсчлэлээ оруулна уу...");
    //   return;
    // }

    let totalLeasingPerShop = 0;

    let shoplist = [];

    lendctx.allDelguur.map(item => {
      if (item.total_amount) {
        totalLeasingPerShop += Number(item.total_amount);
        shoplist.push(item);
      }
    });

    // console.log("lendctx.leasingLimit", lendctx.leasingLimit);
    // console.log("lendctx.allDelguur", lendctx.allDelguur);
    // console.log("totalLeasingPerShop", totalLeasingPerShop);
    // console.log("shoplist", shoplist);

    if (Number(lendctx.leasingLimit) < Number(totalLeasingPerShop)) {
      alert(
        `Таны дэлгүүрийн зээлийн нийт дүн, таны зээлийн эрхийн нийт дүнгээс хэтэрсэн байна. Хэтэрсэн зөрүү : ${
          totalLeasingPerShop - Number(lendctx.leasingLimit)
        }₮`
      );
      return;
    }

    let shops = [];
    // console.log("lendctx.allDelguur", lendctx.allDelguur);

    // if (appctx.userData.company_id === "|1|") {
    //   lendctx.allDelguur.map((x) => {
    //     if (x.total_amount !== null) {
    //       shops.push({
    //         [x.t_id]: {
    //           total_amount: Number(x.total_amount),
    //           zone_id: x.zone_id ? x.zone_id : "62f4aabe45a4e22552a3969f",
    //           zone_name: x.zone_name ? x.zone_name : "MGL",
    //           start_date: lendctx.startDate,
    //           end_date: lendctx.endDate,
    //           created_date: new Date(),
    //         },
    //       });
    //     }
    //   });
    // }
    // console.log("lendctx.allDelguur", lendctx.allDelguur);

    if (appctx.userData.company_id) {
      lendctx.allDelguur.map(x => {
        // console.log("all delguur xalll other   --- ", x);
        if (x.total_amount !== null) {
          // console.log("lendctx.zoneMap", lendctx.zoneMap);
          shops.push({
            [x[
              `${
                appctx.userData.company_id.replaceAll('|', '') == 1
                  ? 13884
                  : appctx.userData.company_id.replaceAll('|', '')
              }`
            ].user_id]: {
              total_amount: Number(x.total_amount),
              zone_id: lendctx.zoneMap ? x.zoneid : '62f4aabe45a4e22552a3969f',
              zone_name: lendctx.zoneMap.filter(
                item => item.value === x.zoneid && item
              )[0].label,
              start_date: lendctx.startDate,
              end_date: lendctx.endDate,
              created_date: new Date()
            }
          });
        }
      });
    }
    // console.log("shops", shops);

    let data = {};
    shops.map(item => {
      for (const [key, value] of Object.entries(item)) {
        // console.log(`${key}: ${value.total_amount}`);
        if (value.total_amount > 0) {
          data = {
            ...data,
            ...item
          };
        }
        // shopids.push(key);
      }

      // data = { ...data, ...item };
    });

    // console.log("data ---- 1----------------", data);

    let newRawData = {
      user_id: lendctx.worker.user_id,
      leasing: {
        ...data,
        leasing_total: Number(lendctx.leasingLimit)
      }
    };

    if (shoplist.length === 0) {
      alert('Та бүсчлэлээ сонгоод, дэлгүүрт зээлийн утгыг олгоно уу ...');
      return;
    }
    setBtn(true);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newRawData),
      redirect: 'follow'
    };
    // console.log("new raw data", requestOptions);

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`,
      requestOptions
    )
      .then(r => r.json())
      .then(response => {
        // console.log("response", response);
        if (response.code === 200) {
          setBtn(false);

          lendctx.setAllDelguur([]);
          lendctx.setStartDate(null);
          lendctx.setEndDate(null);
          lendctx.setLeasingLimit(null);
          lendctx.setLendState(false);
          shoplist = [];
          shops = [];
          alert(`${response.message}`);
          // appctx.setPage(["lend"]);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const addWorker = () => {
    // console.log("clicked");
    lendctx.setNewWorkers(true);
  };
  return (
    <div className={css.container}>
      {lendctx.lendState && (
        <Button
          variant='secondary'
          size='medium'
          width={90}
          onClick={cancelHandler}
        >
          Цуцлах
        </Button>
      )}
      {lendctx.lendState && (
        <Button
          variant='primary'
          size='medium'
          width={156}
          onClick={approveHandler}
          style={{
            display: btn ? 'hidden' : 'block'
          }}
        >
          Хадгалах-
        </Button>
      )}
      {lendctx.zoneState && (
        <Button
          variant='secondary'
          size='medium'
          width={90}
          onClick={zoneCancelHandler}
        >
          Цуцлах
        </Button>
      )}
      {lendctx.zoneState && (
        <Button
          variant='primary'
          size='medium'
          width={156}
          onClick={zoneApproveHandler}
        >
          Хадгалах+
        </Button>
      )}
      {!lendctx.lendState && !lendctx.zoneState && (
        <Button variant='primary' size='medium' width={156} onClick={addWorker}>
          Ажилтан нэмэх
        </Button>
      )}
    </div>
  );
}

export default LendButtons;
