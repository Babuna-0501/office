import { useState, useContext, useEffect, useRef, useMemo } from 'react';
import { ModuleContext } from '../../index';
import myHeaders from '../../../components/MyHeader/myHeader';
import ProductSelector from '../../ProductSelector';
import { WarehouseContext } from '../../Warehouse';
import readXlsxFile from 'read-excel-file';
import { Space } from 'antd';
import { saveAs } from 'file-saver';

const Form = props => {
  const context = useContext(ModuleContext);
  const whcontext = useContext(WarehouseContext);
  console.log(whcontext);
  console.log(props);
  console.log(props.warehouseId);
  const customers = context.customers;
  const [products, setProducts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState(null);
  const clickHandler = e => {
    if (e.target.getAttribute('data-action')) {
      switch (e.target.getAttribute('data-action')) {
        case 'removeSelectedProduct':
          document.getElementById(e.target.getAttribute('data-id')).remove();
          break;
        case 'addSeries':
          const uid = e.target.getAttribute('data-id');
          const uid2 =
            Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
          const clone = document.getElementById(
            e.target.getAttribute('data-id')
          ).outerHTML;
          document
            .getElementById(e.target.getAttribute('data-id'))
            .insertAdjacentHTML('afterEnd', clone.replaceAll(uid, uid2));
          break;
      }
    }
  };
  const keyDownHandler = e => {
    console.log(e.target.getAttribute('data-action'));
    if (e.target.getAttribute('data-action') === 'changeQuantity') {
      setTimeout(() => {
        document.getElementById(
          'totalCost' + e.target.getAttribute('data-id')
        ).value =
          Number(e.target.value) *
          Number(
            document.getElementById('cost' + e.target.getAttribute('data-id'))
              .value
          );
      }, 1);
    } else if (e.target.getAttribute('data-action') === 'changeCost') {
      setTimeout(() => {
        document.getElementById(
          'totalCost' + e.target.getAttribute('data-id')
        ).value =
          Number(e.target.value) *
          Number(
            document.getElementById(
              'quantity' + e.target.getAttribute('data-id')
            ).value
          );
      }, 1);
    } else if (e.target.getAttribute('data-action') === 'setDiscount') {
      setTimeout(() => {
        if (
          parseFloat(e.target.value) > 0 &&
          parseFloat(e.target.value) < 100
        ) {
          const uid = e.target.getAttribute('data-id');
          const discountAmount = e.target.value;
          const cost = document.getElementById('cost' + uid).value;
          const quantity = document.getElementById('quantity' + uid).value;
          document.getElementById('discountAmount' + uid).value =
            ((parseFloat(cost) * parseFloat(quantity)) / 100) *
            parseFloat(discountAmount);
          document.getElementById('payingAmount' + uid).value =
            cost * quantity -
            ((parseFloat(cost) * parseFloat(quantity)) / 100) *
              parseFloat(discountAmount);
        } else if (parseFloat(e.target.value) > 100) {
          e.target.style.borderColor = 'red';
        }
      }, 1);
    }
  };
  useEffect(() => {
    if (props.form[0] !== 'new') {
      let foo = {};
      whcontext.allProducts.map(product => {
        foo[product._id] = product;
      });

      let bar = props.form.products;
      bar.map((product, index) => {
        const productId = bar[index]['productId'];
        if (foo[productId]) {
          bar[index]['_id'] = productId;
          bar[index]['name'] = foo[productId]['name'];
          bar[index]['image'] = [];
          bar[index]['image'][0] = foo[productId]['image'][0];
          bar[index]['bar_code'] = foo[productId]['bar_code'];
        } else {
          console.warn(
            `Product with productId ${productId} not found in allProducts.`
          );
        }
      });
      addProducts(JSON.parse(JSON.stringify(bar)));
    }

    document.addEventListener('click', clickHandler, false);
    document.addEventListener('keydown', keyDownHandler, false);

    // Орлогын төрөл
    const renderHTMLInboundTypes = [];
    const inboundTypes = context.systemData.shipment.variety.inbound;

    for (const inboundType in inboundTypes) {
      document
        .getElementById('inboundTypes')
        .insertAdjacentHTML(
          'beforeEnd',
          `<option ${
            props.form.variety === inboundType ? ' selected' : ''
          } value=${inboundType}>${inboundTypes[inboundType]}</option>`
        );
    }

    // Агуулах болох харилцагч
    let fromSource = 'import';
    if (
      props.form[1] === 'customer' ||
      props.form[1] === 'warehouse' ||
      props.form.from
    ) {
      document.getElementById('from').insertAdjacentHTML(
        'beforeEnd',
        `
            <div>
                <div>
                    <h2>${
                      type === 'warehouse'
                        ? 'Зарлага гаргах агуулах:'
                        : 'Зарлага гаргах агуулах харилцагч:'
                    }</h2>
                </div>
                <div>
                    <select id="toSelect" class="custom-select" value="${
                      props.form.from
                    }">
                        <option value="">--сонгоно уу--</option>
                    </select>
                </div>
            </div>
        `
      );
      context.warehouseList.map(warehouse => {
        if (warehouse._id === props.form.from) {
          fromSource = 'warehouse';
        }
      });
      customers.map(customer => {
        if (parseInt(customer.tradeshop_id) === parseInt(props.form.from)) {
          fromSource = 'purchase';
        }
      });
    }

    let optionsFrom = '';
    if (props.form[1] === 'customer' || fromSource === 'purchase') {
      customers.map(customer => {
        optionsFrom += `<option value="${customer.tradeshop_id}" ${
          parseInt(customer.tradeshop_id) === parseInt(props.form.from)
            ? ' selected'
            : ''
        }>${customer.customer_name}</option>`;
      });
    } else if (props.form[1] === 'warehouse' || fromSource === 'warehouse') {
      context.warehouseList.map(warehouse => {
        optionsFrom +=
          context.activeWarehouse._id &&
          context.activeWarehouse._id !== warehouse._id
            ? `<option ${
                warehouse._id === props.form.from ? ' selected' : ''
              } value=${warehouse._id}>${warehouse.name}</option>`
            : '';
      });
    }

    if (
      props.form[1] === 'customer' ||
      props.form[1] === 'warehouse' ||
      fromSource === 'warehouse' ||
      fromSource === 'purchase'
    ) {
      document
        .getElementById('toSelect')
        .insertAdjacentHTML('beforeEnd', optionsFrom);
    }

    return () => {
      document.removeEventListener('click', clickHandler, false);
      document.removeEventListener('keypress', keyDownHandler, false);
    };

    if (document.getElementById('massimport')) {
      const input = document.getElementById('massimport');
      input.addEventListener('change', () => {
        readXlsxFile(input.files[0]).then(rows => {
          console.log(rows);
        });
      });
    }
  }, []);

  const [type, setType] = useState(props.form[1]);
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
  const addProducts = selectedProducts => {
    console.log(selectedProducts);
    selectedProducts.map(product => {
      const category = product.category ? product.category : '';
      const uid =
        Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      const productHTML = `
				<div class="blah productEntry" id="${uid}" data-id="${product._id}">
					<div class="blahblah">
						<div class="width40px flexcentered2">
							<span>
								<img src="https://admin.ebazaar.mn/images/remove.svg" alt="" class="width30px removeProduct" data-action="removeSelectedProduct" data-id="${uid}" />
							</span>
						</div>
					</div>
					<div class="blahblah">
						<div class="width120px">
						<p>${product._id}</p>
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						${
              product.image && product.image[0]
                ? `<img src=${product.image[0]} class="width40px" />`
                : ''
            }
					</div></div>
					<div class="blahblah">
						<div class="width300px">
						<p className="product_name">${product.name}</p>
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<p>${category}</p>
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<p>${product.bar_code}</p>
					</div></div>
					<div class="blahblah">
						<div class="width120px">
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<p>${product.sku ? product.sku : ''}</p>
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<input type="number" value="${product.quantity}" id=${
        'quantity' + uid
      } data-id="${uid}" data-action="changeQuantity" />
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<input type="text"  id="${'cost' + uid}" value="${
        product.cost
      }" data-id="${uid}" data-action="changeCost" />
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<input type="text" id=${'totalCost' + uid} disabled />
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<input type="number" id=${'discount' + uid} value="${
        product.discount ? product.discount : ''
      }" data-action="setDiscount" data-id="${uid}" />
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<input type="text"  id=${'discountAmount' + uid} value="${
        product.discount ? product.discount : ''
      }" disabled data-id="${uid}" />
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<input type="text"  id=${'payingAmount' + uid} value="${
        product.discount ? product.discount : ''
      }" disabled data-id="${uid}" />
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<input type="text" value="${
              product.sellPrice ? product.sellPrice.retail : ''
            }" id="${'sellprice' + uid}" />
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<input type="text"  value="${
              product.seriesNumber ? product.seriesNumber : ''
            }" id="${'series' + uid}" />
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<button class="pageButton small addSeries" data-action="addSeries" data-id="${uid}">+ Сери</button>
					</div></div>
					<div class="blahblah">
						<div class="width120px">
						<input type="date" />
					</div></div>
				</div>
			`;
      document
        .getElementById('productList')
        .insertAdjacentHTML('beforeEnd', productHTML);
    });
    setProductSelector(false);
  };

  const send = () => {
    console.log('sending');
    let foo = [];
    const productEntries = document.querySelectorAll('.productEntry');
    for (let i = 0; i < productEntries.length; i++) {
      console.log(productEntries[i]);
      const product = productEntries[i];
      const uid = product.getAttribute('id');
      console.log(uid);
      let __temp = {
        productId: parseInt(product.getAttribute('data-id')),
        quantity: parseFloat(product.querySelector('#quantity' + uid).value),
        cost: parseInt(
          product.querySelector('#cost' + uid).value !== ''
            ? product.querySelector('#cost' + uid).value
            : 1
        ),
        sellPrice: {
          retail: parseInt(product.querySelector('#sellprice' + uid).value),
          wholesale: 0
        }
      };
      if (
        product.querySelector('#series' + uid).value &&
        product.querySelector('#series' + uid).value !== ''
      ) {
        __temp['seriesNumber'] = product.querySelector('#series' + uid).value;
      }
      console.log(__temp);
      foo.push(__temp);
    }
    console.log(foo);
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
      sendData['from'] = document.getElementById('toSelect').value;
    }
    console.log(sendData);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(sendData)
    };
    setSaving(true);
    const url = `${process.env.REACT_APP_API_URL2}/api/shipment`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        if (response.message === 'success') {
          alert('Амжилттай илгээлээ!');
          props.sentRequest();
          props.foobar(props.ognoo);
          props.setForm(false);
          setSaving(false);
        } else {
          alert('Оруулсан мэдээллээ шалгана уу.');
          setSaving(false);
        }
      });
  };

  const confirmRequest = () => {
    console.log('confirmgin');
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
    setSaving(true);
    const url = `${process.env.REACT_APP_API_URL2}/api/shipment`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        console.log(response);
        if (response.message === 'success') {
          alert('Хүсэлтийг баталлаа!');
          props.sentRequest();
          setSaving(true);
          props.setForm(false);
        } else if (response.message === 'Products with insufficient stock') {
          alert(JSON.stringify(response.data) + ' Үлдэгдэл хүрэлцэхгүй байна!');
          setSaving(false);
        }
      });
  };

  //excel
  const download = async () => {
    try {
      const shipmentId = '665d19375b60efdf3c9e3dd8';
      const url = `${process.env.REACT_APP_API_URL2}/api/shipment/receipt?shipmentId=${shipmentId}`;
      // const url = `http://172.16.193.18/api/shipment/receipt?shipmentId=${shipmentId}`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      // if (!contentType || !contentType.includes('application/pdf')) {
      // 	throw new Error('Response is not a PDF');
      // }

      const blob = await response.blob();
      saveAs(blob, 'shipment_receipt.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const saveUpdate = () => {
    console.log('saving update');
  };
  let renderButtons = null;
  if (props.form[0] === 'new') {
    renderButtons = (
      <>
        <button onClick={() => send()} className='pageButton' disabled={saving}>
          Орлогын хүсэлт илгээх
        </button>
      </>
    );
  } else {
    if (props.warehouseId === props.form.owner) {
      renderButtons = (
        <>
          <button
            onClick={() => download()}
            disabled={saving}
            className='pageButton secondary'
            style={{ margin: '0 1rem 0 0' }}
          >
            Download
          </button>
          <button
            onClick={() => confirmRequest()}
            disabled={saving}
            className='pageButton'
            style={{ margin: '0 1rem 0 0' }}
          >
            {' '}
            Орлогын хүсэлтийг батлах
          </button>
        </>
      );
    }
    /*if(props.warehouseId === props.form.owner) {
			if(props.form.status === 1 && mode !== 'edit') {
				renderButtons = (
					<>
						<button onClick={() => edit()} className="pageButton secondary" style={{margin: '0 1rem 0 0!important'}}>Орлогын хүсэлт засах</button>
						<button onClick={() => confirmRequest()} disabled={saving} className="pageButton">Орлогын хүсэлтийг батлах</button>
					</>
				)
			} else if(props.form.status === 1 && mode === 'edit') {
				renderButtons = (
					<>
						<button onClick={() => saveUpdate()} className="pageButton" style={{margin: '0 1rem 0 0!important'}}>Засварыг хадгалах</button>
					</>
				)
			}
		} else {
			if(props.form.status === 2) {
				renderButtons = (
					<>
						<button onClick={() => confirmRequest()} disabled={saving} className="pageButton">Орлогын хүсэлтийг батлах</button>
					</>
				)
			}
		}*/
  }
  const edit = () => {
    document
      .getElementById('container-modal-contents')
      .classList.remove('disabledForm');
    setMode('edit');
  };
  const foobar = e => {
    /*
		let bar = props.form.products
		bar.map((product, index) => {
			bar[index]['_id'] = bar[index]['productId']
			bar[index]['name'] = foo[bar[index]['productId']]['name']
			bar[index]['image'] = []
			bar[index]['image'][0] = foo[bar[index]['productId']]['image'][0]
			bar[index]['bar_code'] = foo[bar[index]['productId']]['bar_code']
		})*/
    let foo = {};
    whcontext.allProducts.map(product => {
      foo[product._id] = product;
    });
    readXlsxFile(e.target.files[0]).then(rows => {
      let counter = 0;
      let temp = [];
      rows.map(row => {
        if (counter > 0 && foo[row[0]]) {
          const productInfo = foo[row[0]];
          console.log(productInfo['image'][0]);
          temp.push({
            _id: row[0],
            quantity: row[3],
            seriesNumber: row[1],
            sellPrice: {
              retail: row[4],
              wholesale: 0
            },
            name: productInfo['name'],
            image: [productInfo['image'][0]],
            bar_code: productInfo['bar_code'],
            cost: row[2]
          });
        }
        counter++;
      });
      addProducts(JSON.parse(JSON.stringify(temp)));
    });
  };
  return (
    <>
      <div className='container-modal' id='container-modal'>
        <div
          className={
            'container-modal-contents' +
            (props.form.status === 1 || props.form.status === 2
              ? ' disabledForm'
              : '')
          }
          id='container-modal-contents'
        >
          <div
            className='left padding2rem'
            style={{ width: '400px', background: '#f6f6f6' }}
          >
            <h1>{props.form[2]}</h1>
            <div>
              <div id='from'></div>
              <div>
                <div>
                  <h2>Орлогын төрөл:</h2>
                </div>
                <div>
                  <select id='inboundTypes' className='custom-select'>
                    <option value=''>--сонгоно уу--</option>
                  </select>
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <div>
                  <h2>Тэмдэглэл:</h2>
                </div>
                <textarea
                  placeholder='Тэмдэглэл'
                  id='requestNote'
                  style={{ width: '100%', height: '300px' }}
                >
                  {props.form.note ? props.form.note : ''}
                </textarea>
              </div>
            </div>
            <div>
              <div style={{ width: '600px' }}></div>
            </div>
          </div>
          <div
            className='right padding2rem'
            style={{ left: '400px', overflow: 'auto' }}
          >
            <div>
              <button
                className='pageButton addProduct'
                onClick={() => setProductSelector(true)}
              >
                Бүтээгдэхүүн нэмэх
              </button>
              <input
                type='file'
                className='marginleft1rem'
                id='massimport'
                onChange={e => foobar(e)}
                style={{ width: '200px' }}
              />
            </div>
            <div style={{ border: '1px solid #eee' }} id='productList'>
              <div className='blah' style={{ background: '#f6f6f6' }}>
                <div className='blahblah'>
                  <div className='width40px'></div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Дугаар</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>IMG</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width300px'>
                    <p>Нэр</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Ангилал</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Баркод</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Хэлбэр</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>SKU</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Татах тоо</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Өртөг</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Нийт өртөг</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Хямдралын хувь</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Хямдралын дүн</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Төлөх дүн</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Зарах үнэ</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Сери</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Сери +</p>
                  </div>
                </div>
                <div className='blahblah'>
                  <div className='width120px'>
                    <p>Дуусах</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='overlaypage_footer' style={{ background: 'white' }}>
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
        <div className='container-modal-bg'></div>
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
