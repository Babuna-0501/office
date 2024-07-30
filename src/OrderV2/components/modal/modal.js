import React, { useState, useEffect } from 'react';
import './modal.css';
import myHeaders from '../../../components/MyHeader/myHeader';

const Modal = ({ open, payload, cancel, save, onChange, props }) => {
  const [delivermans, setDeliverMans] = useState([]);

  const fetchUserData = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/users`,
        requestOptions
      );
      const data = await response.json();
      setDeliverMans(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!open) return null;
  return (
    <section className='modal'>
      <article className='modal-content p-lg-4'>
        <div className='exit-icon text-end'>
          <button onClick={cancel}>Close</button>
        </div>
        <main className='modal-mainContents'>
          <label>Price:</label>
          <input value={payload.price} onChange={e => onChange(e, 'price')} />

          <label>Quantity:</label>
          <input
            value={payload.quantity}
            onChange={e => onChange(e, 'quantity')}
          />

          <span>
            {payload.price}₮ * {payload.quantity} =
            {Math.floor(payload.price * payload.quantity)}₮
          </span>
          <div className='modal-button'>
            <button onClick={cancel}>Cancel</button>
            <button onClick={save}>Save</button>
          </div>
        </main>
      </article>
    </section>
  );
};

export default Modal;
