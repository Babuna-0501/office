import Entry from './Entry';
import css from '../style.module.css';
import { ModuleContext } from '../index';
import { WarehouseContext } from '../Warehouse';
import { useContext, useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import myHeaders from '../../components/MyHeader/myHeader';

const List = props => {
  const context = useContext(ModuleContext);
  const whcontext = useContext(WarehouseContext);
  let products = props.data;
  console.log(props)
  let renderHTML = [];
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [category, setCategory] = useState(null);
  const [ids, setIds] = useState([]);
  const [stock, setStock] = useState(null);
  const [box, setBox] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const download = () => {
    console.log(startDate);
    console.log(endDate);
    console.log(ids.length == 0 ? products.map(e => e._id) : ids);
  };

  const downloadExcel = async () => {
    if (!startDate || !endDate) {
      alert('Эхлэх дуусах өдрийг сонгоно уу.');
      return;
    }

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/warehouse/report?start=${startDate}&end=${endDate}&warehouseId=${context.activeWarehouse._id}`,
      requestOptions
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'report.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const onChange = id => {
    if (ids.includes(id)) {
      setIds(ids.filter(e => e !== id));
    } else {
      setIds([...ids, id]);
    }
  };

  let foo = true;
  let totalProducts = 0;
  let totalQuantity = 0;
  let totalBox = 0;
  products.map(data => {
    if (id && id.toString().length > 0) {
      foo = data._id.toString().includes(id) ? true : false;
      if (foo === false) {
        return;
      }
    }
    if (name && name.toString().length > 0) {
      foo = data.name.toString().toLowerCase().includes(name.toLowerCase())
        ? true
        : false;
      if (foo === false) {
        return;
      }
    }
    if (barcode && barcode.toString().length > 0) {
      foo = data.bar_code && data.bar_code.toString().includes(barcode) ? true : false;
      if (foo === false) {
        return;
      }
    }
    
    if (category && parseInt(category) > 0) {
      foo = parseInt(data.category_id) === parseInt(category) ? true : false;
      if (foo === false) {
        return;
      }
    }
    if (stock && parseInt(stock) > 0) {
      foo = parseInt(data.stock) === parseInt(stock) ? true : false;
      if (foo === false) {
        return;
      }
    }
    if (box && parseInt(box) > 0) {
    	foo = parseInt(data.stock) === parseInt(box) ? true : false
    	if (foo === false) {
    		return
    	}
    }
    if (foo) {
      totalProducts++;
      totalQuantity += data.stock;
      whcontext.allProducts.map(product => {
        if (product._id === data._id) {
          // console.log(product.incase)
          if (product.incase) {
            totalBox += data.stock / product.incase;
          }
        }
      });
      renderHTML.push(
        <Entry
          data={data}
          checked={ids.includes(data._id)}
          onChange={() => onChange(data._id)}
          productGroups={props.productGroups}
          setEntry={props.setEntry}
          key={Math.random()}
          allProducts={whcontext.allProducts}
        />
      );
    }
  });
  const selectAll = checked => {
    // const entries = document.querySelectorAll('entry_id')
    // entries.map(entry => {
    // 	console.log(entry)
    // })
    /// deed code yag yaahiig ni oilgosongui - tur ingchihie
    setIds(checked ? products.map(e => e._id) : []);
  };
  const doc = new jsPDF();
  doc.text('<h1>Hello world!</h1>', 10, 10);
  const width = [50, 80, 300, 200, 200, 200, 200, 200, 200];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '.5rem', float: 'left' }}>
        <input
          type='date'
          value={startDate}
          className='formInput'
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type='date'
          value={endDate}
          className='formInput marginleft1rem'
          onChange={e => setEndDate(e.target.value)}
        />
        <button
          className='pageButton marginleft1rem'
          disabled={false}
          onClick={() => download()}
        >
          Download PDF
        </button>
        <button
          className='pageButton marginleft1rem'
          disabled={false}
          onClick={() => downloadExcel()}
        >
          Download Excel
        </button>
      </div>
      <div id='container-list' style={{ margin: '0 0 0 1rem' }}>
        <div className='blah margintop8px' style={{ height: '60px' }}>
          <div className='blahblah'>
            <div
              className='width30px'
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input
                type='checkbox'
                checked={products.length > 0 && ids.length == products.length}
                onClick={e => selectAll(e.target.checked)}
              />
            </div>
          </div>
          <div className='blahblah'>
            <div className={`width80px`} style={{ padding: '0 1rem 0 0' }}>
              <p className='blahblahheader'>ID</p>
              <input
                type='text'
                className={css.header_searchinput}
                onKeyUp={e => setId(e.target.value)}
              />
            </div>
          </div>
          <div className='blahblah'>
            <div className={`width340px`} style={{ padding: '0 1rem 0 0' }}>
              <p className='blahblahheader'>Бүтээгдэхүүний нэр</p>
              <input
                type='text'
                className={css.header_searchinput}
                onKeyUp={e => setName(e.target.value)}
              />
            </div>
          </div>
          <div className='blahblah'>
            <div className={`width160px`} style={{ padding: '0 1rem 0 0' }}>
              <p className='blahblahheader'>Баркод</p>
              <input
                type='text'
                className={css.header_searchinput}
                onKeyUp={e => setBarcode(e.target.value)}
              />
            </div>
          </div>
          <div className='blahblah'>
            <div className={`width220px`} style={{ padding: '0 1rem 0 0' }}>
              <p className='blahblahheader'>Серийн дугаар</p>
              <input
                type='text'
                className={css.header_searchinput}
                onKeyUp={e => setBarcode(e.target.value)}
              />
            </div>
          </div>
          <div className='blahblah'>
            <div className={`width220px`} style={{ padding: '0 1rem 0 0' }}>
              <p className='blahblahheader'>Дуусах хугацаа</p>
              <input
                type='text'
                className={css.header_searchinput}
                onKeyUp={e => setBarcode(e.target.value)}
              />
            </div>
          </div>
          <div className='blahblah'>
            <div className={`width140px`} style={{ padding: '0 1rem 0 0' }}>
              <p className='blahblahheader'>Үлдэгдэл</p>
              <input
                type='text'
                className={css.header_searchinput}
                onKeyUp={e => setStock(e.target.value)}
              />
            </div>
          </div>
          <div className={`width60px`}></div>
					<div className="blahblah">
						<div className={`width160px`} style={{ padding: '0 1rem 0 0' }}>
							<p className="blahblahheader">Үлдэгдэл (хайрцагаар)</p>
							<input type="text" className={css.header_searchinput} onKeyUp={(e) => setBox(e.target.value)} />
						</div>
					</div>
        </div>
        <div id={css.list} style={{ top: '165px' }}>
          {renderHTML}
        </div>
        <div
          style={{
            position: 'fixed',
            right: '0',
            left: '72px',
            bottom: '0px',
            height: '90px',
            background: '#eee',
            padding: '1rem'
          }}
        >
          <div
            style={{
              height: '58px',
              padding: '.5rem',
              border: '1px solid #ddd',
              width: '200px',
              background: 'white',
              margin: '0 1rem 0 0',
              display: 'inline-block',
              float: 'left'
            }}
          >
            <p style={{ margin: '0' }}>Бүтээгдэхүүн:</p>
            <h1 style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {totalProducts}
            </h1>
          </div>
          <div
            style={{
              height: '58px',
              padding: '.5rem',
              border: '1px solid #ddd',
              width: '200px',
              background: 'white',
              margin: '0 1rem 0 0',
              display: 'inline-block',
              float: 'left'
            }}
          >
            <p style={{ margin: '0' }}>Нийт тоо ширхэг:</p>
            <h1 style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {totalQuantity}
            </h1>
          </div>
          <div
            style={{
              height: '58px',
              padding: '.5rem',
              border: '1px solid #ddd',
              width: '200px',
              background: 'white',
              margin: '0 1rem 0 0',
              display: 'inline-block',
              float: 'left'
            }}
          >
            <p style={{ margin: '0' }}>Нийт хайрцаг:</p>
            <h1 style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {totalBox.toFixed(2)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
