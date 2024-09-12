import React from 'react';
import './reportBtn.css';
import reportSvg from './report.svg';

const ReportBtn = ({ setShowModal, selectedRows }) => {
  const onClick = () => {
    if (selectedRows.length === 0) {
      alert('Та захиалга сонгоогүй байна');
    } else {
      setShowModal(true);
    }
  };

  return (
    <button onClick={onClick} className='reportBtn'>
      <span>Нэгтгэл</span>
      <img src={reportSvg} alt='report' />
    </button>
  );
};

export default ReportBtn;
