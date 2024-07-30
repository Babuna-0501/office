import React, { useState, useEffect } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';
import css from './selectsupplier.module.css';
import { Select } from 'antd';

const NewSupplierUpdate = props => {
  // console.log("props supplier update", props);
  const [antData, setAntData] = useState([]);
  const [defaultData, setDefaultData] = useState(null);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // let newUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${props.chosedSupplier}`;
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
          //   if (item.id === props.chosedSupplier) {
          //     setDefaultData(item.name);
          //   }
        });

        setAntData(data);
      })
      .then(res => {
        antData.map(item => {
          // console.log("item====", item);
          // console.log("props.chosedSupplier", props.chosedSupplier);

          if (Number(item.value) === Number(props.chosedSupplier)) {
            setDefaultData(item.label);
          }
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [props]);
  // console.log("defaultData", defaultData);
  const Handler = value => {
    props.setChosedSupplier(value);
  };

  return (
    <div style={{ height: '32px' }}>
      <Select
        showSearch
        defaultValue={defaultData}
        style={{
          width: 250,
          height: '100%'
        }}
        placeholder='Нийлүүлэгч'
        optionFilterProp='children'
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        onChange={Handler}
        options={antData}
      />
    </div>
  );
};

export default NewSupplierUpdate;
