import React, { useContext, useEffect, useState } from 'react';
import { Popconfirm, Table } from 'antd';

import css from './collectionmodal.module.css';
import CollectionHook from '../../Hooks/CollectionHook';
import Products from '../Products/Products';
import myHeaders from '../../components/MyHeader/myHeader';

const CollectionModal = props => {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const collctx = useContext(CollectionHook);

  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      editable: true
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: '10%',
      render: (text, record) => {
        // console.log("record++++", record);
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              src={
                record.image
                  ? record.image
                  : `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
              }
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'contain'
              }}
            />
          </div>
        );
      }
    },
    {
      title: 'Sku',
      dataIndex: 'skus'
    },
    {
      title: 'Barcode',
      dataIndex: 'bar_code'
    },
    {
      title: 'Status',
      dataIndex: 'operation',
      render: (_, record) =>
        products.length >= 1 ? (
          <Popconfirm
            title='Та устгахдаа итгэлтэй байна уу?'
            onConfirm={() => handleDelete(record.key)}
            okText='Тийм'
            cancelText='Үгүй'
          >
            <button className={css.deletebtn}>устгах</button>
          </Popconfirm>
        ) : null
    }
  ];

  const cancelHandler = () => {
    collctx.setCollectionModal(false);
    collctx.setProductIDS([]);
  };
  const confirmHandler = () => {
    if (name.length === 0) {
      alert('Багцын нэрээ оруулна уу');
      return;
    }
    let ids = [];
    let skus = [];
    let supIDS = [];
    products.map(it => {
      // console.log("products collect");
      ids.push(it._id);
      skus.push(it.sku);
      supIDS.push(it.supplier_id);
    });
    let supID = [...new Set(supIDS)];

    let mainData = {
      collection_data: {
        name: name,
        supplier: supID,
        product_id: ids,
        sku: skus,
        isActive: 1
      }
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(mainData)
    };
    // console.log("collection create requestOptions", requestOptions);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/collection/create`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        // console.log("response COLLECTION CREATE", res);
        if (res.code === 200) {
          alert('Та амжилттай үүсгэлээ.');
          let aa = props.data;
          aa.push({
            name: name,
            supplier: supID,
            product_id: ids,
            sku: skus,
            isActive: 1
          });
          props.setData(aa);
          setName('');
          ids = [];
          skus = [];
          supIDS = [];
          collctx.setProductIDS([]);
          setProducts([]);
          collctx.setCollectionModal(false);
        }
      })
      .catch(error => {
        console.log('aldaa garlaa', error);
      });
  };
  const productModalHandler = () => {
    collctx.setProductModal(true);
  };

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/products/get1?ids=[${collctx.productIDS}]`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        // console.log("response", res);
        res.data.map(item => {
          return (item.key = item._id);
        });
        setProducts(res.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [collctx?.productIDS]);
  const handleDelete = key => {
    // console.log("key", key);
    const newData = products.filter(item => item.key !== key);
    setProducts(newData);
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.headerContainer}>
          <div className={css.inputwrapper}>
            <div className={css.inputcontainer}>
              <input
                placeholder='Багцын нэр'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className={css.btnwrapper}>
              <button className={css.productbtn} onClick={productModalHandler}>
                Бараа оруулах
              </button>
            </div>
          </div>
          <div className={css.tablecontainer}>
            <Table
              // components={components}
              pagination={false}
              bordered
              dataSource={products}
              columns={defaultColumns}
              scroll={{ y: '100%' }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        {collctx.productModal && <Products />}
        <div className={css.buttonsContainer}>
          <button className={css.cancel} onClick={cancelHandler}>
            Цуцлах
          </button>

          <button className={css.confirm} onClick={confirmHandler}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
