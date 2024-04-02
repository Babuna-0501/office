import React, { useContext } from "react";
import { Checkbox, Col, Row } from "antd";
import css from "./channelsettung.module.css";
import closeBtn from "../assets/close.svg";
import ThickSquare from "../assets/Tick Square off.svg";
import BuildingIcon from "../assets/building 3.svg";
import HotelIcon from "../assets/hotel.svg";
import Building2Icon from "../assets/building 2.svg";
import ParmacyIcon from "../assets/parmacyIcon.svg";
import PromoHook from "../Hooks/PromoHook";
import ProductReportHook from "../Hooks/ProductsReportHook";
const ChannelSetting = () => {
  const ctx = useContext(PromoHook);
  const ctxProduct = useContext(ProductReportHook);
  // console.log("ctxProd", ctxProduct);
  const onChange = (checkedValues) => {
    // console.log("checked = ", checkedValues);
    ctx.setPromoChannel([...ctx.promoChannel, ...checkedValues]);
  };

  // const foodStoreHandler = (checkedValues) => {
  //   // console.log("checked = ", checkedValues);
  //   ctx.setPromoChannel([...ctx.promoChannel, ...checkedValues]);
  // };
  let foodStore = ctxProduct.sitedata.business_types.filter((item) => {
    return item.channel_id === 1;
  });
  let BlackMarket = ctxProduct.sitedata.business_types.filter((item) => {
    return item.channel_id === 2;
  });
  let KhoReKo = ctxProduct.sitedata.business_types.filter((item) => {
    return item.channel_id === 3;
  });
  let Companies = ctxProduct.sitedata.business_types.filter((item) => {
    return item.channel_id === 4;
  });
  let Parmacies = ctxProduct.sitedata.business_types.filter((item) => {
    return item.channel_id === 5;
  });
  return (
    <div className={css.container}>
      <div className={css.wrapperOne}></div>
      <div className={css.wrapperTwo}>
        <div className={css.contentFirstContainer}>
          <div className={css.firstWrapper}>
            <span>Сувгийн тохиргоо</span>
            <img src={closeBtn} onClick={() => ctx.setChannel(false)} />
          </div>
          <div className={css.contentContainer}>
            <div className={css.busTypeContainer}>
              <div className={css.busTypeWrapper}>
                <img src={ThickSquare} className={css.busTypeImage} />{" "}
                <span>{foodStore[0].channel_name}</span>
              </div>
              <Checkbox.Group
                style={{
                  width: "100%",
                }}
                onChange={onChange}
              >
                {foodStore.map((t, i) => {
                  return (
                    <Row key={i}>
                      <Col span={12}>
                        <Checkbox value={t.business_type_id}>
                          {t.business_type_name}
                        </Checkbox>
                      </Col>
                    </Row>
                  );
                })}
              </Checkbox.Group>
            </div>
            <div className={css.busTypeContainer}>
              <div className={css.busTypeWrapper}>
                <img src={BuildingIcon} className={css.busTypeImage} />{" "}
                <span>{BlackMarket[0].channel_name}</span>
              </div>
              <Checkbox.Group
                style={{
                  width: "100%",
                }}
                onChange={onChange}
              >
                {BlackMarket.map((t, i) => {
                  return (
                    <div className={css.subWrapper} key={i}>
                      <Row key={i}>
                        <Col span={12}>
                          <Checkbox value={t.business_type_id}>
                            {t.business_type_name}
                          </Checkbox>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </Checkbox.Group>
            </div>
            <div className={css.busTypeContainer}>
              <div className={css.busTypeWrapper}>
                <img src={HotelIcon} className={css.busTypeImage} />{" "}
                <span>{KhoReKo[0].channel_name}</span>
              </div>
              <Checkbox.Group
                style={{
                  width: "100%",
                }}
                onChange={onChange}
              >
                {KhoReKo.map((t, i) => {
                  return (
                    <div className={css.subWrapper} key={i}>
                      <Row>
                        <Col span={12}>
                          <Checkbox value={t.business_type_id}>
                            {t.business_type_name}
                          </Checkbox>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </Checkbox.Group>
            </div>
            <div className={css.busTypeContainer}>
              <div className={css.busTypeWrapper}>
                <img src={Building2Icon} className={css.busTypeImage} />{" "}
                <span>{Companies[0].channel_name}</span>
              </div>
              <Checkbox.Group
                style={{
                  width: "100%",
                }}
                onChange={onChange}
              >
                {Companies.map((t, i) => {
                  return (
                    <div className={css.subWrapper} key={i}>
                      <Row>
                        <Col span={12}>
                          <Checkbox value={t.business_type_id}>
                            {t.business_type_name}
                          </Checkbox>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </Checkbox.Group>
            </div>
            <div className={css.busTypeContainer}>
              <div className={css.busTypeWrapper}>
                <img src={ParmacyIcon} className={css.busTypeImage} />{" "}
                <span>{Parmacies[0].channel_name}</span>
              </div>
              <Checkbox.Group
                style={{
                  width: "100%",
                }}
                onChange={onChange}
              >
                {Parmacies.map((t, i) => {
                  return (
                    <div className={css.subWrapper} key={i}>
                      <Row>
                        <Col span={12}>
                          <Checkbox value={t.business_type_id}>
                            {t.business_type_name}
                          </Checkbox>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </Checkbox.Group>
            </div>
          </div>
        </div>
        <div className={css.btnContainer}>
          <span>Хадгалах</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelSetting;
