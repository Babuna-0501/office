import React, { useState, useEffect, useContext } from 'react';
import css from './uramshuulal.module.css';
import plusicon from '../../assets/profile_uramshuulal.svg';
import SMSHook from '../../Hooks/SMSHook';
import zoninggreen from '../../assets/zonning_green.svg';
import subaggray from '../../assets/suvgiin tohirgoo_gray.svg';
import Tabs from '../Tabs/Tabs';
import SaveModal from '../SaveModal/SaveModal';
import Dropdown from '../Dropdown/Dropdown';
import Channelgreenicon from '../../assets/channel_green.svg';
import DropdownZone from '../Dropdown/DropdownZone';
import myHeaders from '../../components/MyHeader/myHeader';
import imageicon from '../../assets/photo-add.svg';
import channelGray from '../../assets/suvgiin tohirgoo.svg';
import ImageUpload from '../Image Upload/ImageUpload';
const Uramshuulal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [channelOpen, setChannelOpen] = useState(false);
  const [channelvalue, setChannelvalue] = useState(null);
  const [zoneOpen, setZoneOpen] = useState(false);
  const [zonedata, setZonedata] = useState([]);
  const [zonevalue, setZonevalue] = useState(null);

  const [plantype, setPlantype] = useState(1);
  const [channeldata, setChanneldata] = useState([]);
  const [imageOpen, setImageOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);

  const smsctx = useContext(SMSHook);
  console.log(smsctx);
  // console.log("props uramshuulal", props);

  useEffect(() => {
    const unique = [
      ...new Map(smsctx.filteredXT.map(m => [m.user_id, m])).values()
    ];

    smsctx.setXt(unique);
  }, []);

  useEffect(() => {
    let name = [];
    smsctx.chosedChannel.map(item => {
      let aa =
        props.sitedata &&
        props.sitedata.business_types?.filter(x => x.business_type_id === item);
      name.push(aa[0].business_type_name);
    });
    setChannelvalue(name);
  }, [smsctx.chosedChannel]);

  useEffect(() => {
    let name = [];
    smsctx.chosedChannel.map(item => {
      let aa =
        props.sitedata &&
        props.sitedata.business_types.filter(x => x.business_type_id === item);
      name.push(aa[0].business_type_name);
    });
    setChannelvalue(name);
  }, [smsctx.zoneids]);

  const SaveHandler = () => {
    let ids = [];
    smsctx.xt.map(item => {
      ids.push(item.user_id);
    });

    console.log('smsctx.setAngilalData', smsctx.angilalData);

    if (smsctx.bname === null) {
      alert('Та урамшуулалын нэрээ оруулна уу');
      return;
    }
    if (smsctx.shagnalname === null) {
      alert('Та шагналын нэрээ оруулна уу');
      return;
    }
    if (smsctx.startdate === null) {
      alert('Та эхлэх өдрөө оруулна уу');
      return;
    }
    if (smsctx.enddate === null) {
      alert('Та дуусах өдрөө оруулна уу');
      return;
    }
    // if (smsctx.productData.length === 0) {
    //   alert("Та бүтээгдэхүүнээ сонгоно уу");
    //   return;
    // }

    // if (smsctx.chosedChannel.length === 0) {
    //   alert("Та сувагаа сонгоно уу");
    //   return;
    // }
    // if (smsctx.zoneids.length === 0) {
    //   alert("Та бүсчлэлээ сонгоно уу");
    //   return;
    // }
    if (plantype === null) {
      alert('Та хямрдарлын төрөлөө сонгоно уу');
      return;
    }
    console.log('smsctx.productData', smsctx.productData);
    let brands = [];
    let products = [];
    let cat = [];
    let multiProducts = [];
    let totalAmountGoal = 0;

    if (smsctx.chosedBrands.length !== 0) {
      smsctx.chosedBrands.map((item, index) => {
        brands.push({
          brandId: item.BrandID,
          goal: {
            amount: item.totalAmount
          },
          succeeded: {
            amount: 0
          },
          waiting: {
            amount: 0
          }
        });

        totalAmountGoal += item.totalAmount;
      });
    }
    if (smsctx.Angilaldata.length !== 0) {
      smsctx.Angilaldata.map((item, index) => {
        cat.push({
          categoryId: item.id,
          goal: {
            amount: item.totalAmount
          },

          succeeded: {
            amount: 0
          },
          waiting: {
            amount: 0
          }
        });

        totalAmountGoal += item.totalAmount;
      });
    }

    if (smsctx.multiProducts.length !== 0) {
      // console.log(smsctx.productData);

      smsctx.multiProducts.map(item => {
        let productdata = [];

        item.products.map(x => {
          productdata.push({
            productId: x._id,
            succeeded: {
              quantity: 0,
              amount: 0
            },
            waiting: {
              quantity: 0,
              amount: 0
            }
          });
        });
        multiProducts.push({
          goal: {
            amount: item.totalAmount ? Number(item.totalAmount) : 0,
            quantity: item.totalQuantity ? Number(item.totalQuantity) : 0,
            succeeded: 0,
            waiting: 0
          },
          title: item.title,
          products: productdata
        });
      });

      totalAmountGoal += Number(smsctx.multiProductTotal);
    } else {
      smsctx.productData &&
        smsctx.productData.map(item => {
          console.log(item);
          let total = 0;
          products.push({
            productId: item._id,
            goal: {
              amount: Number(item.totalAmount),
              quantity: Number(item.totalQuantity)
            },
            succeeded: {
              quantity: 0,
              amount: 0
            },
            waiting: {
              quantity: 0,
              amount: 0
            }
          });

          total =
            Number(
              item.locations['62f4aabe45a4e22552a3969f'].price.channel['1']
            ) * Number(item.totalQuantity);
          totalAmountGoal += Number(total);
          totalAmountGoal += Number(item.totalAmount);
        });
    }

    let newData = {
      brands: brands,
      categories: cat,
      endDate: smsctx.enddate,
      excludeTs: [],
      includeTS: [],
      goal: {
        amount: totalAmountGoal,
        succeeded: 0,
        waiting: 0
      },
      zones: smsctx.zoneids,
      channels: smsctx.chosedChannel,
      name: smsctx.bname,
      packages: multiProducts,
      prizes: [
        {
          prizeId: 1,
          name: smsctx.shagnalname,
          target: 0,
          imageUrl: imageUrl
        }
      ],
      products: products,
      startDate: smsctx.startdate,
      status: 'ongoing',
      supplier:
        Number(props.user.company_id.replaceAll('|', '')) === 1
          ? 13884
          : Number(props.user.company_id.replaceAll('|', '')),
      users: ids
    };
    if (smsctx.updateID !== null) {
      newData = {
        ...newData,
        _id: smsctx.updateID._id
      };
    }

    console.log('newData', JSON.stringify(newData));

    var requestOptions = {
      method: smsctx.updateID !== null ? 'PUT' : 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(newData)
    };
    console.log('requestOptions+++++22222', requestOptions);
    let url = `${process.env.REACT_APP_API_URL2}/api/promotion/create`;
    if (smsctx.updateID !== null) {
      url = `${process.env.REACT_APP_API_URL2}/api/promotion/update`;
    }

    fetch(url, requestOptions)
      .then(res => res.json())
      .then(res => {
        // console.log("res", res);
        if (res.code === 200) {
          ClearHandler();
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const ChannelOpen = item => {
    if (item === 'channel') {
      setChannelOpen(!channelOpen);
    }
    if (item === 'zone') {
      setZoneOpen(!zoneOpen);
    }
  };

  useEffect(() => {
    let name = [];
    smsctx.zoneData.map(item => {
      if (smsctx.zoneids.includes(item._id)) {
        name.push(item.name);
      }
    });
    setZonevalue(name);
  }, [smsctx.zoneids]);

  const ImageUploadHandler = () => {
    setImageOpen(true);
  };
  function ClearHandler() {
    setModalOpen(true);
    setPlantype(null);
    smsctx.setBname(null);
    smsctx.setStartdate(null);
    smsctx.setEnddate(null);
    smsctx.setShagnalname(null);
    smsctx.setUpdateID(null);
    smsctx.setPrizeImage(null);
    smsctx.setBarOpen(false);
    smsctx.setXt([]);
    smsctx.setProductData([]);
    smsctx.setChosedChannel([]);
    smsctx.setZoneids([]);
    smsctx.setCollectTitle(null);
    smsctx.setAngilaldata([]);
    smsctx.setChosedBrands([]);

    smsctx.setUpdateTrue(false);
    smsctx.setCategoriesdata([]);
    smsctx.setBrandsdata([]);
    smsctx.setMultiProducts([]);
  }
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.firstcontainer}>
          <div className={css.workerwrapper}>
            {smsctx.xt &&
              smsctx.xt.map((item, index) => {
                return (
                  <div className={css.detail} key={index}>
                    <div className={css.imagedetail}>
                      <img
                        src={
                          item.profile_picture
                            ? item.profile_picture
                            : `${process.env.REACT_APP_MEDIA_URL}/product/69883d9becbcf663f7f3da1b874eab762cf6581c3ee1d3e81098e6f14aae.jpg`
                        }
                        alt='zurag'
                      />
                    </div>
                    <div className={css.detailinfo}>
                      <span className={css.detail_name}>
                        {item.first_name
                          ? item.first_name
                          : 'Xудалдааны төлөөлөгч'}
                      </span>
                      <span className={css.detail_role}>
                        {' '}
                        {item.role
                          ? item.roleName.Role
                          : 'Худалдааны төлөөлөгч'}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          <img
            src={plusicon}
            style={{
              width: '40px',
              height: '40px',
              marginLeft: '20px',
              cursor: 'pointer'
            }}
            alt='plus icon'
            onClick={() => {
              smsctx.setModalOpen(true);
              smsctx.setUramshuulalOpen(false);
            }}
          />
        </div>
        <div className={css.secondcontainer}>
          <div className={css.inputwrappersecond}>
            <input placeholder='Бүсчлэл' value={zonevalue} />
            <img
              src={zoninggreen}
              className={css.icons}
              onClick={() => ChannelOpen('zone')}
            />
            {zoneOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '50px',
                  left: '0',
                  width: '300px',
                  zIndex: '500'
                }}
              >
                <DropdownZone setZonedata={setZonedata} />
              </div>
            )}
          </div>
          <div className={css.inputwrapper}>
            <input
              placeholder='Борлуулалтын урамшуулалын нэр'
              value={smsctx.bname}
              onChange={e => {
                smsctx.setBname(e.target.value);
              }}
            />
          </div>
          <div
            className={css.inputwrapper}
            style={{
              position: 'relative'
            }}
          >
            <input
              placeholder='Шагналын нэр, зураг оруулах'
              value={smsctx.shagnalname}
              onChange={e => {
                smsctx.setShagnalname(e.target.value);
              }}
            />
            <img
              src={smsctx.prizeImage ? smsctx.prizeImage : imageicon}
              style={{
                width: '24px',
                height: '24px',
                position: 'absolute',
                top: '10px',
                right: '10px'
              }}
              alt='image icon'
              onClick={ImageUploadHandler}
            />
          </div>
          <div className={css.datewrapper}>
            <input
              type='date'
              placeholder='Эхлэх'
              value={smsctx.startdate}
              onChange={e => {
                smsctx.setStartdate(e.target.value);
              }}
              className={css.inputclass}
            />
            <input
              type='date'
              placeholder='Дуусах'
              value={smsctx.enddate}
              onChange={e => {
                smsctx.setEnddate(e.target.value);
              }}
              className={css.inputclass}
            />
          </div>
          <div className={css.inputwrappersecond}>
            <input placeholder='Сувгийн тохиргоо' value={channelvalue} />
            <div
              className={css.inputwrappersecondnew}
              onClick={() => ChannelOpen('channel')}
            >
              <img
                src={channelvalue === null ? channelGray : Channelgreenicon}
                className={css.icons}
              />
              <span
                className={css.too}
                style={{
                  position: 'absolute',
                  left: '-30px',
                  top: '15px',
                  color: '#fff',
                  fontSize: '10px'
                }}
              >
                {smsctx.chosedChannel.length !== 0
                  ? smsctx.chosedChannel.length
                  : ''}
              </span>
            </div>

            {channelOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '50px',
                  left: '0',
                  width: '300px',
                  zIndex: '500'
                }}
              >
                <Dropdown
                  data={props.sitedata}
                  setChanneldata={setChanneldata}
                />
              </div>
            )}
          </div>
        </div>

        <div className={css.tabs}>
          <Tabs setPlantype={setPlantype} />
        </div>
        <div className={css.btncontainer}>
          <button
            className={css.cancel}
            onClick={() => {
              smsctx.setChosedProdIDS([]);
              smsctx.setUramshuulalOpen(false);
              smsctx.setZoneids([]);
              smsctx.setChosedChannel([]);
              smsctx.setBname(null);
              smsctx.setShagnalname(null);
              smsctx.setStartdate(null);
              smsctx.setEnddate(null);

              smsctx.setXt([]);
              ClearHandler();
            }}
          >
            Цуцлах
          </button>
          <button className={css.confirm} onClick={SaveHandler}>
            Хадгалах
          </button>
        </div>
      </div>
      {modalOpen && (
        <SaveModal setModalOpen={setModalOpen} onClick={ClearHandler} />
      )}
      {imageOpen && (
        <ImageUpload
          setImageOpen={setImageOpen}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
};

export default Uramshuulal;
