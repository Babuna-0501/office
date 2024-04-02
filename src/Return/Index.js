import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import List from "./List";
import css from "./index.module.css";
import { styles } from "./style";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContainer } from "./HeaderContainer";
const Index = React.memo((props) => {
  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContainer />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  const getA = () => {
    ReactDOM.render(
      <React.StrictMode>
        <List />
      </React.StrictMode>,
      document.getElementById("foobar")
    );
  };

  useEffect(() => {
    getA();
  }, []);

  return (
    <div className={css.container}>
      <div
        className={css.rowheaderlocal}
        // style={{ position: "sticky", top: 0, zIndex: 150 }}
      >
        <div
          // style={{ width: "35px", marginTop: "10px" }}
          // className={css["success"]}
          style={styles.checkboxcontainer}
        >
          <div>
            <input type="checkbox" className={css.inputcontainer} />
          </div>
        </div>
        <div style={styles.phoneContainer}>
          <div>
            <span className="header">Утас</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.serviceCenter}>
          <div>
            <span className="header">Үйлчилгээний цэг</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.addressContainer}>
          <div>
            <span className="header">Хаяг</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.statusContainer}>
          <div>
            <span className="header">Төлөв</span>
            <input type="text" />
          </div>
        </div>{" "}
        <div style={styles.createdDateContainer}>
          <div>
            <span className="header">Огноо</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.padaanContainer}>
          <div>
            <span className="header">Падааны дугаар</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.productContainer}>
          <div>
            <span className="header">Барааны нэр</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.countContainer}>
          <div>
            <span className="header">Тоо</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.reasonContainer}>
          <div>
            <span className="header">Шалтгаан</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.tailbarContainer}>
          <div>
            <span className="header">Тайлбар</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.conditionContainer}>
          <div>
            <span className="header">Төлөв/Тайлбар</span>
            <input type="text" />
          </div>
        </div>
        <div style={styles.imageContainer}>
          <div>
            <span className="header">Зураг</span>
            <input type="text" />
          </div>
        </div>
      </div>
      <div
        id="foobar"
        style={{
          width: "2030px",
        }}
      ></div>
    </div>
  );
});

export default Index;
