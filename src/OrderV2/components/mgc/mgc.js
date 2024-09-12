import React, { useState } from 'react';
import myHeaders from '../MyHeader/myHeader';
import './mgc.css';

const DownloadExcel = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDownload = async () => {
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const apiUrl = `${process.env.REACT_APP_API_URL2}/api/order/tailan/smartLogic?start=${startDate}&end=${endDate}&supplier=14178`;

    try {
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error('Хүсэлт буруу');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `report_${startDate}_to_${endDate}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Алдаа гарлаа!', error);
    }
  };

  return (
    <div className='mgc_wrapper'>
      <h1 style={{ fontSize: '16px', fontWeight: 700 }}>Mgc тайлан татах</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleDownload();
        }}
      >
        <div style={{ display: 'flex', gap: '30px', marginBottom: '10px' }}>
          <div>
            <label>
              Эхлэх өдөр:
              <input
                type='date'
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Дуусах өдөр:
              <input
                type='date'
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        <button type='submit'>Татах</button>
      </form>
    </div>
  );
};

export default DownloadExcel;
