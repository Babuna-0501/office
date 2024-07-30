import React, { useState, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
const Ctx = React.createContext();

export const BackOfficeHook = props => {
  const [suppliers, setSuppliers] = useState([]);
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const [newBanner, setNewBanner] = useState([]);
  const [mobileBanner, setMobileBanner] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const data = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
        requestOptions
      );
      const res = await data.json();

      setSuppliers(res.data);
    };
    try {
      fetchdata();
    } catch (error) {
      console.log('suppliers error ', error);
    }
  }, []);

  return (
    <Ctx.Provider
      value={{
        suppliers,
        data,
        setData,
        channels,
        setChannels,
        newBanner,
        setNewBanner,
        mobileBanner,
        setMobileBanner
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
