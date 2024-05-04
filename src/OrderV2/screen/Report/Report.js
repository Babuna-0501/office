import React from 'react'
import DatePick from '../../components/datepick/datepick';
import './report.css';
import ReportSum from './ReportSum/ReportSum';

const Report = () => {
  return (
    <div className='report'>
        <div className='date'>
            <DatePick  />  
            {/* ehleh ognoo */}
            <DatePick  />  
            {/* duusah ognoo */}
        </div>
        <div className='report_wrapper'>
            <span>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7019 23.0909H18.7193C14.3949 23.0909 10.8887 26.5971 10.8887 30.9215L10.8887 41.2809C10.8887 45.6031 14.3949 49.1094 18.7193 49.1094H42.3705C46.6949 49.1094 50.2012 45.6031 50.2012 41.2809V30.9002C50.2012 26.5886 46.7055 23.0909 42.3939 23.0909H40.39" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M30.5449 8.65506V34.2422" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24.3496 14.877L30.544 8.65495L36.7405 14.877" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>Бүтээгдэхүүний нэгтгэлээр тайлан татах</div>
            </span>
            <span>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7019 23.0909H18.7193C14.3949 23.0909 10.8887 26.5971 10.8887 30.9215L10.8887 41.2809C10.8887 45.6031 14.3949 49.1094 18.7193 49.1094H42.3705C46.6949 49.1094 50.2012 45.6031 50.2012 41.2809V30.9002C50.2012 26.5886 46.7055 23.0909 42.3939 23.0909H40.39" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M30.5449 8.65506V34.2422" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24.3496 14.877L30.544 8.65495L36.7405 14.877" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>Захиалгын нэгтгэлээр тайлан татах</div>
            </span>
        </div>
        <ReportSum/>
    </div>
  )
}

export default Report