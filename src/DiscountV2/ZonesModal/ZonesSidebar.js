import React, { useEffect, useState, useContext } from "react";
import css from "./zonessidebar.module.css";
import closeIcon from "../../assets/close.svg";
import { Checkbox, Col, Row } from "antd";
import myHeaders from "../../components/MyHeader/myHeader";
import Googlemap from "./Googlemap";
import PromoHook from "../../Hooks/PromoHook";

const ZonesSidebar = (props) => {
  const [data, setData] = useState([]);
  const [optionPlan, setOptionPlan] = useState([1, 2, 3]);
  const [ids, setIds] = useState([]);
  const options = [];
  const promoctx = useContext(PromoHook);
  const SelectedHandler = () => {};
  useEffect(() => {
    options.push({});
  }, []);

  const onChange = (checkedValues) => {
    // console.log("checkedvalue", checkedValues);
    setIds(checkedValues);
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://api2.ebazaar.mn/api/zones`, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        if (response.code === 200) {
          let content = response.data.filter((item) => {
            return item.isActive === 1;
          });
          setData(content);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const saveHandler = () => {
    // console.log("ids", ids);
    let transData = [];

    data.map((it, i) => {
      ids.map((x) => {
        if (it._id === x) {
          transData.push(it);
        }
      });
    });
    props.setZoneTransdata(transData);
    props.setZoneMapIDS(ids);
    promoctx.setZonessidebar(false);
  };
  const onChangeAll = (e) => {
    // console.log(`checked = ${e.target.checked}`);
    if (e.target.checked === true) {
      setIds(["62f4aabe45a4e22552a3969f"]);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.wrapperOne}></div>
      <div className={css.wrapperTwo}>
        <div className={css.firstcontainer}>
          <span>Бүсчлэлийн тохиргоо</span>{" "}
          <img
            src={closeIcon}
            alt="close icon"
            onClick={() => {
              promoctx.setZonessidebar(false);
            }}
          />
        </div>
        <div className={css.zonesContainer}>
          <div className={css.allcontainer}>
            <Checkbox onChange={onChangeAll}>Бүх бүсчлэл</Checkbox>
          </div>
          <div className={css.mapscontainer}>
            <Checkbox.Group
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
              onChange={onChange}
            >
              {data.map((item, i) => {
                // console.log("item", item);

                return (
                  <div
                    className={css.acontainer}
                    onClick={SelectedHandler}
                    key={i}
                  >
                    <div className={css.headercontainer}>
                      <Checkbox value={item._id} options={optionPlan}>
                        <p style={{ fontSize: "16px", marginBottom: "0" }}>
                          {item.name}
                        </p>
                      </Checkbox>
                    </div>
                    <div className={css.imagecontainer}>
                      <Googlemap data={item.polygons} />
                    </div>
                  </div>
                );
              })}
            </Checkbox.Group>
          </div>
        </div>
        <div className={css.btncontainer}>
          {/* <button>Бүсчлэл зурах +</button> */}
        </div>
        <div className={css.footercontainer} onClick={saveHandler}>
          <button>Хадгалах</button>
        </div>
      </div>
    </div>
  );
};

export default ZonesSidebar;
