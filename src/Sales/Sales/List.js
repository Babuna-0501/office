import { useEffect, useState, useRef } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import Entry from './Entry';

const List = props => {
  const sales = props.data;
  const [sendingReceipts, setSendingReceipts] = useState(false);
  const sendReceipts = () => {
    if (window.confirm('Та баримт илгээхдээ итгэлтэй байна уу?')) {
      setSendingReceipts(true);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/pos-api/receipt/ebarimt/send`,
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          setSendingReceipts(false);
          if (result.message === 201 && result.data === 'SUCCESS') {
            alert('Амжилттай илгээлээ.');
          } else {
            alert('Алдаа гарлаа.');
          }
        })
        .catch(error => console.error(error));
    }
  };
  return (
    <>
      <div style={{ padding: '1rem' }}>
        <input
          type='date'
          value={props.startDate}
          className='formInput'
          onChange={e => props.setStartDate(e.target.value)}
        />
        <input
          type='date'
          value={props.endDate}
          className='formInput marginleft1rem marginright1rem'
          onChange={e => props.setEndDate(e.target.value)}
        />
        <button
          className='button primary medium marginleft1rem'
          onClick={() => props.setSale('new')}
        >
          Борлуулалт (F8)
        </button>
        <button
          className='button secondary medium marginleft1rem'
          style={{ marginLeft: '1rem !important' }}
          onClick={() => sendReceipts()}
        >
          Баримт илгээх
        </button>
      </div>
      <div
        className='box_header_container'
        style={{ borderRadius: '3px', overflow: 'hidden' }}
      >
        <div
          className='box_header'
          style={{ width: '52px', justifyContent: 'center' }}
        >
          <input type='checkbox' />
        </div>
        <div className='box_header' style={{ width: '80px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Дугаар</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Огноо</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Нийт дүн</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Хөнгөлөлт</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>ЭМД хөнгөлөлт</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>НӨАТ</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Бэлнээр</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Данс</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Карт/Бэлэн бус</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Харилцагч</h4>
        </div>
        <div className='box_header' style={{ width: '180px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Борлуулсан</h4>
        </div>
        <div className='box' style={{ width: '52px' }}>
          <span></span>
        </div>
      </div>
      {sales.map(sale => {
        return sale.documentId === 'Кассын борлуулалт' || sale.type === 0 ? (
          <Entry
            entryData={sale}
            setSale={props.setSale}
            openSale={props.openSale}
            warehouse={props.warehouse}
            openDraft={props.openDraft}
            supplierUsers={props.supplierUsers}
            key={Math.random()}
          />
        ) : null;
      })}
      {sendingReceipts ? (
        <div id='overlaypage_bg'>
          <div
            style={{
              padding: '2rem',
              borderRadius: '3px',
              background: 'white'
            }}
          >
            <div>Түр хүлээнэ үү...</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default List;
