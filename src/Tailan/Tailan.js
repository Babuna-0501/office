import React, { useContext, useEffect, useState } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
import css from './tailan.module.css';
import checkboxicon from '../assets/check box.svg';
import chechboxchecked from '../assets/Tick Square on 2.svg';
import closeIcon from '../assets/close.svg';
import AppHook from '../Hooks/AppHook';
import SupplierHook from '../Hooks/SupplierHook';
const Tailan = props => {
  const [data, setData] = useState([]);
  const [bustype, setBustype] = useState([]);
  const [parent, setParent] = useState(null);
  const [soumdata, setSoumdata] = useState([]);
  const [oneaimag, setOneaimag] = useState(null);
  const [bustypefalse, setBustypefalse] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [chosedSupplier, setChosedSupplier] = useState([]);
  const [songogdsonShops, setSongogdsonShops] = useState([]);

  const [tradelist, setTradelist] = useState([]);

  const [active, setActive] = useState(null);

  const appctx = useContext(AppHook);
  const supctx = useContext(SupplierHook);

  const rawdata = [
    { id: 0, name: 'Улаанбаатар' },
    { id: 1, name: 'Орон нутаг' }
  ];

  useEffect(() => {
    let supID = appctx.userData.company_id;

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setSuppliersData(res.data);
        setActive();
      })
      .catch(error => {
        console.log('supplier fetch error', error);
      });
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let supID = appctx.userData.company_id.replaceAll('|', '');
    let urlList = `${
      process.env.REACT_APP_API_URL2
    }/sfa/tradeshop/list?supplierId=${supID == 1 ? 13884 : supID}`;
    fetch(urlList, requestOptions)
      .then(res => res.json())
      .then(res => {
        let data = [];
        res.map((item, index) => {
          item[`${supID == 1 ? 13884 : supID}`].tradeshops.map((x, index) => {
            x.chosed = false;
            data.push(x);
          });
        });
        setTradelist(data);
      })
      .catch(error => {
        console.log('tradeshop list fetch error', error);
      });
    // console.log("vatctx.zoneinfo", vatctx.zonesInfo);
  }, []);
  useEffect(() => {
    console.log('props');
    if (props.updatedata) {
      let copypropsdata = props.updatedata;
      console.log('props.updatedata', props.updatedata.name);
      setChosedSupplier(Number(props.updatedata.name));

      // let copydata = data?.map((item) => {
      //   if (item.parent_id == copypropsdata[`${Number(item.parent_id)}`]) {
      //     if (
      //       item.location_id ===
      //       copypropsdata[`${Number(item.parent_id)}`][
      //         `${Number(item.location_id)}`
      //       ]
      //     ) {
      //       console.log("gantshan", item);
      //       return {
      //         ...item,
      //         channels:
      //           copypropsdata[item.parent_id][item.location_id].channels,
      //         tradeshops:
      //           copypropsdata[item.parent_id][item.location_id].tradeshops,
      //       };
      //     }
      //   }
      // });

      // setData(copydata);
    }
  }, [props]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/site_data`, requestOptions)
      .then(res => res.json())
      .then(res => {
        let data = [];
        let busfalse = [];

        res.location.map(item => {
          item.checked = null;
          item.channelIDS = [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ];
          item.channels = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25
          ];
          let tradeshop = [];
          tradelist.map((x, i) => {
            if (
              x.address.city < 11 &&
              x.address.city == item.parent_id &&
              x.address.district == item.location_id
            ) {
              tradeshop.push(x);
            } else if (
              x.address.city >= 11 &&
              x.address.city == item.location_id
            ) {
              tradeshop.push(x);
            }
          });
          item.tradeshops = tradeshop;

          data.push(item);
        });

        setData(data);
        setBustype(res.business_types);
        for (let i = 0; i < res.business_types.length; i++) {
          busfalse.push(true);
        }
        setBustypefalse(busfalse);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [tradelist]);

  /////// Bayanzurh songood 28 khoroo garch irsen

  // if (data) {
  //   data &&
  //     data.map((item) => {
  //       if (item.parent_id === 5) {
  //         console.log("bayanzurh", item);
  //       }
  //     });
  // }

  // console.log("setData--------------setData", data);
  const FirstHandler = (item, index) => {
    if (item.id === 0) {
      setParent(1);
      setActive(0);
    }
    if (item.id === 1) {
      setParent(0);
      setActive(1);
    }
  };
  const AimagHandler = (item, index) => {
    console.log('item++++++++++++++++++++++++', item);

    setOneaimag(item);
    let newState = data.map(obj => {
      if (obj.location_id == item.location_id) {
        // console.log("obje", obj);
        return {
          ...obj,
          checked: checkedHandler(obj.checked)
        };
      }
      return obj;
    });
    // console.log("newState---newState", newState);
    setData(newState);
    setBustypefalse(item.channelIDS);

    let newdata = data.filter((x, index) => x.location_id === item.location_id);

    setSoumdata(newdata);
  };
  const BusHandler = (x, i) => {
    let update = bustypefalse.map((item, position) =>
      i === position ? !item : item
    );
    // console.log("update", update);

    let chanids = [];

    update.map((item, index) => {
      if (item) {
        chanids.push(index + 1);
      }
    });

    setBustypefalse(update);
    let newState = data.map(obj => {
      if (obj.location_id === oneaimag.location_id) {
        return {
          ...obj,
          channels: chanids,
          channelIDS: update
        };
      }
      return obj;
    });
    // console.log("newstate", newState);
    // console.log("oneaimag", oneaimag);
    let newaimag = { ...oneaimag };
    newaimag.channelIDS = update;
    setOneaimag(newaimag);
    setData(newState);
  };
  useEffect(() => {
    // console.log("oneaimage", oneaimag);
    let chosed = [];

    tradelist.map(item => {
      if (item.address.district == oneaimag?.location_id) {
        chosed.push(item);
      }
    });
  }, [oneaimag]);

  useEffect(() => {
    let dataB = data;
    let newShops = [];
    // console.log("tradelist", tradelist);
    dataB.map(item => {
      if (item.checked) {
        tradelist.map((x, index) => {
          if (
            x.address.district == item.location_id &&
            item.channels.includes(Number(x.channel))
          ) {
            newShops.push(x);
          }
        });
      }
    });
  }, [data]);

  const DelguurHandler = (item, index) => {
    console.log('item', item);
    // console.log("oneaimag-------+++++++++oneaimag", oneaimag);
    let newState = oneaimag.tradeshops.map(obj => {
      if (obj.tradeshop_id === item.tradeshop_id) {
        return {
          ...obj,
          chosed: checkedHandler(obj.chosed)
        };
      }
      return obj;
    });

    let newData = data.map(obj => {
      if (obj.location_id === oneaimag.location_id) {
        return {
          ...obj,
          tradeshops: newState
        };
      }
      return obj;
    });

    setData(newData);

    setOneaimag({
      ...oneaimag,
      tradeshops: newState
    });
    // console.log("tradelist", tradelist);

    if (item.chosed) {
      let shopdata = songogdsonShops.filter(
        x => x.tradeshop_id !== item.tradeshop_id
      );
      setSongogdsonShops(shopdata);
    }
    if (item.chosed === false) {
      setSongogdsonShops(prev => [...prev, item]);
    }
  };

  const SaveHandler = () => {
    let objRaw = {};
    let parentids = [];
    let checkedTrue = [];

    let supplier = suppliersData.filter(item => item.id == chosedSupplier);
    // console.log("props.updatedata", props.updatedata);
    if (props.updatedata.length !== 0) {
      supplier = [
        {
          name: props.updatedata.name
        }
      ];
    }

    if (supplier.length === 0) {
      alert('Та нийлүүлэгчээ сонгоно уу');

      return;
    }

    data.map((item, index) => {
      if (item.checked) {
        parentids.push(item.parent_id);
        checkedTrue.push(item);
      }
    });

    let uniqueChars = [...new Set(parentids)];
    uniqueChars.map(item => {
      let objectadata = {};
      checkedTrue.map(x => {
        if (item === x.parent_id) {
          let tradeshoids = [];
          x.tradeshops &&
            x.tradeshops.map(item => {
              if (item.chosed) {
                tradeshoids.push(item.tradeshop_id);
              }
            });
          objectadata[x.location_id] = {
            channels: x.channels,
            tradeshops: tradeshoids ? tradeshoids : []
          };
        }
      });
      objRaw[item] = { ...objectadata };
      // objRaw.name = chosedSupplier;
      objRaw.name = supplier[0].name;
    });

    // console.log("objRaw ------------------objRaw", objRaw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(objRaw),
      redirect: 'follow'
    };
    console.log('requestOptions', requestOptions);

    let urlList = `${process.env.REACT_APP_API_URL2}/api/supplier/options`;
    // console.log("props.updatedata", props);
    if (props.updatedata.length === 0) {
      urlList = `${process.env.REACT_APP_API_URL2}/api/supplier/options`;
    }
    if (props.updatedata.length !== 0) {
      urlList = `${process.env.REACT_APP_API_URL2}/api/supplier/options?id=${props.updatedata._id}`;
    }

    // console.log("songogdsonShops ---- songogdsonShops", urlList);

    fetch(urlList, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
        if (res.code === 200 || res.success === true) {
          supctx.setDataopen(false);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const SoumHandler = item => {
    // console.log("item", item);
    let newstate = data.map(obj => {
      if (obj.location_id === item.location_id) {
        return {
          ...obj,
          checked: checkedHandler(obj.checked)
        };
      }
      return obj;
    });
    setData(newstate);
  };
  function checkedHandler(item) {
    // console.log("item+++++---", item);
    let aa = null;
    if (item === null) {
      aa = true;
    }
    if (item === true) {
      aa = false;
    }
    if (item === false) {
      aa = true;
    }
    return aa;
  }

  const DeleteShop = (item, index) => {
    let aa = songogdsonShops.filter((item, i) => i !== index);
    setSongogdsonShops(aa);
  };

  useEffect(() => {
    let newdata = data.map(obj => {
      if (obj.tradeshoids) {
        obj.tradeshoids.map((ix, i) => {
          songogdsonShops.map(x => {
            if (ix.tradeshop_id === x.tradeshop_id) {
              return {
                ...ix,
                chosed: true
              };
            } else {
              return {
                ...ix,
                chosed: false
              };
            }
          });
        });
      }
      return obj;
    });

    setData(newdata);
    console.log('newdata', newdata);
  }, [songogdsonShops]);

  return (
    <div className={css.maincontainer}>
      <div className={css.closewrapper}>
        <img
          src={closeIcon}
          alt='close button'
          onClick={() => {
            supctx.setDataopen(false);
          }}
        />
      </div>
      <div
        className={css.suppliercontainer}
        style={{
          display: props.updatedata.length !== 0 ? 'none' : 'block'
        }}
      >
        {appctx.userData.company_id === '|1|' && (
          <select
            value={chosedSupplier}
            onChange={e => {
              setChosedSupplier(e.target.value);
            }}
          >
            {suppliersData.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
        )}
        {appctx.userData.company_id !== '|1|' && (
          <select
            value={suppliersData[0]}
            onChange={e => {
              setChosedSupplier(e.target.value);
            }}
          >
            {suppliersData.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div className={css.container}>
        <div className={css.ubcontainer}>
          <div className={css.spanwrapper}>Сонгох</div>{' '}
          {rawdata.map((item, index) => {
            return (
              <div
                onClick={() => FirstHandler(item, index)}
                className={css.wrapper}
              >
                <img src={index === active ? chechboxchecked : checkboxicon} />{' '}
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
        <div className={css.aimagcontainer}>
          {parent !== null && (
            <div className={css.spanwrapper}>
              {parent === 1 ? 'Дүүрэг' : 'Аймаг'}
            </div>
          )}

          {parent !== null &&
            data
              .filter(item => item.parent_id == parent)
              .filter(item => item.location_id !== 1)
              .map((item, index) => {
                // console.log("item ,khoroo", item);

                return (
                  <div
                    onClick={() => AimagHandler(item, index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    className={css.wrapper}
                  >
                    <img
                      src={
                        item.checked === true ? chechboxchecked : checkboxicon
                      }
                    />{' '}
                    <span>{item.location_name}</span>
                  </div>
                );
              })}
        </div>
        <div className={css.soumscontainer}>
          {oneaimag !== null && (
            <div className={css.spanwrapper}>
              {parent === 0 ? 'Сум' : 'Хороо'}
            </div>
          )}

          {soumdata &&
            data
              .filter(item => item.parent_id === soumdata[0]?.location_id)
              .map((item, index) => {
                return (
                  <div
                    className={css.wrapper}
                    onClick={() => SoumHandler(item)}
                  >
                    {' '}
                    <img
                      src={
                        item.checked === true ? chechboxchecked : checkboxicon
                      }
                    />{' '}
                    <span>{item.location_name}</span>
                  </div>
                );
              })}
        </div>
        <div className={css.channelcontainer}>
          {oneaimag && <div className={css.spanwrapper}>Суваг</div>}
          {oneaimag &&
            oneaimag.channelIDS?.map((item, index) => {
              return (
                <div
                  onClick={() => BusHandler(item, index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  className={css.wrapper}
                >
                  <img
                    src={
                      oneaimag.channelIDS[index] === true
                        ? chechboxchecked
                        : checkboxicon
                    }
                  />{' '}
                  <span>{bustype[index]?.business_type_name}</span>
                </div>
              );
            })}
        </div>

        <div className={css.shopscontainer}>
          <div className={css.spanwrapper}>{oneaimag ? 'Дэлгүүр' : ''}</div>
          <div className={css.shopswrapper}>
            {' '}
            {oneaimag &&
              oneaimag.tradeshops.map((item, index) => {
                return (
                  <div
                    onClick={() => DelguurHandler(item, index)}
                    style={{
                      display:
                        oneaimag.channelIDS[item.channel] === true
                          ? 'flex'
                          : 'none',
                      alignItems: 'center'
                    }}
                    className={css.wrapper}
                  >
                    <img
                      src={
                        item.chosed === true ? chechboxchecked : checkboxicon
                      }
                    />{' '}
                    <span>{item.name}</span>
                  </div>
                );
              })}
          </div>
          {/* <div>Нийт {oneaimag?.tradeshops && oneaimag?.tradeshops?.length}</div> */}
        </div>
        <div className={css.shopscontainer}>
          {songogdsonShops.length !== 0 && (
            <div className={css.spanwrapper}>Сонгогдсон дэлгүүр</div>
          )}
          <div className={css.shopswrapper}>
            {' '}
            {songogdsonShops &&
              songogdsonShops.map((item, index) => {
                return (
                  <div
                    onClick={() => DeleteShop(item, index)}
                    style={{
                      display:
                        oneaimag.channelIDS[item.channel] === true
                          ? 'flex'
                          : 'none',
                      alignItems: 'center'
                    }}
                    className={css.wrapper}
                  >
                    <img
                      src={
                        item.chosed === true ? chechboxchecked : checkboxicon
                      }
                    />{' '}
                    <span>{item.name}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className={css.btncontainer}>
        {/* <div className={css.inputwrapper}>
          <input
            placeholder="Нэр оруулах ..."
            value={namevalue}
            onChange={(e) => {
              setNamevalue(e.target.value);
            }}
          />
        </div> */}
        <button className={css.btn} onClick={SaveHandler}>
          Хадгалах
        </button>
      </div>
    </div>
  );
};

export default Tailan;
