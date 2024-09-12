import React, { useContext, useState, useEffect } from 'react';
import css from './reportburamhan.module.css';
import ExcelJS from 'exceljs';
import OrderReportHook from '../Hooks/OrderReportHook';
import LoadingSpinner from '../components/Spinner/Spinner';
import { Button } from '../components/common';
import myHeaders from '../components/MyHeader/myHeader';

const ReportBuramhan = () => {
  const reportCtx = useContext(OrderReportHook);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [data, setData] = useState();
  const [excelData, setExcelData] = useState([]);

  const [reportLoad, setReportLoad] = useState(false);
  const [download, setDownload] = useState(false);

  const getData = () => {
    if (startDate && endDate) {
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const url = `${process.env.REACT_APP_API_URL2}/api/orders/?order_type=1&order_start=${startDate}&order_end=${endDate}`;

      fetch(url, requestOptions)
        .then(r => r.json())
        .then(res => {
          console.log('TEST: ', res);
          setData(res.data);
          setDownload(true);
        });
    } else {
      alert('Эхлэх болон дуусах огноо оруулна уу.');
    }
  };

  const createExcelTemplate = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Тайлан');

    worksheet.columns = [
      {
        header: 'Дугаар',
        key: 'number'
      },
      {
        header: 'Огноо',
        key: 'date'
      },
      {
        header: 'Харилцагч код',
        key: 'merchantCode'
      },
      {
        header: 'Харилцагч нэр',
        key: 'merchantName'
      },
      {
        header: 'Борлуулагч',
        key: 'seller'
      },
      {
        header: 'Пос код',
        key: 'posCode'
      },
      {
        header: 'Багц №',
        key: 'pack'
      },
      {
        header: 'Бараа данс',
        key: 'prodAcc'
      },
      {
        header: 'Данс нэр',
        key: 'accountName'
      },
      {
        header: 'Бараа код',
        key: 'prodCode'
      },
      {
        header: 'Бараа нэр',
        key: 'prodName'
      },
      {
        header: 'Бараа тайлбар',
        key: 'prodDesc'
      },
      {
        header: 'Comment',
        key: 'comment'
      },
      {
        header: 'Тоо хэмжээ',
        key: 'quantity'
      },
      {
        header: 'Нэгж үнэ',
        key: 'price'
      },
      {
        header: 'Нийт үнэ',
        key: 'total'
      },
      {
        header: 'Хөнгөлөлт',
        key: 'discount'
      },
      {
        header: 'Нэгж дүн',
        key: 'singlePrice'
      },
      {
        header: 'Нийт дүн',
        key: 'singleTotal'
      },
      {
        header: 'НӨАТ',
        key: 'noat'
      },
      {
        header: 'НХАТ',
        key: 'nhat'
      },
      {
        header: 'Сериал дугаар',
        key: 'serialNum'
      },
      {
        header: 'Дуусах огноо',
        key: 'endDate'
      }
    ];

    let number = 1;

    for (const order of data) {
      for (const product of order.line) {
        console.log('PRODUCT:', product);
        const parsedData = JSON.parse(order.order_data);
        worksheet.addRow({
          number: number,
          date: order.delivery_date.slice(0, 10),
          merchantCode: order.order_id,
          merchantName: order.tradeshop_name,
          seller: parsedData.payment.userName,
          prodCode: product.product_bar_code,
          prodName: product.product_name,
          // prodDesc: `productaas gargaj irne`,
          quantity: product.quantity,
          price: product.base_price,
          total: product.amount,
          singlePrice: product.base_price,
          singleTotal: product.amount,
          noat: (product.amount / 11).toFixed(0),
          nhat: product.city_tax
        });
        number++;
      }
    }

    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'тайлан.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
      reportCtx?.setBuramhanReport(false);
    });
  };

  useEffect(() => {
    if (download) {
      createExcelTemplate();
    }
  }, [download]);

  const renderHTML = (
    <div className={css.container}>
      <div className={css.header}>
        <span>Бурамхан Тайлан</span>
        <div
          className={css.closeBtn}
          onClick={() => reportCtx.setBuramhanReport(false)}
        >
          Хаах
        </div>
      </div>
      <div className={css.body}>
        {/* <SelectCompany setSupSelect={setSuppSelect} /> */}
        <div className={css.dateSelect}>
          <label>Эхлэх огноо</label>
          <input
            type='date'
            className='dateselect'
            id='date_start'
            onChange={e => setStartDate(e.target.value)}
            value={startDate}
          />
        </div>
        <div className={css.dateSelect}>
          <label>Дуусах огноо</label>
          <input
            type='date'
            className='dateselect'
            id='date_end'
            onChange={e => setEndDate(e.target.value)}
            value={endDate}
          />
        </div>
        {!reportLoad && (
          <div className={css.downloadBtn}>
            <Button onClick={() => getData()} variant='primary' size='medium'>
              Тайлан татах
            </Button>
          </div>
        )}
        {reportLoad && (
          <div className={css.spinnercontainer}>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div id='formwithtransparentbackground'>
      <div id='form'>{renderHTML}</div>
      <div id='transparentbackground'></div>
    </div>
  );
};

export default ReportBuramhan;
