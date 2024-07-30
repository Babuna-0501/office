// CSS
import css from './shipmentReport.module.css';

// Components
import { Button, Input } from './common';
import LoadingSpinner from '../../components/Spinner/Spinner';
import ErrorPopup from './common/ErrorPopup';

// Packages
import { useState } from 'react';
import writeXlsxFile from 'write-excel-file';
import myHeaders from '../../components/MyHeader/myHeader';

const initialSchema = [
  {
    column: 'Дугаар',
    type: Number,
    value: s => s.id,
    width: 10,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Төлөв',
    type: String,
    value: s => s.status,
    width: 20,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Нийт үнэ',
    type: Number,
    value: s => s.totalPrice,
    width: 20,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Гарсан агуулах',
    type: String,
    value: s => s.outInventory,
    width: 20,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Авах агуулах',
    type: String,
    value: s => s.inInventory,
    width: 20,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Үүссэн огноо',
    type: Date,
    value: s => s.createDate,
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

export const ShipmentReport = props => {
  const { closeHandler, users, inventories, userData } = props;

  const [loading, setLoading] = useState(false);
  const [doneGenerate, setDoneGenerate] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [schema, setSchema] = useState(initialSchema);

  const [reportData, setReportData] = useState([]);

  const generateReport = async () => {
    try {
      if (startDate === '') {
        throw new Error('Эхлэх огноогоо сонгоно уу!');
      }
      if (endDate === '') {
        throw new Error('Дуусах огноогоо сонгоно уу!');
      }

      if (startDate > endDate) {
        throw new Error('Эхлэх болон Дуусах огноо буруу байна!');
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

      const reportDataCopy = [];
      const schemaCopy = [...schema];

      const shipmentUsers = [];
      const movementUsers = [];

      for (const user of users) {
        if ([1, 2, 4].includes(user.role)) {
          movementUsers.push(user.user_id);
        } else {
          shipmentUsers.push(user.user_id);
        }
      }

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

        const data = {
          id: shipment.id,
          status:
            shipment.status === 1
              ? 'Хүлээгдэж буй'
              : shipment.status === 2
              ? 'Баталгаажсан'
              : shipment.status === 3
              ? 'Цуцлагдсан'
              : '',
          totalPrice: 0,
          outInventory: inventories.find(inven => inven._id === shipment.from)
            ? inventories.find(inven => inven._id === shipment.from).name
            : '',
          inInventory: inventories.find(inven => inven._id === shipment.to)
            ? inventories.find(inven => inven._id === shipment.to).name
            : '',
          createDate: new Date(
            new Date(`${date[0]}-${date[1]}-${date[2]}`).toISOString()
          ),
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

        for (const product of shipment.products) {
          const prod = productData.data.find(
            pr => pr._id === product.productId
          );
          data.totalPrice +=
            product.count *
            prod?.locations?.['62f4aabe45a4e22552a3969f']?.price?.channel?.[1];
        }

        reportDataCopy.push({ ...data });
      }

      console.log('reportDataCopy', reportDataCopy);

      setReportData([...reportDataCopy]);
      setSchema([...schemaCopy]);
      setDoneGenerate(true);
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
    setSchema(initialSchema);
    setDoneGenerate(false);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1>Тайлан</h1>
          <button disabled={loading} onClick={closeHandler} type='button'>
            Хаах
          </button>
        </div>

        {!loading && !doneGenerate && (
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

        {!loading && doneGenerate && (
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
          {!doneGenerate && (
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
          {doneGenerate && (
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
