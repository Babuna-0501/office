import React, { useState, useContext } from "react";
import css from "./modal.module.css";
import Button from "../../components/Button/Button";
import checkboxicon from "../../assets/check box.svg";
import checksqureon from "../../assets/Tick Square on_gray.svg";
import CollectionHook from "../../Hooks/CollectionHook";

const Modal = () => {
  const [data, setData] = useState([
    { id: 1, name: "Агуулахын орлого" },
    { id: 2, name: "Агуулахын зарлага" },
  ]);
  const [active, setActive] = useState(null);
  const warectx = useContext(CollectionHook);
  const approveHandler = () => {
    if (active === null) {
      alert("Та орлого зарлага сонгоно уу");
      return;
    }
    if (active === 0) {
      warectx.setBaraaOrlogo(true);
      warectx.setOrlogoType(false);
    }
    if (active === 1) {
      warectx.setBaraaTatah(true);
      warectx.setOrlogoType(false);
    }
  };
  const cancelHandler = () => {
    warectx.setOrlogoType(false);
  };
  const choseHandler = (i) => {
    setActive(i);
  };
  return (
    <div className={css.container}>
      <div>
        <div className={css.header}>Сонголт</div>
        <div className={css.chosecontainer}>
          <ul>
            {data.map((item, index) => {
              return (
                <li
                  className={active === index ? css.lione : css.li}
                  onClick={() => choseHandler(index)}
                >
                  <img src={active === index ? checksqureon : checkboxicon} />
                  <span>{item.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={css.btncontainer}>
        <Button className={css.approvebtn} onClick={approveHandler}>
          Үргэлжлүүлэх
        </Button>
        <Button className={css.cancelbtn} onClick={cancelHandler}>
          Цуцлах
        </Button>
      </div>
    </div>
  );
};

export default Modal;
