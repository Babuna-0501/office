import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import ListHeader from '../screen/ListHeader';
import myHeaders from '../../components/MyHeader/myHeader';
export const visibles = [2, 3, 4, 6, 8, 10, 11, 14, 24, 26, 27, 29, 30, 31];
export const sequence = [
  // 0
  'index',
  // 1
  'id',
  // 2
  'status',
  // 3
  'orderlist',
  // 4
  'notification',
  // 5
  'orderlist',
  // 6
  'deliveryManOne',
  // 7
  'merchants',
  // 8
  'delivering',
  // 9
  'paidamount',
  // 10
  'firstPrice',
  // 11
  'coupon',
  // 12
  'note',
  // 13
  'customerphone',
  // 14
  'merchants1',
  // 15
  'customerchannel',
  // 16
  'city',
  // 17
  'district',
  // 18
  'khoroo',
  // 19
  'address',
  // 20
  'paymenttype',
  // 21
  'srcode',
  // 22
  'origin',
  // 23
  'vat',
  // 24
  'userdate',
  // 25
  'manager',
  // 26
  'salesmanName',
  // 27
  'phone',
  // 28
  'deliveryman',
  // 29
  'cargo',
  // 30
  'deleteOrder',
  // 31
  'phoneOrder',
  // 32
  'butsaalt',
  // 33
  'salesman',
  // 34
  'status',
  // 35
  'orderdate',
  // 36
  'deliverydate'
];
export const defaultHeaderList = [
  {
    id: 1,
    permission: true,
    position: 1,
    title: 'Дугаар',
    show: true
  },
  {
    id: 2,
    permission: false,
    position: 34,
    title: 'Logo',
    show: false
  },
  {
    id: 3,
    permission: false,
    position: 35,
    title: 'Нийлүүлэгч',
    show: false
  },
  {
    title: 'Notification',
    show: false,
    id: 4,
    permission: false,
    position: 36
  },
  {
    title: 'Захиалга',
    show: true,
    id: 5,
    permission: true,
    position: 5
  },
  {
    id: 6,
    permission: false,
    position: 6,
    title: 'DeliveryManOne',
    show: false
  },
  {
    id: 7,
    permission: true,
    position: 7,
    title: 'Захиалсан',
    show: true
  },
  {
    title: 'Хүргүүлэх',
    show: false,
    id: 8,
    permission: false,
    position: 8
  },
  {
    title: 'Дүн',
    show: true,
    id: 9,
    permission: true,
    position: 9
  },

  {
    title: 'Анхны дүн',
    show: false,
    id: 10,
    permission: false,
    position: 10
  },
  {
    title: 'Coupon',
    show: false,
    id: 11,
    permission: false,
    position: 11
  },
  {
    title: 'Тэмдэглэл',
    show: true,
    id: 12,
    permission: true,
    position: 12
  },
  {
    title: 'Утас',
    show: true,
    id: 13,
    permission: true,
    position: 13
  },

  {
    title: 'Захиалсан',
    show: false,
    id: 14,
    permission: false,
    position: 14
  },
  {
    title: 'Суваг',
    show: true,
    id: 15,
    permission: true,
    position: 15
  },
  {
    title: 'Хот/аймаг',
    show: true,
    id: 16,
    permission: true,
    position: 16
  },
  {
    title: 'Дүүрэг/сум',
    show: true,
    id: 17,
    permission: true,
    position: 17
  },
  {
    title: 'Хороо',
    show: true,
    id: 18,
    permission: true,
    position: 18
  },
  {
    title: 'Хаяг',
    show: true,
    id: 19,
    permission: true,
    position: 19
  },
  {
    title: 'Төлбөрийн хэлбэр',
    show: true,
    id: 20,
    permission: true,
    position: 20
  },
  {
    title: 'Pick Pack',
    show: true,
    id: 21,
    permission: true,
    position: 21
  },
  {
    title: 'Origin',
    show: true,
    id: 22,
    permission: true,
    position: 22
  },
  {
    title: 'VAT',
    show: true,
    id: 23,
    permission: true,
    position: 23
  },
  {
    title: 'user_date',
    show: false,
    id: 24,
    permission: false,
    position: 24
  },
  {
    title: 'Хариуцагч',
    show: true,
    id: 25,
    permission: true,
    position: 25
  },
  {
    title: 'Хариуцагч нэр',
    show: false,
    id: 26,
    permission: false,
    position: 26
  },
  {
    title: 'Утасны дугаар',
    show: false,
    id: 27,
    permission: false,
    position: 27
  },
  {
    title: 'Түгээгч код/нэр',
    show: true,
    id: 28,
    permission: true,
    position: 28
  },
  {
    title: 'Ачилт',
    show: false,
    id: 29,
    permission: false,
    position: 29
  },
  {
    title: 'Захиалга устгах',
    show: false,
    id: 30,
    permission: false,
    position: 30
  },
  {
    title: 'Утасны захиалга',
    show: false,
    id: 31,
    permission: false,
    position: 31
  },
  {
    title: 'Буцаалт',
    show: true,
    id: 32,
    permission: true,
    position: 32
  },
  {
    title: 'ХТ код/нэр',
    show: true,
    id: 33,
    permission: true,
    position: 33
  },
  {
    id: 34,
    permission: true,
    position: 2,
    title: 'Статус',
    show: true
  },

  {
    title: 'Захиалсан өдөр',
    show: true,
    id: 35,
    permission: true,
    position: 3
  },
  {
    title: 'Хүргүүлэх өдөр',
    show: true,
    id: 36,
    permission: true,
    position: 4
  }
];
const List2 = ({
  filteredData,
  setFilteredData,
  userData,
  setSelectedOrders,
  selectedOrders,
  fieldsData,
  setFieldsData,
  data,
  setData,
  setFilterState,
  filterState
}) => {
  const [headerLists, setHeaderLists] = useState([]);

  const dragList = useRef(0);
  const draggedOverList = useRef(0);

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
    butsaalt: 120
  };
  useEffect(() => {
    setHeaderLists(fieldsData?.order?.field ?? defaultHeaderList);
  }, [fieldsData]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = index => {
    setActiveTab(index);
  };
  const save = () => {};
  const updateUser = res => {
    let hList = [...headerLists];
    if (hList.length == 22) {
      hList = [
        ...hList,
        ...visibles
          .map(v => defaultHeaderList.filter(d => d.id == v)[0])
          .sort((a, b) => b.position - a.position)
          .map((b, i) => ({
            id: b.id,
            show: b.show,
            permission: b.permission,
            title: b.title,
            position: 36 - i
          }))
      ];
    }
    const data = {
      user_id: userData.id,
      tablePosition: {
        order: {
          field: res ? defaultHeaderList : hList,
          report: []
        },
        product: {
          field: [],
          report: []
        }
      }
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(data)
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        if (res.code === 200) {
          alert(`${res.message}`);
          window.location.reload();
        }
      })
      .catch(error => {
        alert(`Алдаа гарлаа. ${error}`);
      });
  };

  const handleSort = (dl, dol) => {
    let copyList = [...headerLists]
      .filter(h => !visibles.includes(h.id))
      .sort((a, b) => a.position - b.position);

    let prev = copyList.filter(c => c.position == dl)[0];
    let last = copyList.filter(c => c.position == dol)[0];
    let prevIndex = copyList.indexOf(prev);
    let lastIndex = copyList.indexOf(last);

    copyList[prevIndex].position = dol;
    copyList = copyList.map((c, i) => {
      if (prevIndex < lastIndex) {
        if (prevIndex < i && lastIndex >= i) {
          c.position -= 1;
        }
      }

      if (lastIndex < prevIndex) {
        if (prevIndex > i && lastIndex <= i) {
          c.position += 1;
        }
      }
      return c;
    });

    // const temp = copyList[dl];
    // copyList[dl] = copyList[dol];
    // copyList.filter((c) => c.position == dl)[0] = copyList.filter(
    //   (c) => c.position == dol
    // )[0];
    // copyList.filter((c) => c.position == dol)[0] = temp;
    setHeaderLists(copyList);
  };
  return (
    <div className='order_settings'>
      <div className='tab_buttons'>
        <button
          className={activeTab === 0 ? 'active' : ''}
          onClick={() => handleTabClick(0)}
        >
          <svg
            width='36'
            height='36'
            viewBox='0 0 36 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='36' height='36' rx='18' fill='#F2F2F2' />
            <path
              d='M22.2675 25.2032V13.1875'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M25.868 21.5898L22.2699 25.2045L18.6719 21.5898'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M13.5097 10.793V22.8087'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M9.91016 14.4077L13.5082 10.793L17.1062 14.4077'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
          Захиалгын багана, эрэмбийн тохиргоо
        </button>
        <button
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => handleTabClick(1)}
        >
          <svg
            width='36'
            height='36'
            viewBox='0 0 36 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='36' height='36' rx='18' fill='#F2F2F2' />
            <path
              d='M22.2675 25.2032V13.1875'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M25.868 21.5898L22.2699 25.2045L18.6719 21.5898'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M13.5097 10.793V22.8087'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M9.91016 14.4077L13.5082 10.793L17.1062 14.4077'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
          Захиалгын ерөнхий тохиргоо
        </button>
        <button
          className={activeTab === 2 ? 'active' : ''}
          onClick={() => handleTabClick(2)}
        >
          <svg
            width='36'
            height='36'
            viewBox='0 0 36 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='36' height='36' rx='18' fill='#F2F2F2' />
            <path
              d='M22.2675 25.2032V13.1875'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M25.868 21.5898L22.2699 25.2045L18.6719 21.5898'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M13.5097 10.793V22.8087'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M9.91016 14.4077L13.5082 10.793L17.1062 14.4077'
              stroke='#4D4D4D'
              stroke-width='1.37868'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
          Захиалгын дүнгийн тохиргоо
        </button>
      </div>
      {activeTab === 0 && (
        <div className='tab_content'>
          <ListHeader
            userData={userData}
            drag={true}
            handleSort={handleSort}
            sequence={sequence}
            headerLists={headerLists}
            users={[]}
            sequenceSizes={sequenceSizes}
            onFilterChange={() => {}}
            filterState={filterState}
            setFilterState={setFilterState}
            handleSpinner={() => {}}
          />

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '14px' }}>
              Багана зайг ихэсгэх багасгах тохируулах боломжтой
            </h3>
            <div
              className='stick_wrapper'
              style={{ fontSize: '12px', marginTop: '20px' }}
            >
              {headerLists &&
                headerLists
                  .filter(h => !visibles.includes(h.id))
                  .sort((a, b) => a.position - b.position)
                  ?.map((head, i) => {
                    return (
                      <div key={i}>
                        <label class='switch'>
                          <input
                            type='checkbox'
                            checked={head.show}
                            onChange={e => {
                              head.show = e.target.checked;
                              setHeaderLists(prev => [...prev]);
                            }}
                          />
                          <span class='slider round'></span>
                        </label>
                        {head.title}
                      </div>
                    );
                  })}
            </div>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button onClick={() => updateUser(false)}>Хадгалах</button>
              <button onClick={() => updateUser(true)}>Шинэчлэх</button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 1 && (
        <div className='tab_content'>
          <h3>Захиалгын ерөнхий тохиргоо</h3>
        </div>
      )}
      {activeTab === 2 && (
        <div className='tab_content'>
          <h3>Захиалгын дүнгийн тохиргоо</h3>
        </div>
      )}
    </div>
  );
};

export default List2;
