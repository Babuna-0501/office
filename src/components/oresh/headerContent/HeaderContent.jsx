import React from 'react';
import css from './headerContent.module.css';
import { Button } from '../../common';
import readXlsxFile from 'read-excel-file';
import myHeaders from '../../MyHeader/myHeader';
import ImportModal from './importModal';
import { useState } from 'react';
import { useEffect } from 'react';

const HeaderContent = () => {
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState();
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
        supplierId: {
          prop: 'supplierId',
          type: Number
        },
        merchantId: {
          prop: 'merchantId',
          type: Number
        },
        barcode: {
          prop: 'barcode',
          type: String
        },
        stock: {
          prop: 'stock',
          type: Number
        }
      };
      readXlsxFile(document.getElementById('read').files[0], {
        schema
      }).then(rows => {
        setData({
          data: rows.rows
        });
        setIsModal(true);
        console.log('rowssssaa', rows.rows);
      });
    });
  };

  const fetchData = async () => {
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/oresh/import`,
        requestOptions
      );

      const res = await response.json();

      if (res.code === 200) {
        alert('Амжилттай');
      } else {
        alert('Амжилтгүй боллоо: ' + res.message);
      }
      setIsModal(false);
    } catch (error) {
      console.error('Алдаа гарлаа:', error);
      alert('Сервертэй холбогдох үед алдаа гарлаа');
    }
  };
  // useEffect(() => {
  // }, []);

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Oresh</h1>
      </div>
      <div className={css.rightSide}>
        <Button variant='primary' size='medium' icon onClick={readExcel}>
          import
        </Button>
      </div>
      <ImportModal
        isModal={isModal}
        setIsModal={setIsModal}
        fetchData={fetchData}
        data={data}
      />
    </div>
  );
};

export default HeaderContent;
