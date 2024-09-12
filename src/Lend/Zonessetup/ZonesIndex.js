import React, { useContext, useEffect, useState } from 'react';
import css from './zonesindex.module.css';
import LendHook from '../../Hooks/LendHook';
import SpanButton from '../components/SpanButton';
import SpecilCustomer from '../Specilcustomer/SpecilCustomer';
import ZonesChose from '../Zones/ZonesChose';
import Modal from '../Modal/Modal';
import Zone from '../components/Zone';
import { styles } from './style';
import CustomerList from './CustomerList';
import { Modal as GeneralModal } from '../components/Modal';
import Background from '../../Order/Othercomponents/Background';
import myHeaders from '../../components/MyHeader/myHeader';
import userHook from '../../Hooks/userHook';
import Hirender from './Hirender';

const ZonesIndex = () => {
  const [workPerson, setWorkPerson] = useState(null);
  const [zonesData, setZonesData] = useState([]);
  const lendctx = useContext(LendHook);
  const userctx = useContext(userHook);
  useEffect(() => {
    setWorkPerson(lendctx.worker);
  }, [lendctx.worker]);
  console.log('workPerson++++++++++---------- ', workPerson);
  useEffect(() => {
    // if (lendctx.worker.special_tradeshops !== null) {
    //   let ids = lendctx.worker.special_tradeshops.split(",");
    //   let allData = [];
    //   ids?.map((item) => {
    //     fetch(`${process.env.REACT_APP_API_URL2}/api/merchants?id=${item}`, {
    //       method: "GET",
    //       headers: myHeaders,
    //       redirect: "follow",
    //     })
    //       .then((r) => r.json())
    //       .then((r) => {
    //         // console.log("r", r.data[0]);
    //         // console.log("userctx.sitedata", userctx.sitedata);
    //         let businessName = userctx.sitedata.business_types.map((item) => {
    //           let aa;
    //           if (
    //             item.business_type_id === Number(r.data[0].business_type_id)
    //           ) {
    //             aa = item.business_type_name;
    //             return;
    //           }
    //           return aa;
    //         });
    //         let cityName;
    //         let khorooName;
    //         userctx.sitedata.location.map((item) => {
    //           if (item.location_id === Number(r.data[0].district)) {
    //             cityName = item.location_name;
    //           }
    //           if (r.data[0].horoo !== null) {
    //             if (item.location_id === Number(r.data[0].horoo)) {
    //               khorooName = item.location_name;
    //             }
    //           }
    //         });
    //         allData.push({
    //           ...r.data[0],
    //           businesName: businessName,
    //           cityName: cityName,
    //           khorooName: khorooName,
    //         });
    //       });
    //   });
    //   // lendctx.setFilteredZones(allData);
    // }
  }, [workPerson]);

  const zoneHandler = () => {
    lendctx.setSpecilZones(true);
  };
  const customerHandler = () => {
    lendctx.setSpecilCustomer(true);
  };
  const closeHandler = () => {
    lendctx.setZoneModal(false);
    lendctx.setZoneState(false);
    lendctx.setFilteredZones([]);
  };
  console.log('lendctx.filteredZones', lendctx.filteredZones);
  console.log('zonesData-------', zonesData);
  console.log('endctx.xtZones', lendctx.xtZones);

  return (
    <div className={css.container}>
      <div className={css.headercontainer}>
        <div className={css.headerwrapper}>
          <p className={css.name}>{workPerson && workPerson.first_name}</p>
          <p className={css.title}>
            {workPerson && workPerson.role !== null
              ? workPerson.role
              : 'Худалдааны төлөөлөгч'}
          </p>
        </div>
        <div className={css.btncontainer}>
          {/* {lendctx.filteredZones.length === 0 ? (
            <SpanButton className={`${css.firstBTN} ${css.disabled}`}>
              Бүсчлэл
            </SpanButton>
          ) : (
            <SpanButton className={css.firstBTN} onClick={zoneHandler}>
              Бүсчлэл
            </SpanButton>
          )} */}
          <SpanButton className={css.firstBTN} onClick={zoneHandler}>
            Бүсчлэл
          </SpanButton>
          <SpanButton className={css.firstBTN} onClick={customerHandler}>
            Онцгой харилцагч
          </SpanButton>
        </div>
      </div>
      <div className={css.bodywrapper}>
        <div>
          <h3>wORLD</h3>
          <Hirender data={lendctx.xtZones} />
          <div>
            {lendctx.xtZones.map((item, index) => {
              return <h1 key={index}>{item.name}</h1>;
            })}
          </div>
          {/* {zonesData &&
            zonesData.map((item, index) => {
              return <Zone title={item.name} key={index} />;
            })} */}
        </div>

        {/* <Modal title="Хувиарласан бүсчлэл эхнийх">
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {zonesData
              ? zonesData.map((item, index) => {
                  return <Zone title={item.name} key={index} />;
                })
              : null}
          </div>
        </Modal> */}

        {/* {zonesData ? (
          <Modal title="Хувиарласан бүсчлэл хоёрдахь">
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {zonesData &&
                zonesData.map((item, index) => {
                  console.log("item", item);
                  return <Zone title={item?.name} key={index} />;
                })}
              111
            </div>
          </Modal>
        ) : (
          <Modal title="Хувиарласан бүсчлэл эхнийх">
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {lendctx.filteredZones
                ? lendctx.filteredZones.map((item, index) => {
                    return <Zone title={item.name} key={index} />;
                  })
                : null}
            </div>
          </Modal>
        )} */}
        {workPerson && workPerson.zones === null ? (
          <span>Таньд бүсчлэл байхгүй байна.</span>
        ) : null}
        {/* <Modal>
          <div className={css.customerwrapper}>
            <div className={css.headerwrappertable}>
              <div
                className={css.headerone}
                style={{ ...styles.checkboxcontainer }}
              >
                <span>Ү.цэгийн нэр</span>
                <input />
              </div>
              <div
                className={css.headerone}
                style={{ ...styles.codeContainer }}
              >
                <span>Суваг</span>
                <input />
              </div>
              <div
                className={css.headerone}
                style={{ ...styles.positionContainer }}
              >
                <span>Ү.ажилгааны чиглэл</span>
                <input />
              </div>
              <div
                className={css.headerone}
                style={{ ...styles.nameContainer }}
              >
                <span>Байгууллагын нэр</span>
                <input />
              </div>{" "}
              <div
                className={css.headerone}
                style={{ ...styles.dateContainer }}
              >
                <span>Дүүрэг/Сум</span>
                <input />
              </div>
              <div
                className={css.headerone}
                style={{ ...styles.zoneContainer }}
              >
                <span>Хороо</span>
                <input />
              </div>
              <div
                className={css.headerone}
                style={{ ...styles.addressContainer }}
              >
                <span>Хаягын дэлгэрэнгүй</span>
                <input
                  style={{
                    visibility: "hidden",
                  }}
                />
              </div>
            </div>
            <div>
              {lendctx.customerData
                ? lendctx.customerData.map((item, index) => {
                    return <CustomerList key={index} data={item} />;
                  })
                : null}
            </div>
          </div>
        </Modal> */}
      </div>
      {lendctx.specilCustomer && <SpecilCustomer />}
      {lendctx.specilZones && <ZonesChose />}
      {lendctx.zoneModal && (
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
              content='Бүсчлэлийн тохиргоо амжилттай үүслээ.'
              onClick={closeHandler}
            />
          </div>
        </Background>
      )}
    </div>
  );
};
export default ZonesIndex;
