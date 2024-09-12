import React, { useState, useEffect, useContext } from 'react';
import css from './shops.module.css';
import myHeaders from '../../components/MyHeader/myHeader';
import checkbox from '../../assets/check box.svg';
import checked from '../../assets/Tick Square_green.svg';
import ProductReportHook from '../../Hooks/ProductsReportHook';
import checkboxred from '../../assets/checkbox_red.svg';
import checkboxred_checked from '../../assets/checkbox_red_checked.svg';

const SitedataHandler = () => {};

const Shops = props => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [searchID, setSearchID] = useState(null);
  const [page, setPage] = useState(0);
  const [ids, setIds] = useState([]);
  const [channeltype, setChanneltype] = useState(null);
  const [channelid, setChannelid] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [checkedvalue, setCheckedvalue] = useState(false);
  const [sitedata, setSitedata] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [khoroo, setKhoroo] = useState(null);
  const [newids, setNewids] = useState([]);

  const prodctx = useContext(ProductReportHook);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/site_data`, requestOptions)
      .then(r => r.json())
      .then(response => {
        setSitedata(response);
        fetch(
          `${process.env.REACT_APP_API_URL2}/api/merchants?page=0`,
          requestOptions
        )
          .then(r => r.json())
          .then(res => {
            setData(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let params = '';

    if (searchID?.length > 3) {
      params += `id=${Number(searchID)}&`;
    }
    if (channelid !== null && channelid !== '-Суваг-') {
      params += `business_type_id=${Number(channelid)}&`;
    }
    if (name !== null) {
      params += `tradeshop_name=${name.toLowerCase()}&`;
    }
    if (phone !== null && phone.length > 7) {
      params += `phone=${phone}&`;
    }
    if (city !== null && city !== '-Хот-') {
      params += `city=${city}&`;
    }
    if (district !== null && district !== '-Дүүрэг-') {
      params += `district=${district}&`;
    }
    if (khoroo !== null && khoroo !== '-Хороо-') {
      params += `khoroo=${khoroo}&`;
    }

    let url = `${process.env.REACT_APP_API_URL2}/api/merchants?${params}page=${page}`;

    if (checkedvalue) {
      url = `${process.env.REACT_APP_API_URL2}/api/merchants?${params}page=all`;
    }
    console.log('merchant url', url);
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        // console.log("res", response);

        if (checkedvalue) {
          let tradeshops = [];
          response.data.map(item => {
            tradeshops.push(item.tradeshop_id);
          });
          setIds(tradeshops);
        }

        setData(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [
    searchID,
    page,
    channelid,
    name,
    phone,
    checkedvalue,
    city,
    district,
    khoroo
  ]);
  useEffect(() => {
    let bustype = {};
    props.data1.map(item => {
      bustype[item.business_type_id] = item.business_type_name;
    });
    console.log(bustype);
    setChanneltype(bustype);
  }, [props]);

  console.log('props', props);

  const CancelHandler = () => {};
  const SubmitHandler = () => {};
  return (
    <div className={css.container}>
      <div>
        <div className={css.header}>
          <div className={css.wrapper}>
            <input
              className={css.checkbox}
              type='checkbox'
              value={checkedvalue}
              onChange={e => {
                setCheckedvalue(!checkedvalue);
                if (!checkedvalue) {
                  setIds([]);
                }
              }}
            />
          </div>
          <div className={css.wrapper}>
            <span>Name</span>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className={css.wrapper}>
            <span>Утасны дугаар</span>
            <input name={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className={css.wrapper}>
            <span>TradeID</span>
            <input
              value={searchID}
              onChange={e => {
                setSearchID(e.target.value);
              }}
            />
          </div>
          <div className={css.wrapper}>
            <span>Суваг</span>
            <select
              value={channelid}
              onChange={e => {
                setChannelid(e.target.value);
              }}
            >
              <option>-Суваг-</option>
              {sitedata &&
                sitedata.business_types.map(item => {
                  return (
                    <option
                      key={item.business_type_id}
                      value={item.business_type_id}
                    >
                      {item.business_type_name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={css.wrapper}>
            <span>Хот</span>
            <select
              value={city}
              defaultValue={1}
              onChange={e => {
                setCity(e.target.value);
              }}
            >
              <option>-Хот-</option>
              {sitedata &&
                sitedata.location
                  .filter(x => x.parent_id === 0)
                  .map(item => {
                    return (
                      <option key={item.location_id} value={item.location_id}>
                        {item.location_name}
                      </option>
                    );
                  })}
            </select>
          </div>
          <div className={css.wrapper}>
            <span>Дүүрэг</span>
            <select
              value={district}
              onChange={e => {
                setDistrict(e.target.value);
              }}
            >
              <option>-Дүүрэг-</option>
              {sitedata &&
                sitedata.location
                  .filter(x => x.parent_id == city)
                  .map(item => {
                    return (
                      <option key={item.location_id} value={item.location_id}>
                        {item.location_name}
                      </option>
                    );
                  })}
            </select>
          </div>
          <div className={css.wrapper}>
            <span>Хороо</span>
            <select
              value={khoroo}
              onChange={e => {
                setKhoroo(e.target.value);
              }}
            >
              <option>-Хороо-</option>
              {sitedata &&
                sitedata.location
                  .filter(x => x.parent_id == district)
                  .map(item => {
                    return (
                      <option key={item.location_id} value={item.location_id}>
                        {item.location_name}
                      </option>
                    );
                  })}
            </select>
          </div>
          <div className={css.wrapper}>
            <span>Хаяг</span>
            <input />
          </div>
        </div>
        <div className={css.body}>
          {data &&
            data.map((item, index) => {
              let city =
                sitedata &&
                sitedata.location &&
                sitedata.location.find(x => x.location_id == item.city)
                  ?.location_name;

              let disctictname =
                sitedata &&
                sitedata.location &&
                sitedata.location.find(x => x.location_id == item.district)
                  ?.location_name;

              let khorooname =
                sitedata &&
                item.horoo &&
                sitedata.location &&
                sitedata.location.find(x => x.location_id == item.horoo)
                  ?.location_name;

              return (
                <div className={css.oneitem} key={index}>
                  <div className={css.one}>
                    <img
                      src={ids.includes(item.tradeshop_id) ? checked : checkbox}
                      onClick={() => {
                        let aa = [...ids];
                        if (aa.includes(item.tradeshop_id)) {
                          aa = aa.filter(x => x !== item.tradeshop_id);
                          setIds(aa);
                          props.setTradeIDS([...aa]);
                        } else {
                          setIds([...aa, item.tradeshop_id]);
                          props.setTradeIDS([
                            ...props.tradeIDS,
                            item.tradeshop_id
                          ]);
                        }
                      }}
                    />

                    <img
                      src={
                        newids.includes(item.tradeshop_id)
                          ? checkboxred_checked
                          : checkboxred
                      }
                      onClick={() => {
                        let aa = [...newids];
                        if (aa.includes(item.tradeshop_id)) {
                          aa = aa.filter(x => x !== item.tradeshop_id);
                          setNewids([...aa]);
                          props.setExcludes(aa);
                        } else {
                          setNewids(prev => [...prev, item.tradeshop_id]);
                          props.setExcludes([
                            ...props.excludes,
                            item.tradeshop_id
                          ]);
                        }
                      }}
                      // style={{
                      //   display:
                      //     props.channelIDS &&
                      //     props.channelIDS.includes(
                      //       Number(item.business_type_id)
                      //     )
                      //       ? "block"
                      //       : "none",
                      // }}
                    />
                    <span>
                      {item.tradeshop_name ? item.tradeshop_name : null}
                    </span>
                  </div>
                  <div>
                    {item.tradeshop_phone ? item.tradeshop_phone : null}
                  </div>
                  <div>{item.tradeshop_phone ? item.tradeshop_id : null}</div>
                  <div>
                    {item.business_type_id
                      ? channeltype[Number(item.business_type_id)]
                      : null}
                  </div>
                  <div>{item.city ? city : null}</div>

                  <div>{item.district ? disctictname : null}</div>
                  <div>{item.horoo ? khorooname : null}</div>
                  <div>{item.address ? item.address : null}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Shops;
