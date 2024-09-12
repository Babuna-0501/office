import React, { useState, useEffect, useContext } from 'react';
import css from './paymentermnew.module.css';
import ProductReportHook from '../Hooks/ProductsReportHook';
import { replaceImageUrl } from '../utils';

const data = [
  { id: 1, name: 'Нэг үнийн бодлого' },
  { id: 2, name: 'Ялгаатай үнийн бодлого' }
];
const PaymentTermNew = () => {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null);
  const [buschlel, setBuschlel] = useState(null);
  const [buschleldata, setBuschleldata] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedProd, setSelectedProd] = useState({});
  const [selectActive, setSelectActive] = useState(null);
  const [products, setProducts] = useState([
    {
      _id: 560348,
      name: 'Тавгийн чихэр  500гр 1',
      bar_code: '8656000602090',
      image: [
        `${process.env.REACT_APP_MEDIA_URL}/original/6273361543463316766480720754202303140616307574284378405026639726549453.jpg`
      ],
      sku: '8656000602090',
      supplier_id: 14014,
      description:
        'Бурамхан хатуу чихэр нь дахин давтагдашгүй хэлбэр дүрсийг урлаж, олон төрлийн байгалийн цэвэр жимсний охь агуулсан гайхалтай амттан юм',
      sector_id: null,
      pickpack: 0,
      manufacturer: '',
      weight: null,
      supplier_productgroup_id: 0,
      updated_date: '2023-03-21T02:42:04.274Z',
      slug: 'test',
      stock: 1000000,
      city_tax: 0,
      attributes: [],
      locations: {
        '62f4aabe45a4e22552a3969f': {
          in_case: {
            channel: {
              1: 15,
              2: 15,
              3: 15,
              4: 15,
              5: 15,
              6: 15,
              7: 15,
              8: 15,
              9: 15,
              10: 15,
              11: 15,
              12: 15,
              13: 15,
              14: 15,
              15: 15,
              16: 15,
              17: 15,
              18: 15,
              19: 15,
              20: 15,
              21: 15,
              22: 15
            }
          },
          price: {
            channel: {
              1: 10500,
              2: 10500,
              3: 10500,
              4: 10500,
              5: 10500,
              6: 10500,
              7: 10500,
              8: 10500,
              9: 10500,
              10: 10500,
              11: 10500,
              12: 10500,
              13: 10500,
              14: 10500,
              15: 10500,
              16: 10500,
              17: 10500,
              18: 10500,
              19: 10500,
              20: 10500,
              21: 10500,
              22: 10500
            }
          },
          is_active: {
            channel: {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              11: 0,
              12: 0,
              13: 0,
              14: 0,
              15: 0,
              16: 0,
              17: 0,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0
            }
          },
          priority: {
            channel: {
              1: 19,
              2: 19,
              3: 19,
              4: 19,
              5: 19,
              6: 19,
              7: 19,
              8: 19,
              9: 19,
              10: 19,
              11: 19,
              12: 19,
              13: 19,
              14: 19,
              15: 19,
              16: 19,
              17: 19,
              18: 19,
              19: 19,
              20: 19,
              21: 19,
              22: 19
            }
          },
          upoint: {
            channel: {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              11: 0,
              12: 0,
              13: 0,
              14: 0,
              15: 0,
              16: 0,
              17: 0,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0
            }
          },
          deliver_fee: {
            channel: {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              11: 0,
              12: 0,
              13: 0,
              14: 0,
              15: 0,
              16: 0,
              17: 0,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0
            }
          }
        },
        '641d5cf95778aae99db69019': {
          price: {
            channel: {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 10500,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              11: 0,
              12: 0,
              13: 0,
              14: 0,
              15: 0,
              16: 0,
              17: 0,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0
            },
            tradeshop: {}
          }
        }
      },
      thirdparty_data: {
        pickpack: {
          sync: false,
          sku: ''
        }
      },
      brand: 0,
      category_id: 27273,
      alcohol: 0,
      product_measure: null,
      created_date: '2023-03-14T02:56:52.489Z',
      created_by: 257,
      updated_by: 683
    },
    {
      _id: 560348,
      name: 'Тавгийн чихэр  500гр - 2',
      bar_code: '8656000602090',
      image: [
        `${process.env.REACT_APP_MEDIA_URL}/original/6273361543463316766480720754202303140616307574284378405026639726549453.jpg`
      ],
      sku: '8656000602090',
      supplier_id: 14014,
      description:
        'Бурамхан хатуу чихэр нь дахин давтагдашгүй хэлбэр дүрсийг урлаж, олон төрлийн байгалийн цэвэр жимсний охь агуулсан гайхалтай амттан юм',
      sector_id: null,
      pickpack: 0,
      manufacturer: '',
      weight: null,
      supplier_productgroup_id: 0,
      updated_date: '2023-03-21T02:42:04.274Z',
      slug: 'test',
      stock: 1000000,
      city_tax: 0,
      attributes: [],
      locations: {
        '62f4aabe45a4e22552a3969f': {
          in_case: {
            channel: {
              1: 15,
              2: 15,
              3: 15,
              4: 15,
              5: 15,
              6: 15,
              7: 15,
              8: 15,
              9: 15,
              10: 15,
              11: 15,
              12: 15,
              13: 15,
              14: 15,
              15: 15,
              16: 15,
              17: 15,
              18: 15,
              19: 15,
              20: 15,
              21: 15,
              22: 15
            }
          },
          price: {
            channel: {
              1: 10500,
              2: 10500,
              3: 10500,
              4: 10500,
              5: 10500,
              6: 10500,
              7: 10500,
              8: 10500,
              9: 10500,
              10: 10500,
              11: 10500,
              12: 10500,
              13: 10500,
              14: 10500,
              15: 10500,
              16: 10500,
              17: 10500,
              18: 10500,
              19: 10500,
              20: 10500,
              21: 10500,
              22: 10500
            }
          },
          is_active: {
            channel: {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              11: 0,
              12: 0,
              13: 0,
              14: 0,
              15: 0,
              16: 0,
              17: 0,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0
            }
          },
          priority: {
            channel: {
              1: 19,
              2: 19,
              3: 19,
              4: 19,
              5: 19,
              6: 19,
              7: 19,
              8: 19,
              9: 19,
              10: 19,
              11: 19,
              12: 19,
              13: 19,
              14: 19,
              15: 19,
              16: 19,
              17: 19,
              18: 19,
              19: 19,
              20: 19,
              21: 19,
              22: 19
            }
          },
          upoint: {
            channel: {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              11: 0,
              12: 0,
              13: 0,
              14: 0,
              15: 0,
              16: 0,
              17: 0,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0
            }
          },
          deliver_fee: {
            channel: {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              11: 0,
              12: 0,
              13: 0,
              14: 0,
              15: 0,
              16: 0,
              17: 0,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0
            }
          }
        },
        '641d5e465778aae99db6903b': {
          price: {
            channel: {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 10500,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              11: 0,
              12: 0,
              13: 0,
              14: 0,
              15: 0,
              16: 0,
              17: 0,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0
            },
            tradeshop: {}
          }
        }
      },
      thirdparty_data: {
        pickpack: {
          sync: false,
          sku: ''
        }
      },
      brand: 0,
      category_id: 27273,
      alcohol: 0,
      product_measure: null,
      created_date: '2023-03-14T02:56:52.489Z',
      created_by: 257,
      updated_by: 683
    }
  ]);
  const zonectx = useContext(ProductReportHook);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    fetch(`${process.env.REACT_APP_API_URL2}/api/zones`, requestOptions)
      .then(res => res.json())
      .then(res => {
        let data = [];
        res.data.map(item => {
          data.push({
            ...item,
            inputvalue: null
          });
        });
        setBuschleldata(data);
      })
      .catch(error => {
        console.log(error);
      });

    let aaa = [];
    zonectx.sitedata.business_types.map(item => {
      aaa.push({
        ...item,
        inputvalue: null
      });
    });

    console.log('zonectx.sitedata', zonectx.sitedata.business_types);
    setCategoryData(aaa);
  }, []);

  useEffect(() => {
    let data = [];
    console.log('Buscheklel -1', buschleldata);
    selectedProd.locations &&
      Object.keys(selectedProd.locations).map(item => {
        buschleldata.map((x, index) => {
          if (item === x._id) {
            data.push(...buschleldata.splice(index, 1));
          }
        });
      });
    console.log('Data', data);
    console.log('Buscheklel -2', buschleldata);
  }, [selectedProd]);
  console.log('selected prod', selectedProd);

  return (
    <div className={css.container}>
      <div className={css.chosewrapper}>
        {data.map((item, index) => {
          return (
            <span
              key={index}
              onClick={() => {
                setActive(index);
              }}
              style={{
                background: active === index ? 'red' : 'green'
              }}
            >
              {' '}
              {item.name}
            </span>
          );
        })}
      </div>
      <div className={css.generalwrapper}>
        <div className={css.bodywrapper}>
          <div className={css.productheader}>
            <div>IMG</div>
            <div>Бүтгээгдэхүүний нэр</div>
            <div>SKU</div>
          </div>
          <div className={css.producwrapper}>
            {products.map((item, index) => {
              return (
                <div
                  className={css.productwrapper}
                  onClick={e => {
                    setSelectedProd(item);
                    setSelectActive(index);
                  }}
                  style={{
                    background: index === selectActive ? 'orange' : '#fff'
                  }}
                >
                  <div className={css.imagecontainer}>
                    <img src={replaceImageUrl(item.image[0])} />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.sku}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${css.bodywrapper} ${css.second}`}>
          <div className={css.productheader}>
            <div>Бүсчлэлийн нэр</div>
            <div>Үнэ</div>
          </div>
          <div className={css.buschlelbody}>
            {buschleldata &&
              buschleldata.map((item, index) => {
                selectedProd.locations &&
                  Object.keys(selectedProd.locations).map(x => {
                    if (x === item._id) {
                      return (
                        <div className={css.productwrapper}>
                          <div>{item.name}</div>
                          <div>
                            <input
                            //   value={buschlel}
                            //   onChange={(e) => {
                            //     setBuschlel(e.target.value);
                            //   }}
                            />
                          </div>
                        </div>
                      );
                    }
                  });
                return;
              })}
          </div>
        </div>
        <div className={`${css.bodywrapper} ${css.second}`}>
          <div className={css.productheader}>
            <div>Сувгийн нэр</div>
            <div>Үүсгэсэн огноо</div>
          </div>
          <div className={css.buschlelbody}>
            {categoryData.map((item, index) => {
              return (
                <div className={css.productwrapper}>
                  <div>{item.business_type_name}</div>
                  <div>
                    <input
                      value={item.inputvalue}
                      onChange={e => {
                        let aa = [...categoryData];
                        aa.find(
                          x => x.business_type_id === item.business_type_id
                        ).value = e.target.value;
                        setCategoryData(aa);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTermNew;
