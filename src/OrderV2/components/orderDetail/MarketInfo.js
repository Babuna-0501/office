import marketSvg from './market.svg';
import editSvg from './edit.svg';
import { formatNumber } from './utils';

function MarketInfo({ order }) {
  return (
    <div className='delguur'>
      <div className='delguur_top'>
        <span>
          <img src={marketSvg} alt='market' />
        </span>

        <span className='delguur_name'>{order.tradeshop_name}</span>
      </div>

      <div>
        <div className='delguur_hayg'>
          <b>Хаяг:</b>
          <span>{order.address}</span>
        </div>

        <div className='delguur_info'>
          <b>Регистр:</b>
          <span>{order.supplier_register}</span>
          <b>Утас:</b>
          <span>{order.phone}</span>
        </div>
      </div>

      <div className='order_info'>
        <div className='order_info_item'>
          <p>Захиалсан:</p>
          <b>{order.order_date?.split('T')[0]}</b>
        </div>

        <div className='order_info_item'>
          <p>Хүргүүлэх өдөр:</p>
          <b>{order.delivery_date?.split('T')[0]}</b>
        </div>

        <div className='tulsun'>
          <p>Төлсөн:</p>
          <b>{formatNumber(order.payment_amount)}₮</b>
        </div>

        <div className='uldsen'>
          <p>Үлдэгдэл:</p>
          <b>{formatNumber(order.price)}₮</b>
        </div>

        <div className='edit-btn'>
          <img src={editSvg} alt='edit' />
        </div>

        <div className='order_info_item'>
          <p>Захиалгын нийт дүн </p>
          <b>{formatNumber(order.grand_total)}₮</b>
        </div>
      </div>

      <div className='payment_info'>
        <div className='payment_info_item'>
          <span>ХТ:</span>
          <b>{order.sales_man}</b>
        </div>

        <div className='payment_info_item'>
          <span>Түгээгч:</span>
          <b>{order.deliver_man}</b>
        </div>
      </div>
    </div>
  );
}

export default MarketInfo;
