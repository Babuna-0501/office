import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import closeBtn from '../assets/close.svg';

function Import(props) {
  let [saving, setSaving] = useState(false);
  const [supID, setSupID] = useState(null);
  const options = [];
  props.suppliers.map(item => {
    options.push({
      value: item.id,
      label: item.name
    });
  });

  const save = () => {
    if (supID === 0) {
      alert('Нийлүүлэгч сонгоно уу');
      return;
    }

    if (supID === null) {
      alert('Нийлүүлэгч сонгоно уу');
      return;
    }
    document.getElementById('read').remove();
    setSaving(true);

    props.data.rows.map(product => {
      const productPrice = parseInt(product.price, 10);
      const inCase = parseInt(product.incase, 10);

      let rawNew = {};
      var myHeaders = new Headers();
      myHeaders.append(
        'ebazaar_token',
        localStorage.getItem('ebazaar_admin_token')
      );
      // console.log("rawnew", rawNew);
      myHeaders.append('Content-Type', 'application/json');
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(rawNew),
        redirect: 'follow'
      };
      // console.log("new product import requestoptions", requestOptions);

      let urlNew = `${process.env.REACT_APP_API_URL2}/api/product/add1`;
      fetch(urlNew, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.acknowledged === true) {
            alert('Бүтээгдэхүүнийг амжилттай орууллаа!');
            props.setImporter(false);
          }
          // console.log("new product import", result);
          setSupID('');
        })
        .catch(error => {
          console.log('error', error);
          setSupID('');
        });
    });
    setTimeout(() => {}, 5000);
  };
  const handleChange = selectedOptions => {
    setSupID(selectedOptions.value);
  };
  const CancelHandler = () => {
    props?.setImporter(false);
    document.getElementById('read').remove();
    setSaving(false);
    setSupID('');
  };
  return (
    <div id='formwithtransparentbackground'>
      <div id='form' className='import'>
        <div className='container'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItem: 'center'
            }}
          >
            {' '}
            <h1>Merchant import</h1>
          </div>
          <div id='rows'>
            <div className='entry header'>
              <div>Компани нэр</div>
              <div>Регистр</div>
              <div>Үйл ажиллагааны чиглэл</div>
              <div>Суваг</div>
              <div>Нэр</div>
              <div>Утас</div>
              <div>Хот</div>
              <div>Дүүрэг</div>
              <div>Хороо</div>
              <div>Хаяг</div>
            </div>
            {props.data.rows.map((row, index) => {
              return (
                <div className='entry' key={index}>
                  <div>{row.name}</div>
                  <div>{row.barcode}</div>
                  <div>{row.active}</div>
                  <div>{row.sku}</div>
                  <div>{row.price}</div>
                  <div>{row.description}</div>
                  <div>{row.incase}</div>
                  <div>{row.stock}</div>
                </div>
              );
            })}
          </div>
          <div
            className='container-btn'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span
              className='btn'
              style={{ background: '#B0BEC5' }}
              onClick={CancelHandler}
            >
              Цуцлах
            </span>
            <span className='btn' onClick={() => save()}>
              {saving ? 'Түр хүлээнэ үү' : 'Хадгалах'}
            </span>
          </div>
        </div>
      </div>
      <div id='transparentbackground'></div>
    </div>
  );
}

export default Import;
