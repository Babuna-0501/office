import React from 'react';
import { useEffect, useState } from 'react';
import ListHeader from '../../screen/ListHeader';
import './orderEdit.css';


const sequence = [
    "index",
    "id",
    "status",
    "orderlist",
    "orderdate",
    "deliverydate",
    "paidamount",
    "note",
    "customerphone",
    "customer",
    "merchants",
    "customerchannel",
    "city",
    "district",
    "khoroo",
    "address",
    "paymenttype",
    "srcode",
    "origin",
    "vat",
    "salesman",
    "deliveryman",
    "manager",
    "butsaalt",
  ];

  const sequenceSizes = {
    index: 52,
    id: 65,
    status: 90,
    orderlist: 150,
    orderdate: 120,
    deliverydate: 120,
    paidamount: 120,
    note: 150,
    paymenttype: 100,
    customer: 120,
    customerphone: 85,
    merchants: 160,
    customerchannel: 140,
    city: 140,
    district: 120,
    khoroo: 120,
    address: 270,
    srcode: 120,
    origin: 120,
    vat: 120,
    salesman: 120,
    deliveryman: 120,
    manager: 140,
    butsaalt: 120,
  };


const OrderEdit = (  
    filterState,
    setFilterState,
    props
) => {

        const [activeTab, setActiveTab] = useState(0);

        const handleTabClick = (index) => {
          setActiveTab(index);
        };
  return (
    <div className='order_settings'>
      <div className="tab_buttons">
        <button className={activeTab === 0 ? 'active' : ''} onClick={() => handleTabClick(0)}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" fill="#F2F2F2"/>
          <path d="M22.2675 25.2032V13.1875" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M25.868 21.5898L22.2699 25.2045L18.6719 21.5898" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.5097 10.793V22.8087" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.91016 14.4077L13.5082 10.793L17.1062 14.4077" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          Захиалгын багана, эрэмбийн тохиргоо
        </button>
        <button className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" fill="#F2F2F2"/>
          <path d="M22.2675 25.2032V13.1875" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M25.868 21.5898L22.2699 25.2045L18.6719 21.5898" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.5097 10.793V22.8087" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.91016 14.4077L13.5082 10.793L17.1062 14.4077" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          Захиалгын ерөнхий тохиргоо
        </button>
        <button className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" fill="#F2F2F2"/>
          <path d="M22.2675 25.2032V13.1875" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M25.868 21.5898L22.2699 25.2045L18.6719 21.5898" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.5097 10.793V22.8087" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.91016 14.4077L13.5082 10.793L17.1062 14.4077" stroke="#4D4D4D" stroke-width="1.37868" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          Захиалгын дүнгийн тохиргоо
        </button>
      </div>
      {activeTab === 0 && (
        <div className="tab_content">
        <ListHeader
          sequence={sequence}
          sequenceSizes={sequenceSizes}
          filterState={filterState}
          setFilterState={setFilterState}
        />
        <div style={{marginTop:"3rem"}}>
          <h3 style={{fontSize:"14px"}}>Багана зайг ихэсгэх багасгах тохируулах боломжтой</h3>
          <div className="stick_wrapper" style={{fontSize:"12px", marginTop:"20px"}}>
                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Дугаар</div>
                  <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Статус</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Захиалга</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Захиалсан өдөр</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Хүргүүлэх өдөр</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Төлбөр</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Тэмдэглэл</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Утас</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Захиалсан</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Суваг</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Хот/аймаг</div>
                                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Дүүрэг/сум</div>
                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Хороо</div>
                <div><label class="switch">
                    <input type="checkbox"/>
                    <span class="slider round"></span>
                  </label>Дэлгэрэнгүй хаяг</div>
                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Төлбөрийн хэлбэр</div>
                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Pick Pack</div>
                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>Origin</div>
                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>VAT</div>
                <div><label class="switch">
                  <input type="checkbox"/>
                  <span class="slider round"></span>
                </label>ХТ код/нэр</div>
                <div><label class="switch">
                    <input type="checkbox"/>
                    <span class="slider round"></span>
                  </label>Түгээгч код/нэр</div>
                <div><label class="switch">
                    <input type="checkbox"/>
                    <span class="slider round"></span>
                  </label>Менежер</div>
                <div>
                  <label class="switch">
                    <input type="checkbox"/>
                    <span class="slider round"></span>
                  </label>Буцаалт
                </div>
          </div>
        </div>
      
        </div>
      )}
      {activeTab === 1 && (
        <div className="tab_content">
          <h3>Захиалгын ерөнхий тохиргоо content goes here</h3>
        </div>
      )}
      {activeTab === 2 && (
        <div className="tab_content">
          <h3>Захиалгын дүнгийн тохиргоо content goes here</h3>
        </div>
      )}
    </div>
  )
}

export default OrderEdit;