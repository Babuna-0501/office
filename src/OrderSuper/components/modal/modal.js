import React, { useState, useEffect } from 'react';
import './modal.css';
import myHeaders from '../../../components/MyHeader/myHeader';
import City from '../../data/city.json';
import District from '../../data/district.json';

const cityMapping = City.City.reduce((acc, city) => {
  acc[city.location_id] = city.location_name;
  return acc;
}, {});

const districtMapping = District.District.reduce((acc, district) => {
  acc[district.location_id] = district.location_name;
  return acc;
}, {});

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

export const ExportModal = ({
  open,
  payload,
  cancel,
  exportExcel,
  print,
  exportPdf,
  props
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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
        setUsers(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const getUserName = userId => {
    const user = users.find(user => user.user_id === userId);
    return user ? user.first_name : userId;
  };

  let qt = 0;
  let pr = 0;
  let deliverFee = 6000;
  let totalAmount = 0;
  let paids = 0;

  if (!open) return null;

  return (
    <section className='modal modal_export'>
      <article className='modal-content-export p-lg-4'>
        <div className='exit-icon text-end'>
          <div onClick={cancel}>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.450101 0.450101C0.938256 -0.0380545 1.72971 -0.0380545 2.21787 0.450101L15.5512 13.7834C16.0394 14.2716 16.0394 15.063 15.5512 15.5512C15.063 16.0394 14.2716 16.0394 13.7834 15.5512L0.450101 2.21787C-0.0380545 1.72971 -0.0380545 0.938256 0.450101 0.450101Z'
                fill='#455A64'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.5512 0.450101C16.0394 0.938256 16.0394 1.72971 15.5512 2.21787L2.21787 15.5512C1.72971 16.0394 0.938256 16.0394 0.450101 15.5512C-0.0380545 15.063 -0.0380545 14.2716 0.450101 13.7834L13.7834 0.450101C14.2716 -0.0380545 15.063 -0.0380545 15.5512 0.450101Z'
                fill='#455A64'
              />
            </svg>
          </div>
        </div>
        <div className='modal_table_head'>
          <span className='flex-1'>№</span>
          <span className='flex-3'>Дугаар</span>
          <span>Барааны нэр</span>
          <span className='flex-4'>Тоо ширхэг</span>
          <span className='flex-4'>Нэгж үнэ</span>
          <span className='flex-5'>Төлсөн</span>
          <span className='flex-5'>Төлбөрийн үлдэгдэл</span>
          <span className='flex-6'>Үйлчилгээний газрын нэр</span>
          <span className='flex-3'>Утас</span>
          <span className='flex-4'>Хариуцсан ХТ</span>
          <span className='flex-4'>Түгээгч</span>
          <span className='flex-8'>Хаяг</span>
        </div>
        <main className='modal-mainContents'>
          <div className='modal_table'>
            {payload?.map((p, i) => {
              let quantity = 0;
              let price = 0;

              p.line.forEach(l => {
                quantity += l.quantity;
                price += l.amount;
                qt += l.quantity;
                pr += l.amount;

                if (payload[0].supplier_id === 14268) {
                  totalAmount += l.price_amount + deliverFee;
                } else {
                  totalAmount += l.price_amount;
                }
              });
              let paid =
                p.order_data != undefined
                  ? Number(JSON.parse(p.order_data)?.prePayment) ?? 0
                  : 0;
              paids += paid;
              return (
                <>
                  <div key={i} className='modal_table_head head'>
                    <span className='flex-1'>{i + 1}</span>
                    <span className='flex-3'>{p.order_id}</span>
                    <span></span>
                    <span className='flex-4'>{quantity}</span>
                    <span className='flex-4'></span>
                    <span className='flex-5'></span>
                    <span className='flex-5'>
                      {/* {payload[0].supplier_id === 14268
                        ? price + deliverFee - paid
                        : price}
                      ₮ <br /> */}
                    </span>
                    <span className='flex-6'>{p.tradeshop_name}</span>
                    <span className='flex-3'>{p.phone}</span>
                    <span className='flex-4'>{getUserName(p.sales_man)}</span>
                    <span className='flex-4'>{getUserName(p.deliver_man)}</span>
                    <span className='flex-8'>
                      {p.address},{' '}
                      {cityMapping[p.tradeshop_city] || p.tradeshop_city},{' '}
                      {districtMapping[p.tradeshop_district] ||
                        p.tradeshop_district}
                    </span>
                  </div>
                  {p.line.map((l, index) => (
                    <div key={index} className='modal_table_head'>
                      <span className='flex-1'>{index + 1}</span>
                      <span className='flex-3'></span>
                      <span>{l.product_name}</span>
                      <span className='flex-4'>{l.quantity}</span>
                      <span className='flex-4'>{l.price}</span>
                      <span className='flex-5'>{paid}₮</span>
                      <span className='flex-5'>
                        {payload[0].supplier_id === 14268
                          ? l.price_amount + deliverFee - paid
                          : l.price_amount}
                        ₮ <br />
                      </span>
                      <span className='flex-6'></span>
                      <span className='flex-3'></span>
                      <span className='flex-4'></span>
                      <span className='flex-4'></span>
                      <span className='flex-8'></span>
                    </div>
                  ))}
                </>
              );
            })}
            <div className='modal_table_head head'>
              <span className='flex-1'></span>
              <span className='flex-3'></span>
              <span>GRAND TOTAL</span>
              <span className='flex-4'>{qt}</span>
              <span className='flex-4'></span>
              <span className='flex-5'>{paids}₮</span>
              <span className='flex-5'>
                {totalAmount - paids}₮ <br />
              </span>
              <span className='flex-6'></span>
              <span className='flex-3'></span>
              <span className='flex-4'></span>
              <span className='flex-4'></span>
              <span className='flex-8'></span>
            </div>
          </div>
        </main>
        <div className='modal-button export-btns'>
          <button onClick={cancel}>Цуцлах</button>
          <button onClick={exportExcel}>Excel Татах</button>
          <button onClick={exportPdf}>Pdf Татах</button>
          <button onClick={print}>Хэвлэх</button>
        </div>
      </article>
    </section>
  );
};
