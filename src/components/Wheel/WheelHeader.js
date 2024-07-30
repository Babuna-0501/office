import React, { useState } from 'react';
import upload from '../../assets/Upload_white.svg';
import css from './upointheader.module.css';
import { Modal } from 'antd';
import writeXlsxFile from 'write-excel-file';
import { Button } from '../common';

const WheelHeader = () => {
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const schema = [
    {
      column: 'Хаяг',
      type: String,
      value: d => d.Address1
    },
    {
      column: 'Огноо',
      type: String,
      value: d => d.CreatedDate
    },
    {
      column: 'ID',
      type: String,
      value: d => d.ID
    },
    {
      column: 'Утас',
      type: String,
      value: d => d.PhoneNumber
    },
    {
      column: 'Prize',
      type: String,
      value: d => d.Prize
    },
    {
      column: 'PrizeTitle',
      type: String,
      value: d => d.PrizeTitle
    },
    {
      column: 'Статус',
      type: String,
      value: d => d.Status
    },
    {
      column: 'Захиалгын үнийн дүн',
      type: String,
      value: d => d.TotalAmount
    },
    {
      column: 'TradeshopID',
      type: String,
      value: d => d.TradeshopID
    },
    {
      column: 'TradeshopName',
      type: String,
      value: d => d.TradeshopName
    },
    {
      column: 'UpdatedDate',
      type: String,
      value: d => d.UpdatedDate
    },
    {
      column: 'UserID',
      type: String,
      value: d => d.UserID
    }
  ];
  const output = (lines, dates) => {
    writeXlsxFile(lines, {
      schema,
      fileName: `SPINNING_WHEEL_INFO_${dates}.xlsx`
    });
  };

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
      var myHeaders = new Headers();
      myHeaders.append(
        'ebazaar_token',
        localStorage.getItem('ebazaar_admin_token')
      );
      myHeaders.append('Content-Type', 'application/json');
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/spinningwheel/get?date_start=${start_date.value}&date_end=${end_date.value}`,
        requestOptions
      )
        .then(r => r.json())
        .then(response => {
          let csv = [];
          response.result.map(item => {
            const Address1 = item.Address1;
            const CreatedDate = item.CreatedDate;
            const ID = item.ID;
            const PhoneNumber = item.PhoneNumber;
            const Prize = item.Prize;
            const PrizeTitle = item.PrizeTitle;
            const Status = item.Status;
            const TotalAmount = item.TotalAmount;
            const TradeshopID = item.TradeshopID;
            const TradeshopName = item.TradeshopName;
            const UpdatedDate = item.UpdatedDate;
            const UserID = item.UserID;

            let template = {
              Address1: String(Address1),
              CreatedDate: String(CreatedDate),
              ID: String(ID),
              PhoneNumber: String(PhoneNumber),
              Prize: String(Prize),
              PrizeTitle: String(PrizeTitle),
              Status: String(Status),
              TotalAmount: String(TotalAmount),
              TradeshopID: String(TradeshopID),
              TradeshopName: String(TradeshopName),
              UpdatedDate: String(UpdatedDate),
              UserID: String(UserID)
            };
            csv.push(template);
          });

          output(csv, start_date.value + '_' + end_date.value);
          setExporting(false);
        });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Button
        variant='primary'
        size='medium'
        icon
        onClick={() => {
          setOpen(true);
        }}
      >
        <img src={upload} alt='upload' />
        Тайлан
      </Button>
      <Modal
        title={
          <div
            style={{
              fontSize: '18px',
              fontWeight: '700'
            }}
          >
            Тайлан татах
          </div>
        }
        centered
        open={open}
        onOk={() => {
          exporter();
        }}
        onCancel={() => setOpen(false)}
        width='600px'
        okText={
          exporting ? (
            <span>Түр хүлээнэ үү ... </span>
          ) : (
            <span>Тайлан бэлтгэх</span>
          )
        }
        cancelText={'Цуцлах'}
        bodyStyle={{ padding: '5px 30px' }}
      >
        <div>
          <label>Эхлэх огноо</label>
          <input type='date' className='dateselect' id='date_start' />
        </div>
        <div>
          <label>Дуусах огноо</label>
          <input type='date' className='dateselect' id='date_end' />
        </div>
      </Modal>
    </div>
  );
};

export default WheelHeader;
