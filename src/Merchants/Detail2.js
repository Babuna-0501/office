import React, { useState, useEffect } from 'react';
import { Tabs, Select } from 'antd';
import css from './Accounts/Detail.module.css';
import { Radio } from 'antd';
import Supplier from './Tabs/Supplier';
import Products from './Tabs/Products';
import myHeaderss from '../components/MyHeader/myHeader';
import { OrderPermission } from './Tabs/OrderPermission';
import myHeaders from '../components/MyHeader/myHeader';
import OrderHistory from './Tabs/OrderHistory';
import { PaymentType } from './Tabs/PaymentType';

function Detail2(props) {
  const { TabPane } = Tabs;
  const data = props.data;
  const locations = props.locations;
  const bustypes = props.bustype;
  const [userData, setUserData] = useState();
  const [userResult, setUserResult] = useState();
  const [includedSuppId, setIncludedSuppId] = useState('');
  const [excludedSuppId, setExcludedSuppId] = useState('');
  const [includedConfig, setIncludedConfig] = useState([]);
  const [excludedConfig, setExcludedConfig] = useState([]);
  const [includeProductList, setIncludeProductList] = useState('');
  const [excludeProductList, setExcludeProductList] = useState('');

  const [isOrderDetail, setIsOrderDetail] = useState(false);
  const [order, setOrder] = useState({});

  const [optionValue, setOptionValue] = useState('all');

  const [temp, setTemp] = useState([]);
  const [temp2, setTemp2] = useState([]);

  const [newData, setNewData] = useState([]);

  const HandleCombinedInfo = (c, value) => {
    if (c === true) {
      setTemp(prev => [...prev, value]);
    } else {
      setTemp(prev => prev.filter(a => a !== value));
    }
  };
  const HandleCityCenter = (c, value) => {
    if (c === true) {
      setTemp2(prev => [...prev, value]);
    } else {
      setTemp2(prev => prev.filter(a => a !== value));
    }
  };
  const updateTradeshopType = e => {
    console.log(props);
    console.log(e.target.value);
  };
  const getNewData = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/users/alldata?page=1&limit=1&userId=${props.data.user_id}`,
      requestOptions
    )
      .then(res => res.json())
      .then(response => {
        if (response.message === 'success') {
          setNewData(response.data);
        } else {
          alert('data error');
        }
      });
  };

  useEffect(() => {
    getNewData();
  }, []);

  useEffect(() => {
    setAllData(prev => ({
      ...prev,
      t_survey: {
        ...prev.t_survey,
        combinedInfo: temp
      }
    }));
  }, [temp]);
  useEffect(() => {
    setAllData(prev => ({
      ...prev,
      t_survey: {
        ...prev.t_survey,
        cityCenter: temp2
      }
    }));
  }, [temp2]);

  const twentyfive = [
    { value: 1, label: 'Ус, ундаа' },
    { value: 2, label: 'Гурил, будаа, гоймон' },
    { value: 3, label: 'Гэр ахуй' },
    { value: 4, label: 'Алкоголь' },
    { value: 5, label: 'Сүү, сүүн бүтээгдэхүүн' },
    { value: 6, label: 'Талх, нарийн боов' },
    { value: 7, label: 'Бэлэн хоол, түргэн хоол' },
    { value: 8, label: 'Амттан' },
    { value: 9, label: 'Хөлдөөсөн хүнс' },
    { value: 10, label: 'Мах, махан бүтээгдэхүүн, өндөг' },
    { value: 11, label: 'Хүнсний ногоо, жимс' },
    { value: 12, label: 'Даршилсан, нөөшилсөн бүтээгдэхүүн' },
    { value: 13, label: 'Тос, масло, майонез' },
    { value: 14, label: 'Цай, кофе' },
    { value: 15, label: 'Чанамал, зөгийн бал, нухаш' },
    { value: 16, label: 'Өглөөний хоол, эрүүл хооллолтын нэмэлт бүтээгдэхүүн' },
    { value: 17, label: 'Хоол амтлагч, соус' },
    { value: 18, label: 'Хүүхдийн бүтээгдэхүүн' },
    { value: 19, label: 'Гоо сайхан' },
    { value: 20, label: 'Бичиг хэрэг' },
    { value: 21, label: 'Тэжээвэр амьтны хүнс' },
    { value: 22, label: 'Бэлгийн багц' },
    { value: 23, label: 'Эмнэлэг, эмийн сан' },
    { value: 24, label: 'Хангамжийн бүтээгдэхүүн' },
    { value: 25, label: 'Тамхи' }
  ];
  const fifteen = [
    { value: 1, label: 'Төвийн зам дагуу' },
    { value: 2, label: 'Сургууль, цэцэрлэгийн бүс' },
    { value: 3, label: 'Хотхоны дунд' },
    { value: 4, label: 'Байрны доор' },
    { value: 5, label: 'Байрны хажууд' },
    { value: 6, label: 'Худалдааны захын хажууд' },
    { value: 7, label: 'Худалдааны зах дотор' },
    { value: 8, label: 'Том сүлжээ супермаркетийн хажууд' },
    { value: 9, label: 'Сүлжээ дэлгүүрийн хажууд (CU,GS25, Circle K...)' },
    { value: 10, label: 'Автобусны буудал дээр' },
    { value: 11, label: 'Автобусны эцсийн буудал дээр' },
    { value: 12, label: 'Туслах зам дагуу' },
    { value: 13, label: 'Зуслан явах зам дагуу' },
    { value: 14, label: 'Гэр хороолол дунд' },
    { value: 15, label: 'Хотоос гарах замд' }
  ];
  const orderChannelOptions = [
    { value: 1, label: 'Ebazaar' },
    { value: 2, label: 'Худалдааны төлөөлөгч' }
  ];
  const nine = [
    {
      value: 1,
      label:
        'Хүн ам ихтэй, орон сууцны хороололд байрласан, эргэн тойрондоо өрсөлдөгч багатай'
    },
    {
      value: 2,
      label: 'Оффисын бүсэд байрласан, эргэн тойрондоо өрсөлдөгч багатай'
    },
    {
      value: 3,
      label:
        'Хотоос гарах, хот руу орох хэсэгт байрлаcан, эргэн тойрондоо өрсөлдөгч багатай'
    },
    { value: 4, label: 'Хөл хөдөлгөөн ихтэй газар байрласан' },
    {
      value: 5,
      label:
        'Сургууль, их сургууль, их сургуулийн дотуур байрны ойр орчимд байрласан'
    },
    {
      value: 6,
      label:
        'Дээрх бүсэд байршилтай хэдий ч байршлын ойр орчимдоо өрсөлдөгч олонтой'
    },
    { value: 7, label: 'Хотын захад эсвэл төв замаас зайтай байрласан' },
    {
      value: 8,
      label:
        'Хотын захын дахин төлөвлөлтийн бүсэд байрласан, өрсөлдөх давуу тал багатай'
    },
    { value: 9, label: 'Бусад байршилд байрласан, өрсөлдөх давуу тал багатай' }
  ];

  const [allData, setAllData] = useState({
    c_ANname: '',
    c_name: '',
    c_register: '',
    t_phone: '',
    city: '',
    district: '',
    business_type: '',
    khoroo: '',
    t_address1: '',
    t_survey: {
      hasOutsideLight: '',
      aream2: '',
      rooms: '',
      spacePlanning: '',
      hasEmptySpace: '',
      hasWarehouse: '',
      numberOfWarehouse: '',
      warehouseSize: '',
      flowOfProducts: '',
      easyToBuy: '',
      sortAndLabel: '',
      shelvesFilled: '',
      doesntExistCategory: [],
      top5Category: [],
      hasSupportTools: '',
      supportTools: '',
      hasShoppingBasket: '',
      hasShoppingCart: '',
      numberOfDrinkFridge: '',
      numberOfFoodFridge: '',
      numberOfHorizontalFreezers: '',
      hasAtms: '',
      hasPickPack: '',
      numberOfDoors: '',
      clean: '',
      flowOfCustomers: '',
      freeSpaceForCustomers: '',
      hasCashSystem: '',
      hasVATSystem: '',
      numberOfCashier: '',
      cashRegisterSystemName: '',
      numberOfEmployees: '',
      hasSellerRoster: '',
      sellersAge: '',
      businessYear: '',
      additionalPaymentSystem: '',
      orderChannel: '',
      orderTool: '',
      phoneOS: '',
      productInfoChannel: '',
      supplierDeliveryTime: '',
      htDeliveryTime: '',
      cityCenter: '',
      combinedInfo: '',
      workerCode: ''
    }
  });

  const fetchdata = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    console.log(
      ' `${process.env.REACT_APP_API_URL2}/api/tradeshop/alldata?tradeshop_id=${props.data.tradeshop_id}`,',
      `${process.env.REACT_APP_API_URL2}/api/tradeshop/alldata?tradeshop_id=${props.data.tradeshop_id}`
    );
    const data = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/tradeshop/alldata?tradeshop_id=${props.data.tradeshop_id}`,
      requestOptions
    );
    const res = await data.json();

    if (res.error) {
      alert('Алдаа гарлаа');
      return;
    }
    setUserData(res.data);
    setUserResult(res.result[0]);
  };

  useEffect(() => {
    try {
      if (props.user.company_id === '|1|') {
        fetchdata();
      } else {
        setUserData([
          [
            {
              TradeshopID: props.data.tradeshop_id,
              TradeshopName: props.data.tradeshop_name
            }
          ]
        ]);
      }
    } catch (error) {
      console.log('users error ', error);
    }
  }, [props.data.tradeshop_id]);

  useEffect(() => {
    if (userResult && locations) {
      let aaa = JSON.parse(userResult?.t_survey);
      setAllData(prev => ({
        ...prev,
        c_ANname: []
          .concat(...userData)
          .filter(e => e.TradeshopID === props.data.tradeshop_id)[0]
          .TradeshopName,
        c_name: userResult.c_name,
        c_register: userResult.c_register,
        t_phone: userResult.t_phone,
        business_type: userResult.t_business_type,
        city: locations?.find(
          e => e.location_id === parseInt(userResult?.t_city)
        )?.location_id,
        district: locations?.find(
          e => e.location_id === parseInt(userResult?.t_disctrict)
        )?.location_id,
        khoroo: locations?.find(
          e => e.location_id === parseInt(userResult?.t_khoroo)
        )?.location_id,
        t_address1: userResult.t_address1,
        t_survey: JSON.parse(userResult.t_survey)
      }));
      aaa ? setTemp(aaa.combinedInfo) : setTemp([]);
      aaa ? setTemp2(aaa.cityCenter) : setTemp2([]);
    }
  }, [userResult, locations, userData, props.data]);

  useEffect(() => {
    if (props.user.company_id !== '|1|') {
      setAllData({
        c_ANname: props.data.tradeshop_name,
        c_name: props.data.customer_name,
        c_register: props.data.business_register,
        t_phone: props.data.tradeshop_phone,
        business_type: props.data.business_type_id,
        city: locations?.find(e => e.location_id === parseInt(props.data.city))
          ?.location_id,
        district: locations?.find(
          e => e.location_id === parseInt(props.data.district)
        )?.location_id,
        khoroo: locations?.find(
          e => e.location_id === parseInt(props.data.horoo)
        )?.location_id,
        t_address1: props.data.address
      });
    }
  }, [props.user, props.data]);

  const getSupplier = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaderss,
      redirect: 'follow'
    };

    let url = `${process.env.REACT_APP_API_URL2}/api/merchants?user_phone=${userResult?.t_phone}&id=${userResult?.t_id}`;

    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        setIncludeProductList('');
        setExcludeProductList('');
        if (res.data[0].excludeProductList) {
          setExcludeProductList(res.data[0].excludeProductList);
        }
        if (res.data[0].includeProductList) {
          setIncludeProductList(res.data[0].includeProductList);
        }
        if (
          res.data[0].includeSupplierList?.length > 0 &&
          res.data[0].includeSupplierList !== ''
        ) {
          setIncludedSuppId(res.data[0].includeSupplierList);
          console.log(res.data);
          setIncludedConfig(res.data[0].includeSupplierList.split(','));
          // setOptionValue("included");
        } else if (
          res.data[0].excludeSupplierList.length > 0 &&
          res.data[0].excludeSupplierList !== ''
        ) {
          console.log('res.data[0]', res.data[0]);
          setExcludedSuppId(res.data[0].excludeSupplierList);
          setExcludedConfig(res.data[0].excludeSupplierList.split(','));
          // setOptionValue("excluded");
        } else if (
          res.data[0].includeSupplierList === '' &&
          res.data[0].excludeSupplierList === ''
        ) {
          setOptionValue('all');
          console.log('ALL');
        }
      })
      .catch(err => console.log('ERROR: ', err));
  };

  const save = () => {
    if (allData.city == 1 && allData.khoroo === null) {
      alert('Хороо сонгоно уу');
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var raw = {
      tradeshop: {
        TradeshopID: props.data.tradeshop_id,
        TradeshopName: allData.c_ANname,
        CustomerName: allData.c_name,
        BusinessTypeID: allData.business_type,
        City: allData.city,
        District: allData.district,
        Khoroo: allData.khoroo,
        Phone: allData.t_phone,
        Address1: allData.t_address1,
        Survey: JSON.stringify({
          hasOutsideLight: allData?.t_survey?.hasOutsideLight,
          aream2: allData?.t_survey?.aream2,
          rooms: allData?.t_survey?.rooms,
          spacePlanning: allData?.t_survey?.spacePlanning,
          hasEmptySpace: allData?.t_survey?.hasEmptySpace,
          hasWarehouse: allData?.t_survey?.hasWarehouse,
          numberOfWarehouse: allData?.t_survey?.numberOfWarehouse,
          warehouseSize: allData?.t_survey?.warehouseSize,
          flowOfProducts: allData?.t_survey?.flowOfProducts,
          easyToBuy: allData?.t_survey?.easyToBuy,
          sortAndLabel: allData?.t_survey?.sortAndLabel,
          shelvesFilled: allData?.t_survey?.shelvesFilled,
          doesntExistCategory: allData?.t_survey?.doesntExistCategory,
          top5Category: allData?.t_survey?.top5Category,
          hasSupportTools: allData?.t_survey?.hasSupportTools,
          supportTools: allData?.t_survey?.supportTools,
          hasShoppingBasket: allData?.t_survey?.hasShoppingBasket,
          hasShoppingCart: allData?.t_survey?.hasShoppingCart,
          numberOfDrinkFridge: allData?.t_survey?.numberOfDrinkFridge,
          numberOfFoodFridge: allData?.t_survey?.numberOfFoodFridge,
          numberOfHorizontalFreezers:
            allData?.t_survey?.numberOfHorizontalFreezers,
          hasAtms: allData?.t_survey?.hasAtms,
          hasPickPack: allData?.t_survey?.hasPickPack,
          numberOfDoors: allData?.t_survey?.numberOfDoors,
          clean: allData?.t_survey?.clean,
          flowOfCustomers: allData?.t_survey?.flowOfCustomers,
          freeSpaceForCustomers: allData?.t_survey?.freeSpaceForCustomers,
          hasCashSystem: allData?.t_survey?.hasCashSystem,
          hasVATSystem: allData?.t_survey?.hasVATSystem,
          numberOfCashier: allData?.t_survey?.numberOfCashier,
          cashRegisterSystemName: allData?.t_survey?.cashRegisterSystemName,
          numberOfEmployees: allData?.t_survey?.numberOfEmployees,
          hasSellerRoster: allData?.t_survey?.hasSellerRoster,
          sellersAge: allData?.t_survey?.sellersAge,
          businessYear: allData?.t_survey?.businessYear,
          additionalPaymentSystem: allData?.t_survey?.additionalPaymentSystem,
          orderChannel: allData?.t_survey?.orderChannel,
          orderTool: allData?.t_survey?.orderTool,
          phoneOS: allData?.t_survey?.phoneOS,
          productInfoChannel: allData?.t_survey?.productInfoChannel,
          supplierDeliveryTime: allData?.t_survey?.supplierDeliveryTime,
          htDeliveryTime: allData?.t_survey?.htDeliveryTime,
          cityCenter: allData?.t_survey?.cityCenter,
          combinedInfo: allData?.t_survey?.combinedInfo,
          workerCode: allData?.t_survey?.workerCode
        })
      },
      business: {
        CustomerID: data.customer_id,
        RegisterNo: allData.c_register
      }
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };
    console.log('merchants', requestOptions);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/merchant/update`,
      requestOptions
    )
      .then(r => r.json())
      .then(response => {
        if (response.code === 200) {
          alert('Амжилттай хадгаллаа.');
          data.horoo = allData.khoroo;
          data.city = allData.city;
          data.district = allData.district;
          data.tradeshop_phone = allData.t_phone;
          data.address = allData.t_address1;
          data.business_register = allData.c_register;
          if (data.business_register !== allData.c_register) {
            data.business_register = allData.c_register;
          }
          props.setData(data);
        } else {
          alert('Алдаа гарлаа.');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const SaveHandlerOther = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    let raw = {
      _id: props.data.business_register,
      supplier_id: Number(props.user.company_id.replaceAll('|', '')),
      customer_name: allData.c_name,
      newRegister: allData.c_register,
      name: allData.c_ANname,
      tradeshop_id: props.data.tradeshop_id,
      channel: allData.business_type,
      city: allData.city,
      disctrict: allData.district,
      khoroo: allData.khoroo,
      phone: allData.t_phone,
      address: allData.t_address1
    };
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };
    console.log('merchants', requestOptions);
    fetch(`${process.env.REACT_APP_API_URL2}/api/merchants`, requestOptions)
      .then(r => r.json())
      .then(response => {
        console.log('response', response);
        if (response.code === 200) {
          alert(response.message);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return (
    <div id='bg' className={css.container}>
      <div id='foo' style={{ width: '100%' }}>
        <span className='close' onClick={() => props.setDetail(false)}>
          Хаах
        </span>
        <h1>Харилцагчийн мэдээлэл__</h1>
        <Tabs
          defaultActiveKey='0'
          onChange={key => {
            console.log(key);
          }}
        >
          <TabPane tab={'Хэрэглэгчийн тохиргоо'} key={0}>
            {/* {userData?.map((u, i) => */}
            {/* u.map((a, r) => ( */}
            <>
              {/* delguuriin ner - delgerengui hayg */}
              <div className={css.container2}>
                <div className={css.negdiv}>
                  <div>Дэлгүүрийн нэр</div>
                  <input
                    id='foobar'
                    value={allData.c_ANname}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        ...{ c_ANname: e.target.value }
                      }))
                    }
                  />
                </div>
                <div className={css.negdiv}>
                  <div>Харилцагчийн нэр</div>
                  <input
                    id='foobar'
                    value={allData.c_name}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        ...{ c_name: e.target.value }
                      }))
                    }
                  />
                </div>
                <div className={css.negdiv}>
                  <div>Харилцагчийн регистрийн дугаар</div>
                  <input
                    id='registernumber'
                    value={allData.c_register}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        ...{ c_register: e.target.value }
                      }))
                    }
                  />
                </div>
                <div className={css.negdiv}>
                  <div>Дэлгүүрийн утас</div>
                  <input
                    id='phonenumber'
                    value={allData.t_phone}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        ...{ t_phone: e.target.value }
                      }))
                    }
                  />
                </div>
                <div className={css.negdiv}>
                  <div>Суваг</div>
                  <select
                    className={css.negdiv}
                    id='businesstype'
                    value={allData.business_type}
                    onChange={e => updateTradeshopType(e)}
                  >
                    {bustypes.map((item, index) => {
                      return (
                        <option value={item.business_type_id} key={index}>
                          {item.business_type_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Аймаг/хот</div>
                  <select
                    className={css.negdiv}
                    id='city'
                    value={allData.city}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        ...{ city: e.target.value }
                      }))
                    }
                  >
                    {locations.map((location, index) => {
                      if (location.parent_id === 0) {
                        return (
                          <option value={location.location_id} key={index}>
                            {location.location_name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Сум/дүүрэг</div>
                  <select
                    className={css.negdiv}
                    id='district'
                    value={allData.district}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        ...{ district: e.target.value }
                      }))
                    }
                  >
                    <option>Сонгоно уу</option>
                    {locations.map((location, i) => {
                      if (location.parent_id === parseInt(allData.city, 10)) {
                        return (
                          <option value={location.location_id} key={i}>
                            {location.location_name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>

                {parseInt(allData.city) === 1 && (
                  <div className={css.negdiv}>
                    <div>Хороо</div>
                    <select
                      className={css.negdiv}
                      id='khoroo'
                      value={allData.khoroo}
                      onChange={e =>
                        setAllData(prev => ({
                          ...prev,
                          ...{ khoroo: e.target.value }
                        }))
                      }
                    >
                      <option>Сонгоно уу</option>
                      {locations.map((location, index) => {
                        if (
                          location.parent_id === parseInt(allData.district, 10)
                        ) {
                          return (
                            <option value={location.location_id} key={index}>
                              {location.location_name}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>
                )}
                <div className={css.negdiv}>
                  <div>Дэлгэрэнгүй хаяг</div>
                  <textarea
                    value={allData.t_address1}
                    id='address'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        ...{ t_address1: e.target.value }
                      }))
                    }
                  />
                </div>
              </div>
              <h1
                style={{
                  margin: '20px 10px',
                  display: props.user.company_id === '|1|' ? 'block' : 'none'
                }}
              >
                Дэлгэрэнгүй судалгаа
              </h1>
              <div
                className={css.container2}
                style={{
                  display: props.user.company_id === '|1|' ? 'block' : 'none'
                }}
              >
                {/* Radio Group start */}
                <div className={css.negdiv}>
                  <div>Гаднах хаягийн гэрэлтүүлэгтэй эсэх?</div>
                  <Radio.Group
                    value={allData?.t_survey?.hasOutsideLight}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasOutsideLight: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>Худалдааны цэгт сул талбай байгаа эсэх?</div>
                  <Radio.Group
                    value={allData?.t_survey?.hasEmptySpace}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasEmptySpace: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>Агуулахтай эсэх ?</div>
                  <Radio.Group
                    value={allData?.t_survey?.hasWarehouse}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasWarehouse: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Лангуу болон тавиуруудад бараа, бүтээгдэхүүнээ ангилж,
                    хаягласан эсэх?
                  </div>
                  <Radio.Group
                    value={allData?.t_survey?.sortAndLabel}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          sortAndLabel: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Лангуун дээр бараа бүтээгдэхүүнийг дүүргэж өгсөн эсэх? (
                    дүүргэлт 80%-с дээш)
                  </div>
                  <Radio.Group
                    value={allData?.t_survey?.shelvesFilled}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          shelvesFilled: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>Худалдааны цэг дотор сагс байгаа эсэх?</div>
                  <Radio.Group
                    value={allData?.t_survey?.hasShoppingBasket}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasShoppingBasket: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>Худалдааны цэг дотор тэрэг байгаа эсэх?</div>
                  <Radio.Group
                    value={allData?.t_survey?.hasShoppingCart}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasShoppingCart: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Худалдааны цэгт нийлүүлэгчийн борлуулалтыг дэмжих хэрэгсэл
                    байгаа эсэх?
                  </div>
                  <Radio.Group
                    value={allData?.t_survey?.hasSupportTools}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasSupportTools: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>Худалдааны цэг дотор ATM-тэй эсэх?</div>
                  <Radio.Group
                    value={allData?.t_survey?.hasAtms}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasAtms: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>Худалдааны цэг дотор Pick pack box-тэй эсэх?</div>
                  <Radio.Group
                    value={allData?.t_survey?.hasPickPack}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasPickPack: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Худалдааны цэг дотор орчих зай талбай чөлөөтэй эсэх?
                  </div>
                  <Radio.Group
                    value={allData?.t_survey?.freeSpaceForCustomers}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          freeSpaceForCustomers: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>Кассын бүртгэлийн системтэй эсэх?</div>
                  <Radio.Group
                    value={allData?.t_survey?.hasCashSystem}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasCashSystem: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>
                    НӨАТ-ын нэгдсэн системд бүртгүүлсэн эсэх? (E-barimt хэвлэж
                    өгдөг)
                  </div>

                  <Radio.Group
                    value={allData?.t_survey?.hasVATSystem}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasVATSystem: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={css.negdiv}>
                  <div>Худалдагчийн ээлжтэй эсэх?</div>
                  <Radio.Group
                    value={allData?.t_survey?.hasSellerRoster}
                    buttonStyle='solid'
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          hasSellerRoster: e.target.value
                        }
                      }))
                    }
                  >
                    <Radio.Button value={true}>Тийм</Radio.Button>
                    <Radio.Button value={false}>Үгүй</Radio.Button>
                  </Radio.Group>
                </div>
                {/* Radio Group end */}

                <div className={css.negdiv}>
                  <div>Лангуун болон тавиур дээрх өрөлтөд байхгүй ангилал?</div>
                  <Select
                    allowClear
                    mode='multiple'
                    // placeholder="хайх"
                    style={{ width: '100%' }}
                    value={allData?.t_survey?.doesntExistCategory}
                    options={twentyfive}
                    onChange={value =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          doesntExistCategory: value
                        }
                      }))
                    }
                  />
                </div>
                <div className={css.negdiv}>
                  <div>Нийт өрөлтөд эзлэх ТОП 5 ангилал?</div>
                  <Select
                    allowClear
                    mode='multiple'
                    // placeholder="хайх"
                    style={{ width: '100%' }}
                    value={allData?.t_survey?.top5Category}
                    options={twentyfive}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          top5Category: e
                        }
                      }))
                    }
                  />
                </div>
                <div className={css.negdiv}>
                  <div>Харилцагчийн бараа бүтээгдэхүүнээ захиалдаг суваг?</div>
                  <Select
                    allowClear
                    mode='multiple'
                    style={{ width: '100%' }}
                    value={allData?.t_survey?.orderChannel}
                    options={orderChannelOptions}
                    onChange={value =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          orderChannel: value
                        }
                      }))
                    }
                  />
                </div>
                <div className={css.negdiv}>
                  <div>Худалдааны цэгийн дотор талбайн хэмжээ?</div>
                  <select
                    className={css.negdiv}
                    id='aream2'
                    value={allData?.t_survey?.aream2}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          aream2: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1-20 м2</option>
                    <option value={2}>21-40 м2</option>
                    <option value={3}>41-60 м2</option>
                    <option value={4}>61-80 м2</option>
                    <option value={5}>81-100 м2</option>
                    <option value={6}> 101-120 м2</option>
                    <option value={7}>120 м2-оос дээш</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Худалдааны цэгийн өрөө тасалгааны тоо?</div>
                  <select
                    className={css.negdiv}
                    id='rooms'
                    value={allData?.t_survey?.rooms}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          rooms: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>3-аас дээш</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Худалдааны цэгийн талбайн төлөвлөлт?</div>
                  <select
                    className={css.negdiv}
                    id='spacePlanning'
                    value={allData?.t_survey?.spacePlanning}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          spacePlanning: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>П</option>
                    <option value={2}>Тууш</option>
                    <option value={3}>Диагналь</option>
                    <option value={4}>Хайрцагласан</option>
                  </select>
                </div>

                <div className={css.negdiv}>
                  <div>Агуулахын тоо ?</div>
                  <select
                    className={css.negdiv}
                    id='numberOfWarehouse'
                    value={allData?.t_survey?.numberOfWarehouse}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          numberOfWarehouse: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>2-оос дээш</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Нийт агуулахын хэмжээ?</div>
                  <select
                    className={css.negdiv}
                    id='warehouseSize'
                    value={allData?.t_survey?.warehouseSize}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          warehouseSize: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1-5 м2</option>
                    <option value={2}>6-10 м2</option>
                    <option value={3}>11-15 м2</option>
                    <option value={4}>16-20 м2</option>
                    <option value={5}>21-25 м2</option>
                    <option value={6}>26 м2-аас дээш</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Бараа өрөлтийн урсгал? (хаалга-касс)</div>
                  <select
                    className={css.negdiv}
                    id='flowOfProducts'
                    value={allData?.t_survey?.flowOfProducts}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          flowOfProducts: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>Нар зөв</option>
                    <option value={2}>Нар буруу</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Бараа бүтээгдэхүүнийг харилцагч худалдан авахад хялбар, эмх
                    цэгцтэй өрсөн байдал? (1-5 оноо)
                  </div>
                  <select
                    className={css.negdiv}
                    id='easyToBuy'
                    value={allData?.t_survey?.easyToBuy}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          easyToBuy: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Худалдааны цэг доторх нийлүүлэгчийн борлуулалтын дэмжих
                    худалдааны хэрэгсэл?
                  </div>
                  <select
                    className={css.negdiv}
                    id='supportTools'
                    value={allData?.t_survey?.supportTools}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          supportTools: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>Хөргөгч</option>
                    <option value={2}>Тавиур</option>
                    <option value={3}>Зурагт хуудас</option>
                  </select>
                </div>

                <div className={css.negdiv}>
                  <div>Ус, ундаа, сүүний хөргөгчний тоо ?</div>
                  <select
                    id='numberOfDrinkFridge'
                    value={allData?.t_survey?.numberOfDrinkFridge}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          numberOfDrinkFridge: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>0-1</option>
                    <option value={2}>2-3</option>
                    <option value={3}>4-5</option>
                    <option value={4}>5-аас дээш</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Түргэн хоолны хөргөгчний тоо?</div>
                  <select
                    id='numberOfFoodFridge'
                    value={allData?.t_survey?.numberOfFoodFridge}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          numberOfFoodFridge: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>2-оос дээш</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Хэвтээ хөлдөөгчний тоо?</div>
                  <select
                    id='numberOfHorizontalFreezers'
                    value={allData?.t_survey?.numberOfHorizontalFreezers}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          numberOfHorizontalFreezers: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>0-1</option>
                    <option value={2}>2-3</option>
                    <option value={3}>4-5</option>
                    <option value={4}>5-аас дээш</option>
                  </select>
                </div>

                <div className={css.negdiv}>
                  <div>Худалдааны цэгийн нийт хаалганы тоо?</div>
                  <select
                    id='numberOfDoors'
                    value={allData?.t_survey?.numberOfDoors}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          numberOfDoors: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Худалдааны цэгийн цэвэр цэмцгэр, эрүүл ахуйн шаардлага
                    хангасан байдал? (1-5)
                  </div>
                  <select
                    id='clean'
                    value={allData?.t_survey?.clean}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          clean: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Үйлчлүүлэгчдийн урсгал? (1-5)</div>
                  <select
                    className={css.negdiv}
                    id='flowOfCustomers'
                    value={allData?.t_survey?.flowOfCustomers}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          flowOfCustomers: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>

                <div className={css.negdiv}>
                  <div>Кассын тоо?</div>
                  <select
                    id='numberOfCashier'
                    value={allData?.t_survey?.numberOfCashier}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          numberOfCashier: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>2-оос дээш</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Кассын системийн нэр?</div>
                  <select
                    id='cashRegisterSystemName'
                    value={allData?.t_survey?.cashRegisterSystemName}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          cashRegisterSystemName: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>On time</option>
                    <option value={2}>Төмөр хөлөг</option>
                    <option value={3}>Electromon</option>
                    <option value={4}>Касс.мн</option>
                    <option value={5}>Daimond</option>
                    <option value={6}>Бааз</option>
                    <option value={7}>Пос365</option>
                    <option value={8}>Оньс</option>
                    <option value={9}>Ictv</option>
                    <option value={10}>Амар</option>
                    <option value={11}>Jojo</option>
                    <option value={12}>Ritus</option>
                    <option value={13}>Сэцэн</option>
                    <option value={14}>Аравт</option>
                    <option value={15}>Бусад</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Нийт ажилтны тоо?</div>
                  <select
                    id='numberOfEmployees'
                    value={allData?.t_survey?.numberOfEmployees}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          numberOfEmployees: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1-2</option>
                    <option value={2}>3-4</option>
                    <option value={3}>5-6</option>
                    <option value={4}>6-аас дээш</option>
                  </select>
                </div>

                <div className={css.negdiv}>
                  <div>Худалдагчийн нас?</div>
                  <select
                    id='sellersAge'
                    value={allData?.t_survey?.sellersAge}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          sellersAge: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>18-27</option>
                    <option value={2}>28-37</option>
                    <option value={3}>38-47</option>
                    <option value={4}>47-оос дээш</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Харилцагчийн тухайн бизнесийг эрхэлж буй хугацаа? (Одоогийн
                    ажлын байранд, жилээр)
                  </div>
                  <select
                    id='businessYear'
                    value={allData?.t_survey?.businessYear}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          businessYear: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>0-1</option>
                    <option value={2}>2-3</option>
                    <option value={3}>4-5</option>
                    <option value={4}>5-аас дээш</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Нэмэлт төлбөрийн хэрэгсэл</div>
                  <select
                    id='additionalPaymentSystem'
                    value={allData?.t_survey?.additionalPaymentSystem}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          additionalPaymentSystem: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>Посын машин</option>
                    <option value={2}>Интернэт банк</option>
                    <option value={3}>Qpay</option>
                    <option value={4}>Monpay</option>
                    <option value={5}>Social pay</option>
                    <option value={6}>Бусад</option>
                  </select>
                </div>

                <div className={css.negdiv}>
                  <div>Харилцагчийн E-Bazaar-аас захиалга хийдэг хэрэгсэл?</div>
                  <select
                    id='orderTool'
                    value={allData?.t_survey?.orderTool}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          orderTool: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>Апп</option>
                    <option value={2}>Веб</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Харилцагчийн хэрэглэж буй утасны марк?</div>
                  <select
                    id='phoneOS'
                    value={allData?.t_survey?.phoneOS}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          phoneOS: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>Аndroid</option>
                    <option value={2}>Iphone</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Харилцагчийн бараа бүтээгдэхүүний талаарх дэлгэрэнгүй
                    мэдээлэлэл авдаг суваг?
                  </div>
                  <select
                    id='productInfoChannel'
                    value={allData?.t_survey?.productInfoChannel}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          productInfoChannel: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>Телевиз</option>
                    <option value={2}>Facebook</option>
                    <option value={3}>Найз нөхөд ойр дотны хүнээс</option>
                    <option value={4}>Худалдааны төлөөлөгч</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Нийлүүлэгчийн түгээлт хамгийн их ирдэг цаг?</div>
                  <select
                    id='supplierDeliveryTime'
                    value={allData?.t_survey?.supplierDeliveryTime}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          supplierDeliveryTime: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>08:00-11:00</option>
                    <option value={2}>11:00-14:00</option>
                    <option value={3}>14:00-17:00</option>
                    <option value={4}>17:00-20:00</option>
                    <option value={5}>20:00-23:00</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>Худалдааны төлөөлөгч хамгийн их ирдэг цаг?</div>
                  <select
                    id='htDeliveryTime'
                    value={allData?.t_survey?.htDeliveryTime}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          htDeliveryTime: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>08:00-11:00</option>
                    <option value={2}>11:00-14:00</option>
                    <option value={3}>14:00-17:00</option>
                    <option value={4}>17:00-20:00</option>
                    <option value={5}>20:00-23:00</option>
                  </select>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Худалдааны цэгийн байршлын талаарх дэлгэрэнгүй мэдээлэл?
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {fifteen.map((e, i) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginBottom: '3px',
                          alignItems: 'center'
                        }}
                        key={i}
                      >
                        <div style={{ marginRight: '5px' }}>
                          <input
                            type='checkbox'
                            checked={allData?.t_survey?.cityCenter?.includes(
                              e.value
                            )}
                            onChange={c => {
                              HandleCityCenter(c.target.checked, e.value);
                            }}
                          />
                        </div>
                        <div>{e.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={css.negdiv}>
                  <div>
                    Худалдааны цэгийн байршлын талаарх нэгтгэсэн мэдээлэл?
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {nine.map(e => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginBottom: '5px'
                        }}
                        key={e.value}
                      >
                        <div style={{ marginRight: '5px' }}>
                          <input
                            type='checkbox'
                            checked={allData?.t_survey?.combinedInfo?.includes(
                              e.value
                            )}
                            onChange={c => {
                              HandleCombinedInfo(c.target.checked, e.value);
                            }}
                          />
                        </div>
                        <div>{e.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={css.negdiv}
                  style={{
                    justifyContent: 'flex-start'
                  }}
                >
                  <div
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    Ажилтны код?
                  </div>
                  <select
                    id='workerCode'
                    value={allData?.t_survey?.workerCode}
                    onChange={e =>
                      setAllData(prev => ({
                        ...prev,
                        t_survey: {
                          ...prev.t_survey,
                          workerCode: e.target.value
                        }
                      }))
                    }
                  >
                    <option value={0}></option>
                    <option value={1}>1001</option>
                    <option value={2}>1002</option>
                    <option value={3}>1003</option>
                    <option value={4}>1004</option>
                  </select>
                </div>
              </div>
              <button
                onClick={
                  props.user.company_id === '|1|' ? save : SaveHandlerOther
                }
                style={{ marginTop: '10px', width: '200px' }}
              >
                Хадгалах
              </button>
            </>
            {/* )) */}
            {/* )} */}
          </TabPane>
          <TabPane tab={'Нийлүүлэгчид'} key={1}>
            <Supplier
              data={userData}
              result={userResult}
              allData={allData}
              getSupplier={getSupplier}
              includedSuppId={includedSuppId}
              setIncludedSuppId={setIncludedSuppId}
              excludedSuppId={excludedSuppId}
              setExcludedSuppId={setExcludedSuppId}
              includedConfig={includedConfig}
              setIncludedConfig={setIncludedConfig}
              excludedConfig={excludedConfig}
              setExcludedConfig={setExcludedConfig}
              optionValue={optionValue}
              setOptionValue={setOptionValue}
              orderEditPermission={newData[0]?.orderEditPermission}
              userId={props.data.user_id}
              getNewData={getNewData}
            />
          </TabPane>
          <TabPane tab={'Бараанууд'} key={2}>
            <Products
              getSupplier={getSupplier}
              includedConfig={includedConfig}
              userResult={userResult}
              includeProductList={includeProductList}
              excludeProductList={excludeProductList}
              setIncludeProductList={setIncludeProductList}
              setExcludeProductList={setExcludeProductList}
            />
          </TabPane>
          <TabPane tab={'Захиалга өөрчлөх хүсэлт'} key={3}>
            <OrderPermission
              orderEditPermission={newData[0]?.orderEditPermission}
              userId={props.data.user_id}
              getSupplier={getSupplier}
              includedSuppId={includedSuppId}
            />
          </TabPane>
          <TabPane tab={'Захиалгын түүх'} key={4}>
            <OrderHistory
              data={userData}
              allData={allData}
              userId={props.data.user_id}
              order={order}
              setOrder={setOrder}
              isOrderDetail={isOrderDetail}
              setIsOrderDetail={setIsOrderDetail}
            />
          </TabPane>
          <TabPane tab={'Төлбөрийн нөхцөл'} key={5}>
            <PaymentType
              id={props.data.tradeshop_id}
              permission={userResult?.t_order_payment}
              fetchdata={fetchdata}
            />
          </TabPane>
        </Tabs>
      </div>
      {isOrderDetail && (
        <div
          onClick={() => {
            setIsOrderDetail(false);
          }}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,.6)',
            zIndex: '100000005',
            position: 'absolute',
            top: '0px',
            left: '0px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '500px',
              backgroundColor: 'white'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '10px',
                width: '100%',
                height: '80px'
              }}
            >
              <span style={{ fontWeight: '700', fontSize: '20px' }}>
                Захиалгын дугаар : {order.order_id}
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: 'calc(100% - 80px)',
                overflowY: 'scroll'
              }}
            >
              {order.line.map(line => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '80px',
                      padding: '5px 0px',
                      borderBottom: '1px dashed rgba(100, 100, 100)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '100%'
                      }}
                    >
                      <img
                        style={{
                          height: '90%',
                          width: '50px',
                          objectFit: 'contain'
                        }}
                        src={line.product_image || ''}
                        alt='img'
                      />
                    </div>
                    <div
                      className={css.productRight}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: 'calc(100% - 80px)'
                      }}
                    >
                      <span>{line.product_name}</span>
                      <span>
                        <span
                          style={{
                            fontWeight: '700',
                            color: 'rgb(144, 164, 174)'
                          }}
                        >
                          {line.price}₮
                        </span>
                        <span
                          style={{
                            fontWeight: '700',
                            color: 'rgb(255, 164, 0)'
                          }}
                        >
                          &nbsp; x {line.quantity}
                        </span>
                        <span
                          style={{
                            fontWeight: '700',
                            color: 'rgb(0,0,0)'
                          }}
                        >
                          &nbsp; {line.price * line.quantity}₮
                        </span>
                      </span>
                      <span>Barcode :{line.product_bar_code}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail2;
