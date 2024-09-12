import { formatCurrency } from '../utils';
import editPrice from './editPrice.svg';

const EditPriceModal = ({ open, payload = {}, cancel, save, onChange }) => {
  function roundToThreeDecimals(value) {
    return parseFloat(value.toFixed(3));
  }

  const total = roundToThreeDecimals(payload.price * payload.quantity);

  const handlePriceChange = e => {
    const value = e.target.value;
    onChange({ target: { value: value ? parseFloat(value) : '' } }, 'price');
  };

  const handleQuantityChange = e => {
    const value = e.target.value;

    onChange(
      { target: { value: value ? parseInt(value, 10) : '' } },
      'quantity'
    );
  };

  if (!open) return null;

  return (
    <section className='modal'>
      <article
        className='modal-content p-lg-4'
        style={{
          position: 'relative'
        }}
      >
        <div
          onClick={cancel}
          style={{
            width: '16px',
            height: '16px',
            position: 'absolute',
            top: '10px',
            right: '10px'
          }}
        >
          <img src={editPrice} alt='editPrice' />
        </div>

        <main className='modal-maincontents price_up'>
          <label>Price:</label>
          <input
            type='number'
            step='0.01'
            value={payload.price || ''}
            onChange={handlePriceChange}
          />

          <label>Quantity:</label>
          <input
            type='number'
            value={payload.quantity || ''}
            onChange={handleQuantityChange}
          />

          <span style={{ fontWeight: 700 }}>
            {formatCurrency(payload.price)}₮ * {payload.quantity} ш ={' '}
            {formatCurrency(total)}₮
          </span>

          <div className='modal-button p_price--update'>
            <button onClick={cancel}>Цуцлах</button>
            <button onClick={save}>Хадгалах</button>
          </div>
        </main>
      </article>
    </section>
  );
};

export default EditPriceModal;
