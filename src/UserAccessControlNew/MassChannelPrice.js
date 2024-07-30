import { useState, useContext, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
import ProductSelector from './ProductSelector';
import readXlsxFile from 'read-excel-file';

const MassChannelPrice = props => {
  const [products, setProducts] = useState(null);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [data, setData] = useState(null);
  const [productSelector, setProductSelector] = useState(false);
  useEffect(() => {
    fetchData();
    fetchSiteData();
    if (document.getElementById('input')) {
      const input = document.getElementById('input');
      input.addEventListener('change', () => {
        readXlsxFile(input.files[0]).then(rows => {
          console.log(rows);
        });
      });
    }
  }, []);
  const fetchSiteData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/site_data`)
      .then(r => r.json())
      .then(response => {
        setBusinessTypes(response.business_types);
      });
  };
  const fetchData = pageNum => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let temp = {};
    const url = `${process.env.REACT_APP_API_URL2}/api/products/get1?page=1&limit=100000&order_by=created_desc`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        if (response.data.length > 0) {
          response.data.map(product => {
            temp[product._id] = {
              id: product._id,
              name: product.name,
              barcode: product.bar_code,
              locations: product.locations,
              selected: false
            };
          });
          setProducts(temp);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  let renderHTML = [];
  const remove = prod => {
    let product = prod;
    product.selected = false;
    setProducts({ ...product, ...products });
  };
  if (products) {
    for (const id in products) {
      if (products[id].selected) {
        const product = products[id];
        renderHTML.push(
          <tr>
            <td>
              <span onClick={() => remove(product)}>Remove</span>
            </td>
            <td style={{ fontSize: '10px' }}>{product.name}</td>
            <td style={{ fontSize: '10px' }}>{product.barcode}</td>
            {businessTypes.map(type => {
              //row[orders['Үйлдвэрлэгч']]??''
              const channelPrice =
                product.locations['62f4aabe45a4e22552a3969f'].price.channel[
                  type.business_type_id
                ] ?? '';
              return (
                <td style={{ fontSize: '10px', padding: '0', margin: '0' }}>
                  <input
                    type='text'
                    className='massPrice'
                    defaultValue={channelPrice}
                  />
                </td>
              );
            })}
          </tr>
        );
      }
    }
  }
  const updateProducts = data => {
    setProducts(data);
    setProductSelector(false);
  };
  const foobar = e => {
    readXlsxFile(e.target.files[0]).then(rows => {
      console.log(rows);
    });
  };
  return products ? (
    <div id='overlaypage_bg'>
      <div id='overlaypage'>
        <div className='pageHeader' id='pageHeader'>
          <p>Масс сувгийн үнийн тохиргоо</p>
          <span
            className='pageClose'
            onClick={() => props.setMassChannelPrice(false)}
          >
            <img src='https://admin.ebazaar.mn/images/close.svg' alt='' />
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
            <button
              className='pageButton'
              onClick={() => setProductSelector(true)}
            >
              Бүтээгдэхүүн нэмэх
            </button>
            <input
              className='marginleft1rem'
              type='file'
              id='input'
              onChange={e => foobar(e)}
              style={{ width: '100px' }}
            />
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
                <th></th>
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
              {renderHTML}
            </table>
          </div>
        </div>
        <div id='overlaypage_footer'>
          <button className='pageButton' onClick={() => console.log(products)}>
            Сувгийн үнийг хадгалах
          </button>
        </div>
      </div>
      {productSelector ? (
        <ProductSelector
          updateProducts={updateProducts}
          products={products}
          setProductSelector={setProductSelector}
        />
      ) : null}
    </div>
  ) : (
    <div id='overlaypage_bg'>
      <div id='overlaypage'>
        <p>Түр хүлээнэ үү...</p>
      </div>
    </div>
  );
};

export default MassChannelPrice;
