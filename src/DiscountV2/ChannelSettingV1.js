import React, { useContext, useState, useEffect } from "react";
import { Checkbox, Col, Row } from "antd";
import css from "./channelsettung.module.css";
import closeBtn from "../assets/close.svg";
import PromoHook from "../Hooks/PromoHook";
import ProductReportHook from "../Hooks/ProductsReportHook";

const ChannelSetting = (props) => {
  const ctx = useContext(PromoHook);
  const ctxProduct = useContext(ProductReportHook);
  const [valueState, setValueState] = useState([]);
  const [optionPlan, setOptionPlan] = useState([1, 2, 3]);
  const [checkedList, setCheckedList] = useState([1, 2, 3, 4]);

  const [checked, setChecked] = useState(true);
  // console.log("props channel", props);

  useEffect(() => {
    let aa = [];
    ctxProduct.sitedata?.business_types.map((item) => {
      aa.push(item.business_type_id);
    });
    setCheckedList(aa);
  }, []);

  const onChangeHandler = () => {
    ctx.setPromoChannel([]);
    let chanID = [];
    let arr = [];
    ctxProduct.sitedata?.business_types.map((item) => {
      valueState.map((x) => {
        if (item.business_type_id === x) {
          arr.push(item);
          chanID.push(item.business_type_id);
        }
      });
    });

    ctx.setWillUpdateProd({
      ...ctx.willUpdateProd,
      channel_id: checkedList,
    });
    // props.setChannelIDS(chanID);

    ctx.setPromoChannel(arr);
    ctx.setChannel(false);
  };

  const onChange = (checkedValues) => {
    setCheckedList(checkedValues);
    setValueState(checkedValues);
  };
  const foodStoreHandler = (checkedValues) => {
    // console.log("checked = ", checkedValues);
    ctx.setPromoChannel([...ctx.promoChannel, ...checkedValues]);
  };
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
  let defaultValueOption = [];
  useEffect(() => {
    ctxProduct.sitedata?.business_types.map((item) => {
      defaultValueOption.push(item.business_type_name);
    });
  }, []);
  // defaultValueOption = defaultValueOption.join(",");

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
              <Checkbox.Group
                style={{
                  width: "100%",
                }}
                onChange={onChange}
                value={checkedList}
              >
                {ctxProduct.sitedata?.business_types.map((it, i) => {
                  return (
                    <Row key={i}>
                      <Col span={12}>
                        <Checkbox
                          value={it.business_type_id}
                          options={optionPlan}
                        >
                          {it.business_type_name}
                        </Checkbox>
                      </Col>
                    </Row>
                  );
                })}
              </Checkbox.Group>
            </div>
          </div>
        </div>
        <div className={css.btnContainer} onClick={onChangeHandler}>
          <span>Хадгалах</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelSetting;
