import React, { useState, useEffect, useContext } from 'react';
import CSV from './CSV';
import writeXlsxFile from 'write-excel-file';
import UpointHook from '../Hooks/UpointHook';
import myHeaders from '../components/MyHeader/myHeader';
const schema = [
  {
    column: 'Захиалгын дугаар',
    type: String,
    value: d => d.OrderID
  },
  {
    column: 'Захиалсан өдөр',
    type: String,
    value: d => d.OrderDate
  },
  {
    column: 'Хэрэглэгчийн ID',
    type: String,
    value: d => d.UserID
  },
  {
    column: 'Хэрэглэгчийн утас',
    type: String,
    value: d => d.UserPhone
  },
  {
    column: 'Дэлгүүрийн утас',
    type: String,
    value: d => d.TradeshopPhone
  },
  {
    column: 'Upoint дугаар',
    type: String,
    value: d => d.UpointNumber
  },
  {
    column: 'Upoint холболт',
    type: String,
    value: d => d.Active
  },
  {
    column: 'Бонус оноо',
    type: String,
    value: d => d.BonusAmount
  },
  {
    column: 'Олголтын төлөв',
    type: String,
    value: d => d.Status
  },
  {
    column: 'Оноо зарцуулалт',
    type: String,
    value: d => d.ConsumeAmount
  },
  {
    column: 'Tradeshop нэр',
    type: String,
    value: d => d.Tradeshop
  },
  {
    column: 'Хаяг',
    type: String,
    value: d => d.Address
  }
];

const output = (lines, dates) => {
  writeXlsxFile(lines, {
    schema,
    fileName: `UPOINT_ORDER_INFO_${dates}.xlsx`
  });
};

function Userreport(props) {
  let [exporting, setExporting] = useState(false);
  let [data, setData] = useState(true);
  let [foo, setFoo] = useState(false);

  const upointCTX = useContext(UpointHook);
  let csv = [
    [
      'OrderID',
      'UserID',
      'UserPhone',
      'TradeshopPhone',
      'UpointNumber',
      'Active',
      'BonusAmount',
      'Status',
      'ConsumeAmount',
      'Tradeshop',
      'Address'
    ]
  ];
  let [blah, setBlah] = useState(csv);

  const exporter = () => {
    const start_date = document.getElementById('date_start');
    const end_date = document.getElementById('date_end');
    const borderColor = document.getElementById('date_start').style.borderColor;
    start_date.style.borderColor =
      start_date.value === '' ? 'red' : borderColor;
    end_date.style.borderColor = end_date.value === '' ? 'red' : borderColor;
    if (start_date.value === '' || end_date.value === '') {
      setTimeout(() => {
        start_date.style.borderColor = borderColor;
        end_date.style.borderColor = borderColor;
      }, 2000);
      return;
    } else {
      setExporting(true);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/upoint/orders?start_date=${start_date.value}&end_date=${end_date.value}`,

        requestOptions
      )
        .then(r => r.json())
        .then(response => {
          let csv = [];
          response.map(item => {
            const OrderID = item.OrderID;
            const OrderDate = item.OrderDate;
            const UserID = item.UserID;
            const UserPhone = item.UserPhone;
            const TradeshopPhone = item.TradeshopPhone;
            const UpointNumber = item.UpointNumber;
            const Active = item.Active === true ? 'Холболттой' : 'Холболтгүй';
            const BonusAmount = item.BonusAmount;
            const Status = item.Status === true ? 'Олгосон' : 'Олгоогүй';
            const ConsumeAmount = item.ConsumeAmount;
            const Tradeshop = item.Tradeshop;
            const Address = item.Address;

            let template = {
              OrderID: String(OrderID),
              OrderDate: String(OrderDate),
              UserID: String(UserID),
              UserPhone: String(UserPhone),
              TradeshopPhone: String(TradeshopPhone),
              UpointNumber: String(UpointNumber),
              Active: String(Active),
              BonusAmount: String(BonusAmount),
              Status: String(Status),
              ConsumeAmount: String(ConsumeAmount),
              Tradeshop: String(Tradeshop),
              Address: String(Address)
            };
            csv.push(template);
          });

          output(csv, start_date.value + '_' + end_date.value);
          setExporting(false);
          upointCTX.setUserreport(false);
        });
    }
  };
  useEffect(() => {
    //getOrders()
  }, []);

  let renderHTML =
    foo && data && blah.length > 1 ? (
      <>
        <CSV data={blah} />
      </>
    ) : (
      <>
        <span id='close' onClick={() => upointCTX.setUserreport(false)}>
          Close
        </span>
        <div>
          <label>Эхлэх огноо</label>
          <input type='date' className='dateselect' id='date_start' />
        </div>
        <div>
          <label>Дуусах огноо</label>
          <input type='date' className='dateselect' id='date_end' />
        </div>
        <div className='margintop1rem'>
          {exporting ? (
            <span>Түр хүлээнэ үү ... </span>
          ) : (
            <span className='btn-tech' onClick={() => exporter()}>
              Тайлан бэлтгэх
            </span>
          )}
        </div>
      </>
    );
  return (
    <div id='formwithtransparentbackground'>
      <div id='form'>{renderHTML}</div>
      <div id='transparentbackground'></div>
    </div>
  );
}

export default Userreport;
