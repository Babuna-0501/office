import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const VatHook = (props) => {
  const [aimagList, setAimagList] = useState([]);
  const [aimagFalse, setAimagFalse] = useState([]);
  const [tradeshopList, setTradeshopList] = useState([]);
  const [mainfalse, setMainfalse] = useState([]);
  const [busChannel, setBusChannel] = useState([]);
  const [channelids, setChannelids] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ]);
  const [zonesInfo, setZonesInfo] = useState([]);
  const [soumsdata, setSoumsdata] = useState([]);
  const [maindatafalse, setMaindatafalse] = useState([false, false]);
  const [chosedList, setChosedList] = useState([]);

  const [location, setLocation] = useState([]);

  useEffect(() => {
    let aa = location;
    aimagList.map((item) => {
      aa.map((x) => {
        if (x.location_id === item.location_id) {
          x.checked = item.checked;
        }
      });
    });
    setLocation(aa);
  }, [aimagList]);

  useEffect(() => {
    let aa = location;
    soumsdata.map((item) => {
      aa.map((x) => {
        if (x.location_id === item.location_id) {
          x.checked = item.checked;
        }
      });
    });
    setLocation(aa);
  }, [soumsdata]);
  // console.log("location", location);
  return (
    <Ctx.Provider
      value={{
        tradeshopList,
        setTradeshopList,
        aimagList,
        setAimagList,
        aimagFalse,
        setAimagFalse,
        mainfalse,
        setMainfalse,
        busChannel,
        setBusChannel,
        channelids,
        setChannelids,
        setZonesInfo,
        zonesInfo,
        maindatafalse,
        setMaindatafalse,
        soumsdata,
        setSoumsdata,
        chosedList,
        setChosedList,
        location,
        setLocation,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
