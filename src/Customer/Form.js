import {useState, useContext, useEffect} from 'react'
import FormInputs from './FormInputs'
import myHeaders from '../components/MyHeader/myHeader'

const Form = (props) => {
    const save = (customerType, name, register, businessType, phoneNumber, city, district, khoroo, address) => {
        const customer = {
            "register": register,
            "customer_name": name,
            "supplier_id": props.supplierId,
            "tradeshops": [
            {
                "name": name,
                "channel": businessType,
                "phone": phoneNumber,
                "owner": name,
                "address": {
                    "city": parseInt(city),
                    "district": parseInt(district),
                    "khoroo": parseInt(khoroo),
                    "detail": address,
                    "coordinate": [47.9221, 106.9155]
                },
                "image": '',
                "approved": true
            }
            ]
        }
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(customer),
            redirect: "follow",
        }
        const url = `https://api2.ebazaar.mn/api/merchant/creat/new`
        fetch(url, requestOptions)
        .then((r) => r.json())
        .then((response) => {
            if(response.code === 200) {
                props.fetchData()
                props.setCustomer(false)
            }
        })
        .catch((error) => {
            console.log("error", error);
        })
    }
    const update = (customerType, name, register, businessType, phoneNumber, city, district, khoroo, address) => {
        console.log('updating')
        const customer = {
            "register": register,
            "customer_name": name,
            "supplier_id": props.supplierId,
            "tradeshops": [
                {
                    "name": name,
                    "channel": businessType,
                    "phone": phoneNumber,
                    "owner": name,
                    "address": {
                        "city": parseInt(city),
                        "district": parseInt(district),
                        "khoroo": parseInt(khoroo),
                        "detail": address,
                        "coordinate": [47.9221, 106.9155]
                    },
                    "image": '',
                    "approved": true
                }
            ]
        }
        console.log(customer)
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(customer),
            redirect: "follow",
        }
        /*const url = `https://api2.ebazaar.mn/api/merchant/creat/new`
        fetch(url, requestOptions)
        .then((r) => r.json())
        .then((response) => {
            if(response.code === 200) {
                props.fetchData()
                props.setCustomer(false)
            }
        })
        .catch((error) => {
            console.log("error", error);
        })*/
    }
    const updateMongoDB = (customerType, name, register, businessType, phoneNumber, city, district, khoroo, address, customerData) => {
        console.log('updating MongoDB Merchant')
        console.log(customerData)
        const customer = {
            "_id": customerData.business_register,
            "supplier_id": parseInt(props.supplierId),
            "tradeshop_id": parseInt(customerData.tradeshop_id),
            "channel": parseInt(businessType),
            //"newRegister": register,
            "name": name,
            "detail": address,
            "phone": phoneNumber
            // "approved":false
            // "name": "name update test",
            // "customer_name": "customer name update test",
            // "phone": "11223344",
            // "city": "1",
            // "disctrict": "9",
            // "khoroo": "517",
            // "detail": "update detail test"
            // "newRegister": "МЗ94092958"
        }
        console.log(customer)
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(customer),
            redirect: "follow",
        }
        const url = `https://api2.ebazaar.mn/api/merchants`
        fetch(url, requestOptions)
        .then((r) => r.json())
        .then((response) => {
            console.log(response)
            /*if(response.code === 200) {
                props.fetchData()
                props.setCustomer(false)
            }*/
        })
        .catch((error) => {
            console.log("error", error);
        })
    }
    return <FormInputs setCustomer={props.setCustomer} save={save} update={updateMongoDB} customer={props.customer} businessTypes={props.businessTypes} />
}

export default Form

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