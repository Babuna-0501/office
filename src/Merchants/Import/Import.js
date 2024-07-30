import React, { useContext, useState, useEffect } from 'react';
import MerchantReportHook from '../../Hooks/MerchantReportHook';
import css from './import.module.css';
import myHeaders from '../../components/MyHeader/myHeader';
import CancelButton from '../../assets/vectorcancel-Icon.svg';

const Import = props => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState(0);
  const [district, setDistrict] = useState(0);
  const [khoroo, setKhoroo] = useState(0);
  const Ctx = useContext(MerchantReportHook);
  const [location, setLocation] = useState();
  const [suppliersdata, setSuppliersdata] = useState([]);
  const [onesup, setOnesup] = useState(null);

  const closeHandler = () => {
    Ctx.setNewSup(false);
  };

  let newdata = [];
  data &&
    data.map(item => {
      if (item.checked === false) {
        newdata.push({
          name: item.name,
          rd: item.rd,
          phone: item.phone,
          address: item.address,
          city: item.city,
          district: item.district,
          khoroo: item.khoroo,
          channel_name: item.channel_name,
          sub: item.sub
        });
      }
      return null; // Add this line to satisfy the array-callback-return requirement
    });

  const handleClick = item => {
    let updatedData = data.map((x, index) => {
      if (item === index) {
        return {
          ...x,
          checked: !x.checked
        };
      } else {
        return x;
      }
    });
    setData(updatedData);
  };

  console.log('Ctx.business_register', Ctx.merRegister);

  const newSuphandler = () => {
    if (
      props.userdata?.userData.company_id === '|1|' &&
      onesup === null &&
      onesup === 0
    ) {
      alert('Та нийлүүлэгчээ сонгоно уу');
      return;
    }

    let companyid =
      props.userdata?.userData.company_id === '|1|'
        ? onesup
        : parseInt(props.userdata.userData.company_id.replace(/\|/g, ''));
    console.log('companyid', companyid);
    console.log('data1234', data);

    let rawdata = {
      supplierId: parseInt(companyid),
      merchants: newdata
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(rawdata),
      redirect: 'follow'
    };

    console.log('requestOptions', requestOptions);

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/tradeshop/import`,
      requestOptions
    )
      .then(response => response.json())
      .then(response => {
        console.log('response :', response);
        if (response.response.acknowledged === true) {
          alert('Амжилттай');
          Ctx.setNewSup();
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    setData(prevData => [...Ctx.NewImportData]);
  }, [Ctx.NewImportData]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/site_data`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('111', res);
        setLocation(res);
      })
      .catch(error => {
        console.log('error', error);
      });

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        setSuppliersdata(res.data);
      })
      .catch(error => {
        console.log('aldaa', error);
      });
  }, []);

  console.log('data', data);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div
          style={{
            display:
              props.userdata?.userData.company_id == '|1|' ? 'block' : 'none'
          }}
        >
          <div className={css.HeadModal}>
            <div>
              <div>
                <select
                  style={{
                    widows: 299,
                    height: 42,
                    gap: 10,
                    padding: '9px 20px',
                    borderRadius: 3
                  }}
                  className={css.NiiluulegchSelect}
                  value={onesup}
                  onChange={e => {
                    setOnesup(e.target.value);
                  }}
                >
                  <option value={0}>--Нийлүүлэгч сонгох--</option>
                  {suppliersdata &&
                    suppliersdata.map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <button className={css.buttonContainer} onClick={closeHandler}>
              <img src={CancelButton} alt='Cancel' />
            </button>
          </div>
        </div>
        <div className={css.Header}>
          <div style={{ fontWeight: 700 }} className={css.nameContainer}>
            Нэр
          </div>
          <div style={{ fontWeight: 700 }} className={css.nameContainer}>
            РД
          </div>
          <div style={{ fontWeight: 700 }} className={css.nameContainer}>
            Утасны дугаар
          </div>
          <div style={{ fontWeight: 700 }} className={css.nameContainer}>
            Хот
          </div>
          <div style={{ fontWeight: 700 }} className={css.nameContainer}>
            Дүүрэг
          </div>
          <div style={{ fontWeight: 700 }} className={css.nameContainer}>
            Хороо
          </div>
          <div style={{ fontWeight: 700 }} className={css.nameContainer}>
            Дэлгэрэнгүй хаяг
          </div>
          <div style={{ fontWeight: 700 }} className={css.nameContainer}>
            Суваг
          </div>
        </div>
        <div className={css.body}>
          {data &&
            data.map((b, i) => {
              console.log('b', b);
              return (
                <div
                  className={css.exceldataContainer}
                  key={i}
                  style={{
                    // 	color:
                    // 		Ctx.merRegister.business_register === b?.rd
                    // 			? "red"
                    // 			: "inherit",
                    background:
                      b?.checked === true ? 'rgba(255, 236, 233, 1)' : '#fff'
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    className={css.nameContainer}
                  >
                    {b?.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    className={css.nameContainer}
                  >
                    {b?.rd}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    className={css.nameContainer}
                  >
                    {b?.phone}
                  </div>
                  <select
                    className={css.selecContainer}
                    style={{
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    value={b.city}
                    onChange={e => {
                      setCity(e.target.value);
                      let update = data.map((x, index) => {
                        if (index === i) {
                          return {
                            ...x,
                            city: e.target.value,
                            district: null,
                            khoroo: null
                          };
                        }
                        return x;
                      });

                      setData([...update]);
                    }}
                  >
                    <option>--SELECT--</option>
                    {location &&
                      location.location &&
                      location.location
                        .filter(item => item.parent_id == 0)
                        .map((loc, index) => (
                          <option key={index} value={loc.location_id}>
                            {loc.location_name}
                          </option>
                        ))}
                  </select>
                  <select
                    style={{
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    className={css.selecContainer}
                    value={b.district}
                    onChange={e => {
                      setDistrict(e.target.value);

                      let update = data.map((x, index) => {
                        if (index === i) {
                          return {
                            ...x,
                            district: e.target.value,
                            khoroo: null
                          };
                        }
                        return x;
                      });
                      setData([...update]);
                    }}
                  >
                    <option>--SELECT--</option>
                    {location &&
                      location.location &&
                      location.location
                        .filter(item => item.parent_id == b.city)
                        .map((loc, index) => (
                          <option
                            key={index}
                            value={loc.location_id}
                            disabled={loc.location_id === b.khoroo}
                          >
                            {loc.location_name}
                          </option>
                        ))}
                  </select>
                  <select
                    style={{
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    className={css.selecContainer}
                    value={b.khoroo}
                    onChange={e => {
                      setKhoroo(e.target.value);
                      let update = data.map((x, index) => {
                        if (index === i) {
                          return {
                            ...x,
                            khoroo: e.target.value
                          };
                        }
                        return x;
                      });
                      setData([...update]);
                    }}
                  >
                    <option>--SELECT--</option>
                    {location &&
                      location.location &&
                      location.location
                        .filter(item => item.parent_id == b.district)
                        .map((loc, index) => (
                          <option
                            key={index}
                            value={loc.location_id}
                            disabled={loc.location_id === b.khoroo}
                          >
                            {loc.location_name}
                          </option>
                        ))}
                  </select>

                  <p className={`${css.nameContainer} ${css.address}`}>
                    {b.address}
                  </p>
                  <select
                    style={{
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    className={css.selecContainer}
                    value={b.channel_name}
                    onChange={e => {
                      let update = data.map((x, index) => {
                        if (index === i) {
                          return {
                            ...x,
                            channel_name: e.target.value
                          };
                        }
                        return x;
                      });
                      setData([...update]);
                    }}
                  >
                    <option>--SELECT--</option>
                    {location &&
                      location.business_types &&
                      location.business_types.map((bus, index) => (
                        <option key={index} value={bus.business_type_id}>
                          {bus.business_type_name}
                        </option>
                      ))}
                  </select>
                  <div className={css.checkboxContainer}>
                    <input
                      onClick={() => handleClick(i)}
                      type='checkbox'
                      checked={b.checked}
                    />
                    <span style={{ fontSize: 12 }}>Давхцах оруулахгүй</span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={css.buttonContainer}>
          <button onClick={newSuphandler} className={css.SaveButton}>
            Үргэлжлүүлэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default Import;
