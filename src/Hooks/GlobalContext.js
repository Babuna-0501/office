import { createContext, useState, useEffect } from 'react';
import ErrorPopup from '../components/common/ErrorPopup';
import myHeaders from '../components/MyHeader/myHeader';

// Services
import {
  getSiteData,
  getLoggedUser,
  getUserRoles,
  getSuppliers,
  getModules
} from '../services';

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [modules, setModules] = useState([]);
  const [emdProducts, setEmdProducts] = useState([]);
  const [globalDataReady, setGlobalDataReady] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  useEffect(() => {
    const getGlobalDatas = async () => {
      try {
        const [loggedUserRes, siteDataRes, roleRes, suppliersRes] =
          await Promise.all([
            getLoggedUser(),
            getSiteData(),
            getUserRoles(),
            getSuppliers()
          ]);

        const loggedUserData = await loggedUserRes.json();
        const siteData = await siteDataRes.json();
        const roleData = await roleRes.json();
        const suppliersData = await suppliersRes.json();

        setLoggedUser(loggedUserData.data);
        setLocations(siteData.location);
        setBrands(siteData.brands);
        setCategories(siteData.categories);
        setBusinessTypes(siteData.business_types);
        setUserRoles(roleData.roles);
        setSuppliers(suppliersData.data);
        // if (modulesData.message !== "success") {
        //   console.log("err", modulesData);
        //   window.localStorage.removeItem("ebazaar_admin_token");
        //   window.location.replace("/");
        // }
        setGlobalDataReady(true);
      } catch (error) {
        setErrorMsg('Алдаа гарлаа. Та дахин оролдоно уу!');
        setShowErrorMsg(true);
      }
    };

    const token = localStorage.getItem('ebazaar_admin_token');

    if (token) {
      getGlobalDatas();
    }
  }, []);

  const getSafeDecent = async ({ supplierId, merchantId = '' }) => {
    try {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const data = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/oresh?supplierId=${supplierId}&merchantId=${merchantId}`,
        requestOptions
      );
      const res = await data.json();
      return res;
    } catch (error) {
      console.log('users error ', error);
    }
  };

  const value = {
    loggedUser,
    setLoggedUser,
    locations,
    brands,
    categories,
    businessTypes,
    userRoles,
    globalDataReady,
    suppliers,
    modules,
    getSafeDecent,
    emdProducts,
    setEmdProducts
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}

      <ErrorPopup
        show={showErrorMsg}
        message={errorMsg}
        closeHandler={() => {
          setShowErrorMsg(false);
          window.location.reload();
        }}
      />
    </GlobalContext.Provider>
  );
};
