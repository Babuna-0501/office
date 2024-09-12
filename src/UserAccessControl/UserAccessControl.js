import React, { useState, useEffect, useContext } from 'react';
import List from './List';
import css from './index.module.css';
import myHeaders from '../components/MyHeader/myHeader';
import { defa } from './Defa';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';
import { Button, Modal } from 'antd';
import { Product } from './Product';
import { Tabs } from 'antd';
import { AcceptedProducts } from './AcceptedProducts';
import searchIcon from '../assets/Search.svg';

const UserAccessControl = props => {
  const { TabPane } = Tabs;
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState();
  const [searchValue, setSearchValue] = useState();
  const [userId, setUserId] = useState();
  const [lastname, setLastname] = useState();
  const [firstname, setFirstname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [acceptedPros, setAcceptedPros] = useState([]);
  const [def, setDef] = useState(defa);
  const [dummy, setDummy] = useState(0);
  const [supplier, setSupplier] = useState([]);
  const [password, setPassword] = useState();
  const [spa, setSpa] = useState(false);
  const [role, setRole] = useState();
  const [rolenew, setRolenew] = useState([]);
  const [songogdsonzone, setSongogdsonzone] = useState([]);
  const [songogdsonzonefalse, setSongogdsonzonefalse] = useState([]);
  const [songogdsonzoneid, setSongogdsonzoneid] = useState([]);
  const [supplerid, setSupplierid] = useState([]);
  //  const [zones, setZones] = useState(null);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');

  const [newAcceptedPros, setNewAcceptedPros] = useState([]);
  const [acceptedProList, setAcceptedProList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [settingsModal, setSettingsModal] = useState(false);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  const actions = ['create', 'read', 'update', 'delete', 'admin', 'report'];
  const features = {
    others: ['product', 'order', 'account', 'delivery', 'return', 'supplier'],
    ebazaar: [
      'product',
      'order',
      'account',
      'merchant',
      'upoint',
      'discount',
      'pickpack',
      'zones',
      'contents',
      'log',
      'sms',
      'delivery',
      'return',
      'supplier',
      'collection',
      'lottery',
      'tradeshopfiles',
      'orderCancel',
      'inventory',
      'lend',
      'shuurhai',
      'report',
      'vat',
      'marketing',
      'noat',
      'xtmar',
      'orderreturn',
      'borluulaltiinuramshuulal',
      'promo',
      'shipment',
      'pbi'
    ]
  };

  const permission = Object.values(JSON.parse(props.userData.permission))[0];

  const fetchdata = async () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const data = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/users`,
      requestOptions
    );
    const roledata = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/role`,
      requestOptions
    );
    const resroledata = await roledata.json();
    const res = await data.json();
    setUsers(res.data);
    setRolenew(resroledata.roles);
  };
  // console.log("users+++++++++++-------------", users);

  useEffect(() => {
    let aaa = [];
    songogdsonzone.map(item => {
      aaa.push(false);
    });
    setSongogdsonzonefalse(aaa);
  }, [songogdsonzone]);

  useEffect(() => {
    try {
      fetchdata();
    } catch (error) {
      console.log('users error ', error);
    }
  }, [dummy]);

  useEffect(() => {
    setSongogdsonzone([]);
    setUserId(users?.find(e => e.user_id === index)?.user_id || '');
    setEmail(users?.find(e => e.user_id === index)?.email || '');
    setLastname(users?.find(e => e.user_id === index)?.last_name || '');
    setFirstname(users?.find(e => e.user_id === index)?.first_name || '');
    setPhone(users?.find(e => e.user_id === index)?.phone_number || '');
    setRole(users?.find(e => e.user_id === index)?.role || '');
    setSongogdsonzoneid(users?.find(e => e.user_id === index)?.zones || '');
    setSupplierid(users?.find(e => e.user_id === index)?.supplier_id || '');
    setSpa(users?.find(e => e.user_id === index)?.origin === 2 ? true : false);
    setAcceptedPros(users?.find(e => e.user_id === index)?.products || []);
    // console.log("user======user", users);

    try {
      let aa =
        users?.find(e => e.user_id === index) &&
        JSON.parse(users?.find(e => e.user_id === index).permission)[100000000];
      let rr = { ...defa, ...aa };
      setDef(rr);

      let newPro =
        users?.find(e => e.user_id === index) &&
        JSON.parse(users?.find(e => e.user_id === index).products);
      setNewAcceptedPros(newPro);

      getProducts();
    } catch (e) {
      setDef(defa);
    }
  }, [index, users]);

  // console.log("newAcceptedPros", newAcceptedPros);

  const getProducts = () => {
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const reqSupplerid =
      users?.find(e => e.user_id === index)?.supplier_id.replaceAll('|', '') ||
      '';
    if (reqSupplerid) {
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/products/get1?&supplier=${reqSupplerid}&search=${productName}`,
        requestOptions
      )
        .then(res => res.json())
        .then(response => setProducts(response.data));
    }
  };

  useEffect(() => {
    if (acceptedPros.length > 0) {
      const acceptedProArray = JSON.parse(acceptedPros);
      const filteredAAA = products?.filter(pro => {
        return acceptedProArray.includes(pro._id);
      });
      setAcceptedProList(filteredAAA);
    } else {
      setAcceptedProList([]);
    }
  }, [acceptedPros, products]);

  useEffect(() => {
    // console.log("songogdsonzoneid", songogdsonzoneid);
    let aa = '';

    // console.log("songogdsonzoneid", aa);
    if (songogdsonzoneid.length > 25) {
      aa = songogdsonzoneid.split(',');
    } else if (songogdsonzoneid !== null && songogdsonzoneid.length < 25) {
      aa = [songogdsonzoneid];
    }
    // console.log("aa  +++ end irsen", aa);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let data = [];
    // console.log("songogdsonzoneid  -------- songogdsonzoneid +++++++", aa);
    aa &&
      aa?.map(item => {
        fetch(
          `${process.env.REACT_APP_API_URL2}/api/zones?id=${item}`,
          requestOptions
        )
          .then(res => res.json())
          .then(res => {
            console.log('zone response', res);
            if (res.data[0]) {
              data.push(res.data[0]);
              setSongogdsonzone(prev => [...prev, ...res.data]);
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    // console.log("-------", data);

    // setSongogdsonzone([...songogdsonzone, ...data]);
  }, [songogdsonzoneid]);
  // console.log("setSongogdsonzone setSongogdsonzone", songogdsonzone);

  const user = props.userData.company_id === '|1|' ? 'ebazaar' : 'others';
  // console.log("user+++++----*****", props);

const save = () => {
    const existingUser = users?.find((e) => e.user_id === index);
    const updatedFields = {};

    // Checking and updating fields if not a new user
    if (index !== "new") {
        if (existingUser.email !== email && email) updatedFields.email = email;
        if (existingUser.first_name !== firstname) updatedFields.first_name = firstname;
        if (existingUser.last_name !== lastname) updatedFields.last_name = lastname;
        if (existingUser.phone !== parseInt(phone)) updatedFields.phone = parseInt(phone);
        if (existingUser.role !== (role ? Number(role) : null)) updatedFields.role = role ? Number(role) : null;
        if (existingUser.is_active !== 1) updatedFields.is_active = 1;
        if (existingUser.origin !== (spa ? 2 : 1)) updatedFields.origin = spa ? 2 : 1;
    } else {
        // Handle new user creation
        if (email.includes("@") && email.includes(".") && password && firstname && lastname) {
            updatedFields.email = email;
            updatedFields.password = password;
            updatedFields.first_name = firstname;
            updatedFields.last_name = lastname;
            updatedFields.phone = parseInt(phone);
            updatedFields.role = role ? Number(role) : null;
            updatedFields.is_active = 1;
            updatedFields.origin = spa ? 2 : 1;
            updatedFields.employeeId = 0;

            // Processing supplier_ids
            let supids = supplerid.replaceAll("||", ",").replaceAll("|", "");
            if (supids.includes(",")) {
                supids = supids.split(",").filter((id) => id.trim());
            } else {
                supids = [supids];
            }

            updatedFields.supplier_ids =
                supplier[0] === 13884
                    ? [1]
                    : user === "ebazaar"
                    ? supplier
                    : [parseInt(props.userData.company_id.replaceAll("|", ""))];
        } else {
            alert("Мэдээлэл дутуу байна");
            return;
        }
    }

    if (index !== "new") {
        updatedFields.user_id = index;
    }

    updatedFields.permission = { 100000000: def };

    const raw = JSON.stringify(updatedFields);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const apiUrl =
        index === "new"
            ? `${process.env.REACT_APP_API_URL2}/api/backoffice/add_users`
            : `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`;

    fetch(apiUrl, requestOptions)
        .then((r) => r.json())
        .then((res) => {
            console.log(index === "new" ? "shine hereglegch uusgelee" : "hereglegchiig update hiilee", res);
            alert("Амжилттай хадгалагдлаа");
            setDummy(dummy + 1);
        })
        .catch((error) => {
            console.log("error", error);
        });
};


  
  

  const handleModal = () => {
    setSettingsModal(true);
  };

  const handleSaveProducts = () => {
    setProductName('');
    const raw = JSON.stringify({
      user_id: userId,
      products: newAcceptedPros
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`,
      requestOptions
    )
      .then(res => res.json())
      .then(response => {
        if (response.code === 200) {
          alert(response.message);
          setSettingsModal(false);
          fetchdata();
        } else {
          alert(response.code);
        }
      });
  };

  const handleFilter = () => {
    getProducts();
  };

  useEffect(() => {
    if (settingsModal === false) {
      setProductName('');
      setSelectAll(false);
    }
  }, [settingsModal]);

  useEffect(() => {
    if (!productName) {
      getProducts();
    }
  }, [productName]);

  console.log('newAcceptedPros', newAcceptedPros);

  return (
    <div className={css.container2}>
      <div className={css.container}>
        <div
          className='row header'
          style={{
            height: '80px'
          }}
        >
          <div style={{ width: '100%' }}>
            <div>
              <input
                type='text'
                placeholder='Хайх ...'
                className={css.inputWrapper}
                onChange={e => {
                  setSearchValue(e.target.value);
                }}
                style={{ padding: '8px' }}
              />
            </div>
            {permission.account.create && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <u
                  onClick={() => {
                    setIndex('new');
                  }}
                  className={css.userbtn}
                >
                  Шинэ хэрэглэгч нэмэх
                </u>
              </div>
            )}
          </div>
        </div>
        {permission.account.update && (
          <List
            users={
              searchValue
                ? users?.filter(e =>
                    e.email.toLowerCase().includes(searchValue.toLowerCase())
                  )
                : users
            }
            index={index}
            setIndex={setIndex}
          />
        )}
      </div>
      <div className={css.permissionContainer}>
        {index && (
          <>
            <Tabs
              defaultActiveKey='0'
              onChange={key => {
                // console.log(key);
              }}
            >
              <TabPane tab={'Хэрэглэгчийн мэдээлэл'} key={0}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'start'
                  }}
                >
                  <div className={css.maininfo}>
                    {index === 'new' && (
                      <div>
                        <div className='header'>Нийлүүлэгч</div>
                        {user === 'ebazaar' ? (
                          <select
                            onChange={e =>
                              setSupplier([parseInt(e.target.value)])
                            }
                            className={css.inputform}
                          >
                            <option value='all'>---</option>
                            {props.suppliers
                              ? props.suppliers
                                  .sort((a, b) => a.name.localeCompare(b.name)) // Sort the suppliers alphabetically
                                  .map((s, ind) => {
                                    return (
                                      <option value={s.id} key={ind}>
                                        {s.name}
                                      </option>
                                    );
                                  })
                              : null}
                          </select>
                        ) : (
                          <b>{props.userData.supplier_name}</b>
                        )}
                      </div>
                    )}
                    <div> Имэйл</div>
                    <input
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                      className={css.inputform}
                    />
                    {index === 'new' && (
                      <>
                        <div>Нууц үг</div>
                        <input
                          onChange={e => setPassword(e.target.value)}
                          value={password}
                          className={css.inputform}
                        />
                      </>
                    )}
                    <div> Овог</div>
                    <input
                      onChange={e => setLastname(e.target.value)}
                      value={lastname}
                      className={css.inputform}
                    />
                    <div> Нэр</div>
                    <input
                      onChange={e => setFirstname(e.target.value)}
                      value={firstname}
                      className={css.inputform}
                    />
                    <div> Утас</div>
                    <input
                      onChange={e => setPhone(e.target.value)}
                      value={phone}
                      className={css.inputform}
                    />

                    <div className={css.rolecontainer}>
                      <div>Албан тушаал</div>
                      <select
                        value={role}
                        onChange={e => {
                          setRole(e.target.value);
                        }}
                      >
                        <option>--Role--</option>
                        {rolenew &&
                          rolenew.map((item, index) => {
                            return (
                              <option key={index} value={item.BackofficeRoleID}>
                                {item.Role}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '5px',
                        gap: '30px'
                      }}
                    >
                      <div>
                        <div> SFA хэрэглэгч</div>
                        <span
                          onClick={() => {
                            setSpa(!spa);
                          }}
                        >
                          {spa === true ? (
                            <img src='/media/on.svg' alt='' />
                          ) : (
                            <img src='/media/off.svg' alt='' />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              {(props.sfaSupp || props.userData.company_id === '|1|') && (
                <TabPane tab={'Бүтээгдэхүүн тохиргоо'} key={1}>
                  <div className={css.maininfo}>
                    <button
                      onClick={handleModal}
                      style={{
                        width: '200px',
                        backgroundColor: '#ffa600',
                        padding: '6px',
                        fontWeight: '700',
                        color: '#fff',
                        cursor: 'pointer',
                        border: 'none',
                        borderRadius: '6px',
                        marginBottom: '5px'
                      }}
                    >
                      Тохиргоо
                    </button>
                    <div
                      style={{
                        maxHeight: '240px',
                        width: '100%',
                        overflowY: 'scroll'
                      }}
                    >
                      <AcceptedProducts acceptedProList={acceptedProList} />
                    </div>
                  </div>
                </TabPane>
              )}
            </Tabs>

            <div style={{ marginTop: '10px' }}>Хэрэглэгчийн эрхүүд</div>
            <div className={css.permissionContainer2}>
              {index === 'new' || (def && users?.find(e => e.user_id === index))
                ? features[`${user}`].map((e, i) => (
                    <div className={css.permission} key={i}>
                      <div style={{ marginBottom: '5px' }}>
                        <b>{e}</b>
                      </div>
                      <div className={css.crudContainer}>
                        {actions.map((q, w) => (
                          <span className={css.row} key={w}>
                            <input
                              checked={def[`${e}`]?.[`${q}`]}
                              onChange={a => {
                                def[`${e}`][`${q}`] = a.target.checked;
                                let newq = {
                                  ...def[`${e}`],
                                  [`${q}`]: a.target.checked
                                };
                                let newe = {
                                  ...def,
                                  [`${e}`]: newq
                                };
                                setDef(newe);
                              }}
                              style={{
                                marginRight: '5px'
                              }}
                              type='checkbox'
                            />
                            <div className={css.crud}>{q}</div>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                : ''}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10px'
              }}
            >
              <span
                className='btn'
                onClick={() => {
                  save();
                }}
              >
                Хадгалах
              </span>
            </div>

            <Modal
              open={settingsModal}
              onCancel={() => {
                setSettingsModal(false);
                setProductName('');
                setSelectAll(false);
                let newPro =
                  users?.find(e => e.user_id === index) &&
                  JSON.parse(users?.find(e => e.user_id === index).products);
                setNewAcceptedPros(newPro);
              }}
              onOk={handleSaveProducts}
              okText={'Хадгалах'}
              cancelText={'Цуцлах'}
            >
              <div style={{ overflowY: 'scroll', height: '500px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <input
                    type='checkbox'
                    checked={selectAll}
                    onChange={() => setSelectAll(true)}
                    style={{ margin: '0' }}
                  />
                  <input
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    className={css.input22}
                    placeholder='Хайх...'
                  />
                  <Button
                    variant='primary'
                    onClick={handleFilter}
                    style={{ padding: '0px 5px' }}
                  >
                    <img
                      style={{ width: '15px', height: '15px' }}
                      src={searchIcon}
                      alt=''
                    />
                  </Button>
                </div>
                {products.map(product => {
                  return (
                    <Product
                      product={product}
                      acceptedPros={acceptedPros}
                      newAcceptedPros={newAcceptedPros ? newAcceptedPros : []}
                      setNewAcceptedPros={setNewAcceptedPros}
                      selectAll={selectAll}
                    />
                  );
                })}
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default UserAccessControl;