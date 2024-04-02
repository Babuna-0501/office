import React, { useState, useRef } from "react";
import css from "./index.module.css";
import { InputNumber } from "antd";
import close from "../../src/assets/close.svg";

const SingleProduct = (props) => {
  const [cnt, setCnt] = useState(1);
  const price =
    props?.e?.locations[`62f4aabe45a4e22552a3969f`]?.price?.channel[1];

  const inputRef = useRef();
  //   console.log("props", props);
  const ChangeHandler = () => {
    setCnt(inputRef.current.value);

    let newArr = [...props.checked2];
    newArr.find((x) => x._id === props.e._id).total_amount = Number(
      inputRef.current.value
    );
    // console.log("props new arr", newArr);
    props.setCheck2(newArr);
  };
  return (
    <div
      key={props.e._id}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <div>Барааны нэр</div>
        <div className={css.long}>
          {props.e.name}
          <img
            src={close}
            height={15}
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.setCheck2((prev) =>
                prev?.filter((e) => e._id !== props.e._id)
              );
            }}
          />
        </div>
      </div>
      <div>
        <div>Barcode</div>
        <div className={css.medium}>{props?.e?.bar_code}</div>
      </div>
      <div>
        <div>Нэгжийн үнэ</div>
        <div className={css.short}>{price.toLocaleString()}</div>
      </div>
      <div>
        <div>Тоо ширхэг</div>
        {/* <InputNumber
          min={1}
          style={{ padding: "3px 0" }}
          max={1000000}
          defaultValue={cnt}
          onChange={(value) => {
            setCnt(value);
            props.setCheck2((prev) => [
              ...prev.map((obj, ind) =>
                ind === props.i ? Object.assign(obj, { too: value }) : obj
              ),
            ]);
          }}
        /> */}
        <input
          ref={inputRef}
          type="text"
          value={cnt}
          style={{
            width: "150px",
            padding: "3px 0",
            border: "1px solid #ffa600",
          }}
          className={css.inputwrapper}
          placeholder="0"
          min={0}
          max={1000000}
          onChange={ChangeHandler}
        />
      </div>
      <div>
        <div>Нийт үнэ</div>
        <div className={css.short}>{(cnt * price).toLocaleString()}</div>
      </div>
    </div>
  );
};
export default SingleProduct;
