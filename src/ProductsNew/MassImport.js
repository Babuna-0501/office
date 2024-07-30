import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import closeBtn from '../assets/close.svg';
import deleteIcon from '../assets/delete_red_small.svg';
import LoadingSpinner from '../components/Spinner/Spinner';
import myHeaders from '../components/MyHeader/myHeader';
import ProductReportHook from '../Hooks/ProductsReportHook';
import { GlobalContext } from '../Hooks/GlobalContext';

const MassImport = props => {
  const { loggedUser } = useContext(GlobalContext);
  const [isEmhangan, setIsEmhangan] = useState(false);
  const [rows, setRows] = useState(props.data.rows);
  const [saving, setSaving] = useState(false);
  const [supID, setSupID] = useState(null);
  const [supProducts, setSupProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const prodctx = useContext(ProductReportHook);

  const company_id = parseInt(
    props.pageData?.userData?.company_id?.replaceAll('|', '')
  );

  useEffect(() => {
    setIsEmhangan(loggedUser?.company_id.includes('|14010|'));
  }, [loggedUser?.company_id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${company_id}`,
          {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          }
        );
        const data = await response.json();
        setSupProducts(data.data);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [company_id]);

  const options = props.suppliers.map(item => ({
    value: item.id,
    label: item.name
  }));

  const handleChange = async selectedOptions => {
    setLoading(true);
    setSupID(selectedOptions.value);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${selectedOptions.value}`,
        {
          method: 'GET',
          headers: myHeaders
        }
      );
      const data = await response.json();
      setSupProducts(data.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const save = () => {
    if (supID === null && company_id === 1) {
      alert('Нийлүүлэгч сонгоно уу');
      return;
    }

    document.getElementById('read')?.remove();
    setSaving(true);

    rows.forEach(async product => {
      console.log('angilal:', product.angilal);
      console.log('boditSavlalt:', product.boditSavlalt);
      console.log('zardagSavlalt:', product.zardagSavlalt);

      console.log('product bulgaa:', product);
      const productPrice = parseInt(product.price, 10);
      const inCase = parseInt(product.incase, 10);

      const channelData = prodctx.sitedata.business_types.reduce(
        (acc, item) => {
          acc.incase[item.business_type_id] = Number(inCase === 0 ? 1 : inCase);
          acc.price[item.business_type_id] = Number(
            productPrice === 0 ? 1 : productPrice
          );
          acc.active[item.business_type_id] = Number(product.active);
          acc.priority[item.business_type_id] = Number(0);
          acc.upoint[item.business_type_id] = Number(0);
          acc.deliveryPay[item.business_type_id] = Number(0);
          return acc;
        },
        {
          incase: {},
          price: {},
          active: {},
          priority: {},
          upoint: {},
          deliveryPay: {}
        }
      );

      const rawNew = {
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
        weight: null,
        boditSavlalt: product.boditSavlalt,
        supplier_productgroup_id: 0,
        updated_date: new Date(),
        slug: product.slug,
        category_id:
          Number(
            props?.pageData?.categories?.find(
              e => e.name?.toLowerCase() === product?.category?.toLowerCase()
            )?.id
          ) || 0,
        country: product.country,
        manufacturer: product.manufacturer,
        stock: product.stock,
        city_tax: product?.category === 'Алкоголь' || product.city_tax ? 1 : 0,
        include: [],
        exclude: [],
        attributes: isEmhangan
          ? [
              {
                boditSavlalt: product.boditSavlalt,
                zardagSavlalt: product.zardagSavlalt,
                subCategory: product.subCategory ?? null,
                storageLocation: product.storageLocation ?? null,
                storageTemp: product.storageTemp ?? null,
                endDate: product.endDate ?? null,
                wholePrice: product.wholePrice,
                storageCondition: product.storageCondition,
                unitPrice: product.unitPrice,
                seriesNumber: product.seriesNumber,
                form: product.form,
                condition: product.condition ?? null
              }
            ]
          : [],
        locations: {
          '62f4aabe45a4e22552a3969f': {
            in_case: { channel: channelData.incase },
            price: { channel: channelData.price },
            is_active: { channel: channelData.active },
            priority: { channel: channelData.priority },
            upoint: { channel: channelData.upoint },
            deliver_fee: { channel: channelData.deliveryPay }
          }
        },
        thirdparty_data: {
          pickpack: { sync: false, sku: '' }
        },
        alcohol: product?.category === 'Алкоголь' ? 1 : Number(product.alcohol),
        product_measure: Boolean(product.product_measure),
        product_weight: Number(product.product_weight),
        supplierProductGroup:
          props?.productGroup?.find(
            e => e?.name?.toLowerCase() === product?.shuurkhaicat?.toLowerCase()
          )?.id || 0,
        region: product.region,
        organization: product.organization,
        supplier: product.supplier
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL2}/api/product/add1`,
          {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(rawNew),
            redirect: 'follow'
          }
        );
        const result = await response.json();
        console.log('result++++++----', result);
      } catch (error) {
        console.log('error', error);
      } finally {
        setSupID('');
      }
    });

    setTimeout(() => {
      alert('Бүтээгдэхүүнийг амжилттай орууллаа!');
      props.setImporter(false);
    }, 5000);
  };

  const CancelHandler = () => {
    document.getElementById('read')?.remove();
    setSaving(false);
    setSupID('');
    props.setMassImportData(null);
  };

  return (
    <div id='formwithtransparentbackground'>
      <div id='form' className='import'>
        <div className='container'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h1>Бүтээгдэхүүн масс импортлох</h1>
            <img
              src={closeBtn}
              style={{
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                objectFit: 'cover'
              }}
              onClick={CancelHandler}
              alt='Close'
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
              {[
                'name',
                'barcode',
                'sku',
                'price',
                'description',
                'incase',
                'city_tax',
                'priority',
                'stock',
                'brand',
                'category',
                'shuurkhaicat',
                'alcohol',
                'product_measure',
                'storage_day',
                'subCategory',
                'form',
                'packActual',
                'packSale',
                'region',
                'organization',
                'supplier',
                'storageCondition',
                'quantity',
                'wholePrice',
                'unitPrice',
                'seriesNumber'
              ]
                .filter(field => rows?.[0]?.[field])
                .map(field => (
                  <div key={field}>
                    {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </div>
                ))}
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
                style={{ width: '100%', maxHeight: '75%', overflowY: 'scroll' }}
              >
                {rows.map((row, index) => (
                  <div
                    className='entry'
                    key={index}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {[
                      'name',
                      'barcode',
                      'sku',
                      'price',
                      'description',
                      'incase',
                      'city_tax',
                      'priority',
                      'stock',
                      'brand',
                      'category',
                      'shuurkhaicat',
                      'alcohol',
                      'product_measure',
                      'storage_day',
                      'subCategory',
                      'form',
                      'packActual',
                      'packSale',
                      'region',
                      'organization',
                      'supplier',
                      'storageCondition',
                      'quantity',
                      'wholePrice',
                      'unitPrice',
                      'seriesNumber'
                    ]
                      .filter(field => row?.[field])
                      .map(field => (
                        <div
                          key={field}
                          style={{
                            color:
                              field === 'barcode' &&
                              supProducts?.find(
                                e => e.bar_code === row?.barcode
                              )
                                ? 'red'
                                : 'black',
                            fontWeight:
                              field === 'barcode' &&
                              supProducts?.find(
                                e => e.bar_code === row?.barcode
                              )
                                ? '700'
                                : 'normal'
                          }}
                        >
                          {field === 'city_tax' && row?.category === 'Алкоголь'
                            ? 1
                            : row?.[field]}
                          {field === 'stock' ||
                          field === 'price' ||
                          field === 'wholePrice' ||
                          field === 'unitPrice'
                            ? row?.[field]?.toLocaleString()
                            : row?.[field]}
                        </div>
                      ))}
                    {supProducts?.find(e => e.bar_code === row?.barcode) && (
                      <div>
                        <img
                          src={deleteIcon}
                          style={{ cursor: 'pointer' }}
                          alt='delete'
                          onClick={() =>
                            setRows(prev =>
                              prev.filter(q => q.barcode !== row?.barcode)
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
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
            <span className='btn' onClick={save}>
              {saving ? 'Түр хүлээнэ үү' : 'Хадгалах'}
            </span>
          </div>
        </div>
      </div>
      <div id='transparentbackground'></div>
    </div>
  );
};

export default MassImport;
