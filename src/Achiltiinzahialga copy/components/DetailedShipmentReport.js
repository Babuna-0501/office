// CSS
import { useState } from 'react';
import { Button, Input } from './common';
import css from './detailedShipmentReport.module.css';
import LoadingSpinner from '../../components/Spinner/Spinner';
import writeXlsxFile from 'write-excel-file';
import ErrorPopup from './common/ErrorPopup';
import myHeaders from '../../components/MyHeader/myHeader';

const initSchema = [
  {
    column: 'Дугаар',
    type: String,
    value: s => s.id,
    width: 10,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Барааны нэр',
    type: String,
    value: s => s.name,
    width: 10,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Баркод',
    type: String,
    value: s => s.barcode,
    width: 10,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Нэгж үнэ',
    type: Number,
    value: s => s.price,
    width: 20,
    align: 'center',
    alignVertical: 'center',
    format: '#,##0.00'
  },
  {
    column: 'Тоо ширхэг',
    type: Number,
    value: s => s.quantity,
    width: 10,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Нийт үнэ',
    type: Number,
    value: s => s.totalPrice,
    width: 20,
    align: 'center',
    alignVertical: 'center',
    format: '#,##0.00'
  },
  {
    column: 'Гарсан агуулах',
    type: String,
    value: s => s.outInventory,
    width: 10,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Авах агуулах',
    type: String,
    value: s => s.inInventory,
    width: 10,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Үүссэн огноо',
    type: Date,
    value: s => s.createdDate,
    width: 20,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Хариуцагч',
    type: String,
    value: s => s.owner,
    width: 20,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Төрөл',
    type: String,
    value: s => s.type,
    width: 20,
    align: 'center',
    alignVertical: 'center'
  }
];

export const DetailedShipmentReport = props => {
  const { closeHandler, userData, users, inventories } = props;

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [loading, setLoading] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [schema, setSchema] = useState(initSchema);
  const [reportData, setReportData] = useState([]);

  const generateReport = async () => {
    try {
      if (startDate === '') {
        throw new Error('Эхлэх огноог оруулна уу!');
      }

      if (endDate === '') {
        throw new Error('Дуусах огноог оруулна уу!');
      }

      if (startDate > endDate) {
        throw new Error('Эхлэх болон дуусах огноог буруу оруулсан байна!');
      }

      setLoading(true);

      const companyId =
        Number(userData.company_id.replaceAll('|', '')) === 1
          ? 1
          : Number(userData.company_id.replaceAll('|', ''));

      const url = `${process.env.REACT_APP_API_URL2}/api/shipment?supplierId=${companyId}&startDate=${startDate}&endDate=${endDate}&page=0`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      let productsIds = [];

      for (const shipment of resData.data) {
        for (const product of shipment.products) {
          productsIds.push(product.productId);
        }
      }

      productsIds = [...new Set(productsIds)];

      const productUrl = `${
        process.env.REACT_API_URL2
      }/products/get1?ids=[${productsIds.join(',')}]`;

      const productRes = await fetch(productUrl, requestOptions);
      const productData = await productRes.json();

      const shipmentUsers = [];
      const movementUsers = [];

      for (const user of users) {
        if ([1, 2, 4].includes(user.role)) {
          movementUsers.push(user.user_id);
        } else {
          shipmentUsers.push(user.user_id);
        }
      }

      const reportDataCopy = [];
      const schemaCopy = [...schema];

      for (const shipment of resData.data) {
        const ownr = shipment.tugeegchID ?? shipment.createUser;
        const date = shipment.createDate.split('T')[0].split('-');

        const fromInven = inventories.find(
          inven => inven._id === shipment.from
        );
        const toInven = inventories.find(inven => inven._id === shipment.to);

        let shipmentType;

        if (
          shipmentUsers.includes(shipment.createUser) &&
          shipment.tugeegchID
        ) {
          shipmentType = 1;
        }

        if (
          shipmentUsers.includes(shipment.createUser) &&
          !shipment.tugeegchID
        ) {
          shipmentType = 2;
        }

        if (
          shipmentUsers.includes(shipment.createUser) &&
          !fromInven &&
          !toInven
        ) {
          shipmentType = 1;
        }

        if (fromInven && toInven) {
          if (
            movementUsers.includes(shipment.createUser) &&
            fromInven.type === 3 &&
            toInven.type === 2
          ) {
            shipmentType = 3;
          }

          if (
            movementUsers.includes(shipment.createUser) &&
            (fromInven.type !== 3 || toInven.type !== 2)
          ) {
            shipmentType = 2;
          }
        }

        for (const product of shipment.products) {
          const curProduct = productData.data.find(
            prod => prod._id === product.productId
          );
          const price =
            curProduct?.locations?.['62f4aabe45a4e22552a3969f']?.price
              ?.channel?.[1] ?? 0;

          const data = {
            id: shipment.id + '',
            name: curProduct.name,
            barcode: curProduct.bar_code,
            price: price,
            quantity: product.count,
            totalPrice: price * product.count,
            outInventory: fromInven ? fromInven.name : '',
            inInventory: toInven ? toInven.name : '',
            createdDate: new Date(`${date[0]}-${date[1]}-${date[2]}`),
            owner: users.find(usr => usr.user_id === ownr).first_name,
            type:
              shipmentType === 1
                ? 'Ачилт'
                : shipmentType === 2
                ? 'Хөдөлгөөн'
                : shipmentType === 3
                ? 'Буцаалт'
                : ''
          };

          reportDataCopy.push({ ...data });
        }
      }

      for (const data of reportDataCopy) {
        if (data.id.length + 5 > schemaCopy[0].width) {
          schemaCopy[0].width = data.id.length + 5;
        }

        if (data.name.length + 5 > schemaCopy[1].width) {
          schemaCopy[1].width = data.name.length + 5;
        }

        if (data.barcode.length + 5 > schemaCopy[2].width) {
          schemaCopy[2].width = data.barcode.length + 5;
        }

        if ((data.price + '').length + 5 > schemaCopy[3].width) {
          schemaCopy[3].width = (data.price + '').length + 5;
        }

        if ((data.quantity + '').length + 5 > schemaCopy[4].width) {
          schemaCopy[4].width = (data.quantity + '').length + 5;
        }

        if ((data.totalPrice + '').length + 5 > schemaCopy[5].width) {
          schemaCopy[5].width = (data.totalPrice + '').length + 5;
        }

        if (data.outInventory.length + 5 > schemaCopy[6].width) {
          schemaCopy[6].width = data.outInventory.length + 5;
        }

        if (data.inInventory.length + 5 > schemaCopy[7].width) {
          schemaCopy[7].width = data.inInventory.length + 5;
        }

        if (data.owner.length + 5 > schemaCopy[9].width) {
          schemaCopy[9].width = data.owner.length + 5;
        }
      }

      setSchema(schemaCopy);
      setReportData(reportDataCopy);
      setReportReady(true);
    } catch (error) {
      setErrorMsg(error.message);
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    writeXlsxFile(reportData, {
      schema,
      fileName: `shipment-report-/${startDate}/-/${endDate}/.xlsx`,
      headerStyle: {
        backgroundColor: '#d3d3d3',
        align: 'center',
        alignVertical: 'center',
        borderColor: '#000000'
      },
      fontFamily: 'Calibri',
      fontSize: 11,
      alignVertical: 'center',
      align: 'center',
      dateFormat: 'mm/dd/yyyy',
      stickyRowsCount: 1
    });
  };

  const restart = () => {
    setStartDate('');
    setEndDate('');
    setReportData([]);
    setSchema(initSchema);
    setReportReady(false);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1>Дэлгэрэнгүй тайлан</h1>
          <button onClick={closeHandler} type='button'>
            Хаах
          </button>
        </div>

        {!loading && !reportReady && (
          <div className={css.content}>
            <div className={css.dateContainer}>
              <label htmlFor='startDate'>Эхлэх огноо</label>
              <Input
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                id='startDate'
                type='date'
                size='medium'
              />
            </div>

            <div className={css.dateContainer}>
              <label htmlFor='endDate'>Дуусах огноо</label>
              <Input
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                id='endDate'
                type='date'
                size='medium'
              />
            </div>
          </div>
        )}

        {!loading && reportReady && (
          <div
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span>Тайлан амжилттай үүслээ...</span>
          </div>
        )}

        {loading && (
          <div className={css.loadingSpinner}>
            <LoadingSpinner />
          </div>
        )}

        <div className={css.btnContainer}>
          {!reportReady && (
            <>
              <Button
                disabled={loading}
                onClick={closeHandler}
                variant='secondary'
                size='medium'
              >
                Цуцлах
              </Button>
              <Button
                onClick={generateReport}
                disabled={loading}
                variant='primary'
                size='medium'
              >
                Тайлан бэлтгэх
              </Button>
            </>
          )}
          {reportReady && (
            <>
              <Button
                disabled={loading}
                onClick={restart}
                variant='secondary'
                size='medium'
              >
                Дахин бэлтгэх
              </Button>
              <Button
                onClick={downloadReport}
                disabled={loading}
                variant='primary'
                size='medium'
              >
                Тайлан татах
              </Button>
            </>
          )}
        </div>
      </div>

      {showErrorMsg && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => setShowErrorMsg(false)}
        />
      )}
    </>
  );
};
