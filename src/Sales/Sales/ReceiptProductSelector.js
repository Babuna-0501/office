import { useEffect, useState } from 'react';
import { replaceImageUrl } from '../../utils';

const ReceiptProductSelector = props => {
  const data = props.data;
  let renderHTML = [];
  const width = [50, 180, 300, 180, 180, 180, 100];
  const totalWidth =
    width.reduce((accumulator, currentValue) => accumulator + currentValue, 0) +
    100;
  const [selectedProduct, setSelectedProduct] = useState(null);
  props.products.map(product => {
    if (product.emdData && product.emdData.packGroup === data.packGroup) {
      const price = parseInt(product.series[0].sellPrice.retail);
      const emdPrice = parseInt(product.emdData.tbltUnitPrice);
      const emdDiscount = parseInt(product.emdData.tbltUnitDisAmt);
      let customerPrice = price <= emdPrice ? price : emdPrice;
      let temp = JSON.parse(JSON.stringify(product));
      temp.series[0].sellPrice.retail = customerPrice - emdDiscount;
      temp.emdDiscountSale = true;
      renderHTML.push(
        <div
          style={{ width: totalWidth + 'px' }}
          class={
            selectedProduct && selectedProduct._id === product._id
              ? 'selected emdProduct box_container'
              : 'emdProduct box_container'
          }
          onClick={() => setSelectedProduct(temp)}
        >
          <div className='box' style={{ width: width[0] }}>
            <img
              src={replaceImageUrl(product.image[0])}
              style={{ width: '40px', height: '40px' }}
              alt=''
            />
          </div>
          <div className='box' style={{ width: width[1] }}>
            {product.bar_code}
          </div>
          <div className='box_' style={{ width: width[2] }}>
            {product.name}
          </div>
          <div className='box' style={{ width: width[3] }}>
            {product.stock}
          </div>
          <div className='box' style={{ width: width[4] }}>
            {product.series[0].sellPrice.retail}
          </div>
          <div className='box' style={{ width: width[5] }}>
            {product.emdData.tbltUnitPrice}
          </div>
          <div className='box' style={{ width: width[6] }}>
            {product.emdData.tbltUnitDisAmt}
          </div>
          <div className='box' style={{ width: width[6] }}>
            {customerPrice - emdDiscount}
          </div>
        </div>
      );
    }
  });
  const selectProduct = prod => {
    props.addProduct(prod);
    props.setReceiptProductSelector(false);
  };
  return (
    <>
      <div id='container_productselector'>
        <div id='productselector' style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex' }}>
            <h1>{data.tbltName}</h1>
            <span
              className='pageClose'
              onClick={() => props.setReceiptProductSelector(false)}
            >
              <img src='/images/close.svg' alt='' />
            </span>
          </div>
          <div
            className='box_header_container'
            style={{ width: totalWidth + 'px' }}
          >
            <div className='box_header' style={{ width: width[0] }}>
              Зураг
            </div>
            <div className='box_header' style={{ width: width[1] }}>
              Баркод
            </div>
            <div className='box_header' style={{ width: width[2] }}>
              Нэр
            </div>
            <div className='box_header' style={{ width: width[3] }}>
              Агуулахын үлдэгдэл
            </div>
            <div className='box_header' style={{ width: width[4] }}>
              Үнэ
            </div>
            <div className='box_header' style={{ width: width[5] }}>
              ЭМД дээд үнэ
            </div>
            <div className='box_header' style={{ width: width[6] }}>
              Хөнгөлөлт
            </div>
            <div className='box_header' style={{ width: width[6] }}>
              Хэрэглэгчээс
            </div>
          </div>
          {renderHTML}
          <div className='containerButtons'>
            <button
              className='pageButton'
              onClick={() => selectProduct(selectedProduct)}
            >
              Сонгох
            </button>
          </div>
        </div>
      </div>
      <div id='productselector_bg'></div>
    </>
  );
};

export default ReceiptProductSelector;
