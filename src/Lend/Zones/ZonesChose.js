import React, { useContext, useState, useEffect } from "react";
import css from "./zoneschose.module.css";
import Background from "../../Order/Othercomponents/Background";
import Button from "../components/Button";
import LendHook from "../../Hooks/LendHook";
import Headers from "../Headers/Headers";
import CheckedIcon from "../../assets/Tick Square on 2.svg";
import CheckIcon from "../../assets/check box.svg";
import myHeaders from "../../components/MyHeader/myHeader";

const ZonesChose = () => {
  const [chechedFalse, setCheckedFalse] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [active, setActive] = useState(null);
  const lendctx = useContext(LendHook);
  const cancelHandler = () => {
    lendctx.setSpecilZones(false);
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://api2.ebazaar.mn/api/zones`, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        // console.log(res.data);
        let dd = [];
        res.data.map((item) => {
          dd.push(false);
        });
        setDataAll(res.data);
        setCheckedFalse(dd);
      })
      .catch((error) => {
        console.log("zone error", error);
      });
  }, []);

  const checkedhandler = (position) => {
    // console.log("position", position);
    const updatedCheckedState = chechedFalse.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedFalse(updatedCheckedState);
  };
  // console.log("chechedFalse", chechedFalse);
  const approveHandler = () => {
    let dataFilter = [];
    chechedFalse.map((item, index) => {
      if (item) {
        dataFilter.push(dataAll[index]);
      }
    });
    console.log("last data dataFilter", dataFilter);
    lendctx.setFilteredZones(dataFilter);
    lendctx.setSpecilZones(false);
  };
  const clearHandler = () => {
    let data = [];
    chechedFalse.map((item) => {
      if (item) {
        item = false;
        data.push(item);
      } else {
        data.push(item);
      }
    });
    setCheckedFalse(data);
  };
  return (
    <Background>
      <div className={css.wrapper}>
        <div className={css.headerwrapper}>
          <Headers title="Бүсчлэл сонгох" onClick={cancelHandler} />
          <div className={css.bodyWrapper}>
            {dataAll.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    width: "100%",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #CFD8DC",
                    background:
                      chechedFalse[index] === true ? "#FBFBFC" : "#fff",
                  }}
                >
                  {" "}
                  <span>{item.name}</span>
                  <input
                    type="checkbox"
                    checked={chechedFalse[index]}
                    onChange={() => checkedhandler(index)}
                  />
                  {/* {chechedFalse[index] === true ? (
                    <img src={CheckedIcon} className={css.checkbox} />
                  ) : (
                    <img src={CheckIcon} className={css.checkbox} />
                  )} */}
                </div>
              );
            })}
          </div>
        </div>
        <div className={css.bntcontainer}>
          <div className={css.subbutton} onClick={clearHandler}>
            Цэвэрлэх
          </div>
          <div className={css.containerbtn}>
            <Button className={css.cancelwrapper} onClick={cancelHandler}>
              Цуцлах
            </Button>
            <Button className={css.approvewrapper} onClick={approveHandler}>
              Хадгалах
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default ZonesChose;
