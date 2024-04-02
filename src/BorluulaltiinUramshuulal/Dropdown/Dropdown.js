import React, { useState, useEffect, useContext } from "react";
import css from "./dropdown.module.css";
import plusicon from "../../assets/plus icon.svg";
import checkboxicon from "../../assets/check box.svg";
import chechboxchecked from "../../assets/Tick Square_green.svg";
import SMSHook from "../../Hooks/SMSHook";

const Dropdown = (props) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const smsctx = useContext(SMSHook);
  useEffect(() => {
    // console.log("data props", props);

    let update =
      props.data &&
      props.data.business_types?.map((item) => {
        return {
          ...item,
          chosed: false,
        };
      });
    setData(update);
  }, [props]);
  const ChosedHandler = (item, index) => {
    let ids = smsctx.chosedChannel;
    ids = [...new Set(ids)];

    if (ids.length !== 0 && ids.includes(item.business_type_id)) {
      let update = ids.filter((x) => x !== item.business_type_id);

      smsctx.setChosedChannel(update);
    } else {
      smsctx.setChosedChannel((prev) => [...prev, item.business_type_id]);
    }

    let update = data.map((x, i) => {
      let dataone = x;
      if (index === i) {
        return {
          ...dataone,
          chosed: dataone.chosed === true ? false : true,
        };
      }
      return dataone;
    });
    // console.log("item ", update);
    setData(update);
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.onebody}>
          <div className={css.searchwrapper}>
            <input
              placeholder="Хайх"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className={css.bodywrapper}>
            {data &&
              data.map((item, index) => {
                return (
                  <div
                    className={css.itemwrapper}
                    onClick={() => ChosedHandler(item, index)}
                    key={index}
                  >
                    <img
                      src={
                        // item.chosed === true ||
                        smsctx.chosedChannel.includes(item.business_type_id)
                          ? chechboxchecked
                          : checkboxicon
                      }
                      alt="checked icon"
                    />{" "}
                    <span>{item.business_type_name}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={css.btnwrapper}>
          <div className={css.btncontainer}>
            <span>Шинэ бүсчлэл нэмэх</span>
            <img src={plusicon} alt="plus icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
