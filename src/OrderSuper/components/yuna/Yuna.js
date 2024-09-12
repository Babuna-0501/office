import React, { useState } from 'react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import myHeaders from '../MyHeader/myHeader';
import './yuna.css';

const YunaToExcel = props => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const requestOptions = {
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/tailan/yuna?start=${startDate}&end=${endDate}`,
        requestOptions
      );
      const jsonData = await response.json();
      setData(jsonData.data);
      setIsDataFetched(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsDataFetched(false);
    }
    setIsLoading(false);
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    const headers = [
      'DocumentId',
      'DocumentNumber',
      'DocumentDate',
      'DocumentDesc',
      'CustomerId',
      'WarehouseId',
      'AccountId',
      'ItemId',
      'ItemName',
      'Qty',
      'UnitPrice',
      'VatAmount',
      'Amount',
      'DocumentS1',
      'DocumentS2',
      'DocumentS3',
      'DocumentS4',
      'DocumentS5'
    ];

    const cyrillicHeaders = [
      'Гүйлгээ',
      'Баримтын № Огноо',
      'Баримтын огноо',
      'Гүйлгээний утга',
      'Бэлтгэн нийлүүлэгч',
      'Байршил',
      'Харилцсан данс',
      'Барааны код',
      'Барааны нэр',
      'Тоо хэмжээ',
      'Нэгж үнэ',
      'НӨАТ-ын дүн',
      'Дүн',
      'Баримтын сегмент 1',
      'Баримтын сегмент 2',
      'Баримтын сегмент 3',
      'Баримтын сегмент 4',
      'Баримтын сегмент 5'
    ];

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
      DocumentS1: '',
      DocumentS2: '',
      DocumentS3: '',
      DocumentS4: '',
      DocumentS5: ''
    }));

    const columnWidths = [
      { wch: 15 }, // DocumentId
      { wch: 20 }, // DocumentNumber
      { wch: 20 }, // DocumentDate
      { wch: 30 }, // DocumentDesc
      { wch: 20 }, // CustomerId
      { wch: 15 }, // WarehouseId
      { wch: 15 }, // AccountId
      { wch: 15 }, // ItemId
      { wch: 30 }, // ItemName
      { wch: 10 }, // Qty
      { wch: 15 }, // UnitPrice
      { wch: 15 }, // VatAmount
      { wch: 15 }, // Amount
      { wch: 20 }, // DocumentS1
      { wch: 20 }, // DocumentS2
      { wch: 20 }, // DocumentS3
      { wch: 20 }, // DocumentS4
      { wch: 20 } // DocumentS5
    ];

    worksheet.addRow(headers);
    worksheet.addRow(cyrillicHeaders);
    mappedData.forEach(item => worksheet.addRow(Object.values(item)));

    worksheet.columns.forEach((column, index) => {
      column.width = columnWidths[index].wch;
    });

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'fcc203' }
      };
      cell.font = {
        bold: true,
        color: { argb: '000000' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'center' };
    });

    worksheet.autoFilter = 'A1:R1';

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'Yuna.xlsx');
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className='yuna_input'>
          <label>Эхлэх өдөр:</label>
          <input
            type='date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div className='yuna_input'>
          <label>Дуусах өдөр:</label>
          <input
            type='date'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <button className='yuna_btn' onClick={fetchData} disabled={isLoading}>
          Тайлан бэлдэх
        </button>
        {isLoading && <div>Түр хүлээнэ үү...</div>}
        {isDataFetched && (
          <button className='yuna_btn' onClick={exportToExcel}>
            Тайлан татах
          </button>
        )}
      </div>
    </div>
  );
};

export default YunaToExcel;
