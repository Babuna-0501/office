import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import myHeaders from '../MyHeader/myHeader';
import './yuna.css'

const YunaToExcel = (props) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);  

  const fetchData = async () => {
    var requestOptions = {
        headers: myHeaders,
        redirect: "follow",
    };

    try {
      const response = await fetch(`https://api2.ebazaar.mn/api/order/tailan/yuna?start=${startDate}&end=${endDate}`, requestOptions);
      const jsonData = await response.json();
      setData(jsonData.data);
      setIsDataFetched(true); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsDataFetched(false); 
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'Yuna.xlsx');
    window.location.reload(); 
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className='yuna_input'>
          <label>Эхлэх өдөр:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className='yuna_input'>
          <label>Дуусах өдөр:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", gap: "40px" }}>
        <button className='yuna_btn' onClick={fetchData}>Тайлан бэлдэх</button>
        {isDataFetched && (
          <button className='yuna_btn' onClick={exportToExcel}>Тайлан татах</button>
        )}
      </div>
    </div>
  );
};

export default YunaToExcel;
