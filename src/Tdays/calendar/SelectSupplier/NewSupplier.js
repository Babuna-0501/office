import React, { useState, useEffect } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';
import css from './newsupplier.module.css';

// import { Select } from "antd";
import Select from 'react-select';
const NewSupplier = props => {
  const [antData, setAntData] = useState([]);
  const options = [];
  let defaultValueLabel = 'Нийлүүлэгч';
  if (antData) {
    antData.map(category => {
      options.push({ value: category.id, label: category.name });
      // if (category.id === 1228) {
      //   defaultValueLabel = category.name;
      // }
    });
  }
  const handleChange = selectedOptions => {
    // console.log(selectedOptions.value);
    props.setSupId(selectedOptions.value);
    // setCategory(selectedOptions.value);
  };
  // const tdaysctx = useContext(TdaysHook);
  useEffect(() => {
    let controller = new AbortController();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      signal: controller.signal
    };

    let newUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`;
    fetch(newUrl, requestOptions)
      .then(r => r.json())
      .then(response => {
        let data = [];
        response.data.map(item => {
          data.push({
            value: item.id,
            label: item.name
          });
        });
        setAntData(data);
        controller = null;
      })
      .catch(error => {
        console.log('error', error);
      });
    return () => controller?.abort();
  }, []);

  const Handler = value => {
    props.setSupId(value);
  };

  return (
    <div className={css.container} style={{ width: '100%' }}>
      <Select
        options={antData}
        id='category'
        styles={{
          option: base => ({
            ...base
          })
        }}
        onChange={handleChange}
        defaultValue={{
          label: defaultValueLabel
          // value: props.product.category_id,
        }}
      />
    </div>
  );
};

export default NewSupplier;
