import React, { useState, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
const Ctx = React.createContext();

export const UserDataHook = props => {
  const [userInfo, setUserInfo] = useState('');
  const [passwordChangeShow, setPasswordChangeShow] = useState(false);
  const [sitedata, setSitedata] = useState([]);
  const [linesDetails, setLinesDetails] = useState(false);
  const [linesDetailsData, setLinesDetailsData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/api/site_data`,
        {
          method: 'GET',
          headers: myHeaders
        }
      );
      const dataOne = await data.json();

      setSitedata(dataOne);
    };
    try {
      fetchdata();
    } catch (error) {
      console.log('userHook sitedata', error);
    }
  }, []);

  return (
    <Ctx.Provider
      value={{
        userInfo,
        setUserInfo,
        passwordChangeShow,
        setPasswordChangeShow,
        sitedata,
        linesDetails,
        setLinesDetails,
        linesDetailsData,
        setLinesDetailsData,
        categories,
        setCategories
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
