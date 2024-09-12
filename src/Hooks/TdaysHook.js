import React, { useState, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';

const Ctx = React.createContext();

export const TdaysHook = props => {
  const [newDays, setNewDays] = useState(false);
  const [zoneID, setZoneID] = useState(null);
  const [channelID, setChannelID] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30
  ]);

  // console.log("channelID", channelID);

  const [supplierID, setSupplierID] = useState(null);
  const [days, setDays] = useState(null);
  const [title, setTitle] = useState('');
  const [updateProduct, setUpdateProduct] = useState(null);
  const [supId, setSupId] = useState(null);
  const [channel, setChannel] = useState([]);
  const [list, setList] = useState([
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
  ]);
  const [zonelist, setZonelist] = useState([]);
  const [zonedata, setZonedata] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState('10:00');
  const [allChosedDays, setAllChosedDays] = useState([]);
  useEffect(() => {
    let data = [];
    list.map((item, index) => {
      if (item) {
        data.push(index + 1);
      }
    });
    setChannelID(data);
  }, [list]);

  useEffect(() => {
    const FeatchZones = () => {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
      let controller = new AbortController();
      let url = `${process.env.REACT_APP_API_URL2}/api/zones`;
      // url = searchzone ? url + `?name=${searchzone}` : url;
      fetch(url, requestOptions)
        .then(r => r.json())
        .then(res => {
          setZonedata(res.data);
        })
        .then(r => {
          // console.log("ajillasan");
          let aa = new Array(zonedata.length).fill(true);
          // console.log("aa zone data", aa);
          setZonelist(aa);
          controller = null;
        })
        .catch(error => {
          console.log('error zone ', error);
        });
      return () => controller?.abort();
    };

    FeatchZones();
  }, []);

  return (
    <Ctx.Provider
      value={{
        newDays,
        setNewDays,
        zoneID,
        setZoneID,
        channelID,
        setChannelID,
        supplierID,
        setSupplierID,
        days,
        setDays,
        title,
        setTitle,
        updateProduct,
        setUpdateProduct,
        supId,
        setSupId,
        channel,
        setChannel,
        list,
        setList,
        zonedata,
        deliveryTime,
        setDeliveryTime,
        allChosedDays,
        setAllChosedDays
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
