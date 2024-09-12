import React, { useState, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
const Ctx = React.createContext();

export const ZonesHook = props => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [coords, setCoords] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateID, setUpdateID] = useState('');
  const [zonedata, setZonedata] = useState([]);
  const [searchzone, setSearchzone] = useState(null);
  const [newPolicy, setNewPolicy] = useState(false);
  const [merchantDatas, setMerchantDatas] = useState([]);
  // console.log("searchzone", searchzone);
  const FeatchZones = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/zones`;
    // url = searchzone ? url + `?name=${searchzone}` : url;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        setZonedata(res.data);
      })
      .catch(error => {
        console.log('error zone ', error);
      });
  };
  useEffect(() => {
    FeatchZones();
  }, []);

  return (
    <Ctx.Provider
      value={{
        modal,
        setModal,
        updateModal,
        setUpdateModal,
        coords,
        setCoords,
        updateID,
        setUpdateID,
        data,
        setData,
        zonedata,
        searchzone,
        setSearchzone,
        newPolicy,
        setNewPolicy,
        merchantDatas,
        setMerchantDatas
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
