import React, { useState, useEffect, useContext } from 'react';
import css from './registerproduct.module.css';
import myHeaders from '../../components/MyHeader/myHeader';
import ProductReportHook from '../../Hooks/ProductsReportHook';

const RegisterProduct = props => {
  console.log('props', props);
  const [chosed, setChosed] = useState(null);
  const prodctx = useContext(ProductReportHook);

  useEffect(() => {
    let newData = [];

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    prodctx.importData.map((item, index) => {
      let url = `${
        process.env.REACT_APP_API_URL2
      }/products/get1?bar_code=${Number(item.barcode)}`;
      console.log('url948', url);
      fetch(url, requestOptions)
        .then(res => res.json())
        .then(res => {
          console.log('res 948', res);
          if (res.code === 200 && res.data.length !== 0) {
            newData.push({
              ...item,
              product: true,
              _id: res.data[0]._id,
              supplier_id: res.data[0].supplier_id
            });
          } else if (res.code === 200 && res.data.length === 0) {
            newData.push({
              ...item,
              product: true,
              _id: null,
              supplier_id: null
            });
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    });
    console.log('newdata1234', newData);
    prodctx.setImportData(newData);
  }, [chosed]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        prodctx.setSuplier(res.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  console.log('chosed', chosed);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'black'
            }}
          >
            Нийлүүлэгч сонгох
          </div>
          <div className={css.selectwrapper}>
            <select
              value={chosed}
              onChange={e => {
                let aa = window.confirm(
                  'Та бүртгэгдээгүй барааг энэ компани дээр бүртгэхдээ итгэлтэй байна уу'
                );
                if (aa) {
                  setChosed(e.target.value);
                  prodctx.setOneSupplier(e.target.value);
                }
              }}
            >
              <option>--Нийлүүлэгч--</option>
              {prodctx.suplier &&
                prodctx.suplier.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className={css.btncontainer}>
          <button
            onClick={() => {
              props.setPage(1);
            }}
            className={css.cancel}
          >
            Өмнөх
          </button>
          <button
            onClick={() => {
              if (chosed === null) {
                alert('Та нийлүүлэгчээ сонгоно уу...');
                return;
              }
              props.setPage(4);
            }}
            className={css.confirm}
          >
            {' '}
            Дараахи
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
