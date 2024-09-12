import React, { useState, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';

const Ctx = React.createContext();

export const MerchantReportStore = props => {
  const [exportReport, setExportReport] = useState(false);
  const [importData, setImportData] = useState(false);
  const [permissionData, setPermissionData] = useState(null);
  const [newMerchant, setNewMerchant] = useState(false);
  const [allMerchantRequest, setAllMerchantRequest] = useState([]);
  const [newSup, setNewSup] = useState(false);
  const [NewImportData, setNewImportData] = useState([]);
  const [merRegister, setMerRegister] = useState([]);
  const [RowsImport, setRowsImport] = useState([]);

  // useEffect(() => {
  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };
  //   fetch(`${process.env.REACT_APP_API_URL2}/api/merchants?register=`, requestOptions)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       // console.log("merchantRegister", res);
  //       setMerRegister(res.data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // }, []);

  // console.log("newMerchant", newMerchant);

  return (
    <Ctx.Provider
      value={{
        exportReport,
        setExportReport,
        permissionData,
        setPermissionData,
        importData,
        setImportData,
        newMerchant,
        setNewMerchant,
        allMerchantRequest,
        setAllMerchantRequest,
        newSup,
        setNewSup,
        NewImportData,
        setNewImportData,
        merRegister,
        setMerRegister,
        RowsImport,
        setRowsImport
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
