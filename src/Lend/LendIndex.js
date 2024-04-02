import React, { useState, useContext, useEffect } from "react";
import myHeaders from "../components/MyHeader/myHeader";
import css from "./lendindex.module.css";
import { styles } from "./style";
import Lend from "./Lend";
import LendCheck from "./Lendcheck/LendCheck";
import LendHook from "../Hooks/LendHook";
import ZonesIndex from "./Zonessetup/ZonesIndex";
import NewWorker from "./NewWorker/NewWorker";
import Newzone from "./Zonessetup/Newzone";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";

const LendIndex = (props) => {
  const [workers, setWorkers] = useState([]);
  const lendctx = useContext(LendHook);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    fetch(`https://api2.ebazaar.mn/api/backoffice/users`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((response) => {
        // console.log("response ", response);
        let data = [];
        response.data.map((item) => {
          if (item.last_name !== null && item.first_name !== null) {
            data.push(item);
          }
        });
        setWorkers(data);
        controller = null;
      })
      .catch((error) => console.log("error", error));
    return () => controller?.abort();
  }, []);
  const choseOneXT = () => {};
  return (
    <div className={css.container}>
      <div
        className="row header"
        style={{
          width: "1200px",
          borderBottom: "0.8px solid #CFD8DC",
        }}
      >
        <div style={{ ...styles.checkboxcontainer }}>
          <div className={`${css.wrapper} ${css.aabb}`}>
            <input type="text" className={css.checkbox} />
          </div>
        </div>
        <div style={{ ...styles.codeContainer }}>
          <div className={css.wrapper}>
            <span className="header">Kод</span>
            <input type="text" />
          </div>
        </div>
        <div style={{ ...styles.positionContainer }}>
          <div className={css.wrapper}>
            <span className="header">Албан тушаал</span>
            <input type="text" />
          </div>
        </div>
        <div style={{ ...styles.nameContainer }}>
          <div className={css.wrapper}>
            <span className="header">Овог</span>
            <input type="text" />
          </div>
        </div>
        <div style={{ ...styles.nameContainer }}>
          <div className={css.wrapper}>
            <span className="header">Нэр</span>
            <input type="text" />
          </div>
        </div>
        <div style={{ ...styles.dateContainer }}>
          <div className={css.wrapper}>
            <span className="header">Бүртгэсэн огноо</span>
            <input type="date" />
          </div>
        </div>
        <div style={{ ...styles.zoneContainer }}>
          <div className={css.wrapper}>
            <span className="header">Бүсчлэл хувиарлах</span>
            <input
              type="text"
              disabled
              style={{
                visibility: "hidden",
              }}
            />
          </div>
        </div>
        <div style={{ ...styles.settingContainer }}>
          <div className={css.wrapper}>
            <span className="header">Зээлийн тохиргоо</span>
            <input
              type="text"
              disabled
              style={{
                visibility: "hidden",
              }}
            />
          </div>
        </div>
      </div>
      <div className={css.lendwrapper}>
        {workers &&
          workers?.map((worker, index) => {
            return (
              <Lend
                worker={worker}
                key={index}
                index={index}
                onClick={choseOneXT}
              />
            );
          })}
      </div>
      {lendctx.lendState && <LendCheck data={props} />}
      {/* {lendctx.zoneState && <ZonesIndex />} */}

      {/* {lendctx.zoneState && <Newzone />} */}
      {lendctx.newWorkers && <NewWorker />}
    </div>
  );
};

export default LendIndex;
