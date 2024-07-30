import { useContext, useEffect, useState } from 'react';
import css from './yunaReport.module.css';
import OrderReportHook from '../Hooks/OrderReportHook';
import LoadingSpinner from '../components/Spinner/Spinner';
import myHeaders from '../components/MyHeader/myHeader';
import writeXlsxFile from 'write-excel-file';

// Array of tradeshop IDs
const tradeshopIds = [
  3601, 5880, 5881, 5882, 5883, 5885, 5887, 6200, 6222, 6268, 10220
];

// Initial schema for the Excel file
const initialSchema = [
  {
    column: 'Код',
    type: String,
    value: d => d.sku,
    width: 10,
    alignVertical: 'center',
    align: 'center'
  },
  {
    column: 'Нэр',
    type: String,
    value: d => d.name,
    width: 0,
    alignVertical: 'center',
    align: 'center'
  }
];

export const YunaReport = props => {
  const { setShowYunaReport } = useContext(OrderReportHook);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [starDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [schema, setSchema] = useState(initialSchema);
  const [reportData, setReportData] = useState([]);

  // Check user permissions
  useEffect(() => {
    if (!props.permissionData.order.report) {
      alert('Танд тайлангийн эрх байхгүй байна.');
      setShowYunaReport(false);
    }
  }, [props, setShowYunaReport]);

  // Generate the report
  const generateReport = async () => {
    try {
      setReportLoading(true);

      // Validate dates
      if (starDate === '' || endDate === '') {
        alert('Эхлэх болон Дуусах өдрүүдээ оруулна уу');
        return;
      }

      if (endDate < starDate) {
        alert('Эхлэх болон Дуусах өдрийг буруу сонгосон байна');
        setStartDate('');
        setEndDate('');
        return;
      }

      // Fetch data from API
      const orderUrl = `${process.env.REACT_APP_API_URL2}/api/orders?order_type=1&supplier_id=14045&order_start=${starDate}&order_end=${endDate}&page=all`;
      const tradeshopUrl = `${
        process.env.REACT_APP_API_URL2
      }/api/merchants?id=${tradeshopIds.toString()}&page=all`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const [orderRes, tradeshopRes] = await Promise.all([
        fetch(orderUrl, requestOptions),
        fetch(tradeshopUrl, requestOptions)
      ]);

      if (!orderRes.ok) {
        const errorText = await orderRes.text();
        console.error('Order API response error:', errorText);
        alert('Захиалгын API-с алдаа ирлээ.');
        return;
      }

      if (!tradeshopRes.ok) {
        const errorText = await tradeshopRes.text();
        console.error('Tradeshop API response error:', errorText);
        alert('Худалдааны дэлгүүрийн API-с алдаа ирлээ.');
        return;
      }

      const orderData = await orderRes.json();
      const tradeshopData = await tradeshopRes.json();

      if (orderData.data.length === 0) {
        alert('Сонгосон хугацаанд захиалга хийгдээгүй байна.');
        setStartDate('');
        setEndDate('');
        return;
      }

      // Create a copy of the schema and update it with tradeshop data
      const schemaCopy = [...schema];

      for (const data of tradeshopData.data) {
        schemaCopy.push({
          column: data.tradeshop_name,
          type: Number,
          value: d => d[data.tradeshop_id],
          width: data.tradeshop_name.length,
          alignVertical: 'center',
          align: 'center',
          id: data.tradeshop_id
        });
      }

      schemaCopy.push({
        column: 'Нийт',
        type: Number,
        value: d => d.total,
        alignVertical: 'center',
        align: 'center'
      });

      // Process order data to match the schema
      let initProducts = [];
      for (const order of orderData.data) {
        for (const prod of order.line) {
          initProducts.push({ ...prod, tradeshop_id: order.tradeshop_id });
        }
      }

      const uniqueProducts = initProducts
        .filter(
          (obj, index, self) =>
            index === self.findIndex(o => o.product_id === obj.product_id)
        )
        .sort((a, b) => a.product_sku - b.product_sku);

      const reportDataCopy = uniqueProducts.map(product => ({
        sku: product.product_sku,
        name: product.product_name,
        id: product.product_id,
        total: 0,
        ...tradeshopData.data.reduce(
          (acc, shop) => ({ ...acc, [shop.tradeshop_id]: 0 }),
          {}
        )
      }));

      initProducts.forEach(product => {
        const reportProduct = reportDataCopy.find(
          obj => obj.id === product.product_id
        );
        reportProduct[product.tradeshop_id] += product.quantity;
        reportProduct.total += product.quantity;
      });

      // Remove tradeshops with zero sales
      const repCopy = reportDataCopy.map(obj => ({ ...obj }));
      tradeshopIds.forEach(id => {
        const allHasZero = repCopy.every(rep => rep[id] === 0);
        if (allHasZero) {
          repCopy.forEach(rep => delete rep[id]);
          const indexSchema = schemaCopy.findIndex(el => el.id === id);
          schemaCopy.splice(indexSchema, 1);
        }
      });

      // Remove unnecessary properties
      repCopy.forEach(data => delete data.id);
      schemaCopy.forEach(schem => delete schem.id);

      setSchema(schemaCopy);
      setReportData(repCopy);
      setReportReady(true);
    } catch (error) {
      console.log('error while generating report: ', error);
      alert('Тайлан бэлтгэхэд алдаа гарлаа.');
    } finally {
      setReportLoading(false);
    }
  };

  // Download the report
  const downloadReport = () => {
    writeXlsxFile(reportData, {
      schema,
      fileName: `yuna-report-/${starDate}/-/${endDate}/.xlsx`,
      headerStyle: {
        backgroundColor: '#d3d3d3',
        align: 'center',
        alignVertical: 'center',
        borderColor: '#000000'
      },
      fontFamily: 'Tahoma',
      fontSize: 8,
      alignVertical: 'center'
    });
  };

  // Reset the state
  const refresh = () => {
    setReportReady(false);
    setStartDate('');
    setEndDate('');
    setSchema(initialSchema);
    setReportData([]);
    setReportLoading(false);
  };

  // Hide the report view
  const closeHandler = () => setShowYunaReport(false);

  return (
    <div id='formwithtransparentbackground'>
      <div id='form' style={{ height: 240, width: 400 }}>
        <div className={css.wrapper}>
          <div className={css.headerWrapper}>
            <h1 className={css.title}>Yuna тайлан</h1>
            <button
              type='button'
              onClick={closeHandler}
              className={css.closeBtn}
            >
              Хаах
            </button>
          </div>

          <div className={css.contentWrapper}>
            {!reportLoading && !reportReady && (
              <>
                <div className={css.datePickerContainer}>
                  <label htmlFor='startDate'>Эхлэх огноо</label>
                  <input
                    id='startDate'
                    type='date'
                    className='dateselect'
                    style={{ width: '100%' }}
                    value={starDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>

                <div className={css.datePickerContainer}>
                  <label htmlFor='endDate'>Дуусах огноо</label>
                  <input
                    id='endDate'
                    type='date'
                    className='dateselect'
                    style={{ width: '100%' }}
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                </div>
              </>
            )}
            {!reportLoading && reportReady && (
              <div className={css.textWrapper}>
                <h1>Тайлан амжилттай үүслээ...</h1>
              </div>
            )}
            {reportLoading && (
              <div className={css.spinnerWrapper}>
                <LoadingSpinner />
              </div>
            )}
          </div>

          <div className={css.btnWrapper}>
            {!reportReady && (
              <button
                onClick={generateReport}
                className={css.submitBtn}
                type='button'
                disabled={reportLoading}
              >
                Тайлан бэлтгэх
              </button>
            )}
            {reportReady && (
              <>
                <button
                  onClick={refresh}
                  className={css.refreshBtn}
                  type='button'
                >
                  Дахин тайлан бэлтгэх
                </button>
                <button
                  onClick={downloadReport}
                  className={css.submitBtn}
                  type='button'
                >
                  Тайлан татах
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div onClick={closeHandler} id='transparentbackground'></div>
    </div>
  );
};
