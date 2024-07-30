import { useState, useEffect, useMemo } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import QRCode from 'react-qr-code';
import './sales.css';
import { format } from 'date-fns';

const Print = props => {
  const {
    data,
    taxPayerType,
    warehouses,
    products,
    businessRegister,
    businessName,
    receiptData
  } = props;

  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [qr, setQr] = useState('');
  const [lotteryNumber, setLotteryNumber] = useState(null);
  const [lotteryAmount, setLotteryAmount] = useState(null);
  const [billId, setBillId] = useState('');

  async function foobar() {
    let vatStocks = [];
    let totalVat = 0;
    let totalAmount = 0;

    data.map(product => {
      const vatAmount = (
        (parseInt(product.sellPrice.retail) * parseInt(product.quantity)) /
        11
      ).toFixed(2);

      const lineTotalAmount = product.sellPrice.retail * product.quantity;

      vatStocks.push({
        name: product.name,
        barCode: product.bar_code,
        barCodeType: 'UNDEFINED',
        classificationCode: '0001001',
        taxProducCode: '',
        measureUnit: 'ш',
        qty: product.quantity,
        unitPrice: product.sellPrice.retail,
        totalBonus: 0,
        totalVAT: vatAmount,
        totalCityTax: 0,
        totalAmount: lineTotalAmount,
        data: {}
      });
      totalVat += parseFloat(vatAmount);
      totalAmount += parseFloat(
        parseInt(product.quantity) * parseInt(product.sellPrice.retail)
      );
    });

    totalVat = totalAmount / 11;
    totalVat = totalVat.toFixed(2);

    const raw = {
      supplierId: props.supplierId,
      totalAmount: totalAmount,
      totalVAT: totalVat,
      totalCityTax: 0,
      branchNo: '1',
      districtCode: '0001',
      merchantTin: '37900846788',
      posNo: '10002623',
      consumerNo: '',
      type: taxPayerType === 'business' ? 'B2B_RECEIPT' : 'B2C_RECEIPT',
      inactiveId: '',
      receipts: [
        {
          totalAmount: totalAmount,
          totalVAT: totalVat,
          totalCityTax: 0,
          taxType: 'VAT_ABLE',
          merchantTin: '37900846788',
          type: taxPayerType === 'business' ? 'B2B_RECEIPT' : 'B2C_RECEIPT',
          data: {},
          items: vatStocks
        }
      ],
      payments: [
        {
          code: 'CASH',
          status: 'PAID',
          paidAmount: totalAmount,
          data: {}
        }
      ]
    };

    if (taxPayerType === 'business') {
      raw['customerTin'] = await getCustomerTin();
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw)
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/pos-api/receipt/create`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        if (result.message === 201) {
          const configData = {
            sale: {
              vat: {
                taxPayerType: taxPayerType,
                totalVat: totalVat,
                totalAmount: totalAmount,
                businessRegister: props.businessRegister,
                billId: result.data.id
              }
            }
          };
          props.save(props, configData);

          setQr(result.data.qrData);
          setBillId(result.data.id);
          setLotteryNumber(result.data.lottery);
          setReady(true);
          setLotteryAmount(totalAmount);
        } else {
          alert('Ибаримт үүсгэхэд алдаа гарлаа.');
        }
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    foobar();
  }, []);

  const printSlippery = () => {
    var div = document.getElementById('printcontent');
    var win = window.open('', '', 'height=680,width=480');
    win.document.write(div.outerHTML);
    win.document.write(
      '<script>window.addEventListener("afterprint", (event) => {window.close();})</script>'
    );
    win.print();
    win.document.close();
    if (!saved) {
      props.save(props);
      setSaved(true);
    } else {
      console.log('already saved');
    }

    win.close();
  };

  let warehouseName = '';

  warehouses.map(warehouse => {
    if (warehouse._id === props.warehouse) {
      warehouseName = warehouse.name;
      return;
    }
  });

  let restructuredProducts = {};

  products.map(prod => {
    restructuredProducts[prod._id] = prod;
  });

  let total = 0;
  let emdDiscount = 0;

  data.map(product => {
    const emt = product.emd ? product.emd.tbltUnitDisAmt : 0;

    total += product.quantity * product.sellPrice.retail;

    emdDiscount += emt * product.quantity;
  });

  async function getCustomerTin() {
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const url =
      `${process.env.REACT_APP_API_URL2}/pos-api/tin?regNo=` +
      props.businessRegister;

    const tin = await fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.error(error));

    return tin.data;
  }

  const currentDate = new Date();

  const newSale = () => {
    props.newSale();
  };

  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

  const titleList = [
    { label: 'ТТД', value: '' },
    { label: 'ДДТД', value: billId },
    { label: 'Огноо', value: formattedDate },
    {
      label: taxPayerType === 'business' ? 'ААН нэр' : 'Харилцагчийн нэр',
      value: taxPayerType === 'business' ? businessName : ''
    },
    {
      label: taxPayerType === 'business' ? 'ААН РД' : 'Регистрийн дугаар',
      value: taxPayerType === 'business' ? businessRegister : ''
    },
    { label: 'Жорын дугаар', value: '' }
  ];

  const headerList = [
    { label: 'Бараа', value: 'name' },
    { label: 'Тоо', value: '2' },
    { label: 'Үнэ', value: '3' },
    { label: 'Эмд хөнг', value: '4' },
    { label: 'Хямд', value: '5' },
    { label: 'Дүн', value: '6' }
  ];

  const footerList = [
    { label: 'Нийт дүн', value: `${total.toLocaleString()}₮` },
    { label: 'ЭМД хөнгөлөлт', value: `${emdDiscount.toLocaleString()}₮` },
    { label: 'Хямдрал', value: `0₮` },
    { label: 'Төлөх дүн', value: `${total.toLocaleString()}₮` },
    { label: 'НӨАТ', value: `${(total / 11).toFixed(2)}₮` }
  ];

  return ready ? (
    <div className='paymentpage' style={{ zIndex: '3000000000' }}>
      <div className='leftblock' style={{ background: '#f6f6f6' }}>
        <div
          style={{
            position: 'absolute',
            right: '0',
            bottom: '0',
            left: '0',
            padding: '2rem '
          }}
        >
          <div className='margintop1rem'>
            <button
              className='button primary large'
              style={{ width: '100%' }}
              onClick={() => newSale()}
            >
              Шинэ борлуулалт
            </button>
            <div style={{ height: '2rem' }}></div>
            <button
              className='button primary large'
              style={{ width: '100%', background: '#b2b1b0' }}
              onClick={() => printSlippery(true)}
            >
              Баримт хэвлэх
            </button>
          </div>
        </div>
      </div>
      <div
        className='rightblock'
        style={{ overflow: 'auto', background: 'white', paddingRight: '2rem' }}
        id='printcontent'
      >
        <p style={{ fontFamily: 'Arial', fontSize: '10px', margin: '0' }}>
          {taxPayerType === 'business'
            ? 'Байгуулагын баримт'
            : 'Иргэнд очих баримт'}
        </p>
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'Arial',
              fontSize: '10px',
              fontWeight: 'bold',
              margin: '12px 0'
            }}
          >
            {warehouseName}
          </p>
        </div>

        {titleList.map((item, index) => {
          return (
            <p
              key={index}
              style={{ fontFamily: 'Arial', fontSize: '10px', margin: '0' }}
            >
              {item.label}: {item.value}
            </p>
          );
        })}

        <table
          style={{
            borderTop: '1px dotted gray',
            borderLeft: 'none',
            borderRight: 'none',
            margin: '8px 0'
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '1px dotted gray'
              }}
            >
              {headerList.map((item, index) => {
                return (
                  <th
                    key={index}
                    style={{
                      fontSize: '10px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      border: 'none',
                      maxWidth: '90px'
                    }}
                  >
                    {item.label}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {data.map((product, index) => {
              let temp = restructuredProducts[product._id];

              const cityTax =
                product.citytax && parseInt(product.citytax) > 0
                  ? (parseInt(product.sellPrice.retail) / 110).toFixed(2)
                  : null;

              const productTotal = Math.floor(
                product.sellPrice.retail * product.quantity
              );

              return (
                <tr key={index} style={{ borderBottom: '1px solid gray' }}>
                  {headerList.map((item, index) => {
                    return (
                      <td
                        key={index}
                        style={{
                          fontSize: '10px',
                          textAlign: 'center',
                          border: 'none',
                          maxWidth: '90px'
                        }}
                        className='twolineellipses'
                      >
                        {index === 0
                          ? temp.name
                          : index === 1
                          ? product.quantity
                          : index === 2
                          ? product.sellPrice.retail
                          : index === 3
                          ? `${product.emd?.tbltUnitDisAmt || 0}₮`
                          : index === 4
                          ? `0₮`
                          : `${productTotal}₮`}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {footerList.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 0.5rem'
              }}
            >
              <p
                style={{
                  fontFamily: 'Arial',
                  fontSize: '10px',
                  color: 'black'
                }}
              >
                {item.label}
              </p>

              <p
                style={{
                  fontFamily: 'Arial',
                  fontSize: '10px',
                  color: 'black'
                }}
              >
                {item.value}
              </p>
            </div>
          );
        })}

        <div style={{ textAlign: 'center' }}>
          <p
            style={{ margin: '1rem 0', fontSize: '16px', fontWeight: 'bold' }}
          ></p>
          <div>
            {lotteryNumber && (
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '10px',
                  margin: '8px 0'
                }}
              >
                <div style={{ fontSize: '10px' }}>
                  Сугалааны дугаар:{' '}
                  {lotteryNumber ?? lotteryNumber.split(' ').join('')}
                </div>
                <div style={{ fontSize: '10px' }}>
                  Ибаримтын дүн: {lotteryAmount}
                </div>
              </div>
            )}

            <QRCode
              size={128}
              style={{ height: '160px', maxWidth: '100%', width: '100%' }}
              value={qr}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='paymentpage' style={{ zIndex: '3000000000' }}>
      <div className='padding1rem'>Түр хүлээнэ үү...</div>
    </div>
  );
};

export default Print;
