import { useState, useContext, useEffect, useRef, useMemo } from 'react';
import { ModuleContext } from '../../index';
import myHeaders from '../../../components/MyHeader/myHeader';
import ProductSelector from '../../ProductSelector';
import { WarehouseContext } from '../../Warehouse';
import { replaceImageUrl } from '../../../utils';
import { emHanganForm, subCategory  } from '../../../ProductsNew/data';

const Form = props => {

  const context = useContext(ModuleContext);
  const whcontext = useContext(WarehouseContext);
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
      console.log(bar);
      bar.map((product, index) => {
        bar[index]['_id'] = bar[index]['productId'];
        bar[index]['name'] = foo[bar[index]['productId']]['name'];
        bar[index]['image'] = [];
        bar[index]['image'][0] = foo[bar[index]['productId']]['image'][0];
        bar[index]['bar_code'] = foo[bar[index]['productId']]['bar_code'];
      });
      addProducts(JSON.parse(JSON.stringify(bar)));
    }
    document.addEventListener('click', clickHandler, false);
    document.addEventListener('keydown', keyDownHandler, false);
    // Орлогын төрөл
    const renderHTMLOutboundTypes = [];
    const outboundTypes = context.systemData.shipment.variety.outbound;
    console.log(context);
    for (const outboundType in outboundTypes) {
      console.log(props.form.variety);
      console.log(outboundType);
      document
        .getElementById('outboundTypes')
        .insertAdjacentHTML(
          'beforeEnd',
          `<option ${
            props.form.variety === outboundType ? ' selected' : ''
          } value=${outboundType}>${outboundTypes[outboundType]}</option>`
        );
    }
    // Агуулах болох харилцагч
    console.log(typeof props.form.from);
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
                : 'Зарлага гаргах харилцагч:'
            }</h2>
					</div>
					<div>
						<select id="fromSelect" class="custom-select" value="${props.form.from}">
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
    //  Агуулах болох харилцагч сонголт
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
    //  Агуулах болох харилцагч сонголтыг нэмэх
    if (
      props.form[1] === 'customer' ||
      props.form[1] === 'warehouse' ||
      fromSource === 'warehouse' ||
      fromSource === 'purchase'
    ) {
      document
        .getElementById('fromSelect')
        .insertAdjacentHTML('beforeEnd', optionsFrom);
    }
    return () => {
      document.removeEventListener('click', clickHandler, false);
      document.removeEventListener('keypress', keyDownHandler, false);
    };
  }, []);
  const [type, setType] = useState(props.form[1]);
  const [from, setFrom] = useState(props.form.from ? props.form.from : '');
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
  const widths = [
    80, 100, 60, 240, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120,
    120, 120, 120, 120, 120
  ];
  let width = 0;
  for (const size in widths) {
    width += widths[size];
  }
  async function getSeries(selectedProducts) {
    console.log('async');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const productIDs = selectedProducts.map(
      selectedProduct => selectedProduct._id
    );
    console.log(JSON.stringify(productIDs));
    selectedProducts.map(selectedProduct => {
      console.log(selectedProduct);
      let url = `${
        process.env.REACT_APP_API_URL2
      }/api/warehouse_series/get?productIds=${JSON.stringify(
        productIDs
      )}&warehouseId=${context.activeWarehouse._id}`;
      fetch(url, requestOptions)
        .then(r => r.json())
        .then(response => {
          if (response.success === true) {
            return true;
          }
        });
    });
  }
  async function addProducts(selectedProducts) {
    //const productSeries = await getSeries(selectedProducts)
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const productIDs = selectedProducts.map(
      selectedProduct => selectedProduct._id
    );
    let url = `${process.env.REACT_APP_API_URL2}/api/warehouse_series/get?productIds=${JSON.stringify(productIDs)}&warehouseId=${context.activeWarehouse._id}`;
    let productSeriesData = await fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        if (response.success === true) {
          return response.data;
        }
      });
    selectedProducts.map(product => {
      let availableSeries = [];
      productSeriesData.map(ps => {
        if (ps.productId === product._id) {
          availableSeries.push({
            seriesNumber: ps.seriesNumber,
            seriesQuantity: ps.quantity
          });
        }
      });
      let seriesHTML = '';
      availableSeries.map(seriesInfo => {
        seriesHTML += `<option value="${seriesInfo.seriesNumber}" ${
          product.seriesNumber === seriesInfo.seriesNumber ? ' selected' : ''
        }>${
          seriesInfo.seriesQuantity + ' - ' + seriesInfo.seriesNumber
        }</option>`;
      });
      const category = product.category ? product.category : '';

      let retailPrice = null;

      if (!product || !product._id) {
        return <p>no info.</p>;
      }
      
      for (let i = 0; i < props.data.length; i++) {
        const shipment = props.data[i];
      
        for (let j = 0; j < shipment.products.length; j++) {
          const currentProduct = shipment.products[j];
      
          if (currentProduct.productId === product._id) {
            if (currentProduct.sellPrice && currentProduct.sellPrice.retail !== undefined) {
              retailPrice = currentProduct.sellPrice.retail;
            } else {
              retailPrice = "";
            }
            break;
          }
        }
      
        if (retailPrice !== null) break;
      }
       
      const uid =
        Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      
      console.log(context.companyId === '|14010|')

      const productHTML = `
				<div class="box_container box_warehouse_nugan productEntry" id="${uid}" data-id="${product._id}">
					<div class="box_header width50px" >
						<span>
							<img src="/images/remove.svg" alt="" class="width30px removeProduct" data-action="removeSelectedProduct" data-id="${uid}" />
						</span>
					</div>
					<div class="box_header width120px">
						<p>${product._id}</p>
					</div>
				  <div class="box_header width120px">
						${product.image && product.image[0] ? `<img src=${product.image[0]} class="width40px" />` : ''}
					</div>
					<div class="box_header width300px">
						<p className="product_name">${product.name}</p>
					</div>
        	<div class="box_header width120px">
						<p className="product_name">${category}</p>
					</div>
					<div class="box_header width120px">
						<p>${product.bar_code}</p>
					</div>
          ${context.companyId === '|14010|' ? `
            <div class="box_header width120px">
              <p></p>
            </div>
          ` : ''}
          ${context.companyId !== '|14010|' ? `
            <div class="box_header width120px">
              <p>${product.sku ? product.sku : ''}</p>
            </div>
          ` : ''}
          ${context.companyId === '|14010|' ? `
            <div class="box_header width120px">
              <select id=${
                'series' + uid
              } data-id="${uid}"><option></option>${seriesHTML}</select>
            </div>
         ` : ''}
					<div class="box_header width120px">
						<input type="number" value="${product.quantity}" id=${'quantity' + uid} data-id="${uid}" data-action="changeQuantity" />
					</div>
          ${context.companyId === '|14010|' ? `
            <div class="box_header width120px">
              <input type="text"  id="${'cost' + uid}" value="${retailPrice}" data-id="${uid}" data-action="changeCost" />
            </div>
          ` : ''}
          ${context.companyId === '|14010|' ? `
            <div class="box_header width120px">
              <input type="text" id=${'totalCost' + uid} disabled />
            </div>
          ` : ''}
					<div class="box_header width120px">
						<input type="number" id=${'discount' + uid} value="${product.discount ? product.discount : ''}" data-action="setDiscount" data-id="${uid}" />
					</div>
					<div class="box_header width120px">
						<input type="text"  id=${'discountAmount' + uid} value="${product.discount ? product.discount : ''}" disabled data-id="${uid}" />
					</div>
					<div class="box_header width120px">
						<input type="text"  id=${'payingAmount' + uid} value="${product.discount ? product.discount : ''}" disabled data-id="${uid}" />
					</div>
          ${context.companyId === '|14010|' ? `
            <div class="box_header width120px">
              <input type="text" value="${
                product.sellPrice ? product.sellPrice.retail : ''
              }" id="${'sellprice' + uid}" />
            </div>
          ` : ''}
					<div class="box_header width120px">
						<button class="pageButton small addSeries" data-action="addSeries" data-id="${uid}">+ Сери</button>
					</div>
   
					<div class="box_header width120px">
						<input type="date" />
					</div>
				</div>
			`;
      document
        .getElementById('productList')
        .insertAdjacentHTML('beforeEnd', productHTML);
    });
    setProductSelector(false);
  }
  
  const send = async () => {
    if (saving) {
      alert('Түр хүлээнэ үү');
      return;
    }
  
    const borderColor = document.getElementById('outboundTypes').style.borderColor;
    const fromSelectValue = document.getElementById('fromSelect').value;
    const outboundTypesValue = document.getElementById('outboundTypes').value;
    const requestNoteValue = document.getElementById('requestNote').value;
  
    if (type !== 'import' && fromSelectValue === '') {
      document.getElementById('fromSelect').style.borderColor = 'red';
      setTimeout(() => {
        document.getElementById('fromSelect').style.borderColor = borderColor;
      }, 2000);
      return;
    } else if (outboundTypesValue === '') {
      document.getElementById('outboundTypes').style.borderColor = 'red';
      setTimeout(() => {
        document.getElementById('outboundTypes').style.borderColor = borderColor;
      }, 2000);
      return;
    } else if (requestNoteValue === '') {
      document.getElementById('requestNote').style.borderColor = 'red';
      setTimeout(() => {
        document.getElementById('requestNote').style.borderColor = borderColor;
      }, 2000);
      return;
    } else if (document.querySelectorAll('.productEntry').length === 0) {
      alert('Бүтээгдэхүүн сонгоно уу!');
      return;
    }
  
    console.log('sending');
    let foo = [];
    const productEntries = document.querySelectorAll('.productEntry');
  
    productEntries.forEach(product => {
      const uid = product.getAttribute('id');
      const quantity = parseFloat(product.querySelector(`#quantity${uid}`).value);
      const costElement = product.querySelector(`#cost${uid}`);
      const cost = parseInt(costElement?.value) || 0;
      const sellPriceElement = product.querySelector(`#sellprice${uid}`);
      const sellPriceRetail = parseInt(sellPriceElement?.value) || 0;

      const seriesElement = product.querySelector(`#series${uid}`);
      const seriesNumber = seriesElement?.value || '';

      let __temp = {
        productId: parseInt(product.getAttribute('data-id')),
        quantity: parseFloat(product.querySelector(`#quantity${uid}`).value),
        // cost: parseInt(product.querySelector(`#cost${uid}`).value),
        // sellPrice: {
        //   retail: parseInt(product.querySelector(`#sellprice${uid}`).value),
        //   wholesale: 0
        // }
      };

      
      if (cost !== 0 && cost !== null) {
        __temp.cost = cost;
      }

    
      if ((sellPriceRetail !== 0 && sellPriceRetail !== null)) {
          __temp.sellPrice = {
              retail: sellPriceRetail,
              wholesale: 0, 
          };
      }

      if (seriesNumber) {
          __temp['seriesNumber'] = seriesNumber;
      }

    
  
      
      // if (seriesValue) {
      //   __temp['seriesNumber'] = seriesValue;
      // }
  
      foo.push(__temp);
    });
  
    console.log(foo);
  
    let sendData = {
      supplierId: context.activeWarehouse.supplierId,
      documentId: 'none',
      type: 2,
      variety: outboundTypesValue,
      note: requestNoteValue,
      products: foo,
      from: context.activeWarehouse._id,
      thirdParty: type !== 'warehouse' && type !== 'import'
    };
  
    if (type !== 'import') {
      sendData['to'] = fromSelectValue;
    }
  
    console.log(sendData);
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(sendData)
    };
  
    setSaving(true);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL2}/api/shipment`, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response Data:', data);
  
      if (data.success) {
        alert(data.message); 
        props.sentRequest();
        props.foobar(props.ognoo);
        props.setFormZarlaga(false);
      } else {
        
        alert('Тодорхойгүй хариу ирлээ!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Та мэдээллээ бүрэн оруулна уу! ' + error.message);
    } finally {
      setSaving(false);
    }
  };
  
  const confirmRequest = () => {
    let sendData = {
      _id: props.form._id,
      status: 2,
    };
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(sendData),
    };
    setSaving(true);
    const url = `${process.env.REACT_APP_API_URL2}/api/shipment`;
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        if (response.message === 'Амжилттай' || response.message === 'success') {
          alert('Хүсэлтийг баталлаа!');
          props.sentRequest();
          setSaving(true);
          props.setFormZarlaga(false);
        } else if (
          response.message === 'Products with insufficient stock' ||
          response.message === 'Үлдэгдэл хүрэлцсэнгүй.'
        ) {
          alert(JSON.stringify(response.data) + ' Үлдэгдэл хүрэлцэхгүй байна!');
          setSaving(false);
        }
      });
  };
  
  const saveUpdate = () => {
    console.log('saving update');
  };
  let renderButtons = null;
  if (props.form[0] === 'new') {
    renderButtons = (
      <>
        <button onClick={() => send()} className='pageButton' disabled={saving}>
          Илгээх
        </button>
      </>
    );
  } else {
    if (props.warehouseId === props.form.owner) {
      renderButtons = (
        <>
          <button
            onClick={() => confirmRequest()}
            disabled={saving}
            className='pageButton'
          >
            Зарлагын хүсэлтийг батлах
          </button>
        </>
      );
    } else {
    }
    /*if(props.form.status === 1 && mode !== 'edit') {
			renderButtons = (
				<>
					<button onClick={() => edit()} className="pageButton" style={{margin: '0 1rem 0 0!important'}}>Зарлагын хүсэлт засах</button>
				</>
			)
		} else if(props.form.status === 1 && mode === 'edit') {
			renderButtons = (
				<>
					<button onClick={() => saveUpdate()} className="pageButton" style={{margin: '0 1rem 0 0!important'}}>Засварыг хадгалах</button>
				</>
			)
		} else if(props.form.status === 2) {
			renderButtons = (
				<>
					<button onClick={() => confirmRequest()} disabled={saving} className="pageButton">Зарлагын хүсэлтийг батлах</button>
				</>
			)
		}*/
  }
  const edit = () => {
    document
      .getElementById('container-modal-contents')
      .classList.remove('disabledForm');
    setMode('edit');
  };
  return (
    <>
      <div className='container-modal' id='container-modal'>
        <div
          className={
            'container-modal-contents' +
            (props.form.status === 1 ? ' disabledForm' : '')
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
                  <h2>Зарлагын төрөл:</h2>
                </div>
                <div>
                  <select id='outboundTypes' className='custom-select'>
                    <option value=''>--сонгоно уу--</option>
                    {
                      //renderHTMLInboundTypes
                    }
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
            </div>
            <div
              style={{ border: '1px solid #eee' }}
              className='margintop1rem'
              id='productList'
            >
              <div
                className='box_header_container'
                style={{ width: '4000px', background: '#f6f6f6' }}
              >
                <div className='width50px box_header justify_content_center'></div>
                <div className='width120px box_header'>Дугаар</div>
                <div className='width120px box_header'>IMG</div>
                <div className='width300px box_header'>Нэр</div>
                <div className='width120px box_header'>Ангилал</div>
                <div className='width120px box_header'>Баркод</div>
                { context.companyId === '|14010|' && 
                  <div className='width120px box_header'>Хэлбэр</div>
                }
                { context.companyId !== '|14010|' && 
                  <div className='width120px box_header'>SKU</div>
                }
                { context.companyId === '|14010|' && 
                  <div className='width120px box_header'>Сери</div>
                }
                  <div className='width120px box_header'>Татах тоо</div>
                { context.companyId === '|14010|' && 
                  <div className='width120px box_header'>Өртөг</div>
                }
                { context.companyId === '|14010|' && 
                  <div className='width120px box_header'>Нийт өртөг</div>
                }
                <div className='width120px box_header'>Хямдралын хувь</div>
                <div className='width120px box_header'>Хямдралын дүн</div>
                <div className='width120px box_header'>Төлөх дүн</div>
                { context.companyId === '|14010|' && 
                  <div className='width120px box_header'>Зарах үнэ</div>
                }
                <div className='width120px box_header'>Сери +</div>
                <div className='width120px box_header'>Дуусах</div>
              </div>
            </div>
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
              props.in ? props.setInForm(false) : props.setFormZarlaga(false)
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