import React, { useState, useEffect, useContext } from 'react';
import Detail from './Detail';
import Note from './Note';
import Notes from './Notes';
import { replaceImageUrl } from '../utils';

function Order(data) {
  const order = data.data;
  let total = 0;
  order.line.map(l => {
    total += parseInt(l.quantity, 10) * parseInt(l.price, 10);
  });
  let [detail, setDetail] = useState(null);
  let [notes, setNotes] = useState(null);
  let images = order.line.map(l => {
    return (
      <span className='productincart' key={Math.random()}>
        <img
          src={replaceImageUrl(l.product_image.replace('original', 'product'))}
          alt=''
        />
        <span>{l.quantity}</span>
      </span>
    );
  });
  let [foo, setFoo] = useState(JSON.parse(order.description));
  return (
    <tr key={order.order_id}>
      <td>
        <input type='checkbox' id={order.order_id} />
        <label
          htmlFor={order.order_id}
          className='order-id'
          id={order.order_id}
        >
          {order.order_id}
        </label>
      </td>
      <td>
        <span className='order-supplier-name'>{order.supplier_name}</span>
      </td>
      <td className='tdimages'>
        <span onClick={() => setDetail(!detail)}>{images}</span>
      </td>
      <td>
        <span></span>
      </td>
      <td>
        <span>{total.toLocaleString()}₮</span>
      </td>
      <td onClick={() => setNotes(true)}>
        <span id={'note' + order.order_id}>
          <Note note={foo} setFoo={setFoo} />
        </span>
      </td>
      <td>
        <span>{order.phone}</span>
      </td>
      <td>
        <span className='order-name'>{order.tradeshopName}</span>
      </td>
      <td>
        <span className='order-address'>{order.address}</span>
      </td>
      <td>
        <span>
          {order.order_date
            ? order.order_date.substr(0, 10) +
              ' ' +
              order.order_date.substr(11, 5)
            : ''}
        </span>
      </td>
      <td>
        <span>
          {order.delivery_date ? order.delivery_date.substr(0, 10) : ''}
        </span>
      </td>
      {detail ? (
        <Detail close={setDetail} order={order} data={order.line} />
      ) : null}
      {notes ? (
        <Notes
          getOrders={data.getOrders}
          note={foo}
          setFoo={setFoo}
          id={order.order_id}
          setNotes={setNotes}
        />
      ) : null}
    </tr>
  );
}

export default Order;
