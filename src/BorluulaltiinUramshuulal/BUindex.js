import React, { useContext, useEffect, useState } from 'react';
import css from './buindex.module.css';
import SMSHook from '../Hooks/SMSHook';
import List from './components/List';
import myHeaders from '../components/MyHeader/myHeader';
import { styles } from './style';
import Avatar from './Avatar/Avatar';
import checkboxicon from '../assets/check box.svg';
import Modal from './Modal/Modal';
import Uramshuulal from './Uramshuulal/Uramshuulal';
import Product from './Product/Product';
import Productmodal from './ProductModal/Productmodal';
import Modals from './Modals/Modals';
import DeleteIcon from '../assets/delete_big.svg';
import checked from '../assets/Tick Square_green.svg';
import modifiedIcon from '../assets/Setting.svg';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const BUindex = props => {
  const smsctx = useContext(SMSHook);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [producton, setProducton] = useState(false);
  const [sitedata, setSitedata] = useState([]);
  // console.log("props 11111  props", props.userData);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent userData={props.userData} />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let supID =
      Number(props.userData.company_id.replaceAll('|', '')) === 1
        ? 13884
        : Number(props.userData.company_id.replaceAll('|', ''));

    let newUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${supID}`;

    fetch(newUrl, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('res ++++++++++++++++++', res);
        smsctx.setSupplierInfo(res.data);
      })
      .catch(error => {
        console.log('error', error);
      });

    let url = `${process.env.REACT_APP_API_URL2}/api/promotion/get?supplier=${supID}`;
    console.log('promotion url ', url);

    fetch(url, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('res ++++++++++++++++++', res);
        if (res.data.length !== 0) {
          let update = res.data.map((item, index) => {
            return {
              ...item,
              checked: false
            };
          });
          setData(update);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    fetch(
      `${
        process.env.REACT_API_URL2
      }/backoffice/users?company=${props.userData.company_id.replaceAll(
        '|',
        ''
      )}`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
        setUserData(res.data);

        fetch(`${process.env.REACT_APP_API_URL}/api/site_data`, requestOptions)
          .then(res => res.json())
          .then(res => {
            setSitedata(res);
          })
          .catch(error => {
            console.log('error', error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);
  const CheckedHandler = item => {
    console.log('data', data);
    let update = data.map((x, i) => {
      if (x._id === item._id) {
        return {
          ...x,
          checked: item.checked === true ? false : true
        };
      } else {
        return {
          ...x
        };
      }
    });
    setData(update);
  };

  const DeleteHandler = item => {
    if (window.confirm('Та устгахдаа итгэлтэй байна уу')) {
      let url = `${process.env.REACT_APP_API_URL2}/api/promotion/delete?_id=${item._id}`;
      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(url, requestOptions)
        .then(res => res.json())
        .then(res => {
          if (res.code === 200) {
            let update = data.filter(x => x._id !== item._id);
            setData(update);
            alert('Амжилттай устгалаа');
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };

  const ModifiedHandler = item => {
    console.log('item modified', JSON.stringify(item));
    smsctx.setUpdateTrue(true);
    smsctx.setUpdateID(item);
    smsctx.setBarOpen(true);

    smsctx.setUramshuulalOpen(true);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let userdatass = [];
    item.users.map(x => {
      let url = `${
        process.env.REACT_APP_API_URL2
      }/api/backoffice/users?id=${Number(x)}`;
      fetch(url, requestOptions)
        .then(res => res.json())
        .then(res => {
          console.log(res);

          userdatass.push({
            ...res.data[0],
            chosed: true
          });
        })
        .catch(error => {
          console.log('error', error);
        });
    });
    // smsctx.setXt(userdatass);

    smsctx.setFilteredXT(prev => [prev, ...userdatass]);

    item.products &&
      item.products.map(x => {
        smsctx.setChosedProdIDS(prev => [...prev, x.productId]);
      });

    item.zones &&
      item.zones.map(x => {
        smsctx.setZoneids(prev => [...prev, x]);
      });
    let newMultidata = [];

    if (item.packages.length !== 0) {
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      item.packages.map(y => {
        let multiProductdata = [];
        y.products.map(x => {
          fetch(
            `${process.env.REACT_APP_API_URL2}/api/products/get1?ids=[${x.productId}]`,
            requestOptions
          )
            .then(res => res.json())
            .then(res => {
              multiProductdata.push({
                ...res.data[0],
                succeeded: x.succeeded
              });
            })
            .catch(error => {
              console.log('error', error);
            });
        });
        newMultidata.push({
          _id: Math.random(),
          goal: y.goal,
          title: y.title,
          products: multiProductdata,
          totalQuantity: y.goal.quantity,
          totalAmount: y.goal.amount
        });
      });
    }
    smsctx.setCollectTitle('HI');
    console.log('newMultidata', newMultidata);
    smsctx.setMultiProducts(newMultidata);
    // smsctx.setUpdateID(item._id);
    smsctx.setPrizeImage(item.prizes[0].imageUrl[0]);

    smsctx.setBname(item.name);
    smsctx.setShagnalname(item.prizes[0].name);

    smsctx.setStartdate(item.startDate.split('T')[0]);
    smsctx.setEnddate(item.endDate.split('T')[0]);
    smsctx.setChosedChannel(item.channels);
    smsctx.setBrandsdata(item.brands);
    smsctx.setCategoriesdata(item.categories);
  };
  return (
    <div className={css.container}>
      <div>
        <div className={css.header}>
          <div className={css.angilalcheck} style={styles.firstContainer}>
            <img
              src={checkboxicon}
              alt='checkbox icon'
              style={{
                width: '20px',
                height: '20px'
              }}
            />
          </div>
          <div className={css.angilal} style={styles.checkboxcontainer}>
            <span>Борлуулалтын төлөвлөгөө гүйцэтгэх ажилтнууд</span>
          </div>
          <div className={css.angilal} style={styles.logoContainer}>
            <span>Урамшууллын нэр</span>
            <input />
          </div>
          <div className={css.angilal} style={styles.supplierContainer}>
            <span>Борлуулалтын шагнал</span>
            {/* <input /> */}
          </div>
          <div className={css.angilal} style={styles.dateContainer}>
            <span>Эхлэх огноо</span>
            <input type='date' />
          </div>
          <div className={css.angilal} style={styles.dateContainer}>
            <span>Дуусах огноо</span>
            <input type='date' />
          </div>
          <div className={css.angilal} style={styles.notifContainer}>
            <span>Борлуулалтын төлөвлөгөө</span>
            <input />
          </div>
        </div>
        <div className={css.body}>
          {data &&
            data.map((item, index) => {
              let widthcalculate =
                (item.goal.succeeded * 150) / item.goal.amount;

              return (
                <div className={css.wrapperone} key={index}>
                  <div
                    style={styles.firstContainer}
                    className={css.checkedcontainer}
                    onClick={() => CheckedHandler(item)}
                  >
                    <img
                      src={item.checked === true ? checked : checkboxicon}
                      alt='checkbox icon'
                    />
                  </div>
                  <div
                    className={css.subwrapper}
                    style={{
                      paddingLeft: '6px',
                      marginLeft: '10px',
                      ...styles.checkboxcontainer
                    }}
                  >
                    <Avatar ids={item.users} users={userData} />
                  </div>
                  <div className={css.subwrapper} style={styles.logoContainer}>
                    <span>{item.name ? item.name : ''}</span>
                  </div>
                  <div
                    className={css.subwrapper}
                    style={styles.supplierContainer}
                  >
                    <span>{item.prizes ? item.prizes[0].name : ''}</span>
                  </div>
                  <div className={css.subwrapper} style={styles.dateContainer}>
                    <span>
                      {item.startDate && item.startDate.split('T')[0]}
                    </span>
                    <span>
                      {item.startDate &&
                        item.startDate.split('T')[1]?.substr(0, 8)}
                    </span>
                  </div>
                  <div className={css.subwrapper} style={styles.dateContainer}>
                    <span>{item.endDate && item.endDate.split('T')[0]}</span>
                    <span>
                      {item.endDate && item.endDate.split('T')[1]?.substr(0, 8)}
                    </span>
                  </div>
                  <div
                    className={css.subwrapperTotal}
                    style={styles.productContainer}
                  >
                    <span
                      style={{
                        fontWeight: '700'
                      }}
                    >
                      {/* {item &&
                        item.goal &&
                        item.goal.amount.toLocaleString() + "₮"} */}
                      {item &&
                        item.goal &&
                        item.goal.amount?.toLocaleString() + '₮'}
                    </span>
                    <div className={css.totalwrapper}>
                      <div className={css.total}></div>
                      <div
                        className={css.totalaa}
                        style={{
                          width: `${
                            widthcalculate >= 150 ? 150 : widthcalculate
                          }px`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <img
                      src={DeleteIcon}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        marginLeft: '1rem'
                      }}
                      onClick={() => DeleteHandler(item)}
                    />
                  </div>
                  <div>
                    <img
                      src={modifiedIcon}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        marginLeft: '1rem'
                      }}
                      onClick={() => ModifiedHandler(item)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* {smsctx?.modalOpen && <List userdata={props} />} */}
      {smsctx?.modalOpen && <Modal userdata={userData} />}
      {smsctx.uramshuulalOpen === true && (
        <Uramshuulal
          sitedata={sitedata}
          userdata={userData}
          user={props.userData}
        />
      )}
      {producton === true && <Product />}
      {smsctx.productModal && <Productmodal sitedata={sitedata} />}
      {smsctx.brandModal && <Modals />}
      {smsctx.angilalModal && <Modals />}
    </div>
  );
};

export default BUindex;
