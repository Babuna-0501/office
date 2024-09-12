import React, { useState, useEffect, useContext } from 'react';
import css from './merchantrequest.module.css';
import { Button } from '../common';
import Tailan from './Tailan';
import Background from '../Background/Background';
import myHeaders from '../MyHeader/myHeader';
import ProductReportHook from '../../Hooks/ProductsReportHook';

let csv = [
  [
    'RequestID',
    'UserID',
    'TradeshopID',
    'Нийлүүлэгч',
    'isActive',
    'CreatedDate',
    'TradeshopName',
    'BusinessType',
    'Address1',
    'Phone',
    'RegisterNo'
  ]
];
const MerchantRequest = props => {
  const [reportOk, setReportOk] = useState(false);
  const [firstOk, setFirstOk] = useState(false);

  let [blah, setBlah] = useState(csv);
  const productctx = useContext(ProductReportHook);
  // console.log("productctx", productctx.sitedata.business_types);

  const reportHandler = () => {
    setFirstOk(true);
  };
  const reportCloseHandler = () => {
    setFirstOk(false);
    setReportOk(false);
  };

  useEffect(() => {
    if (firstOk) {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/tradeshop/requests?page=all`,

        requestOptions
      )
        .then(res => res.json())
        .then(res => {
          // console.log("res", res);
          if (res.code === 200) {
            res.result.map(data => {
              let suppliername = data.SupplierID;
              suppliername = props.data.suppliers.filter(
                item => item.id === suppliername
              );
              let aa;
              if (data.CreatedDate !== null) {
                aa = data.CreatedDate.toString().substring(0, 19);
                aa =
                  aa.split('T')[0].toString() +
                  ' ' +
                  aa.split('T')[1].toString();
              }
              let bustype = 'Байхгүй';
              if (data.BusinessTypeID !== null) {
                bustype =
                  productctx?.sitedata?.business_types[`${data.BusinessTypeID}`]
                    ?.business_type_name;
              }

              let temp = [
                data.RequestID,
                data.UserID,
                data.TradeshopID,
                suppliername[0].name,
                data.isActive,
                data.CreatedDate ? aa : '',
                data.TradeshopName,
                bustype,
                data.Address1,
                data.Phone,
                data.RegisterNo
              ];
              csv.push(temp);
            });
            setReportOk(true);
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, [firstOk]);

  return (
    <div className={css.container}>
      <Button variant='primary' size='medium' onClick={reportHandler}>
        Тайлан
      </Button>

      {reportOk && (
        <Background className={css.background}>
          <Tailan
            onClick={reportCloseHandler}
            name='Харилцагчийн хүсэлтийн тайлан'
            data={csv}
          />
        </Background>
      )}
    </div>
  );
};

export default MerchantRequest;
