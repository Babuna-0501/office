import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import myHeaders from '../MyHeader/myHeader';

const ExportExcelButton = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchOrders = async () => {
    var requestOptions = {
    headers: myHeaders,
    redirect: "follow",
    };

    const url = `https://api2.ebazaar.mn/api/order/tailan/huraangui?startDate=${startDate}&endDate=${endDate}`;

    try {
      const response = await fetch(url, requestOptions);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const exportToExcel = () => {
    const fileName = 'orders.xlsx';
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div>
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={fetchOrders}>Fetch Data</button>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default ExportExcelButton;
