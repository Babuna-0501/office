import React from 'react'
import './reportBtn.css'

const ReportBtn = ({onClick}) => {
  return (
    <div className='reportBtn' onClick={onClick}>
        Нэгтгэл
        <span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.15693 7.4871H5.37943C3.68359 7.4871 2.30859 8.8621 2.30859 10.5579L2.30859 14.6204C2.30859 16.3154 3.68359 17.6904 5.37943 17.6904H14.6544C16.3503 17.6904 17.7253 16.3154 17.7253 14.6204V10.5496C17.7253 8.85876 16.3544 7.4871 14.6636 7.4871H13.8778" stroke="#4D4D4D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.0182 1.82618V11.8604" stroke="#4D4D4D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.58594 4.26562L10.0151 1.82562L12.4451 4.26562" stroke="#4D4D4D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </span>
    </div>
  )
}

export default ReportBtn;