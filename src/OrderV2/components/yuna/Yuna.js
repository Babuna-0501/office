import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import myHeaders from '../MyHeader/myHeader';
import './yuna.css';

const YunaToExcel = (props) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // New loading state

  const fetchData = async () => {
    setIsLoading(true);  // Start loading
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
    setIsLoading(false);  // End loading
  };

  const exportToExcel = () => {
    // Define the headers in the desired order
    const headers = [
      'DocumentId', 'DocumentNumber', 'DocumentDate', 'DocumentDesc', 'CustomerId', 
      'WarehouseId', 'AccountId', 'ItemId', 'ItemName', 'Qty', 
      'UnitPrice', 'VatAmount', 'Amount', 'DocumentS1', 'DocumentS2', 
      'DocumentS3', 'DocumentS4', 'DocumentS5'
    ];

    // Cyrillic headers to be included in the first row
    const cyrillicHeaders = [
      'Гүйлгээ', 'Баримтын № Огноо', 'Баримтын огноо', 'Гүйлгээний утга', 'Бэлтгэн нийлүүлэгч', 
      'Байршил', 'Харилцсан данс', 'Барааны код', 'Барааны нэр', 'Тоо хэмжээ', 
      'Нэгж үнэ', 'НӨАТ-ын дүн', 'Дүн', 'Баримтын сегмент 1', 'Баримтын сегмент 2', 
      'Баримтын сегмент 3', 'Баримтын сегмент 4', 'Баримтын сегмент 5'
    ];

    // Map the data to match the headers
    const mappedData = data.map(item => ({
      DocumentId: item.DocumentId,
      DocumentNumber: item.DocumentNumber,
      DocumentDate: item.DocumentDate,
      DocumentDesc: item.DocumentDesc,
      CustomerId: item.CustomerId,
      WarehouseId: item.WarehouseId,
      AccountId: item.AccountId,
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      Qty: item.Qty,
      UnitPrice: item.UnitPrice,
      VatAmount: item.VatAmount,
      Amount: item.Amount,
      DocumentS1: '',  // Add appropriate values or leave as empty strings
      DocumentS2: '',
      DocumentS3: '',
      DocumentS4: '',
      DocumentS5: ''
    }));

    // Create a worksheet with the headers and mapped data
    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(worksheet, [cyrillicHeaders], { origin: 'A2' });
    XLSX.utils.sheet_add_json(worksheet, mappedData, { origin: 'A3', skipHeader: true });

    // Adding styles to headers
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress1 = XLSX.utils.encode_cell({ r: 0, c: col });
      const cellAddress2 = XLSX.utils.encode_cell({ r: 1, c: col });
      worksheet[cellAddress1].s = {
        fill: { fgColor: { rgb: 'FFFF00' } },
        font: { bold: true, color: { rgb: '000000' } },
        alignment: { horizontal: 'center', vertical: 'center' }
      };
      worksheet[cellAddress2].s = {
        fill: { fgColor: { rgb: 'FFFF00' } },
        font: { bold: true, color: { rgb: '000000' } },
        alignment: { horizontal: 'center', vertical: 'center' }
      };
    }

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
      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
        <button className='yuna_btn' onClick={fetchData} disabled={isLoading}>Тайлан бэлдэх</button>
        {isLoading && <div>Түр хүлээнэ үү...</div>}  {/* Loading indicator */}
        {isDataFetched && (
          <button className='yuna_btn' onClick={exportToExcel}>Тайлан татах</button>
        )}
      </div>
    </div>
  );
};

export default YunaToExcel;
