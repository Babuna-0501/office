import { useState, useContext, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';

const MassChannelPrice = props => {
  const [products, setProducts] = useState([1, 2]);
  const [businessTypes, setBusinessTypes] = useState([]);
  fetch(`${process.env.REACT_APP_API_URL2}/api/site_data`)
    .then(r => r.json())
    .then(response => {
      setBusinessTypes(response.business_types);
    });
  return (
    <div id='overlaypage_bg'>
      <div id='overlaypage'>
        <div className='pageHeader' id='pageHeader'>
          <p>Масс сувгийн үнийн тохиргоо</p>
          <span
            className='pageClose'
            onClick={() => props.setMassChannelPrice(false)}
          >
            <img src='/images/close.svg' alt='' />
          </span>
        </div>
        <div
          id='pageBody'
          style={{ top: '60px', right: '0', bottom: '52px', left: '0' }}
        >
          <div
            style={{
              height: '60px',
              padding: '0 1rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <button className='pageButton'>Бүтээгдэхүүн нэмэх</button>
            <button className='pageButton secondary marginleft1rem'>
              Масс импорт хийх
            </button>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '1rem',
              bottom: '52px',
              left: '1rem'
            }}
          >
            <table>
              <tr>
                <th style={{ fontSize: '10px' }}>Нэр</th>
                <th style={{ fontSize: '10px' }}>Баркод</th>
                {businessTypes.map(type => {
                  return (
                    <td style={{ fontSize: '10px' }}>
                      {type.business_type_name}
                    </td>
                  );
                })}
              </tr>
              {products.map(product => {
                return (
                  <tr>
                    <td style={{ fontSize: '10px' }}>a</td>
                    <td style={{ fontSize: '10px' }}>b</td>
                    {businessTypes.map(type => {
                      return (
                        <td
                          style={{
                            fontSize: '10px',
                            padding: '0',
                            margin: '0'
                          }}
                        >
                          <input type='text' className='massPrice' />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        <div id='overlaypage_footer'>
          <button className='pageButton'>Save</button>
        </div>
      </div>
    </div>
  );
};

export default MassChannelPrice;
