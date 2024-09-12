import { useEffect, useRef, useState } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';
import City from '../../data/city.json';
import District from '../../data/district.json';
import './negtgel.css';
import closeSvg from './close.svg';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

const cityMapping = City.City.reduce((acc, city) => {
  acc[city.location_id] = city.location_name;
  return acc;
}, {});

const districtMapping = District.District.reduce((acc, district) => {
  acc[district.location_id] = district.location_name;
  return acc;
}, {});

function Negtgel({ open, payload = [], cancel, print, users = [] }) {
  const usersMapRef = useRef({});

  const usersMap = users.reduce((acc, user) => {
    acc[user.user_id] = user.first_name;
    return acc;
  }, {});

  usersMapRef.current = usersMap;

  const exportPdf = async () => {
    const orderIds = payload.map(order => order.order_id);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL2}/api/order/tailan/orderproducts?orderIds=[${orderIds}]`,
      requestOptions
    )
      .then(res => res.blob())
      .then(myBlob => {
        const objectURL = URL.createObjectURL(myBlob);
        const link = document.createElement('a');
        link.href = objectURL;
        link.setAttribute('download', 'order-negtgel-tailan.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => console.log(err));
  };

  const exportExcel = () => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);

    const wsData = [
      [
        '№',
        'Дугаар',
        'Барааны нэр',
        'Тоо ширхэг',
        'Нэгж үнэ',
        'Төлсөн',
        'Нийт үнэ',
        'Үйлчилгээний газрын нэр',
        'Утас',
        'Хариуцсан ХТ',
        'Түгээгч',
        'Дэлгэрэнгүй хаяг'
      ]
    ];

    let qr = 0;
    let pr = 0;
    let deliverFee = 6000;
    let paids = 0;

    payload.forEach((item, i) => {
      let quantity = 0;
      let price = 0;
      let paid =
        item.order_data != undefined
          ? Number(JSON.parse(item.order_data)?.prePayment) ?? 0
          : 0;
      paids += paid;

      item.line.forEach(l => {
        quantity += l.quantity;
        price += l.amount;
        qr += l.quantity;
        pr += l.amount;

        if (item.supplier_id === 14268) {
          pr += deliverFee;
        }
      });

      const tradeshopCityName =
        cityMapping[item.tradeshop_city] || item.tradeshop_city;
      const tradeshopDistrictName =
        districtMapping[item.tradeshop_district] || item.tradeshop_district;

      wsData.push([
        i + 1,
        item.order_id,
        '',
        quantity,
        '',
        paid,
        '',
        // item.supplier_id === 14268 ? price + deliverFee : price,
        item.tradeshop_name,
        item.phone,
        usersMapRef.current[item.sales_man],
        usersMapRef.current[item.deliver_man],
        item.address + ',' + tradeshopCityName + ',' + tradeshopDistrictName
      ]);

      item.line.forEach(l => {
        wsData.push([
          '',
          '',
          l.product_name,
          l.quantity,
          l.price,
          '',
          item.supplier_id === 14268 ? l.amount + deliverFee - paid : l.amount,
          '',
          '',
          usersMapRef.current[item.sales_man],
          '',
          ''
        ]);
      });
    });

    wsData.push([
      '',
      '',
      'GRAND TOTAL',
      qr,
      '',
      paids,
      pr - paids,
      '',
      '',
      '',
      '',
      ''
    ]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Тайлан');

    XLSX.writeFile(wb, `Тайлан ${formattedDate}.xlsx`);
  };

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
            <img src={closeSvg} alt='close' />
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
}

export default Negtgel;
