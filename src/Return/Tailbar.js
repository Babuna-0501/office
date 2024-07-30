import React, { useState } from 'react';
import css from './tailbar.module.css';
import close from '../assets/close.svg';
import myHeaders from '../components/MyHeader/myHeader';
const Tailbar = props => {
  const [detailInfo, setDetailInfo] = useState('');

  const saveFunc = () => {
    if (detailInfo.length === 0) {
      return alert('Та татгалзсан шалтгаанаа бичнэ үү.');
    }

    var raw = JSON.stringify({
      status_id: 3,
      return_id: props.oneProduct[0].return_id,
      additional_detail: detailInfo
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/returnproduct/update`,
      requestOptions
    )
      .then(res => res.json())
      .then(response => {
        if (response.message === 'Хүсэлт амжилттай үүссэн.') {
          alert('Хүсэлт амжилттай үүссэн.');
          props.setTailbar(false);
        } else {
          alert('Алдаа гарлаа.');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };
  return (
    <div className={css.tailbar}>
      <div className={css.modal}>
        <div style={{ position: 'relative', background: 'red' }}>
          <img
            src={close}
            alt='close icon'
            className={css.closebtn}
            onClick={() => props.setTailbar(false)}
          />
        </div>
        <div className={css.textContainer}>
          <div className={css.header}>
            <span>Татгалзсан шалтгаан</span>
          </div>
          <div className={css.content}>
            <span>Татгалзсан шалтгаан /тайлбар бичих/</span>
            <div className={css.textareacontainer}>
              <textarea
                placeholder='Тайлбар бичих'
                onChange={e => setDetailInfo(e.target.value)}
                value={detailInfo}
              />
            </div>
          </div>
          <div className={css.buttonContainer}>
            <button onClick={saveFunc}>Хадгалах</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tailbar;
