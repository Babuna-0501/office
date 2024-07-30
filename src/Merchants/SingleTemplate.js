import React, { useState } from 'react';
import { Select, InputNumber, Spin } from 'antd';
import { useEffect } from 'react';
import { message } from 'antd';
import myHeaders from '../components/MyHeader/myHeader';

const SingleProduct = props => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [line, setLine] = useState([]);
  const [supplier, setSupplier] = useState();
  const [templatename, setTemplatename] = useState();

  const suppliersList = props.suppliers.map(e => ({
    value: e.id,
    label: e.name
  }));
  const selectedTemplate = props.templates.find(e => e._id === props.template);

  useEffect(() => {
    setSupplier(selectedTemplate?.supplier_id);
    setTemplatename(selectedTemplate?.template_name);
    setLine(selectedTemplate?.line);
  }, [props.template]);

  useEffect(() => {
    if (supplier) {
      setLoading(true);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${supplier}`,
        requestOptions
      )
        .then(r => r.json())
        .then(res => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log('error', err.message);
          setLoading(false);
        });
    }
  }, [supplier]);

  const handleLine = (id, count) => {
    if (line.filter(e => e.product_id === id).length > 0) {
      var index = line.findIndex(x => x.product_id === id);
      setLine([
        ...line.slice(0, index),
        Object.assign({}, line[index], { quantity: count }),
        ...line.slice(index + 1)
      ]);
    } else {
      setLine(prev => [...prev, { product_id: id, quantity: count }]);
    }
  };

  const saveZaza = () => {
    if (templatename && supplier && line.length > 0) {
      var raw = JSON.stringify({
        ...(props.template !== 'new' && { template_id: props.template }),
        template_data: {
          template_name: templatename,
          supplier_id: supplier,
          tradeshop_id: props.tradeshop_id,
          line: line.filter(e => e.quantity > 0),
          channel_id: [],
          deleted_tradeshops: []
        }
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/ordertemplate/${
          props.template === 'new' ? 'create' : 'update'
        }`,
        requestOptions
      )
        .then(res => {
          if (res.status === 200) {
            message.success('Амжилттай илгээлээ');
          } else {
            message.error('Алдаа гарлаа');
          }
        })
        .catch(error => {
          console.log('error', error);
        });
      props.setOpenZaza(false);
    } else {
      alert('Мэдээлэл дутуу байна');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}
      >
        <div
          style={{ fontSize: '20px', marginLeft: '-10px', marginRight: '10px' }}
          onClick={() => {
            props.setTemplate();
          }}
        >
          ⬅
        </div>
        <Select
          showSearch
          style={{
            width: 250,
            marginRight: '15px',
            height: '30px'
          }}
          placeholder='Компани'
          value={supplier}
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={suppliersList}
          onChange={id => {
            setProducts();
            setSupplier(id);
            setLine([]);
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Загварын нэр:{' '}
          <input
            value={templatename}
            placeholder='Загварын нэр'
            style={{
              outline: 'none',
              borderRadius: '8px',
              border: '1px solid #d9d9d9',
              height: '30px',
              padding: '9px 16px',
              marginLeft: '5px'
            }}
            onChange={p => {
              setTemplatename(p.target.value);
            }}
          />
        </div>
      </div>
      <div
        style={{
          maxHeight: '570px',
          overflow: 'scroll',
          width: '100%',
          marginBottom: '10px'
        }}
      >
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              width: '100%'
            }}
          >
            <Spin style={{ width: '50px' }} />
          </div>
        ) : (
          products?.map((e, i) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}
              key={i}
            >
              <img
                src={
                  e.image
                    ? e.image[0].replace('original', 'small')
                    : 'https://ebazaar.mn/icon/photo-add.svg'
                }
                height={31}
                width={31}
                alt=''
                style={{ objectFit: 'contain' }}
              />
              <div
                style={{
                  width: '350px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {e.name}
              </div>
              <InputNumber
                min={0}
                max={1000000}
                value={line?.find(a => a.product_id === e._id)?.quantity}
                step={
                  e.locations[`62f4aabe45a4e22552a3969f`].in_case.channel[1]
                }
                onChange={value => {
                  handleLine(e._id, value);
                }}
              />
            </div>
          ))
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div
          style={{
            width: '100px',
            height: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #d9d9d9',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
          onClick={() => {
            props.setOpenZaza(false);
          }}
        >
          Цуцлах
        </div>
        <div
          style={{
            width: '100px',
            background: '#ffa400',
            color: '#fff',
            height: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '3px',
            marginLeft: '8px',
            cursor: 'pointer'
          }}
          onClick={() => {
            saveZaza();
          }}
        >
          Хадгалах
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
