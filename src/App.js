import React, { useState, useEffect, useContext, Suspense } from 'react';
import Header from './Header';
import myHeaders from './components/MyHeader/myHeader';
import Navigation from './Navigation';
import UserDataHook from './Hooks/userHook';
import 'antd/dist/antd.css';
import './App.css';
import ShuurhaiJSON from './Shuurhai.json';

import AppHook from './Hooks/AppHook';
import Route from './components/Routing/Route';
import Protected from './components/Routing/Protected';
import { LoadingSpinner } from './components/common';
import AccountIndex from './Merchants/Accounts/AccountIndex';
import ShuurkhaiTugeelt from './modules/ShuurkhaiTugeelt/index';
import SfaTailan from './Sfa_tailan/Sfa_tailan';
// import DashboardOld from "./modules/Dashboard/DashboardOld";

const ShuurkhaiProducts = React.lazy(() => import('./ShuurhaiTugeelt/Index'));
const WarehouseNew = React.lazy(() => import('./WarehouseNew/index'));
const PayRec = React.lazy(() => import('./PayRec/index'));
const Zahialga = React.lazy(() => import('./Orders/index'));
const Sales = React.lazy(() => import('./Sales/index'));
const Oresh = React.lazy(() => import('./modules/oresh/index'));
const Products = React.lazy(() => import('./Products/Index'));
const ProductsNew = React.lazy(() => import('./ProductsNew/Index'));
const Merchants = React.lazy(() => import('./Merchants/Index'));
const MerchantsID = React.lazy(() =>
  import('./Merchants/newMerchants/MerchantIndex')
);
const Order = React.lazy(() => import('./Order/Index'));
const Order2 = React.lazy(() => import('./OrderV2/Index'));
const Order3 = React.lazy(() => import('./OrderSuper/Index'));
const NewOrder = React.lazy(() => import('./modules/Orders/Index'));
const SMS = React.lazy(() => import('./SMS/Index'));
const UPoint = React.lazy(() => import('./UPoint/Index'));
const Returns = React.lazy(() => import('./Return/Index'));

const Customer = React.lazy(() => import('./Customer/Index'));

const SupplierIndex = React.lazy(() => import('./Supplier/SupplierIndex'));
const Login = React.lazy(() => import('./modules/Login/index'));
const Discount = React.lazy(() => import('./DiscountV2/Index'));
const Pickpack = React.lazy(() => import('./Pickpack/Index'));
const NewAnalyticLog = React.lazy(() => import('./modules/AnalyticLog/Index'));
const Index = React.lazy(() => import('./Zones/Index'));
const Indexmain = React.lazy(() => import('./Tdays/Indexmain'));
const UserAccessControl = React.lazy(() =>
  import('./UserAccessControl/UserAccessControl')
);
const NewUserAccessControl = React.lazy(() =>
  import('./modules/UserAccessControl/Index')
);
const UserPage = React.lazy(() =>
  import('./modules/UserAccessControl/UserPage')
);
const Warehouse = React.lazy(() => import('./Warehouse/Warehouse'));
const Warehouse2 = React.lazy(() => import('./Warehouse/Warehouse2'));
const SpecialPermit = React.lazy(() => import('./SpecialPermit/SpecialPermit'));
const Collection = React.lazy(() => import('./Collection/Collection'));
const Sugalaa = React.lazy(() => import('./Wheel/Wheel'));
const Banner = React.lazy(() => import('./Banner/Banner'));
const HighLight = React.lazy(() => import('./HighLight/HighLight'));
const Holiday = React.lazy(() => import('./Holiday/Holiday'));
const PaymentTerm = React.lazy(() => import('./PaymentTerm/PaymentTerm'));
const Dashboard = React.lazy(() => import('./modules/Dashboard/Dashboard'));
const LendIndex = React.lazy(() => import('./Lend/LendIndex'));
const Indextailan = React.lazy(() => import('./Tailan/Indextailan'));
const VAT = React.lazy(() => import('./VAT/VatIndex'));
const NOAT = React.lazy(() => import('./NOAT/NoatIndex'));
const OrderIntegration = React.lazy(() =>
  import('./Order_Integrations/OrderIntegrations')
);
const XTmarshrut = React.lazy(() => import('./XT/XT'));
const OrderReturn = React.lazy(() => import('./Order_return/OrderReturnIndex'));
const BUramshuulal = React.lazy(() =>
  import('./BorluulaltiinUramshuulal/BUindex')
);
const PromoIndex = React.lazy(() => import('./Promo/PromoIndex'));
const AchiltiinZahialga = React.lazy(() =>
  import('./Achiltiinzahialga/Shipment')
);
const AchiltiinZahialgaCopy = React.lazy(() =>
  import('./Achiltiinzahialga copy/Shipment')
);
const PowerIndex = React.lazy(() => import('./modules/PBI/Index'));
const Target = React.lazy(() => import('./modules/Target/Index'));
const SingleTarget = React.lazy(() => import('./modules/Target/SingleTarget'));
const UserTargets = React.lazy(() =>
  import('./modules/Target/userTargets/userTargets')
);
const HighLightSuppliers = React.lazy(() =>
  import('./HighLightSuppliers/HighLightSuppliers')
);

const orderHideCompanyIds = [
  '|13987|',
  '|14006|',
  '|13992|',
  '|13991|',
  '|13994|',
  '|13965|',
  '|13995|',
  '|4805|',
  '|10683|',
  '|1232|',
  '|13990|',
  '|13996|',
  '|13993|',
  '|13997|',
  '|13998|',
  '|14000|',
  '|13999|'
];

function App() {
  const [data, setData] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [userData, setUserData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [locations, setLocations] = useState(null);
  const [businessType, setBusinesstype] = useState(null);
  const [brands, setBrands] = useState(null);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [sfaSupp, setSfaSupp] = useState(false);

  const [permission, setPermission] = useState(null);

  const userCtx = useContext(UserDataHook);
  const appctx = useContext(AppHook);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('ebazaar_admin_token');

    if (!token && window.location.pathname !== '/login') {
      window.location.replace('/login');
    }

    if (token) {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/site_data`)
      .then(r => r.json())
      .then(response => {
        fetch(`${process.env.REACT_APP_API_URL2}/api/suppliers/get`, {
          method: 'GET',
          headers: myHeaders
        })
          .then(r2 => r2.json())
          .then(response2 => {
            //
            if (localStorage.getItem('ebazaar_admin_token')) {
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
              fetch(
                `${process.env.REACT_APP_API_URL2}/api/data`,
                requestOptions
              )
                .then(r3 => r3.json())
                .then(response3 => {
                  // console.log("response3", response3);
                  userCtx?.setUserInfo(response3);
                  userCtx?.setCategories(response.categories);
                  setUserData(response3.data);
                  setSuppliers(response2.data);
                  setData(response.data);
                  setCategories(response.categories);
                  setLocations(response.location);
                  setBusinesstype(response.business_types);
                  setBrands(response.brands);
                  appctx.setUserData(response3.data);
                  appctx.setSuppliers(response2.data);
                });

              fetch(
                `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
                requestOptions
              )
                .then(r4 => r4.json())
                .then(response4 => {
                  setCurrentSupplier(response4.data);
                })
                .catch(err => console.log(err));
            }
            //
          });
      })
      .catch(error => console.log('error', error));
  }, [isAuth]);

  useEffect(() => {
    if (userData) {
      setPermission(Object.values(JSON.parse(userData.permission))[0]);
    }

    if (currentSupplier) {
      const available = JSON.parse(currentSupplier[0].available);
      if (available?.sfa === true) {
        setSfaSupp(true);
      }
    }
  }, [userData, currentSupplier]);

  const route = (page, params = null) => {
    let url = '/';
    if (appctx.page[0] !== 'home') {
      appctx.page.map(u => {
        url = url + `${u}/`;
      });
    }
    //window.history.pushState(null, null, url)
    appctx.setPage([page[0]]);
  };
  let [supplier, setSupplier] = useState(0);
  const setSup = supplierId => {
    setSupplier(supplierId);
    appctx.setSupplier(supplierId);
  };
  const app = {
    fn: {
      route: route,
      setSupplier: setSup
    }
  };

  if (process.env.NODE_ENV === 'production')
    console.log = function no_console() {};

  if (!isAuth) {
    return (
      <Suspense
        fallback={
          <div id='loadingSpinner'>
            <LoadingSpinner />
          </div>
        }
      >
        <Route path='/login'>
          <Login />
        </Route>
      </Suspense>
    );
  }

  return (
    <>
      {data && suppliers && (
        <div id='app'>
          <Header
            app={app}
            supplier={supplier}
            suppliers={suppliers}
            page={appctx.page[0]}
            setPage={appctx.setPage}
            subPage={appctx.subPage}
            setSubPage={appctx.setSubPage}
            userData={userData}
            module={module}
            setSelectedWareHouse={appctx.setSelectedWareHouse}
          />
          <Navigation
            app={app}
            module={appctx.page[0]}
            userData={userData}
            sfaSupp={sfaSupp}
          />
          <Suspense
            fallback={
              <div id='loadingSpinner'>
                <LoadingSpinner />
              </div>
            }
          >
            <div id='contents'>
              <Route path='/'>
                <Dashboard
                  userData={userData}
                  brands={brands}
                  categories={categories}
                />
              </Route>
              <Route path='/sfa_tailan'>
                <SfaTailan
                  userData={userData}
                  brands={brands}
                  categories={categories}
                />
              </Route>

              <Route path='/orders'>
                <Protected
                  permission={
                    permission?.order.read &&
                    !orderHideCompanyIds.includes(userData.company_id)
                  }
                >
                  <Order
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/orderstwo'>
                <Protected
                  permission={
                    permission?.order.read &&
                    !orderHideCompanyIds.includes(userData.company_id)
                  }
                >
                  <Order2
                    supplier={supplier}
                    currentSupplier={currentSupplier}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/ordersuper'>
                <Protected
                  permission={
                    permission?.order.read &&
                    !orderHideCompanyIds.includes(userData.company_id)
                  }
                >
                  <Order3
                    supplier={supplier}
                    currentSupplier={currentSupplier}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/newOrders'>
                <Protected permission={userData.id === 994}>
                  <NewOrder suppliers={suppliers} userData={userData} />
                </Protected>
              </Route>

              <Route path='/orderreturn'>
                <Protected permission={permission?.orderreturn?.read}>
                  <OrderReturn
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/suppliers'>
                <Protected permission={permission?.supplier?.read}>
                  <SupplierIndex userData={userData} />
                </Protected>
              </Route>

              <Route path='/merchants'>
                <Protected
                  permission={
                    userData.company_id === '|14014|' ||
                    userData.company_id === '|948|' ||
                    userData.company_id === '|14061|' ||
                    userData.company_id === '|14005|' ||
                    (!(
                      userData.company_id === '|14014|' ||
                      userData.company_id === '|948|' ||
                      userData.company_id === '|14061|' ||
                      userData.company_id === '|14005|'
                    ) &&
                      (userData.company_id === '|1|' ||
                        permission?.merchant?.read))
                  }
                >
                  <Merchants
                    data={data}
                    locations={locations}
                    businessType={businessType}
                    userData={userData}
                    suppliers={suppliers}
                  />
                </Protected>
              </Route>

              <Route path='/merchantsID'>
                <Protected
                  permission={
                    userData.company_id === '|14014|' ||
                    userData.company_id === '|948|' ||
                    userData.company_id === '|14061|' ||
                    (!(
                      userData.company_id === '|14014|' ||
                      userData.company_id === '|948|' ||
                      userData.company_id === '|14061|'
                    ) &&
                      (userData.company_id === '|1|' ||
                        permission?.merchant?.read))
                  }
                >
                  <MerchantsID
                    data={data}
                    locations={locations}
                    businessType={businessType}
                    userData={userData}
                    suppliers={suppliers}
                  />
                </Protected>
              </Route>

              <Route path='/accounts'>
                <Protected
                  permission={
                    userData.company_id === '|14014|' ||
                    userData.company_id === '|948|' ||
                    userData.company_id === '|14061|' ||
                    userData.company_id === '|14005|' ||
                    (!(
                      userData.company_id === '|14014|' ||
                      userData.company_id === '|948|' ||
                      userData.company_id === '|14061|' ||
                      userData.company_id === '|14005|'
                    ) &&
                      (userData.company_id === '|1|' ||
                        permission?.merchant?.read))
                  }
                >
                  <AccountIndex
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    suppliers={suppliers}
                  />
                </Protected>
              </Route>

              <Route path='/return'>
                <Protected permission={permission?.return?.read}>
                  {/* <Returns /> */}
                  <Order
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/products'>
                <Protected
                  permission={
                    permission?.product?.read &&
                    userData.company_id !== '|13954|'
                  }
                >
                  <Products
                    supplier={supplier}
                    suppliers={suppliers}
                    brands={brands}
                    key={Math.random()}
                    userData={userData}
                    categories={categories}
                    app={app}
                    setPage={appctx.setPage}
                  />
                </Protected>
              </Route>

              <Route path='/buteegdekhuun'>
                <ProductsNew
                  supplier={supplier}
                  suppliers={suppliers}
                  brands={brands}
                  key={Math.random()}
                  userData={userData}
                  categories={categories}
                  app={app}
                  setPage={appctx.setPage}
                />
              </Route>

              <Route path='/sms'>
                <Protected
                  permission={
                    userData.company_id === '|1|' &&
                    permission?.sms &&
                    permission?.sms?.read
                  }
                >
                  <SMS />
                </Protected>
              </Route>

              <Route path='/upoint'>
                <Protected
                  permission={
                    userData.company_id === '|1|' && permission?.upoint?.read
                  }
                >
                  <UPoint userData={userData} />
                </Protected>
              </Route>

              <Route path='/discount'>
                <Protected permission={permission?.discount?.read}>
                  <Discount />
                </Protected>
              </Route>

              <Route path='/pickpack'>
                <Protected
                  permission={
                    userData.company_id === '|1|' && permission?.pickpack?.read
                  }
                >
                  <Pickpack />
                </Protected>
              </Route>

              <Route path='/borluulalt'>
                <Protected
                  permission={
                    userData.company_id === '|1|' ||
                    permission?.borluulalt?.read
                  }
                >
                  <div>Удахгүй...</div>
                </Protected>
              </Route>

              <Route path='/shuurhai'>
                <Protected
                  permission={ShuurhaiJSON.includes(userData.company_id)}
                >
                  <Order
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/zones'>
                <Protected permission={permission?.zones?.read}>
                  <Index
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                  />
                </Protected>
              </Route>

              <Route path='/analytic'>
                <Protected
                  permission={
                    userData.company_id === '|1|' && permission?.log?.read
                  }
                >
                  <NewAnalyticLog />
                </Protected>
              </Route>

              <Route path='/tdays'>
                <Protected permission={permission?.delivery?.read}>
                  <Indexmain
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                  />
                </Protected>
              </Route>

              <Route path='/userAccessControl'>
                <Protected permission={permission?.account?.read}>
                  <UserAccessControl
                    userData={userData}
                    suppliers={suppliers}
                    sfaSupp={sfaSupp}
                  />
                </Protected>
              </Route>

              <Route path='/newUser'>
                <Protected permission={userData.id === 994}>
                  <NewUserAccessControl />
                </Protected>
              </Route>

              <Route path='/newUser/add'>
                <Protected permission={userData.id === 994}>
                  <UserPage />
                </Protected>
              </Route>

              <Route path='/newUser/:id'>
                <Protected permission={userData.id === 994}>
                  <UserPage />
                </Protected>
              </Route>

              <Route path='/warehouse'>
                <Protected permission={permission?.inventory?.read}>
                  <Warehouse
                    categories={categories}
                    userData={userData}
                    setSubPage={appctx.setSubPage}
                    setSelectedWareHouse={appctx.setSelectedWareHouse}
                    subPage={appctx.subPage}
                  />
                </Protected>
              </Route>

              {/* warehouse TEST */}
              <Route path='/ware-house'>
                <Protected permission={permission?.inventory?.read}>
                  <Warehouse2
                    categories={categories}
                    userData={userData}
                    setSubPage={appctx.setSubPage}
                    setSelectedWareHouse={appctx.setSelectedWareHouse}
                    subPage={appctx.subPage}
                  />
                </Protected>
              </Route>

              <Route path='/aguulakh'>
                <Protected permission={permission?.inventory?.read}>
                  <WarehouseNew
                    categories={categories}
                    userData={userData}
                    setSubPage={appctx.setSubPage}
                    setSelectedWareHouse={appctx.setSelectedWareHouse}
                    subPage={appctx.subPage}
                  />
                </Protected>
              </Route>

              <Route path='/payrec'>
                <Protected permission={permission?.order?.read}>
                  <PayRec
                    categories={categories}
                    userData={userData}
                    setSubPage={appctx.setSubPage}
                    setSelectedWareHouse={appctx.setSelectedWareHouse}
                    subPage={appctx.subPage}
                  />
                </Protected>
              </Route>

              <Route path='/zahialga'>
                <Protected permission={permission?.order?.read}>
                  <Zahialga
                    categories={categories}
                    userData={userData}
                    setSubPage={appctx.setSubPage}
                    setSelectedWareHouse={appctx.setSelectedWareHouse}
                    subPage={appctx.subPage}
                  />
                </Protected>
              </Route>

              <Route path='/sales'>
                <Protected permission={permission?.order?.read}>
                  <Sales
                    categories={categories}
                    userData={userData}
                    setSubPage={appctx.setSubPage}
                    setSelectedWareHouse={appctx.setSelectedWareHouse}
                    subPage={appctx.subPage}
                  />
                </Protected>
              </Route>

              <Route path='/customer'>
                <Protected permission={permission?.order?.read}>
                  <Customer />
                </Protected>
              </Route>

              <Route path='/collected'>
                <Protected
                  permission={
                    userData.company_id === '|1|' &&
                    permission?.collection?.read
                  }
                >
                  <Collection userData={userData} suppliers={suppliers} />
                </Protected>
              </Route>

              <Route path='/specialPermit'>
                <Protected
                  permission={
                    userData.company_id === '|1|' &&
                    permission?.tradeshopfiles?.read
                  }
                >
                  <SpecialPermit userData={userData} suppliers={suppliers} />
                </Protected>
              </Route>

              <Route path='/wheel'>
                <Protected permission={userData.company_id === '|1|'}>
                  <Sugalaa />
                </Protected>
              </Route>

              <Route path='/banner'>
                <Protected permission={userData.company_id === '|1|'}>
                  <Banner suppliers={suppliers} brands={brands} />
                </Protected>
              </Route>

              <Route path='/highLight'>
                <Protected permission={userData.company_id === '|1|'}>
                  <HighLight businessType={businessType} />
                </Protected>
              </Route>
              <Route path='/hightlight-suppliers'>
                <Protected permission={userData.company_id === '|1|'}>
                  <HighLightSuppliers businessType={businessType} />
                </Protected>
              </Route>

              <Route path='/holiday'>
                <Protected permission={userData.company_id === '|1|'}>
                  <Holiday />
                </Protected>
              </Route>

              <Route path='/target'>
                <Protected permission={permission?.tradeshopfiles?.read}>
                  <Target />
                </Protected>
              </Route>

              <Route path='/target/:id'>
                <Protected permission={permission?.tradeshopfiles?.read}>
                  <SingleTarget />
                </Protected>
              </Route>

              <Route path='/userTargets/:id'>
                <Protected permission={permission?.tradeshopfiles?.read}>
                  <UserTargets />
                </Protected>
              </Route>

              <Route path='/paymentTerm'>
                <PaymentTerm />
              </Route>

              <Route path='/lend'>
                <Protected permission={permission?.lend?.read}>
                  <LendIndex
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/promo'>
                <Protected permission={[351, 994].includes(userData.id)}>
                  <PromoIndex
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/report'>
                <Protected permission={permission?.report?.read}>
                  <Indextailan
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/vat'>
                <Protected
                  permission={
                    userData.id === 351 ||
                    userData.id === 980 ||
                    userData.id === 994
                  }
                >
                  <VAT
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/shuurkhai'>
                <Protected permission={userData.company_id === '|1|'}>
                  <ShuurkhaiTugeelt userData={userData}>
                    <ShuurkhaiProducts
                      categories={categories}
                      userData={userData}
                      setSubPage={appctx.setSubPage}
                      setSelectedWareHouse={appctx.setSelectedWareHouse}
                      subPage={appctx.subPage}
                    />
                  </ShuurkhaiTugeelt>
                </Protected>
              </Route>

              <Route path='/oresh'>
                <Protected
                  permission={
                    userData.id === 1071 ||
                    userData.company_id.includes('14057') ||
                    userData.company_id.includes('14181') ||
                    userData.company_id.includes('14142')
                  }
                >
                  <Oresh>
                    <Products
                      supplier={supplier}
                      suppliers={suppliers}
                      brands={brands}
                      key={Math.random()}
                      userData={userData}
                      categories={categories}
                      app={app}
                      setPage={appctx.setPage}
                    />
                  </Oresh>
                </Protected>
              </Route>

              <Route path='/noat'>
                <Protected permission={permission?.noat?.read}>
                  <NOAT
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/orderIntegration'>
                <Protected permission={[351, 256, 994].includes(userData.id)}>
                  <OrderIntegration
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/xtmar'>
                <Protected permission={permission?.xtmar?.read}>
                  <XTmarshrut
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                  />
                </Protected>
              </Route>

              <Route path='/borluulaltiinuramshuulal'>
                <Protected
                  permission={permission?.borluulaltiinuramshuulal?.read}
                >
                  <BUramshuulal
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                    categories={categories}
                  />
                </Protected>
              </Route>

              <Route path='/ship-ment'>
                <Protected permission={permission?.shipment?.read}>
                  <AchiltiinZahialga
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                    categories={categories}
                  />
                </Protected>
              </Route>

              <Route path='/shipment'>
                <Protected permission={permission?.shipment?.read}>
                  <AchiltiinZahialgaCopy
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                    categories={categories}
                  />
                </Protected>
              </Route>

              <Route path='/pbi'>
                <Protected permission={permission?.pbi?.read}>
                  <PowerIndex
                    supplier={supplier}
                    suppliers={suppliers}
                    userData={userData}
                    locations={locations}
                    businessType={businessType}
                    appctx={appctx}
                    categories={categories}
                  />
                </Protected>
              </Route>
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
}

export default App;
