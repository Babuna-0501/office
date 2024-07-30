import React, { useState, useEffect } from 'react';
import myHeaders from '../MyHeader/myHeader';
import * as XLSX from 'xlsx';
import './brief.css';

const ReportDetail = props => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [suppId, setSuppId] = useState('');
  const [suppName, setSuppName] = useState(''); // New state for displaying selected supplier name
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
          requestOptions
        );
        const res = await response.json();
        if (res && res.data) {
          setSuppliers(res.data);
        } else {
          console.error('Unexpected supplier data structure:', res);
        }
      } catch (error) {
        console.log('suppliers error ', error);
      }
    };

    fetchdata();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    var requestOptions = {
      headers: myHeaders,
      redirect: 'follow'
    };

    if (!startDate || !endDate) {
      setIsLoading(false);
      alert('Эхлэх дуусах огноог сонгоно уу.');
      return;
    }

    const apiUrl = `${process.env.REACT_APP_API_URL2}/api/order/tailan/huraangui?startDate=${startDate}&endDate=${endDate}&supplierId=${suppId}`;
    try {
      const response = await fetch(apiUrl, requestOptions);
      const jsonData = await response.json();
      console.log('Report Data:', jsonData);
      if (jsonData && jsonData.data && Array.isArray(jsonData.data)) {
        setData(jsonData.data);
      } else {
        console.error('Unexpected report data structure:', jsonData);
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!Array.isArray(data) || data.length === 0) {
      alert('No data to export.');
      return;
    }

    const dataset = data.map(item => ({
      orderId: item.orderId,
      orderAt: new Date(item.orderAt).toLocaleDateString('en-US'),
      deliveryAt: new Date(item.deliveryAt).toLocaleDateString('en-US'),
      recievedAt: item.recievedAt
        ? new Date(item.recievedAt).toLocaleDateString('en-US')
        : '',
      note: Array.isArray(item.note) ? item.note.join(', ') : '', // Check if note is an array
      status: item.status,
      register: item.register,
      BusinessName: item.businessName,
      branch: item.branch,
      address: item.address,
      phone: item.phone,
      vendor: item.vendor,
      channel: item.channel,
      state: item.state,
      district: item.district,
      quarter: item.quarter,
      totalPrice: item.totalPrice,
      originalTotal: item.originalTotal
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataset);

    const columnWidths = [
      { wch: 10 },
      { wch: 20 },
      { wch: 15 },
      { wch: 20 },
      { wch: 50 },
      { wch: 10 },
      { wch: 15 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 10 },
      { wch: 10 },
      { wch: 20 },
      { wch: 30 }
    ];

    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Хураангүй тайлан');

    XLSX.writeFile(workbook, 'Хураангүй тайлан.xlsx');
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    const filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  const handleSupplierSelect = (supplierId, supplierName) => {
    setSuppId(supplierId);
    setSuppName(supplierName);
    setSearchTerm(supplierName);
    setFilteredSuppliers([]);
  };

  return (
    <div>
      <div>
        <div className='detailed'>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Эхлэх огноо:</label>
              <input
                type='date'
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Дуусах огноо:</label>
              <input
                type='date'
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Нийлүүлэгчийн нэр:</label>
              <input
                type='text'
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Нийлүүлэгчийн нэрээр хайх'
                className='brief_supp'
              />
              {filteredSuppliers.length > 0 && (
                <ul
                  className='brief_supp_ul'
                  style={{
                    border: '1px solid #ccc',
                    maxHeight: '150px',
                    overflowY: 'scroll'
                  }}
                >
                  {filteredSuppliers.map(supplier => (
                    <li
                      key={supplier.id}
                      onClick={() =>
                        handleSupplierSelect(supplier.id, supplier.name)
                      }
                    >
                      {supplier.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button onClick={fetchData} disabled={isLoading}>
              Тайлан бэлдэх
            </button>
            {isLoading && <progress style={{ marginLeft: '10px' }} />}
          </div>
          {Array.isArray(data) && data.length > 0 ? (
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
