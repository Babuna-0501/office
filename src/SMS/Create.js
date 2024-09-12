import React, { useState, useContext } from 'react';
import SMSHook from '../Hooks/SMSHook';

function Create(props) {
  let [sending, setSending] = useState(false);
  let [phoneNumber, setPhoneNumber] = useState([]);
  const smsctx = useContext(SMSHook);
  const send = () => {
    if (document.getElementById('body').value.length > 0) {
      if (phoneNumber.every(e => e.length > 7)) {
        setSending(true);
        const messageBody = phoneNumber.map(e => ({
          phone: parseInt(e),
          text: document.getElementById('body').value
        }));

        var myHeaders = new Headers();
        myHeaders.append(
          'sms_token',
          '56IuljeU6jasdr:34xhhfber@345kxfjgll7GyrAsdtdUtjejl678jxgha878RS74sYE54654756sdasdA'
        );
        myHeaders.append(
          'ebazaar_token',
          localStorage.getItem('ebazaar_admin_token')
        );
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(messageBody),
          redirect: 'follow'
        };

        fetch(
          `${process.env.REACT_APP_API_URL}/api/directsms/send`,
          requestOptions
        )
          .then(response => response.text())
          .then(result => {
            console.log('sms result', result);
            // props.getSMS();
            alert('Амжилттай илгээлээ');
            smsctx.setCreate(false);
          })
          .catch(error => console.log('error', error));
        setSending(false);
      } else {
        alert('Дугаар буруу байна');
      }
    } else {
      alert('Мессеж бичнэ үү');
    }
  };
  return (
    <div id='bg'>
      <div id='foo'>
        <span className='close' onClick={() => smsctx.setCreate(false)}>
          Хаах
        </span>
        <label>Дугаар:</label>
        <textarea
          type='text'
          id='number'
          onChange={e => {
            setPhoneNumber(
              e.target.value
                .replaceAll('\n', ' ')
                .replaceAll(',', ' ')
                .replaceAll('  ', ' ')
                .split(' ')
            );
          }}
          style={{ height: '100px !important' }}
        />
        <label>Мессеж:</label>
        <textarea style={{ height: '100px !important' }} id='body'></textarea>
        {sending ? (
          <span className='btn'>Түр хүлээнэ үү ...</span>
        ) : (
          <span
            className='btn'
            onClick={() => {
              send();
            }}
          >
            Илгээх
          </span>
        )}
      </div>
    </div>
  );
}

export default Create;
