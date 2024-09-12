import React, { useState, useEffect, useContext } from 'react';
import { Select } from 'antd';
import css from './addnewdiscount.module.css';
import PromoHook from '../Hooks/PromoHook';
import ProductReportHook from '../Hooks/ProductsReportHook';
import EllipseGrayIcon from '../assets/Component 92.svg';
import PlusIcon from '../assets/plus_gray.svg';
import OkIcon from '../assets/OK.svg';
import myHeaders from './HeaderContent/HeaderContent';

import ArrawRightGray from '../assets/Arrow - Right.svg';
import DiscountProducts from './DiscountProductV1';
import Condition from './condition/Condition';
import BackOfficeHook from '../Hooks/BackOfficeHook';
import dataOne from './discount.json';
import settingData from './settingData.json';
import SmallTable from './SmallTable';
import AppHook from '../Hooks/AppHook';
import Headertitle from './HeaderTitle/Headertitle';

import ZonesSidebar from './ZonesModal/ZonesSidebar';
import ProductChose from './ProductChose/ProductChose';
import Supplier from './Suppliers/Supplier';
import Headercomponent from './Header/Headercomponent';
import Threshold from './Threshold/Threshold';
import CollectionList from './CollectionList/CollectionList';
import CollectionView from './CollectionView/CollectionView';
import ProductTypeSelectButton from './ButtonContainer/ProductTypeSelectButton';
import ProductTypeSelectButtonTwo from './ButtonContainertwo/ProductTypeSelectButtonTwo';
import Buttonpercent from './ButtonPercent/Buttonpercent';
import Translate from '../Translate.json';
import Promojson from './Promo.json';
import ProductAdd from './Product/ProductAdd';

const AddNewDiscount = () => {
  const [discountTitle, setDiscountTitle] = useState('');
  const [startDateValue, setStartDateValue] = useState(null);
  const [endDateValue, setEndDateValue] = useState(null);
  const [priceAndQuantity, setPriceAndQuantity] = useState(null);
  const [discountType, setDiscountType] = useState(null);
  const [comments, setComments] = useState(null);
  const [giftQuantity, setQiftQuantity] = useState(null);
  const [data, setData] = useState([]);
  const [zoneMapIDS, setZoneMapIDS] = useState(['62f4aabe45a4e22552a3969f']);
  const [zoneTransdata, setZoneTransdata] = useState([]);
  const [channelIDS, setChannelIDS] = useState([]);

  const [discountCondition, setDiscountCondition] = useState([]);
  const [conditionShow, setConditionShow] = useState(false);
  const [insertTypeProduct, setInsertTypeProduct] = useState(500);
  const [supplierChoseID, setSupplierChoseID] = useState(null);
  const [mainDiscountType, setMainDiscountType] = useState(null);
  const [channelOption, setChannelOption] = useState([]);
  const [channelOptionDefault, setChannelOptionDefault] = useState([]);
  const [busIDS, setBusIDS] = useState([]);
  const min = 1;
  const max = 100;
  const ctx = useContext(PromoHook);
  const appctx = useContext(AppHook);
  const ctxBackOffice = useContext(BackOfficeHook);
  const productReportctx = useContext(ProductReportHook);
  // console.log("startDateValue", startDateValue);
  // console.log("endDateValue", endDateValue);
  // console.log(startDateValue === endDateValue);
  useEffect(() => {
    const fetchdata = () => {
      let url = `${process.env.REACT_APP_API_URL}/api/site_data`;
      fetch(url, {
        method: 'GET',
        myHeaders: myHeaders
      })
        .then(r => r.json())
        .then(response => {
          let aa = [];
          let bb = [];
          // console.log("response sitedata", response.business_types);
          response.business_types.map(item => {
            aa.push({
              value: item.business_type_id,
              label: item.business_type_name
            });
            bb.push(item.business_type_id);
          });

          let ids =
            response && response.business_types.map(x => x.business_type_id);
          setBusIDS(ids);
          setChannelOption(aa);

          setChannelOptionDefault(bb);
        });
    };
    try {
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    ctx?.setProducts([]);
  }, []);
  const options = [];
  if (ctxBackOffice.suppliers) {
    ctxBackOffice.suppliers.map(supplier => {
      options.push({ value: supplier.id, label: supplier.english_name });
    });
  }
  useEffect(() => {
    let disArr = [];
    settingData.map(it => {
      if (it.parentID === ctx.discountTypeSelect?.id) {
        disArr.push(it);
      }
      setData(disArr);
    });
  }, []);
  useEffect(() => {
    setMainDiscountType(ctx.discountTypeSelect.type);
  }, []);

  console.log('ctx.productTypeSelec', ctx.productTypeSelec);

  const optionsTwo = [];
  if (dataOne) {
    dataOne.map(dataOne => {
      optionsTwo.push({ value: dataOne.id, label: dataOne.name });
    });
  }
  // const handleChange = (selectedOptions) => {
  //   // console.log(selectedOptions.value);
  //   ctx.setSupplierID(selectedOptions.value);
  //   ctx.setSupplierName(selectedOptions.label);
  // };
  /* Хямдралын төрлийг сонгох */
  const settingChooseHandler = (item, index) => {
    // console.log("iiitem", item);
    if (ctx.productTypeSelect === '0') {
      alert('Та барааны сонголтоо хийнэ үү...');
      return;
    }
    setDiscountType(item);
    ctx.setSettingActive(index);
  };
  // console.log("ctx.products", ctx.products);
  const productsAddHandler = () => {
    if (ctx?.supplierID === null) {
      alert('Та нийлүүлэгчээ сонгоно уу');
      return;
    }
    ctx.setPromoProductAdd(true);
  };
  // console.log("discounttype", discountType);

  const giftProductHandler = () => {
    if (supplierChoseID === null) {
      alert('Та нийлүүлэгчээ сонгоно уу');
      return;
    }

    let aa = ctx.willUpdateProd.supplierID;
    console.log('++++aa', aa);

    ctx.setPromoProductAdd(false);
    ctx.setGiftProd(true);
  };

  const deleteGiftHandler = (item, index) => {
    const newList = ctx.giftProduct.filter(t => t.id !== item.id);
    ctx.setGiftProduct(newList);
  };

  const zonesSidebarhandler = () => {
    // setZonesname(["Бүх бүсчлэл"]);
    ctx.setZonessidebar(true);
  };

  let arrProducts = [];
  useEffect(() => {
    arrProducts.push(...ctx.products);
  }, [ctx.products]);
  // console.log("(ctx.arrProducts", arrProducts);
  const ShowHandler = () => {
    setConditionShow(true);
  };
  const removeHandler = item => {
    let aaa = discountCondition.filter(x => {
      return x.label !== item.label;
    });
    setDiscountCondition(aaa);
  };

  const HandleChangeGiftQty = event => {
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setQiftQuantity(value);
  };
  const typeThreeHandler = e => {
    // console.log("iiitem", item);
    if (ctx.productTypeSelect === '0') {
      alert('Та барааны сонголтоо хийнэ үү...');
      return;
    }
    setPriceAndQuantity(e.target.value);
  };

  const channelOptions = [];

  for (let i = 0; i < ctx.promoChannel.length; i++) {
    channelOptions.push({
      value: ctx.promoChannel[i].business_type_id,
      label: ctx.promoChannel[i].business_type_name
    });
  }
  // console.log("zoneTransdata", zoneTransdata);
  const handleChange = value => {
    // console.log(`selected ${value}`);
    setChannelOptionDefault(value);
  };
  let dicontent;
  // console.log("discountcondition", discountCondition);
  dicontent =
    discountCondition &&
    discountCondition.map(item => {
      return (
        <div className={css.discoContainer} onClick={() => removeHandler(item)}>
          <p>Урамшууллын үнэ: {item.label}</p>

          <p>Урамшууллын хувь: {item.percent}</p>
        </div>
      );
    });

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <Headercomponent title={setDiscountTitle} titlevalue={discountTitle} />
        <div style={{ width: '100%' }}>
          <Supplier title='Нийлүүлэгч' supID={setSupplierChoseID} />
        </div>
        {/* {ctx.discountTypeSelect.id === 2 && (
          <ProductChose setInsertTypeProduct={setInsertTypeProduct} />
        )} */}
        <ProductChose
          setInsertTypeProduct={setInsertTypeProduct}
          mainDiscountType={mainDiscountType}
        />
        {Number(insertTypeProduct) === 1000 && <Threshold />}
        <div className={css.secondContainer}>
          <div className={css.header}>
            <h3>Тохиргоо</h3>
          </div>
          <div className={css.settingsContainer}>
            <div className={css.firswrapper}>
              <div
                style={{
                  display: 'flex',
                  width: '410px',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {Number(insertTypeProduct) === 500 &&
                  data.map((item, index) => {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                          // width: "100%",
                        }}
                      >
                        <div
                          key={index}
                          className={
                            index === ctx.settingActive
                              ? css.settingActive
                              : css.settingUnActive
                          }
                          onClick={() => settingChooseHandler(item, index)}
                        >
                          <img
                            src={
                              index === ctx.settingActive
                                ? OkIcon
                                : EllipseGrayIcon
                            }
                            style={{
                              width: '18.5px',
                              height: '18.5px'
                            }}
                          />
                          <span
                            style={{
                              fontSize: '12px'
                            }}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {ctx.discountTypeSelect.id === 1 && (
                <div>
                  {Promojson.map(item => {
                    if (item.value === 100) {
                      if (discountType?.type === 'percent') {
                        return (
                          <div className={css.inputContainerThree}>
                            <input
                              className={css.inputThree}
                              value={giftQuantity}
                              type='number'
                              min='0'
                              max='100'
                              placeholder='Хямдралын хувь'
                              onChange={HandleChangeGiftQty}
                            />
                          </div>
                        );
                      }
                      if (discountType?.type === 'amount') {
                        return (
                          <div
                            style={{
                              display: 'flex',
                              width: '410px',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <div className={css.inputContainerTwo}>
                              <input
                                className={css.inputTwo}
                                value={priceAndQuantity}
                                type='number'
                                placeholder=' Үнийн дүн'
                                onChange={e =>
                                  setPriceAndQuantity(e.target.value)
                                }
                              />
                            </div>
                            <div className={css.inputContainerTwo}>
                              <input
                                className={css.inputTwo}
                                value={giftQuantity}
                                type='number'
                                min='0'
                                max='100'
                                placeholder='Хямдралын хувь'
                                onChange={HandleChangeGiftQty}
                              />
                            </div>
                          </div>
                        );
                      }
                    }
                  })}
                </div>
              )}

              {ctx.discountTypeSelect.id === 2 && (
                <div>
                  {Number(insertTypeProduct) === 500 && (
                    <div
                      style={{
                        display: 'flex',
                        width: '410px',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div className={css.inputContainerTwo}>
                        <input
                          className={css.inputTwo}
                          value={priceAndQuantity}
                          type='text'
                          placeholder=' Хямдралын утга'
                          onChange={e => setPriceAndQuantity(e.target.value)}
                        />
                      </div>
                      <div className={css.inputContainerTwo}>
                        <input
                          className={css.inputTwo}
                          value={giftQuantity}
                          type='text'
                          placeholder='Бэлгийн утга'
                          onChange={e => setQiftQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {Number(insertTypeProduct) === 2000 && (
                    <div className={css.typetwocontainerfirst}>
                      <div className={css.inputContainerTwoA}>
                        <input
                          className={css.inputTwoA}
                          value={priceAndQuantity}
                          type='text'
                          placeholder=' Хямдралын утга'
                          onChange={e => typeThreeHandler(e)}
                        />
                      </div>
                      <div className={css.inputContainerTwoA}>
                        <input
                          className={css.inputTwoA}
                          value={giftQuantity}
                          type='text'
                          placeholder='Бэлгийн утга'
                          onChange={e => setQiftQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '410px'
                }}
              >
                <div className={css.settingDateContainer}>
                  <input
                    type='date'
                    style={{
                      width: '100%',
                      height: '24px',
                      border: 'none',
                      outline: 'none'
                    }}
                    value={startDateValue}
                    placeholder='Эхлэх өдөр'
                    onChange={e => setStartDateValue(e.target.value)}
                  />
                </div>
                <div>
                  <img src={ArrawRightGray} className={css.image} />
                </div>
                <div className={css.settingDateContainer}>
                  <input
                    type='date'
                    style={{
                      width: '100%',
                      height: '24px',
                      border: 'none',
                      outline: 'none'
                    }}
                    value={endDateValue}
                    placeholder='Дуусах өдөр'
                    onChange={e => setEndDateValue(e.target.value)}
                  />
                </div>
              </div>
              <div className={css.comments}>
                <input
                  placeholder='Тайлбар'
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          {Number(ctx.productTypeSelect) === 1500 && <CollectionList />}
        </div>
        <div>
          {Number(ctx.productTypeSelect) === 1500 && <CollectionView />}
        </div>
        {Number(ctx.productTypeSelect) !== 1500 && (
          <div>
            <div>
              <div
                style={{
                  border: '1px solid #CFD8DC',
                  width: '840px',
                  borderTopRightRadius: '6px',
                  borderTopLeftRadius: '6px',
                  borderBottomLeftRadius: '6px',
                  borderBottomRightRadius: '6px',
                  overflow: 'hidden'
                }}
              >
                <SmallTable data={ctx?.products} />

                {/* <ProductAdd /> */}
                <div
                  style={{
                    width: '840px',
                    background: '#FFFFFF',
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    paddingBottom: '10px'
                  }}
                >
                  <div
                    className={css.addButtonContainer}
                    onClick={productsAddHandler}
                  >
                    <div>Бэлэг нэмэх</div>
                    <img src={PlusIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={css.diswrapper}>{dicontent}</div>
        {conditionShow && (
          <Condition
            setConditionShow={setConditionShow}
            setDiscountCondition={setDiscountCondition}
            discountCondition={discountCondition}
          />
        )}
        {mainDiscountType === 'gifts' && Number(insertTypeProduct) === 500 && (
          <div className={css.discountHeader}>
            <h3>Хямдралын бүтээгдэхүүн сонгох</h3>
          </div>
        )}{' '}
        {mainDiscountType === 'gifts' && Number(insertTypeProduct) === 500 && (
          <div className={css.giftContainer}>
            <div className={css.giftwrapper}>
              {ctx.giftProduct.map((item, index) => {
                return (
                  <p onClick={() => deleteGiftHandler(item, index)} key={index}>
                    {item.package_id}
                  </p>
                );
              })}
            </div>
            <span onClick={giftProductHandler}>Нэмэх</span>
          </div>
        )}
        {ctx.promoProductAdd && <DiscountProducts />}
        <div>
          <div>
            <Headertitle title='Сувгийн тохиргоо' />
          </div>
          <Select
            mode='multiple'
            allowClear
            style={{
              width: '100%'
            }}
            placeholder='Please select'
            defaultValue={busIDS}
            onChange={handleChange}
            options={channelOption}
          />
        </div>
        <div className={css.lastContainer}>
          <Headertitle title='Бүсчлэлийн тохиргоо' />
          <div
            className={css.generalContainer}
            //  onClick={zonesHandler}
          >
            <div>
              {
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#37474F'
                  }}
                >
                  {zoneTransdata?.map((it, index) => {
                    let name = it.name;
                    name = name.replace('ZONE_MGL', 'Бүх бүсчлэл');
                    return (
                      <span
                        key={index}
                        style={{
                          fontSize: '16px',
                          fontWeight: 400,
                          color: '#37474F'
                        }}
                      >
                        {name},{' '}
                      </span>
                    );
                  })}
                </span>
              }
            </div>

            <img
              src={ArrawRightGray}
              className={css.smallIcon}
              onClick={zonesSidebarhandler}
            />
            {/* {ctx?.zonesmodal && <Zonesmodal />} */}
            {ctx.zonessidebar && (
              <ZonesSidebar
                setZoneMapIDS={setZoneMapIDS}
                setZoneTransdata={setZoneTransdata}
              />
            )}
          </div>
        </div>
        {mainDiscountType === 'percent' && (
          <Buttonpercent
            zoneMapIDS={zoneMapIDS}
            setZoneMapIDS={setZoneMapIDS}
            startDateValue={startDateValue}
            setStartDateValue={setStartDateValue}
            endDateValue={endDateValue}
            setEndDateValue={setEndDateValue}
            discountTitle={discountTitle}
            setDiscountTitle={setDiscountTitle}
            comments={comments}
            setComments={setComments}
            insertTypeProduct={insertTypeProduct}
            discountValue={priceAndQuantity}
            discountGiftValue={giftQuantity}
            discountType={discountType}
            supplierChoseID={supplierChoseID}
            channelOptionDefault={channelOptionDefault}
          />
        )}
        {mainDiscountType === 'gifts' &&
          Number(ctx.productTypeSelect) === 1500 && (
            <ProductTypeSelectButton
              zoneMapIDS={zoneMapIDS}
              setZoneMapIDS={setZoneMapIDS}
              startDateValue={startDateValue}
              setStartDateValue={setStartDateValue}
              endDateValue={endDateValue}
              setEndDateValue={setEndDateValue}
              discountTitle={discountTitle}
              setDiscountTitle={setDiscountTitle}
              comments={comments}
              setComments={setComments}
              insertTypeProduct={insertTypeProduct}
              discountValue={priceAndQuantity}
              discountGiftValue={giftQuantity}
              supplierChoseID={supplierChoseID}
              channelOptionDefault={channelOptionDefault}
            />
          )}
        {mainDiscountType === 'gifts' &&
          Number(ctx.productTypeSelect) !== 1500 && (
            <ProductTypeSelectButtonTwo
              zoneMapIDS={zoneMapIDS}
              setZoneMapIDS={setZoneMapIDS}
              startDateValue={startDateValue}
              setStartDateValue={setStartDateValue}
              endDateValue={endDateValue}
              setEndDateValue={setEndDateValue}
              discountTitle={discountTitle}
              setDiscountTitle={setDiscountTitle}
              comments={comments}
              setComments={setComments}
              insertTypeProduct={insertTypeProduct}
              discountValue={priceAndQuantity}
              discountGiftValue={giftQuantity}
              supplierChoseID={supplierChoseID}
              channelOptionDefault={channelOptionDefault}
            />
          )}
      </div>
    </div>
  );
};

export default AddNewDiscount;
