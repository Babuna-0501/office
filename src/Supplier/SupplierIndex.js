import React, { useEffect, useState, useContext } from 'react';
import css from './supplierindex.module.css';
import List from './List';
import { Banks, SupplierGroup } from './constants';
import DeleteIcon from '../assets/delete_red_small.svg';
import Bank from '../assets/Bank.svg';
import Media from './Media';
import { Select } from 'antd';
import myHeaders from '../components/MyHeader/myHeader';
import ProductReportHook from '../Hooks/ProductsReportHook';
import Modal from './components/Modal';
import { zone_a, zone_b, zone_c } from './Data';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';
import ChannelSetup from './components/ChannelSetup';
import { Modal as NewModal } from '../Achiltiinzahialga/components/common/Modal';
import ProductList from './components/productList';
import { Button } from '../components/common/Button';
import DaysToShow from './components/OrderTiming/DaysToShow/DaysToShow';
import Delay from './components/OrderTiming/Delay/Delay';
import Hours from './components/OrderTiming/Hours/Hours';
import SelectMy from './components/Select/select';
import SuppConfig from './components/SuppConfig';
import SupplierHook from '../Hooks/SupplierHook';

const SupplierIndex = props => {
  const suppCtx = useContext(SupplierHook);

  const [isNewModal, setIsNewModal] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [dummy, setDummy] = useState(0);
  const [searchValue, setSearchValue] = useState();
  const [index, setIndex] = useState('');
  const [nuat, setNuat] = useState(0);
  const [regNumber, setRegNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [sfaActive, setSfaActive] = useState(false);
  const [moreInfo, setMoreInfo] = useState('');
  const [group, setGroup] = useState();
  const [supplierName, setSupplierName] = useState('');
  const [supplierNameEng, setSupplierNameEng] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [modal, setModal] = useState(false);
  const [bank, setBank] = useState();
  const [newBankAccount, setNewBankAccount] = useState('');
  const [newBankHolder, setNewBankHolder] = useState('');
  const [deliveryDate, setDeliveryDate] = useState([1, 2, 3, 4, 5]);
  const [chosedChannel, setChosedChannel] = useState([]);
  const [logo, setLogo] = useState('');
  const [media, setMedia] = useState(false);
  const [channelSetup, setChannelSetup] = useState(false);
  const [alcohol, setAlcohol] = useState(0);
  const [returnProduct, setReturnProduct] = useState(0);
  //toollogo
  const [returnToollogo, setReturnToollogo] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const [isSuperMarket, setIsSuperMarket] = useState(0);
  const [search, setSearch] = useState('');
  const [merSearch, setMerSearch] = useState('');
  let [merchants, setMerchants] = useState([]);
  const [blackList, setBlackList] = useState([]);
  const [whiteList, setWhiteList] = useState([]);
  const [coMerchant, setCoMerchant] = useState([]);
  const [coSupplier, setCoSupplier] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [busPrice, setBusPrice] = useState(null);
  const [merchantId, setMerchantId] = useState();
  const [sfaSupps, setSfaSupps] = useState([]);

  const [daysShow, setDaysShow] = useState();
  const [delay, setDelay] = useState();
  const [hours, setHours] = useState();

  const permission = Object.values(JSON.parse(props.userData.permission))[0];
  const dates = [1, 2, 3, 4, 5, 6, 7];
  const ProductReportHookctx = useContext(ProductReportHook);

  const [smsNotif, setSmsNotif] = useState(false);
  const [smsPhone, setSmsPhone] = useState('');
  const [emailNotif, setEmailNotif] = useState(false);
  const [emailNotifAddress, setEmailNotifAddress] = useState('');
  const [pushNotif, setPushNotif] = useState(false);
  const [changedProducts, setChangedProducts] = useState([]);

  const { setHeaderContent } = useContext(HeaderContext);

  console.log('SUPPS: ', suppliers.length);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);
  const postOresh = async () => {
    try {
      // safe decent iig Number luu hurvuulj bn
      for (const item of changedProducts) {
        item.safe = item.safe === '' ? 0 : Number(item.safe);
        item.decent = item.decent === '' ? 0 : Number(item.decent);
      }

      // safe decent 2la hooson baival hasaj bn
      const filteredProducts = changedProducts.filter(
        item => item.safe != false || item.decent != false
      );

      const body = {
        supplierId: Number(moreInfo.id),
        merchantId: Number(merchantId),
        products: filteredProducts
      };

      var requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: myHeaders,
        redirect: 'follow'
      };
      const data = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/oresh`,
        requestOptions
      );
      const res = await data.json();
      if (res.code === 200) {
        console.log('res', res);
      }
      alert('Амжилттай');
      setIsNewModal(false);
    } catch (error) {
      console.log('users error ', error);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        let url = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`;
        if (search) {
          url = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${search}`;
        }

        if (suppCtx.sfaFilter === 'sfaTrue') {
          const filteredSupps = [];

          const response = await fetch(url, requestOptions);
          const res = await response.json();

          for (const supp of res.data) {
            const sfa = JSON.parse(supp.available)?.sfa;
            console.log('FILTER: ', sfa);
            if (sfa === true) {
              console.log('FILTERED ITEM: ', supp);
              filteredSupps.push(supp);
            }
          }

          setSuppliers(filteredSupps);
        } else if (suppCtx.sfaFilter === 'sfaFalse') {
          const filteredSupps = [];

          const response = await fetch(url, requestOptions);
          const res = await response.json();

          for (const supp of res.data) {
            const sfa = JSON.parse(supp.available)?.sfa;
            console.log('FILTER: ', sfa);
            if (sfa === false) {
              console.log('FILTERED ITEM: ', supp);
              filteredSupps.push(supp);
            }
          }

          setSuppliers(filteredSupps);
        } else if (suppCtx.sfaFilter === 'all') {
          const response = await fetch(url, requestOptions);
          const res = await response.json();
          setSuppliers(res.data);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchdata();
  }, [search, dummy, ProductReportHookctx.render, suppCtx.sfaFilter]);

  useEffect(() => {
    if (index !== 'new') {
      if (index) {
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch(
          `${process.env.REACT_APP_API_URL2}/api/backoffice/newsuppliers?id=${index}`,
          requestOptions
        )
          .then(res => res.json())
          .then(res => {
            console.log('res976', res);
          });
        const fetchdata = async () => {
          console.log('index', index);
          const data = await fetch(
            `${process.env.REACT_APP_API_URL2}/api/backoffice/newsuppliers?id=${index}`,
            requestOptions
          );
          const res = await data.json();
          console.log('res948', res);
          setMoreInfo(res);
          setDeliveryDate(
            JSON.parse(res.new_deliver).location[0].delivery_date
          );
        };
        const dateData = async () => {
          const data = await fetch(
            `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${index}`,
            requestOptions
          );

          const result = await data.json();
          const cityIDs = JSON.parse(result.data[0].supplier_is_active).city;

          // console.log("IDS", cityIDs);

          // ProductReportHookctx.setOronNutagdata(cityIDs);
          ProductReportHookctx.setChannelID(cityIDs);

          setHours(result.data[0].orderTiming.hours);
          setDelay(Number(result.data[0].orderTiming.delay));
          setDaysShow(Number(result.data[0].orderTiming.daysToShow));
          setSfaActive(JSON.parse(result.data[0].Available).sfa);
        };
        try {
          fetchdata();
          dateData();
        } catch (error) {
          console.log('users error ', error);
        }
      }
    } else {
      setDeliveryDate([]);
    }
  }, [index, dummy, ProductReportHookctx.render]);

  useEffect(() => {
    console.log('coMerchant', coMerchant);
  }, [coMerchant]);

  useEffect(() => {
    if (!index) return;
    if (index === 'new') return;

    setPhone(suppliers.find(e => e.id === index)?.phone || '');
    setEmail(suppliers.find(e => e.id === index)?.email || '');
    setDescription(suppliers.find(e => e.id === index)?.description || '');
    setIsActive(suppliers.find(e => e.id === index)?.is_active || 0);
    setGroup(suppliers.find(e => e.id === index)?.category_id || '');
    setSupplierName(suppliers.find(e => e.id === index)?.name || '');
    setSupplierNameEng(suppliers.find(e => e.id === index)?.english_name || '');
    setAddress(suppliers.find(e => e.id === index)?.address || '');
    setWebsite(suppliers.find(e => e.id === index)?.website || '');

    suppliers.find(e => e.id === index)?.coSupplier ||
    suppliers.find(e => e.id === index)?.coMerchant
      ? setIsSuperMarket(true)
      : setIsSuperMarket(false);

    setCoMerchant(
      suppliers.find(e => e.id === index)?.coMerchant?.split(',') || []
    );

    setCoSupplier(
      suppliers.find(e => e.id === index)?.coSupplier?.split(',') || []
    );
    setMinAmount(
      suppliers.find(e => e.id === index)?.minimum_order_amount || ''
    );
    setMoreInfo(
      suppliers.find(e => e.id === index)?.bankaccount || { bankaccount: [] }
    ); ////

    ProductReportHookctx.setMinAmount(
      suppliers.find(e => e.id === index)?.new_minimum_order_amount
        ? JSON.parse(
            suppliers.find(e => e.id === index)?.new_minimum_order_amount
          )
        : {}
    );
    setLogo(suppliers.find(e => e.id === index)?.media || '');
    const available = suppliers.find(e => e.id === index)?.available;

    setSfaActive(JSON.parse(available)?.sfa);
    setAlcohol(suppliers.find(e => e.id === index)?.alcohol || 0);
    setReturnProduct(suppliers.find(e => e.id === index)?.return || 0);
    setBlackList(
      suppliers.find(e => e.id === index)?.merchant_list
        ? JSON.parse(suppliers.find(e => e.id === index)?.merchant_list)
            ?.blackList?.register
        : []
    );
    setWhiteList(
      suppliers.find(e => e.id === index)?.merchant_list
        ? JSON.parse(suppliers.find(e => e.id === index)?.merchant_list)
            ?.whiteList?.register
        : []
    );

    if (suppliers.find(e => e.id === index).notification !== null) {
      setSmsNotif(
        JSON.parse(suppliers.find(e => e.id === index).notification).sms.sms ||
          false
      );
      setSmsPhone(
        JSON.parse(suppliers.find(e => e.id === index).notification).sms
          .phone_number || ''
      );
      setEmailNotif(
        JSON.parse(suppliers.find(e => e.id === index).notification).email
          .email || false
      );
      setEmailNotifAddress(
        JSON.parse(suppliers.find(e => e.id === index).notification).email
          .email_address || ''
      );
      setPushNotif(
        JSON.parse(suppliers.find(e => e.id === index).notification)
          .notification.notification || false
      );
    }

    let busids =
      JSON.parse(suppliers.find(e => e.id === index).supplier_is_active)
        .channels || [];
    let aa = ProductReportHookctx.bustype.map(item => {
      if (busids.includes(item.business_type_id)) {
        return {
          ...item,
          chosed: true
        };
      }
      return {
        ...item,
        chosed: false
      };
    });
    ProductReportHookctx.setBustype([...aa]);
    let oronids =
      JSON.parse(suppliers.find(e => e.id === index).supplier_is_active).city ||
      [];
    let bb = ProductReportHookctx.nutagdata.map(item => {
      if (oronids.includes(item.location_id)) {
        return {
          ...item,
          chosed: true
        };
      }
      return {
        ...item,
        chosed: false
      };
    });
    ProductReportHookctx.setNutagdata([...bb]);

    let supplierActive = JSON.parse(
      suppliers.find(x => x.id === index).supplier_is_active
    );
    if (supplierActive) {
      if (supplierActive.tradehops && supplierActive.tradehops.include) {
        ProductReportHookctx.setTradeshopIDS(supplierActive.tradehops.include);
      }
    }
  }, [index]);

  useEffect(() => {
    setBank();
    setNewBankAccount();
    setNewBankHolder();
  }, [modal]);

  useEffect(() => {
    var myHeaders = new Headers();
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
    let url = `${
      process.env.REACT_APP_API_URL2
    }/api/merchants?id=${coMerchant.join(',')}`;

    if (merSearch) {
      url = `${process.env.REACT_APP_API_URL2}/api/merchants?id=${merSearch}`;
    }
    if (props.userData?.company_id === '|14057|') {
      url = `${process.env.REACT_APP_API_URL2}/api/merchants?id=6249,6250,6251`;
    }
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setMerchants([...merchants, ...response.data]);
        if (merSearch) {
          setMerchants([...response.data]);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [merSearch, coMerchant]);

  const merList = merchants
    .map(e => ({
      value: e.business_register,
      label: `${e.business_register} - ${e.tradeshop_name}`
    }))
    .filter(
      (value, index, self) =>
        index === self.findIndex(t => t?.value === value?.value)
    );
  const merListId = merchants
    .map(e => ({
      value: String(e.tradeshop_id),
      label: `${e.tradeshop_id} - ${e.tradeshop_name}`
    }))
    .filter(
      (value, index, self) =>
        index === self.findIndex(t => t?.value === value?.value)
    );

  useEffect(() => {
    setRegNumber(moreInfo?.register || '');
  }, [moreInfo]);

  const save = () => {
    if (smsNotif && smsPhone === '')
      return alert('СМС илгээх дугаараа оруулна уу!');

    if (emailNotif && emailNotifAddress === '')
      return alert('Мэйл явуулах хаягаа оруулна уу!');

    if (supplierName === '') {
      alert('Та нэрээ оруулна уу');
      return;
    }
    if (supplierNameEng === '') {
      alert('Та англи нэрээ оруулна уу');
      return;
    }
    if (phone === '') {
      alert('Та утасны дугаараа оруулна уу');
      return;
    }
    if (email === '') {
      alert('Та имэйл хаягаа оруулна уу');
      return;
    }
    if (address === '') {
      alert('Та хаягаа оруулна уу');
      return;
    }

    if (regNumber === '') {
      alert('Рэгистрийн дугаараа оруулна уу');
      return;
    }
    if (minAmount === '') {
      alert('Та захиалгын доод хэмжээгээ оруулна уу');
      return;
    }
    if (logo === '') {
      alert('Та захиалгын лого оруулна уу');
      return;
    }

    if (
      deliveryDate.length !== 0 &&
      supplierName &&
      supplierNameEng &&
      phone &&
      email &&
      address &&
      regNumber &&
      minAmount &&
      logo
    ) {
      var myHeaders = new Headers();
      myHeaders.append(
        'ebazaar_token',
        localStorage.getItem('ebazaar_admin_token')
      );
      myHeaders.append('Content-Type', 'application/json');

      let minPrice = {
        ...busPrice,
        default: Number(minAmount)
      };

      let deliveryData = {
        location: [
          {
            coordinates: [
              [85.4335706, 49.0823404],
              [89.432594, 43.2626271],
              [104.901344, 41.2957833],
              [127.3573987, 44.2937978],
              [107.713844, 53.4499689],
              [85.4335706, 49.0823404]
            ],
            delivery_date: deliveryDate.map(e => parseInt(e)),
            business_type:
              ProductReportHookctx.sitedata &&
              ProductReportHookctx.sitedata.business_types.map(e =>
                parseInt(e.business_type_id)
              ),
            orderbefore: 32
          }
        ]
      };

      let newdatedata = deliveryDate.map(e => parseInt(e));

      let channelids = [];
      let locationids = [];
      let catIDS = [];

      let oldLocations = [];
      ProductReportHookctx.allCat.map(item =>
        item.chosed ? catIDS.push(item.id) : null
      );
      ProductReportHookctx.bustype.map(item =>
        item.chosed ? channelids.push(item.business_type_id) : null
      );

      ProductReportHookctx.oronNutagdata.map(item =>
        item.chosed ? locationids.push(item.location_id) : null
      );

      console.dir(ProductReportHookctx.oronNutagdata);

      // for (const data of ProductReportHookctx.oronNutagdata) {
      // 	// console.log("IDS", data.location_id);
      // 	data.chosed ? locationids.push(data.location_id) : null;
      // }
      console.log('CHEEECK', locationids);
      console.log('ANOTHER ONE', ProductReportHookctx.channelID);
      console.log(
        'ORON NUTAG DATA:  ',
        ProductReportHookctx.oronNutagdata.map((e, idx) => {
          return e.location_id;
        })
      );
      var raw =
        index === 'new'
          ? JSON.stringify({
              // SupplierID: index,
              SupplierName: supplierName,
              SupplierNameEnglish: supplierNameEng,
              SupplierPhone: phone,
              Email: email.replaceAll(' ', ''),
              Website: website, //
              Address: address,
              SupplierGroupID: group,
              SupplierDescription: description, //
              isActive: isActive ? 1 : 0, //
              Register: regNumber,
              MinimumOrderAmount: minAmount,
              NewMinimumOrderAmount: minPrice,
              DeliveryDate: newdatedata,
              MailList: [email],
              CoSupplier: coSupplier.join(','),
              CoMerchant: coMerchant.join(','),
              Alcohol: alcohol, //
              ReturnProduct: returnProduct, //
              Media: logo,
              MerchantList: {
                blackList: { register: blackList, tradeshop_id: [] },
                whiteList: { register: whiteList, tradeshop_id: [] }
              },
              Notification: {
                sms: {
                  sms: smsNotif,
                  phone_number: smsPhone
                },
                email: {
                  email: emailNotif,
                  email_address: emailNotifAddress
                },
                notification: {
                  notification: pushNotif
                }
              },
              Available: JSON.stringify({
                ebazaar: true,
                sfa: sfaActive,
                arig: false
              })
              // SupplierIsActive: {
              //   channels:
              //     ProductReportHookctx.busIDS.length > 0
              //       ? ProductReportHookctx.busIDS
              //       : channelids,
              //   tradehops: {
              //     include: [],
              //     exclude: [],
              //   },
              //   city: locationids,
              // },
            })
          : JSON.stringify({
              SupplierID: index,
              SupplierName: supplierName,
              SupplierNameEnglish: supplierNameEng,
              SupplierPhone: phone,
              Email: email.replaceAll(' ', ''),
              Website: website, //
              Address: address,
              SupplierGroupID: group,
              SupplierDescription: description, //
              isActive: isActive, //
              Register: regNumber,
              MinimumOrderAmount: minAmount,
              NewMinimumOrderAmount: minPrice,
              Delivery: deliveryData,
              MailList: [email],
              CoSupplier: coSupplier.join(','),
              CoMerchant: coMerchant.join(','),
              Alcohol: alcohol, //
              ReturnProduct: returnProduct, //
              Media: logo,
              MerchantList: {
                blackList: { register: blackList, tradeshop_id: [] },
                whiteList: { register: whiteList, tradeshop_id: [] }
              },
              Notification: {
                sms: {
                  sms: smsNotif,
                  phone_number: smsPhone
                },
                email: {
                  email: emailNotif,
                  email_address: emailNotifAddress
                },
                notification: {
                  notification: pushNotif
                }
              },
              SupplierIsActive: {
                channels:
                  ProductReportHookctx.busIDS.length > 0
                    ? ProductReportHookctx.busIDS
                    : channelids,
                tradehops: {
                  include:
                    ProductReportHookctx.tradeshopIDS.length !== 0
                      ? ProductReportHookctx.tradeshopIDS
                      : [],
                  exclude: []
                },
                city: locationids,
                // city:
                //   locationids.length === 0
                //     ? ProductReportHookctx.channelID
                //     : locationids,
                categories: []
              },
              orderTiming: {
                daysToShow: daysShow,
                delay: delay,
                hours: hours
              },
              Available: JSON.stringify({
                ebazaar: true,
                sfa: sfaActive,
                arig: false
              })
            });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log('requestOptions', requestOptions);
      if (index === 'new') {
        fetch(
          `${process.env.REACT_APP_API_URL2}/api/suppliers/create`,
          requestOptions
        )
          .then(r => r.json())
          .then(res => {
            console.log('res-1', res);
            alert('Амжилттай хадгалагдлаа');
            setIndex('');
            setBusPrice(null);
            ProductReportHookctx.setMinAmount(null);
            if (res.code === 200) {
              moreInfo?.bankaccount.map((e, i) =>
                fetch(`${process.env.REACT_APP_API_URL2}/api/bank/create`, {
                  method: 'POST',
                  headers: myHeaders,
                  body: JSON.stringify({
                    SupplierID: res.id,
                    BankID: parseInt(moreInfo?.bankaccount[i]?.bank),
                    AccountNumber: parseInt(moreInfo?.bankaccount[i]?.account),
                    AccountHolder: moreInfo?.bankaccount[i]?.holder
                  }),
                  redirect: 'follow'
                })
              );
              setDummy(dummy + 1);
            }
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        // fetch(`${process.env.REACT_APP_API_URL2}/api/suppliers?id=${index}`, requestOptions)
        //   .then(r=>r.json())
        //   .then(res=>{

        //   })

        fetch(
          `${process.env.REACT_APP_API_URL2}/api/suppliers/update`,
          requestOptions
        )
          .then(r => r.json())
          .then(res => {
            console.log('res-2', res);
            alert('Амжилттай хадгалагдлаа');
            setIndex('');
            setBusPrice(null);
            ProductReportHookctx.setMinAmount(null);
            if (res.code === 200) {
              fetch(`${process.env.REACT_APP_API_URL2}/api/suppliers`, {
                method: 'PUT',
                headers: myHeaders,
                mode: 'no-cors',
                body: JSON.stringify({
                  id: index,
                  orderTiming: {
                    daysToShow: daysShow,
                    delay: delay,
                    hours: hours
                  }
                })
              });

              moreInfo?.bankaccount.map((e, i) =>
                fetch(`${process.env.REACT_APP_API_URL2}/api/bank/create`, {
                  method: 'POST',
                  headers: myHeaders,
                  body: JSON.stringify({
                    ...(moreInfo?.bankaccount[i]?.id && {
                      id: parseInt(moreInfo?.bankaccount[i]?.id)
                    }),
                    ...(moreInfo?.bankaccount[i]?.id
                      ? {
                          supplier: parseInt(index)
                        }
                      : {
                          SupplierID: parseInt(index)
                        }),
                    ...(moreInfo?.bankaccount[i]?.id
                      ? {
                          bank_id: parseInt(moreInfo?.bankaccount[i]?.bank)
                        }
                      : {
                          BankID: parseInt(moreInfo?.bankaccount[i]?.bank)
                        }),
                    ...(moreInfo?.bankaccount[i]?.id
                      ? {
                          number: parseInt(moreInfo?.bankaccount[i]?.account)
                        }
                      : {
                          AccountNumber: parseInt(
                            moreInfo?.bankaccount[i]?.account
                          )
                        }),
                    ...(moreInfo?.bankaccount[i]?.id
                      ? {
                          holder: moreInfo?.bankaccount[i]?.holder
                        }
                      : {
                          AccountHolder: moreInfo?.bankaccount[i]?.holder
                        })

                    // SupplierID: parseInt(index),
                    // BankID: parseInt(moreInfo?.bankaccount[i]?.bank),
                    // AccountNumber: parseInt(moreInfo?.bankaccount[i]?.account),
                    // AccountHolder: moreInfo?.bankaccount[i]?.holder,
                  }),
                  redirect: 'follow'
                })
              );
              setDummy(dummy + 1);
            }
          })
          .catch(error => {
            console.log('error', error);
          });
      }
    } else {
      alert('Мэдээлэлээ бүрэн бөглөнө үү');
    }
  };
  const BankDelete = e => {
    console.log('delete', e);

    let confirm = window.confirm('Та банкны данс устгахдаа итгэлтэй байна уу');
    if (confirm) {
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/newsuppliers/deletebank?supplierId=${e.supplier}&BankAccountID=${e.id}`,
        {
          method: 'PUT',
          headers: myHeaders,
          redirect: 'follow'
        }
      )
        .then(res => res.json())
        .then(res => {
          console.log('delete banl', res);
          if (res) {
            alert('Амжилттай банк устгалаа');
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };

  const ShuurhaiUpdate = () => {
    if (smsNotif && smsPhone === '')
      return alert('СМС илгээх дугаараа оруулна уу!');

    if (emailNotif && emailNotifAddress === '')
      return alert('Мэйл явуулах хаягаа оруулна уу!');

    let channels = ProductReportHookctx.sitedata.business_types.map(item =>
      parseInt(item.business_type_id)
    );

    let channelids = [];
    let locationids = [];
    let catIDS = [];
    ProductReportHookctx.allCat.map(item =>
      item.chosed ? catIDS.push(item.id) : null
    );
    ProductReportHookctx.bustype.map(item =>
      item.chosed ? channelids.push(item.business_type_id) : null
    );
    ProductReportHookctx.oronNutagdata.map(item =>
      item.chosed ? locationids.push(item.location_id) : null
    );

    let rawlocation = {
      location: [
        {
          coordinates: zone_a,
          delivery_date: deliveryDate.map(e => parseInt(e)),
          business_type: channels,
          orderbefore: 10
        },
        {
          coordinates: zone_b,
          delivery_date: deliveryDate.map(e => parseInt(e)),
          business_type: channels,
          orderbefore: 10,
          deliveryfee: 4400
        },
        {
          coordinates: zone_c,
          delivery_date: deliveryDate.map(e => parseInt(e)),
          business_type: channels,
          orderbefore: 10,
          deliveryfee: 7700
        }
      ]
    };

    let minPrice = {
      ...busPrice,
      default: minAmount
    };

    let raw = {
      SupplierID: 13884,
      SupplierName: supplierName,
      SupplierNameEnglish: supplierNameEng,
      SupplierPhone: phone,
      Email: email,
      Website: website, //
      Address: address,
      SupplierGroupID: group,
      SupplierDescription: description, //
      isActive: isActive, //
      Register: regNumber,
      MinimumOrderAmount: minAmount,
      NewMinimumOrderAmount: minPrice,
      DeliveryDate: deliveryDate.map(e => parseInt(e)),
      Delivery: rawlocation,
      MailList: [email],
      CoSupplier: coSupplier.join(','),
      CoMerchant: coMerchant.join(','),
      Alcohol: alcohol, //
      ReturnProduct: returnProduct, //
      Media: logo,
      MerchantList: {
        blackList: { register: blackList, tradeshop_id: [] },
        whiteList: { register: whiteList, tradeshop_id: [] }
      },
      Notification: {
        sms: {
          sms: smsNotif,
          phone_number: smsPhone
        },
        email: {
          email: emailNotif,
          email_address: emailNotifAddress
        },
        notification: {
          notification: pushNotif
        }
      },
      SupplierIsActive: {
        channels:
          ProductReportHookctx.busIDS.length > 0
            ? ProductReportHookctx.busIDS
            : channelids,
        tradehops: {
          include: [],
          exclude: []
        },
        city: locationids,
        // city:
        //   ProductReportHookctx.oronNutagdata.length > 0
        //     ? ProductReportHookctx.oronNutagdata
        //     : locationids,
        categories: catIDS
      },
      orderTiming: {
        daysToShow: daysShow,
        delay: delay,
        hours: hours
      }
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/suppliers/update`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
        alert(res.message);
        setBusPrice(null);
        ProductReportHookctx.setMinAmount(null);
        setIndex('');
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const OpenHandler = () => {
    setOpenModal(true);
    console.log('oruullaaa');
  };

  const supplierList = suppliers?.map(supplier => ({
    value: String(supplier.id),
    label: `${supplier.id} - ${supplier.name}`
  }));

  useEffect(() => {
    
    const fetchCurrentStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL2}/api/pickpack/order/stop`, {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        });

        if (!response.ok) {
          throw new Error('Алдаатай хүсэлт');
        }

        const data = await response.json();
        setReturnToollogo(data.data.status === 'true');  
        
      } catch (error) {
        console.error('Статусыг авахад алдаа гарлаа:', error);
      }
    };

    fetchCurrentStatus();
  }, []); 
  const handleClick = async () => {
    try {
      const newStatus = !returnToollogo;
      setReturnToollogo(newStatus);

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({ status: newStatus.toString() }),
        redirect: 'follow'
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL2}/api/pickpack/order/stop`, requestOptions);

      if (!response.ok) {
        throw new Error('Алдаатай хүсэлт');
      }

      const data = await response.json();
      console.log('Response data:', data);
      setStatusMessage('Амжилттай шинэчлэгдлээ'); 
    } catch (error) {
      console.error('Хүсэлтэд алдаа гарлаа:', error);
      setStatusMessage('Шинэчлэхэд алдаа гарлаа'); 
    }
  };

  
  

  return (
    <div className={css.container2}>
      {modal && (
        <div className={css.modal}>
          <div className={css.modalContent}>
            <img src={Bank} alt='bank' />
            <div className={css.title}> Шинэ данс нэмэх</div>
            <div>
              <select
                onChange={e => setBank(e.target.value)}
                className={css.inputformSelect}
              >
                <option value='all'>Банк сонгох</option>
                {Banks.map(e => (
                  <option value={e.id} key={e.id}>
                    {e.bank_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                onChange={e => setNewBankAccount(e.target.value)}
                value={newBankAccount}
                className={css.inputform}
                placeholder='Дансны дугаараа бичнэ үү'
                type='number'
              />
            </div>
            <div>
              <input
                onChange={e => setNewBankHolder(e.target.value)}
                value={newBankHolder}
                className={css.inputform}
                placeholder='Дансны эзэмшигчийн нэр'
              />
            </div>
            <span
              className='btn'
              onClick={() => {
                if (bank && newBankAccount && newBankHolder) {
                  moreInfo?.bankaccount.push({
                    bank: bank,
                    account: newBankAccount,
                    holder: newBankHolder
                  });
                  setModal(false);
                } else {
                  alert('Мэдээлэл дутуу байна');
                }
              }}
            >
              Хадгалах
            </span>
            <span
              className='btn cancel'
              onClick={() => {
                setModal(false);
              }}
            >
              Цуцлах
            </span>
          </div>
        </div>
      )}
      <div className={css.container}>
        <div className='row header'>
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
            {permission.supplier.create && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <u
                  onClick={() => {
                    setIndex('new');
                  }}
                >
                  Шинэ нийлүүлэгч нэмэх
                </u>
              </div>
            )}
          </div>
        </div>
        {permission.supplier.read && (
          <List
            suppliers={
              searchValue
                ? suppliers.filter(e =>
                    e?.name?.toLowerCase()?.includes(searchValue.toLowerCase())
                  )
                : suppliers
            }
            index={index}
            setIndex={setIndex}
            userData={props.userData}
          />
        )}
      </div>
      <div className={css.permissionContainer}>
        {index && (
          <>
            <div className={css.row}>
              {index !== 'new' && (
                <div className={css.row}>
                  <div className={css.supplierName}>
                    <img
                      src={suppliers.find(e => e.id === index)?.media}
                      alt='supp'
                    />
                    {suppliers.find(e => e.id === index)?.name} - {index}
                  </div>
                </div>
              )}
            </div>
            <div className={css.row}>
              <div>
                <div className={css.bold}>Татвар төлөгчийн төрөл</div>
                <select
                  onChange={e => setNuat(e.target.value)}
                  className={css.inputformSelect}
                >
                  <option value='all'></option>
                  <option value={1}>НӨАТ төлөгч</option>
                  <option value={2}>НӨАТ төлөгч биш</option>
                </select>
              </div>
              <div>
                <div className={css.bold}>Регистрийн дугаар</div>
                <input
                  onChange={e => setRegNumber(e.target.value)}
                  value={regNumber}
                  className={css.inputform}
                  type='number'
                />
              </div>
              <div>
                <div className={css.bold}>Утасны дугаар</div>
                <input
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
                  className={css.inputform}
                  type='number'
                />
              </div>
            </div>
            <div className={css.row}>
              <div>
                <div className={css.bold}>Нийлүүлэгчийн нэр (Монгол)</div>
                <input
                  onChange={e => setSupplierName(e.target.value)}
                  value={supplierName}
                  className={css.inputform}
                />
              </div>
              <div>
                <div className={css.bold}>Нийлүүлэгчийн нэр (Англи)</div>
                <input
                  onChange={e => setSupplierNameEng(e.target.value)}
                  value={supplierNameEng}
                  className={css.inputform}
                />
              </div>
              <div>
                <div className={css.bold}>Хаяг</div>
                <input
                  onChange={e => setAddress(e.target.value)}
                  value={address}
                  className={css.inputform}
                />
              </div>
            </div>
            <div className={css.row}>
              <div>
                <div className={css.bold}>Категори</div>
                <select
                  onChange={e => setGroup(e.target.value)}
                  className={css.inputformSelect}
                  value={group}
                >
                  <option value='all'></option>
                  {SupplierGroup.map(e => (
                    <option value={e.id} style={{ padding: '0px' }} key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className={css.bold}>Захиалгын доод лимит</div>
                <input
                  onChange={e => setMinAmount(e.target.value)}
                  value={minAmount}
                  className={css.inputform}
                  type='number'
                />
              </div>
              <div>
                <div className={css.bold}>Мэйл хаяг</div>
                <input
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  className={css.inputform}
                />
              </div>
            </div>
            <div
              className={css.row}
              style={{
                justifyContent: 'flex-start',
                gap: '25px'
              }}
            >
              <div>
                <div className={css.bold}>Вебсайт</div>
                <input
                  onChange={e => setWebsite(e.target.value)}
                  value={website}
                  className={css.inputform}
                />
              </div>
              {index !== 'new' && (
                <div className={css.btnwrapper}>
                  <div className={css.bold}>
                    Ангилалаар захиалгын доод лимит
                  </div>
                  <button onClick={OpenHandler}>Оруулах</button>
                </div>
              )}

              <div>
                <div className={css.bold}>Түгээлтийн өдрүүд</div>
                <div style={{ display: 'flex' }}>
                  {dates.map((e, i) => (
                    <div key={e}>
                      <div style={{ marginLeft: '6px' }}>{e}</div>
                      <input
                        type='checkbox'
                        checked={deliveryDate?.includes(e)}
                        onChange={a => {
                          a.target.checked
                            ? setDeliveryDate([...deliveryDate, e])
                            : setDeliveryDate(
                                deliveryDate.filter(e => e !== i + 1)
                              );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={css.bold}>Байгууллагын тайлбар (заавал биш)</div>
            <input
              onChange={e => setDescription(e.target.value)}
              value={description}
              className={css.inputformLong}
            />
            <div
              className={css.btnwrapper}
              style={{
                marginBottom: '10px',
                display: index === 'new' ? 'none' : 'block'
              }}
            >
              <div className={css.bold}>Нэмэлт тохиргоо</div>

              <button
                onClick={() => {
                  setChannelSetup(true);
                }}
              >
                Тохиргоо
              </button>
            </div>
            <div className={css.row}>
              <div>
                <div className={css.bold}>
                  Лого
                  {media && <Media setLogo={setLogo} setMedia={setMedia} />}
                </div>

                <div style={{ width: '80px' }} onClick={() => setMedia(true)}>
                  <img
                    src={logo ? logo : 'https://ebazaar.mn/icon/photo-add.svg'}
                    alt='zurag'
                    className='product-image'
                  />
                </div>
              </div>
              <div className={css.bold}>
                Бараа буцаалт
                <div
                  onClick={() => {
                    setReturnProduct(returnProduct === 0 ? 1 : 0);
                  }}
                >
                  {returnProduct ? (
                    <img src='/media/on.svg' alt='zurag' />
                  ) : (
                    <img src='/media/off.svg' alt='zurag' />
                  )}
                </div>
              </div>
              {props.userData.company_id === '|1|' && 
                <div className={css.bold}>
                  Тооллого
                  <div onClick={handleClick}>
                    {returnToollogo ? (
                      <img src='/media/on.svg' alt='zurag' />
                    ) : (
                      <img src='/media/off.svg' alt='zurag' />
                    )}
                  </div>
                  {statusMessage && <p>{statusMessage}</p>} 
                </div>
              }
               <div className={css.bold}>
                Алкохол
                <div
                  onClick={() => {
                    setAlcohol(alcohol === 0 ? 1 : 0);
                  }}
                >
                  {alcohol ? (
                    <img src='/media/on.svg' alt='zurag' />
                  ) : (
                    <img src='/media/off.svg' alt='zurag' />
                  )}
                </div>
              </div>
              <div className={css.bold}>
                Идэвхи
                <div
                  onClick={() => {
                    setIsActive(isActive === 0 ? 1 : 0);
                  }}
                >
                  {isActive ? (
                    <img src='/media/on.svg' alt='zurag' />
                  ) : (
                    <img src='/media/off.svg' alt='zurag' />
                  )}
                </div>
              </div>
              <div className={css.bold}>
                SFA
                <div
                  onClick={() => {
                    setSfaActive(!sfaActive);
                  }}
                >
                  {sfaActive ? (
                    <img src='/media/on.svg' alt='zurag' />
                  ) : (
                    <img src='/media/off.svg' alt='zurag' />
                  )}
                </div>
              </div>
            </div>
            <div className={css.row}>
              <div className={css.bold}>
                СМС мэдэгдэл
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div
                    onClick={() => {
                      setSmsNotif(prev => !prev);
                    }}
                  >
                    {smsNotif ? (
                      <img src='/media/on.svg' alt='zurag' />
                    ) : (
                      <img src='/media/off.svg' alt='zurag' />
                    )}
                  </div>

                  <input
                    onChange={e => setSmsPhone(e.target.value)}
                    value={smsPhone}
                    className={css.inputform}
                    disabled={!smsNotif}
                    type='number'
                  />
                </div>
              </div>

              <div className={css.bold}>
                Мэйл мэдэгдэл
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div
                    onClick={() => {
                      setEmailNotif(prev => !prev);
                    }}
                  >
                    {emailNotif ? (
                      <img src='/media/on.svg' alt='zurag' />
                    ) : (
                      <img src='/media/off.svg' alt='zurag' />
                    )}
                  </div>

                  <input
                    onChange={e => setEmailNotifAddress(e.target.value)}
                    value={emailNotifAddress}
                    className={css.inputform}
                    disabled={!emailNotif}
                    type='email'
                  />
                </div>
              </div>

              <div className={css.bold}>
                Push Notification
                <div
                  onClick={() => {
                    setPushNotif(prev => !prev);
                  }}
                >
                  {pushNotif ? (
                    <img src='/media/on.svg' alt='zurag' />
                  ) : (
                    <img src='/media/off.svg' alt='zurag' />
                  )}
                </div>
              </div>
            </div>
            <div className={css.dateContainer}>
              <div className={css.bold}>Delivery Time Configuration</div>
              <div className={css.dateConfig}>
                <DaysToShow daysShow={daysShow} setDaysShow={setDaysShow} />
                <Delay delay={delay} setDelay={setDelay} />
                <Hours hours={hours} setHours={setHours} />
              </div>
            </div>
            <div className={css.bold}>Банкны мэдээлэл</div>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <td
                    style={{
                      width: '25%',
                      fontWeight: 'bold'
                    }}
                  >
                    Банкны нэр
                  </td>
                  <td style={{ width: '20%', fontWeight: 'bold' }}>
                    Дансны дугаар
                  </td>
                  <td style={{ width: '45%', fontWeight: 'bold' }}>
                    Дансны нэр
                  </td>
                  <td style={{ width: '10%', fontWeight: 'bold' }}></td>
                </tr>
              </thead>
              <tbody>
                {moreInfo?.bankaccount?.map((e, i) => (
                  <tr key={i}>
                    <td>
                      <img
                        src={
                          e.bank_logo ||
                          Banks.find(d => d.id === parseInt(e.bank))?.bank_logo
                        }
                        alt='bank'
                      />
                      {e.bank_name ||
                        Banks.find(d => d.id === parseInt(e.bank))?.bank_name}
                    </td>
                    <td>{e.account}</td>
                    <td>{e.holder}</td>
                    <td>
                      <img
                        src={DeleteIcon}
                        alt='delete'
                        style={{
                          marginLeft: '20px'
                        }}
                        onClick={() => {
                          let aa = moreInfo.bankaccount.filter(
                            a => a.account !== e.account
                          );
                          let bb = { ...moreInfo, bankaccount: [...aa] };
                          setMoreInfo(bb);
                          BankDelete(e);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <td
                    style={{
                      width: '100%',
                      color: '#78909C',
                      fontWeight: '700'
                    }}
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    Шинэ данс нэмэх
                  </td>
                </tr>
              </thead>
            </table>
            <div style={{ marginTop: '10px' }} className={css.bold}>
              Хэрэглэгчийн мэдээлэл
            </div>
            <div
              style={{ width: '100%', maxHeight: '200px', overflow: 'auto' }}
            >
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <td
                      style={{
                        width: '45%',
                        fontWeight: 'bold'
                      }}
                    >
                      Имэйл
                    </td>
                    <td style={{ width: '45%', fontWeight: 'bold' }}>
                      Утасны дугаар
                    </td>
                    <td style={{ width: '10%', fontWeight: 'bold' }}>Идэвхи</td>
                  </tr>
                </thead>
                <tbody>
                  {moreInfo?.backuser?.map((e, i) => (
                    <tr key={i}>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                      <td
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%'
                        }}
                      >
                        {e.isActive ? (
                          <img src='/media/on.svg' alt='zurag' />
                        ) : (
                          <img src='/media/off.svg' alt='zurag' />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '10px' }} className={css.bold}>
              Хар жагсаалт
            </div>

            <Select
              allowClear
              mode='multiple'
              placeholder='Регистрийн дугаараар хайх'
              style={{ width: '100%' }}
              value={blackList}
              options={merList}
              onChange={value => {
                setBlackList(value);
              }}
              onSearch={value => {
                setSearch(value);
              }}
            />
            <div style={{ marginTop: '10px' }} className={css.bold}>
              Цагаан жагсаалт ( хэрэв мерчант бүртгэвэл зөвхөн бүртгэгдсэн
              мерчантууд л захиалга хийх боломжтой болно)
            </div>
            <Select
              allowClear
              mode='multiple'
              placeholder='Регистрийн дугаараар хайх'
              style={{ width: '100%' }}
              value={whiteList}
              options={merList}
              onChange={value => {
                setWhiteList(value);
              }}
              onSearch={value => {
                setSearch(value);
              }}
            />

            <div className={css.bold} style={{ marginTop: '5px' }}>
              Supermarket
              <div className={css.btnwrapper}>
                <button
                  style={{ width: '150px' }}
                  onClick={() => {
                    setIsNewModal(!isNewModal);
                  }}
                >
                  Тохиргоо
                </button>
              </div>
            </div>
            {isNewModal ? (
              <NewModal
                width='fitContent'
                height='fitContent'
                padding='2'
                closeHandler={() => {
                  setIsNewModal(!isNewModal);
                }}
              >
                <div
                  style={{
                    margin: '5px 10px',
                    width: '1100px'
                  }}
                >
                  <div>
                    <div style={{ marginTop: '10px' }} className={css.bold}>
                      Merchant
                    </div>
                    {/* <Select
                      allowClear
                      mode="multiple"
                      placeholder="id дугаараар хайх"
                      style={{ width: "100%" }}
                      value={coMerchant}
                      options={merListId}
                      onChange={(value) => {
                        setCoMerchant(value);
                      }}
                      onSearch={(value) => {
                        setMerSearch(value);
                      }}
                    /> */}
                    <SelectMy
                      options={merListId}
                      value={coMerchant}
                      onChange={value => {
                        setCoMerchant(value);
                      }}
                      onSearch={value => {
                        setMerSearch(value);
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ marginTop: '10px' }} className={css.bold}>
                      Supplier
                    </div>
                    <SelectMy
                      allowClear
                      mode='multiple'
                      placeholder='Нийлүүлэгчийн id аар хайх'
                      style={{ width: '100%' }}
                      value={coSupplier}
                      options={supplierList}
                      onChange={value => {
                        setCoSupplier(value);
                      }}
                      onSearch={value => {
                        setSearch(value);
                      }}
                    />
                  </div>
                  <ProductList
                    merchantId={merchantId}
                    setMerchantId={setMerchantId}
                    coSupplier={coSupplier}
                    coMerchant={coMerchant}
                    merListId={merListId}
                    changedProducts={changedProducts}
                    setChangedProducts={setChangedProducts}
                    supplierId={moreInfo.id}
                  />
                  <div
                    className={css.btnwrapper}
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      width: '100%',
                      padding: '5px'
                    }}
                  >
                    <button onClick={postOresh} style={{ width: '150px' }}>
                      Хадгалах
                    </button>
                  </div>
                </div>
              </NewModal>
            ) : null}
            {permission.supplier.update && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '20px'
                }}
              >
                <span
                  className='btn'
                  onClick={index === 13884 ? ShuurhaiUpdate : save}
                >
                  Хадгалах
                </span>
              </div>
            )}
          </>
        )}
      </div>
      {openModal && (
        <Modal setOpenModal={setOpenModal} setBusPrice={setBusPrice} />
      )}
      {channelSetup && (
        <ChannelSetup
          setChannelSetup={setChannelSetup}
          setChosedChannel={setChosedChannel}
          supplierId={index}
          save={save}
        />
      )}
    </div>
  );
};

export default SupplierIndex;
