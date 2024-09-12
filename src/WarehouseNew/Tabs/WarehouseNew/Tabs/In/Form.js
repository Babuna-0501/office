import { useState, useContext, useEffect, useRef, useMemo } from 'react';
import { ModuleContext } from '../../index';
import myHeaders from '../../../components/MyHeader/myHeader';
import ProductSelector from '../../ProductSelector';
import { WarehouseContext } from '../../Warehouse';
import { replaceImageUrl } from '../../../../../utils';

const Form = props => {
  console.log(props.form);
  const context = useContext(ModuleContext);
  console.log(context);
  const whcontext = useContext(WarehouseContext);
  const customers = context.customers;
  const [products, setProducts] = useState([]);
  const [saving, setSaving] = useState(false);
  //const [formMode, setFormMode] = useState(props.form[0] !== 'new' ? 'open' : 'new')
  //console.log(formMode)
  useEffect(() => {
    if (props.form[0] !== 'new') {
      let foo = {};
      whcontext.allProducts.map(product => {
        foo[product._id] = product;
      });
      let bar = props.form.products;
      bar.map((product, index) => {
        bar[index]['_id'] = bar[index]['productId'];
        bar[index]['name'] = foo[bar[index]['productId']]['name'];
        bar[index]['image'] = [];
        bar[index]['image'][0] = foo[bar[index]['productId']]['image'][0];
        bar[index]['bar_code'] = foo[bar[index]['productId']]['bar_code'];
      });
      setProducts(JSON.parse(JSON.stringify(bar)));
      //console.log(bar)
      /*let temp = []
			props.form.products.map(product => {
				console.log(product)
				whcontext.products.map(prod => {
					if(product._id === prod._id) {
						console.log('found')
					}
				})
			})*/
      //temp.map(product => {
      //tempconsole.log(product)
      //})
    }
  }, []);
  const foofoo = () => {
    console.log(products);
  };
  //setInterval(foofoo, 2000)
  const [type, setType] = useState(props.form[1]);
  console.log(type);
  const [from, setFrom] = useState(props.form.from ? props.form.from : '');
  const [sender, setSender] = useState(null);
  const [productSelector, setProductSelector] = useState(false);
  const [sendingWarehouse, setSendingWarehouse] = useState(null);
  const [inboundType, setInboundType] = useState(
    props.form.variety ? props.form.variety : ''
  );
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
  const widths = [
    80, 100, 60, 240, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120,
    120, 120, 120, 120, 120
  ];
  let width = 0;
  for (const size in widths) {
    width += widths[size];
  }
  const calculateTotalCost = (e, id) => {
    /*const quantity = document.getElementById('quantity' + id).value
		const cost = document.getElementById('cost' + id).value
		if(Number(quantity) !== 0 && Number(cost) !== 0) {
			document.getElementById('totalcost' + id).innerText = (Number(quantity) * Number(cost)).toLocaleString()
		}*/
  };
  const updateQuantity = (prod, newQuantity) => {
    console.log('updating');
    let temp = products;
    temp.map((product, index) => {
      if (product._id === prod._id) {
        temp[index].quantity = Number(newQuantity);
      }
    });
    setProducts(() => temp);
  };
  const updateCost = (prod, newCost) => {
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
    let temp = products;
    temp.map((product, index) => {
      if (product.uid === uid) {
        temp[index].seriesNumber = e.target.value;
      }
    });
  };
  const quantity = (e, uid) => {
    let temp = JSON.parse(JSON.stringify(products));
    console.log(temp);
    temp.map((product, index) => {
      if (product.uid === uid) {
        temp[index].quantity = e.target.value;
        //document.getElementById('cost' + uid).innerText = Number(e.target.value) * Number(temp[index].cost)
      }
    });
    //updateTotals()
    setProducts(temp);
  };
  const cost = (e, uid) => {
    let temp = products;
    temp.map((product, index) => {
      if (product.uid === uid) {
        temp[index].cost = e.target.value;
        document.getElementById('cost' + uid).innerText =
          Number(e.target.value) * Number(temp[index].quantity);
      }
    });
  };
  const wholesale = (e, uid) => {
    let temp = products;
    temp.map((product, index) => {
      if (product.uid === uid) {
        temp[index].sellPrice.wholesale = e.target.value;
      }
    });
  };
  const retail = (e, uid) => {
    let temp = products;
    temp.map((product, index) => {
      if (product.uid === uid) {
        temp[index].sellPrice.retail = parseInt(e.target.value);
      }
    });
  };
  const removeProduct = id => {
    let temp = JSON.parse(JSON.stringify(products));
    temp.splice(id, 1);
    setProducts(temp);
    updateTotals();
  };
  const discount = () => {};
  if (products.length > 0) {
    products.map((temp, index) => {
      const product = temp;
      let formsHTML = null;
      for (const [key, value] of Object.entries(context.attributes.form)) {
        if (product.attributes && key === product.attributes['form']) {
          formsHTML = <p>{value}</p>;
        }
      }
      returnHTML.push(
        <div
          className='box_container'
          key={Math.random()}
          style={{ width: width }}
        >
          <div
            className='box_header justify_content_center'
            style={{ width: widths[0] }}
          >
            <input type='checkbox' />
          </div>
          <div className='box_header' style={{ width: widths[1] }}>
            <p>{product._id}</p>
          </div>
          <div className='box_header' style={{ width: widths[2] }}>
            {product.image && product.image[0] ? (
              <img
                src={replaceImageUrl(product.image[0])}
                style={{ height: '40px', width: '40px' }}
              />
            ) : null}
          </div>
          <div className='box_header' style={{ width: widths[3] }}>
            <p className='product_name'>{product.name}</p>
          </div>
          <div className='box_header' style={{ width: widths[4] }}>
            <p>{product.category}</p>
          </div>
          <div className='box_header' style={{ width: widths[5] }}>
            <p>{product.bar_code}</p>
          </div>
          <div className='box_header' style={{ width: widths[5] }}>
            {formsHTML}
          </div>
          <div className='box_header' style={{ width: widths[6] }}>
            <p>{product.sku}</p>
          </div>
          <div className='box_header' style={{ width: widths[7] }}>
            <input
              type='number'
              style={{ height: '30px' }}
              defaultValue={product.quantity}
              id={'product_quantity_' + product._id}
              key={Math.random()}
            />
          </div>
          <div className='box_header' style={{ width: widths[8] }}>
            <input
              type='text'
              style={{ height: '30px' }}
              id={'cost' + product._id}
              onKeyUp={e => cost(e, product.uid)}
              defaultValue={product.cost}
            />
          </div>
          <div className='box_header' style={{ width: widths[9] }}>
            <p>{product.cost * product.quantity}</p>
          </div>
          <div className='box_header' style={{ width: widths[9] }}>
            <input
              type='text'
              style={{ height: '30px' }}
              id={'discount' + product._id}
              onKeyUp={e => discount(e, product.uid)}
              defaultValue={product.discount ? product.discount : ''}
            />
          </div>
          <div className='box_header' style={{ width: widths[9] }}>
            <input
              type='text'
              style={{ height: '30px' }}
              id={'discount' + product._id}
              onKeyUp={e => discount(e, product.uid)}
              defaultValue={product.discount ? product.discount : ''}
            />
          </div>
          <div className='box_header' style={{ width: widths[9] }}>
            <input
              type='text'
              style={{ height: '30px' }}
              id={'discount' + product._id}
              onKeyUp={e => discount(e, product.uid)}
              defaultValue={product.discount ? product.discount : ''}
            />
          </div>
          <div className='box_header' style={{ width: widths[11] }}>
            <input
              type='text'
              style={{ height: '30px' }}
              defaultValue={product.sellPrice ? product.sellPrice.retail : null}
              onKeyUp={e => retail(e, product.uid)}
            />
          </div>
          <div className='box_header' style={{ width: widths[12] }}>
            <input
              type='text'
              style={{ height: '30px' }}
              defaultValue={product.seriesNumber}
              onKeyUp={e => series(e, product.uid)}
            />
          </div>
          <div className='box_header' style={{ width: widths[12] }}>
            <button
              className='pageButton small'
              onClick={() => duplicate(product)}
            >
              + Сери
            </button>
          </div>
          <div className='box_header' style={{ width: widths[13] }}>
            <input type='date' style={{ height: '30px' }} />
          </div>
          <div className='box_header' style={{ width: widths[14] }}>
            <span onClick={() => removeProduct(index)}>
              <img src='/images/remove.svg' alt='' style={{ width: '26px' }} />
            </span>
          </div>
        </div>
      );
      counter++;
    });
  }
  const addProducts = selectedProducts => {
    console.log(selectedProducts);
    let foobar = products;
    selectedProducts.map(selectedProduct => {
      foobar.push(selectedProduct);
    });
    setProducts(foobar);
    setProductSelector(false);
    updateTotals();
    /*console.log(selectedProducts)
		setProducts([...products, selectedProducts])
		setTimeout(() => {
			console.log(products)
		}, 2000)
		setProductSelector(false)*/
  };
  const renderHTMLWarehouses = context.warehouseList.map(warehouse => {
    return warehouse._id !== context.activeWarehouse._id ? (
      <option
        key={Math.random()}
        value={warehouse._id}
        style={{
          fontWeight:
            context.activeWarehouse._id === warehouse._id ? 'bold' : 'normal'
        }}
      >
        {warehouse.name}
      </option>
    ) : null;
  });
  const renderHTMLPartners = customers.map(customer => {
    return (
      <option value={customer.tradeshop_id}>{customer.customer_name}</option>
    );
  });
  const renderHTMLInboundTypes = [];
  const inboundTypes = context.systemData.shipment.variety.inbound;
  for (const inboundType in inboundTypes) {
    renderHTMLInboundTypes.push(
      <option key={Math.random()} value={inboundType}>
        {inboundTypes[inboundType]}
      </option>
    );
  }
  const send = () => {
    if (saving) {
      alert('Түр хүлээнэ үү');
      return;
    }
    const borderColor =
      document.getElementById('sendingWarehouse').style.borderColor;
    if (
      type !== 'import' &&
      document.getElementById('sendingWarehouse').value === ''
    ) {
      document.getElementById('sendingWarehouse').style.borderColor = 'red';
      setTimeout(() => {
        document.getElementById('sendingWarehouse').style.borderColor =
          borderColor;
      }, 2000);
      return;
    } else if (document.getElementById('inboundTypes').value === '') {
      document.getElementById('inboundTypes').style.borderColor = 'red';
      setTimeout(() => {
        document.getElementById('inboundTypes').style.borderColor = borderColor;
      }, 2000);
      return;
    } else if (document.getElementById('requestNote').value === '') {
      document.getElementById('requestNote').style.borderColor = 'red';
      setTimeout(() => {
        document.getElementById('requestNote').style.borderColor = borderColor;
      }, 2000);
      return;
    } else if (products.length === 0) {
      alert('Бүтээгдэхүүн сонгоно уу!');
      return;
    }
    let foo = [];
    products.map(product => {
      foo.push({
        productId: product._id,
        quantity: parseInt(
          document.getElementById('product_quantity_' + product._id).value
        ),
        cost: parseInt(product.cost),
        seriesNumber: product.seriesNumber,
        sellPrice: product.sellPrice
      });
    });
    let sendData = {
      supplierId: context.activeWarehouse.supplierId,
      documentId: 'none',
      type: 1,
      variety: document.getElementById('inboundTypes').value,
      note: document.getElementById('requestNote').value,
      products: foo,
      to: context.activeWarehouse._id,
      thirdParty: type === 'warehouse' || type === 'import' ? false : true
    };
    if (type !== 'import') {
      sendData['from'] = document.getElementById('sendingWarehouse').value;
    }
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(sendData)
    };
    console.log(sendData);
    /*setSaving(true)
	    const url = `${process.env.REACT_APP_API_URL2}/api/shipment`
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			if(response.message === 'success') {
				alert('Амжилттай илгээлээ!' + props.ognoo)
				props.sentRequest()
				props.foobar(props.ognoo)
				props.setForm(false)
				setSaving(false)
			}
		})*/
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
    //setProducts(temp)
    setProducts(() => [...temp]);
    updateTotals();
  };
  const confirmRequest = () => {
    let sendData = {
      _id: props.form._id,
      status: 2
    };
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(sendData)
    };
    console.log(sendData);
    setSaving(true);
    const url = `${process.env.REACT_APP_API_URL2}/api/shipment`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        console.log(response);
        if (response.message === 'success') {
          alert('Хүсэлтийг баталлаа!');
          props.sentRequest();
          props.foobar(props.ognoo);
          setSaving(true);
          props.setForm(false);
        }
      });
  };
  let renderButtons = null;
  if (props.form[0] === 'new') {
    renderButtons = (
      <>
        <button
          onClick={() => console.log(from + ' and  ' + inboundType)}
          style={{ margin: '0 3rem 0 0' }}
        >
          Print
        </button>
        <button
          onClick={() => props.setForm(false)}
          className='pageButton secondary'
          style={{ margin: '0 1rem 0 0!important' }}
        >
          Хаах
        </button>
        <button onClick={() => send()} className='pageButton' disabled={saving}>
          Илгээх
        </button>
      </>
    );
  } else {
    if (props.form.status === 2) {
      renderButtons = (
        <>
          <button
            onClick={() => console.log(from + ' and  ' + inboundType)}
            style={{ margin: '0 3rem 0 0' }}
          >
            Print
          </button>
          <button
            onClick={() => props.setForm(false)}
            className='pageButton'
            style={{ margin: '0 1rem 0 0!important' }}
          >
            Засах
          </button>
          <button
            onClick={() => props.setForm(false)}
            className='pageButton secondary'
            style={{ margin: '0 1rem 0 0!important' }}
          >
            Хаах
          </button>
        </>
      );
    } else {
      renderButtons = (
        <>
          <button
            onClick={() => console.log(from + ' and  ' + inboundType)}
            style={{ margin: '0 3rem 0 0' }}
          >
            Print
          </button>
          <button
            onClick={() => props.setForm(false)}
            className='pageButton secondary'
            style={{ margin: '0 1rem 0 0!important' }}
          >
            Хаах
          </button>
          <button
            onClick={() => confirmRequest()}
            disabled={saving}
            className='pageButton'
          >
            Орлогын хүсэлтийг батлах
          </button>
        </>
      );
    }
  }
  const foo = v => {
    setFrom(v);
  };
  const foobar =
    props.form[1] === 'customer' || props.form[1] === 'warehouse' ? (
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
            id='sendingWarehouse'
            className='custom-select'
            style={{ width: '300px', margin: '0 1rem 0 0' }}
            defaultValue={from}
          >
            <option value=''>--сонгоно уу--</option>
            {type === 'warehouse' ? renderHTMLWarehouses : renderHTMLPartners}
          </select>
        </div>
      </div>
    ) : null;
  const updateTotals = () => {
    setTimeout(() => {
      //foobarblah()
    }, 1000);
  };
  const foobarblah = () => {
    let totalItems = 0;
    let totalProducts = [];

    products.map(prod => {
      totalItems += parseInt(prod.quantity);
      if (totalProducts.indexOf(prod._id) === -1) {
        totalProducts.push(prod._id);
      }
    });
    //document.getElementById('totalItems').innerText = totalItems
    //document.getElementById('totalProducts').innerText = totalProducts.length
  };
  return (
    <>
      <div id='overlaypage_bg'>
        <div id='overlaypage'>
          <div id='overlaypage_header'>
            <h1>{props.form[2]}</h1>
            <div style={{ display: 'flex', width: '1280px' }}>
              {foobar}
              <div style={{ width: '320px' }}>
                <div>
                  <h2>Орлогын төрөл:</h2>ы
                </div>
                <div>
                  <select
                    id='inboundTypes'
                    className='custom-select'
                    style={{ width: '300px', margin: '0 1rem 0 0' }}
                    defaultValue={inboundType}
                  >
                    <option value=''>--сонгоно уу--</option>
                    {renderHTMLInboundTypes}
                  </select>
                </div>
              </div>
              <div style={{ width: '500px' }}>
                <div>
                  <h2>Тэмдэглэл:</h2>
                </div>
                <textarea
                  placeholder='Тэмдэглэл'
                  id='requestNote'
                  style={{ width: '100%' }}
                >
                  {props.form.note ? props.form.note : ''}
                </textarea>
              </div>
            </div>
            <div>
              <div style={{ width: '600px' }}>
                <button
                  style={{ margin: '0 0 0 1rem !important' }}
                  className='pageButton'
                  onClick={() => setProductSelector(true)}
                >
                  Бүтээгдэхүүн нэмэх
                </button>
              </div>
            </div>
          </div>
          <div id='overlaypage_body' style={{ overflow: 'auto' }}>
            <div className='box_header_container' style={{ width: width }}>
              <div
                className='box_header justify_content_center'
                style={{ width: widths[0] }}
              >
                <input type='checkbox' />
              </div>
              <div className='box_header' style={{ width: widths[1] }}>
                Дугаар
              </div>
              <div className='box_header' style={{ width: widths[2] }}>
                IMG
              </div>
              <div className='box_header' style={{ width: widths[3] }}>
                Нэр
              </div>
              <div className='box_header' style={{ width: widths[4] }}>
                Ангилал
              </div>
              <div className='box_header' style={{ width: widths[5] }}>
                Баркод
              </div>
              <div className='box_header' style={{ width: widths[15] }}>
                Хэлбэр
              </div>
              <div className='box_header' style={{ width: widths[6] }}>
                SKU
              </div>
              <div className='box_header' style={{ width: widths[7] }}>
                Татах тоо
              </div>
              <div className='box_header' style={{ width: widths[8] }}>
                Өртөг
              </div>
              <div className='box_header' style={{ width: widths[9] }}>
                Нийт өртөг
              </div>
              <div className='box_header' style={{ width: widths[10] }}>
                Хямдралын хувь
              </div>
              <div className='box_header' style={{ width: widths[10] }}>
                Хямдралын дүн
              </div>
              <div className='box_header' style={{ width: widths[10] }}>
                Төлөх дүн
              </div>
              <div className='box_header' style={{ width: widths[11] }}>
                Зарах үнэ
              </div>
              <div className='box_header' style={{ width: widths[12] }}>
                Сери
              </div>
              <div className='box_header' style={{ width: widths[12] }}>
                Сери +
              </div>
              <div className='box_header' style={{ width: widths[13] }}>
                Дуусах
              </div>
              <div className='box_header' style={{ width: widths[14] }}></div>
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
              <div className='left'></div>
              <div className='right'>{renderButtons}</div>
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
