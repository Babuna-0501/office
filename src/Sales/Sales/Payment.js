import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import Print from './Print';
import myHeaders from '../../components/MyHeader/myHeader';

const Payment = props => {
  const [cash, setCash] = useState(null);
  const [card, setCard] = useState(null);
  const [wire, setWire] = useState(null);
  const [qpay, setQpay] = useState(null);
  const [print, setPrint] = useState(false);
  const [socialpay, setSocialpay] = useState(null);
  const [taxPayerType, setTaxPayerType] = useState(null);
  const [taxPayerError, setTaxPayerError] = useState(null);
  const [businessRegister, setBusinessRegister] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const searchBusinessInfo = e => {
    if (e.key === 'Enter') {
      document.getElementById('businessorganizationname').placeholder =
        'Байгууллагын мэдээлэл хайж байна';
      if (e.target.value.length >= 7) {
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        let url = `${process.env.REACT_APP_API_URL2}/pos-api/vatpayer?regNo=${e.target.value}`;
        fetch(url, requestOptions)
          .then(r => r.json())
          .then(response => {
            if (response.message === 201) {
              setBusinessName(response.data.name);
              setBusinessRegister(e.target.value);
              document.getElementById('businessorganizationname').value =
                response.data.name;
            }
          });
      }
    }
  };
  const data = props.data;
  let total = 0;
  data.map(line => {
    total += line.quantity * line.sellPrice.retail;
  });
  const [amounts, setAmounts] = useState({
    cart: 0,
    wire: 0,
    cash: 0,
    qr: 0
  });
  /*const cardAmount = (e) => {
		let temp = amounts
		if (e.key === "Enter") {
			temp['cart'] = Number(e.target.value)
			setAmounts(temp)
		}
	}*/
  const fnCash = () => {
    const payingAmount = parseInt(
      document.getElementById('payingamount').value
    );
    document.getElementById('payingamount').value = '';
    document.getElementById('payingamount').focus();
    setCash(payingAmount);
  };
  const fnCard = () => {
    const payingAmount = parseInt(
      document.getElementById('payingamount').value
    );
    if (payingAmount <= total) {
      setCard(payingAmount);
    }
  };
  const fnWire = () => {
    const payingAmount = parseInt(
      document.getElementById('payingamount').value
    );
    if (payingAmount <= total) {
      setWire(payingAmount);
    }
  };
  const fnQpay = () => {
    const payingAmount = parseInt(
      document.getElementById('payingamount').value
    );
    if (payingAmount <= total) {
      setQpay(payingAmount);
    }
  };
  const fnSocialpay = () => {
    const payingAmount = parseInt(
      document.getElementById('payingamount').value
    );
    if (payingAmount <= total) {
      setSocialpay(payingAmount);
    }
  };
  const totalPaid = cash + card + wire + qpay + socialpay;
  const renderCash = () => {
    return cash ? (
      <div className='columns'>
        <div className='column2'>
          <span>Бэлэн мөнгө:</span>
        </div>
        <div className='column2' style={{ textAlign: 'right' }}>
          <span>{cash}</span>
        </div>
      </div>
    ) : null;
  };
  const printTest = () => {
    var div = document.getElementById('foobarblah');

    // Create a window object.
    var win = window.open('', '', 'height=600,width=400'); // Open the window. Its a popup window.
    win.document.write(div.outerHTML); // Write contents in the new window.
    win.document.close();
    win.print();
  };
  const next = () => {
    if (taxPayerType === null) {
      setTaxPayerError('Харилцагчийн төрөл сонгоно уу!');
      setTimeout(() => setTaxPayerError(null), 1000);
    } else if (taxPayerType === 'business' && businessRegister === null) {
      alert('Байгууллагын мэдээлэл шалгана уу.');
    } else {
      setPrint(true);
    }
  };
  return (
    <div className='paymentpage_bg'>
      <div className='paymentpage' style={{ display: print ? 'none' : '' }}>
        <div className='leftblock'>
          <h1>Төлбөр бүртгэх</h1>
          <div className='columns'>
            <div className='column1'>
              <input
                type='number'
                id='payingamount'
                defaultValue={total}
                style={{
                  height: '60px',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  padding: '0 1rem'
                }}
              />
            </div>
          </div>
          <div
            className='columns margintop1rem'
            style={{ padding: '0 1rem 0 0' }}
          >
            <div className='column5'>
              <span className='paymentmethod' onClick={() => fnCash()}>
                <img src='/images/paymentmethod/card.svg' alt='' />
                <span>Бэлэн</span>
              </span>
            </div>
            <div className='column5' onClick={() => fnCard()}>
              <span className='paymentmethod'>
                <img src='/images/paymentmethod/card.svg' alt='' />
                <span>Карт</span>
              </span>
            </div>
            <div className='column5' onClick={() => fnWire()}>
              <span className='paymentmethod'>
                <img src='/images/paymentmethod/wire.svg' alt='' />
                <span>Данс</span>
              </span>
            </div>
            <div
              className='column5'
              onClick={() => fnQpay()}
              style={{ display: 'none' }}
            >
              <span className='paymentmethod'>
                <img src='/images/paymentmethod/qpay.svg' alt='' />
                <span>QPAY</span>
              </span>
            </div>
            <div
              className='column5'
              onClick={() => fnSocialpay()}
              style={{ display: 'none' }}
            >
              <span className='paymentmethod'>
                <img src='/images/paymentmethod/socialpay.svg' alt='' />
                <span>SocialPay</span>
              </span>
            </div>
          </div>
          <div
            style={{
              padding: '0 2rem 0 0',
              position: 'absolute',
              right: '0',
              bottom: '1rem',
              left: '2rem'
            }}
          >
            <span
              className={
                taxPayerType === 'individual' ? 'radio active' : 'radio'
              }
              onClick={() => setTaxPayerType('individual')}
            >
              Хувь хүн
            </span>
            <span
              className={taxPayerType === 'business' ? 'radio active' : 'radio'}
              onClick={() => setTaxPayerType('business')}
            >
              Байгууллага
            </span>
            {taxPayerType === 'business' ? (
              <div>
                <input
                  onKeyUp={e => searchBusinessInfo(e)}
                  type='text'
                  placeholder='Байгууллагын регистр'
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '3px',
                    width: '100%',
                    padding: '0 .5rem',
                    height: '30px',
                    lineHeight: '30px'
                  }}
                />
                <input
                  id='businessorganizationname'
                  type='text'
                  placeholder=''
                  disabled='true'
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '3px',
                    width: '100%',
                    padding: '0 .5rem',
                    height: '30px',
                    lineHeight: '30px'
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className='rightblock' id='foobarblah'>
          <div className='columns'>
            <div className='column2'>
              <h1>Төлөх дүн:</h1>
            </div>
            <div className='column2' style={{ textAlign: 'right' }}>
              <h1>{total.toLocaleString()} ₮</h1>
            </div>
          </div>
          {cash ? (
            <div className='columns margintop1rem'>
              <div className='column2'>
                <span>Бэлэн мөнгө:</span>
              </div>
              <div className='column2' style={{ textAlign: 'right' }}>
                <span>{cash.toLocaleString()}</span>
                <img
                  onClick={() => setCash(false)}
                  src='/images/remove.svg'
                  alt=''
                  style={{ height: '26px', margin: '0 0 0 1rem' }}
                />
              </div>
            </div>
          ) : null}
          {card ? (
            <div className='columns margintop1rem'>
              <div className='column2'>
                <span>Карт:</span>
              </div>
              <div className='column2' style={{ textAlign: 'right' }}>
                <span>{card.toLocaleString()}</span>
                <img
                  onClick={() => setCard(false)}
                  src='/images/remove.svg'
                  alt=''
                  style={{ height: '26px', margin: '0 0 0 1rem' }}
                />
              </div>
            </div>
          ) : null}
          {wire ? (
            <div className='columns margintop1rem'>
              <div className='column2'>
                <span>Данс:</span>
              </div>
              <div className='column2' style={{ textAlign: 'right' }}>
                <span>{wire.toLocaleString()}</span>
                <img
                  onClick={() => setWire(false)}
                  src='/images/remove.svg'
                  alt=''
                  style={{ height: '26px', margin: '0 0 0 1rem' }}
                />
              </div>
            </div>
          ) : null}
          {qpay ? (
            <div className='columns margintop1rem'>
              <div className='column2'>
                <span>QPay:</span>
              </div>
              <div className='column2' style={{ textAlign: 'right' }}>
                <span>{qpay.toLocaleString()}</span>
                <img
                  onClick={() => setQpay(false)}
                  src='/images/remove.svg'
                  alt=''
                  style={{ height: '26px', margin: '0 0 0 1rem' }}
                />
              </div>
            </div>
          ) : null}
          {socialpay ? (
            <div className='columns margintop1rem'>
              <div className='column2'>
                <span>SocialPay:</span>
              </div>
              <div className='column2' style={{ textAlign: 'right' }}>
                <span>{socialpay.toLocaleString()}</span>
                <img
                  onClick={() => setSocialpay(false)}
                  src='/images/remove.svg'
                  alt=''
                  style={{ height: '26px', margin: '0 0 0 1rem' }}
                />
              </div>
            </div>
          ) : null}
          <div
            style={{
              position: 'absolute',
              right: '0',
              bottom: '0',
              left: '0',
              padding: '2rem '
            }}
          >
            <div className='columns margintop1rem'>
              <div className='column2'>
                <span>Нийт төлсөн дүн</span>
              </div>
              <div className='column2' style={{ textAlign: 'right' }}>
                <span>{totalPaid.toLocaleString()}</span>
              </div>
            </div>
            <div className='columns margintop1rem'>
              <div className='column2'>
                <span>Хариулт:</span>
              </div>
              <div className='column2' style={{ textAlign: 'right' }}>
                <span>{totalPaid > total ? totalPaid - total : 0}</span>
              </div>
            </div>
            <div className='columns margintop1rem'>
              <div className='column2'>
                <span>Төлөөгүй дүн:</span>
              </div>
              <div className='column2' style={{ textAlign: 'right' }}>
                <span>{totalPaid >= total ? 0 : total - totalPaid}</span>
              </div>
            </div>
            <div className='margintop1rem'>
              <div style={{ height: '30px' }}>
                {taxPayerError ? (
                  <p style={{ color: 'red' }}>{taxPayerError}</p>
                ) : null}
              </div>
              <button
                disabled={totalPaid >= total && taxPayerType ? false : true}
                className='button primary large'
                style={{ width: '100%' }}
                onClick={() => next()}
              >
                Баримт хэвлэх
              </button>
            </div>
          </div>
          <span className='closePage' onClick={() => props.setPayment(false)}>
            x
          </span>
        </div>
      </div>
      {print ? (
        <Print
          receiptData={props.receiptData}
          supplierId={props.supplierId}
          newSale={props.newSale}
          setPrint={setPrint}
          warehouses={props.warehouses}
          warehouse={props.warehouse}
          businessName={businessName}
          taxPayerType={taxPayerType}
          businessRegister={businessRegister}
          data={data}
          products={props.products}
          save={props.save}
        />
      ) : null}
    </div>
  );
};

export default Payment;

/*
setPrint(true)
					<div style={{padding: '0 2rem 0 0'}}>
						<span className={taxPayerType === 'individual' ? 'radio active' : 'radio'} onClick={() => setTaxPayerType('individual')}>
							Хувь хүн
						</span>
						<span className={taxPayerType === 'business' ? 'radio active' : 'radio'}  onClick={() => setTaxPayerType('business')}>
							Байгууллага
						</span>
					</div>
					{
						taxPayerType === 'business' ? (
							<div style={{padding: '0 2rem 0 0'}}>
								<input onKeyUp={(e) => searchBusinessInfo(e)} type="text" placeholder="Байгууллагын регистр" style={{border: '1px solid #ddd', borderRadius: '3px', width: '100%', padding: '0 .5rem', height: '30px', lineHeight: '30px'}} />
								<input id="businessorganizationname" type="text" placeholder="" disabled="true" style={{border: '1px solid #ddd', borderRadius: '3px', width: '100%', padding: '0 .5rem', height: '30px', lineHeight: '30px'}} />
							</div>
						) : null
					}
*/
