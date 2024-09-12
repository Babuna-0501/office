import React, { useContext, useEffect, useState } from 'react';
import css from './lendcheck.module.css';
import arrowRight from '../../assets/Arrow - Right.svg';
import LendHook from '../../Hooks/LendHook';
import Select from 'react-select';
import myHeaders from '../../components/MyHeader/myHeader';
import ShopInfos from '../ShopInfos/ShopInfos';
import { Modal as GeneralModal } from '../components/Modal';
import Background from '../../Order/Othercomponents/Background';
import ShopInfoOther from '../ShopInfos/ShopInfoOther';

const LendCheck = props => {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [workPerson, setWorkPerson] = useState(null);
  const [startD, setStartD] = useState(null);
  const [endD, setEndD] = useState(null);
  const [leasingLimitValue, setLeasingLimitValue] = useState(null);
  const [tradeshopsInfo, setTradeshopsInfo] = useState([]);
  const [newTrdIDS, setNewTrdIDS] = useState([]);

  const lendctx = useContext(LendHook);
  const switchHandler = () => {
    lendctx.setSwitchState(prev => {
      lendctx.setSwitchState(!prev);
    });
  };
  var requestOptions = {
    method: 'GET',
    headers: myHeaders
  };
  // console.log("lendcheck props", props);
  // console.log("lendctx.worker", lendctx.worker);

  useEffect(() => {
    setWorkPerson(lendctx.worker);
    let ids = [];

    if (lendctx.worker.zones.length > 27) {
      let aa = lendctx.worker.zones.split(',');

      ids.push(...aa);
    } else if (lendctx.worker.zones !== null) {
      ids.push(lendctx.worker.zones);
    }

    ids &&
      ids?.map(item => {
        fetch(
          `${process.env.REACT_APP_API_URL2}/api/zones?id=${item}`,
          requestOptions
        )
          .then(res => res.json())
          .then(res => {
            // console.log("res ponse+++++", res);
            let data = [];
            if (res.code === 200) {
              res.data.map(item => {
                data.push({
                  value: item._id,
                  label: item.name
                });
              });
              setZoneOptions(prev => [...prev, ...data]);
            }
          })
          .catch(error => {
            console.log('error', error);
          });
      });
    // console.log("zoneOptions", zoneOptions);
    if (lendctx.worker.leasing !== null) {
      let aa = Number.isInteger(lendctx.worker.leasing.leasing_total);
      if (aa) {
        setLeasingLimitValue(lendctx.worker.leasing.leasing_total);
        lendctx.setLeasingLimit(lendctx.worker.leasing.leasing_total);
      }
      let keysdata = Object.keys(lendctx.worker.leasing);
      keysdata.map(item => {
        if (item !== 'leasing_total') {
          setEndD(lendctx.worker.leasing[item].end_date);
          lendctx.setEndDate(lendctx.worker.leasing[item].end_date);
          setStartD(lendctx.worker.leasing[item].start_date);
          lendctx.setStartDate(lendctx.worker.leasing[item].start_date);
        }
      });
    }
  }, [lendctx.worker]);

  useEffect(() => {
    let supplerid = lendctx.worker.supplier_id.replaceAll('|', '');
    // console.log("lendctx.zoneIDS 111", lendctx.zoneIDS);
    supplerid = supplerid == 1 ? 13884 : supplerid;
    lendctx.zoneIDS.map(x => {
      let url = `${
        process.env.REACT_API_URL2
      }/sfa/zone/tradeshops?supplierId=${Number(supplerid)}&zoneId=${x}`;
      // console.log("url", url);
      fetch(url, requestOptions)
        .then(res => res.json())
        .then(res => {
          // console.log("response", res);
          setNewTrdIDS(prev => [...prev, ...res]);
          if (res.length !== 0) {
            // console.log("newtrdids", newTrdIDS);
            fetch(
              `${
                process.env.REACT_APP_API_URL2
              }/sfa/tradeshop/list?supplierId=${Number(
                supplerid
              )}&tradeshop=${res.toString()}`,
              requestOptions
            )
              .then(res => res.json())
              .then(res => {
                // console.log("res tradeshop list", res);
                let data_one = [];

                if (lendctx.worker.leasing !== null) {
                  res.map(item => {
                    item.total_amount = lendctx.worker.leasing[
                      item[Number(supplerid)]?.user_id
                    ]?.total_amount
                      ? lendctx.worker.leasing[item[Number(supplerid)]?.user_id]
                          ?.total_amount
                      : 0;
                    item.zoneid = x;
                    data_one.push(item);
                  });
                } else {
                  res.map(item => {
                    data_one.push({
                      ...item,
                      zoneid: x
                    });
                  });
                }
                // console.log("data_one", data_one);

                setTradeshopsInfo(prev => [...prev, ...data_one]);
                lendctx.setAllDelguur(prev => [...prev, ...data_one]);
              })
              .catch(error => {
                console.log('error', error);
              });
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    });
  }, [lendctx.zoneIDS]);

  const LeasingHandler = e => {
    setLeasingLimitValue(e.target.value);
    lendctx.setLeasingLimit(e.target.value);
  };

  const handleChange = selectedOptions => {
    // console.log("selectedoptions", selectedOptions);
    let ids = [];
    selectedOptions.map(item => {
      ids.push(item.value);
    });
    // console.log("selected ids", ids);
    lendctx.setZoneIDS(ids);
    lendctx.setZoneMap(selectedOptions);
  };

  const startDateHandler = e => {
    setStartD(e.target.value);
    lendctx.setStartDate(e.target.value);
  };
  const endDateHandler = e => {
    setEndD(e.target.value);
    lendctx.setEndDate(e.target.value);
  };
  const closeHandler = () => {
    lendctx.setCustomerModal(false);
    lendctx.setLendState(false);
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.headerwrapper}>
          <p className={css.name}>{workPerson && workPerson.first_name}</p>
          <p className={css.title}>
            {workPerson && workPerson.role !== null
              ? workPerson.role
              : 'Худалдааны төлөөлөгч'}
          </p>
        </div>
        <div className={css.lendwrapper}>
          <div className={css.midwrapper}>
            <span>Зээлийн лимит</span>
            <div className={css.inputwrapper}>
              {' '}
              <input
                placeholder='0₮'
                type='text'
                value={leasingLimitValue}
                onChange={LeasingHandler}
              />
            </div>
          </div>
          <div className={css.midwrapper}>
            <span>Эхлэх дуусах огноо оруулах</span>
            <div className={css.inputwrapper}>
              {' '}
              <input
                placeholder='Эхлэх огноо'
                type='date'
                value={startD}
                onChange={startDateHandler}
              />
              <img
                src={arrowRight}
                style={{
                  width: '26px',
                  height: '26px',
                  marginRight: '5px',
                  marginLeft: '5px'
                }}
              />
              <input
                placeholder='Дуусах огноо'
                type='date'
                value={endD}
                onChange={endDateHandler}
              />
            </div>
          </div>
        </div>
        <div className={css.switchcontainer}>
          <span onClick={switchHandler}>
            {lendctx.switchState === false ? (
              <img
                src='/media/off.svg'
                alt='switch off'
                style={{
                  width: '60px',
                  height: '30px',
                  cursor: 'pointer'
                }}
              />
            ) : (
              <img
                src='/media/on.svg'
                alt='switch on'
                style={{
                  width: '60px',
                  height: '30px',
                  cursor: 'pointer'
                }}
              />
            )}
          </span>
          <span className={css.content}>
            Хэрэглэгчийн зээлийн эрх <br></br>нээх/хаах{' '}
          </span>
        </div>
        {lendctx.switchState === true && (
          <div className={css.selectOption}>
            <div>
              <span className={css.lendname}>
                Зээлд хамаарах харилцагчийн бүсчлэл
              </span>
            </div>
            <div>
              <Select
                isMulti
                name='colors'
                options={zoneOptions}
                onChange={handleChange}
                className='basic-multi-select'
                classNamePrefix='БӨАБӨ'
              />
            </div>
          </div>
        )}
        {lendctx.switchState === true &&
          props.data.userData.company_id === '|1|' && (
            <ShopInfoOther
              props={props}
              tradeshopsInfo={tradeshopsInfo}
              newTrdIDS={newTrdIDS}
              setEndDate={setEndD}
              setStartDate={setStartD}
            />
          )}
        {lendctx.switchState === true &&
          props.data.userData.company_id !== '|1|' && (
            <ShopInfoOther
              props={props}
              tradeshopsInfo={tradeshopsInfo}
              newTrdIDS={newTrdIDS}
              setEndDate={setEndD}
              setStartDate={setStartD}
            />
          )}

        {
          <duv className={css.delguurcontainer}>
            <div className={css.delguurtotal}>
              {lendctx.allDelguur
                ? `Нийт дэлгүүрийн тоо: ${tradeshopsInfo.length}`
                : null}{' '}
            </div>
          </duv>
        }
        {lendctx.customerModal && (
          <Background>
            <div
              style={{
                width: '320px',
                height: '300px',
                borderRadius: '14px',
                overflow: 'hidden'
              }}
            >
              <GeneralModal
                content='Зээлийн тохиргоо амжилттай үүслээ.'
                onClick={closeHandler}
              />
            </div>
          </Background>
        )}
      </div>
    </div>
  );
};

export default LendCheck;
