import React, { useState, useEffect, useContext } from 'react';
import css from './price.module.css';
import Priceli from './Priceli';
import myHeaders from '../components/MyHeader/myHeader';

function Price(props) {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(0);
  const [product, setProduct] = useState([]);
  const [zones, setZones] = useState([]);
  const [onezoneid, setOnezoneid] = useState('62f4aabe45a4e22552a3969f');
  const [zoneIndex, setZoneIndex] = useState(1);
  const [sitedata, setSitedata] = useState([]);
  const [allzone, setAllzone] = useState([]);
  const [pricelog, setPricelog] = useState([]);
  const data = [
    { id: 1, name: 'Сувгийн үнийн мэдээлэл' },
    { id: 2, name: 'Бүтээгдэхүүний үнийн тохиргоо' },
    { id: 3, name: 'Үнийн өөрчлөлтийн түүх' }
  ];

  // console.log("sitectx", allzone);

  useEffect(() => {
    setProduct(props.product);
    setZones(Object.keys(props.product.locations));
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/site_data`, requestOptions)
      .then(res => res.json())
      .then(res => {
        setSitedata(res);
      })
      .catch(error => {
        console.log('error', error);
      });

    fetch(`${process.env.REACT_APP_API_URL2}/api/zones`, requestOptions)
      .then(res => res.json())
      .then(res => {
        // console.log("res zone ", res);
        setAllzone(res.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [props]);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/get/backofficelog?entry_id=${props.product._id}`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        // console.log("Res", res);
        let aa = res.data.reverse();
        setPricelog(aa);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [page === 3]);
  // console.log("product price", product);
  const save = () => {
    const foobar = document.getElementById('productprice');
    if (foobar.value !== '') {
      let channelprice = {};

      sitedata &&
        sitedata.business_types.map(item => {
          channelprice[item.business_type_id] = Number(foobar.value);
        });
      console.log('channelprice', channelprice);

      let rawNew = {
        product_id: props.product._id,
        supplier_id: props.product.supplier_id,
        'locations.62f4aabe45a4e22552a3969f.price.channel': channelprice
      };

      rawNew = JSON.stringify(rawNew);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: rawNew,
        redirect: 'follow'
      };

      // console.log("requestOptions price update", requestOptions);
      let urlNew = `${process.env.REACT_APP_API_URL2}/api/product/update1`;
      fetch(urlNew, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.code === 200) {
            props.setProduct({
              ...props.product,
              ...(props.product.locations[
                '62f4aabe45a4e22552a3969f'
              ].price.channel = channelprice)
            });
            fetch(
              `${process.env.REACT_APP_API_URL2}/api/create/backofficelog`,
              {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
                body: JSON.stringify({
                  section_name: 'Бүтээгдэхүүний үнийн өөрчлөлт.',
                  entry_id: props.product._id,
                  user_name: props.userData.email,
                  action: `Шинэ үнэ : ${rawNew}`
                })
              }
            )
              .then(res => res.json())
              .then(res => console.log('res', res))
              .catch(error => {
                console.log('error', error);
              });

            props.setPrice(false);
            alert('Үнэ амжилттай шинэчлэгдлээ');
          }
        })
        .catch(error => {
          console.log('price update error', error);
        });
    } else {
      alert('Үнийн мэдээлэл оруулна уу');
    }
  };
  const MultiPriceSave = () => {
    window.confirm('Та үнэ өөрчлөх гэж байна. Итгэлтэй байна уу');
    let ids = Object.keys(product.locations);
    let aa = {};

    ids.map(item => {
      aa[`locations.${item}.price.channel`] =
        product.locations[item].price.channel;
    });
    // console.log("aa", aa);
    let rawNew = JSON.stringify({
      product_id: product._id,
      ...aa
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: rawNew,
      redirect: 'follow'
    };
    console.log('requestOptions', requestOptions);
    let urlNew = `${process.env.REACT_APP_API_URL2}/api/product/update1`;
    fetch(urlNew, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.code === 200) {
          fetch(`${process.env.REACT_APP_API_URL2}/api/create/backofficelog`, {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({
              section_name: 'Бүтээгдэхүүний үнийн өөрчлөлт.',
              entry_id: props.product._id,
              user_name: props.userData.email,
              action: `Шинэ үнэ : ${rawNew}`
            })
          })
            .then(res => res.json())
            .then(res => console.log('res', res))
            .catch(error => {
              console.log('error', error);
            });
        }

        props.setPrice(false);
      })
      .catch(error => {
        console.log('price update error', error);
      });
  };

  return (
    <div id='bg'>
      <div id='foo'>
        <div className={css.pricecontainer}>
          <span className='close' onClick={() => props.setPrice(false)}>
            Close
          </span>
          <div className={css.wrapper}>
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    index === active ? css.background : css.nobackground
                  }
                  onClick={() => {
                    setActive(index);
                    if (index === 0) {
                      setPage(1);
                    }
                    if (index === 1) {
                      setPage(2);
                    }
                    if (index === 2) {
                      setPage(3);
                    }
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          {page === 1 && (
            <div className={css.zonecontainer}>
              <div className={css.zonewrapper}>
                <div className={css.zoneheader}>
                  {zones &&
                    zones.map((item, i) => {
                      let zonename = allzone.filter(x => x._id === item);
                      // console.log("zonename ++++", zonename);

                      return (
                        <div
                          className={
                            zoneIndex === i
                              ? css.zonebackground
                              : css.nozonebackground
                          }
                          key={i}
                          onClick={() => {
                            setZoneIndex(i);
                            setOnezoneid(item);
                          }}
                        >
                          {zonename ? zonename[0]?.name : item}
                          <br></br>
                          {item}
                        </div>
                      );
                    })}
                </div>
                <div>
                  <ul>
                    {sitedata &&
                      sitedata.business_types?.map((x, index) => {
                        return (
                          <Priceli
                            key={index}
                            x={x}
                            product={product}
                            setProduct={setProduct}
                            onezoneid={onezoneid}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className={css.btnwrapper}>
                <button onClick={MultiPriceSave} className={css.btnone}>
                  Бүсчлэлийн үнэ шинэчлэх
                </button>
              </div>
            </div>
          )}

          {page === 2 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h1>Бүтээгдэхүүний үнийн тохиргоо</h1>
              <input
                type='number'
                id='productprice'
                defaultValue={
                  props.product.locations['62f4aabe45a4e22552a3969f'].price
                    .channel[1]
                }
              />
              <button onClick={() => save()}>Хадгалах111</button>
            </div>
          )}
          {page === 3 && (
            <div className={css.logcontainer}>
              {pricelog &&
                pricelog.map(item => {
                  let aa = item.action.replace('Шинэ үнэ :', '');
                  let data = JSON.parse(aa);

                  let zoneName = Object.keys(data)[1].split('.')[1];

                  let dataOne = Object.values(data)[1];

                  // console.log("Data action", zoneName);
                  console.log('aaadaaa----------/////', data);
                  let objectKYES = Object.keys(data);
                  let newKey = [];
                  objectKYES.map(item => {
                    if (item !== 'product_id') {
                      newKey.push(item);
                    }
                  });

                  // console.log("aaadaaa----------/////", newKey);

                  return (
                    <div>
                      {newKey.map(x => {
                        let axaaa = x.split('.')[1];
                        console.log('x', axaaa);
                        allzone.map(y => {
                          if (y._id === axaaa) {
                            zoneName = y.name;
                            return;
                          }
                        });
                        return (
                          <>
                            {' '}
                            <div className={css.wrapperTwo}>
                              <div className={css.datecontainer}>
                                <span>Өөрчилсөн хэрэглэгч</span>
                                <p>{` : ${item.user_name}`}</p>
                              </div>
                              <div className={css.datecontainer}>
                                <span>Бүсийн нэр</span>
                                <p>{` :  ${
                                  zoneName === 'ZONE_MGL' ? 'Монгол' : zoneName
                                }
                             `}</p>
                              </div>
                              <div className={css.datecontainer}>
                                <span>Өөрчлөгдсөн огноо</span>
                                <p>{` :  ${
                                  item.date_time.split('T')[0]
                                } ${item.date_time
                                  .split('T')[1]
                                  .slice(0, 8)}`}</p>
                              </div>
                            </div>
                            <div className={css.wrapperOne}>
                              <ul>
                                {sitedata.business_types.map((item, index) => {
                                  return (
                                    <li className={css.licontainer} key={index}>
                                      <span>{item.business_type_name}</span>{' '}
                                      <p>{data[x][item.business_type_id]}</p>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Price;
