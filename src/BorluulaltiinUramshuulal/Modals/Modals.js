import React, { useState, useContext, useEffect } from 'react';
import css from './modals.module.css';
import closeIcon from '../../assets/close.svg';
import SMSHook from '../../Hooks/SMSHook';
import BrandBody from './BrandBody';
import AngilalBody from './AngilalBody';
import Header from './Header';
import myHeaders from '../../components/MyHeader/myHeader';

const Modals = () => {
  const [chosedData, setChosedData] = useState([]);
  const [data, setData] = useState([]);
  const smsctx = useContext(SMSHook);

  const CloseHandler = () => {
    smsctx.setBrandModal(false);
    smsctx.setAngilalModal(false);
  };
  const CreateHandler = () => {
    let data = [];
    if (chosedData.length !== 0) {
      data = chosedData.filter(item => item.chosed === true);
    }

    if (smsctx.brandModal) {
      smsctx.setChosedBrands(data);
      let update = chosedData.map(item => {
        return {
          ...item,
          chosed: false
        };
      });
      setChosedData(update);
      smsctx.setBrandModal(false);
      console.log('Data brand', JSON.stringify(data));
    } else if (smsctx.angilalModal) {
      smsctx.setAngilalModal(false);
      console.log('Data angilal', JSON.stringify(data));
      smsctx.setAngilaldata(data);
    }
  };

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/site_data`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
        setData(res);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.upperbody}>
          <div className={css.header}>
            <span>
              {smsctx.brandModal && 'Брэндийн төлөвлөгөө'}
              {smsctx.angilalModal && 'Ангилалын төлөвлөгөө'}
            </span>
            <img src={closeIcon} alt='close icon' onClick={CloseHandler} />
          </div>
          <div
            style={{
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}
          >
            {smsctx.brandModal && <Header title='Брэнд' name='Лого' />}
            {smsctx.angilalModal && <Header title='Ангилал' />}
            {smsctx.brandModal && data && (
              <BrandBody setChosedData={setChosedData} brands={data.brands} />
            )}

            {smsctx.angilalModal && data && (
              <AngilalBody
                categories={data.categories}
                setChosedData={setChosedData}
              />
            )}
          </div>
        </div>
        <div className={css.btncontainer}>
          <button className={css.cancel} onClick={CloseHandler}>
            Цуцлах
          </button>
          <button className={css.confirm} onClick={CreateHandler}>
            Үүсгэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modals;
