import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import List from "./List";
import MerchantReportHook from "../Hooks/MerchantReportHook";
import ImportInfo from "./components/ImportInfo";
import notifIcon from "../assets/Notification.svg";
import { styles } from "./style";
import css from "./index.module.css";
import Register from "./NewMerchant/Register";
import MerchantRegisterHook from "../Hooks/MerchantRegisterHook";
import Import from "./Import/Import";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";
import { MerchantEditHook } from "../Hooks/MerchantEditHook";
const areEqual = (prevProps, nextProps) => true;

const data = [
  { id: 1, name: "Зөвшөөрсөн" },
  { id: 2, name: "Илгээгээгүй" },
  { id: 3, name: "Хянагдаж байгаа" },
];

const Index = React.memo((props) => {
  const [register, setRegister] = useState(null);
  const [phoneOne, setPhoneOne] = useState(null);
  const [companyPhone, setCompanyPhone] = useState(null);
  const [districtState, setDistrictState] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [businessType, setBusinessType] = useState(null);
  const [channel, setChannel] = useState(null);
  const [channelName, setChannelName] = useState([]);
  const [permitionCheck, setPermitionCheck] = useState(null);
  const [approvel, setApprovel] = useState(false);
  const [searchID, setSearchID] = useState(null);
  const [khoroo, setKhoroo] = useState(null);

  const merchantctx = useContext(MerchantReportHook);
  const merRegisterctx = useContext(MerchantRegisterHook);
  const merEditctx = useContext(MerchantEditHook);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  const getMerchants = () => {
    ReactDOM.render(
      <React.StrictMode>
        <List
          key={Math.random()}
          locations={props.locations}
          businessType={props.businessType}
          userData={props.userData}
          userPhoneNumber={phoneOne}
          shopPhoneNumber={companyPhone}
          registrationNumber={register}
          merchantctx={merchantctx}
          suppliers={props.suppliers}
          companyName={companyName}
          address={address}
          customerName={customerName}
          city={Number(city)}
          district={districtState}
          channel={channel}
          busTypeState={businessType}
          permitionCheck={permitionCheck}
          searchID={searchID}
          khoroo={khoroo}
        />
      </React.StrictMode>,
      document.getElementById("foobarmerchant")
    );
  };
  useEffect(() => {
    getMerchants();
  }, [
    city,
    districtState,
    companyPhone,
    phoneOne,
    register,
    address,
    companyName,
    customerName,
    channel,
    businessType,
    merchantctx,
    permitionCheck,
    searchID,
    khoroo,
  ]);
  useEffect(() => {
    let aa = [];
    props.businessType.map((item) => {
      if (aa.length === 0) {
        aa.push({
          channel_id: item.channel_id,
          channel_name: item.channel_name,
        });
      } else {
        aa.map((x) => {
          if (item.channel_id !== x.channel_id) {
            aa.push({
              channel_id: item.channel_id,
              channel_name: item.channel_name,
            });
          }
        });
      }
    });
    aa = aa.filter(
      (value, index, self) => index === self.findIndex((t) => t.channel_id === value.channel_id)
    );
    setChannelName(aa);
  }, [props.businessType]);
  const permitionChangeHandler = (e) => {
    setPermitionCheck(e.target.value);
  };
  localStorage.setItem("merchantIDS", JSON.stringify([]));
  return (
    <div style={styles.allWidthContainer} className={css.container}>
      <div className={css.wrapper}>
        <div
          className="row header"
          style={{
            borderBottom: "0.8px solid #CFD8DC",
          }}
        >
          <div style={{ ...styles.numberContainer }}>
            <div>
              <span className="header">Дугаар</span>
              <input
                type="text"
                value={searchID}
                onChange={(e) => {
                  setSearchID(e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ ...styles.createdContainer }}>
            <div>
              <span className="header">Created date</span>
              <input type="text" disabled />
            </div>
          </div>
          <div style={{ ...styles.companyContainer }}>
            <div>
              <span className="header">Компанийн нэр</span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.notifContainer }}>
            <img
              src={notifIcon}
              alt="notif"
              style={{ width: "24px", heigth: "24px", objectFit: "cover" }}
            />
          </div>
          <div style={{ ...styles.registerContainer }}>
            <div>
              <span className="header">Регистр</span>
              <input type="text" value={register} onChange={(e) => setRegister(e.target.value)} />
            </div>
          </div>
          <div style={{ ...styles.channelContainer }}>
            <div>
              <span className="header">Суваг</span>
              <input disabled />
              {/* <select
                value={channel}
                onChange={(e) => {
                  setChannel(e.target.value);
                }}
              >
                <option value={""}>---</option>
                {channelName.map((e, i) => (
                  <option key={i} value={e.channel_id}>
                    {e.channel_name}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
          <div style={{ ...styles.serviceContainer }}>
            <div>
              <span className="header">Үйл аж чиглэл</span>
              <select
                value={businessType}
                onChange={(e) => {
                  setBusinessType(e.target.value);
                }}
              >
                <option value={""}>---</option>
                {props.businessType
                  // .filter((e) => e.channel_id === Number(channel))
                  .map((e, i) => (
                    <option key={i} value={e.business_type_id}>
                      {e.business_type_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div style={{ ...styles.nameContainer }}>
            <div>
              <span className="header">Нэр</span>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.phoneContainer }}>
            <div>
              <span className="header">Хэрэглэгчийн утас</span>
              <input
                type="text"
                // value={phoneOne}
                // onChange={(e) => setPhoneOne(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.companyPhoneContainer }}>
            <div>
              <span className="header">Байгууллагын утас</span>
              <input
                type="text"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.cityContainer }}>
            <div>
              <span className="header">Хот</span>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option value={""}>---</option>
                {props.locations
                  .filter((e) => e.parent_id === 0)
                  .map((e, i) => (
                    <option key={i} value={e.location_id}>
                      {e.location_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div style={{ ...styles.districtContainer }}>
            <div>
              <span className="header">Дүүрэг</span>
              <select
                value={districtState}
                onChange={(e) => {
                  setDistrictState(e.target.value);
                }}
              >
                <option value={""}>---</option>
                {props.locations
                  .filter((e) => e.parent_id === Number(city))
                  .map((e, i) => (
                    <option key={i} value={e.location_id}>
                      {e.location_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div style={{ ...styles.khorooContainer }}>
            <div>
              <span className="header">Хороо</span>
              {city === null && <input type="text" disabled />}
              {city && (
                <select
                  value={khoroo}
                  onChange={(e) => {
                    setKhoroo(e.target.value);
                  }}
                >
                  <option value={""}>---</option>
                  {props.locations
                    .filter((e) => e.parent_id === Number(districtState))
                    .map((e, i) => (
                      <option key={i} value={e.location_id}>
                        {e.location_name}
                      </option>
                    ))}
                </select>
              )}
            </div>
          </div>
          <div style={{ ...styles.addressContainer }}>
            <div>
              <span className="header">Хаяг</span>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
          <div className="5" style={{ ...styles.licenceContainer }}>
            <div>
              <span className="header">Тусгай зөвшөөрөл</span>

              <select value={permitionCheck} onChange={permitionChangeHandler}>
                <option>-------</option>
                {data.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {/* <select
								name="supplier"
								id="supplier"
								onChange={e => {
									setPrize(e.target.value);
								}}
							>
								<option value={""}>---</option>
								<option value={1}>Тэмдэглэлийн дэвтэр</option>
								<option value={3}>Малгай</option>
								<option value={5}>Поло</option>
								<option value={6}>Хөзөр</option>
								<option value={8}>Sengur Үүргэвч</option>
								<option value={10}>Tiger Үүргэвч</option>
								<option value={"2,4,7,9"}>Хоосон</option>
							</select> */}
            </div>
          </div>
          <div className="5" style={{ ...styles.licenceContainer }}>
            <div>
              <span className="header">Захиалгын загвар</span>
              <input type="text" disabled />
            </div>
          </div>

          <div
            className="5"
            style={{
              ...styles.licenceContainer,
              display: props.userData.company_id === "|14014|" ? "block" : "none",
            }}
          >
            <div>
              <span className="header">Харилцагчийн зөвшөөрөл</span>
              <input type="text" disabled />
            </div>
          </div>
        </div>
        {merchantctx.importData && <ImportInfo />}
        {merRegisterctx.newMerchant && <Register data={props} />}
        {merchantctx.newSup && <Import userdata={props} />}

        <div id="foobarmerchant" className={css.headerContainer}></div>
      </div>
    </div>
  );
}, areEqual);

export default Index;
