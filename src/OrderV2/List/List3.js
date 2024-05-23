import React, { useState, useEffect } from 'react';
import './ReportNew.css';
import myHeaders from '../components/MyHeader/myHeader';
import * as XLSX from 'xlsx';
import Brief from '../components/brief/Brief'

const ReportDetail = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);

    var requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };
    
    if (!startDate || !endDate) {
      setIsLoading(false);
      alert('Эхлэх дуусах огноог сонгоно уу.');
      return;
    }

    const apiUrl = `https://api2.ebazaar.mn/api/order/tailan?start=${startDate}&end=${endDate}`;
    try {
      const response = await fetch(apiUrl, requestOptions);
      const jsonData = await response.json();
      setData(jsonData.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (data.length === 0) {
      alert('No data to export.');
      return;
    }
  
    const dataset = data.map(item => {
      const orderData = JSON.parse(item.orderData);
      const payment = orderData?.payment || {}; 
      const deliveryManInfo = users[item.deliveryMan] || {};
      const salesManInfo = users[item.salesMan] || {};
  
      return {
        orderId: item.orderId,
        productName: item.productName,
        barcode: item.barcode,
        supplierName: item.supplierName,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        orderAt: new Date(item.orderAt).toLocaleDateString('en-US'),
        deliveryAt: new Date(item.deliveryAt).toLocaleDateString('en-US'),
        phone: item.phone,
        register: item.register,
        customerName: item.customerName,
        tradeshopName: item.tradeshopName,
        BusinessType: item.BusinessType,
        state: item.state,
        district: item.district,
        quarter: item.quarter,
        address: item.address,
        note: item.note,
        status: item.status,
        mainCategory: item.mainCategory,
        category: item.category,
        cancelReason: item.cancelReason,
        origin: item.origin,
        orderType: item.orderType,
        canceledBy: item.canceledBy,
        createdAt: new Date(item.createdAt).toLocaleDateString('en-US'),
        recievedAt: item.recievedAt ? new Date(item.recievedAt).toLocaleDateString('en-US') : '',
        brand: item.brand,
        productVendor: item.productVendor,
        Түгээгч: deliveryManInfo.first_name || '',
        ХТ: salesManInfo.first_name || '',
        Төлбөр_бэлэн: payment.m1 || '',
        Төлбөр_банк: payment.m2 || '', 
        Төлбөр_зээл: payment.m3 || '', 
        Урьдчилгаа: orderData?.prePayment ?? '',
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataset);
    
    const columnWidths = [
      { wch: 10 }, // orderId
      { wch: 20 }, // productName
      { wch: 15 }, // barcode
      { wch: 20 }, // supplierName
      { wch: 10 }, // quantity
      { wch: 10 }, // price
      { wch: 15 }, // total
      { wch: 15 }, // orderAt
      { wch: 15 }, // deliveryAt
      { wch: 15 }, // phone
      { wch: 15 }, // register
      { wch: 20 }, // customerName
      { wch: 20 }, // tradeshopName
      { wch: 15 }, // BusinessType
      { wch: 10 }, // state
      { wch: 10 }, // district
      { wch: 10 }, // quarter
      { wch: 20 }, // address
      { wch: 30 }, // note
      { wch: 10 }, // status
      { wch: 20 }, // mainCategory
      { wch: 20 }, // category
      { wch: 20 }, // cancelReason
      { wch: 10 }, // origin
      { wch: 10 }, // orderType
      { wch: 20 }, // canceledBy
      { wch: 15 }, // createdAt
      { wch: 15 }, // recievedAt
      { wch: 15 }, // brand
      { wch: 20 }, // productVendor
      { wch: 20 }, // deliveryManFirstName
      { wch: 20 }, // salesManFirstName
      { wch: 15 }, // Төлбөр_бэлэн
      { wch: 15 }, // Төлбөр_банк
      { wch: 15 }, // Төлбөр_зээл
      { wch: 15 }, // Урьдчилгаа
    ];

    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Дэлгэрэнгүй тайлан');

    XLSX.writeFile(workbook, 'Дэлгэрэнгүй тайлан.xlsx');
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
  
      try {
        const response = await fetch('https://api2.ebazaar.mn/api/backoffice/users', requestOptions);
        const userData = await response.json();
  
        const usersDataMap = {};
        userData.data.forEach(user => {
          usersDataMap[user.user_id] = user;
        });
  
        setUsers(usersDataMap);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUsers();
  }, []);
  
  return (
    <div className='tailan_wrapper'>
      <div className='reportDetail'>
        <div className='detailed'>      
          <h1>Захиалгын Дэлгэрэнгүй Тайлан</h1>
          <div style={{ marginBottom: '20px' }}>
            <label>Эхлэх огноо:</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label>Дуусах огноо:</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            <button onClick={fetchData} disabled={isLoading}>Тайлан бэлдэх</button>
            {isLoading && <progress style={{ marginLeft: '10px' }} />}
          </div>
          {data.length > 0 ? (
            <>
              <button onClick={handleExport}>Тайлан татах</button>
            </>
          ) : (
            <p>Тайлангийн дата байхгүй.</p>
          )}
        </div>
      </div>
      <div className='reportDetail'>
        <h1>Захиалгын Товч Тайлан</h1>
        <Brief/>
      </div>
    </div>
  
  );
};

export default ReportDetail;
