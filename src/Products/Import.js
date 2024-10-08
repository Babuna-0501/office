import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import closeBtn from '../assets/close.svg';
import deleteIcon from '../assets/delete_red_small.svg';
import LoadingSpinner from '../components/Spinner/Spinner';
import myHeaders from '../components/MyHeader/myHeader';
import ProductReportHook from '../Hooks/ProductsReportHook';

function Import(props) {
  const company_id = parseInt(
    props.pageData.userData.company_id.replaceAll('|', '')
  );

  let [rows, setRows] = useState(props.data.rows);
  let [saving, setSaving] = useState(false);
  const [supID, setSupID] = useState(null);
  const [supProducts, setSupProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const prodctx = useContext(ProductReportHook);
  const options = [];
  props.suppliers.map(item => {
    options.push({
      value: item.id,
      label: item.name
    });
  });
  console.log(prodctx, 'prodctx');

  const save = () => {
    if (supID === null && company_id === 1) {
      alert('Нийлүүлэгч сонгоно уу');
      return;
    }
    document.getElementById('read').remove();
    setSaving(true);

    rows.map(product => {
      const productPrice = parseInt(product.price, 10);
      const inCase = parseInt(product.incase, 10);
      console.log('product', product);
      let channelIncase = {};
      let channelPrice = {};
      let channelActive = {};
      let channelPriority = {};
      let channelUpoint = {};
      let channelDeliveryPay = {};
      prodctx.sitedata.business_types.map((item, index) => {
        channelIncase[item.business_type_id] = Number(
          inCase === 0 ? 1 : inCase
        );
        channelPrice[item.business_type_id] = Number(
          productPrice === 0 ? 1 : productPrice
        );
        channelActive[item.business_type_id] = Number(product.active);
        channelPriority[item.business_type_id] = Number(0);
        channelUpoint[item.business_type_id] = Number(0);
        channelDeliveryPay[item.business_type_id] = Number(0);
      });

      let rawNew = {
        name: product.name.replaceAll("'", "\\'"),
        bar_code: product.barcode,
        image: [
          `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
        ],
        sku: product.sku,
        supplier_id: parseInt(supID) || company_id,
        description: product.description,
        sector_id: null,
        pickpack: parseInt(supID) === 13884 ? 1 : 0,
        manufacturer: '',
        weight: null,
        supplier_productgroup_id: 0,
        updated_date: new Date(),
        slug: 'test',
        stock: Number(product.stock),
        city_tax: product?.category === 'Алкоголь' || product.city_tax ? 1 : 0,
        include: [],
        exclude: [],
        attributes: [],
        locations: {
          '62f4aabe45a4e22552a3969f': {
            in_case: {
              channel: channelIncase
            },
            price: {
              channel: channelPrice
            },

            is_active: {
              channel: channelActive
            },
            priority: {
              channel: channelPriority
            },
            upoint: {
              channel: channelUpoint
            },
            deliver_fee: {
              channel: channelDeliveryPay
            }
          }
        },
        thirdparty_data: {
          pickpack: {
            sync: false,
            sku: ''
          }
        },
        brand:
          Number(
            props?.pageData?.brands?.find(
              e => e.BrandName?.toLowerCase() === product?.brand?.toLowerCase()
            )?.BrandID
          ) || 0,
        category_id:
          Number(
            props?.pageData?.categories?.find(
              e => e.name?.toLowerCase() === product?.category?.toLowerCase()
            )?.id
          ) || 0,
        alcohol: product?.category === 'Алкоголь' ? 1 : Number(product.alcohol),
        product_measure: Boolean(product.product_measure),
        product_weight: Number(product.product_weight),
        supplierProductGroup:
          props?.productGroup?.find(
            e => e?.name?.toLowerCase() === product?.shuurkhaicat?.toLowerCase()
          )?.id || 0
      };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(rawNew),
        redirect: 'follow'
      };
      console.log('new product import requestoptions', requestOptions);

      let urlNew = `${process.env.REACT_APP_API_URL2}/api/product/add1`;
      fetch(urlNew, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('result++++++----', result);
          setSupID('');
        })
        .catch(error => {
          console.log('error', error);
          setSupID('');
        });
    });
    setTimeout(() => {
      alert('Бүтээгдэхүүнийг амжилттай орууллаа!');
      props.setImporter(false);
    }, 5000);
  };

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${company_id}`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        console.log('response', res);
        setSupProducts(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }, []);

  const handleChange = selectedOptions => {
    setLoading(true);
    setSupID(selectedOptions.value);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${selectedOptions.value}`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        console.log('response', res);
        setSupProducts(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const CancelHandler = () => {
    props?.setImporter(false);
    document.getElementById('read').remove();
    setSaving(false);
    setSupID('');
  };
  return (
    <div id='formwithtransparentbackground'>
      <div id='form' className='import'>
        <div className='container'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItem: 'center'
            }}
          >
            <h1>Mass import</h1>
            <img
              src={closeBtn}
              style={{
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                objectFit: 'cover'
              }}
              onClick={CancelHandler}
              alt=''
            />
          </div>
          <div id='rows'>
            {company_id === 1 && (
              <div style={{ width: '450px', marginBottom: '2rem' }}>
                <Select
                  options={options}
                  onChange={handleChange}
                  defaultValue={{
                    label: 'Та нийлүүлэгчээ сонгоно уу',
                    value: 0
                  }}
                />
              </div>
            )}
            <div className='entry header' style={{ width: '100%' }}>
              <div>Name</div>
              <div>Barcode</div>
              <div>Аctive</div>
              <div>SKU</div>
              <div>Price</div>
              <div>Description</div>
              <div>InCase</div>
              <div>city_tax</div>
              <div>Priority</div>
              <div>Stock</div>
              <div>Brand</div>
              <div>Category</div>
              <div>ShuurkhaiCategory</div>
              <div>Alcohol</div>
              <div>Product_measure</div>
              <div>Хадгалах хугацаа/өдөр/</div>
              <div></div>
            </div>
            {loading ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <LoadingSpinner />
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  maxHeight: '75%',
                  overflowY: 'scroll'
                }}
              >
                {rows.map((row, index) => {
                  console.log(row);
                  return (
                    <div
                      className='entry'
                      key={index}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <div>{row.name}</div>
                      <div
                        style={{
                          color: supProducts?.find(
                            e => e.bar_code === row.barcode
                          )
                            ? 'red'
                            : 'black',
                          fontWeight: supProducts?.find(
                            e => e.bar_code === row.barcode
                          )
                            ? '700'
                            : 'normal'
                        }}
                      >
                        {row.barcode}
                      </div>
                      <div>{row.active}</div>
                      <div>{row.sku}</div>
                      <div>{row.price?.toLocaleString()}</div>
                      <div>{row.description}</div>
                      <div>{row.incase}</div>
                      <div>
                        {row.category === 'Алкоголь' ? 1 : row.city_tax}
                      </div>
                      <div>{row.priority}</div>

                      <div>{row.stock?.toLocaleString()}</div>
                      <div
                        style={{
                          color: props?.pageData?.brands?.find(
                            e =>
                              e?.BrandName?.toLowerCase() ===
                              row?.brand?.toLowerCase()
                          )?.BrandID
                            ? 'green'
                            : 'red'
                        }}
                      >
                        {row.brand}
                      </div>
                      <div
                        style={{
                          color: props?.pageData?.categories?.find(
                            e =>
                              e?.name?.toLowerCase() ===
                              row?.category?.toLowerCase()
                          )?.id
                            ? 'green'
                            : 'red'
                        }}
                      >
                        {row.category}
                      </div>
                      <div
                        style={{
                          color: props?.productGroup?.find(
                            e =>
                              e?.name?.toLowerCase() ===
                              row?.shuurkhaicat?.toLowerCase()
                          )?.id
                            ? 'green'
                            : 'red'
                        }}
                      >
                        {row.shuurkhaicat}
                      </div>
                      <div>{row.category === 'Алкоголь' ? 1 : row.alcohol}</div>
                      <div>{row.product_measure}</div>
                      <div>
                        {supProducts?.find(e => e.bar_code === row.barcode) ? (
                          <img
                            src={deleteIcon}
                            style={{ cursor: 'pointer' }}
                            alt='delete'
                            onClick={() => {
                              setRows(prev =>
                                prev.filter(q => q.barcode !== row.barcode)
                              );
                            }}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                      <div>{row.storage_day}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            className='container-btn'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span
              className='btn'
              style={{ background: '#B0BEC5' }}
              onClick={CancelHandler}
            >
              Цуцлах
            </span>
            <span className='btn' onClick={() => save()}>
              {saving ? 'Түр хүлээнэ үү' : 'Хадгалах'}
            </span>
          </div>
        </div>
      </div>
      <div id='transparentbackground'></div>
    </div>
  );
}

export default Import;
