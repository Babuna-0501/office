import { useState, useContext, useEffect } from 'react';
import { ModuleContext } from './index';
import { WarehouseContext } from './Warehouse';
import myHeaders from '../components/MyHeader/myHeader';
import { replaceImageUrl } from '../utils';

const ProductSelector = props => {
  const context = useContext(ModuleContext);
  const whcontext = useContext(WarehouseContext);
  const [products, setProducts] = useState(whcontext.allProducts);
  const [productsBeforeFilter, setProductsBeforeFilter] = useState(
    whcontext.products
  );
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterBarcode, setFilterBarcode] = useState(null);
  const [filterId, setFilterId] = useState(null);
  const [filterName, setFilterName] = useState(null);
  const title = props.in ? 'Татан авалтын хүсэлт' : 'Зарлага';
  const addProduct = data => {
    data.quantity = 1;
    data.uid =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    data.sellPrice = { retail: 0, wholesale: 0 };
    data.cost = 0;
    if (JSON.stringify(props.products).search(data._id) !== -1) {
      return;
    } else if (JSON.stringify(selectedProducts).search(data._id) !== -1) {
      return;
    }
    setSelectedProducts([...selectedProducts, data]);
  };
  const removeProduct = data => {
    console.log('remvoing');
    selectedProducts.map((prod, index) => {
      if (prod._id === data._id) {
        selectedProducts.splice(index, 1);
      }
    });
    setSelectedProducts([...selectedProducts]);
  };
  let renderHTML = [];
  const widths = [80, 52, 200, 120, 120, 80];
  const width = widths.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  let counter = 0;
  if (products) {
    products.map(product => {
      let fn = addProduct;
      let show = true;
      let title = 'Нэмэх';
      if (filterBarcode && filterBarcode !== '') {
        if (!product.bar_code.includes(filterBarcode)) {
          show = false;
        }
      }
      if (filterId && filterId !== '') {
        if (!product._id.toString().includes(filterId)) {
          show = false;
        }
      }
      if (filterName && filterName !== '') {
        if (!product.name.toLowerCase().includes(filterName.toLowerCase())) {
          show = false;
        }
      }
      selectedProducts.map(prod => {
        if (prod._id === product._id) {
          fn = removeProduct;
          title = 'Хасах';
        }
      });
      if (show) {
        renderHTML.push(
          <div className='box_container' style={{ width: width }}>
            <div className='box' style={{ width: `${widths[5]}px` }}>
              <button
                className='pageButton small'
                style={{
                  padding: '0 .5rem',
                  fontSize: '.75rem',
                  background: title === 'Нэмэх' ? '' : '#ccc'
                }}
                onClick={() => fn(product)}
              >
                {title}
              </button>
            </div>
            <div className='box' style={{ width: `${widths[0]}px` }}>
              <p>{product._id}</p>
            </div>
            <div className='box' style={{ width: `${widths[1]}px` }}>
              <img
                src={replaceImageUrl(product.image)}
                alt=''
                style={{ height: '34px', width: '34px' }}
              />
            </div>
            <div className='box' style={{ width: `${widths[2]}px` }}>
              <p>{product.name}</p>
            </div>
            <div className='box' style={{ width: `${widths[3]}px` }}>
              <p>{product.category}</p>
            </div>
            <div className='box' style={{ width: `${widths[4]}px` }}>
              <p>{product.bar_code}</p>
            </div>
          </div>
        );
      }
    });
  }
  let renderHTMLSelectedProducts = [];
  selectedProducts.map(product => {
    renderHTMLSelectedProducts.push(
      <div
        className='box_container'
        style={{ width: width }}
        key={Math.random()}
      >
        <div className='box' style={{ width: `${widths[5]}px` }}></div>
        <div className='box' style={{ width: `${widths[0]}px` }}>
          <p>{product._id}</p>
        </div>
        <div className='box' style={{ width: `${widths[1]}px` }}>
          <img
            src={replaceImageUrl(product.image)}
            style={{ height: '40px', width: '40px' }}
            alt=''
          />
        </div>
        <div className='box' style={{ width: `${widths[2]}px` }}>
          <p>{product.name}</p>
        </div>
        <div className='box' style={{ width: `${widths[3]}px` }}>
          <p>{product.category}</p>
        </div>
        <div className='box' style={{ width: `${widths[4]}px` }}>
          <p>{product.barcode}</p>
        </div>
      </div>
    );
  });
  const searchById = q => {
    console.log(q);
  };
  return (
    <>
      <div id='container_productselector'>
        <div id='productselector'>
          <div className='left'>
            <div className='top'>
              <h1>Бүтээгдэхүүн сонгоно уу:</h1>
            </div>
            <div className='list-header'>
              <div className='box_header_container' style={{ width: width }}>
                <div className='box' style={{ width: `${widths[0]}px` }}>
                  <p>Дугаар</p>
                  <input
                    type='text'
                    onKeyUp={e => setFilterId(e.target.value)}
                  />
                </div>
                <div className='box' style={{ width: `${widths[1]}px` }}>
                  <p>IMG</p>
                </div>
                <div className='box' style={{ width: `${widths[2]}px` }}>
                  <p>Нэр</p>
                  <input
                    type='text'
                    onKeyUp={e => setFilterName(e.target.value)}
                  />
                </div>
                <div className='box' style={{ width: `${widths[3]}px` }}>
                  <p>Ангилал</p>
                  <select>
                    <option value='-- ангилал сонгоно уу'></option>
                  </select>
                </div>
                <div className='box' style={{ width: `${widths[3]}px` }}>
                  <p>Хэлбэр</p>
                  <select>
                    <option value='-- хэлбэр сонгоно уу'></option>
                  </select>
                </div>
                <div className='box' style={{ width: `${widths[4]}px` }}>
                  <p>Баркод</p>
                  <input
                    type='text'
                    onKeyUp={e => setFilterBarcode(e.target.value)}
                  />
                </div>
                <div className='box' style={{ width: `${widths[5]}px` }}></div>
              </div>
            </div>
            <div className='allproducts'>
              {products ? renderHTML : <div>Түр хүлээнэ үү..</div>}
            </div>
          </div>
          <div className='right'>
            <div className='top'>
              <h1>Сонгосон бүтээгдэхүүн</h1>
            </div>
            <div className='list-header'>
              <div className='box_header_container' style={{ width: width }}>
                <div className='box' style={{ width: `${widths[0]}px` }}>
                  <p>Дугаар</p>
                </div>
                <div className='box' style={{ width: `${widths[1]}px` }}>
                  <p>IMG</p>
                </div>
                <div className='box' style={{ width: `${widths[2]}px` }}>
                  <p>Нэр</p>
                </div>
                <div className='box' style={{ width: `${widths[3]}px` }}>
                  <p>Ангилал</p>
                </div>
                <div className='box' style={{ width: `${widths[4]}px` }}>
                  <p>Баркод</p>
                </div>
                <div className='box' style={{ width: `${widths[5]}px` }}></div>
              </div>
            </div>
            <div
              className='selectedproducts'
              style={{
                position: 'absolute',
                top: '120px',
                right: '0px',
                bottom: '100px',
                left: '0'
              }}
            >
              {selectedProducts.length === 0 ? (
                <p>Бүтээгдэхүүний жагсаалтаас сонгож оруулна уу.</p>
              ) : (
                renderHTMLSelectedProducts
              )}
            </div>
            <div className='bottom'>
              <button
                onClick={() => props.setProductSelector(false)}
                class='button secondary large'
                style={{ background: 'white' }}
              >
                Цуцлах
              </button>
              <button
                class='button primary large'
                onClick={() => props.addProducts(selectedProducts)}
              >
                Нэмэх
              </button>
            </div>
          </div>
          <div
            className='close'
            onClick={() => props.setProductSelector(false)}
          >
            Хаах
          </div>
        </div>
      </div>
      <div id='productselector_bg'></div>
    </>
  );
};

export default ProductSelector;
