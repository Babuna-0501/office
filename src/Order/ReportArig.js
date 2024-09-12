import css from './yunaReport.module.css';
import { useContext, useState } from 'react';
import OrderReportHook from '../Hooks/OrderReportHook';
import myHeaders from '../components/MyHeader/myHeader';
import LoadingSpinner from '../components/Spinner/Spinner';
import writeXlsxFile from 'write-excel-file';
import { useEffect } from 'react';
import supplierNameData from './arigJSONData/supplierNameData.json';
import smartIdSku from './arigJSONData/smartIdSku.json';

export const ReportArig = props => {
  const getSupplierRegister = async ({ supplier_id }) => {
    try {
      const url = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${supplier_id}`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      return resData.data[0].register || '';
    } catch (error) {
      console.log('Алдаа гарлаа', error);
      throw error; // Rethrow the error to handle it in the calling function.
    }
  };

  const checkSupplierName = el => {
    let response = el;
    if (props.userData.company_id === '|13954|') {
      supplierNameData.map(e => {
        if (
          el
            ?.toLowerCase()
            .replace(/\s/g, '')
            .includes(e.supplierName?.toLowerCase().replace(/\s/g, ''))
        ) {
          response = e.supplierCode;
        }
      });
    }
    return response;
  };

  const checkSupplierNoat = ({ name, noat }) => {
    let isNoat = false;
    if (props.userData.company_id === '|14045|') {
      isNoat = true;
    } else {
      for (let i = 0; i <= supplierNameData.length; i++) {
        if (
          name
            ?.toLowerCase()
            .includes(supplierNameData[i]?.supplierName?.toLowerCase())
        ) {
          isNoat = supplierNameData[i]?.Noat;
        }
      }
    }

    return isNoat || noat === 'НӨАТ-ын дүн' ? noat : '';
  };

  const checkSmartId = ({ sku }) => {
    let result = sku;

    for (const item of smartIdSku) {
      for (const key in item) {
        if (key?.toString() === sku?.toString()) {
          result = item[key]?.toString();
        }
      }
    }

    return result;
  };
  const [schema, setSchema] = useState([
    {
      column: 'DocumentId',
      type: String,
      value: order => order.id,
      width: 10,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'DocumentNumber',
      type: String,
      value: order => order.orderId,
      width: 12,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'DocumentDate',
      // type: String,
      value: order => order.date,
      width: 20,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'DocumentDesc',
      type: String,
      value: order => order.category,
      width: 15,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'CustomerId',
      // type: String,
      value: order => checkSupplierName(order.supplier),
      width: 20,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'WarehouseId',
      type: String,
      value: order => order.address,
      width: 20,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'ToWarehouseId',
      type: String,
      value: order => order.toWarehouseId,
      width: 20,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'AccountId',
      type: String,
      value: order => order.bankAccount,
      width: 20,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'ItemId',
      type: String,
      value: order => checkSmartId({ sku: order.product_sku }),
      width: 20,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'ItemName',
      // type: String,
      value: order => order.productNames,
      width: 20,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'Qty',
      // type: String,
      value: order => order.productQuantity,
      width: 15,
      align: 'right',
      alignVertical: 'center'
      // format: "#,##0.00",
    },
    {
      column: 'UnitPrice',
      // type: String,
      value: order => order.productPrice,
      width: 15,
      align: 'right',
      alignVertical: 'center'
      // format: "#,##0.00",
    },
    {
      column: 'VatAmount',
      // type: String,
      value: order =>
        checkSupplierNoat({ noat: order.noat, name: order.supplier }),
      width: 15,
      align: 'right',
      alignVertical: 'center'
      // format: "#,##0.00",
    },
    {
      column: 'Amount',
      // type: String,
      value: order => order.totalAmount,
      width: 15,
      align: 'right',
      alignVertical: 'center'
      // format: "#,##0.00",
    },
    {
      column: 'DocumentS1',
      type: String,
      value: order => order.segmentOne,
      width: 30,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'DocumentS2',
      type: String,
      value: order => order.segmentTwo,
      width: 30,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'DocumentS3',
      type: String,
      value: order => order.segmentThree,
      width: 30,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'DocumentS4',
      type: String,
      value: order => order.segmentFour,
      width: 30,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'DocumentS5',
      type: String,
      value: order => order.segmentFive,
      width: 30,
      align: 'left',
      alignVertical: 'center'
    },
    {
      column: 'IsConvert',
      type: String,
      value: order => 'Үгүй',
      width: 15,
      align: 'left',
      alignVertical: 'center'
    }
  ]);

  const { setShowArigReport, yunaTailanType } = useContext(OrderReportHook);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [reportData, setReportData] = useState([]);

  const [reportLoading, setReportLoading] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  useEffect(() => {
    ////|| Number(props.userData.company_id !== 907)
    if (!props.permissionData.order.report) {
      alert('Танд тайлангийн эрх байхгүй байна.');
      setShowArigReport(false);
    }
  }, [props, setShowArigReport]);

  const generateReport = async () => {
    try {
      setReportLoading(true);

      if (startDate === '' || endDate === '') {
        alert('Эхлэх болон Дуусах өдрүүдээ оруулна уу');
        return;
      }

      if (endDate < startDate) {
        alert('Эхлэх болон Дуусах өдрийг буруу сонгосон байна');
        setStartDate('');
        setEndDate('');
        return;
      }

      // let orderUrl = `${process.env.REACT_APP_API_URL2}/api/orders?order_type=1&order_status=3&order_start=${startDate}&order_end=${endDate}&page=all`;
      // if (props.userData.company_id === '|14045|') {
      //   orderUrl = `${process.env.REACT_APP_API_URL2}/api/orders?order_type=1&order_status=3&order_start=${startDate}&order_end=${endDate}&page=all`;
      // }

      let orderUrl = `${process.env.REACT_APP_API_URL2}/api/orders?order_type=1&order_status=3&order_start=${startDate}&order_end=${endDate}&page=all`;
      if (props.userData.company_id === '|14045|') {
        orderUrl = `${process.env.REACT_APP_API_URL2}/api/orders?order_type=1&order_status=3&order_start=${startDate}&order_end=${endDate}&page=all`;
      }

      const categoriesUrl = `${process.env.REACT_APP_API_URL}/api/site_data`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const [orderRes, categoriesRes] = await Promise.all([
        fetch(orderUrl, requestOptions),
        fetch(categoriesUrl, requestOptions)
      ]);
      const orderResData = await orderRes.json();
      const categoriesResData = await categoriesRes.json();

      // subHeader maygaar ashiglaj bn
      const reportDataCopy = [
        {
          id: 'Гүйлгээ',
          orderId: 'Баримтын №',
          date: 'Огноо',
          supplier: 'Бэлтгэн нийлүүлэгч',
          address: yunaTailanType === 2 ? 'Зарлагын байршил' : 'Байршил',
          toWarehouseId: 'Орлогын байршил',
          productNames: 'Барааны нэр',
          productPrice: 'Нэгж үнэ',
          noat: 'НӨАТ-ын дүн',
          product_sku: 'Барааны код',
          productQuantity: 'Тоо хэмжээ',
          totalAmount: 'Дүн',
          bankAccount: 'Харьцсан данс',
          category: 'Гүйлгээний утга',
          segmentOne: 'Баримтын сегмент 1',
          segmentTwo: 'Баримтын сегмент 2',
          segmentThree: 'Баримтын сегмент 3',
          segmentFour: 'Баримтын сегмент 4',
          segmentFive: 'Баримтын сегмент 5',
          IsConvert: 'хөрвүүлэлт'
        }
      ];
      const schemaCopy = schema.map(obj => ({ ...obj }));

      let id = 1;
      for (const order of orderResData.data) {
        if (order.supplier_name.length + 5 > schemaCopy[4].width) {
          schemaCopy[4].width = order.supplier_name.length + 5;
        }

        if (order.tradeshop_name.length + 5 > schemaCopy[5].width) {
          schemaCopy[5].width = order.tradeshop_name.length + 5;
        }

        for (const product of order.line) {
          const reportOrder = {};

          reportOrder.id = id + '';
          reportOrder.orderId = order.order_id + '';

          // date start
          const inputDate = new Date(order.order_date);
          const month = inputDate.getMonth() + 1;
          const day = inputDate.getDate();
          const year = inputDate.getFullYear();
          reportOrder.date = `${month}/${day}/${year}`;
          // date end

          // 14045 for yuna
          props.userData.company_id === '|14045|'
            ? (reportOrder.supplier = reportOrder.supplier =
                await getSupplierRegister({
                  supplier_id: order.supplier_id
                }))
            : (reportOrder.supplier = order.supplier_name);

          props.userData.company_id === '|14045|'
            ? (reportOrder.address =
                yunaTailanType === 2
                  ? '006'
                  : order.tradeshop_name?.slice(0, 3))
            : (reportOrder.address = order.tradeshop_name?.slice(0, 4));

          reportOrder.toWarehouseId = order.tradeshop_name?.slice(0, 3);
          reportOrder.productNames = product.product_name;
          reportOrder.productPrice = product.price;
          // 14045 for yuna
          reportOrder.bankAccount =
            props.userData.company_id === '|14045|' ? '310101' : '31010001';
          reportOrder.noat = (
            ((product.price * product.quantity) / 1.1) *
            0.1
          ).toFixed(2);
          reportOrder.product_sku = product.product_sku;
          reportOrder.productQuantity = product.quantity;
          reportOrder.totalAmount = product.price * product.quantity;

          if (product.product_name.length + 5 > schemaCopy[8].width) {
            schemaCopy[8].width = product.product_name.length + 5;
          }

          if (props.userData.company_id === '|14045|') {
            reportOrder.category = `Худалдан авалт /Нэх/ - ${order.tradeshop_name?.slice(
              0,
              3
            )}`;
            schemaCopy[3].width = reportOrder.category.length;
          } else {
            for (const category of categoriesResData.categories) {
              if (category.id === product.product_type_id) {
                reportOrder.category = category.name;

                if (category.name.length + 5 > schemaCopy[3].width) {
                  schemaCopy[3].width = category.name.length + 5;
                }
                break;
              }
            }
          }
          reportDataCopy.push(reportOrder);
        }
        id++;
      }

      if (yunaTailanType === 2) {
        const yunaType2Fields = [
          'DocumentId',
          'DocumentNumber',
          'DocumentDate',
          'DocumentDesc',
          'WarehouseId',
          'ToWarehouseId',
          'ItemId',
          'ItemName',
          'Qty',
          'IsConvert'
        ];

        const filteredSchema = schemaCopy.filter(schema =>
          yunaType2Fields.includes(schema.column)
        );
        setSchema(filteredSchema);
      } else {
        const filteredSchema = schemaCopy.filter(
          schema => !['ToWarehouseId', 'IsConvert'].includes(schema.column)
        );
        setSchema(filteredSchema);
      }

      setReportData(reportDataCopy);
      setReportReady(true);
    } catch (error) {
      console.log('error while generating report: ', error);
      alert('Тайлан бэлтгэхэд алдаа гарлаа.');
    } finally {
      setReportLoading(false);
    }
  };
  const downloadReport = () => {
    writeXlsxFile(reportData, {
      schema,
      fileName:
        props.userData.company_id === '|14045|'
          ? `yuna-report-/${startDate}/-/${endDate}/.xlsx`
          : `arig-report-/${startDate}/-/${endDate}/.xlsx`,
      headerStyle: {
        backgroundColor: '#ffc000',
        align: 'center',
        alignVertical: 'center',
        borderColor: '#000000'
      },
      fontFamily: 'Calibri',
      fontSize: 11,
      alignVertical: 'center',
      align: 'center',
      dateFormat: 'mm/dd/yyyy',
      stickyRowsCount: 2,
      sheet: 'PurchaseMany'
    });
  };

  const refresh = () => {
    setReportReady(false);
    setStartDate('');
    setEndDate('');
    setReportData([]);
    setReportLoading(false);
  };

  const closeHandler = () => setShowArigReport(false);

  return (
    <div id='formwithtransparentbackground'>
      <div id='form' style={{ height: 240, width: 400 }}>
        <div className={css.wrapper}>
          <div className={css.headerWrapper}>
            <h1 className={css.title}>
              {props.userData.company_id === '|14045|'
                ? 'Юна тайлан'
                : 'Ариг тайлан'}
            </h1>
            <button
              onClick={closeHandler}
              type='button'
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
                    value={startDate}
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
                disabled={reportLoading}
                onClick={generateReport}
                className={css.submitBtn}
                type='button'
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
