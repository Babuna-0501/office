import { useState, useContext, useEffect } from 'react';
import FormInputs from './FormInputs';
import myHeaders from '../components/MyHeader/myHeader';

async function saveNewProduct(
  supplierId,
  name,
  barcode,
  country,
  manufacturer,
  vendor,
  category,
  sku,
  description,
  attributes
) {
  const productData = {
    alcohol: 0,
    attributes: attributes,
    bar_code: barcode,
    brand: 0,
    category_id: 0,
    city_tax: '0',
    country: country,
    description: description,
    exclude: [],
    image: [
      `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
    ],
    include: [],
    locations: {
      '62f4aabe45a4e22552a3969f': {
        deliver_fee: {
          channel: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
            20: 0,
            21: 0,
            22: 0,
            23: 0,
            24: 0,
            25: 0,
            27: 0,
            28: 0,
            29: 0
          }
        },
        in_case: {
          channel: {
            1: 12,
            2: 12,
            3: 12,
            4: 12,
            5: 12,
            6: 12,
            7: 12,
            8: 12,
            9: 12,
            10: 12,
            11: 12,
            12: 12,
            13: 12,
            14: 12,
            15: 12,
            16: 12,
            17: 12,
            18: 12,
            19: 12,
            20: 12,
            21: 12,
            22: 12,
            23: 12,
            24: 12,
            25: 12,
            27: 12,
            28: 12,
            29: 12
          }
        },
        is_active: {
          channel: {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            22: 1,
            23: 1,
            24: 1,
            25: 1,
            27: 1,
            28: 1,
            29: 1
          }
        },
        price: {
          channel: {
            1: 3000,
            2: 3000,
            3: 3000,
            4: 3000,
            5: 3000,
            6: 3000,
            7: 3000,
            8: 3000,
            9: 3000,
            10: 3000,
            11: 3000,
            12: 3000,
            13: 3000,
            14: 3000,
            15: 3000,
            16: 3000,
            17: 3000,
            18: 3000,
            19: 3000,
            20: 3000,
            21: 3000,
            22: 3000,
            23: 3000,
            24: 3000,
            25: 3000,
            27: 3000,
            28: 3000,
            29: 3000
          }
        },
        priority: {
          channel: {
            1: 100,
            2: 100,
            3: 100,
            4: 100,
            5: 100,
            6: 100,
            7: 100,
            8: 100,
            9: 100,
            10: 100,
            11: 100,
            12: 100,
            13: 100,
            14: 100,
            15: 100,
            16: 100,
            17: 100,
            18: 100,
            19: 100,
            20: 100,
            21: 100,
            22: 100,
            23: 100,
            24: 100,
            25: 100,
            27: 100,
            28: 100,
            29: 100
          }
        },
        upoint: {
          channel: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
            20: 0,
            21: 0,
            22: 0,
            23: 0,
            24: 0,
            25: 0,
            27: 0,
            28: 0,
            29: 0
          }
        }
      }
    },
    manufacturer: manufacturer,
    name: name,
    noat: false,
    pickpack: 0,
    product_measure: false,
    product_weight: 1,
    sector_id: null,
    sku: sku,
    slug: 'product',
    stock: 100000000000000,
    supplier_id: supplierId,
    supplier_productgroup_id: category,
    thirdparty_data: {
      pickpack: {
        sku: '',
        sync: false
      }
    },
    options: { foo: 'bar' },
    weight: null
  };
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(productData),
    redirect: 'follow'
  };
  const url = `${process.env.REACT_APP_API_URL2}/api/product/add1`;
  const result = await fetch(url, requestOptions)
    .then(r => r.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return false;
    });
  return result;
}

const Form = props => {
  const update = (
    id,
    name,
    barcode,
    country,
    manufacturer,
    vendor,
    category,
    condition,
    storage,
    form,
    sku,
    boditsavlalt,
    zardagsavlalt,
    description
  ) => {
    const productData = {
      product_id: id,
      attributes: {
        musthave: true,
        boxing: {
          sell: zardagsavlalt,
          box: boditsavlalt
        }
      },
      bar_code: barcode,
      country: country,
      description: description,
      image: [
        `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
      ],
      manufacturer: manufacturer,
      name: name
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(productData),
      redirect: 'follow'
    };
    const url = `${process.env.REACT_APP_API_URL2}/api/product/update1`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const save = (
    name,
    barcode,
    country,
    manufacturer,
    vendor,
    category,
    condition,
    storage,
    form,
    sku,
    boditsavlalt,
    zardagsavlalt,
    description
  ) => {
    if (
      saveNewProduct(
        props.supplierId,
        name,
        barcode,
        country,
        manufacturer,
        vendor,
        category,
        condition,
        storage,
        form,
        sku,
        boditsavlalt,
        zardagsavlalt,
        description
      )
    ) {
      alert('Амжилттай үүсгэлээ319');
      props.setProduct(false);
    } else {
      console.log('err');
    }
  };
  /*const update = (customerType, name, register, businessTypes, phoneNumber, city, district, khoroo, address) => {
        console.log('updating')
    }*/
  return (
    <FormInputs
      setProduct={props.setProduct}
      save={save}
      update={update}
      product={props.product}
      customers={props.customers}
      productGroups={props.productGroups}
      attributes={props.attributes}
    />
  );
};

export default Form;

export { saveNewProduct };
