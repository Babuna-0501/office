import React, { useContext, useEffect, useState } from 'react';
import CollectionHook from '../../Hooks/CollectionHook';
import myHeaders from '../../components/MyHeader/myHeader';
import css from './products.module.css';
import { Table } from 'antd';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchSkus, setSearchSkus] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      width: 150
    },
    {
      title: 'IMAGE',
      dataIndex: 'image',
      width: 100,

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
      title: 'DESCRIPTION',
      dataIndex: 'description',
      width: 250
    },
    {
      title: 'SKU',
      dataIndex: 'sku'
    },

    {
      title: 'BARCODE',
      dataIndex: 'bar_code'
    },
    {
      title: 'STOCK',
      dataIndex: 'stock'
    }
  ];

  const collctx = useContext(CollectionHook);
  const cancelHandler = () => {
    collctx.setProductModal(false);
  };
  const confirmHandler = () => {
    collctx.setProductModal(false);
  };
  const fetchProduct = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    let suppID = '';
    let bar_code = '';
    let pages = 1;

    let url = `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${suppID}&search=${searchName}&bar_code=${bar_code}&sku=${searchSkus}&page=${pages}&limit=50`;

    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        // console.log("res", res.data);
        let dataProducts = [];
        res.data.map(item => {
          dataProducts.push({
            key: item._id,
            name: item.name,
            image: item.image[0],
            description: item.description,
            sku: item.sku,
            bar_code: item.bar_code,
            stock: item.stock
          });
        });
        setProducts(dataProducts);
      })
      .catch(error => {
        console.log('error collection', error);
      });
  };

  useEffect(() => {
    try {
      fetchProduct();
    } catch (error) {
      console.log('catch error', error);
    }
  }, [searchName, searchSkus]);

  const onSelectChange = newSelectedRowKeys => {
    // console.log("selectedRowKeys changed: +++ ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    collctx.setProductIDS([...collctx.productIDS, ...newSelectedRowKeys]);

    // console.log(
    //   "product+++1",
    //   products.filter((item) => {
    //     if (item.key === newSelectedRowKeys) {
    //       return item;
    //     }
    //   })
    // );
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.wrapperContainer}>
          <div className={css.inputwrapper}>
            <div className={css.inputcontainer}>
              <input
                placeholder='Нэрээр хайх'
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
              />
            </div>
            <div className={css.inputcontainer}>
              <input
                placeholder='SKUS хайх'
                value={searchSkus}
                onChange={e => setSearchSkus(e.target.value)}
              />
            </div>
            {/* <div>
              <select>
                <option>-------</option>
                <option>ffff</option>
                <option>ffff</option>
              </select>
            </div> */}
          </div>
          <div className={css.productcontainer}>
            <Table
              pagination={false}
              columns={columns}
              dataSource={products}
              rowSelection={rowSelection}
              scroll={{ y: '100%' }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

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

export default Products;
