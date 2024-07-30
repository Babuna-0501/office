import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import myHeaders from '../../components/MyHeader/myHeader';

const SupplierIndex = props => {
  const [supplierData, setSupplierData] = useState([]);
  const [supplierRawData, setSupplierRawData] = useState([]);

  let defaultValue = null;

  useEffect(() => {
    // let controller = new AbortController();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        // console.log("result", result.data);
        let options = [];
        result.data?.map(category => {
          options.push({ value: category.id, label: category.name });
          // if (props.id === category.id) {
          //   console.log("category.name", category.name);
          //   defaultValue = category.name;
          //   setDefaultValueLabel(category.name);
          // }
        });

        setSupplierData(options);
        setSupplierRawData(result.data);
        // controller = null;
      })
      .catch(error => {
        console.log('error', error);
        alert('Алдаа гарлаа.');
      });
    // return () => controller?.abort();
  }, [props]);
  if (props.id) {
    supplierRawData?.map(item => {
      if (item.id === props.id) {
        defaultValue = item.name;
      }
    });
  }
  // console.log("defaultValue", defaultValue);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '32px',
      height: '32px',
      boxShadow: state.isFocused ? null : null
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '32px',
      padding: '0 4px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
      height: '32px'
    }),
    indicatorSeparator: state => ({
      display: 'none'
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '32px'
    })
  };
  const handleChange = selectedOptions => {
    props.setSuppID(selectedOptions.value);
  };
  // console.log("defaultValue++ last", defaultValue);

  return (
    <Select
      options={supplierData}
      styles={customStyles}
      id='category'
      onChange={handleChange}
      defaultValue={{
        label: defaultValue === null ? 'Нийлүүлэгч' : defaultValue,
        value: props.id
      }}
    />
  );
};

export default SupplierIndex;
