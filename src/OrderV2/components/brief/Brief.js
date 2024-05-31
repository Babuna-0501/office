import React, { useState, useEffect } from 'react';
import myHeaders from '../MyHeader/myHeader';
import * as XLSX from 'xlsx';

const ReportDetail = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

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
      return {
        orderId: item.orderId,
        orderAt: new Date(item.orderAt).toLocaleDateString('en-US'),
        deliveryAt: new Date(item.deliveryAt).toLocaleDateString('en-US'),
        recievedAt: new Date(item.recievedAt).toLocaleDateString('en-US'),
        note: item.note,
        status: item.status,
        register: item.register,
        BusinessName: item.BusinessName,
        branch: item.branch,
        address: item.address,
        phone: item.phone,
        vendor: item.vendor,
        channel: item.channel,
        state: item.state,
        district: item.district,
        quarter: item.quarter,
        totalPrice: item.totalPrice,
        originalTotal: item.originalTotal,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataset);
    
    const columnWidths = [
      { wch: 10 },
      { wch: 20 }, 
      { wch: 15 }, 
      { wch: 20 }, 
      { wch: 10 }, 
      { wch: 10 }, 
      { wch: 15 }, 
      { wch: 15 }, 
      { wch: 15 }, 
      { wch: 15 }, 
      { wch: 15 }, 
      { wch: 20 }, 
      { wch: 20 }, 
      { wch: 15 }, 
      { wch: 10 }, 
      { wch: 10 },
      { wch: 10 }, 
      { wch: 20 }, 
      { wch: 30 }, 
    ];

    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Хураангүй тайлан');

    XLSX.writeFile(workbook, 'Хураангүй тайлан.xlsx');
  };
  
  return (
    <div>
      <div>
        <div className='detailed'>      
          <div style={{ marginBottom: '20px' }}>
            <div style={{display:"flex", flexDirection:"column"}}> 
            <label>Эхлэх огноо:</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
            <label>Дуусах огноо:</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
 
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
    </div>
  );
};

export default ReportDetail;
