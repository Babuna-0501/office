import { useState, useContext, useEffect } from 'react';
import { ModuleContext } from '../../index';
import myHeaders from '../../../components/MyHeader/myHeader';
import ProductSelector from '../../ProductSelector';

const Form = props => {
  const context = useContext(ModuleContext);
  const [products, setProducts] = useState([]);
  const title = '-----------Зарлагын хүсэлт';
  const [type, setType] = useState('warehouse');
  const [sender, setSender] = useState(null);
  const [productSelector, setProductSelector] = useState(false);
  const [sendingWarehouse, setSendingWarehouse] = useState(null);
  const sequenceSizes = {
    index: 80,
    id: 120,
    image: 120,
    name: 300,
    category: 120,
    barcode: 120,
    sku: 120,
    stock: 120,
    cost: 120,
    totalcost: 120,
    saleprice: 120,
    quantity: 120,
    series: 120,
    expire: 120,
    series: 180
  };
  let width = 0;
  for (const size in sequenceSizes) {
    width += sequenceSizes[size];
  }
  const calculateTotalCost = (e, id) => {
    /*const quantity = document.getElementById('quantity' + id).value
		const cost = document.getElementById('cost' + id).value
		if(Number(quantity) !== 0 && Number(cost) !== 0) {
			document.getElementById('totalcost' + id).innerText = (Number(quantity) * Number(cost)).toLocaleString()
		}*/
  };
  const updateQuantity = (prod, newQuantity) => {
    console.log(products);
    let temp = products;
    temp.map((product, index) => {
      if (product._id === prod._id) {
        temp[index].quantity = Number(newQuantity);
      }
    });
    setProducts([...temp]);
  };
  const updateCost = (prod, newCost) => {
    console.log(products);
    let temp = products;
    temp.map((product, index) => {
      if (product._id === prod._id) {
        temp[index].cost = Number(newCost);
      }
    });
    setProducts([...temp]);
  };
  const returnHTML = [];
  let counter = 0;
  const series = (e, uid) => {
    console.log(products);
    console.log(e.target.value + ' and ' + uid);
    let temp = products;
    temp.map((product, index) => {
      if (product.uid === uid) {
        console.log('found at ' + index);
        temp[index].seriesNumber = e.target.value;
      }
    });
  };
  if (products.length > 0) {
    products.map(temp => {
      const product = temp;
      returnHTML.push(
        <div className='box_container'>
          <div
            className='box_header justify_content_center'
            style={{ width: sequenceSizes['index'] }}
          >
            <input type='checkbox' />
          </div>
          <div className='box_header' style={{ width: sequenceSizes['id'] }}>
            <p>{product._id}</p>
          </div>
          <div className='box_header' style={{ width: sequenceSizes['image'] }}>
            <img
              src={product.image[0]}
              style={{ height: '40px', width: '40px' }}
            />
          </div>
          <div className='box_header' style={{ width: sequenceSizes['name'] }}>
            <p className='product_name'>{product.name}</p>
          </div>
          <div
            className='box_header'
            style={{ width: sequenceSizes['category'] }}
          >
            <p>{product.category}</p>
          </div>
          <div
            className='box_header'
            style={{ width: sequenceSizes['barcode'] }}
          >
            <p>{product.bar_code}</p>
          </div>
          <div className='box_header' style={{ width: sequenceSizes['sku'] }}>
            <p>{product.sku}</p>
          </div>
          <div
            className='box_header'
            style={{ width: sequenceSizes['saleprice'] }}
          >
            <input
              type='number'
              style={{ height: '30px' }}
              id={'quantity' + product._id}
              onChange={e => updateQuantity(product, e.target.value)}
              defaultValue='1'
            />
          </div>
          <div
            className='box_header'
            style={{ width: sequenceSizes['saleprice'] }}
          >
            <input
              type='text'
              style={{ height: '30px' }}
              id={'cost' + product._id}
              onChange={e => updateCost(product, e.target.value)}
            />
          </div>
          <div
            className='box_header'
            style={{ width: sequenceSizes['totalcost'] }}
          >
            <p id={'totalcost' + product._id}>
              {Number(temp.cost) > 0 && Number(temp.quantity) > 0
                ? Number(temp.cost) * Number(temp.quantity)
                : null}
            </p>
          </div>
          <div
            className='box_header'
            style={{ width: sequenceSizes['quantity'] }}
          >
            <input type='text' style={{ height: '30px' }} />
          </div>
          <div
            className='box_header'
            style={{ width: sequenceSizes['quantity'] }}
          >
            <input type='text' style={{ height: '30px' }} />
          </div>
          <div
            className='box_header'
            style={{ width: sequenceSizes['series'] }}
          >
            1
            <input
              type='text'
              style={{ height: '30px', width: '100px' }}
              onKeyUp={e => series(e, product.uid)}
            />
            1
            <button
              className='button primary'
              onClick={() => duplicate(product)}
            >
              + Сери
            </button>
          </div>
          <div
            className='box_header'
            style={{ width: sequenceSizes['quantity'] }}
          >
            <input type='date' style={{ height: '30px' }} />
          </div>
        </div>
      );
      counter++;
    });
  }
  const addProducts = selectedProducts => {
    let foobar = products;
    selectedProducts.map(selectedProduct => {
      foobar.push(selectedProduct);
    });
    setProducts(foobar);
    setProductSelector(false);
    /*console.log(selectedProducts)
		setProducts([...products, selectedProducts])
		setTimeout(() => {
			console.log(products)
		}, 2000)
		setProductSelector(false)*/
  };
  const renderHTMLWarehouses = context.warehouseList.map(warehouse => {
    return context.activeWarehouse._id !== warehouse._id ? (
      <option value={warehouse._id}>{warehouse.name}</option>
    ) : null;
  });
  const renderHTMLPartners = (
    <>
      <option value='1'>Харилцагч</option>
    </>
  );
  const renderHTMLInboundTypes = [];
  const inboundTypes = context.systemData.shipment.variety.inbound;
  for (const inboundType in inboundTypes) {
    renderHTMLInboundTypes.push(
      <option value={inboundType}>{inboundTypes[inboundType]}</option>
    );
  }
  const send = () => {
    let foo = [];
    products.map(product => {
      foo.push({
        productId: product._id,
        quantity: product.quantity,
        cost: product.cost
      });
    });
    let sendData = {
      supplierId: context.activeWarehouse.supplierId,
      documentId: 'none',
      type: 1,
      variety: 1,
      note: 'none',
      from: sendingWarehouse,
      products: foo,
      to: context.activeWarehouse._id
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(sendData)
    };
    console.log(sendData);
    const url = `${process.env.REACT_APP_API_URL2}/api/shipment`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        if (response.message === 'success') {
          alert('Амжилттай илгээлээ!');
          props.setInForm(false);
        }
      });
  };
  const duplicate = duplicatingProduct => {
    let temp = [];
    let insertedDuplicateEntry = false;
    products.map((product, index) => {
      temp.push(product);
      if (
        duplicatingProduct._id === product._id &&
        insertedDuplicateEntry === false
      ) {
        console.log(duplicatingProduct);
        let foo = JSON.parse(JSON.stringify(duplicatingProduct));
        const uid =
          Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        console.log('bfoere' + foo.uid);
        foo.uid = uid;
        console.log('after' + foo.uid);
        temp.push(foo);
        insertedDuplicateEntry = true;
      }
    });
    setProducts(temp);
  };
  return (
    <>
      <div id='overlaypage_bg'>
        <div id='overlaypage'>
          <div id='overlaypage_header'>
            <h1>{title}</h1>
            <div style={{ display: 'flex', width: '1280px' }}>
              <div style={{ width: '320px' }}>
                <div>
                  <h2>Татан авах хүсэлт илгээх төрөл:</h2>
                </div>
                <div>
                  <select
                    className='custom-select'
                    style={{ width: '300px', margin: '0 1rem 0 0' }}
                    onChange={e => setType(e.target.value)}
                  >
                    <option value='warehouse'>Агуулах хооронд</option>
                    <option value='partners'>Харилцагч</option>
                  </select>
                </div>
              </div>
              <div style={{ width: '320px' }}>
                <div>
                  <h2>
                    {type === 'warehouse'
                      ? 'Татан авах хүсэлт илгээх агуулах:'
                      : 'Татан авах хүсэлт илгээх харилцагч:'}
                  </h2>
                </div>
                <div>
                  <select
                    className='custom-select'
                    style={{ width: '300px', margin: '0 1rem 0 0' }}
                    onChange={e => setSendingWarehouse(e.target.value)}
                  >
                    <option value=''>--сонгоно уу--</option>
                    {type === 'warehouse'
                      ? renderHTMLWarehouses
                      : renderHTMLPartners}
                  </select>
                </div>
              </div>
              <div style={{ width: '320px' }}>
                <div>
                  <h2>Орлогын төрөл:</h2>
                </div>
                <div>
                  <select
                    className='custom-select'
                    style={{ width: '300px', margin: '0 1rem 0 0' }}
                  >
                    <option value=''>--сонгоно уу--</option>
                    {renderHTMLInboundTypes}
                  </select>
                </div>
              </div>
              <div style={{ width: '320px' }}>
                <button
                  style={{ margin: '0 0 0 1rem !important' }}
                  className='button primary large'
                  onClick={() => setProductSelector(true)}
                >
                  Бүтээгдэхүүн нэмэх
                </button>
              </div>
            </div>
          </div>
          <div id='overlaypage_body' style={{ minWidth: width }}>
            <div className='box_header_container'>
              <div
                className='box_header justify_content_center'
                style={{ width: sequenceSizes['index'] }}
              >
                <input type='checkbox' />
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['id'] }}
              >
                Дугаар
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['image'] }}
              >
                IMG
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['name'] }}
              >
                Нэр
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['category'] }}
              >
                Ангилал
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['barcode'] }}
              >
                Баркод
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['sku'] }}
              >
                SKU
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['quantity'] }}
              >
                Татах тоо
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['cost'] }}
              >
                Өртөг
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['totalcost'] }}
              >
                Нийт өртөг
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['quantity'] }}
              >
                Бөөний үнэ
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['quantity'] }}
              >
                Жижиглэн үнэ
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['quantity'] }}
              >
                Сери
              </div>
              <div
                className='box_header'
                style={{ width: sequenceSizes['quantity'] }}
              >
                Дуусах
              </div>
            </div>
            {products.length > 0 ? (
              returnHTML
            ) : (
              <div style={{ padding: '2rem' }}>
                Бүтээгдэхүүн сонгоогүй байна.
              </div>
            )}
          </div>
          <div id='overlaypage_footer'>
            <div className='total'>
              <div className='left'>
                <h1>Нийт үнийн дүн:</h1>
                <h2></h2>
              </div>
              <div className='right'>
                <button
                  onClick={() => props.setInForm(false)}
                  className='button primary large'
                  style={{ margin: '0 1rem 0 0!important' }}
                >
                  Цуцлах
                </button>
                <button
                  onClick={() => send()}
                  disabled={sendingWarehouse ? false : true}
                  className='button primary large'
                >
                  Илгээх
                </button>
                <button
                  onClick={() => console.log(products)}
                  className='button primary large'
                >
                  state
                </button>
              </div>
            </div>
          </div>
          <span
            id='overlaypage_close'
            onClick={() =>
              props.in ? props.setInForm(false) : props.setForm(false)
            }
          >
            x
          </span>
        </div>
      </div>
      {productSelector ? (
        <ProductSelector
          setProductSelector={setProductSelector}
          addProducts={addProducts}
          products={products}
        />
      ) : null}
    </>
  );
};

export default Form;
