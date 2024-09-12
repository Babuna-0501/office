import { useState, useContext, useEffect } from 'react';
import FormInputs from './FormInputs';
import myHeaders from '../components/MyHeader/myHeader';

const Form = props => {
  const save = (
    customerType,
    name,
    register,
    businessType,
    phoneNumber,
    city,
    district,
    khoroo,
    address
  ) => {
    const customer = {
      register: register,
      customer_name: name,
      supplier_id: props.supplierId,
      tradeshops: [
        {
          name: name,
          channel: businessType,
          phone: phoneNumber,
          owner: name,
          address: {
            city: parseInt(city),
            district: parseInt(district),
            khoroo: parseInt(khoroo),
            detail: address,
            coordinate: [47.9221, 106.9155]
          },
          image: '',
          approved: true
        }
      ]
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(customer),
      redirect: 'follow'
    };
    const url = `${process.env.REACT_APP_API_URL2}/api/merchant/creat/new`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        if (response.code === 200) {
          props.fetchData();
          props.setCustomer(false);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const update = (
    customerType,
    name,
    register,
    businessTypes,
    phoneNumber,
    city,
    district,
    khoroo,
    address
  ) => {
    console.log('updating');
  };
  return (
    <FormInputs
      setCustomer={props.setCustomer}
      save={save}
      update={update}
      customer={props.customer}
    />
  );
};

export default Form;

/*
{
"register": register,
"customer_name": merchantName,
"supplier_id": supplierId,
"tradeshops": [
{
"name": storeName,
"channel": selectedChannel,
"phone": storePhone,
"owner": selectedOwnerId,
"address": {
"city": selectedAimagId.toString(),
"district": selectedSumID.toString(),
"khoroo": selectedKhorooID.toString(),
"detail": address,
"coordinate": (mapLat != 0 && mapLong != 0) ? [mapLong, mapLat] : [longitude, latitude]
},
"image": imgs,
"approved": context.read<UserProvider>().supplierId == 14005 ? false : true
}
]
}
*/
