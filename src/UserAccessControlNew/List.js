import { useState, useContext, useEffect, useRef } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
import { replaceImageUrl } from '../utils';

const List = props => {
  console.log(props);
  // Search parameters
  const [data, setData] = useState(null);
  const [searchID, setSearchID] = useState(null);
  const [searchDate, setSearchDate] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchRegister, setSearchRegister] = useState(false);
  const [searchRegisterDate, setSearchRegisterDate] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const search = useRef({});
  const page = useRef(1);
  const fetchingData = useRef(false);
  useEffect(() => {
    fetchData();
  }, []);
  // Block widths
  const widths = props.widths;
  const renderHTML = [];
  let products = []; //props.data
  let fetchedProducts = useRef([]);
  // Matching records
  const fetchData = pageNum => {
    console.log('fetching data');
    let parameters = '';
    if (search.current.name && search.current.name.length > 0) {
      console.log(search.current.name);
      parameters += `search=${search.current.name}&`;
    }
    if (search.current.barcode && search.current.barcode.length > 0) {
      parameters += `bar_code=${search.current.barcode}&`;
    }
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const url = `${process.env.REACT_APP_API_URL2}/api/products/get1?${parameters}page=${page.current}&limit=40&order_by=created_desc`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        console.log(response);
        if (response.data.length > 0) {
          console.log(response);
          console.log('------------------------------------------46');
          //fetchedProducts.current = [...fetchedProducts.current, ...response.data]
          setData(response.data);
          console.log(response);
          //fetchingData.current = false
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const fnSearchByName = e => {
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {
      search.current.name = e.target.value;
      fetchedProducts.current = [];
      page.current = 0;
      pageIncrement();
    }
  };
  const fnSearchByBarcode = e => {
    console.log(e.target.value);
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {
      search.current.barcode = e.target.value;
      fetchedProducts.current = [];
      page.current = 0;
      pageIncrement();
    }
  };
  try {
    data.map(product => {
      let manufacturer = null;
      let category = null;
      let createdBy = null;
      if (parseInt(product.manufacturer) > 0 && props.attributes.manufacturer) {
        for (const [key, value] of Object.entries(
          props.attributes.manufacturer
        )) {
          if (key === product.manufacturer) {
            manufacturer = value;
            //return
          }
        }
      }
      if (parseInt(product.category_id) > 0) {
        props.productGroups.map(prodgroup => {
          if (parseInt(prodgroup.ID) === parseInt(product.category_id)) {
            category = prodgroup.Name;
            //return
          }
        });
      }
      if (parseInt(product.created_by) > 0) {
        props.supplierUsers.map(user => {
          if (product.created_by === user.user_id) {
            createdBy = user.first_name + ' ' + user.last_name;
          }
        });
      }
      console.log(product.stock);
      renderHTML.push(
        <>
          <div
            className='listEntry'
            style={{ width: props.totalWidth + 200 + 'px' }}
          >
            <div className='entryBlock' style={{ width: widths[0] }}>
              <input
                type='checkbox'
                data-id={product._id}
                className='customerToggle'
              />
            </div>
            <div
              className='entryBlock'
              style={{ width: widths[1] }}
              onClick={() => props.setProduct(product)}
            >
              <p style={{ color: '#0969DA' }}>{product._id}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[3] }}>
              <img
                src={
                  product.image && product.image[0]
                    ? replaceImageUrl(
                        product.image[0].replace('original', 'small')
                      )
                    : null
                }
                style={{ width: '30px', height: '30px' }}
                alt=''
              />
            </div>
            <div className='entryBlock width300px'>
              <p title={product.name}>{product.name}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[4] }}>
              <p>{product.vendor}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[4] }}>
              <p>{manufacturer}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[5] }}>
              <p>{product.bar_code}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[5] }}>
              <p>{product.stock}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[5] }}>
              <p>{product.emdData ? 'ЭМД' : null}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[6] }}>
              <p>{category}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[7] }}>
              <p>{createdBy}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[8] }}>
              <p>{product.created_date.substr(0, 10)}</p>
            </div>
            <div className='entryBlock' style={{ width: widths[9] }}>
              <p>{product.description}</p>
            </div>
          </div>
        </>
      );
    });
    console.log(renderHTML);
  } catch (e) {
    console.log(e);
  }
  const nextPage = 'nextpage';
  let foobarblah = false;
  renderHTML.push(<div id={nextPage}></div>);
  useEffect(() => {
    attachEvent();
  }, []);
  const attachEvent = () => {
    document.getElementById('pageList').addEventListener('scroll', () => {
      if (isInViewport(nextPage)) {
        if (fetchingData.current === false) {
          fetchingData.current = true;
          pageIncrement();
        }
      }
    });
  };
  function isInViewport(page) {
    const rect = document.getElementById(page).getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  const pageIncrement = () => {
    page.current = parseInt(page.current) + 1;
    fetchData();
  };
  console.log(renderHTML);
  return data ? (
    <div id='pageList'>
      <div
        className='listEntry'
        id='listHeader'
        style={{ minWidth: props.totalWidth + 200 + 'px' }}
      >
        <div
          className='entryBlock'
          style={{ width: widths[0], justifyContent: 'center' }}
        >
          <input type='checkbox' />
        </div>
        <div className='entryBlock' style={{ width: widths[1] }}>
          <div className='entryHeader'>
            <label>Дугаар</label>
            <input type='text' onKeyUp={e => setSearchID(e.target.value)} />
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[3] }}>
          <div className='entryHeader'>
            <label>Зураг</label>
            <input type='text' disabled />
          </div>
        </div>
        <div className='entryBlock width300px'>
          <div className='entryHeader'>
            <label>Нэр</label>
            <input type='text' onKeyUp={e => fnSearchByName(e)} />
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[4] }}>
          <div className='entryHeader'>
            <label>Нийлүүлэгч</label>
            <select>
              <option value='all'>Бүх нийлүүлэгч</option>
            </select>
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[4] }}>
          <div className='entryHeader'>
            <label>Үйлдвэрлэгч</label>
            <input
              type='text'
              onKeyUp={e => setSearchRegister(e.target.value)}
            />
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[4] }}>
          <div className='entryHeader'>
            <label>Баркод</label>
            <input type='text' onKeyUp={e => fnSearchByBarcode(e)} />
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[4] }}>
          <div className='entryHeader'>
            <label>Үлдэгдэл</label>
            <input type='text' disabled={true} />
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[4] }}>
          <div className='entryHeader'>
            <label>ЭМД</label>
            <input type='text' />
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[4] }}>
          <div className='entryHeader'>
            <label>Ангилал</label>
            <input type='text' />
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[4] }}>
          <div className='entryHeader'>
            <label>Үүсгэсэн</label>
            <input type='text' />
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[4] }}>
          <div className='entryHeader'>
            <label>Үүсгэсэн огноо</label>
            <input type='text' />
          </div>
        </div>
        <div className='entryBlock' style={{ width: widths[4] }}>
          <div className='entryHeader'>
            <label>Тайлбар</label>
            <input type='text' />
          </div>
        </div>
      </div>
      {renderHTML}
    </div>
  ) : (
    <div id='pageList'>Түр хүлээнэ үү ...</div>
  );
};

export default List;

/*
Category
    Created by
    created date
    description
    manufacturer
*/
