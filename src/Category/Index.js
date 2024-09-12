import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import List from './List';

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo(props => {
  let [data, setData] = useState(null);
  useEffect(() => {
    getMerchants();
    /*fetch(`${process.env.REACT_APP_API_URL}/api/site_data`)
        .then(r => r.json())
        .then(response => {
            setLocations(response.location)
            getMerchants()
        })*/
  }, []);
  const getMerchants = () => {
    ReactDOM.render(
      <React.StrictMode>
        <List
          key={Math.random()}
          locations={props.locations}
          businessType={props.businessType}
        />
      </React.StrictMode>,
      document.getElementById('foobar')
    );
  };
  /*const getMerchants = () => {
        var myHeaders = new Headers();
        myHeaders.append("ebazaar_token", localStorage.getItem('ebazaar_admin_token'))
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const url = `${process.env.REACT_APP_API_URL2}/api/merchants`
        fetch(url, requestOptions)
        .then(r => r.json())
        .then(response => {
            setData(response.data)
        })
        .catch(error => console.log('error', error))
    }*/
  return (
    <div>
      <div className='displayflex alignitemscenter'>
        <h1>Мерчант</h1>
      </div>
      <div className='row header'>
        <div className='5'>
          <div>
            <span className='header'>Дугаар</span>
            <input type='text' />
          </div>
        </div>
        <div className='5'>
          <div>
            <span className='header'>Created date</span>
            <input type='text' />
          </div>
        </div>
        <div className='5'>
          <div>
            <span className='header'>Компанийн нэр</span>
            <input type='text' />
          </div>
        </div>
        <div className='5'>
          <div>
            <span className='header'>Регистр</span>
            <input type='text' />
          </div>
        </div>
        <div className='products'>
          <div>
            <span className='header'>Үйл ажиллагааны чиглэл</span>
            <input type='text' />
          </div>
        </div>
        <div className='products'>
          <div>
            <span className='header'>Суваг</span>
            <input type='text' />
          </div>
        </div>
        <div className='5'>
          <div>
            <span className='header'>Нэр</span>
            <input />
          </div>
        </div>
        <div className='products'>
          <div>
            <span className='header'>Утас</span>
            <input type='text' />
          </div>
        </div>
        <div className='5'>
          <div>
            <span className='header'>Хот</span>
            <input type='text' />
          </div>
        </div>
        <div>
          <div>
            <span className='header'>Дүүрэг</span>
            <input type='text' />
          </div>
        </div>
        <div className='5'>
          <div>
            <span className='header'>Хороо</span>
            <input type='text' />
          </div>
        </div>
      </div>
      <div id='foobar'></div>
    </div>
  );
}, areEqual);

export default Index;
