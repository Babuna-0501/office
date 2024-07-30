import React, { useContext, useState } from 'react';
import css from './merchantreportbtn.module.css';
import upload from '../../assets/Upload_white.svg';
import MerchantReportHook from '../../Hooks/MerchantReportHook';
import MerchantRegisterHook from '../../Hooks/MerchantRegisterHook';
import readXlsxFile from 'read-excel-file';
import myHeaders from '../MyHeader/myHeader';
import { Button } from '../common';
import SettingOpen from '../../Merchants/Settings/SettingOpen';
const MerchantReportBtn = () => {
  const [open, setOpen] = useState(false);
  const ctx = useContext(MerchantReportHook);
  const merRegisterctx = useContext(MerchantRegisterHook);

  // console.log("ctx----------", ctx);
  const exportHandler = () => {
    ctx.setExportReport(true);
  };
  const newExportHandler = () => {
    merRegisterctx.setNewMerchant(true);
  };
  const newSuphandler = () => {
    ctx.setNewSup(true);
  };

  const readExcel = () => {
    const id = (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
    document
      .getElementById('root')
      .insertAdjacentHTML(
        'beforeEnd',
        '<form method="post" enctype="multipart/form‐data" id="' +
          id +
          '" name=' +
          id +
          '><input type="file" id="read" /></form>'
      );

    document.getElementById('read').click();
    document.getElementById('read').addEventListener('change', () => {
      const schema = {
        name: {
          prop: 'name',
          type: String
        },
        rd: {
          prop: 'rd',
          type: String
        },
        phone: {
          prop: 'phone',
          type: String
        },

        address: {
          prop: 'address',
          type: String
        }
      };
      readXlsxFile(document.getElementById('read').files[0], { schema }).then(
        rows => {
          console.log('rows', rows);
          // ctx.setNewImportData(rows.rows);

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          rows.rows &&
            rows.rows.map(item => {
              return fetch(
                `${process.env.REACT_APP_API_URL2}/api/merchants?register=${item.rd}`,
                requestOptions
              )
                .then(res => res.json())
                .then(res => {
                  // console.log("merchantRegister", res);
                  let newUpdate = [];

                  if (res.data.length !== 0) {
                    newUpdate.push({
                      ...item,
                      city: null,
                      district: null,
                      khoroo: null,
                      channel_name: null,
                      sub: true,
                      checked: true
                    });
                  } else if (res.data.length === 0) {
                    newUpdate.push({
                      ...item,
                      city: null,
                      district: null,
                      khoroo: null,
                      channel_name: null,
                      sub: false,
                      checked: false
                    });
                  }
                  ctx.setNewImportData(prev => [...prev, ...newUpdate]);
                })
                .catch(error => {
                  console.log('error', error);
                });
            });
        }
      );
    });
  };

  return (
    <div className={css.container}>
      <Button
        variant='primary'
        size='medium'
        onClick={() => {
          setOpen(true);
        }}
      >
        Мерчант тохиргоо
      </Button>
      <Button
        variant='primary'
        size='medium'
        onClick={() => {
          newSuphandler();
          readExcel();
        }}
      >
        Харилцагч бүртгэх
      </Button>
      <Button variant='primary' size='medium' onClick={newExportHandler}>
        Шинээр нэмэх
      </Button>
      <Button variant='primary' size='medium' onClick={exportHandler} icon>
        <img src={upload} alt='upload' />
        Export
      </Button>
      {open && <SettingOpen setOpen={setOpen} />}
    </div>
  );
};

export default MerchantReportBtn;
