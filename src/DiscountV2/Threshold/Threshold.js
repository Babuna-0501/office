import React, { useState, useEffect, useContext } from "react";
import css from "./threshold.module.css";
import plusicon from "../../assets/plus button.svg";
import ThresholInfo from "./Threshold.json";
import PromoHook from "../../Hooks/PromoHook";

const DynamicInput = () => {
  const [inputList, setInputList] = useState([{ price: "", percent: "" }]);
  const [chose, setChose] = useState(1);
  const [content, setContent] = useState("");
  const promoctx = useContext(PromoHook);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    promoctx.setThresholdList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    promoctx.setThresholdList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { price: "", percent: "" }]);
  };
  const handleSubmit = () => {};

  const handleChange = (e) => {
    setChose(e.target.value);
  };
  // console.log("chose", chose);

  useEffect(() => {
    if (Number(chose) === 1) {
      setContent("Үнийн дүн");
      promoctx.setThresholdType(1);
    } else if (Number(chose) === 2) {
      setContent("Сагс/Авдар");
      promoctx.setThresholdType(2);
    }
  }, [chose]);

  return (
    <div className={css.container}>
      <div className={css.btncontainer}>
        <div className={css.optioncontainer}>
          <form onSubmit={handleSubmit}>
            <select chose={chose} onChange={handleChange}>
              {ThresholInfo.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
          </form>
        </div>
        <div className={css.button} onClick={handleAddClick}>
          <img src={plusicon} />
          <span>Босго нэмэх</span>
        </div>
      </div>
      <div className={css.wrapper}>
        {inputList.map((x, i) => {
          return (
            <div className={css.inputcontainer} key={i}>
              <input
                name="price"
                placeholder={content}
                value={x.price}
                onChange={(e) => handleInputChange(e, i)}
                className={css.first}
              />

              <input
                name="percent"
                placeholder="%"
                value={x.percent}
                onChange={(e) => handleInputChange(e, i)}
                className={css.second}
              />
              <div className={css.btnwrapper}>
                {inputList.length !== 1 && (
                  <button onClick={() => handleRemoveClick(i)}>X</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </div>
  );
};

export default DynamicInput;
