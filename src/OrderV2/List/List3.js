import React, { useState } from 'react';
import './ReportNew.css'
import myHeaders from '../components/MyHeader/myHeader';

const ReportDetail = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for progress indicator

  const fetchData = async () => {
    setIsLoading(true); // Set loading to true when fetching data

    var requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };
    
    if (!startDate || !endDate) {
      setIsLoading(false); // Reset loading state
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
      setIsLoading(false); // Reset loading state after data fetch completes
    }
  };

  const handleExport = () => {
    if (data.length === 0) {
      alert('No data to export.');
      return;
    }
  
    const dataset = data.map(item => ({
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
      deliveryMan: item.deliveryMan,
      salesMan: item.salesMan
    }));
  
    const csvContent = [
      '\uFEFF', 
      Object.keys(dataset[0]).join(','), 
      ...dataset.map(item => Object.values(item).join(',')), 
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Дэлгэрэнгүй тайлан.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // const fetchData2 = async () => {
  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };
  //   try {
  //     const data2 = await fetch(
  //       "https://api2.ebazaar.mn/api/backoffice/users",
  //       requestOptions
  //     );
  //     const res = await data2.json();
  //     setUsers(res.data2);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData2();
  // }, []);

  return (
    <div className='reportDetail'>
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
  );
};

export default ReportDetail;
