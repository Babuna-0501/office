import { useState, useEffect, useContext } from 'react';
import { ModuleContext } from '../index';
import css from './detail.module.css';
import myHeaders from '../../components/MyHeader/myHeader';
import Uniques from './Uniques';

const FormattedDate = () => {
  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month =
    currentDate.getMonth() + 1 < 10
      ? '0' + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1;
  const day =
    currentDate.getDate() < 10
      ? '0' + currentDate.getDate()
      : currentDate.getDate();
  return {
    currentDate: year + '-' + month + '-' + day,
    year: year,
    month: month,
    day: day
  };
};

const Detail = props => {
  let foo = FormattedDate();
  const context = useContext(ModuleContext);
  const productInfo = props.data;
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(
    foo['year'] + '-' + foo['month'] + '-' + '01'
  );
  const [endDate, setEndDate] = useState(foo['currentDate']);
  const [recordType, setRecordType] = useState('all');
  useEffect(() => {
    document.getElementById('dataHeader').style.top =
      parseInt(document.getElementById('pageHead').offsetHeight) +
      parseInt(document.getElementById('pageHeader').offsetHeight) +
      'px';
    fetchData();
  }, [startDate, endDate, recordType]);
  const fetchData = () => {
    const typeParamater =
      recordType === 'all' ? '' : '&movementType=' + recordType;
    const url = `${process.env.REACT_APP_API_URL2}/api/warehouse?productId=${productInfo._id}&id=${context.activeWarehouse._id}&movementStartDate=${startDate}&movementEndDate=${endDate}&productMovement=true${typeParamater}`;
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setData(response.data);
      });
  };
  return (
    <div id='overlaypage_bg'>
      <div id='overlaypage'>
        <div className='pageHeader' id='pageHeader'>
          <p>Бүтээгдэхүүний орлого, зарлагын түүх</p>
          <span onClick={() => props.setEntry(false)} className='pageClose'>
            <img src='/images/close.svg' alt='' />
          </span>
        </div>
        <div className='padding1dot5rem' id='pageHead'>
          <div>
            <div className={css.product_info}>
              <h1 className={css.product_title}>{productInfo.name}</h1>
              <div className={css.product_infos}>
                <div className={css.info_block}>
                  <h4>ID: {productInfo._id}</h4>
                  <h4>Barcode: {productInfo.bar_code}</h4>
                </div>
                <div className={css.info_block}>
                  <h4>SKU: {productInfo.sku}</h4>
                  <h4>Ангилал: {productInfo.category_id}</h4>
                </div>
                <div className={css.info_block}>
                  <h4>Үлдэгдэл: {productInfo.stock}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='container-filters'>
            <span>
              <label className='filter'>Харуулах</label>
              <select
                className='formInput width180px marginright1rem'
                onChange={e => setRecordType(e.target.value)}
              >
                <option value='all'>Орлого + Зарлага</option>
                <option value='1'>Орлого</option>
                <option value='2'>Зарлага</option>
              </select>
            </span>
            <span>
              <label className='filter'>Эхлэх огноо</label>
              <input
                type='date'
                className='formInput width180px marginright1rem'
                onChange={e => setStartDate(e.target.value)}
                value={startDate}
              />
            </span>
            <span>
              <label className='filter'>Дуусах огноо</label>
              <input
                type='date'
                className='formInput width180px marginright1rem'
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </span>
          </div>
        </div>
        <div
          className='box_header_container'
          style={{ position: 'absolute', right: '0', left: '0' }}
          id='dataHeader'
        >
          <div className='box' style={{ width: '52px' }}>
            <input type='checkbox' />
          </div>
          <div className='box' style={{ width: '120px' }}>
            <span>ID</span>
          </div>
          <div className='box' style={{ width: '120px' }}>
            <span>Огноо</span>
          </div>
          <div className='box' style={{ width: '120px' }}>
            <span>Өртөг</span>
          </div>
          <div className='box' style={{ width: '120px' }}>
            <span>Бөөний үнэ</span>
          </div>
          <div className='box' style={{ width: '120px' }}>
            <span>Жижиглэн үнэ</span>
          </div>
          <div className='box' style={{ width: '120px' }}>
            <span>Тоо ширхэг</span>
          </div>
          <div className='box' style={{ width: '120px' }}>
            <span>Эхний үлдэгдэл</span>
          </div>
          <div className='box' style={{ width: '120px' }}>
            <span>Эцсийн үлдэгдэл</span>
          </div>
        </div>
        {data ? (
          <Uniques data={data} key={Math.random()} />
        ) : (
          <div class='lds-facebook'>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
