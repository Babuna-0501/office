import React, { useState, useEffect, useContext } from 'react';

import css from './index.module.css';

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo(props => {
  // console.log("newImportData", newImportData);
  // console.log("productsCtx", productsCtx);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/zones?supplier_id=${props.supplier}`,
      requestOptions
    )
      .then(r => r.json())
      .then(response => {})
      .catch(error => console.log('error', error));
  }, [props]);

  const searchById = e => {
    // console.log("search value", e.target.value);
  };

  return (
    <div className={css.container}>
      <div className='row header'>
        <div style={{ width: '35px', marginTop: '10px' }}>
          <div>
            <input type='checkbox' className={css.inputcontainer} />
          </div>
        </div>
        <div style={{ width: '300px' }}>
          <div>
            <span className='header'>Нийлүүлэгч</span>
            <input
              type='text'
              onKeyPress={e => searchById(e)}
              placeholder='Хайх ...'
              className={css.inputWrapper}
            />
          </div>
        </div>
        <div style={{ width: '106px' }}>
          <div>
            <span className='header'>Нэр</span>
            <input
              type='text'
              onKeyPress={e => searchById(e)}
              placeholder='Хайх ...'
              className={css.inputWrapper}
            />
          </div>
        </div>
        <div style={{ width: '106px' }}>
          <div>
            <span className='header'>Төрөл</span>
            <input
              type='text'
              onKeyPress={e => searchById(e)}
              placeholder='Хайх ...'
              className={css.inputWrapper}
            />
          </div>
        </div>
        <div style={{ width: '106px' }}>
          <div>
            <span className='header'>Target</span>
            <input
              type='text'
              onKeyPress={e => searchById(e)}
              placeholder='Хайх ...'
              className={css.inputWrapper}
            />
          </div>
        </div>
        <div style={{ width: '106px' }}>
          <div>
            <span className='header'>Эхлэх огноо</span>
            <input
              type='date'
              onKeyPress={e => searchById(e)}
              placeholder='mm/dd/'
              className={css.inputWrapper}
            />
          </div>
        </div>
        <div style={{ width: '106px' }}>
          <div>
            <span className='header'>Дуусах огноо</span>
            <input
              type='date'
              onKeyPress={e => searchById(e)}
              placeholder='mm/dd/'
              className={css.inputWrapper}
            />
          </div>
        </div>{' '}
        <div style={{ width: '106px' }}>
          <div>
            <span className='header'>Суваг</span>
            <input
              type='text'
              onKeyPress={e => searchById(e)}
              placeholder='Хайх...'
              className={css.inputWrapper}
            />
          </div>
        </div>
        <div style={{ width: '106px' }}>
          <div>
            <span className='header'>Бүсчлэл</span>
            <input
              type='text'
              onKeyPress={e => searchById(e)}
              placeholder='Хайх...'
              className={css.inputWrapper}
            />
          </div>
        </div>
        <div style={{ width: '106px' }}>
          <div>
            <span className='header'>Тайлан</span>
            <input
              type='text'
              onKeyPress={e => searchById(e)}
              placeholder='Хайх...'
              className={css.inputWrapper}
            />
          </div>
        </div>
      </div>

      <div id='foobar'></div>
    </div>
  );
}, areEqual);

export default Index;
