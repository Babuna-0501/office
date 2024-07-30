import { useState, useEffect, useRef } from 'react';
import css from './shops.module.css';
import closeicon from '../assets/close.svg';
import myHeaders from '../components/MyHeader/myHeader';
import checkedOn from '../assets/Tick Square on.svg';
import checkOff from '../assets/Tick Square.svg';
import chevronDown from '../assets/chevron-down.svg';

const Shops = props => {
  const [schedules, setSchedules] = useState([]);

  const [tradeShopLoading, setTradeShopLoading] = useState(false);
  const [tradeShopList, setTradeShopList] = useState([]);
  const [filteredTradeShops, setFilteredTradeShops] = useState([]);
  const [tradeShopCheck, setTradeShopCheck] = useState([]);

  const [userId, setUserId] = useState(undefined);
  const [supplierId, setSupplierId] = useState([]);

  const [businessTypes, setBusinessTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  const [selectedBusinessType, setSelectedBusinessType] = useState(undefined);
  const [selectedCity, setSelectedCity] = useState(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState(undefined);
  const [selectedKhoroo, setSelectedKhoroo] = useState(undefined);

  const [nameFilter, setNameFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');

  const [scheduleDropdown, setScheduleDropdown] = useState([]);

  const [scheduleRawData, setScheduleRawData] = useState(undefined);

  // Getting schedules using userId
  useEffect(() => {
    const getSchedules = async () => {
      try {
        if (!userId) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL2}/api/employee/schedule/get?user_id=${userId}`,
          {
            method: 'GET',
            headers: myHeaders
          }
        );
        const resData = await res.json();

        if (resData.data.length === 0) return;

        for (const sched of resData.data[0].schedule) {
          if (!sched.tradeshops) {
            sched.tradeshops = [];
          }
        }

        setSchedules(resData.data[0].schedule);
        setScheduleRawData(resData.data[0]);
      } catch (error) {
        console.log('error on fetching schedules: ', error);
      }
    };

    getSchedules();
  }, [userId]);

  // Getting zoneids and supplierId from user data
  useEffect(() => {
    if (props.data.supplier_id) {
      setSupplierId(
        Number(props.data.supplier_id.replaceAll('|', '')) === 1
          ? 13884
          : Number(props.data.supplier_id.replaceAll('|', ''))
      );
    }

    if (props.data.user_id) {
      setUserId(props.data.user_id);
    }
  }, [props.data]);

  // Getting Business Types and Locations
  useEffect(() => {
    const getSiteData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/site_data`,
          {
            method: 'GET',
            headers: myHeaders
          }
        );

        const resData = await res.json();

        setBusinessTypes(resData.business_types);
        setLocations(resData.location);
      } catch (error) {
        console.log('error on gettins site data: ', error);
      }
    };

    getSiteData();
  }, []);

  // Getting TradeShops using userId
  useEffect(() => {
    const getTradeShops = async () => {
      try {
        if (!userId) return;
        setTradeShopLoading(true);

        let tradeShopResponse = [];

        const idRes = await fetch(
          `${process.env.REACT_APP_API_URL2}/api/backoffice/users?id=${userId}`,
          {
            method: 'GET',
            headers: myHeaders
          }
        );
        const idResData = await idRes.json();
        let shopIds = [];

        if (idResData.data[0].tradeshop) {
          shopIds = [...shopIds, ...JSON.parse(idResData.data[0].tradeshop)];
        }

        if (idResData.data[0].custome_tradeshops) {
          shopIds = [
            ...shopIds,
            ...JSON.parse(idResData.data[0].custome_tradeshops)
          ];
        }

        shopIds = [...new Set(shopIds)];

        if (shopIds.length > 0) {
          const shopRes = await fetch(
            `${
              process.env.REACT_APP_API_URL2
            }/api/sfa/tradeshop/list?supplierId=${supplierId}&tradeshop=${shopIds.toString()}`,
            {
              method: 'GET',
              headers: myHeaders
            }
          );
          const shopResData = await shopRes.json();

          for (const data of shopResData) {
            tradeShopResponse = [
              ...tradeShopResponse,
              ...data[supplierId].tradeshops
            ];
          }
        }

        setTradeShopList(tradeShopResponse);
      } catch (error) {
        console.log('error on getting tradeshops: ', error);
      } finally {
        setTradeShopLoading(false);
      }
    };

    getTradeShops();
  }, [userId]);

  // Filtering TradeShops and filling TradeShopCheck with false
  useEffect(() => {
    let tradeShopCopy = [...tradeShopList];

    if (selectedBusinessType) {
      tradeShopCopy = tradeShopCopy.filter(
        shop => Number(shop.channel) === selectedBusinessType
      );
    }

    if (selectedCity) {
      tradeShopCopy = tradeShopCopy.filter(
        shop => Number(shop.address.city) === selectedCity
      );
    }

    if (selectedDistrict) {
      tradeShopCopy = tradeShopCopy.filter(
        shop => Number(shop.address.district) === selectedDistrict
      );
    }

    if (selectedKhoroo) {
      tradeShopCopy = tradeShopCopy.filter(
        shop => Number(shop.address.khoroo) === selectedKhoroo
      );
    }

    if (nameFilter !== '') {
      tradeShopCopy = tradeShopCopy.filter(
        shop =>
          shop.name &&
          shop.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          shop.name[0].toLowerCase() === nameFilter[0].toLowerCase()
      );
    }

    if (phoneFilter !== '') {
      tradeShopCopy = tradeShopCopy.filter(shop => {
        const phones = shop.phone.split(',');
        for (const phone of phones) {
          if (phone[0] === phoneFilter[0] && phone.includes(phoneFilter))
            return true;
        }

        return false;
      });
    }

    if (addressFilter !== '') {
      tradeShopCopy = tradeShopCopy.filter(shop =>
        shop.address.detail.toLowerCase().includes(addressFilter.toLowerCase())
      );
    }

    const tradeShopCheckCopy = Array.from(Array(tradeShopCopy.length)).map(
      () => false
    );
    const scheduleDropdownCopy = Array.from(Array(tradeShopCopy.length)).map(
      () => false
    );

    setFilteredTradeShops(tradeShopCopy);
    setTradeShopCheck(tradeShopCheckCopy);
    setScheduleDropdown(scheduleDropdownCopy);
  }, [
    tradeShopList,
    selectedBusinessType,
    selectedCity,
    selectedDistrict,
    selectedKhoroo,
    nameFilter,
    phoneFilter,
    addressFilter
  ]);

  // Setting District as undefined when City becomes undefined
  useEffect(() => {
    if (!selectedCity) {
      setSelectedDistrict(undefined);
    }
  }, [selectedCity]);

  // Setting Khoroo as undefined when District becomes undefined
  useEffect(() => {
    if (!selectedDistrict) {
      setSelectedKhoroo(undefined);
    }
  }, [selectedDistrict]);

  // Tradeshop Checkbox Handler
  const checkShopHandler = index => {
    if (index === 'all') {
      if (
        tradeShopCheck.filter(check => check === true).length ===
        filteredTradeShops.length
      ) {
        setTradeShopCheck(tradeShopCheck.map(() => false));
      } else {
        setTradeShopCheck(tradeShopCheck.map(() => true));
      }
    } else {
      const checkCopy = [...tradeShopCheck];
      checkCopy[index] = !checkCopy[index];

      setTradeShopCheck(checkCopy);
    }
  };

  const scheduleDropdownHandler = index => {
    let scheduleDropdownCopy = [...scheduleDropdown];

    if (!scheduleDropdownCopy[index]) {
      scheduleDropdownCopy = scheduleDropdownCopy.map((check, ind) => {
        if (ind === index) return true;
        return false;
      });
    } else {
      scheduleDropdownCopy[index] = false;
    }

    setScheduleDropdown(scheduleDropdownCopy);
  };

  const scheduleSelectHandler = (tradeShopId, shopIndex, scheduleIndex) => {
    const scheduleCopy = [...schedules];

    if (tradeShopCheck.includes(true)) {
      const checkCopy = [...tradeShopCheck];

      if (!checkCopy[shopIndex]) {
        checkCopy[shopIndex] = true;
        setTradeShopCheck(checkCopy);
      }

      const shopsId = [];
      for (let i = 0; i < checkCopy.length; i++) {
        if (checkCopy[i]) {
          shopsId.push(filteredTradeShops[i].tradeshop_id);
        }
      }

      let isAllIdExist = true;
      for (const id of shopsId) {
        if (!scheduleCopy[scheduleIndex].tradeshops.includes(id)) {
          isAllIdExist = false;
          break;
        }
      }

      if (isAllIdExist) {
        for (const id of shopsId) {
          scheduleCopy[scheduleIndex].tradeshops = scheduleCopy[
            scheduleIndex
          ].tradeshops.filter(shopId => shopId !== id);
        }
      } else {
        for (const id of shopsId) {
          if (!scheduleCopy[scheduleIndex].tradeshops.includes(id)) {
            scheduleCopy[scheduleIndex].tradeshops.push(id);
          }
        }
      }

      setSchedules(scheduleCopy);

      return;
    }

    if (scheduleCopy[scheduleIndex].tradeshops.includes(tradeShopId)) {
      scheduleCopy[scheduleIndex].tradeshops = scheduleCopy[
        scheduleIndex
      ].tradeshops.filter(id => id !== tradeShopId);
    } else {
      scheduleCopy[scheduleIndex].tradeshops.push(tradeShopId);
    }

    setSchedules(scheduleCopy);
  };

  // Close Handler
  const closeHandler = () => {
    props.setShopopen(false);
  };

  const submitHandler = async () => {
    try {
      if (tradeShopList.length === 0) return;

      const id = scheduleRawData._id;
      const data = { ...scheduleRawData };
      delete data._id;
      data.schedule = schedules;

      const res = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/employee/schedule/put`,
        {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            id,
            data
          })
        }
      );

      const resData = await res.json();

      if (resData.code === 200) {
        setTradeShopCheck(tradeShopCheck.map(() => false));
        setScheduleDropdown(scheduleDropdown.map(() => false));

        alert('Амжилттай хадгалагдлаа');
      } else {
        throw new Error(resData.message);
      }
    } catch (error) {
      console.log('error while submiting: ', error);
      alert('Алдаа гарлаа');
    }
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.closewrapper}>
          <div className={css.headercontainer}>Дэлгүүрүүд хувиарлах</div>
          <img src={closeicon} alt='close' onClick={closeHandler} />
        </div>

        {!tradeShopLoading && tradeShopList.length === 0 && (
          <div>Та өөрийн хамааралтай бүсчлэлээ оруулна уу</div>
        )}
        <div className={css.shopswrapper}>
          <div className={css.shopsheader}>
            <div
              className={css.headerwrapper}
              style={{
                width: '3%'
              }}
              onClick={() => checkShopHandler('all')}
            >
              <span></span>

              <img
                alt='check'
                src={
                  tradeShopCheck.filter(check => check === true).length ===
                    filteredTradeShops.length && filteredTradeShops.length > 0
                    ? checkedOn
                    : checkOff
                }
                style={{
                  width: '25px',
                  height: '25px',
                  marginLeft: '10px'
                }}
              />
            </div>

            <div
              className={css.headerwrapper}
              style={{
                width: '10%'
              }}
            >
              <span>Ү.цэгийн нэр</span>
              <input
                type='text'
                value={nameFilter}
                onChange={e => setNameFilter(e.target.value)}
              />
            </div>

            <div
              className={css.headerwrapper}
              style={{
                width: '10%'
              }}
            >
              <span>Утасны дугаар</span>
              <input
                type='text'
                value={phoneFilter}
                onChange={e => setPhoneFilter(e.target.value)}
              />
            </div>
            {/* Business Types */}
            <div
              className={css.headerwrapper}
              style={{
                width: '10%'
              }}
            >
              <span>Суваг</span>
              <select
                value={selectedBusinessType}
                onChange={e => {
                  setSelectedBusinessType(Number(e.target.value));
                }}
              >
                <option value={undefined}>--Суваг--</option>
                {businessTypes.map((type, index) => {
                  return (
                    <option
                      value={type.business_type_id}
                      key={`business-type-${index}`}
                    >
                      {type.business_type_name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* City */}
            <div
              className={css.headerwrapper}
              style={{
                width: '10%'
              }}
            >
              <span>Хот</span>

              <select
                value={selectedCity}
                onChange={e => {
                  setSelectedCity(Number(e.target.value));
                }}
              >
                <option value={undefined}>--Хот--</option>
                {locations
                  .filter(location => location.parent_id === 0)
                  .map((location, index) => {
                    return (
                      <option
                        value={location.location_id}
                        key={`city-${index}`}
                      >
                        {location.location_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            {/* District */}
            <div
              className={css.headerwrapper}
              style={{
                width: '10%'
              }}
            >
              <span>Дүүрэг</span>

              <select
                value={selectedDistrict}
                onChange={e => {
                  setSelectedDistrict(Number(e.target.value));
                }}
              >
                <option value={undefined}>--Дүүрэг--</option>
                {locations
                  .filter(location => location.parent_id === selectedCity)
                  .map((location, index) => {
                    return (
                      <option
                        value={location.location_id}
                        key={`district-${index}`}
                      >
                        {location.location_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            {/* Khoroo */}
            <div
              className={css.headerwrapper}
              style={{
                width: '10%'
              }}
            >
              <span>Хороо</span>

              <select
                value={selectedKhoroo}
                onChange={e => {
                  setSelectedKhoroo(Number(e.target.value));
                }}
              >
                <option value={undefined}>--Хороо--</option>
                {locations
                  .filter(location => location.parent_id === selectedDistrict)
                  .map((location, index) => {
                    return (
                      <option
                        value={location.location_id}
                        key={`khoroo-${index}`}
                      >
                        {location.location_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div
              className={css.headerwrapper}
              style={{
                width: '10%'
              }}
            >
              <span>Хаяг</span>
              <input
                type='text'
                value={addressFilter}
                onChange={e => setAddressFilter(e.target.value)}
              />
            </div>
            <div
              className={css.headerwrapper}
              style={{
                width: '10%'
              }}
            >
              <span>Өдрийн хуваарь</span>
              <input />
            </div>
          </div>

          <div className={css.shopone}>
            {filteredTradeShops.map((shop, index) => {
              const city = locations.find(
                loc => loc.location_id === Number(shop.address.city)
              );
              const district = locations.find(
                loc => loc.location_id === Number(shop.address.district)
              );
              const khoroo = locations.find(
                loc => loc.location_id === Number(shop.address.khoroo)
              );
              const businessType = businessTypes.find(
                type => type.business_type_id === Number(shop.channel)
              );
              let currentSchedule;

              for (const schedule of schedules) {
                if (schedule.tradeshops.includes(shop.tradeshop_id)) {
                  currentSchedule = schedule;
                  break;
                }
              }

              return (
                <div
                  key={`shop-item-${index}`}
                  className={
                    tradeShopCheck[index] ? css.newattirbute : css.attribute
                  }
                >
                  <div
                    className={css.shoponewrapper}
                    style={{
                      width: '3%'
                    }}
                    onClick={() => checkShopHandler(index)}
                  >
                    <img
                      src={tradeShopCheck[index] ? checkedOn : checkOff}
                      style={{
                        width: '20px',
                        height: '20px'
                      }}
                      alt='checked icon'
                    />
                  </div>
                  <div
                    className={css.shoponewrapper}
                    style={{
                      width: '10%'
                    }}
                  >
                    <span>{shop.name}</span>
                  </div>
                  <div
                    className={css.shoponewrapper}
                    style={{
                      width: '10%'
                    }}
                  >
                    <span>{shop.phone}</span>
                  </div>
                  <div
                    className={css.shoponewrapper}
                    style={{
                      width: '10%'
                    }}
                  >
                    <span>
                      {businessType ? businessType.business_type_name : ''}
                    </span>
                  </div>
                  <div
                    className={css.shoponewrapper}
                    style={{
                      width: '10%'
                    }}
                  >
                    <span>{city && city.location_name}</span>
                  </div>
                  <div
                    className={css.shoponewrapper}
                    style={{
                      width: '10%'
                    }}
                  >
                    <span>{district && district.location_name}</span>
                  </div>
                  <div
                    className={css.shoponewrapper}
                    style={{
                      width: '10%'
                    }}
                  >
                    <span>{khoroo && khoroo.location_name}</span>
                  </div>
                  <div
                    className={css.shoponewrapper}
                    style={{
                      width: '10%'
                    }}
                  >
                    <span
                      style={{
                        overflow: 'hidden'
                      }}
                      // title={item.address.address}
                    >
                      {shop.address?.detail ?? ''}
                    </span>
                  </div>
                  <div
                    className={css.shoponewrapper}
                    style={{
                      width: '10%'
                    }}
                  >
                    <div className={css.scheduleSelectWrapper}>
                      <button
                        type='button'
                        onClick={() => scheduleDropdownHandler(index)}
                      >
                        <span style={{ whiteSpace: 'nowrap' }}>
                          {currentSchedule
                            ? currentSchedule.name
                            : '--Хуваарь--'}
                        </span>
                        <img src={chevronDown} alt='Chevron Down' />
                      </button>

                      <div
                        onClick={e => e.stopPropagation()}
                        className={`${css.scheduleDropdown} ${
                          scheduleDropdown[index] ? css.show : null
                        }`}
                      >
                        {schedules.map((schedule, indexSched) => {
                          return (
                            <div
                              key={`schedule-dropdown-${indexSched}`}
                              className={css.dropdownItem}
                            >
                              <input
                                checked={schedule.tradeshops.includes(
                                  shop.tradeshop_id
                                )}
                                type='checkbox'
                                id={`${schedule.name}-${index}`}
                                onChange={() => {
                                  scheduleSelectHandler(
                                    shop.tradeshop_id,
                                    index,
                                    indexSched
                                  );
                                }}
                              />
                              <label htmlFor={`${schedule.name}-${index}`}>
                                {schedule.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={css.bntcontainer}>
            <button onClick={closeHandler} className={css.cancel}>
              Цуцлах
            </button>
            <button onClick={submitHandler} className={css.confirm}>
              Хадгалах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;
