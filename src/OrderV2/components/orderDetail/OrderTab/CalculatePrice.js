import EditInput from '../../editInput/EditInput';
import { formatNumber } from '../utils';

function CalculatePrice({ product, color, changePrice, changedOrder }) {
  return (
    <div>
      {color && (
        <p className={`font-size10 ${color}`}>
          {color === 'color-red' ? 'Өөрчлөгдсөн захиалга' : 'Анхны захиалга'}
        </p>
      )}
      <div className='order-tab-product-item-info-price'>
        {changedOrder.show && product.product_id === changedOrder.product_id ? (
          <EditInput value={changedOrder.price} onChange={changePrice} />
        ) : (
          <span className={`font-size14 ${color}`}>
            {formatNumber(product.price)}₮
          </span>
        )}

        <span className={`font-size14 ${color}`}>x</span>
        <span className={`font-size14 ${color}`}>
          {formatNumber(product.quantity)}
        </span>
        <span className={`font-size14 ${color}`}>=</span>
        <span className={`font-size14 ${color}`}>
          {formatNumber(product.total)}₮
        </span>
      </div>
    </div>
  );
}

export default CalculatePrice;
